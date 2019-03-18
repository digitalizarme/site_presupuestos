import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { FormServGrupo } from './';
import { apiGenerico, procesarTabla, modalToggle } from '../esqueleto/redux/actions';
import { PrincipalTabla } from '../esqueleto';
import swal from 'sweetalert';
import validate from 'validate.js';

const validationConstraints = {
  c_descripcion: {
    presence: {
      message: 'Descripción es obligatorio',
    },
    length: {
      minimum: 5,
      message: 'Su Descripción debe tener no mínimo 5 caracteres',
    },
  },
};


const columns = [
  {
    dataField: 'c_descripcion',
    table: 'Servicios_grupos',
    text: 'Descripción',
    sort: true,
  },
  {
    dataField: 'updatedAt',
    text: 'Atualizado',
    sort: true,
    editable: false,
    searchable: false,
  },
];

const defaultSorted = [
  {
    dataField: 'c_descripcion',
    order: 'asc',
  },
];

export class PageServiciosGrupo extends Component {
  static propTypes = {
    serviciosGrupo: PropTypes.object.isRequired,
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
      api_funcion: 'servicios_grupos',
      params,
    })
      .then(res => {
        procesarTabla({
          api_funcion: 'servicios_grupos',
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
      <div className="servicios-grupo-page-servicios-grupo">
        <PrincipalTabla
          titulo={'Lista de Grupo de servicios'}
          defaultSorted={defaultSorted}
          api_funcion={'servicios_grupos'}
          columns={columns}
          cuerpoModal={FormServGrupo}
          tituloModal={edicion ? 'Editar Grupo de Servicios' : 'Nuevo Grupo de Servicios'}
          enviarFormulario={handleSubmit(this.submit)}
          {...this.props}
        />
      </div>
    );
  }
}

PageServiciosGrupo = reduxForm({
  // a unique name for the form
    form: 'formServGrupo',
    enableReinitialize: true,
    validate: values => validate(values, validationConstraints, { fullMessages: false }),
  })(PageServiciosGrupo);

/* istanbul ignore next */
function mapStateToProps(state) {
  const initialValues = state.esqueleto.selected[0];
  return {
    serviciosGrupo: state.serviciosGrupo,
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
)(PageServiciosGrupo);
