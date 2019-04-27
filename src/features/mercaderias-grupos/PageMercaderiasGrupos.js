import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { FormMercaderiasGrupos } from './';
import { procesarTabla, modalToggle, toggleCargando } from '../esqueleto/redux/actions';
import api_axio from '../../common/api_axios';
import { PrincipalTabla } from '../esqueleto';
import swal from 'sweetalert';
import formatarFecha from '../../common/formatarFecha';
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
    table: 'mercaderiasGrupos',
    text: 'Descripción',
    sort: true,
    

  },
  {
    dataField: 'updatedAt',
    text: 'Atualizado',
    sort: true,
    editable: false,
    searchable: false,
    formatter: formatarFecha
  },
];

const defaultSorted = [
  {
    dataField: 'c_descripcion',
    order: 'asc',
  },
];

export class PageMercaderiasGrupos extends Component {
  static propTypes = {
    mercaderiasGrupos: PropTypes.object.isRequired,
    esqueleto: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  submit = values => {
    const { api_axio, procesarTabla, modalToggle, toggleCargando } = this.props.actions;
    const { esqueleto } = this.props;
    const params = {
      data: values,
      method: values.id && values.id !== ''?'put':'post',
    };
    toggleCargando();
    return api_axio({
      api_funcion: 'mercaderiasGrupos',
      params,
    })
      .then(res => {
        procesarTabla({
          api_funcion: 'mercaderiasGrupos',
          offset: 0,
          sizePerPage: esqueleto.sizePerPage,
          page: 1,
          columns:JSON.stringify(columns),
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

  render() {
    const { handleSubmit, edicion } = this.props;

    return (
      <div className="mercaderias-grupos-page-mercaderias-grupos">
        <PrincipalTabla
          titulo={'Lista de Grupo de mercaderias'}
          defaultSorted={defaultSorted}
          api_funcion={'mercaderiasGrupos'}
          columns={columns}
          cuerpoModal={FormMercaderiasGrupos}
          tituloModal={edicion ? 'Editar Grupo de Mercaderias' : 'Nuevo Grupo de Mercaderias'}
          enviarFormulario={handleSubmit(this.submit)}
          {...this.props}
        />
      </div>
    );
  }
}

PageMercaderiasGrupos = reduxForm({
  // a unique name for the form
    form: 'formMercaderiasGrupos',
    enableReinitialize: true,
    validate: values => validate(values, validationConstraints, { fullMessages: false }),
  })(PageMercaderiasGrupos);

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    mercaderiasGrupos: state.mercaderiasGrupos,
    esqueleto: state.esqueleto,
    initialValues:state.esqueleto.selected[0],
    edicion: state.esqueleto.selected[0] ? true : false,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ api_axio, procesarTabla, modalToggle, toggleCargando }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageMercaderiasGrupos);
