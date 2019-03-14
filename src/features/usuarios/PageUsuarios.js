import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { apiGenerico, procesarTabla, modalToggle } from '../esqueleto/redux/actions';
import { PrincipalTabla } from '../esqueleto';
import swal from 'sweetalert';
import validate from 'validate.js';
import { FormUsuario } from './';
import { reduxForm } from 'redux-form';

const validationConstraints = {
  c_descripcion: {
    presence: {
      message: 'Descripción es obligatorio',
    },
    length: {
      minimum: 6,
      message: 'Su Descripción debe tener no mínimo 6 caracteres',
    },
  },
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
    const { apiGenerico, procesarTabla, modalToggle } = this.props.actions;
    const { esqueleto } = this.props;
    const params = {
      data: values,
      method: 'post',
    };
    return apiGenerico({
      api_funcion: 'usuarios',
      params,
    })
      .then(res => {
        procesarTabla({
          api_funcion: 'usuarios',
          offset: 0,
          sizePerPage: esqueleto.sizePerPage,
          page: 1,
          columns:JSON.stringify(columns),
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
  validate: values => validate(values, validationConstraints, { fullMessages: false }),
})(PageUsuarios);

/* istanbul ignore next */
function mapStateToProps(state) {
  const initialValues = state.esqueleto.selected[0];

  return {
    usuarios: state.usuarios,
    esqueleto: state.esqueleto,
    initialValues,
    edicion: initialValues ? true : false,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ apiGenerico, procesarTabla, modalToggle }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageUsuarios);
