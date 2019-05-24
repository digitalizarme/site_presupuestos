import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toggleCargando, modalToggle } from '../esqueleto/redux/actions';
import api_axio from '../../common/api_axios';
import {
  listaMonedas,
  guardarCotizaciones,
  traeUltimasCotizacionesMoneda,
} from '../cotizaciones/redux/actions';
import { traePersonasTodas } from '../personas/redux/actions';
import { traeFletes } from '../fletes/redux/actions';
import { traeSeguros } from '../seguros/redux/actions';
import mostraMensajeError from '../../common/mostraMensajeError';

import {
  traerPresupuesto,
  traeStatus,
  traeFrecuencias,
  traeItems,
  limpiaItems,
  traeMercaderiasServicios,
} from './redux/actions';
import { Principal } from '../esqueleto';

import { FormPresupuestos } from './';
import swal from 'sweetalert';
import history from '../../common/history';
import { formValueSelector, reduxForm, change, reset } from 'redux-form';
import validate from 'validate.js';

// Decorate with connect to read form values
const selector = formValueSelector('formPresupuestos'); // <-- same as form name
const selectorItem = formValueSelector('formModal'); // <-- same as form name

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

const preparaMonedasGuardar = (optionsMonedas, idMoneda, guardarCotizaciones) => {
  const monedaElejida = optionsMonedas.find(moneda => moneda.value === idMoneda);
  const monedasNoElejidas = [];
  for (let i = 0; i < optionsMonedas.length; i++) {
    if (optionsMonedas[i].extra.c_letras !== monedaElejida.extra.c_letras) {
      monedasNoElejidas.push(monedaElejida.extra.c_letras + '_' + optionsMonedas[i].extra.c_letras);
    }
  }
  guardarCotizaciones(monedasNoElejidas.join()).catch(err => {
    mostraMensajeError({ err, msgPadron: 'Error al traer las cotizaciones de las monedas' });
  });
};

const atualizouForm = (values, dispatch, props) => {
  if ((values.n_id_moneda || values.n_id_persona) && !values.n_id_status) {
    dispatch(change('formPresupuestos', `n_id_status`, 1));
  }
};

const atualizouFormModal = (values, dispatch, props) => {
  // const item = props.itemSeleccionado;
  // dispatch(change('formModal', `n_cantidad`, 1));
};

const atualizaCamposItem = ({
  dispatch,
  unitario,
  exentas,
  gravadas_5,
  gravadas_10,
  peso,
  flete,
  tipo,
  obs,
}) => {
  if (typeof unitario !== 'undefined') {
    dispatch(change('formModal', `n_unitario`, unitario));
  }
  if (typeof exentas !== 'undefined') {
    dispatch(change('formModal', `n_exentas`, exentas));
  }
  if (typeof gravadas_5 !== 'undefined') {
    dispatch(change('formModal', `n_gravadas_5`, gravadas_5));
  }
  if (typeof gravadas_10 !== 'undefined') {
    dispatch(change('formModal', `n_gravadas_10`, gravadas_10));
  }
  if (typeof peso !== 'undefined') {
    dispatch(change('formModal', `n_peso`, peso));
  }
  if (typeof flete !== 'undefined') {
    dispatch(change('formModal', `n_flete`, flete));
  }
  if (typeof tipo !== 'undefined') {
    dispatch(change('formModal', `c_tipo`, tipo));
  }
  if (typeof obs !== 'undefined') {
    dispatch(change('formModal', `t_observacion`, obs));
  }
};

export class FormPresupuestosContainer extends Component {
  static propTypes = {
    // presupuestos: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    esqueleto: PropTypes.object.isRequired,
  };

  onChangePersona = idPersona => {
    const { moneda, handleSubmit, id } = this.props;
    if (idPersona && moneda && !id) {
      setTimeout(() => {
        this.props.dispatch(handleSubmit(this.preSubmit));
      }, 500);
    }
  };

