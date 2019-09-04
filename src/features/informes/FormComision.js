import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { InputText, InputNumber, SuperSelect } from '../esqueleto';
import { Field } from 'redux-form';
import { Row, Col, Container, Form, Button } from 'reactstrap';

export default class FormComision extends Component {
  static propTypes = {
    enviarFormulario: PropTypes.func.isRequired,
  };

  render() {
    const { enviarFormulario, submitting, pristine, optionsMonedas } = this.props;

    return (
      <div className="informes-form-comision">
        <div className="titulo_formulario">
          <h2>Informe de Comisiones</h2>
        </div>
        <Container>
          <Form onSubmit={enviarFormulario} className="form_border">
            <Row>
              <Col sm="6" md="4" lg="4" xl="4">
                <Field
                  name="n_id_moneda"
                  label="Moneda"
                  options={optionsMonedas}
                  component={SuperSelect}
                  placeholder="Elija"
                />
              </Col>
            </Row>
            <Row className="text-right">
              <Col sm="12">
                <Button type="submit" color="success" disabled={pristine || submitting}>
                  {submitting ? 'Generando...' : 'Generar'}
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    );
  }
}
