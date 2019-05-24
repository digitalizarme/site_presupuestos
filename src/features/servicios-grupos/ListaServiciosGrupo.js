import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormServGrupo } from './';
import { procesarTabla, modalToggle, toggleCargando } from '../esqueleto/redux/actions';
import api_axio from '../../common/api_axios';
import { PrincipalTabla } from '../esqueleto';
import swal from 'sweetalert';
import formatarFecha from '../../common/formatarFecha';

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
    table: 'serviciosGrupos',
    text: 'Descripción',
    sort: true,
    attrs: { width: '80%' },
  },
  {
    dataField: 'updatedAt',
    text: 'Actualizado',
    sort: true,
    editable: false,
    formatter: formatarFecha,
    attrs: { width: '20%' },
  },
];

const defaultSorted = [
  {
    dataField: 'c_descripcion',
    order: 'asc',
  },
];

export class ListaServiciosGrupo extends Component {
  static propTypes = {
    serviciosGrupos: PropTypes.object.isRequired,
    esqueleto: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  submit = values => {
    const { api_axio, procesarTabla, modalToggle, toggleCargando } = this.props.actions;
    const { esqueleto } = this.props;
    const params = {
      data: values,
      method: values.id && values.id !== '' ? 'put' : 'post',
    };
    toggleCargando();
    return api_axio({
      api_funcion: 'serviciosGrupos',
      params,
    })
      .then(res => {
        procesarTabla({
          api_funcion: 'serviciosGrupos',
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

  render() {
    const { edicion } = this.props;

    return (
      <div className="servicios-grupos-lista-servicios-grupo">
        <PrincipalTabla
          titulo={'Lista de Grupo de servicios'}
          defaultSorted={defaultSorted}
          api_funcion={'serviciosGrupos'}
          validationConstraints={validationConstraints}
          columns={columns}
          cuerpoModal={FormServGrupo}
          tituloModal={edicion ? 'Editar Grupo de Servicios' : 'Nuevo Grupo de Servicios'}
          enviarFormulario={this.submit}
          {...this.props}
        />
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  let initialValues = state.esqueleto.selected[0];
  const modoNuevo = initialValues ? false : true;
  if (modoNuevo) {
    initialValues = {
      b_activo: true,
    };
  }
  return {
    serviciosGrupos: state.serviciosGrupos,
    esqueleto: state.esqueleto,
    initialValues,
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
)(ListaServiciosGrupo);
