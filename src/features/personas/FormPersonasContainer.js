import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { apiGenerico, limpiarItemLinea } from '../esqueleto/redux/actions';
import { traerPersona, limpiarPersona } from './redux/actions';
import { Principal } from '../esqueleto';
import { FormPersonas } from './';
import swal from 'sweetalert';
import history from '../../common/history';
import { formValueSelector, reduxForm } from 'redux-form';
import validate from 'validate.js';

// Decorate with connect to read form values
const selector = formValueSelector('formPersonas'); // <-- same as form name

const validationConstraints = {
  c_nombre: {
    presence: {
      message: 'Nombre es obligatorio',
    },
    length: {
      minimum: 6,
      message: 'Su Nombre debe tener no mínimo 6 caracteres',
    },
  },
  c_identificacion: {
    presence: {
      message: 'Identificacion es obligatorio',
    },
    length: {
      minimum: 5,
      message: 'Su Identificacion debe tener 5 caracteres como minimo',
    },
  },
  c_cel1: {
    presence: {
      message: 'Celular 1 es obligatorio',
    },
    length: {
      minimum: 10,
      message: 'Su Celular debe tener 10 caracteres como minimo',
    },
  },
  c_email: {
    presence: {
      message: 'E-mail es obligatorio',
    },
    email: {
      message: 'E-mail no es un e-mail válido',
    },
  },
  c_direccion: {
    presence: {
      message: 'Dirección es obligatorio',
    },
    length: {
      minimum: 5,
      message: 'Su Celular debe tener 5 caracteres como minimo',
    },
  },
};

export class FormPersonasContainer extends Component {
  static propTypes = {
    personas: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    esqueleto: PropTypes.object.isRequired,
  };

  submit = values => {
    const { apiGenerico } = this.props.actions;
    const params = {
      data: values,
      method: 'post',
    };
    return apiGenerico({
      api_funcion: 'personas',
      params,
    })
      .then(res => {
        history.push('/personas');
        swal({
          icon: 'success',
          timer: 1000,
        });
      })
      .catch(err => {
        const { message } =
          typeof err.response !== 'undefined'
            ? err.response.data
            : 'Error al intentar guardar los datos';
        swal({
          title: 'Ops',
          text: message ? message : 'Error al intentar guardar los datos',
          icon: 'error',
          button: 'OK!',
        });
      });
  };

  componentDidMount = () => {
    //MODO EDICION
    if (this.props.esqueleto.selected.length === 0 && this.props.match.params.id) {
      const { traerPersona } = this.props.actions;
      const params = {
        id: this.props.match.params.id,
      };
      traerPersona(params);
    }
    //MODO CADASTRO
    else if (this.props.match.path.indexOf('nuevo') !== -1) {
      const { limpiarPersona, limpiarItemLinea } = this.props.actions;

      limpiarItemLinea();
      limpiarPersona();
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
      <div className="personas-form-personas-container">
        <Principal
          edicion={edicion}
          component={FormPersonas}
          {...this.props}
          enviarFormulario={handleSubmit(this.submit)}
        />
      </div>
    );
  }
}

FormPersonasContainer = reduxForm({
  // a unique name for the form
  form: 'formPersonas',
  enableReinitialize: true,
  validate: values => validate(values, validationConstraints, { fullMessages: false }),
})(FormPersonasContainer);

/* istanbul ignore next */
function mapStateToProps(state) {
  const initialValues =
    typeof state.esqueleto.selected[0] !== 'undefined' &&
    typeof state.personas.persona === 'undefined'
      ? {}
      : typeof state.esqueleto.selected[0] !== 'undefined'
      ? state.esqueleto.selected[0]
      : state.personas.persona;

  return {
    personas: state.personas,
    esqueleto: state.esqueleto,
    initialValues,
    b_comisionista: selector(state, 'b_comisionista'),
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      { apiGenerico, traerPersona, limpiarPersona, limpiarItemLinea },
      dispatch,
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormPersonasContainer);
