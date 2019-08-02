import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Button, Form, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import validate from 'validate.js';
import FormPresupuestoPagos from './FormPresupuestoPagos';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { reduxForm, change, formValueSelector, reset } from 'redux-form';
import formatarNumero from '../../common/formatarNumero';
import moment from 'moment';
import { toggleCargando, procesarTabla } from '../esqueleto/redux/actions';
import mostraMensajeError from '../../common/mostraMensajeError';
import swal from 'sweetalert';

const selector = formValueSelector('formCuotas'); // <-- same as form name

const validationConstraints = {
  d_fecha_vcto: {
    datetime: {
      dateOnly: true,
      message: 'Vencimiento es obligatorio',
    },
  },
  d_fecha_pago: {
    datetime: {
      dateOnly: true,
      message: 'Fecha de pago es obligatorio',
    },
  },
  n_id_persona_baja: {
    presence: {
      message: 'Persona que recibio es obligatorio',
    },
  },
  n_id_medio_pago: {
    presence: {
      message: 'Medio de pago es obligatorio',
    },
  },
};

export class ModalCuotas extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);

    this.state = {
      isOpen: false,
    };
  }

  componentDidMount = () => {
    const { actions } = this.props;
    actions.limpiaCuotas();
  };

  onChangeDescRedondeo = valor => {
    const { dispatch, cuotaSeleccionada } = this.props;
    const recebido = parseFloat(cuotaSeleccionada.extra.n_valor) + parseFloat(valor);
    dispatch(change('formCuotas', 'n_tot_recibido', recebido));
  };

  onChangeCuotas = id => {
    const { dispatch, actions, optionsCuotas, datos } = this.props;
    actions.toggleCargando();

    const cuotaSeleccionada = optionsCuotas.find(cuota => cuota.value === id);
    dispatch(reset('formCuotas'));
    dispatch(change('formCuotas', 'persona.c_nombre', datos.persona.c_nombre));
    dispatch(change('formCuotas', 'moneda.c_descripcion', datos.moneda.c_descripcion));
    dispatch(change('formCuotas', 'n_total_general', datos.n_total_general));

    setTimeout(() => {
      Object.entries(cuotaSeleccionada.extra).map((arrayDatos, indice) => {
        const campo = arrayDatos[0];
        const valor = arrayDatos[1];
        return dispatch(change('formCuotas', campo, valor));
      });
      actions.toggleCargando();
    }, 100);
  };

  setaDatos() {
    const { dispatch, datos, actions, optionsCobradores, optionsMediosPago } = this.props;
    actions.toggleCargando();
    dispatch(change('formCuotas', 'persona.c_nombre', datos.persona.c_nombre));
    dispatch(change('formCuotas', 'moneda.c_descripcion', datos.moneda.c_descripcion));
    dispatch(change('formCuotas', 'n_total_general', datos.n_total_general));
    const params = {
      id: datos.id,
    };
    if (optionsCobradores.length === 0) {
      actions.traeCobradores().catch(err => {
        actions.toggleCargando();
        mostraMensajeError({ err, msgPadron: 'Error al intentar traer los cobradores' });
      });
    }
    if (optionsMediosPago.length === 0) {
      actions.traeMediosPago().catch(err => {
        actions.toggleCargando();
        mostraMensajeError({ err, msgPadron: 'Error al intentar traer los medios de pagos' });
      });
    }
    actions
      .traeCuotas(params)
      .then(res => {
        this.setState(state => ({ isOpen: !state.isOpen }));

        actions.toggleCargando();
      })
      .catch(err => {
        actions.toggleCargando();
        mostraMensajeError({ err, msgPadron: 'Error al intentar traer las cuotas' });
      });
  }

  toggleModal() {
    if (!this.state.isOpen) {
      const { dispatch } = this.props;
      dispatch(reset('formCuotas'));
      this.setaDatos();
    }
  }

  submit = values => {
    const valores = {
      id: values.id,
      d_fecha_pago: values.d_fecha_pago,
      n_desc_redondeo: values.n_desc_redondeo,
      n_id_medio_pago: values.n_id_medio_pago,
      n_id_persona_baja: values.n_id_persona_baja,
      n_id_presupuesto: values.n_id_presupuesto,
      t_observacion: values.t_observacion,
    };
    const params = {
      data: valores,
      method: values.id && values.id !== '' ? 'put' : 'post',
    };
    const { actions } = this.props;
    actions
      .actualizaCuota(params)
      .then(res => {
        const { datos } = this.props;
        if (datos.n_id_status === 3) {
          actions.toggleCargando();
          actions
            .procesarTabla({
              api_funcion: 'presupuestos/aprobados',
            })
            .then(res => {
              actions.toggleCargando().then(res => {
                this.toggleModal();
                swal({ icon: 'success', timer: 1000 });
              });
            });
        } else {
          swal({ icon: 'success', timer: 1000 });
          this.toggleModal();
        }
      })
      .catch(err => {
        mostraMensajeError({ err, msgPadron: 'Error al intentar actualizar esta cuota' });
      });
  };

  render() {
    const { isOpen } = this.state;
    const { handleSubmit, submitting, pristine, datos, cuotaSeleccionada } = this.props;
    const soloLectura = datos.n_id_status === 4;
    return (
      <div className="presupuestos-modal-cuotas">
        <button className="btn-danger btn btn-md" onClick={() => this.toggleModal()}>
          <FontAwesomeIcon icon={faCoins} />
        </button>
        <Modal centered isOpen={isOpen} toggle={this.toggleModal} size={'lg'}>
          <Form onSubmit={handleSubmit(this.submit)}>
            <ModalHeader toggle={this.toggleModal}>
              Pagos del Presupuesto N. {datos.id} - Valores en: {datos.moneda.c_descripcion}
            </ModalHeader>
            <ModalBody>
              <FormPresupuestoPagos
                {...this.props}
                onChangeCuotas={this.onChangeCuotas}
                onChangeDescRedondeo={this.onChangeDescRedondeo}
                soloLectura={soloLectura}
              />
            </ModalBody>
            <ModalFooter>
              {cuotaSeleccionada && (
                <div>
                  <Button color="secondary" onClick={this.toggleModal}>
                    Cancelar
                  </Button>{' '}
                  {!soloLectura && (
                    <Button type="submit" color="success" disabled={pristine || submitting}>
                      {submitting ? 'Guardando' : 'Guardar'}
                    </Button>
                  )}
                </div>
              )}
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    );
  }
}

