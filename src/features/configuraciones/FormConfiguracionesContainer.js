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
import { toggleCargando } from '../esqueleto/redux/actions';
import { listaMonedas } from '../cotizaciones/redux/actions';

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
  n_valor_min_comision: {
    presence: {
      message: 'Valor minimo de la comisión es obligatorio',
    },
    numericality: {
      onlyInteger: false,
      notValid: 'Este valor no es válido',
      greaterThan: 0,
      notGreaterThan: 'El valor debe ser mayor que zero',
    },
  },
};

export class FormConfiguracionesContainer extends Component {
  static propTypes = {
    configuraciones: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount = () => {
    const { listaMonedas } = this.props.actions;
    listaMonedas();
  };

  submit = values => {
    const { guardar, toggleCargando } = this.props.actions;
    toggleCargando();
    guardar(values)
      .then(res => {
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

  render() {
    const { handleSubmit,optionsMonedas } = this.props;

    return (
      <div className="configuraciones-form-configuraciones-container">
        <Principal
          titulo="Configuraciones"
          component={FormConfiguraciones}
          enviarFormulario={handleSubmit(this.submit)}
          optionsMonedas={optionsMonedas}
          {...this.props}
        />
      </div>
    );
  }
}

FormConfiguracionesContainer = reduxForm({
  // a unique name for the form
  form: 'formConfiguraciones',
  enableReinitialize: true,
  validate: values =>
    validate(values, values.b_comision ? validationConstraintsComision : validationConstraints, {
      fullMessages: false,
    }),
})(FormConfiguracionesContainer);

/* istanbul ignore next */
function mapStateToProps(state) {
  const optionsMonedas = [];
  let monedaObj = {};
  for (let moneda of state.cotizaciones.monedas) {
    if (
      moneda.b_activo ||
      (state.configuraciones.configuracion.n_id_moneda_valor_min_comision === moneda.id ||
        moneda.b_activo)
    ) {
      monedaObj = {
        label: moneda.c_descripcion,
        value: moneda.id,
        decimales: moneda.n_decimales,
        extra: moneda,
      };
      optionsMonedas.push(monedaObj);
    }
  }
  let decimales = selector(state, 'n_id_moneda_valor_min_comision')
    ? optionsMonedas.find(
        moneda => moneda.value === selector(state, 'n_id_moneda_valor_min_comision'),
      )
    : null;
  decimales = decimales ? decimales.decimales : 2;
  return {
    configuraciones: state.configuraciones,
    initialValues: state.configuraciones.configuracion,
    b_comision: selector(state, 'b_comision'),
    decimales,
    t_logo: state.esqueleto.img,
    optionsMonedas,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions, toggleCargando, listaMonedas }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FormConfiguracionesContainer);
