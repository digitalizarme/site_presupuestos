import React, { Component } from 'react';
import { Button, Form, Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import {  InputNumber,SuperSelect } from '../esqueleto';
import { Field } from 'redux-form';

export default class FormCotizaciones extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
  };

  render() {
    const { enviarFormulario, submitting, pristine, optionsMonedas } = this.props;

    return (
      <div className="cotizaciones-form-cotizaciones">
        <Form onSubmit={enviarFormulario}>
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
                decimalScale={2}
                className="field form-control-lg form-control"
              />
            </Col>
          </Row>

          <Button type="submit" color="success" disabled={pristine || submitting}>
            {submitting ? 'Guardando' : 'Guardar'}
          </Button>
        </Form>
      </div>
    );
  }
}
