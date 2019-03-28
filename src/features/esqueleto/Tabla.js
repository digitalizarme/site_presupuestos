import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  procesarTabla,
  apiGenerico,
  lineaSeleccionada,
  modalToggle,
  limpiarItemLinea,
} from './redux/actions';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import cellEditFactory from 'react-bootstrap-table2-editor';
import paginationFactory, {
  PaginationProvider,
  PaginationListStandalone,
} from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import swal from 'sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Button, Row, Col } from 'reactstrap';
import { ModalForm } from './';
import history from '../../common/history';

const CustomTotal = (from, to, size) => (
  <span className="react-bootstrap-table-pagination-total">
    {from} - {from + to - 1} / {size} Registros
  </span>
);

const RemoteAll = ({
  data,
  page,
  procesarTablaPending,
  sizePerPage,
  onTableChange,
  totalSize,
  columns,
  titulo,
  defaultSorted,
  apiGenerico,
  esqueleto,
  selected,
  lineaSeleccionada,
  procesarTabla,
  api_funcion,
  modalToggle,
  limpiarItemLinea,
  sinModal,
  btnsExtra,
  props,
}) => {
  const options = {
    custom: true,
    page,
    sizePerPage,
    totalSize,
    firstPageText: 'Primer',
    prePageText: 'Anterior',
    nextPageText: 'Siguiente',
    lastPageText: 'Ultima',
    nextPageTitle: 'Primer pagina',
    prePageTitle: 'Pre pagina',
    firstPageTitle: 'Siguiente pagina',
    lastPageTitle: 'Ultima pagina',
  };

  const handleOnSelect = (row, isSelect) => {
    if (isSelect) {
      lineaSeleccionada([row]);
    } else {
      lineaSeleccionada(selected.filter(x => x !== row.id));
    }
  };

  const selectRow = {
    mode: 'radio',
    clickToSelect: true,
    clickToEdit: true,
    selected,
    onSelect: handleOnSelect,
    style: { backgroundColor: '#007bff' },
  };

  const agregar = () => {
    const { reset } = props;
    sinModal ? history.push(`${sinModal}/nuevo`) : limpiarItemLinea() && reset() && modalToggle();
  };

  const editar = () => {
    if (selected.length === 0) {
      swal({
        title: 'Ops',
        text: 'Debes seleccionar una linea primero',
        icon: 'warning',
        button: 'OK!',
      });
    } else {
      sinModal ? history.push(`${sinModal}/editar/${selected[0].id}`) : modalToggle();
    }
  };

  const eliminar = () => {
    if (selected.length === 0) {
      swal({
        title: 'Ops',
        text: 'Debes seleccionar una linea primero',
        icon: 'warning',
        button: 'OK!',
      });
    } else {
      swal({
        title: 'Estás seguro?',
        text: 'Esta acción no podrá ser cancelada',
        icon: 'warning',
        buttons: {
          cancel: {
            text: 'Cancelar',
            value: null,
            visible: true,
            className: '',
            closeModal: true,
          },
          confirm: {
            text: 'Sí, estoy',
            value: true,
            visible: true,
            className: '',
            closeModal: true,
          },
        },
        dangerMode: true,
      }).then(willDelete => {
        if (willDelete) {
          const params = {
            table: columns[0].table,
            where_field: 'id',
            where_value: selected[0].id,
            method:'del',
          };
          return apiGenerico({
            api_funcion: 'generico/eliminar',
            params,
          })
            .then(res => {
              procesarTabla({
                api_funcion,
                offset: 0,
                sizePerPage,
                page,
                columns: JSON.stringify(columns),
                searchText: esqueleto.searchText,
                sortField: esqueleto.sortField,
                sortOrder: esqueleto.sortOrder,
                defaultSorted: esqueleto.defaultSorted,
              });

              swal({
                icon: 'success',
                timer: 1000,
              });
            })
            .catch(err => {
              if (typeof err.response !== 'undefined' && err.response.status !== 401) {
                const { message } =
                  typeof err.response !== 'undefined'
                    ? err.response.data
                    : 'Error al intentar eliminar';
                swal({
                  title: 'Ops',
                  text: message ? message : 'Error al intentar eliminar',
                  icon: 'error',
                  button: 'OK!',
                });
              }
            });
        }
      });
    }
  };

  const beforeSaveCell = (oldValue, newValue, row, column, done) => {
    const params = {
      table: columns[0].table,
      column: column.dataField,
      valor: newValue,
      where_field: 'id',
      where_value: row.id,
      method:'put',
    };
    apiGenerico({
      api_funcion: 'generico/actualizar',
      params,
    })
      .then(res => {
        swal({
          icon: 'success',
          timer: 1000,
        });
        done(true);
      })
      .catch(err => {
        if (typeof err.response !== 'undefined' && err.response.status !== 401) {
          const { message } =
            typeof err.response !== 'undefined'
              ? err.response.data
              : 'Error al intentar actualizar';
          swal({
            title: 'Ops',
            text: message ? message : 'Error al intentar actualizar',
            icon: 'error',
            button: 'OK!',
          });
        }
        done(false);
      });
    return { async: true };
  };

  const NoDataIndication = ({ procesarTablaPending }) => (
    <div className="d-flex justify-content-center">
      {procesarTablaPending ? (
        <div className="spinner-grow text-primary m-5" role="status">
          <span className="sr-only">Cargando...</span>
        </div>
      ) : (
        'Sin datos'
      )}
    </div>
  );

  const MySearch = ({ onSearch, searchText }) => {
    let input;
    const handleClick = event => {
      if (event.keyCode === 13) {
        onSearch(input.value);
      }
      searchText = input.value;
    };

    return (
      <input
        className="field form-control-lg form-control"
        placeholder="Busque aqui [Presione enter]"
        ref={n => (input = n)}
        defaultValue={searchText}
        type="text"
        onKeyUp={handleClick}
      />
    );
  };

  return (
    <ToolkitProvider search keyField="id" data={data} columns={columns} bootstrap4>
      {props_ToolkitProvider => (
        <div>
          <div className="titulo_formulario">{titulo}</div>
          <div className="espacio_abajo">
            <Row>
              <Col xs="12" lg="6">
                <Button type="button" color="success" size="md" onClick={agregar}>
                  <FontAwesomeIcon icon={faPlus} /> Agregar
                </Button>{' '}
                <Button type="button" color="info" size="md" onClick={editar}>
                  <FontAwesomeIcon icon={faEdit} /> Editar
                </Button>{' '}
                <Button type="button" color="danger" size="md" onClick={eliminar}>
                  <FontAwesomeIcon icon={faTrashAlt} /> Eliminar
                </Button>{' '}
                {btnsExtra?btnsExtra:null}
              </Col>
              <Col xs="12" lg="6">
                <MySearch
                  {...props_ToolkitProvider.searchProps}
                  searchText={esqueleto.searchText}
                />
              </Col>
            </Row>
          </div>
          <PaginationProvider pagination={paginationFactory(options)}>
            {({ paginationProps, paginationTableProps }) => (
              <div>
                {!sinModal ? <ModalForm {...props} /> : null}
                <BootstrapTable
                  loading={procesarTablaPending}
                  striped
                  hover
                  remote
                  defaultSorted={defaultSorted}
                  classes="table-responsive-lg"
                  onTableChange={onTableChange}
                  noDataIndication={() => (
                    <NoDataIndication procesarTablaPending={procesarTablaPending} />
                  )}
                  selectRow={selectRow}
                  cellEdit={cellEditFactory({
                    mode: 'dbclick',
                    blurToSave: true,
                    autoSelectText: true,
                    beforeSaveCell,
                  })}
                  {...props_ToolkitProvider.baseProps}
                  {...paginationTableProps}
                />

                <div>
                  {CustomTotal((page - 1) * sizePerPage + 1, data.length, totalSize)}{' '}
                  <PaginationListStandalone {...paginationProps} />
                </div>
              </div>
            )}
          </PaginationProvider>
        </div>
      )}
    </ToolkitProvider>
  );
};

