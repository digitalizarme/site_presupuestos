import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InputText, InputNumber, SuperSelect } from '../esqueleto';
import { Field } from 'redux-form';
import { Row, Col, FormGroup } from 'reactstrap';

export default class FormPresupuestoPagos extends Component {
  static propTypes = {};

  render() {
    const {
      optionsCuotas,
      onChangeCuotas,
      decimales,
      cuotaSeleccionada,
      optionsCobradores,
      optionsMediosPago,
    } = this.props;
    console.log(cuotaSeleccionada);
    return (
      <div className="presupuestos-form-presupuesto-pagos">
        <Row>
          <Col sm="12">
            <Field
              name="persona.c_nombre"
              label="Cliente :"
              component={InputText}
              disabled
              className="field form-control-lg form-control"
            />
          </Col>
        </Row>
        <Row>
          <Col sm="12" md="3">
            <Field
              name="moneda.c_descripcion"
              label="Valores en"
              component={InputText}
              disabled
              className="field form-control-lg form-control"
            />
          </Col>

          <Col sm="12" md="9">
            <Field
              name="n_total_general"
              label="Total Presupuesto"
              component={InputNumber}
              decimalScale={decimales}
              disabled
              className="field form-control-lg form-control"
            />
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <Field
              name="cuotas"
              label="Cuotas :"
              options={optionsCuotas}
              onChange={onChangeCuotas}
              component={SuperSelect}
              placeholder="Elija"
            />
          </Col>
        </Row>
        {cuotaSeleccionada && (
          <div>
            <Row>
              <Col sm="12">
                <div className="titulo_formulario">
                  Cuota N. {cuotaSeleccionada.extra.n_nr_cuota}
                </div>
              </Col>
            </Row>
            <Row>
              <Col sm="12" md="4">
                <Field
                  name="n_valor"
                  label="Valor :"
                  component={InputNumber}
                  decimalScale={decimales}
                  className="field form-control-lg form-control"
                  disabled
                />
              </Col>
              <Col sm="12" md="4">
                <Field
                  name="n_desc_redondeo"
                  label="Desc./Redondeo :"
                  component={InputNumber}
                  decimalScale={decimales}
                  className="field form-control-lg form-control"
                />
              </Col>
              <Col sm="12" md="4">
                <Field
                  name="n_tot_recibido"
                  label="Recibido :"
                  component={InputNumber}
                  decimalScale={decimales}
                  className="field form-control-lg form-control"
                  disabled
                />
              </Col>
            </Row>
            <Row>
              <Col sm="12" md="6">
                <FormGroup>
                  <label>Vencimiento :</label>
                  <Field
                    name="d_fecha_vcto"
                    type="date"
                    className="field form-control-lg form-control"
                    component="input"
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col sm="12" md="6">
                <FormGroup>
                  <label>Pagado :</label>
                  <Field
                    name="d_fecha_pago"
                    type="date"
                    className="field form-control-lg form-control"
                    component="input"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm="12" md="6">
                <Field
                  label="Recibido por :"
                  name="n_id_persona_baja"
                  options={optionsCobradores}
                  component={SuperSelect}
                  placeholder="Elija"
                  className="field form-control-lg form-control"
                />
              </Col>
              <Col sm="12" md="6">
                <Field
                  label="Medio de pago :"
                  name="n_id_medio_pago"
                  options={optionsMediosPago}
                  component={SuperSelect}
                  placeholder="Elija"
                  className="field form-control-lg form-control"
                />
              </Col>
            </Row>
          </div>
        )}
      </div>
    );
  }
}
