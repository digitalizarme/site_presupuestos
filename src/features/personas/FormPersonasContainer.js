import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toggleCargando } from '../esqueleto/redux/actions';
import api_axio from '../../common/api_axios';

import { traerPersona, limpiarPersona } from './redux/actions';
import { Principal } from '../esqueleto';
import { setaUsuarioPersona } from '../acceder/redux/actions';

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
      message: 'Su Dirección debe tener 5 caracteres como minimo',
    },
  },
};

const validationConstraintsComision = {
  ...validationConstraints,
  n_valor_porcentaje_comision: {
    presence: {
      message: '% de la comisión es obligatorio',
    },
    numericality: {
      onlyInteger: false,
      notValid: 'Este valor no es válido. Debe estar entre 0 y 100',
      greaterThan: 0,
      notGreaterThan: 'El valor debe ser mayor que zero',
      lessThanOrEqualTo: 100,
      notLessThanOrEqualTo: 'El valor debe ser menor o igual a 100',
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
    const { api_axio, setaUsuarioPersona, toggleCargando } = this.props.actions;
    const { persona } = this.props;
    toggleCargando();
    if (!values.b_comisionista) {
      values = {
        ...values,
        n_valor_porcentaje_comision: null,
      };
    }
    const params = {
      data: values,
      method: values.id && values.id !== '' ? 'put' : 'post',
    };
    return api_axio({
      api_funcion: 'personas',
      params,
    })
      .then(res => {
        if (res.data.id === persona.id) {
          setaUsuarioPersona(res.data);
        }

        history.push('/personas');
        toggleCargando();
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
        toggleCargando();
        swal({
          title: 'Ops',
          text: message ? message : 'Error al intentar guardar los datos',
          icon: 'error',
          button: 'OK!',
        });
      });
  };

  componentDidMount = () => {
    const { path } = this.props.match;

    //MODO EDICION
    if (path.indexOf('editar') !== -1) {
      const { traerPersona } = this.props.actions;
      const params = {
        id: this.props.match.params.id,
      };
      traerPersona(params);
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
          titulo={'Personas'}
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
  validate: values =>
    validate(
      values,
      values.b_comisionista ? validationConstraintsComision : validationConstraints,
      { fullMessages: false },
    ),
})(FormPersonasContainer);

/* istanbul ignore next */
function mapStateToProps(state) {
  const initialValues =
    state.router.location.pathname.indexOf('nuevo') !== -1
      ? {b_cliente:true}
      : typeof state.esqueleto.selected[0] !== 'undefined'
      ? state.esqueleto.selected[0]
      : state.personas.persona;

  return {
    personas: state.personas,
    esqueleto: state.esqueleto,
    persona: state.acceder.usuario.persona,
    initialValues,
    b_comisionista: selector(state, 'b_comisionista'),
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        api_axio,
        traerPersona,
        limpiarPersona,
        setaUsuarioPersona,
        toggleCargando,
      },
      dispatch,
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormPersonasContainer);
