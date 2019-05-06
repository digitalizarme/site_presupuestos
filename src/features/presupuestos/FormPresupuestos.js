import React, { Component } from 'react';
import { Button, Form, Row, Col, Container, Collapse } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { InputText, InputNumber, SuperSelect } from '../esqueleto';
import { Field } from 'redux-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

class FormPresupuestos extends Component {
  static propTypes = {
    enviarFormulario: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.toggleItems        = this.toggleItems.bind(this);
    this.toggleTotal        = this.toggleTotal.bind(this);
    this.toggleComisionista = this.toggleComisionista.bind(this);
    this.toggleFlete        = this.toggleFlete.bind(this);
    this.toggleSeguro       = this.toggleSeguro.bind(this);
    this.toggleTotalG       = this.toggleTotalG.bind(this);
    this.togglePlazo        = this.togglePlazo.bind(this);
    
    this.state = { collapseItems: false,collapseTotal: false,collapseComisionista: false,collapseFlete: false,collapseSeguro: false,collapseTotalG: false,collapsePlazo: false };
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

  toggleFlete() {
    this.setState(state => ({ collapseFlete: !state.collapseFlete }));
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
      decimales,
      usuario,
      agregar,
      editar,
      eliminar,
    } = this.props;
    return (
      <div className="presupuestos-form-presupuestos">
        <div className="titulo_formulario">{edicion ? 'Editar' : 'Cadastrar'} Presupuesto</div>
        <Container>
          <Form onSubmit={enviarFormulario} className="form_border">
            <Field name="id" component="input" type="hidden" />
            <Row>
              <Col sm="6" md="4" lg="4" xl="4">
                <label>Creado por</label>
                <input type="text" value={usuario} disabled className="field form-control-lg form-control" />
              </Col>
              <Col sm="6" md="4" lg="4" xl="4">
                <Field
                  name="n_id_moneda"
                  label="Moneda"
                  options={optionsMonedas}
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
                />
              </Col>
            </Row>
            <Row>
              <Col xs="12" lg="6" className="espacio_abajo">
                <Button type="button" color="success" size="md" onClick={agregar}>
                  <FontAwesomeIcon icon={faPlus} /> Agregar
                </Button>{' '}
                <Button type="button" color="info" size="md" onClick={editar}>
                  <FontAwesomeIcon icon={faEdit} /> Editar
                </Button>{' '}
                <Button type="button" color="danger" size="md" onClick={eliminar}>
                  <FontAwesomeIcon icon={faTrashAlt} /> Eliminar
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
                  <table className="table table-responsive">
                    <thead>
                      <tr>
                        <th style={{ width: '20%' }}>Desc.</th>
                        <th>Cant.</th>
                        <th>Unit.</th>
                        <th>Exent.</th>
                        <th>Grav. 5%</th>
                        <th>Grav. 10%</th>
                        <th>Peso</th>
                        <th>Flete</th>
                        <th>Seguro</th>
                      </tr>
                    </thead>
                    <tbody />
                  </table>
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
                    <Col sm="6" md="3" lg="3" xl="3">
                      <label>Exentas :</label>
                      <input type="text" disabled className="field form-control-lg form-control" />
                    </Col>
                    <Col sm="6" md="3" lg="3" xl="3">
                      <label>Gravadas 5% :</label>
                      <input type="text" disabled className="field form-control-lg form-control" />
                    </Col>
                    <Col sm="6" md="3" lg="3" xl="3">
                      <label>Gravadas 10% :</label>
                      <input type="text" disabled className="field form-control-lg form-control" />
                    </Col>
                    <Col sm="6" md="3" lg="3" xl="3">
                      <label>Total Items :</label>
                      <input type="text" disabled className="field form-control-lg form-control" />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="6" md={{ size: 3, offset: 3 }}>
                      <label>IVA Gravadas 5% :</label>
                      <input type="text" disabled className="field form-control-lg form-control" />
                    </Col>
                    <Col sm="6" md="3" lg="3" xl="3">
                      <label>IVA Gravadas 10% :</label>
                      <input type="text" disabled className="field form-control-lg form-control" />
                    </Col>
                    <Col sm="6" md="3" lg="3" xl="3">
                      <label>Total IVA Items :</label>
                      <input type="text" disabled className="field form-control-lg form-control" />
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
                <div className="titulo_sesion bg-dark mano" onClick={this.toggleFlete}>
                  Flete
                </div>
              </Col>
            </Row>
            <Row>
              <Col>
                <Collapse isOpen={this.state.collapseFlete}>
                  <Row>
                    <Col sm="4">
                      <Field
                        name="n_id_flete"
                        label="Tipo : "
                        options={optionsFletes}
                        component={SuperSelect}
                        placeholder="Elija"
                      />
                    </Col>
                    <Col sm="4">
                      <Field
                        name="n_tipo_flete_valor"
                        label="Cantidad tipo del flete : "
                        component={InputNumber}
                        decimalScale={2}
                        className="field form-control-lg form-control"
                      />
                    </Col>
                    <Col sm="4">
                      <Field
                        name="n_valor_flete"
                        label="Valor flete : "
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
                    <Col sm="4">
                      <Field
                        name="n_desc_redondeo"
                        label="Descuento/Redondeo : "
                        component={InputNumber}
                        decimalScale={decimales}
                        className="field form-control-lg form-control"
                      />
                    </Col>
                    <Col sm="4">
                      <Field
                        name="n_total_general"
                        label="Total General (Comision + Flete + Seguro + Items + Descuento/Redondeo) : "
                        component={InputNumber}
                        decimalScale={decimales}
                        className="field form-control-lg form-control"
                      />
                    </Col>
                    <Col sm="4">
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
