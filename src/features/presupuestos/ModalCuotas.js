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

const selector = formValueSelector('formCuotas'); // <-- same as form name

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

  componentDidMount = () => {
    const { actions } = this.props;
    actions.traeCobradores();
    actions.traeMediosPago();
  };

  onChangeCuotas = id => {
    const { optionsCuotas, dispatch } = this.props;
    const cuotaSeleccionada = optionsCuotas.find(cuota => cuota.value === id);
    Object.entries(cuotaSeleccionada.extra).map((arrayDatos, indice) => {
      const campo = arrayDatos[0];
      const valor = arrayDatos[1];
      return dispatch(change('formCuotas', campo, valor));
    });
  };

  setaDatos() {
    const { datos, actions, dispatch } = this.props;
    actions.toggleCargando();
    const params = {
      id: datos.id,
    };
    actions.traeCuotas(params).then(res => {
      Object.entries(datos).map((arrayDatos, indice) => {
        const campo = arrayDatos[0];
        const valor = arrayDatos[1];
        return dispatch(change('formCuotas', campo, valor));
      });
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
    console.log(values, 'values');
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
              <FormPresupuestoPagos {...this.props} onChangeCuotas={this.onChangeCuotas} />
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
  let optionsPersonas = [];
  let optionsMedioPago = [];

  let itemObj = {};
  let decimales = 0;
  let cuotaSeleccionada = false;
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

  return {
    optionsCuotas,
    decimales,
    cuotaSeleccionada,
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
