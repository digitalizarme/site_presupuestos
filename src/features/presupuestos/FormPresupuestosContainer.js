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
import formatarNumero from '../../common/formatarNumero';

import {
  traerPresupuesto,
  traeStatus,
  traeFrecuencias,
  traeItems,
  traeMercaderiasServicios,
  generaCuotas,
  traeCuotas,
  eliminaCuotas,
} from './redux/actions';
import { Principal } from '../esqueleto';

import { FormPresupuestos } from './';
import swal from 'sweetalert';
import { formValueSelector, reduxForm, change, reset } from 'redux-form';
import validate from 'validate.js';

// Decorate with connect to read form values
const selector = formValueSelector('formPresupuestos'); // <-- same as form name
const selectorItem = formValueSelector('formModal'); // <-- same as form name

const validationConstraints = {
  n_id_moneda: {
    presence: {
      message: 'Moneda es obligatorio',
    },
  },
  n_id_status: {
    presence: {
      message: 'Status es obligatorio',
    },
  },
  n_id_persona: {
    presence: {
      message: 'Persona es obligatorio',
    },
  },
  n_dif_cuotas: {
    numericality: {
      onlyInteger: false,
      equalTo: 0,
      notEqualTo: 'El valor debe ser igual que zero',
    },
  },
};

