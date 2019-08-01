import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { procesarTabla } from '../esqueleto/redux/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import mostraMensajeError from '../../common/mostraMensajeError';
import api_axio from '../../common/api_axios';

export class MarcarAprobado extends Component {
  static propTypes = {
    presupuestos: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  clickAprobado = values => {
    const { api_axio, procesarTabla } = this.props.actions;
    const data = {
      id: values.id,
      n_id_status: 3,
    };
    const params = {
      method: 'put',
      data,
    };
    api_axio({
      api_funcion: `presupuestos/status`,
      params,
    })
      .then(res => {
        procesarTabla({ api_funcion: `presupuestos/pendientes` });
      })
      .catch(err => {
        mostraMensajeError({ err, msgPadron: 'Error al setar el status como aprobado' });
      });
  };

  render() {
    const { values } = this.props;

    return (
      <div className="presupuestos-marcar-aprobado">
        <button
          className="btn-success btn btn-md"
          title="Marcar como aprobado"
          onClick={() => {
            this.clickAprobado(values);
          }}
        >
          <FontAwesomeIcon icon={faCheckDouble} />
        </button>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    presupuestos: state.presupuestos,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ api_axio, procesarTabla }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MarcarAprobado);