  onChangeMoneda = idMoneda => {
    const { guardarCotizaciones } = this.props.actions;
    const { optionsMonedas, persona, id, handleSubmit } = this.props;
    if (idMoneda) {
      preparaMonedasGuardar(optionsMonedas, idMoneda, guardarCotizaciones);
      if (persona && !id) {
        setTimeout(() => {
          this.props.dispatch(handleSubmit(this.preSubmit));
        }, 500);
      }
    }
  };

  onChangeComisionista = idPersona => {
    if (idPersona) {
      const { n_total_general, n_valor_porcentaje_comision } = this.props;
      const valorComision = (n_total_general * n_valor_porcentaje_comision) / 100;
      this.props.dispatch(change('formPresupuestos', `n_valor_comision`, valorComision));
    }
  };

  onChangeItems = idItem => {
    const { optionsItems, monedaSeleccionada } = this.props;
    const { traeUltimasCotizacionesMoneda, toggleCargando } = this.props.actions;
    toggleCargando().then(res => {
      this.props.dispatch(change('formModal', `n_cantidad`, 1));
      let itemSeleccionado = idItem ? optionsItems.find(item => item.value === idItem) : null;
      itemSeleccionado = itemSeleccionado ? itemSeleccionado.extra : {};
      const tipo = itemSeleccionado.c_tipo;
      const obs = itemSeleccionado.t_observacion;
      let unitario = itemSeleccionado.n_unitario;
      let exentas = itemSeleccionado.n_exentas;
      let gravadas_5 = itemSeleccionado.n_gravadas_5;
      let gravadas_10 = itemSeleccionado.n_gravadas_10;
      let peso = itemSeleccionado.n_peso;
      let flete = peso * itemSeleccionado.n_flete;
      if (itemSeleccionado.n_id_moneda !== monedaSeleccionada.extra.id) {
        const c_monedaOrigemDestino =
          itemSeleccionado.c_letras_moneda + '_' + monedaSeleccionada.extra.c_letras;

        traeUltimasCotizacionesMoneda(c_monedaOrigemDestino).then(res => {
          if (res.data && res.data.length > 0) {
            const cotizacion = res.data[0];
            unitario *= cotizacion.n_valor;
            unitario = unitario.toFixed(itemSeleccionado.n_decimales_moneda);

            exentas *= cotizacion.n_valor;
            exentas = exentas.toFixed(itemSeleccionado.n_decimales_moneda);

            gravadas_5 *= cotizacion.n_valor;
            gravadas_5 = gravadas_5.toFixed(itemSeleccionado.n_decimales_moneda);

            gravadas_10 *= cotizacion.n_valor;
            gravadas_10 = gravadas_10.toFixed(itemSeleccionado.n_decimales_moneda);

            atualizaCamposItem({
              dispatch: this.props.dispatch,
              unitario,
              exentas,
              gravadas_5,
              gravadas_10,
              peso,
              tipo,
              obs,
            });
          } else {
            swal({
              title: 'Ops',
              text: 'No fue posible obtener las ultimas cotizaciones.',
              icon: 'warning',
              button: 'OK!',
            });
          }
        });
      } else {
        atualizaCamposItem({
          dispatch: this.props.dispatch,
          unitario,
          exentas,
          gravadas_5,
          gravadas_10,
          peso,
          tipo,
          obs,
        });
      }
      if (
        itemSeleccionado.c_tipo === 'M' &&
        itemSeleccionado.n_flete_moneda !== monedaSeleccionada.extra.id
      ) {
        const c_monedaOrigemDestino =
          itemSeleccionado.c_letras_flete_moneda + '_' + monedaSeleccionada.extra.c_letras;

        traeUltimasCotizacionesMoneda(c_monedaOrigemDestino).then(res => {
          if (res.data && res.data.length > 0) {
            const cotizacion = res.data[0];
            flete *= cotizacion.n_valor;
            flete = flete.toFixed(itemSeleccionado.n_decimales_flete_moneda);
            atualizaCamposItem({ dispatch: this.props.dispatch, flete });
          } else {
            swal({
              title: 'Ops',
              text: 'No fue posible obtener las ultimas cotizaciones para el flete',
              icon: 'warning',
              button: 'OK!',
            });
          }
          toggleCargando();
        });
      } else {
        atualizaCamposItem({ dispatch: this.props.dispatch, flete });
        toggleCargando();
      }
    });
  };

