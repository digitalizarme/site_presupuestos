import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { apiGenerico, procesarTabla, modalToggle } from '../esqueleto/redux/actions';
import { traerPersonas } from '../personas/redux/actions';
import { setaUsuario } from '../acceder/redux/actions';

import { PrincipalTabla } from '../esqueleto';
import swal from 'sweetalert';
import validate from 'validate.js';
import { FormUsuario } from './';
import { reduxForm } from 'redux-form';

const validationConstraintsEmail = {
  c_contrasena: {
    presence: {
      message: 'Contraseña es obligatorio',
    },
    length: {
      minimum: 6,
      message: 'Su Contraseña debe tener no mínimo 6 caracteres',
    },
  },
};

const validationConstraintsComum = {
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

const validationConstraintsNuevo = {
  ...validationConstraintsEmail,
  ...validationConstraintsComum,
};

const validationConstraintsEdicion = {
  ...validationConstraintsComum,
};

const columns = [
  {
    dataField: 'c_usuario',
    table: 'Usuarios',
    text: 'Usuario',
    sort: true,
  },
  {
    dataField: 'persona.c_nombre',
    text: 'Nome',
    sort: true,
  },
  {
    dataField: 'c_activo',
    text: 'Ativo',
    sort: true,
    editable: false,
    searchable: false,
  },
  {
    dataField: 'c_administrador',
    text: 'Administrador',
    sort: true,
    editable: false,
    searchable: false,
  },
  {
    dataField: 'c_cadastrar',
    text: 'Cadastrar',
    sort: true,
    editable: false,
    searchable: false,
  },
  {
    dataField: 'c_editar',
    text: 'Editar',
    sort: true,
    editable: false,
    searchable: false,
  },
  {
    dataField: 'c_eliminar',
    text: 'Eliminar',
    sort: true,
    editable: false,
    searchable: false,
  },
  {
    dataField: 'c_imprimir',
    text: 'Imprimir',
    sort: true,
    editable: false,
    searchable: false,
  },
];

const defaultSorted = [
  {
    dataField: 'c_usuario',
    order: 'asc',
  },
];

export class PageUsuarios extends Component {
  static propTypes = {
    usuarios: PropTypes.object.isRequired,
    esqueleto: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  submit = values => {
    const { apiGenerico, procesarTabla, modalToggle,setaUsuario } = this.props.actions;
    const { esqueleto,acceder } = this.props;
    if (values.c_contrasena === '') {
      delete values['c_contrasena'];
    }
    const params = {
      data: values,
      method: 'post',
    };
    return apiGenerico({
      api_funcion: 'usuarios',
      params,
    })
      .then(res => {
        console.log(res.data.id);
        console.log(acceder.usuario.id)
        if(res.data.id === acceder.usuario.id)
        {
          setaUsuario(res.data);
        }
        procesarTabla({
          api_funcion: 'usuarios',
          offset: 0,
          sizePerPage: esqueleto.sizePerPage,
          page: 1,
          columns: JSON.stringify(columns),
          searchText: esqueleto.searchText,
          sortField: esqueleto.sortField,
          sortOrder: esqueleto.sortOrder,
        });
        modalToggle();
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
    const { traerPersonas } = this.props.actions;
    traerPersonas();
  };

  render() {
    const { handleSubmit, edicion } = this.props;
    return (
      <div className="usuarios-page-usuarios">
        <PrincipalTabla
          titulo={'Lista de Usuarios'}
          defaultSorted={defaultSorted}
          api_funcion={'usuarios'}
          columns={columns}
          cuerpoModal={FormUsuario}
          sizeModal="lg"
          tituloModal={edicion ? 'Editar Usuario' : 'Nuevo Usuario'}
          enviarFormulario={handleSubmit(this.submit)}
          {...this.props}
        />
      </div>
    );
  }
}

PageUsuarios = reduxForm({
  // a unique name for the form
  form: 'formUsuario',
  enableReinitialize: true,
  validate: values =>
    validate(values, !values.id ? validationConstraintsNuevo : validationConstraintsEdicion, {
      fullMessages: false,
    }),
})(PageUsuarios);

/* istanbul ignore next */
function mapStateToProps(state) {
  let initialValues = state.esqueleto.selected[0];
  if (initialValues) {
    initialValues = {
      ...initialValues,
      c_contrasena: '',
    };
  }
  const optionsPersonas = [];
  let personaObj = {};
  for (let persona of state.personas.personas) {
    if (persona.b_usuario) {
      personaObj = {
        label: persona.c_nombre,
        value: persona.id,
      };
      optionsPersonas.push(personaObj);
    }
  }
  return {
    usuarios: state.usuarios,
    esqueleto: state.esqueleto,
    acceder: state.acceder,
    initialValues,
    edicion: initialValues ? true : false,
    optionsPersonas,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      { apiGenerico, procesarTabla, modalToggle, traerPersonas,setaUsuario },
      dispatch,
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageUsuarios);
