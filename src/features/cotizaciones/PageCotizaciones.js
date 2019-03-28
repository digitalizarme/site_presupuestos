import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {  reduxForm } from 'redux-form';
import { FormCotizaciones } from './';
import { apiGenerico, procesarTabla, modalToggle } from '../esqueleto/redux/actions';
import { guardarCotizaciones, listaMonedas } from './redux/actions';

import { PrincipalTabla } from '../esqueleto';
import swal from 'sweetalert';
import moment from 'moment';
import validate from 'validate.js';
import NumberFormat from 'react-number-format';


const validationConstraints = {
  c_monedaOrigem: {
    presence: {
      message: 'Origem es obligatorio',
    },
    length: {
      is: 3,
      wrongLength: 'Su Origem debe tener 3 caracteres',
    },
  },
  c_monedaDestino: {
    presence: {
      message: 'Destino es obligatorio',
    },
    length: {
      is: 3,
      wrongLength: 'Su Destino debe tener 3 caracteres',
    },
  },
  n_valor: {
    presence: {
      message: 'Valor de la comisión es obligatoria',
    },
    numericality: {
      onlyInteger: false,
      notValid: 'Este valor no es válido.',
      greaterThan: 0,
      notGreaterThan: 'El valor debe ser mayor que zero',
    },
  },
};

const formatarFecha = (cell, row) => {
  return moment(cell).format('DD/MM/YYYY HH:mm:ss');
};

const formatarNumero = (cell, row) => {
  return (
    <NumberFormat
      defaultValue={cell}
      thousandSeparator="."
      decimalSeparator=","
      displayType={'text'}
    />
  );
};

class EditarCotizacion extends React.Component {
  static propTypes = {
    onUpdate: PropTypes.func.isRequired,
  };
  static defaultProps = {
    value: 0,
  };
  getValue() {
    return this.cotizacion.state.numAsString;
  }
  render() {
    const { value, onUpdate, ...rest } = this.props;
    return [
      <NumberFormat
        {...rest}
        key="cotizacion"
        ref={node => (this.cotizacion = node)}
        defaultValue={value}
        thousandSeparator="."
        decimalSeparator=","
        displayType={'input'}
        className="field form-control-lg form-control"
      />,
    ];
  }
}

const columns = [
  {
    dataField: 'c_monedaOrigemDestino',
    table: 'Cotizaciones',
    text: 'Monedas',
    sort: true,
  },
  {
    dataField: 'n_valor',
    text: 'Cotización',
    sort: false,
    formatter: formatarNumero,
    align: 'right',
    editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
      <EditarCotizacion {...editorProps} value={value} />
    ),
  },
  {
    dataField: 'createdAt',
    text: 'Creado',
    sort: true,
    editable: false,
    searchable: false,
    formatter: formatarFecha,
  },
];

const defaultSorted = [
  {
    dataField: 'c_monedaOrigemDestino',
    order: 'asc',
  },
  {
    dataField: 'createdAt',
    order: 'desc',
  },
];

export class PageCotizaciones extends Component {
  static propTypes = {
    cotizaciones: PropTypes.object.isRequired,
    esqueleto: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  guardarNovasAtualizacoes = () => {
    const { guardarCotizaciones, procesarTabla } = this.props.actions;
    const { esqueleto } = this.props;

    guardarCotizaciones({ base: 'USD', monedas: 'PYG,BRL,ARS,EUR' })
      .then(res => {
        procesarTabla({
          api_funcion: 'cotizaciones',
          offset: 0,
          sizePerPage: esqueleto.sizePerPage,
          page: 1,
          columns: JSON.stringify(columns),
          searchText: esqueleto.searchText,
          sortField: esqueleto.sortField,
          sortOrder: esqueleto.sortOrder,
        });
      })
      .catch(err => {
        const { message } =
          typeof err.response !== 'undefined'
            ? err.response.data
            : 'Error al intentar actualizar cotizaciones';
        swal({
          title: 'Ops',
          text: message ? message : 'Error al intentar actualizar cotizaciones',
          icon: 'error',
          button: 'OK!',
        });
      });
  };

  submit = values => {
    const { apiGenerico, procesarTabla, modalToggle } = this.props.actions;
    const { esqueleto } = this.props;
    if (values.c_monedaOrigem !== values.c_monedaDestino) {
      values = {
        ...values,
        c_monedaOrigemDestino: values.c_monedaOrigem + '' + values.c_monedaDestino,
      };

      const params = {
        data: values,
        method: values.id && values.id !== ''?'put':'post',
      };
      return apiGenerico({
        api_funcion: 'cotizaciones',
        params,
      })
        .then(res => {
          procesarTabla({
            api_funcion: 'cotizaciones',
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
    } else {
      swal({
        title: 'Ops',
        text: 'Las monedas de origem y destino no pueden ser iguales',
        icon: 'error',
        button: 'OK!',
      });
    }
  };

  componentDidMount = () => {
    const { listaMonedas } = this.props.actions;
    listaMonedas();
  };

  render() {
    const { handleSubmit, edicion } = this.props;

    return (
      <div className="cotizaciones-page-cotizaciones">
        <PrincipalTabla
          titulo={'Lista de Cotizaciones'}
          defaultSorted={defaultSorted}
          api_funcion={'cotizaciones'}
          columns={columns}
          cuerpoModal={FormCotizaciones}
          tituloModal={edicion ? 'Editar Cotizaciones' : 'Nueva Cotización'}
          enviarFormulario={handleSubmit(this.submit)}
          {...this.props}
        />
      </div>
    );
  }
}

PageCotizaciones = reduxForm({
  // a unique name for the form
  form: 'formCotizaciones',
  enableReinitialize: true,
  validate: values => validate(values, validationConstraints, { fullMessages: false }),
})(PageCotizaciones);

/* istanbul ignore next */
function mapStateToProps(state) {
  const optionsMonedas = [];
  let monedaObj = {};
  for (let moneda of state.cotizaciones.monedas) {
    monedaObj = {
      label: moneda.c_descripcion,
      value: moneda.c_letras,
    };
    optionsMonedas.push(monedaObj);
  }
  let initialValues = state.esqueleto.selected[0];
  if (initialValues) {
    const { c_monedaOrigemDestino } = initialValues;
    const c_monedaOrigem = c_monedaOrigemDestino.slice(0, 3);
    const c_monedaDestino = c_monedaOrigemDestino.slice(3, 6);
    initialValues = {
      ...initialValues,
      c_monedaOrigem,
      c_monedaDestino,
    };
  }
  return {
    cotizaciones: state.cotizaciones,
    esqueleto: state.esqueleto,
    edicion: state.esqueleto.selected[0] ? true : false,
    optionsMonedas,
    initialValues,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      { apiGenerico, procesarTabla, modalToggle, guardarCotizaciones, listaMonedas },
      dispatch,
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageCotizaciones);
