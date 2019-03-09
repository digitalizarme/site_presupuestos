import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { modalToggle } from './redux/actions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class ModalForm extends Component {
  static propTypes = {
    esqueleto: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    tituloModal: PropTypes.string.isRequired,
    cuerpoModal: PropTypes.func.isRequired,
  };

  render() {

    const { isOpenModal } = this.props.esqueleto;
    const { modalToggle } = this.props.actions;
    const { tituloModal, cuerpoModal: Component } = this.props;

    return (
      <div className="esqueleto-modal-form">
        <Modal centered isOpen={isOpenModal} toggle={modalToggle}>
          <ModalHeader toggle={modalToggle}>{tituloModal}</ModalHeader>
          <ModalBody>
            <Component {...this.props} />
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={modalToggle}>
              Cancelar
            </Button>
          </ModalFooter>
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
