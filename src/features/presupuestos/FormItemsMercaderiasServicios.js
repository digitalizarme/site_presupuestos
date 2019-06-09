import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { InputNumber, SuperSelect, InputCheckBox, InputText } from '../esqueleto';
import { Field } from 'redux-form';

export default class FormItemsMercaderiasServicios extends Component {
  static propTypes = {
    optionsItems: PropTypes.array.isRequired,
  };

  render() {
    const {
      optionsItems,
      onChangeItems,
      descMoneda,
      decimales,
      tipoItem,
      descMonedaItem,
      onChangeImpuesto,
      onChangeRatio,
    } = this.props;

    return (
      <div className="presupuestos-form-items-mercaderias-servicios">
        <Field name="id" component="input" type="hidden" />
        <Field name="c_tipo" component="input" type="hidden" />
        <Field name="c_monedaOrigemDestino" component="input" type="hidden" />
        <Row>
          <Col sm="12">
            <Field
              name="c_descripcion"
              label="Item"
              options={optionsItems}
              onChange={onChangeItems}
              component={SuperSelect}
              placeholder="Elija"
            />
          </Col>
        </Row>
        {descMonedaItem && (
          <Row>
            <Col sm="12" md="4" lg="4" xl="4">
              <label>Item en</label>
              <input
                type="text"
                value={descMonedaItem}
                disabled
                className="field form-control-lg form-control"
              />
            </Col>
            <Col sm="12" md="4" lg="4" xl="4">
              <label>Valores en</label>
              <input
                type="text"
                value={descMoneda}
                disabled
                className="field form-control-lg form-control"
              />
            </Col>
            <Col sm="12" md="4" lg="4" xl="4">
              <Field
                name="n_cotizacion"
                label="Cotizacion"
                component={InputNumber}
                decimalScale={6}
                className="field form-control-lg form-control"
              />
            </Col>
          </Row>
        )}
        {tipoItem && (
          <Row>
            <Col sm="12" md="6" lg="2">
              <Field
                name="n_cantidad"
                label="Cantidad"
                component={InputNumber}
                decimalScale={2}
                onBlur={valor => {
                  onChangeImpuesto({
                    n_cantidad: this.props.n_cantidad,
                    n_unitario: this.props.n_unitario,
                    n_exentas: this.props.n_exentas,
                    n_gravadas_5: this.props.n_gravadas_5,
                    n_gravadas_10: this.props.n_gravadas_10,
                  });
                }}
                className="field form-control-lg form-control"
              />
            </Col>
            <Col sm="12" md="6" lg="4">
              <Field
                name="n_unitario"
                label="Unitario"
                component={InputNumber}
                decimalScale={decimales}
                className="field form-control-lg form-control"
                onBlur={valor => {
                  onChangeImpuesto({
                    n_cantidad: this.props.n_cantidad,
                    n_unitario: this.props.n_unitario,
                    n_exentas: this.props.n_exentas,
                    n_gravadas_5: this.props.n_gravadas_5,
                    n_gravadas_10: this.props.n_gravadas_10,
                  });
                }}
              />
            </Col>
            <Col sm="12" md="6" lg="2">
              <Field
                name="n_exentas"
                label="Exentas"
                component={InputNumber}
                decimalScale={decimales}
                className="field form-control-lg form-control"
                onBlur={valor => {
                  onChangeRatio({
                    n_cantidad: this.props.n_cantidad,
                    n_unitario: this.props.n_unitario,
                    n_exentas: this.props.n_exentas,
                    n_gravadas_5: this.props.n_gravadas_5,
                    n_gravadas_10: this.props.n_gravadas_10,
                  });
                }}


              />
            </Col>
            <Col sm="12" md="6" lg="2">
              <Field
                name="n_gravadas_5"
                label="IVA 5%"
                component={InputNumber}
                decimalScale={decimales}
                className="field form-control-lg form-control"
                onBlur={valor => {
                  onChangeRatio({
                    n_cantidad: this.props.n_cantidad,
                    n_unitario: this.props.n_unitario,
                    n_exentas: this.props.n_exentas,
                    n_gravadas_5: this.props.n_gravadas_5,
                    n_gravadas_10: this.props.n_gravadas_10,
                  });
                }}
              />
            </Col>
            <Col sm="12" md="6" lg="2">
              <Field
                name="n_gravadas_10"
                label="IVA 10%"
                component={InputNumber}
                decimalScale={decimales}
                className="field form-control-lg form-control"
                onBlur={valor => {
                  onChangeRatio({
                    n_cantidad: this.props.n_cantidad,
                    n_unitario: this.props.n_unitario,
                    n_exentas: this.props.n_exentas,
                    n_gravadas_5: this.props.n_gravadas_5,
                    n_gravadas_10: this.props.n_gravadas_10,
                  });
                }}
              />
            </Col>
          </Row>
        )}
        {tipoItem === 'M' && (
          <Row>
            <Col sm="12" md="4" lg="4">
              <Field
                name="n_peso"
                label="Peso"
                component={InputNumber}
                decimalScale={2}
                className="field form-control-lg form-control"
              />
            </Col>
            <Col sm="12" md="4" lg="4">
              <Field
                name="n_flete"
                label="Flete"
                component={InputNumber}
                decimalScale={decimales}
                className="field form-control-lg form-control"
              />
            </Col>
            <Col sm="3" md="4" lg="4" xl="4">
              <Field name="b_seguro" label="Seguro" component={InputCheckBox} />
            </Col>
          </Row>
        )}
        {tipoItem && (
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
        )}
      </div>
    );
  }
}
