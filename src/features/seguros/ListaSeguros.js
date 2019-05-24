import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { FormSeguros } from './';
import { procesarTabla, modalToggle, toggleCargando } from '../esqueleto/redux/actions';
import { listaMonedas } from '../cotizaciones/redux/actions';
import api_axio from '../../common/api_axios';
import { PrincipalTabla } from '../esqueleto';
import swal from 'sweetalert';
import formatarNumero from '../../common/formatarNumero';

// Decorate with connect to read form values
const selector = formValueSelector('formModal'); // <-- same as form name

const validationConstraints = {
  n_id_moneda: {
    presence: {
      message: 'Moneda es obligatorio',
    },
  },
  c_valor_exhibir: {
    presence: {
      message: 'Valor a exhibir es obligatorio',
    },
  },
  c_tipo_select2: {
    presence: {
      message: 'Tipo a exhibir es obligatorio',
    },
  },
  c_tipo_campo_valor: {
    presence: {
      message: 'Tipo campo valor es obligatorio',
    },
  },
  n_valor: {
    presence: {
      message: 'Valor es obligatorio',
    },
    numericality: {
      onlyInteger: false,
      greaterThan: 0,
      notGreaterThan: 'El valor debe ser mayor que zero',
    },
  },
};

const columns = [
  {
    dataField: 'c_valor_exhibir',
    table: 'Seguros',
    text: 'Valor a exhibir',
    sort: true,
    attrs: { width: '25%' },
  },
  {
    dataField: 'c_tipo_select2',
    text: 'Tipo a exhibir',
    sort: true,
    attrs: { width: '25%' },
  },
  {
    dataField: 'n_valor',
    text: 'Valor',
    sort: true,
    formatter: formatarNumero,
    editable: false,
    attrs: { width: '15%' },
  },
  {
    dataField: 'c_tipo_campo_valor',
    text: 'Tipo campo valor',
    sort: true,
    editable: false,
    attrs: { width: '15%' },
  },
  {
    dataField: 'moneda.c_descripcion',
    text: 'Moneda',
    sort: true,
    editable: false,
    attrs: { width: '15%' },
  },
];

const defaultSorted = [
  {
    dataField: 'c_tipo_select2',
    order: 'asc',
  },
];

export class ListaSeguros extends Component {
  static propTypes = {
    seguros: PropTypes.object.isRequired,
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
      api_funcion: 'seguros',
      params,
    })
      .then(res => {
        procesarTabla({
          api_funcion: 'seguros',
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
    const { listaMonedas } = this.props.actions;
    listaMonedas();
  };

  render() {
    const { edicion } = this.props;

    return (
      <div className="seguros-lista-seguros">
        <PrincipalTabla
          titulo={'Lista de Seguros'}
          defaultSorted={defaultSorted}
          api_funcion={'seguros'}
          columns={columns}
          cuerpoModal={FormSeguros}
          sizeModal="lg"
          validationConstraints={validationConstraints}
          tituloModal={edicion ? 'Editar Seguro' : 'Nuevo Seguro'}
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

  const optionsMonedas = [];
  let monedaObj = {};
  for (let moneda of state.cotizaciones.monedas) {
    monedaObj = {
      label: moneda.c_descripcion,
      value: moneda.id,
      decimales: moneda.n_decimales,
    };
    optionsMonedas.push(monedaObj);
  }

  let decimales = selector(state, 'n_id_moneda')
    ? optionsMonedas.find(moneda => moneda.value === selector(state, 'n_id_moneda'))
    : 2;
  decimales = decimales ? decimales.decimales : 2;

  return {
    seguros: state.seguros,
    esqueleto: state.esqueleto,
    initialValues,
    edicion: state.esqueleto.selected[0] ? true : false,
    optionsMonedas,
    decimales,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      { api_axio, procesarTabla, modalToggle, toggleCargando, listaMonedas },
      dispatch,
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListaSeguros);
