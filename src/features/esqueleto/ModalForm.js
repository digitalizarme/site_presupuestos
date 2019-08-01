import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { modalToggle, limpiarLineaSeleccionada, noLimpiarFormModal } from './redux/actions';
import { Button, Form, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { reduxForm, reset } from 'redux-form';
import validate from 'validate.js';

export class ModalForm extends Component {
  static propTypes = {
    esqueleto: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    tituloModal: PropTypes.string.isRequired,
    cuerpoModal: PropTypes.func.isRequired,
    enviarFormulario: PropTypes.func.isRequired,
  };

  componentDidUpdate = () => {
    const { noLimpiarFormModal } = this.props.actions;
    const { limpiarModal } = this.props.esqueleto;
    if (limpiarModal) {
      noLimpiarFormModal();
      setTimeout(() => {
        this.props.dispatch(reset('formModal'));
      }, 50);
    }
  };

  cerrarModal = () => {
    const { modalToggle, limpiarLineaSeleccionada } = this.props.actions;
    const { nolimpiarLineaSeleccionada } = this.props;
    if (!nolimpiarLineaSeleccionada) {
      limpiarLineaSeleccionada();
    }
    modalToggle();
  };

  render() {
    const { isOpenModal } = this.props.esqueleto;
    const { tituloModal, cuerpoModal: Component, sizeModal } = this.props;
    const { enviarFormulario, submitting, pristine } = this.props;
    const { handleSubmit } = this.props;
    return (
      <div className="esqueleto-modal-form">
        <Modal centered isOpen={isOpenModal} toggle={this.cerrarModal} size={sizeModal}>
          <Form onSubmit={handleSubmit(enviarFormulario)}>
            <ModalHeader toggle={this.cerrarModal}>{tituloModal}</ModalHeader>
            <ModalBody>
              <Component {...this.props} />
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.cerrarModal}>
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

ModalForm = reduxForm({
  // a unique name for the form
  form: 'formModal',
  enableReinitialize: true,
  validate: (values, props) =>
    validate(values, props && props.validationConstraints ? props.validationConstraints : {}, {
      fullMessages: false,
    }),
  onChange: (values, dispatch, props) => {
    if (props.atualizouForm) {
      props.atualizouForm(values, dispatch, props);
    }
  },
})(ModalForm);

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    esqueleto: state.esqueleto,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      { modalToggle, limpiarLineaSeleccionada, noLimpiarFormModal },
      dispatch,
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalForm);
