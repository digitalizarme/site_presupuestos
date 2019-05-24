import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PrincipalTabla } from '../esqueleto';
import formatarNumero from '../../common/formatarNumero';

const columns = [
  {
    dataField: 'c_descripcion',
    table: 'Servicios',
    text: 'Descripción',
    sort: true,
    attrs: { width: '40%' },
  },
  {
    dataField: 'c_unidad',
    text: 'Unidad',
    sort: true,
    attrs: { width: '10%' },
  },
  {
    dataField: 'servicioGrupo.c_descripcion',
    text: 'Grupo',
    sort: true,
    attrs: { width: '10%' },
  },
  {
    dataField: 'n_valor',
    text: 'Precio',
    sort: true,
    formatter: formatarNumero,
    attrs: { width: '10%' },
  },
  {
    dataField: 'n_comision',
    text: 'Comisión',
    sort: true,
    editable: false,
    searchable: true,
    formatter: formatarNumero,
    attrs: { width: '10%' },
  },
  {
    dataField: 'moneda.c_descripcion',
    text: 'Moneda',
    sort: true,
    editable: false,
    searchable: true,
    attrs: { width: '10%' },
  },
  {
    dataField: 'c_activo',
    text: 'Activo',
    sort: true,
    editable: false,
    searchable: false,
    attrs: { width: '10%' },
  },
];

const defaultSorted = [
  {
    dataField: 'c_descripcion',
    order: 'asc',
  },
];

export class ListaServicios extends Component {
  static propTypes = {
    servicios: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="servicios-lista-servicios">
        <PrincipalTabla
          titulo={'Lista de Servicios'}
          defaultSorted={defaultSorted}
          api_funcion={columns[0].table}
          columns={columns}
          sinModal={'servicios'}
          {...this.props}
        />
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    servicios: state.servicios,
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
)(ListaServicios);
