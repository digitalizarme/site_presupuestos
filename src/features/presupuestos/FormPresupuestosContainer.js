import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toggleCargando } from '../esqueleto/redux/actions';
import api_axio from '../../common/api_axios';
import { listaMonedas } from '../cotizaciones/redux/actions';
import { traePersonasTodas } from '../personas/redux/actions';
import { traeFletes } from '../fletes/redux/actions';
import { traeSeguros } from '../seguros/redux/actions';

import { traerPresupuesto, traeStatus, traeFrecuencias,traeItems } from './redux/actions';
import { Principal } from '../esqueleto';

import { FormPresupuestos } from './';
import swal from 'sweetalert';
import history from '../../common/history';
import { formValueSelector, reduxForm } from 'redux-form';
import validate from 'validate.js';

// Decorate with connect to read form values
const selector = formValueSelector('formPresupuestos'); // <-- same as form name

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

export class FormPresupuestosContainer extends Component {
  static propTypes = {
    presupuestos: PropTypes.object.isRequired,
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
      api_funcion: 'presupuestos',
      params,
    })
      .then(res => {
        history.push('/presupuestos');
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
      traeStatus,
      traePersonasTodas,
      traeFletes,
      traeSeguros,
      traeFrecuencias,
      traeItems,
    } = this.props.actions;
    const { path } = this.props.match;

    toggleCargando();
    listaMonedas();
    traeStatus();
    traePersonasTodas();
    traeFletes();
    traeSeguros();
    traeFrecuencias();

    //MODO EDICION
    if (path.indexOf('editar') !== -1) {
      const { traerPresupuesto } = this.props.actions;
      const params = {
        id: this.props.match.params.id,
      };
      traerPresupuesto(params).then(traeItems(params).then(toggleCargando()));
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
      <div className="presupuestos-form-presupuestos-container">
        <Principal
          titulo={'Presupuestos'}
          edicion={edicion}
          component={FormPresupuestos}
          {...this.props}
          enviarFormulario={handleSubmit(this.submit)}
        />
      </div>
    );
  }
}

FormPresupuestosContainer = reduxForm({
  // a unique name for the form
  form: 'formPresupuestos',
  enableReinitialize: true,
  validate: values => validate(values, validationConstraints, { fullMessages: false }),
})(FormPresupuestosContainer);

/* istanbul ignore next */
function mapStateToProps(state) {
  const modoNuevo = state.router.location.pathname.indexOf('nuevo') !== -1;

  const initialValues = modoNuevo
    ? {}
    : typeof state.esqueleto.selected[0] !== 'undefined'
    ? {
        ...state.esqueleto.selected[0]
        ,items:state.presupuestos.items
      }
    : state.presupuestos.dados;
console.log(initialValues)
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

  const optionsStatus = [];
  let statusObj = {};
  for (let status of state.presupuestos.status) {
    if ((modoNuevo && status.b_activo) || ( (!modoNuevo && initialValues.n_id_status === status.id) || status.b_activo) ) {
      statusObj = {
        label: status.c_descripcion,
        value: status.id,
      };
      optionsStatus.push(statusObj);
    }
  }

  const optionsClientes = [];
  let personaObj = {};
  for (let persona of state.personas.personas) {
    if ((modoNuevo && persona.b_cliente) || ( (!modoNuevo && initialValues.n_id_persona === persona.id) || persona.b_cliente) ) {
      personaObj = {
        label: persona.c_nombre,
        value: persona.id,
      };

      optionsClientes.push(personaObj);
    }
  }

  const optionsComisionista = [];
  let comisionistaObj = {};
  for (let comisionista of state.personas.personas) {
    if ((modoNuevo && comisionista.b_comisionista) || ( (!modoNuevo && initialValues.n_id_persona_comisionista === comisionista.id) || comisionista.b_comisionista) ) {
      comisionistaObj = {
        label: comisionista.c_nombre,
        value: comisionista.id,
      };
      optionsComisionista.push(comisionistaObj);
    }
  }

  const optionsFletes = [];
  let fleteObj = {};
  for (let flete of state.fletes.fletes) {
    if ((modoNuevo && flete.b_activo) || ( (!modoNuevo && initialValues.n_id_flete === flete.id) || flete.b_activo) ) {
      fleteObj = {
        label: flete.moneda.c_simbolo + flete.n_valor + "/" + flete.c_tipo,
        value: flete.id,
      };
      optionsFletes.push(fleteObj);
    }
  }

  const optionsSeguros = [];
  let seguroObj = {};
  for (let seguro of state.seguros.seguros) {
    if ((modoNuevo && seguro.b_activo) || ( (!modoNuevo && initialValues.n_id_seguro === seguro.id) || seguro.b_activo) ) {
      seguroObj = {
        label: seguro.c_valor_exhibir,
        value: seguro.id,
      };
      optionsSeguros.push(seguroObj);
    }
  }

  const optionsFrecuencias = [];
  let frecuenciaObj = {};
  for (let frecuencia of state.presupuestos.frecuencias) {
    if ((modoNuevo && frecuencia.b_activo) || ( (!modoNuevo && initialValues.n_id_frecuencia === frecuencia.id) || frecuencia.b_activo) ) {
      frecuenciaObj = {
        label: frecuencia.c_descripcion,
        value: frecuencia.id,
      };
      optionsFrecuencias.push(frecuenciaObj);
    }
  }


  let decimales = selector(state, 'n_id_moneda')
    ? optionsMonedas.find(moneda => moneda.value === selector(state, 'n_id_moneda'))
    : 2;
  decimales = decimales ? decimales.decimales : 2;
  return {
    items: state.presupuestos.items,
    esqueleto: state.esqueleto,
    usuario:state.acceder.usuario.c_usuario,
    initialValues,
    optionsMonedas,
    optionsStatus,
    optionsClientes,
    optionsComisionista,
    optionsSeguros,
    optionsFletes,
    optionsFrecuencias,
    decimales,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        api_axio,
        traerPresupuesto,
        listaMonedas,
        toggleCargando,
        traeStatus,
        traePersonasTodas,
        traeFletes,
        traeSeguros,
        traeFrecuencias,
        traeItems,
      },
      dispatch,
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormPresupuestosContainer);
