import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InputText, InputNumber, SuperSelect } from '../esqueleto';
import { Field } from 'redux-form';
import { Row, Col } from 'reactstrap';

export default class FormPresupuestoPagos extends Component {
  static propTypes = {};

  render() {
    const {
      optionsCuotas,
      onChangeCuotas,
      decimales,
      cuotaSeleccionada,
      optionsPersonas,
      optionsMedioPago,
    } = this.props;
    // console.log(cuotaSeleccionada);
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
                <label>Vencimiento :</label>
                <Field
                  name="d_fecha_vcto"
                  type="date"
                  className="field form-control-lg form-control"
                  component="input"
                  disabled
                />
              </Col>
              <Col sm="12" md="6">
                <label>Pagado :</label>
                <Field
                  name="d_fecha_pago"
                  type="date"
                  className="field form-control-lg form-control"
                  component="input"
                />
              </Col>
            </Row>
            <Row>
              <Col sm="12" md="6">
                <label>Recibido por :</label>
                <Field
                  options={optionsPersonas}
                  component={SuperSelect}
                  placeholder="Elija"
                  className="field form-control-lg form-control"
                />
              </Col>
              <Col sm="12" md="6">
                <label>Medio de pago :</label>
                <Field
                  options={optionsMedioPago}
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
