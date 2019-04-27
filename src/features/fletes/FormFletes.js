import React, { Component } from 'react';
import {  Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { InputText, InputCheckBox, SuperSelect, InputNumber } from '../esqueleto';
import { Field } from 'redux-form';

class FormFletes extends Component {
  static propTypes = {
    optionsMonedas: PropTypes.array.isRequired,
  };

  render() {
    const { optionsMonedas, decimales } = this.props;

    return (
      <div className="fletes-form-fletes">
        <Row>
          <Col sm="12">
            <Field name="id" component="input" type="hidden" />
            <Field name="b_activo" label="Activo" component={InputCheckBox} />
          </Col>
        </Row>
        <Row>
          <Col sm="4">
            <Field
              name="c_tipo"
              bsSize="lg"
              className="field"
              label="Tipo"
              component={InputText}
              type="text"
            />
          </Col>
          <Col sm="4">
            <Field
              name="n_id_moneda"
              label="Moneda"
              options={optionsMonedas}
              component={SuperSelect}
              placeholder="Elija"
            />
          </Col>
          <Col sm="4">
            <Field
              name="n_valor"
              label="Valor"
              component={InputNumber}
              decimalScale={decimales}
              className="field form-control-lg form-control"
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default FormFletes;
