import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toggleCargando } from '../esqueleto/redux/actions';
import api_axio from '../../common/api_axios';
import { optionsUnidad,optionsIVA } from '../../common/constantesGenerales';
import { listaMonedas } from '../cotizaciones/redux/actions';
import { traeServiciosGrupos } from '../servicios-grupos/redux/actions';

import { traerServicio } from './redux/actions';
import { Principal } from '../esqueleto';

import { FormServicios } from './';
import swal from 'sweetalert';
import history from '../../common/history';
import { formValueSelector, reduxForm } from 'redux-form';
import validate from 'validate.js';

// Decorate with connect to read form values
const selector = formValueSelector('formServicios'); // <-- same as form name

const validationConstraints = {
  c_descripcion: {
    presence: {
      message: 'Descripción es obligatorio',
    },
    length: {
      minimum: 5,
      message: 'Su Descripción debe tener no mínimo 5 caracteres',
    },
  },
  c_unidad: {
    presence: {
      message: 'Unidad es obligatorio',
    },
  },
  n_id_grupo: {
    presence: {
      message: 'Grupo es obligatorio',
    },
  },
  n_iva: {
    presence: {
      message: 'IVA es obligatorio',
    },
  },
  n_id_moneda: {
    presence: {
      message: 'Moneda es obligatorio',
    },
  },
  n_venta: {
    presence: {
      message: 'Precio es obligatorio',
    },
    numericality: {
      onlyInteger: false,
      notValid: 'Este valor no es válido.',
      greaterThan: 0,
      notGreaterThan: 'El valor debe ser mayor que zero',
    },
  },
  n_comision: {
    presence: {
      message: '% de la comisión es obligatorio',
    },
    numericality: {
      onlyInteger: false,
      notValid: 'Este valor no es válido. Debe estar entre 0 y 100',
      greaterThan: 0,
      notGreaterThan: 'El valor debe ser mayor que zero',
      lessThanOrEqualTo: 100,
      notLessThanOrEqualTo: 'El valor debe ser menor o igual a 100',
    },
  },
};


export class FormServiciosContainer extends Component {
  static propTypes = {
    servicios: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    esqueleto: PropTypes.object.isRequired,
  };

  submit = values => {
    const { api_axio, toggleCargando } = this.props.actions;
    toggleCargando();
    const params = {
      data: values,
      method: values.id && values.id !== '' ? 'put' : 'post',
    };
    return api_axio({
      api_funcion: 'servicios',
      params,
    })
      .then(res => {
        history.push('/servicios');
        toggleCargando();
        swal({
          icon: 'success',
          timer: 1000,
        });
      })
      .catch(err => {
        const { message } =
          typeof err.response !== 'undefined'
            ? err.response.data
            : 'Error al intentar guardar los datos';
        toggleCargando();
        swal({
          title: 'Ops',
          text: message ? message : 'Error al intentar guardar los datos',
          icon: 'error',
          button: 'OK!',
        });
      });
  };

  componentDidMount = () => {
    const { listaMonedas, toggleCargando, traeServiciosGrupos } = this.props.actions;
    const { path } = this.props.match;

    toggleCargando();
    traeServiciosGrupos();
    listaMonedas();

    //MODO EDICION
    if (path.indexOf('editar') !== -1) {
      const { traerServicio } = this.props.actions;
      const params = {
        id: this.props.match.params.id,
      };
      traerServicio(params).then(toggleCargando());
    } else {
      toggleCargando();
    }
  };

  render() {
    let { handleSubmit } = this.props;
    const { path } = this.props.match;
    let edicion = true;
    if (path.indexOf('nuevo') !== -1) {
      edicion = false;
    }
    return (
      <div className="servicios-form-servicios-container">
        <Principal
          titulo={'Servicios'}
          edicion={edicion}
          component={FormServicios}
          {...this.props}
          enviarFormulario={handleSubmit(this.submit)}
        />
      </div>
    );
  }
}

FormServiciosContainer = reduxForm({
  // a unique name for the form
  form: 'formServicios',
  enableReinitialize: true,
  validate: values => validate(values, validationConstraints, { fullMessages: false }),
})(FormServiciosContainer);

/* istanbul ignore next */
function mapStateToProps(state) {
  const initialValues =
    state.router.location.pathname.indexOf('nuevo') !== -1
      ? {}
      : typeof state.esqueleto.selected[0] !== 'undefined'
      ? state.esqueleto.selected[0]
      : state.servicios.servicio;

  const optionsMonedas = [];
  let monedaObj = {};
  for (let moneda of state.cotizaciones.monedas) {
    monedaObj = {
      label: moneda.c_descripcion,
      value: moneda.id,
      decimales: moneda.n_decimales,
    };
    optionsMonedas.push(monedaObj);
  }

  const optionsGrupos = [];
  let grupoObj = {};
  for (let grupo of state.serviciosGrupos.grupos) {
    grupoObj = {
      label: grupo.c_descripcion,
      value: grupo.id,
    };
    optionsGrupos.push(grupoObj);
  }

  let decimales = selector(state, 'n_id_moneda')
    ? optionsMonedas.find(moneda => moneda.value === selector(state, 'n_id_moneda'))
    : 2;
  decimales = decimales ? decimales.decimales : 2;
  return {
    servicios: state.servicios,
    esqueleto: state.esqueleto,
    initialValues,
    optionsMonedas,
    optionsIVA,
    optionsUnidad,
    optionsGrupos,
    decimales,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        api_axio,
        traerServicio,
        listaMonedas,
        toggleCargando,
        traeServiciosGrupos,
      },
      dispatch,
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormServiciosContainer);
