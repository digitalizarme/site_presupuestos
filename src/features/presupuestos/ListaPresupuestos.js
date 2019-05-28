import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PrincipalTabla } from '../esqueleto';
import formatarFecha from '../../common/formatarFecha';
import formatarNumero from '../../common/formatarNumero';

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
    attrs: { width: '30%' },
  },
  {
    dataField: 'persona.c_identificacion',
    text: 'Identificacíon',
    sort: true,
    editable: false,
    attrs: { width: '15%' },
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
    formatter: (cell,row) => {
      return formatarNumero(cell,row.moneda.n_decimales);
    },
    attrs: { width: '10%' },
  },
  {
    dataField: 'updatedAt',
    text: 'Actualizado',
    sort: true,
    editable: false,
    formatter: formatarFecha,
    attrs: { width: '10%' },
  },
];

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
    return (
      <div className="presupuestos-lista-presupuestos">
        <PrincipalTabla
          titulo={'Lista de Presupuestos'}
          defaultSorted={defaultSorted}
          api_funcion={columns[0].table}
          columns={columns}
          sinModal={'/presupuestos'}
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
    actions: bindActionCreators({}, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ListaPresupuestos);
