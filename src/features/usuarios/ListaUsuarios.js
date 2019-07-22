import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { procesarTabla, modalToggle, toggleCargando, limpiaImg } from '../esqueleto/redux/actions';
import { traerPersonas } from '../personas/redux/actions';
import { setaUsuario } from '../acceder/redux/actions';
import api_axio from '../../common/api_axios';
import { PrincipalTabla } from '../esqueleto';
import swal from 'sweetalert';
import { FormUsuario } from './';

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
    attrs: { width: '10%' },
  },
  {
    dataField: 'persona.c_nombre',
    text: 'Nome',
    sort: true,
    attrs: { width: '30%' },
  },
  {
    dataField: 'c_activo',
    text: 'Ativo',
    sort: true,
    editable: false,
    searchable: false,
    attrs: { width: '10%' },
  },
  {
    dataField: 'c_administrador',
    text: 'Administrador',
    sort: true,
    editable: false,
    searchable: false,
    attrs: { width: '10%' },
  },
  {
    dataField: 'c_cadastrar',
    text: 'Cadastrar',
    sort: true,
    editable: false,
    searchable: false,
    attrs: { width: '10%' },
  },
  {
    dataField: 'c_editar',
    text: 'Editar',
    sort: true,
    editable: false,
    searchable: false,
    attrs: { width: '10%' },
  },
  {
    dataField: 'c_eliminar',
    text: 'Eliminar',
    sort: true,
    editable: false,
    searchable: false,
    attrs: { width: '10%' },
  },
  {
    dataField: 'c_imprimir',
    text: 'Imprimir',
    sort: true,
    editable: false,
    searchable: false,
    attrs: { width: '10%' },
  },
];

const defaultSorted = [
  {
    dataField: 'c_usuario',
    order: 'asc',
  },
];

export class ListaUsuarios extends Component {
  static propTypes = {
    usuarios: PropTypes.object.isRequired,
    esqueleto: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  submit = values => {
    const {
      api_axio,
      procesarTabla,
      modalToggle,
      setaUsuario,
      toggleCargando,
    } = this.props.actions;
    const { esqueleto, acceder } = this.props;
    toggleCargando();
    if (values.c_contrasena === '') {
      delete values['c_contrasena'];
    }
    const params = {
      data: values,
      method: values.id && values.id !== '' ? 'put' : 'post',
    };
    return api_axio({
      api_funcion: 'usuarios',
      params,
    })
      .then(res => {
        if (res.data.id === acceder.usuario.id) {
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
    const { traerPersonas } = this.props.actions;
    traerPersonas();
  };

  render() {
    const { edicion } = this.props;
    return (
      <div className="usuarios-lista-usuarios">
        <PrincipalTabla
          titulo={'Lista de Usuarios'}
          defaultSorted={defaultSorted}
          api_funcion={'usuarios'}
          columns={columns}
          cuerpoModal={FormUsuario}
          sizeModal="lg"
          tituloModal={edicion ? 'Editar Usuario' : 'Nuevo Usuario'}
          enviarFormulario={(this.submit)}
          validationConstraints={edicion?validationConstraintsEdicion:validationConstraintsNuevo}
          {...this.props}
        />
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  let initialValues = state.esqueleto.selected[0];
  if (initialValues) {
    initialValues = {
      ...initialValues,
      c_contrasena: '',
    };
  }
  const modoNuevo = initialValues ? false : true;

  if (modoNuevo) {
    initialValues = {
      b_activo: true,
      b_cadastrar: true,
      b_editar: true,
      b_eliminar: true,
      b_imprimir: true,
    };
  }

  const optionsPersonas = [];
  let personaObj = {};
  for (let persona of state.personas.personas) {
    if (
      (modoNuevo && persona.b_activo) ||
      ((!modoNuevo && initialValues.n_id_persona === persona.id) || persona.b_activo)
    ) {
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
    edicion: modoNuevo ? false : true,
    optionsPersonas,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        api_axio,
        procesarTabla,
        modalToggle,
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
)(ListaUsuarios);
