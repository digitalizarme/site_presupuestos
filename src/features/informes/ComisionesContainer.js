import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import FormComision from './FormComision';
import { Principal } from '../esqueleto';
import { formValueSelector, reduxForm, change, reset } from 'redux-form';
import validate from 'validate.js';

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

export class ComisionesContainer extends Component {
  static propTypes = {
    informes: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  submit = values => {
    const { history } = this.props;
  };

  render() {
    const { handleSubmit, optionsMonedas } = this.props;

    return (
      <div className="informes-comisiones-container">
        <Principal
          titulo={'Informe de Comisiones'}
          component={FormComision}
          enviarFormulario={handleSubmit(this.submit)}
          {...this.props}
          optionsMonedas={optionsMonedas}
        />
      </div>
    );
  }
}

ComisionesContainer = reduxForm({
  // a unique name for the form
  form: 'formComisiones',
  enableReinitialize: true,
  validate: values => validate(values, validationConstraints, { fullMessages: false }),
})(ComisionesContainer);

/* istanbul ignore next */
function mapStateToProps(state) {
  const optionsMonedas = [];

  return {
    informes: state.informes,
    optionsMonedas,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ComisionesContainer);
