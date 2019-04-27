import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import {  InputNumber,SuperSelect } from '../esqueleto';
import { Field } from 'redux-form';

export default class FormCotizaciones extends Component {
  static propTypes = {
    optionsMonedas: PropTypes.array.isRequired,
  };

  render() {
    const { optionsMonedas } = this.props;

    return (
      <div className="cotizaciones-form-cotizaciones">
        <Row>
          <Col sm="6">
            <Field name="id" component="input" type="hidden" />
            <Field
              name="c_monedaOrigem"
              label="Origem"
              options={optionsMonedas}
              component={SuperSelect}
              placeholder="Elija"
            />
          </Col>
          <Col sm="6">
            <Field
              name="c_monedaDestino"
              label="Destino"
              options={optionsMonedas}
              component={SuperSelect}
              placeholder="Elija"
            />
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <Field
              name="n_valor"
              label="Cotizacion"
              component={InputNumber}
              decimalScale={10}
              className="field form-control-lg form-control"
            />
          </Col>
        </Row>
      </div>
    );
  }
}
