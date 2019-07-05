import React, { Component } from 'react';
import { Link } from '../esqueleto';
import PropTypes from 'prop-types';
import { InputText, InputNumber, SuperSelect, ModalForm } from '../esqueleto';
import { Field, FieldArray } from 'redux-form';
import { Button, Form, Row, Col, Container, Collapse, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FormItemsMercaderiasServicios } from './';
import formatarNumero from '../../common/formatarNumero';

const renderCuotas = ({
  type,
  fields,
  meta: { touched, error, submitFailed },
  decimales,
  onChangeValorCuota,
}) => (
  <div>
    {fields.map((item, indice) => (
      <Row key={indice}>
        <Col sm={2}>Cuota {indice + 1})</Col>
        <Col sm={5}>
          <Field
            name={`${item}.n_valor`}
            className="field form-control-lg form-control"
            component={InputNumber}
            decimalScale={decimales}
            onChange={valor => {
              onChangeValorCuota({
                actual: { valor, indice },
                fields: fields.getAll(),
              });
            }}
          />
        </Col>
        <Col sm={5}>
          <Field
            name={`${item}.d_fecha_vcto`}
            type="date"
            className="field form-control-lg form-control"
            component="input"
          />
        </Col>
      </Row>
    ))}
  </div>
);

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
      collapseItems: true,
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
      optionsSeguros,
      optionsFrecuencias,
      optionsFletes,
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
      onChangeItems,
      esqueleto,
      onChangeMoneda,
      onChangePersona,
      initialValuesModal,
      tipoItem,
      modoEdicionItem,
      onChangeCamposValores,
      moneda,
      descMonedaItem,
      onChangeImpuesto,
      onChangeRatio,
      n_exentas,
      n_unitario,
      n_cantidad,
      n_gravadas_5,
      n_gravadas_10,
      n_id_flete,
      validationConstraintsItems,
      onChangePesoFlete,
      c_desc_item,
      onChangePeso,
      onChangePagos,
      onChangeValorCuota,
      n_dif_cuotas,
      onChageStatus,
    } = this.props;
    return (
      <div className="presupuestos-form-presupuestos">
        <div className="titulo_formulario">{edicion ? 'Editar' : 'Cadastrar'} Presupuesto</div>
        <Container>
          <ModalForm
            tituloModal={modoEdicionItem ? 'Editar Item' : 'Nuevo Item'}
            esqueleto={esqueleto}
            descMoneda={descMoneda}
            decimales={decimales}
            onChangeItems={onChangeItems}
            moneda={moneda}
            optionsItems={optionsItems}
            optionsFletes={optionsFletes}
            onChangePesoFlete={onChangePesoFlete}
            enviarFormulario={enviarItems}
            cuerpoModal={FormItemsMercaderiasServicios}
            atualizouForm={atualizouFormModal}
            initialValues={initialValuesModal}
            tipoItem={tipoItem}
            descMonedaItem={descMonedaItem}
            onChangeImpuesto={onChangeImpuesto}
            onChangePeso={onChangePeso}
            onChangeRatio={onChangeRatio}
            n_exentas={n_exentas}
            n_unitario={n_unitario}
            n_cantidad={n_cantidad}
            n_gravadas_5={n_gravadas_5}
            n_gravadas_10={n_gravadas_10}
            n_id_flete={n_id_flete}
            validationConstraints={validationConstraintsItems}
            c_desc_item={c_desc_item}
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
                  disabled={items && items.length > 0}
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
                  onChange={onChageStatus}
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
                          items.map((objItem, indice) => (
                            <tr
                              key={indice}
                              onDoubleClick={() => {
                                editarItem(objItem);
                              }}
                            >
                              <td>{objItem.c_descripcion}</td>
                              <td>{formatarNumero(objItem.n_cantidad, 0)}</td>
                              <td>{formatarNumero(objItem.n_unitario, decimales)}</td>
                              <td>{formatarNumero(objItem.n_exentas, decimales)}</td>
                              <td>{formatarNumero(objItem.n_gravadas_5, decimales)}</td>
                              <td>{formatarNumero(objItem.n_gravadas_10, decimales)}</td>
                              <td>{formatarNumero(objItem.n_peso, 2)}</td>
                              <td>{formatarNumero(objItem.n_flete, decimales)}</td>
                              <td>
                                <Button
                                  type="button"
                                  color="info"
                                  size="sm"
                                  onClick={() => {
                                    editarItem(objItem);
                                  }}
                                >
                                  <FontAwesomeIcon icon={faEdit} />
                                </Button>{' '}
                                <Button
                                  type="button"
                                  color="danger"
                                  size="sm"
                                  onClick={() => {
                                    eliminarItem(objItem);
                                  }}
                                >
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
                    <Col sm="6" md="4" lg={{ size: 2, offset: 4 }} xl="2">
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
                  Comisión
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
                        onChange={valor => {
                          onChangeCamposValores({
                            n_valor_comision: valor,
                            seguro: this.props.seguro,
                            n_tipo_seguro_valor: this.props.n_tipo_seguro_valor,
                            n_desc_redondeo: this.props.n_desc_redondeo,
                          });
                        }}
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
                        onChange={valor => {
                          onChangeCamposValores({
                            n_valor_comision: this.props.n_valor_comision,
                            seguro: valor,
                            n_tipo_seguro_valor: this.props.n_tipo_seguro_valor,
                            n_desc_redondeo: this.props.n_desc_redondeo,
                          });
                        }}
                        component={SuperSelect}
                        placeholder="Elija"
                      />
                    </Col>
                    <Col sm="4">
                      <Field
                        name="n_tipo_seguro_valor"
                        label="Cantidad asegurada : "
                        component={InputNumber}
                        decimalScale={decimales}
                        onChange={valor => {
                          onChangeCamposValores({
                            n_valor_comision: this.props.n_valor_comision,
                            seguro: this.props.seguro,
                            n_tipo_seguro_valor: valor,
                            n_desc_redondeo: this.props.n_desc_redondeo,
                          });
                        }}
                        className="field form-control-lg form-control"
                      />
                    </Col>
                    <Col sm="4">
                      <Field
                        name="n_valor_seguro"
                        label="Valor seguro : "
                        component={InputNumber}
                        readonly
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
                        onChange={valor => {
                          onChangeCamposValores({
                            n_valor_comision: this.props.n_valor_comision,
                            seguro: this.props.seguro,
                            n_tipo_seguro_valor: this.props.n_tipo_seguro_valor,
                            n_desc_redondeo: valor,
                          });
                        }}
                        className="field form-control-lg form-control"
                      />
                    </Col>
                    <Col sm="12">
                      <Field
                        name="n_total_general"
                        label="Total General (Comisión + Seguro + Items con flete + Descuento/Redondeo) : "
                        component={InputNumber}
                        readonly
                        decimalScale={decimales}
                        className="field form-control-lg form-control"
                      />
                    </Col>
                    {moneda !== 1 && (
                      <Col sm="12">
                        <Field
                          name="n_total_general_gs"
                          label="Total en Gs : "
                          component={InputNumber}
                          disabled
                          decimalScale={0}
                          className="field form-control-lg form-control"
                        />
                      </Col>
                    )}
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
                        onBlur={valor => {
                          onChangePagos({
                            n_cuotas_pago: this.props.n_cuotas_pago,
                            n_dias_Frecuencia_pago: this.props.n_dias_Frecuencia_pago,
                          });
                        }}
                      />
                    </Col>
                    <Col sm="4">
                      <Field
                        name="n_dias_Frecuencia_pago"
                        label="Frecuencia de pagos : "
                        options={optionsFrecuencias}
                        component={SuperSelect}
                        placeholder="Elija"
                        onChange={valor => {
                          onChangePagos({
                            n_cuotas_pago: this.props.n_cuotas_pago,
                            n_dias_Frecuencia_pago: valor,
                          });
                        }}
                      />
                    </Col>
                  </Row>
                  <FieldArray
                    name="cuotas"
                    component={renderCuotas}
                    decimales={decimales}
                    onChangeValorCuota={onChangeValorCuota}
                  />
                  {n_dif_cuotas && n_dif_cuotas > 0 && (
                    <Row>
                      <Col>
                        <Field
                          name="n_dif_cuotas"
                          label="Diferencia entre total y las cuotas"
                          className="field form-control-lg form-control"
                          component={InputNumber}
                          decimalScale={decimales}
                          disabled
                        />
                      </Col>
                    </Row>
                  )}
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
                  normalize={value => value && value.toUpperCase()}
                />
              </Col>
            </Row>
            <Row className="text-right">
              <Col sm="12">
                <Link to="/presupuestos" className="btn btn-primary" history={this.props.history}>
                  Cancelar
                </Link>{' '}
                <Button type="submit" color="success" disabled={pristine || submitting}>
                  {submitting ? 'Guardando' : 'Guardar'}
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    );
  }
}

export default FormPresupuestos;