export class Tabla extends Component {
  static propTypes = {
    esqueleto: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired,
    titulo: PropTypes.string.isRequired,
    defaultSorted: PropTypes.array.isRequired,
  };

  handleTableChange = (type, { page, sizePerPage, sortField, sortOrder, searchText }) => {
    const { procesarTabla } = this.props.actions;
    const offset = (page - 1) * sizePerPage;
    const { api_funcion, columns,defaultSorted } = this.props;
    const params = {
      api_funcion,
      offset,
      sizePerPage,
      page,
      searchText,
      columns: JSON.stringify(columns),
      sortField,
      sortOrder,
      defaultSorted:JSON.stringify(defaultSorted),
    };
    procesarTabla(params);
  };

  render() {
    const { data, sizePerPage, page, selected, procesarTablaPending } = this.props.esqueleto;
    const { columns, titulo, defaultSorted, api_funcion, sinModal,btnsExtra } = this.props;
    const {
      procesarTabla,
      modalToggle,
      lineaSeleccionada,
      apiGenerico,
      limpiarItemLinea,
    } = this.props.actions;

    return (
      <div className="esqueleto-tabla">
        <RemoteAll
          data={data.items}
          page={page}
          selected={selected}
          columns={columns}
          procesarTablaPending={procesarTablaPending}
          limpiarItemLinea={limpiarItemLinea}
          modalToggle={modalToggle}
          defaultSorted={defaultSorted}
          titulo={titulo}
          sizePerPage={sizePerPage}
          totalSize={data.total}
          procesarTabla={procesarTabla}
          api_funcion={api_funcion}
          onTableChange={this.handleTableChange}
          apiGenerico={apiGenerico}
          lineaSeleccionada={lineaSeleccionada}
          esqueleto={this.props.esqueleto}
          sinModal={sinModal}
          btnsExtra={btnsExtra}
          props={this.props}
        />
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    esqueleto: state.esqueleto,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        procesarTabla,
        apiGenerico,
        lineaSeleccionada,
        modalToggle,
        limpiarItemLinea,
      },
      dispatch,
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tabla);
