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
  },
  {
    dataField: 'c_nombre',
    text: 'Nombre',
    sort: true,
  },
  {
    dataField: 'c_direccion',
    text: 'Dirección',
    sort: true,
  },
  {
    dataField: 'c_cel1',
    text: 'Celular',
    sort: true,
  },
  {
    dataField: 'c_activo',
    text: 'Activa',
    sort: true,
    editable: false,
    searchable: false,
  },
  {
    dataField: 'c_cliente',
    text: 'Cliente',
    sort: true,
    editable: false,
    searchable: false,
  },
  {
    dataField: 'c_comisionista',
    text: 'Comisionista',
    sort: true,
    editable: false,
    searchable: false,
  },
  {
    dataField: 'c_funcionario',
    text: 'Funcionario',
    sort: true,
    editable: false,
    searchable: false,
  },
  {
    dataField: 'c_usuario',
    text: 'Usuário',
    sort: true,
    editable: false,
    searchable: false,
  },
  
];


const defaultSorted = [
  {
    dataField: 'c_nombre',
    order: 'asc',
  },
];

export class PagePersonas extends Component {
  static propTypes = {
    personas: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };


  render() {

    return (
      <div className="personas-page-personas">
        <PrincipalTabla
          titulo={'Lista de Personas'}
          defaultSorted={defaultSorted}
          api_funcion={columns[0].table}
          columns={columns}
          sinModal={'personas'}
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
    actions: bindActionCreators({  }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PagePersonas);
