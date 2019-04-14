import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Principal } from '../esqueleto';
import { FormConfiguraciones } from './';
import swal from 'sweetalert';
import validate from 'validate.js';
import { reduxForm, formValueSelector } from 'redux-form';

// Decorate with connect to read form values
const selector = formValueSelector('formConfiguraciones'); // <-- same as form name

const validationConstraints = {
  c_ruc: {
    presence: {
      message: 'RUC es obligatorio',
    },
    length: {
      minimum: 5,
      tooShort: 'Su RUC debe tener 5 caracteres como minimo',
      maximum: 30,
      tooLong: 'Su RUC debe tener 30 caracteres como máximo',
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
  c_tel: {
    presence: {
      message: 'Telefono es obligatorio',
    },
    length: {
      minimum: 10,
      message: 'Su Telefono debe tener 10 caracteres como minimo',
    },
  },
  c_razon_social: {
    presence: {
      message: 'Razón Social es obligatorio',
    },
    length: {
      minimum: 5,
      tooShort: 'Su Razón Social debe tener 5 caracteres como minimo',
      maximum: 80,
      tooLong: 'Su Razón Social debe tener 80 caracteres como máximo',
    },
  },
  c_nombre_fantasia: {
    presence: {
      message: 'Nombre Fantasia es obligatorio',
    },
    length: {
      minimum: 5,
      tooShort: 'Su Nombre Fantasia debe tener 5 caracteres como minimo',
      maximum: 80,
      tooLong: 'Su Nombre Fantasia debe tener 80 caracteres como máximo',
    },
  },
  c_direccion: {
    presence: {
      message: 'Dirección es obligatorio',
    },
    length: {
      minimum: 5,
      tooShort: 'Su Dirección debe tener 5 caracteres como minimo',
      maximum: 100,
      tooLong: 'Su Dirección debe tener 100 caracteres como máximo',
    },
  },
  t_logo: {
    presence: {
      message: 'Logo es obligatorio',
    },
    length: {
      minimum: 5,
      tooShort: 'Su Logo debe tener 5 caracteres como minimo',
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

export class PageConfiguraciones extends Component {
  static propTypes = {
    configuraciones: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  submit = values => {
    const { guardar } = this.props.actions;
    guardar(values)
      .then(res => {
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
    const { traerConfiguracion } = this.props.actions;
    traerConfiguracion();
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="configuraciones-page-configuraciones">
        <Principal
          component={FormConfiguraciones}
          enviarFormulario={handleSubmit(this.submit)}
          {...this.props}
        />
      </div>
    );
  }
}

PageConfiguraciones = reduxForm({
  // a unique name for the form
  form: 'formConfiguraciones',
  enableReinitialize: true,
  validate: values =>
    validate(values, values.b_comision ? validationConstraintsComision : validationConstraints, {
      fullMessages: false,
    }),
})(PageConfiguraciones);

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    configuraciones: state.configuraciones,
    initialValues: state.configuraciones.configuracion,
    b_comision: selector(state, 'b_comision'),
    t_logo: state.esqueleto.img,

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
)(PageConfiguraciones);