  agregarItem = () => {
    const { modalToggle } = this.props.actions;
    const { descMoneda, persona, id } = this.props;
    if (descMoneda && persona && id) {
      this.props.dispatch(reset('formModal'));
      modalToggle();
    } else {
      swal({
        title: 'Ops',
        text: 'La moneda y la persona deben estar seleccionadas',
        icon: 'warning',
        button: 'OK!',
      });
    }
  };

  editarItem = datos => {
    const { modalToggle } = this.props.actions;
    this.props.dispatch(reset('formModal'));
    Object.entries(datos).map((arrayDatos, indice) => {
      const campo = arrayDatos[0];
      const valor = arrayDatos[1];
      return this.props.dispatch(change('formModal', campo, valor));
    });
    modalToggle();
  };

  eliminarItem = item => {
    const { api_axio, toggleCargando, traeItems } = this.props.actions;
    swal({
      title: 'Estás seguro?',
      text: 'Esta acción no podrá ser cancelada',
      icon: 'warning',
      buttons: {
        cancel: {
          text: 'Cancelar',
          value: null,
          visible: true,
          className: '',
          closeModal: true,
        },
        confirm: {
          text: 'Sí, estoy',
          value: true,
          visible: true,
          className: '',
          closeModal: true,
        },
      },
      dangerMode: true,
    }).then(willDelete => {
      if (willDelete) {
        toggleCargando();
        const params = {
          method: 'delete',
        };
        return api_axio({
          api_funcion: `presupuestos/item/${item.id}/${item.c_tipo}`,
          params,
        })
          .then(res => {
            const params = {
              id: item.n_id_presupuesto,
            };
            traeItems(params).then(res => {
              toggleCargando();
              swal({
                icon: 'success',
                timer: 1000,
              });
            });
          })
          .catch(err => {
            mostraMensajeError({ err, msgPadron: 'Error al intentar eliminar' });
            toggleCargando();
          });
      }
    });
  };

  submitItem = values => {
    const { modalToggle, api_axio, toggleCargando, traeItems } = this.props.actions;
    toggleCargando();
    const params = {
      data: values,
      method: values.id && values.id !== '' ? 'put' : 'post',
    };
    return api_axio({
      api_funcion: 'presupuestos/item',
      params,
    })
      .then(res => {
        const params = {
          id: values.n_id_presupuesto,
        };
        traeItems(params).then(res => {
          // if (this.props.status === 1) {
          //   this.props.dispatch(change('formPresupuestos', `n_id_status`, 2));
          // }
          toggleCargando();
          modalToggle();
          swal({
            icon: 'success',
            timer: 1000,
          });
        });
      })
      .catch(err => {
        mostraMensajeError({ err, msgPadron: 'Error al intentar guardar' });
        toggleCargando();
      });
  };

  submit = values => {
    this.preSubmit(values).then(res => {
      history.push('/presupuestos');
    });
  };