ModalCuotas = reduxForm({
  // a unique name for the form
  form: 'formCuotas',
  enableReinitialize: true,
  // onSubmit: this.submit, // submit function must be passed to onSubmit
  validate: values => validate(values, validationConstraints, { fullMessages: false }),
})(ModalCuotas);

/* istanbul ignore next */
function mapStateToProps(state) {
  let optionsCuotas = [];
  let optionsCobradores = [];
  let optionsMediosPago = [];

  let itemObj = {};
  let decimales = 0;
  let cuotaSeleccionada = null;
  if (state.presupuestos.cuotas.length > 0) {
    decimales = state.presupuestos.cuotas[0].moneda
      ? state.presupuestos.cuotas[0].moneda.n_decimales
      : 0;
    for (let item of state.presupuestos.cuotas) {
      if (!item.moneda) {
        return;
      }
      const valorFormatado = formatarNumero(item.n_recebido, decimales, true);
      itemObj = {
        label:
          'Cuota N.: ' +
          item.n_nr_cuota +
          ' | ' +
          item.moneda.c_simbolo +
          ' ' +
          valorFormatado +
          ' | Vcto.: ' +
          moment(item.d_fecha_vcto).format('DD/MM/YYYY') +
          ' | Pagado: ' +
          (item.d_fecha_pago !== null ? moment(item.d_fecha_pago).format('DD/MM/YYYY') : 'No'),
        value: item.id,
        extra: item,
      };
      optionsCuotas.push(itemObj);
    }
    cuotaSeleccionada = optionsCuotas.find(cuota => cuota.value === selector(state, 'cuotas'));
  }

  for (let item of state.presupuestos.cobradores) {
    itemObj = {
      label: item.c_nombre,
      value: item.id,
      extra: item,
    };
    optionsCobradores.push(itemObj);
  }

  for (let item of state.presupuestos.mediosPago) {
    itemObj = {
      label: item.c_descripcion,
      value: item.id,
      extra: item,
    };
    optionsMediosPago.push(itemObj);
  }

  return {
    optionsCuotas,
    decimales,
    cuotaSeleccionada,
    optionsCobradores,
    optionsMediosPago,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, toggleCargando, procesarTabla }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalCuotas);
