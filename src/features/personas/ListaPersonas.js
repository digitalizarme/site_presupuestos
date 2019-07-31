import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PrincipalTabla } from '../esqueleto';

const columns = [
  {
    dataField: 'c_identificacion',
    table: 'Personas',
    text: 'Identificación',
    sort: true,
    attrs: { width: '10%' },
  },
  {
    dataField: 'c_nombre',
    text: 'Nombre',
    sort: true,
    attrs: { width: '20%' },
  },
  {
    dataField: 'c_direccion',
    text: 'Dirección',
    sort: true,
    attrs: { width: '10%' },
  },
  {
    dataField: 'c_cel1',
    text: 'Celular',
    sort: true,
    attrs: { width: '10%' },
  },
  {
    dataField: 'c_activo',
    text: 'Activa',
    sort: true,
    editable: false,
    attrs: { width: '10%' },
  },
  {
    dataField: 'c_cliente',
    text: 'Cliente',
    sort: true,
    editable: false,
    attrs: { width: '10%' },
  },
  {
    dataField: 'c_comisionista',
    text: 'Comisionista',
    sort: true,
    editable: false,
    attrs: { width: '10%' },
  },
  {
    dataField: 'c_funcionario',
    text: 'Funcionario',
    sort: true,
    editable: false,
    attrs: { width: '10%' },
  },
  {
    dataField: 'c_usuario',
    text: 'Usuário',
    sort: true,
    editable: false,
    attrs: { width: '10%' },
  },
];

const defaultSorted = [
  {
    dataField: 'c_nombre',
    order: 'asc',
  },
];

export class ListaPersonas extends Component {
  static propTypes = {
    personas: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="personas-lista-personas">
        <PrincipalTabla
          titulo={'Lista de Personas'}
          defaultSorted={defaultSorted}
          api_funcion={columns[0].table}
          columns={columns}
          sinModal={'personas'}
          {...this.props}
        />
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    personas: state.personas,
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
)(ListaPersonas);