  preSubmit = values => {
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
        this.props.dispatch(change('formPresupuestos', `id`, res.data.id));

        toggleCargando();
        swal({
          icon: 'success',
          timer: 1000,
        });
      })
      .catch(err => {
        mostraMensajeError({ err, msgPadron: `Error al intentar guardar` });
        toggleCargando();
      });
  };

  parei = false;

  componentDidUpdate = () => {
    const { toggleCargando } = this.props.actions;
    const { initialValues, esqueleto, items, traeItemsPending, modoNuevo } = this.props;
    if (
        (modoNuevo ||
        (
          initialValues &&
          initialValues.id &&
          (
            (initialValues.items && initialValues.items.length > 0) ||
            (items && !traeItemsPending && items.length > 0 ) ||
            
            (items && !traeItemsPending && items.length === 0)
          ) 
        )
      )
      &&
      esqueleto.cargando === true &&
      !this.parei
      
    ) {
      toggleCargando();
      this.parei = true;
    }
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
      limpiaItems,
      traeMercaderiasServicios,
    } = this.props.actions;
    const { path } = this.props.match;
    toggleCargando();
    limpiaItems();
    listaMonedas();
    traeStatus();
    traeFletes();
    traeSeguros();
    traeFrecuencias();
    traeMercaderiasServicios();
    traePersonasTodas();

    //MODO EDICION
    if (path.indexOf('editar') !== -1) {
      const { traerPresupuesto } = this.props.actions;
      const params = {
        id: this.props.match.params.id,
      };
      traerPresupuesto(params);
      traeItems(params);
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
          agregarItem={this.agregarItem}
          editarItem={this.editarItem}
          eliminarItem={this.eliminarItem}
          enviarFormulario={handleSubmit(this.submit)}
          enviarItems={this.submitItem}
          atualizouFormModal={atualizouFormModal}
          onChangeMoneda={this.onChangeMoneda}
          onChangeItems={this.onChangeItems}
          onChangePersona={this.onChangePersona}
          onChangeComisionista={this.onChangeComisionista}
        />
      </div>
    );
  }
}

FormPresupuestosContainer = reduxForm({
  // a unique name for the form
  form: 'formPresupuestos',
  enableReinitialize: true,
  // onSubmit: this.submit, // submit function must be passed to onSubmit
  validate: values => validate(values, validationConstraints, { fullMessages: false }),
  onChange: (values, dispatch, props) => {
    atualizouForm(values, dispatch, props);
  },
})(FormPresupuestosContainer);

