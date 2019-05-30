import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { FormCotizaciones } from './';
import { procesarTabla, modalToggle, toggleCargando } from '../esqueleto/redux/actions';
import { guardarCotizaciones, listaMonedas } from './redux/actions';
import api_axio from '../../common/api_axios';
import { PrincipalTabla } from '../esqueleto';
import swal from 'sweetalert';
import formatarFecha from '../../common/formatarFecha';
import formatarNumero from '../../common/formatarNumero';
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
    attrs: { width: '70%' },
  },
  {
    dataField: 'n_valor',
    text: 'Cotización',
    sort: false,
    formatter: (cell, row) => {
      return formatarNumero(cell, 5);
    },
    align: 'right',
    editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
      <EditarCotizacion {...editorProps} value={value} />
    ),
    attrs: { width: '15%' },
  },
  {
    dataField: 'updatedAt',
    text: 'Actualizado',
    sort: true,
    editable: false,
    searchable: false,
    formatter: formatarFecha,
    attrs: { width: '15%' },
  },
];

const defaultSorted = [
  {
    dataField: 'c_monedaOrigemDestino',
    order: 'asc',
  },
  {
    dataField: 'updatedAt',
    order: 'desc',
  },
];

export class ListaCotizaciones extends Component {
  static propTypes = {
    cotizaciones: PropTypes.object.isRequired,
    esqueleto: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  guardarNovasAtualizacoes = () => {
    const { guardarCotizaciones, procesarTabla, toggleCargando } = this.props.actions;
    const { esqueleto } = this.props;
    toggleCargando();
    guardarCotizaciones('USD_PYG,USD_BRL,USD_ARS,USD_EUR')
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
        toggleCargando();
      })
      .catch(err => {
        const { message } =
          typeof err.response !== 'undefined'
            ? err.response.data
            : 'Error al intentar actualizar cotizaciones';
        toggleCargando();
        swal({
          title: 'Ops',
          text: message ? message : 'Error al intentar actualizar cotizaciones',
          icon: 'error',
          button: 'OK!',
        });
      });
  };

  submit = values => {
    const { api_axio, procesarTabla, modalToggle, toggleCargando } = this.props.actions;
    const { esqueleto } = this.props;
    if (values.c_monedaOrigem !== values.c_monedaDestino) {
      toggleCargando();
      values = {
        ...values,
        c_monedaOrigemDestino: values.c_monedaOrigem + '_' + values.c_monedaDestino,
      };

      const params = {
        data: values,
        method: values.id && values.id !== '' ? 'put' : 'post',
      };
      return api_axio({
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
    const { listaMonedas, toggleCargando } = this.props.actions;
    toggleCargando();
    listaMonedas().then(toggleCargando());
  };

  render() {
    const { handleSubmit, edicion } = this.props;

    return (
      <div className="cotizaciones-lista-cotizaciones">
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

ListaCotizaciones = reduxForm({
  // a unique name for the form
  form: 'formCotizaciones',
  enableReinitialize: true,
  validate: values => validate(values, validationConstraints, { fullMessages: false }),
})(ListaCotizaciones);

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
    const c_monedaDestino = c_monedaOrigemDestino.slice(4, 7);
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
      { api_axio, procesarTabla, modalToggle, guardarCotizaciones, listaMonedas, toggleCargando },
      dispatch,
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListaCotizaciones);
