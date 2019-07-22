import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { toggleCargando, limpiaImg } from '../esqueleto/redux/actions';
import { traerPersonas } from '../personas/redux/actions';
import { setaUsuario } from '../acceder/redux/actions';
import api_axio from '../../common/api_axios';
import swal from 'sweetalert';
import { FormUsuario } from './';
import { reduxForm } from 'redux-form';
import validate from 'validate.js';
import { Principal } from '../esqueleto';

const validationConstraintsEdicion = {
  c_id_persona: {
    presence: {
      message: 'Persona es obligatorio',
    },
  },
  c_usuario: {
    presence: {
      message: 'Usuário es obligatorio',
    },
    length: {
      minimum: 6,
      message: 'Su Usuário debe tener no mínimo 6 caracteres',
    },
  },
};

export class MiUsuario extends Component {
  static propTypes = {
    usuarios: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };
  submit = values => {
    const { api_axio, setaUsuario, toggleCargando } = this.props.actions;
    toggleCargando();
    delete values['b_activo'];
    delete values['b_administrador'];
    delete values['b_cadastrar'];
    delete values['b_editar'];
    delete values['b_eliminar'];
    delete values['b_imprimir'];
    delete values['createdAt'];
    delete values['updatedAt'];

    if (values.c_contrasena === '') {
      delete values['c_contrasena'];
    }
    const params = {
      data: values,
      method: 'put',
    };
    return api_axio({
      api_funcion: 'usuarios/miUsuario',
      params,
    })
      .then(res => {
        setaUsuario(res.data);
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
    const { traerPersonas, miUsuario, limpiaImg } = this.props.actions;
    limpiaImg();
    traerPersonas();
    miUsuario();
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="usuarios-mi-usuario">
        <Principal
          titulo={'Lista de Usuarios'}
          enviarFormulario={handleSubmit(this.submit)}
          edicion={true}
          miUsuario={true}
          component={FormUsuario}
          {...this.props}
        />
      </div>
    );
  }
}

MiUsuario = reduxForm({
  // a unique name for the form
  form: 'formMiUsuario',
  enableReinitialize: true,
  validate: values => validate(values, validationConstraintsEdicion, { fullMessages: false }),
})(MiUsuario);

/* istanbul ignore next */
function mapStateToProps(state) {
  let initialValues = state.usuarios.miUsuario;

  const optionsPersonas = [];
  let personaObj = {};
  for (let persona of state.personas.personas) {
    if (initialValues.n_id_persona === persona.id || persona.b_activo) {
      if (persona.b_usuario) {
        personaObj = {
          label: persona.c_nombre,
          value: persona.id,
        };
        optionsPersonas.push(personaObj);
      }
    }
  }
  return {
    usuarios: state.usuarios,
    esqueleto: state.esqueleto,
    acceder: state.acceder,
    initialValues,
    edicion: true,
    optionsPersonas,
    t_avatar: state.esqueleto.img,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        ...actions,
        api_axio,
        traerPersonas,
        setaUsuario,
        toggleCargando,
        limpiaImg,
      },
      dispatch,
    ),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MiUsuario);