/* istanbul ignore next */
function mapStateToProps(state) {
  const modoNuevo = state.router.location.pathname.indexOf('nuevo') !== -1;
  let initialValues = modoNuevo
    ? {
        n_id_usuario: state.acceder.usuario.id,
      }
    : typeof state.esqueleto.selected[0] !== 'undefined'
    ? {
        ...state.esqueleto.selected[0],
        items: state.presupuestos.items,
      }
    : state.presupuestos.presupuesto || {};
  let initialValuesModal = { n_id_presupuesto: selector(state, 'id') };
  const optionsMonedas = [];
  const optionsStatus = [];
  const optionsClientes = [];
  const optionsComisionista = [];
  const optionsFletes = [];
  const optionsSeguros = [];
  const optionsFrecuencias = [];
  const optionsItems = [];

  if (state.presupuestos.presupuesto) {
    let monedaObj = {};
    for (let moneda of state.cotizaciones.monedas) {
      if (
        (modoNuevo && moneda.b_activo) ||
        ((!modoNuevo && initialValues.n_id_moneda === moneda.id) || moneda.b_activo)
      ) {
        monedaObj = {
          label: moneda.c_descripcion,
          value: moneda.id,
          decimales: moneda.n_decimales,
          extra: moneda,
        };
        optionsMonedas.push(monedaObj);
      }
    }

    let statusObj = {};
    for (let status of state.presupuestos.status) {
      if (
        (modoNuevo && status.b_activo) ||
        ((!modoNuevo && initialValues.n_id_status === status.id) || status.b_activo)
      ) {
        statusObj = {
          label: status.c_descripcion,
          value: status.id,
        };
        optionsStatus.push(statusObj);
      }
    }

    let personaObj = {};
    for (let persona of state.personas.personas) {
      if (
        (modoNuevo && persona.b_cliente) ||
        ((!modoNuevo && initialValues.n_id_persona === persona.id) || persona.b_cliente)
      ) {
        personaObj = {
          label: persona.c_nombre,
          value: persona.id,
        };

        optionsClientes.push(personaObj);
      }
    }

    let comisionistaObj = {};
    for (let comisionista of state.personas.personas) {
      if (
        (modoNuevo && comisionista.b_comisionista) ||
        ((!modoNuevo && initialValues.n_id_persona_comisionista === comisionista.id) ||
          comisionista.b_comisionista)
      ) {
        comisionistaObj = {
          label: comisionista.c_nombre,
          value: comisionista.id,
        };
        optionsComisionista.push(comisionistaObj);
      }
    }

    //rever
    let fleteObj = {};
    for (let flete of state.fletes.fletes) {
      if (
        (modoNuevo && flete.b_activo) ||
        ((!modoNuevo && initialValues.n_id_flete === flete.id) || flete.b_activo)
      ) {
        fleteObj = {
          label: flete.moneda.c_simbolo + flete.n_valor + '/' + flete.c_tipo,
          value: flete.id,
        };
        optionsFletes.push(fleteObj);
      }
    }

    let seguroObj = {};
    for (let seguro of state.seguros.seguros) {
      if (
        (modoNuevo && seguro.b_activo) ||
        ((!modoNuevo && initialValues.n_id_seguro === seguro.id) || seguro.b_activo)
      ) {
        seguroObj = {
          label: seguro.c_valor_exhibir,
          value: seguro.id,
        };
        optionsSeguros.push(seguroObj);
      }
    }

    let frecuenciaObj = {};
    for (let frecuencia of state.presupuestos.frecuencias) {
      if (
        (modoNuevo && frecuencia.b_activo) ||
        ((!modoNuevo && initialValues.n_id_frecuencia === frecuencia.id) || frecuencia.b_activo)
      ) {
        frecuenciaObj = {
          label: frecuencia.c_descripcion,
          value: frecuencia.id,
        };
        optionsFrecuencias.push(frecuenciaObj);
      }
    }

    let itemObj = {};
    for (let item of state.presupuestos.mercaderiasServicios) {
      if ((modoNuevo && item.b_activo) || !modoNuevo) {
        itemObj = {
          label: item.c_descripcion + ' | ' + item.c_desc_moneda,
          value: item.c_descripcion,
          extra: item,
        };
        optionsItems.push(itemObj);
      }
    }
  }

  let decimales = selector(state, 'n_id_moneda')
    ? optionsMonedas.find(moneda => moneda.value === selector(state, 'n_id_moneda'))
    : null;
  decimales = decimales ? decimales.decimales : 2;

  let descMoneda = selector(state, 'n_id_moneda')
    ? optionsMonedas.find(moneda => moneda.value === selector(state, 'n_id_moneda'))
    : null;
  descMoneda = descMoneda ? descMoneda.label : '';

  let monedaSeleccionada = selector(state, 'n_id_moneda')
    ? optionsMonedas.find(moneda => moneda.value === selector(state, 'n_id_moneda'))
    : null;

  return {
    items: state.presupuestos.items,
    modoNuevo,
    traeItemsPending: state.presupuestos.traeItemsPending,
    cotizaciones: state.cotizaciones.cotizaciones,
    esqueleto: state.esqueleto,
    usuario: state.acceder.usuario.c_usuario,
    initialValues,
    initialValuesModal,
    optionsMonedas,
    optionsStatus,
    optionsClientes,
    optionsComisionista,
    optionsSeguros,
    optionsFletes,
    optionsFrecuencias,
    optionsItems,
    decimales,
    descMoneda,
    monedaSeleccionada,
    moneda: selector(state, 'n_id_moneda'),
    status: selector(state, 'n_id_status'),
    persona: selector(state, 'n_id_persona'),
    n_total_general: selector(state, 'n_total_general'),
    id: selector(state, 'id'),
    modoEdicionItem: selectorItem(state, 'id') ? true : false,
    tipoItem: selectorItem(state, 'c_tipo'),
    n_valor_porcentaje_comision: state.configuraciones.configuracion.n_valor_porcentaje_comision,
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
        guardarCotizaciones,
        traeUltimasCotizacionesMoneda,
        toggleCargando,
        traeStatus,
        traePersonasTodas,
        traeFletes,
        traeSeguros,
        traeFrecuencias,
        traeItems,
        limpiaItems,
        traeMercaderiasServicios,
        modalToggle,
      },
      dispatch,
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormPresupuestosContainer);
