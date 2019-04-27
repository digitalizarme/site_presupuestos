import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { modalToggle } from './redux/actions';
import { Button,Form, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class ModalForm extends Component {
  static propTypes = {
    esqueleto: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    tituloModal: PropTypes.string.isRequired,
    cuerpoModal: PropTypes.func.isRequired,
  };

  cerrarModal = () =>
  {
    const { modalToggle } = this.props.actions;
    modalToggle();
  }

  render() {

    const { isOpenModal } = this.props.esqueleto;
    const { tituloModal, cuerpoModal: Component, sizeModal } = this.props;
    const {  enviarFormulario,submitting, pristine } = this.props;

    return (
      <div className="esqueleto-modal-form">
        <Modal centered isOpen={isOpenModal} toggle={this.cerrarModal} size={sizeModal}>
        <Form onSubmit={enviarFormulario}  >
          <ModalHeader toggle={this.cerrarModal}>{tituloModal}</ModalHeader>
          <ModalBody>
            <Component {...this.props} />
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="success" disabled={pristine || submitting}>
              {submitting ? 'Guardando' : 'Guardar'}
            </Button>
            <Button color="secondary" onClick={this.cerrarModal}>
              Cancelar
            </Button>
          </ModalFooter>
        </Form>
        </Modal>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    esqueleto: state.esqueleto,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ modalToggle }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ModalForm);
