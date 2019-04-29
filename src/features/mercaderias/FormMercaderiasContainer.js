import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toggleCargando } from '../esqueleto/redux/actions';
import api_axio from '../../common/api_axios';
import { optionsUnidad, optionsIVA } from '../../common/constantesGenerales';
import { listaMonedas } from '../cotizaciones/redux/actions';
import { traeMercaderiasGrupos } from '../mercaderias-grupos/redux/actions';
import { traeMercaderiasSubGrupos } from '../mercaderias-sub-grupos/redux/actions';
import { traeMercaderiasMarcas } from '../mercaderias-marcas/redux/actions';

import { traerMercaderia } from './redux/actions';
import { Principal } from '../esqueleto';

import { FormMercaderias } from './';
import swal from 'sweetalert';
import history from '../../common/history';
import { formValueSelector, reduxForm } from 'redux-form';
import validate from 'validate.js';

// Decorate with connect to read form values
const selector = formValueSelector('formMercaderias'); // <-- same as form name

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
  n_id_marca: {
    presence: {
      message: 'Marca es obligatorio',
    },
  },
  n_id_grupo: {
    presence: {
      message: 'Grupo es obligatorio',
    },
  },
  n_id_subgrupo: {
    presence: {
      message: 'Sub-grupo es obligatorio',
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
  n_costo: {
    presence: {
      message: 'Costo es obligatorio',
    },
    numericality: {
      onlyInteger: false,
      notValid: 'Este valor no es válido.',
    },
  },
  n_venta: {
    presence: {
      message: 'Precio de venta es obligatorio',
    },
    numericality: {
      onlyInteger: false,
      notValid: 'Este valor no es válido.',
      greaterThan: 0,
      notGreaterThan: 'El valor debe ser mayor que zero',
    },
  },
  n_peso: {
    presence: {
      message: 'Peso es obligatorio',
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

export class FormMercaderiasContainer extends Component {
  static propTypes = {
    mercaderias: PropTypes.object.isRequired,
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
      api_funcion: 'mercaderias',
      params,
    })
      .then(res => {
        history.push('/mercaderias');
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
    const {
      listaMonedas,
      toggleCargando,
      traeMercaderiasGrupos,
      traeMercaderiasSubGrupos,
      traeMercaderiasMarcas,
    } = this.props.actions;
    const { path } = this.props.match;

    toggleCargando();
    traeMercaderiasGrupos();
    traeMercaderiasSubGrupos();
    traeMercaderiasMarcas();
    listaMonedas();

    //MODO EDICION
    if (path.indexOf('editar') !== -1) {
      const { traerMercaderia } = this.props.actions;
      const params = {
        id: this.props.match.params.id,
      };
      traerMercaderia(params).then(toggleCargando());
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
      <div className="mercaderias-form-mercaderias-container">
        <Principal
          titulo={'Mercaderias'}
          edicion={edicion}
          component={FormMercaderias}
          {...this.props}
          enviarFormulario={handleSubmit(this.submit)}
        />
      </div>
    );
  }
}

FormMercaderiasContainer = reduxForm({
  // a unique name for the form
  form: 'formMercaderias',
  enableReinitialize: true,
  validate: values => validate(values, validationConstraints, { fullMessages: false }),
})(FormMercaderiasContainer);

/* istanbul ignore next */
function mapStateToProps(state) {
  const modoNuevo = state.router.location.pathname.indexOf('nuevo') !== -1;

  const initialValues = modoNuevo
    ? {}
    : typeof state.esqueleto.selected[0] !== 'undefined'
    ? state.esqueleto.selected[0]
    : state.mercaderias.mercaderia;

  const optionsMonedas = [];
  let monedaObj = {};
  for (let moneda of state.cotizaciones.monedas) {
    if ((modoNuevo && moneda.b_activo) || ( (!modoNuevo && initialValues.n_id_moneda === moneda.id) || moneda.b_activo) ) {
      monedaObj = {
        label: moneda.c_descripcion,
        value: moneda.id,
        decimales: moneda.n_decimales,
      };
      optionsMonedas.push(monedaObj);
    }
  }

  const optionsGrupos = [];
  let grupoObj = {};
  for (let grupo of state.mercaderiasGrupos.grupos) {
    if ((modoNuevo && grupo.b_activo) || ( (!modoNuevo && initialValues.n_id_grupo === grupo.id) || grupo.b_activo) ) {
      grupoObj = {
        label: grupo.c_descripcion,
        value: grupo.id,
      };
      optionsGrupos.push(grupoObj);
    }
  }

  const optionsSubGrupos = [];
  let subGrupoObj = {};
  for (let subGrupo of state.mercaderiasSubGrupos.subGrupos) {
    if ((modoNuevo && subGrupo.b_activo) || ( (!modoNuevo && initialValues.n_id_subgrupo === subGrupo.id) || subGrupo.b_activo) ) {
      subGrupoObj = {
        label: subGrupo.c_descripcion,
        value: subGrupo.id,
      };
      optionsSubGrupos.push(subGrupoObj);
    }
  }

  const optionsMarcas = [];
  let marcasObj = {};
  for (let marca of state.mercaderiasMarcas.marcas) {
    if ((modoNuevo && marca.b_activo) || ( (!modoNuevo && initialValues.n_id_marca === marca.id) || marca.b_activo) ) {
      marcasObj = {
        label: marca.c_descripcion,
        value: marca.id,
      };
      optionsMarcas.push(marcasObj);
    }
  }

  let decimales = selector(state, 'n_id_moneda')
    ? optionsMonedas.find(moneda => moneda.value === selector(state, 'n_id_moneda'))
    : 2;
  decimales = decimales ? decimales.decimales : 2;
  return {
    mercaderias: state.mercaderias,
    esqueleto: state.esqueleto,
    initialValues,
    optionsMonedas,
    optionsIVA,
    optionsUnidad,
    optionsGrupos,
    optionsSubGrupos,
    optionsMarcas,
    decimales,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        api_axio,
        traerMercaderia,
        listaMonedas,
        toggleCargando,
        traeMercaderiasGrupos,
        traeMercaderiasSubGrupos,
        traeMercaderiasMarcas,
      },
      dispatch,
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormMercaderiasContainer);
