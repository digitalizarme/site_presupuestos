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
import { toggleCargando } from '../esqueleto/redux/actions';
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
    optionsCuotas: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.toggleModal = this.toggleModal.bind(this);

    this.state = {
      isOpen: false,
    };
  }

  onChangeDescRedondeo = valor => {
    const { dispatch, cuotaSeleccionada } = this.props;
    const recebido = cuotaSeleccionada.extra.n_valor + parseFloat(valor);
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
        if (campo === 'd_fecha_pago') {
          arrayDatos[1] = moment(arrayDatos[1]).format('YYYY-MM-DD');
        }
        const valor = arrayDatos[1];
        return dispatch(change('formCuotas', campo, valor));
      });
      const recebido = cuotaSeleccionada.extra.n_valor + cuotaSeleccionada.extra.n_desc_redondeo;
      dispatch(change('formCuotas', 'n_tot_recibido', recebido));
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
      actions.traeCobradores();
    }
    if (optionsMediosPago.length === 0) {
      actions.traeMediosPago();
    }
    actions.traeCuotas(params).then(res => {
      actions.toggleCargando();
    });
  }

  toggleModal() {
    if (!this.state.isOpen) {
      const { dispatch } = this.props;
      dispatch(reset('formCuotas'));
      this.setaDatos();
    }
    this.setState(state => ({ isOpen: !state.isOpen }));
  }

  submit = values => {
    const valores = {
      id: values.id,
      d_fecha_pago:
        values.d_fecha_pago && values.d_fecha_pago !== 'Invalid date' ? values.d_fecha_pago : null,
      n_desc_redondeo: values.n_desc_redondeo ? values.n_desc_redondeo : 0,
      n_id_medio_pago: values.n_id_medio_pago ? values.n_id_medio_pago : null,
      n_id_persona_baja: values.n_id_persona_baja ? values.n_id_persona_baja : null,
    };
    const params = {
      data: valores,
      method: values.id && values.id !== '' ? 'put' : 'post',
    };
    const { actions } = this.props;
    actions
      .actualizaCuota(params)
      .then(res => {
        this.toggleModal();
        swal({ icon: 'success', timer: 1000 });
      })
      .catch(err => {
        mostraMensajeError({ err, msgPadron: 'Error al intentar actualizar esta cuota' });
      });
    console.log(valores, 'values');
  };

  render() {
    const { isOpen } = this.state;
    const { handleSubmit, submitting, pristine, datos } = this.props;
    return (
      <div className="presupuestos-modal-cuotas">
        <button className="btn-danger btn btn-md" onClick={() => this.toggleModal()}>
          <FontAwesomeIcon icon={faCoins} />
        </button>
        <Modal centered isOpen={isOpen} toggle={this.toggleModal} size={'lg'}>
          <Form onSubmit={handleSubmit(this.submit)}>
            <ModalHeader toggle={this.toggleModal}>Pagos del Presupuesto N. {datos.id}</ModalHeader>
            <ModalBody>
              <FormPresupuestoPagos
                {...this.props}
                onChangeCuotas={this.onChangeCuotas}
                onChangeDescRedondeo={this.onChangeDescRedondeo}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggleModal}>
                Cancelar
              </Button>
              <Button type="submit" color="success" disabled={pristine || submitting}>
                {submitting ? 'Guardando' : 'Guardar'}
              </Button>
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
    decimales = state.presupuestos.cuotas[0].moneda.n_decimales;
    for (let item of state.presupuestos.cuotas) {
      const valorFormatado = formatarNumero(item.n_valor, decimales, true);
      itemObj = {
        label:
          'Cuota N.: ' +
          item.n_nr_cuota +
          ' | ' +
          item.moneda.c_simbolo +
          ' ' +
          valorFormatado +
          ' | Vcto.: ' +
          moment(item.d_fecha_vcto).format('DD/MM/YYYY'),
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
    actions: bindActionCreators({ ...actions, toggleCargando }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalCuotas);
