import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PrincipalTabla } from '../esqueleto';
import formatarNumero from '../../common/formatarNumero';

const columns = [
  {
    dataField: 'c_descripcion',
    table: 'Mercaderias',
    text: 'Descripción',
    sort: true,
    attrs: { width: '40%' },
  },
  {
    dataField: 'c_unidad',
    text: 'Unidad',
    sort: true,
    editable: false,
    attrs: { width: '10%' },
  },
  {
    dataField: 'marca.c_descripcion',
    text: 'Marca',
    sort: true,
    editable: false,
    attrs: { width: '10%' },
  },
  {
    dataField: 'grupo.c_descripcion',
    text: 'Grupo',
    sort: true,
    editable: false,
    attrs: { width: '10%' },
  },
  {
    dataField: 'n_venta',
    text: 'Precio',
    sort: true,
    formatter: formatarNumero,
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

export class ListaMercaderias extends Component {
  static propTypes = {
    mercaderias: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="mercaderias-lista-mercaderias">
        <PrincipalTabla
          titulo={'Lista de Mercaderias'}
          defaultSorted={defaultSorted}
          api_funcion={columns[0].table}
          columns={columns}
          sinModal={'mercaderias'}
          {...this.props}
        />
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    mercaderias: state.mercaderias,
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
)(ListaMercaderias);