const validationConstraintsItems = {
  c_descripcion: {
    presence: {
      message: 'Descripción es obligatorio',
    },
    length: {
      minimum: 5,
      message: 'Su Descripción debe tener no mínimo 5 caracteres',
    },
  },
  n_cotizacion: {
    presence: {
      message: 'Cotización es obligatorio',
    },
    numericality: {
      onlyInteger: false,
      notValid: 'Este valor no es válido.',
      greaterThan: 0,
      notGreaterThan: 'El valor debe ser mayor que zero',
    },
  },
  n_cantidad: {
    presence: {
      message: 'Cantidad es obligatorio',
    },
    numericality: {
      onlyInteger: false,
      notValid: 'Este valor no es válido.',
      greaterThan: 0,
      notGreaterThan: 'El valor debe ser mayor que zero',
    },
  },
  n_unitario: {
    presence: {
      message: 'Precio unitario es obligatorio',
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
  n_flete: {
    presence: {
      message: 'Flete es obligatorio',
    },
    numericality: {
      onlyInteger: false,
      notValid: 'Este valor no es válido.',
      greaterThan: 0,
      notGreaterThan: 'El valor debe ser mayor que zero',
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

const totalizaSeguro = ({ props, totSeguro }) => {
  let { optionsSeguros, seguro, n_tipo_seguro_valor } = props;

  if (typeof totSeguro !== 'undefined') {
    n_tipo_seguro_valor = totSeguro;
  }
  const seguroElejido = optionsSeguros.find(objSeguro => objSeguro.value === seguro);
  const valorSeguro = seguroElejido
    ? parseFloat(n_tipo_seguro_valor || 0) * parseFloat(seguroElejido.extra.n_valor || 0)
    : 0;
  props.dispatch(change('formPresupuestos', `n_valor_seguro`, valorSeguro));
  return valorSeguro;
};

const totalizaItems = ({ items, props }) => {
  const { n_valor_porcentaje_comision, seguro } = props;
  let totExentas = 0;
  let totFletes = 0;
  let tot5 = 0;
  let tot10 = 0;
  let totItems = 0;
  let totIVA5 = 0;
  let totIVA10 = 0;
  let totIVA = 0;
  let totSeguro = 0;
  if (items && items.length > 0) {
    items.map((objItem, indice) => {
      totExentas += parseFloat(objItem.n_exentas);
      totFletes += parseFloat(objItem.n_flete);
      tot5 += parseFloat(objItem.n_gravadas_5);
      tot10 += parseFloat(objItem.n_gravadas_10);
      if (objItem.b_seguro) {
        totSeguro +=
          parseFloat(objItem.n_exentas) +
          parseFloat(objItem.n_flete) +
          parseFloat(objItem.n_gravadas_5) +
          parseFloat(objItem.n_gravadas_10);
      }
      return true;
    });
    totItems =
      parseFloat(totExentas) + parseFloat(totFletes) + parseFloat(tot5) + parseFloat(tot10);
    totIVA5 = parseFloat(tot5) / 21;
    totIVA10 = parseFloat(tot10) / 11;
    totIVA = parseFloat(totIVA5) + parseFloat(totIVA10);
  }
  const valorComision =
    ((parseFloat(totItems) - parseFloat(totFletes)) * parseFloat(n_valor_porcentaje_comision)) /
    100;

  props.dispatch(change('formPresupuestos', `n_total_exentas`, totExentas));
  props.dispatch(change('formPresupuestos', `n_total_flete`, totFletes));
  props.dispatch(change('formPresupuestos', `n_total_5`, tot5));
  props.dispatch(change('formPresupuestos', `n_total_10`, tot10));
  props.dispatch(change('formPresupuestos', `n_total_items`, totItems));
  props.dispatch(change('formPresupuestos', `n_total_iva_5`, totIVA5));
  props.dispatch(change('formPresupuestos', `n_total_iva_10`, totIVA10));
  props.dispatch(change('formPresupuestos', `n_total_iva`, totIVA));
  props.dispatch(change('formPresupuestos', `n_tipo_seguro_valor`, totSeguro));
  props.dispatch(change('formPresupuestos', `n_valor_comision`, valorComision));
  if (seguro) {
    totalizaSeguro({ props, totSeguro });
  }
};

const atualizouForm = (values, dispatch, props) => {
  if (
    !props.traeStatusPending &&
    !props.traerPresupuestoPending &&
    !props.traeFrecuenciasPending &&
    !props.traeItemsPending &&
    !props.traeMercaderiasServiciosPending
  ) {
    if ((values.n_id_moneda || values.n_id_persona) && !values.n_id_status) {
      dispatch(change('formPresupuestos', `n_id_status`, 1));
    }
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
  c_monedaOrigemDestino,
  n_cotizacion,
  idFlete,
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
  if (typeof c_monedaOrigemDestino !== 'undefined') {
    dispatch(change('formModal', `c_monedaOrigemDestino`, c_monedaOrigemDestino));
  }
  if (typeof n_cotizacion !== 'undefined') {
    dispatch(change('formModal', `n_cotizacion`, n_cotizacion));
  }
  if (typeof idFlete !== 'undefined') {
    dispatch(change('formModal', `n_id_flete`, idFlete));
  }
};

const setaValorGs = ({
  monedaSeleccionada,
  totalGeneral,
  dispatch,
  traeUltimasCotizacionesMoneda,
}) => {
  if (monedaSeleccionada && monedaSeleccionada.extra.id !== 1) {
    const c_monedaOrigemDestino = monedaSeleccionada.extra.c_letras + '_PYG';
    traeUltimasCotizacionesMoneda(c_monedaOrigemDestino)
      .then(res => {
        if (res.data && res.data.length > 0) {
          const cotizacion = parseFloat(res.data[0].n_valor) || 0;
          const totGs = parseFloat(totalGeneral) * cotizacion;
          dispatch(change('formPresupuestos', `n_total_general_gs`, totGs));
        }
      })
      .catch(err => {
        mostraMensajeError({ err, msgPadron: 'Error al intentar traer la cotizacion' });
      });
  }
};

const recalcula_impuesto = props => {
  let cantidad = parseFloat(props.n_cantidad || 0, 2);
  let unitario = parseFloat(props.n_unitario || 0, 2);
  let exentas = parseFloat(props.n_exentas, 2);
  let cinco = parseFloat(props.n_gravadas_5, 2);
  let diez = parseFloat(props.n_gravadas_10, 2);
  let impuesto = parseFloat(cantidad * unitario);
  let diferencia = 0;
  let campo_mayor = '';
  const valorMaximo = 9999999999999.99;

  if (
    impuesto * ratio_0 <= valorMaximo &&
    impuesto * ratio_5 <= valorMaximo &&
    impuesto * ratio_10 <= valorMaximo
  ) {
    exentas = parseFloat(impuesto * ratio_0, 2);
    cinco = parseFloat(impuesto * ratio_5, 2);
    diez = parseFloat(impuesto * ratio_10, 2);
    diferencia = impuesto - (exentas + cinco + diez);
    campo_mayor = retorna_campo_mayor({ exentas, cinco, diez });
    let valor = exentas;

    if (exentas >= 0) {
      props.dispatch(change('formModal', 'n_exentas', exentas));
    }
    if (cinco >= 0) {
      props.dispatch(change('formModal', 'n_gravadas_5', cinco));
    }
    if (diez >= 0) {
      props.dispatch(change('formModal', 'n_gravadas_10', diez));
    }
    if (campo_mayor === 'n_gravadas_5') {
      valor = cinco;
    } else if (campo_mayor === 'n_gravadas_10') {
      valor = diez;
    }

    valor += diferencia;
    if (valor >= 0) {
      props.dispatch(change('formModal', campo_mayor, valor));
    }
  } else if (cantidad > 0 && unitario > 0) {
    swal({
      title: 'Ops',
      text: 'Valor supera al maximo permitido',
      icon: 'warning',
      button: 'OK!',
    });
  } else if ((!impuesto || impuesto === 0) && (exentas === 0 || cinco === 0 || diez === 0)) {
    swal({
      title: 'Ops',
      text: 'La cantidad y el precio unitario deben ser mayor que zero',
      icon: 'warning',
      button: 'OK!',
    });
  }
};
let ratio_0, ratio_5, ratio_10;

const recalcula_ratio = props => {
  const cantidad = parseFloat(props.n_cantidad || 0, 2);
  const unitario = parseFloat(props.n_unitario || 0, 2);
  const exentas = parseFloat(props.n_exentas || 0, 2);
  const cinco = parseFloat(props.n_gravadas_5 || 0, 2);
  const diez = parseFloat(props.n_gravadas_10 || 0, 2);
  const impuesto = parseFloat(cantidad * unitario);
  ratio_0 = (exentas * 100) / impuesto / 100;
  ratio_5 = (cinco * 100) / impuesto / 100;
  ratio_10 = (diez * 100) / impuesto / 100;
};

const retorna_campo_mayor = ({ exentas, cinco, diez }) => {
  let campo_mayor = 'n_exentas';
  if (cinco > exentas) {
    if (cinco > diez) {
      campo_mayor = 'n_gravadas_5';
    } else {
      campo_mayor = 'n_gravadas_10';
    }
  } else if (diez > exentas) {
    campo_mayor = 'n_gravadas_10';
  }
  return campo_mayor;
};

const validaValoresItem = values => {
  const total = parseFloat(values.n_unitario) * parseFloat(values.n_cantidad);
  const impuesto =
    parseFloat(values.n_exentas) ||
    0 + parseFloat(values.n_gravadas_5) ||
    0 + parseFloat(values.n_gravadas_10) ||
    0;
  if (total !== impuesto) {
    swal({
      title: 'Ops',
      text: `La suma de los valores de (Exenta + IVA 5% + IVA 10%) (${impuesto}) tiene que ser igual a (Cantidad * Unitario) (${total})`,
      icon: 'warning',
      button: 'OK!',
    });

    return false;
  }
  return true;
};

export class FormPresupuestosContainer extends Component {
  static propTypes = {
    // presupuestos: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    esqueleto: PropTypes.object.isRequired,
  };

  onChangeValorCuota = ({ fields, actual }) => {
    const { n_total_general, decimales } = this.props;
    let total = 0;
    fields.map((campo, indice) => {
      console.log(total);

      if (indice === actual.indice) {
        total += parseFloat(actual.valor);
      } else {
        total += parseFloat(campo.n_valor);
      }

      return true;
    });
    total = total.toFixed(decimales);
    let diff = n_total_general - total;
    diff = Math.abs(diff.toFixed(decimales));
    this.props.dispatch(change('formPresupuestos', `n_dif_cuotas`, diff));
  };

  onChangePagos = campos => {
    const { id, monedaSeleccionada, n_total_general } = this.props;
    const { generaCuotas } = this.props.actions;
    const params = {
      data: {
        ...campos,
        id,
        n_id_moneda: monedaSeleccionada.value,
        n_decimales: monedaSeleccionada.extra.n_decimales,
        n_total_general,
      },
      method: 'post',
    };
    if (!campos.n_cuotas_pago || !campos.n_dias_Frecuencia_pago) {
      return;
    } else if (campos.n_cuotas_pago > 1 && campos.n_dias_Frecuencia_pago === 1) {
      swal({
        title: 'Ops',
        text: 'No se puede tener mas de una cuota con vencimiento al contado',
        icon: 'warning',
        button: 'OK!',
      });
      return;
    }
    toggleCargando();
    generaCuotas(params)
      .then(res => {
        this.props.dispatch(change('formPresupuestos', `cuotas`, res.data));
        if (this.props.status === 1) {
          this.props.dispatch(change('formPresupuestos', `n_id_status`, 2));
        }
        toggleCargando();
      })
      .catch(err => {
        mostraMensajeError({ err, msgPadron: 'Error al intentar generar cuotas' });
        toggleCargando();
      });
  };

  onChangeImpuesto = campos => {
    const props = {
      ...campos,
      dispatch: this.props.dispatch,
    };
    recalcula_impuesto(props);
  };

  onChangeRatio = campos => {
    const props = {
      ...campos,
      dispatch: this.props.dispatch,
    };
    recalcula_ratio(props);
  };

  onChangeCamposValores = campos => {
    const { optionsSeguros, dispatch, n_total_items, monedaSeleccionada } = this.props;
    const props = {
      ...campos,
      optionsSeguros,
      dispatch,
    };
    const { traeUltimasCotizacionesMoneda } = this.props.actions;

    const valorSeguro = totalizaSeguro({ props });
    const totalGeneral =
      parseFloat(n_total_items || 0) +
      parseFloat(campos.n_valor_comision || 0) +
      parseFloat(valorSeguro || 0) +
      parseFloat(campos.n_desc_redondeo || 0);

    setaValorGs({
      monedaSeleccionada,
      totalGeneral,
      dispatch: this.props.dispatch,
      traeUltimasCotizacionesMoneda,
    });
    this.props.dispatch(change('formPresupuestos', `n_total_general`, totalGeneral));
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

  onChangeSeguro = idSeguro => {
    if (idSeguro) {
      const props = {
        ...this.props,
        seguro: idSeguro,
      };
      totalizaSeguro({ props });
    }
  };

  onChangePesoFlete = idFlete => {
    if (idFlete) {
      const { optionsFletes, monedaSeleccionada, n_peso } = this.props;
      const { traeUltimasCotizacionesMoneda } = this.props.actions;
      let fleteSeleccionado = optionsFletes.find(item => item.value === idFlete);
      fleteSeleccionado = fleteSeleccionado ? fleteSeleccionado.extra : {};

      if (fleteSeleccionado.n_id_moneda !== monedaSeleccionada.value) {
        const c_monedaOrigemDestino =
          fleteSeleccionado.moneda.c_letras + '_' + monedaSeleccionada.extra.c_letras;

        traeUltimasCotizacionesMoneda(c_monedaOrigemDestino)
          .then(res => {
            if (res.data && res.data.length > 0) {
              const cotizacion = res.data[0].n_valor;
              const flete = parseFloat(n_peso) * fleteSeleccionado.n_valor * cotizacion;
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
          })
          .catch(err => {
            toggleCargando();
            mostraMensajeError({ err, msgPadron: 'Error al intentar traer la cotizacion' });
          });
      } else {
        const flete = parseFloat(n_peso) * fleteSeleccionado.n_valor;
        atualizaCamposItem({ dispatch: this.props.dispatch, flete });
      }
    }
  };

  onChangeItems = idItem => {
    const { monedaSeleccionada, optionsItems } = this.props;
    const { traeUltimasCotizacionesMoneda, toggleCargando } = this.props.actions;
    toggleCargando().then(res => {
      this.props.dispatch(change('formModal', `n_cantidad`, 1));
      let itemSeleccionado = idItem ? optionsItems.find(item => item.value === idItem) : null;
      itemSeleccionado = itemSeleccionado ? itemSeleccionado.extra : null;
      if (!itemSeleccionado) {
        atualizaCamposItem({
          dispatch: this.props.dispatch,
          unitario: 1,
          exentas: 1,
          gravadas_5: 0,
          gravadas_10: 0,
          peso: 0,
          tipo: 'M',
          obs: 'Nueva Obs',
          c_monedaOrigemDestino:
            monedaSeleccionada.extra.c_letras + '_' + monedaSeleccionada.extra.c_letras,
          n_cotizacion: 1,
        });
        const props_ratio = {
          n_cantidad: 1,
          n_unitario: 1,
          n_exentas: 1,
          n_gravadas_5: 0,
          n_gravadas_10: 0,
        };
        recalcula_ratio(props_ratio);
        toggleCargando();
      } else {
        const tipo = itemSeleccionado.c_tipo;
        const obs = itemSeleccionado.t_observacion;
        const idFlete = itemSeleccionado.n_id_flete;
        let unitario = parseFloat(itemSeleccionado.n_unitario);
        let exentas = parseFloat(itemSeleccionado.n_exentas);
        let gravadas_5 = parseFloat(itemSeleccionado.n_gravadas_5);
        let gravadas_10 = parseFloat(itemSeleccionado.n_gravadas_10);
        let peso = parseFloat(itemSeleccionado.n_peso);
        let flete = peso * parseFloat(itemSeleccionado.n_flete);
        const props_ratio = {
          n_cantidad: 1,
          n_unitario: unitario,
          n_exentas: exentas,
          n_gravadas_5: gravadas_5,
          n_gravadas_10: gravadas_10,
        };
        recalcula_ratio(props_ratio);
        let c_monedaOrigemDestino =
          monedaSeleccionada.extra.c_letras + '_' + monedaSeleccionada.extra.c_letras;
        let n_cotizacion = 1;
        if (itemSeleccionado.n_id_moneda !== monedaSeleccionada.extra.id) {
          c_monedaOrigemDestino =
            itemSeleccionado.c_letras_moneda + '_' + monedaSeleccionada.extra.c_letras;

          traeUltimasCotizacionesMoneda(c_monedaOrigemDestino)
            .then(res => {
              if (res.data && res.data.length > 0) {
                n_cotizacion = parseFloat(res.data[0].n_valor);
                unitario *= n_cotizacion;
                unitario = unitario.toFixed(itemSeleccionado.n_decimales_moneda);

                exentas *= n_cotizacion;
                exentas = exentas.toFixed(itemSeleccionado.n_decimales_moneda);

                gravadas_5 *= n_cotizacion;
                gravadas_5 = gravadas_5.toFixed(itemSeleccionado.n_decimales_moneda);

                gravadas_10 *= n_cotizacion;
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
                  c_monedaOrigemDestino,
                  n_cotizacion,
                  idFlete,
                });
              } else {
                swal({
                  title: 'Ops',
                  text: 'No fue posible obtener las ultimas cotizaciones.',
                  icon: 'warning',
                  button: 'OK!',
                });
              }
            })
            .catch(err => {
              toggleCargando();
              mostraMensajeError({ err, msgPadron: 'Error al intentar traer la cotizacion' });
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
            n_cotizacion,
            c_monedaOrigemDestino,
            idFlete,
          });
        }
        //SI ES MERCADORIA Y LA MONEDA DEL FLETE ES DISTINCTA A LA DEL ITEM
        if (
          itemSeleccionado.c_tipo === 'M' &&
          itemSeleccionado.n_flete_moneda !== monedaSeleccionada.extra.id
        ) {
          const c_monedaOrigemDestino =
            itemSeleccionado.c_letras_flete_moneda + '_' + monedaSeleccionada.extra.c_letras;

          traeUltimasCotizacionesMoneda(c_monedaOrigemDestino)
            .then(res => {
              if (res.data && res.data.length > 0) {
                const cotizacion = res.data[0];
                flete *= parseFloat(cotizacion.n_valor);
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
            })
            .catch(err => {
              atualizaCamposItem({ dispatch: this.props.dispatch, flete: 0 });
              toggleCargando();
              mostraMensajeError({ err, msgPadron: 'Error al intentar traer la cotizacion' });
            });
        } else {
          atualizaCamposItem({ dispatch: this.props.dispatch, flete });
          toggleCargando();
        }
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
    let itemSeleccionado = datos.c_descripcion
      ? this.props.optionsItems.find(item => item.value === datos.c_descripcion)
      : null;
    itemSeleccionado = itemSeleccionado ? itemSeleccionado.extra : null;
    if (itemSeleccionado && itemSeleccionado.n_id_flete) {
      this.props.dispatch(change('formModal', 'n_id_flete', itemSeleccionado.n_id_flete));
    }

    const props_ratio = {
      n_cantidad: datos.n_cantidad,
      n_unitario: datos.n_unitario,
      n_exentas: datos.n_exentas,
      n_gravadas_5: datos.n_gravadas_5,
      n_gravadas_10: datos.n_gravadas_10,
    };
    recalcula_ratio(props_ratio);
    modalToggle();
  };

  eliminarItem = item => {
    const { api_axio, toggleCargando, traeItems, eliminaCuotas } = this.props.actions;
    const props = this.props;
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
            let params = {
              id: item.n_id_presupuesto,
            };
            traeItems(params).then(res => {
              totalizaItems({ items: res.data, props });
              this.props.dispatch(this.props.handleSubmit(this.preSubmit));
              this.props.dispatch(change('formPresupuestos', 'n_id_status', 1));
              this.props.dispatch(change('formPresupuestos', 'n_cuotas_pago', 0));
              this.props.dispatch(change('formPresupuestos', 'n_dif_cuotas', 0));
              params = {
                id: item.n_id_presupuesto,
                method: 'delete',
              };
              eliminaCuotas(params).then(res => {
                this.props.dispatch(change('formPresupuestos', `cuotas`, res.data));
              });
              toggleCargando();
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
    const { modalToggle, api_axio, toggleCargando, traeItems, eliminaCuotas } = this.props.actions;
    const props = this.props;
    toggleCargando();
    const params = {
      data: values,
      method: values.id && values.id !== '' ? 'put' : 'post',
    };
    if (!validaValoresItem(values)) {
      toggleCargando();

      return;
    }
    return api_axio({
      api_funcion: 'presupuestos/item',
      params,
    })
      .then(res => {
        let params = {
          id: values.n_id_presupuesto,
        };
        traeItems(params).then(res => {
          totalizaItems({ items: res.data, props });
          this.props.dispatch(this.props.handleSubmit(this.preSubmit));
          this.props.dispatch(change('formPresupuestos', 'n_id_status', 1));
          this.props.dispatch(change('formPresupuestos', 'n_cuotas_pago', 0));
          this.props.dispatch(change('formPresupuestos', 'n_dif_cuotas', 0));

          params = {
            id: values.n_id_presupuesto,
            method: 'delete',
          };

          eliminaCuotas(params).then(res => {
            this.props.dispatch(change('formPresupuestos', `cuotas`, res.data));
          });
          toggleCargando();
          modalToggle();
        });
      })
      .catch(err => {
        mostraMensajeError({ err, msgPadron: 'Error al intentar guardar' });
        toggleCargando();
      });
  };

  submit = values => {
    const { history } = this.props;

    this.preSubmit(values).then(res => {
      swal({
        icon: 'success',
        timer: 1000,
      });
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
        (initialValues &&
          initialValues.id &&
          ((initialValues.items && initialValues.items.length > 0) ||
            (items && !traeItemsPending && items.length > 0) ||
            (items && !traeItemsPending && items.length === 0)))) &&
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
      traeMercaderiasServicios,
      traeUltimasCotizacionesMoneda,
      traeCuotas,
      traerPresupuesto,
    } = this.props.actions;
    const { path } = this.props.match;
    toggleCargando();
    listaMonedas();
    traeStatus();
    traeFletes();
    traeSeguros();
    traeFrecuencias();
    traeMercaderiasServicios();
    traePersonasTodas();

    //MODO EDICION
    if (path.indexOf('editar') !== -1) {
      const params = {
        id: this.props.match.params.id,
      };
      traerPresupuesto(params).then(res => {
        const datos = res.data;
        const monedaSeleccionada = {
          extra: datos.moneda,
        };
        setaValorGs({
          monedaSeleccionada,
          totalGeneral: datos.n_total_general,
          dispatch: this.props.dispatch,
          traeUltimasCotizacionesMoneda,
        });
      });
      traeItems(params);
      traeCuotas(params).then(res => {
        this.props.dispatch(change('formPresupuestos', `cuotas`, res.data));
      });
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
          onChangeSeguro={this.onChangeSeguro}
          onChangeCamposValores={this.onChangeCamposValores}
          onChangeImpuesto={this.onChangeImpuesto}
          onChangePeso={this.onChangePeso}
          onChangeRatio={this.onChangeRatio}
          validationConstraintsItems={validationConstraintsItems}
          onChangePesoFlete={this.onChangePesoFlete}
          onChangePagos={this.onChangePagos}
          onChangeValorCuota={this.onChangeValorCuota}
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
      }
    : {
        ...state.presupuestos.presupuesto,
      } || {};
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
          extra: flete,
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
          extra: seguro,
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
          value: frecuencia.n_cantidad_dias,
        };
        optionsFrecuencias.push(frecuenciaObj);
      }
    }

    let itemObj = {};
    for (let item of state.presupuestos.mercaderiasServicios) {
      if ((modoNuevo && item.b_activo) || !modoNuevo) {
        let decimales = item.n_id_moneda
          ? optionsMonedas.find(moneda => moneda.value === item.n_id_moneda)
          : null;
        decimales = decimales ? decimales.decimales : 2;
        const valorFormatado = formatarNumero(item.n_unitario, decimales, true);
        itemObj = {
          label: item.c_descripcion + ' | ' + valorFormatado + ' ' + item.c_desc_moneda,
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

  let itemSeleccionado = selectorItem(state, 'c_descripcion')
    ? optionsItems.find(item => item.value === selectorItem(state, 'c_descripcion'))
    : null;
  itemSeleccionado = itemSeleccionado ? itemSeleccionado.extra : {};

  let descMonedaItem = itemSeleccionado.n_id_moneda
    ? optionsMonedas.find(moneda => moneda.value === itemSeleccionado.n_id_moneda)
    : null;
  descMonedaItem = descMonedaItem ? descMonedaItem.label : '';
  if (
    monedaSeleccionada && selectorItem(state, 'c_descripcion') &&
    optionsItems.find(item => item.value === selectorItem(state, 'c_descripcion')) == null
  ) {
    const itemObj = {
      label:
        selectorItem(state, 'c_descripcion') +
        ' | ' +
        formatarNumero(
          selectorItem(state, 'n_unitario'),
          monedaSeleccionada.extra.n_decimales,
          true,
        ) +
        ' ' +
        descMoneda,
      value: selectorItem(state, 'c_descripcion'),
    };
    optionsItems.push(itemObj);
  }

  return {
    items: state.presupuestos.items,
    presupuestos: state.presupuestos,
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
    seguro: selector(state, 'n_id_seguro'),
    n_total_general: selector(state, 'n_total_general') || 0,
    n_tipo_seguro_valor: selector(state, 'n_tipo_seguro_valor') || 0,
    n_desc_redondeo: selector(state, 'n_desc_redondeo') || 0,
    n_total_items: selector(state, 'n_total_items') || 0,
    n_valor_comision: selector(state, 'n_valor_comision') || 0,
    n_valor_seguro: selector(state, 'n_valor_seguro') || 0,
    n_cuotas_pago: selector(state, 'n_cuotas_pago'),
    n_dias_Frecuencia_pago: selector(state, 'n_dias_Frecuencia_pago'),
    id: selector(state, 'id'),
    n_dif_cuotas: selector(state, 'n_dif_cuotas'),
    modoEdicionItem: selectorItem(state, 'id') ? true : false,
    c_desc_item: selectorItem(state, 'c_descripcion'),
    tipoItem: selectorItem(state, 'c_tipo'),
    n_cantidad: selectorItem(state, 'n_cantidad'),
    n_unitario: selectorItem(state, 'n_unitario'),
    n_exentas: selectorItem(state, 'n_exentas'),
    n_gravadas_5: selectorItem(state, 'n_gravadas_5'),
    n_gravadas_10: selectorItem(state, 'n_gravadas_10'),
    n_peso: selectorItem(state, 'n_peso'),
    n_id_flete: selectorItem(state, 'n_id_flete'),
    itemSeleccionado,
    descMonedaItem,
    n_valor_porcentaje_comision:
      state.configuraciones.configuracion.n_valor_porcentaje_comision || 0,
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
        traeMercaderiasServicios,
        modalToggle,
        generaCuotas,
        traeCuotas,
        eliminaCuotas,
      },
      dispatch,
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormPresupuestosContainer);
