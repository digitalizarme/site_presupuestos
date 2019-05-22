import React, { Component } from 'react';
import { Button, Form, Row, Col, Container, Collapse, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { InputText, InputNumber, SuperSelect, ModalForm } from '../esqueleto';
import { Field } from 'redux-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FormItemsMercaderiasServicios } from './';
import formatarNumero from '../../common/formatarNumero';

class FormPresupuestos extends Component {
  static propTypes = {
    enviarFormulario: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.toggleItems = this.toggleItems.bind(this);
    this.toggleTotal = this.toggleTotal.bind(this);
    this.toggleComisionista = this.toggleComisionista.bind(this);
    this.toggleSeguro = this.toggleSeguro.bind(this);
    this.toggleTotalG = this.toggleTotalG.bind(this);
    this.togglePlazo = this.togglePlazo.bind(this);

    this.state = {
      collapseItems: false,
      collapseTotal: false,
      collapseComisionista: false,
      collapseSeguro: false,
      collapseTotalG: false,
      collapsePlazo: false,
    };
  }

  toggleItems() {
    this.setState(state => ({ collapseItems: !state.collapseItems }));
  }

  toggleTotal() {
    this.setState(state => ({ collapseTotal: !state.collapseTotal }));
  }

  toggleComisionista() {
    this.setState(state => ({ collapseComisionista: !state.collapseComisionista }));
  }

  toggleSeguro() {
    this.setState(state => ({ collapseSeguro: !state.collapseSeguro }));
  }

  toggleTotalG() {
    this.setState(state => ({ collapseTotalG: !state.collapseTotalG }));
  }

  togglePlazo() {
    this.setState(state => ({ collapsePlazo: !state.collapsePlazo }));
  }

  render() {
    const {
      enviarFormulario,
      submitting,
      pristine,
      edicion,
      optionsMonedas,
      optionsStatus,
      optionsClientes,
      optionsComisionista,
      optionsFletes,
      optionsSeguros,
      optionsFrecuencias,
      optionsItems,
      decimales,
      descMoneda,
      usuario,
      agregarItem,
      editarItem,
      eliminarItem,
      items,
      enviarItems,
      atualizouFormModal,
      itemSeleccionado,
      onChangeItems,
      esqueleto,
      onChangeMoneda,
      onChangePersona,
      initialValuesModal,
      tipoItem,
      modoEdicionItem,
      onChangeComisionista
    } = this.props;
    return (
      <div className="presupuestos-form-presupuestos">
        <div className="titulo_formulario">{edicion ? 'Editar' : 'Cadastrar'} Presupuesto</div>
        <Container>
          <ModalForm
            tituloModal={modoEdicionItem?'Editar Item': 'Nuevo Item'}
            esqueleto={esqueleto}
            descMoneda={descMoneda}
            decimales={decimales}
            itemSeleccionado={itemSeleccionado}
            onChangeItems={onChangeItems}
            optionsItems={optionsItems}
            enviarFormulario={enviarItems}
            cuerpoModal={FormItemsMercaderiasServicios}
            atualizouForm={atualizouFormModal}
            initialValues={initialValuesModal}
            tipoItem={tipoItem}
            sizeModal="xl"
          />
          <Form onSubmit={enviarFormulario} className="form_border">
            <Field name="id" component="input" type="hidden" />
            <Field name="n_id_usuario" component="input" type="hidden" />

            <Row>
              <Col sm="6" md="4" lg="4" xl="4">
                <label>Creado por</label>
                <input
                  type="text"
                  value={usuario}
                  disabled
                  className="field form-control-lg form-control"
                />
              </Col>
              <Col sm="6" md="4" lg="4" xl="4">
                <Field
                  name="n_id_moneda"
                  label="Moneda"
                  options={optionsMonedas}
                  onChange={onChangeMoneda}
                  component={SuperSelect}
                  placeholder="Elija"
                />
              </Col>
              <Col sm="6" md="4" lg="4" xl="4">
                <Field
                  name="n_id_status"
                  label="Status"
                  options={optionsStatus}
                  component={SuperSelect}
                  placeholder="Elija"
                />
              </Col>
            </Row>
            <Row>
              <Col sm="12">
                <Field
                  name="n_id_persona"
                  label="Cliente"
                  options={optionsClientes}
                  component={SuperSelect}
                  placeholder="Elija"
                  onChange={onChangePersona}
                />
              </Col>
            </Row>
            <Row>
              <Col xs="12" lg="6" className="espacio_abajo">
                <Button type="button" color="success" size="md" onClick={agregarItem}>
                  <FontAwesomeIcon icon={faPlus} /> Agregar
                </Button>{' '}
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="titulo_sesion mano" onClick={this.toggleItems}>
                  Items
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <Collapse isOpen={this.state.collapseItems}>
                  <div className="scroll">
                  <Table striped responsive hover>
                    <thead>
                      <tr>
                        <th style={{ width: '25%' }}>Desc.</th>
                        <th style={{ width: '5%' }}>Cant.</th>
                        <th style={{ width: '10%' }}>Unit.</th>
                        <th style={{ width: '10%' }}>Exent.</th>
                        <th style={{ width: '10%' }}>Grav. 5%</th>
                        <th style={{ width: '10%' }}>Grav. 10%</th>
                        <th style={{ width: '10%' }}>Peso</th>
                        <th style={{ width: '10%' }}>Flete</th>
                        <th style={{ width: '10%' }}>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items && items.length > 0 ? (
                        items.map((item, indice) => (
                          <tr
                            key={indice}
                            onDoubleClick={() => {
                              editarItem(item);
                            }}
                          >
                            <td>{item.c_descripcion}</td>
                            <td>{formatarNumero(item.n_cantidad)}</td>
                            <td>{formatarNumero(item.n_unitario)}</td>
                            <td>{formatarNumero(item.n_exentas)}</td>
                            <td>{formatarNumero(item.n_gravadas_5)}</td>
                            <td>{formatarNumero(item.n_gravadas_10)}</td>
                            <td>{formatarNumero(item.n_peso)}</td>
                            <td>{formatarNumero(item.n_flete)}</td>
                            <td>
                              <Button type="button" color="info" size="sm" onClick={()=>{editarItem(item)}}>
                                <FontAwesomeIcon icon={faEdit} />
                              </Button>{' '}
                              <Button type="button" color="danger" size="sm" onClick={()=>{eliminarItem(item.id)}}>
                                <FontAwesomeIcon icon={faTrashAlt} />
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="9" className="text-center">
                            No hay items
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                  </div>
                </Collapse>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="titulo_sesion bg-success mano" onClick={this.toggleTotal}>
                  Total items
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <Collapse isOpen={this.state.collapseTotal}>
                  <Row>
                    <Col sm="6" md="4" lg="2" xl="2">
                      <Field
                        name="n_total_exentas"
                        label="Exentas :"
                        disabled
                        component={InputNumber}
                        decimalScale={decimales}
                        className="field form-control-lg form-control"
                      />
                    </Col>
                    <Col sm="6" md="4" lg="2" xl="2">
                      <Field
                        name="n_total_flete"
                        label="Total Flete :"
                        disabled
                        component={InputNumber}
                        decimalScale={decimales}
                        className="field form-control-lg form-control"
                      />
                    </Col>
                    <Col sm="6" md="4" lg="2" xl="2">
                      <Field
                        name="n_total_5"
                        label="Gravadas 5% :"
                        disabled
                        component={InputNumber}
                        decimalScale={decimales}
                        className="field form-control-lg form-control"
                      />
                    </Col>
                    <Col sm="6" md="4" lg="2" xl="2">
                      <Field
                        name="n_total_10"
                        label="Gravadas 10% :"
                        disabled
                        component={InputNumber}
                        decimalScale={decimales}
                        className="field form-control-lg form-control"
                      />
                    </Col>
                    <Col sm="6" md="4" lg="4" xl="4">
                      <Field
                        name="n_total_items"
                        label="Total Items :"
                        disabled
                        component={InputNumber}
                        decimalScale={decimales}
                        className="field form-control-lg form-control"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6" md="4" lg={{size:2, offset:4}} xl="2">
                      <Field
                        name="n_total_iva_5"
                        label="IVA Grav. 5% :"
                        disabled
                        component={InputNumber}
                        decimalScale={decimales}
                        className="field form-control-lg form-control"
                      />
                    </Col>
                    <Col sm="6" md="4" lg="2" xl="2">
                      <Field
                        name="n_total_iva_10"
                        label="IVA Grav. 10% :"
                        disabled
                        component={InputNumber}
                        decimalScale={decimales}
                        className="field form-control-lg form-control"
                      />
                    </Col>
                    <Col sm="6" md="4" lg="4" xl="4">
                      <Field
                        name="n_total_iva"
                        label="Total IVA Items :"
                        disabled
                        component={InputNumber}
                        decimalScale={decimales}
                        className="field form-control-lg form-control"
                      />
                    </Col>
                  </Row>
                </Collapse>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="titulo_sesion bg-info mano" onClick={this.toggleComisionista}>
                  Comisionista
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <Collapse isOpen={this.state.collapseComisionista}>
                  <Row>
                    <Col sm="8">
                      <Field
                        name="n_id_persona_comisionista"
                        label="Comicionista"
                        options={optionsComisionista}
                        onChange={onChangeComisionista}
                        component={SuperSelect}
                        placeholder="Elija"
                      />
                    </Col>
                    <Col sm="4">
                      <Field
                        name="n_valor_comision"
                        label="Valor"
                        component={InputNumber}
                        decimalScale={decimales}
                        className="field form-control-lg form-control"
                      />
                    </Col>
                  </Row>
                </Collapse>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="titulo_sesion bg-danger mano" onClick={this.toggleSeguro}>
                  Seguro
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <Collapse isOpen={this.state.collapseSeguro}>
                  <Row>
                    <Col sm="4">
                      <Field
                        name="n_id_seguro"
                        label="Tipo : "
                        options={optionsSeguros}
                        component={SuperSelect}
                        placeholder="Elija"
                      />
                    </Col>
                    <Col sm="4">
                      <Field
                        name="n_tipo_seguro_valor"
                        label="Cantidad asegurada : "
                        component={InputNumber}
                        decimalScale={2}
                        className="field form-control-lg form-control"
                      />
                    </Col>
                    <Col sm="4">
                      <Field
                        name="n_valor_seguro"
                        label="Valor seguro : "
                        component={InputNumber}
                        decimalScale={decimales}
                        className="field form-control-lg form-control"
                      />
                    </Col>
                  </Row>
                </Collapse>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="titulo_sesion bg-warning mano" onClick={this.toggleTotalG}>
                  Total General
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <Collapse isOpen={this.state.collapseTotalG}>
                  <Row>
                    <Col sm="12">
                      <Field
                        name="n_desc_redondeo"
                        label="Descuento/Redondeo : "
                        component={InputNumber}
                        decimalScale={decimales}
                        className="field form-control-lg form-control"
                      />
                    </Col>
                    <Col sm="12">
                      <Field
                        name="n_total_general"
                        label="Total General (Comisión + Seguro + Items con flete + Descuento/Redondeo) : "
                        component={InputNumber}
                        decimalScale={decimales}
                        className="field form-control-lg form-control"
                      />
                    </Col>
                    <Col sm="12">
                      <Field
                        name="n_total_general_gs"
                        label="Total en Gs : "
                        component={InputNumber}
                        decimalScale={0}
                        className="field form-control-lg form-control"
                      />
                    </Col>
                  </Row>
                </Collapse>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="titulo_sesion bg-secondary mano" onClick={this.togglePlazo}>
                  Plazo y Forma de pago
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <Collapse isOpen={this.state.collapsePlazo}>
                  <Row>
                    <Col sm="4">
                      <Field
                        name="n_dias_entrega"
                        label="Plazo de entrega en Dias : "
                        component={InputNumber}
                        decimalScale={0}
                        className="field form-control-lg form-control"
                      />
                    </Col>
                    <Col sm="4">
                      <Field
                        name="n_cuotas_pago"
                        label="Cantidad de pagos : "
                        component={InputNumber}
                        decimalScale={0}
                        className="field form-control-lg form-control"
                      />
                    </Col>
                    <Col sm="4">
                      <Field
                        name="n_dias_Frecuencia_pago"
                        label="Frecuencia de pagos : "
                        options={optionsFrecuencias}
                        component={SuperSelect}
                        placeholder="Elija"
                      />
                    </Col>
                  </Row>
                </Collapse>
              </Col>
            </Row>

            <Row>
              <Col sm="12">
                <Field
                  name="t_observacion"
                  styleDiv={{ width: '100%' }}
                  label="Observación"
                  component={InputText}
                  type="textarea"
                  className="field"
                />
              </Col>
            </Row>
            <Row>
              <Col sm="12">
                <Button type="submit" color="success" disabled={pristine || submitting}>
                  {submitting ? 'Guardando' : 'Guardar'}
                </Button>{' '}
                <Link to="/presupuestos" className="btn btn-primary">
                  Cancelar
                </Link>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    );
  }
}

export default FormPresupuestos;
