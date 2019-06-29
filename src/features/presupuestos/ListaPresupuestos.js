import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PrincipalTabla } from '../esqueleto';
import formatarFecha from '../../common/formatarFecha';
import formatarNumero from '../../common/formatarNumero';
import GenerarPdf from './GenerarPdf';
import { traerPresupuesto, traeItems, traeCuotas } from './redux/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {   faPrint } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';

const columns = [
  {
    dataField: 'id',
    table: 'presupuestos',
    text: 'Num.',
    sort: true,
    editable: false,
    searchable: false,
    attrs: { width: '5%' },
  },
  {
    dataField: 'persona.c_nombre',
    text: 'Nombre',
    sort: true,
    editable: false,
    attrs: { width: '25%' },
  },
  {
    dataField: 'persona.c_identificacion',
    text: 'Identificacíon',
    sort: true,
    editable: false,
    attrs: { width: '10%' },
  },
  {
    dataField: 'status.c_descripcion',
    text: 'Status',
    sort: true,
    editable: false,
    attrs: { width: '10%' },
  },
  {
    dataField: 'usuario.c_usuario',
    text: 'Creado por',
    sort: true,
    editable: false,
    attrs: { width: '10%' },
  },
  {
    dataField: 'moneda.c_descripcion',
    text: 'Moneda',
    sort: true,
    editable: false,
    attrs: { width: '10%' },
  },
  {
    dataField: 'n_total_general',
    text: 'Total',
    sort: true,
    editable: false,
    searchable: false,
    formatter: (cell, row) => {
      return formatarNumero(cell, row.moneda ? row.moneda.n_decimales : 2);
    },
    attrs: { width: '10%' },
  },
  {
    dataField: 'updatedAt',
    text: 'Actualizado',
    sort: true,
    editable: false,
    formatter: formatarFecha,
    attrs: { width: '15%' },
  },
  {
    dataField: 'acciones',
    text: 'Acciones',
    sort: false,
    searchable: false,
    editable: false,
    formatter: (cell, row) => {
      return row.n_id_status !== 1 && parseFloat(row.n_total_general) > 0?<GenerarPdf idPresupuesto={row.id} />:<Incompletos />;
    },
    attrs: { width: '5%' },
  },
];



const Incompletos = () => {
  return (
    <button className="btn-danger btn btn-md" onClick={clickIncompleto}>
      <FontAwesomeIcon icon={faPrint} />
    </button>
  );
};

const clickIncompleto = () =>(
    swal({
      title: 'Ops',
      text: 'Este presupuesto no esta completo. Genere los pagos primero.',
      icon: 'warning',
      button: 'OK!',
    })
);

const defaultSorted = [
  {
    dataField: 'id',
    order: 'desc',
  },
];

export class ListaPresupuestos extends Component {
  static propTypes = {
    presupuestos: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const { path } = this.props.match;

    let tipoPresupuesto = 'pendientes';
    let tipoTitPresupuesto = 'Pendientes';
    if (path.indexOf('aprobados') !== -1) {
      tipoPresupuesto = 'aprobados';
      tipoTitPresupuesto = 'Aprobados';
    } else if (path.indexOf('concluidos') !== -1) {
      tipoPresupuesto = 'concluidos';
      tipoTitPresupuesto = 'Concluidos';
    }
    return (
      <div className="presupuestos-lista-presupuestos">
        <PrincipalTabla
          titulo={`Lista de Presupuestos ${tipoTitPresupuesto}`}
          defaultSorted={defaultSorted}
          api_funcion={`${columns[0].table}/${tipoPresupuesto}`}
          columns={columns}
          sinModal={'/presupuestos'}
          {...this.props}
        />
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    presupuestos: state.presupuestos,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ traerPresupuesto, traeItems, traeCuotas }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListaPresupuestos);
