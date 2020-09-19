import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { InputText, InputNumber, SuperSelect, InputDate } from '../esqueleto';
import { Field } from 'redux-form';
import { Row, Col } from 'reactstrap';

export default class FormPresupuestoPagos extends Component {
  static propTypes = {
    optionsCuotas: PropTypes.array.isRequired,
    optionsCobradores: PropTypes.array.isRequired,
    optionsMediosPago: PropTypes.array.isRequired,
    onChangeCuotas: PropTypes.func.isRequired,
    onChangeDescRedondeo: PropTypes.func.isRequired,
    decimales: PropTypes.number.isRequired,
  };

  render() {
    const {
      optionsCuotas,
      onChangeCuotas,
      decimales,
      cuotaSeleccionada,
      optionsCobradores,
      optionsMediosPago,
      onChangeDescRedondeo,
      soloLectura,
    } = this.props;

    return (
      <div className="presupuestos-form-presupuesto-pagos">
        <Row>
          <Col sm="12" md="9">
            <Field
              name="persona.c_nombre"
              label="Cliente :"
              component={InputText}
              disabled
              className="field form-control-lg form-control"
            />
          </Col>
          <Col sm="12" md="3">
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
                  onChange={onChangeDescRedondeo}
                  className="field form-control-lg form-control"
                  disabled={soloLectura}
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
                <Field
                  name="d_fecha_vcto"
                  label="Vencimiento :"
                  component={InputDate}
                  className="field form-control-lg form-control"
                  disabled
                />
              </Col>
              <Col sm="12" md="6">
                <Field
                  name="d_fecha_pago"
                  label="Pagado :"
                  component={InputDate}
                  className="field form-control-lg form-control"
                  disabled={soloLectura}
                  required
                />
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
                  disabled={soloLectura}
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
                  disabled={soloLectura}
                />
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
                  disabled={soloLectura}
                />
              </Col>
            </Row>
          </div>
        )}
      </div>
    );
  }
}
