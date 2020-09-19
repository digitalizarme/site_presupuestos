import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { InputText, SuperSelect,InputDate } from '../esqueleto';
import { Field } from 'redux-form';
import { Row, Col, Container, Form, Button } from 'reactstrap';

export default class FormComision extends Component {
  static propTypes = {
    enviarFormulario: PropTypes.func.isRequired,
  };

  render() {
    const {
      enviarFormulario,
      submitting,
      optionsMonedas,
      optionsComisionista,
      optionsClientes,
    } = this.props;

    return (
      <div className="informes-form-comision">
        <div className="titulo_formulario">
          <h2>Informe de Comisiones</h2>
        </div>
        <Container>
          <Form onSubmit={enviarFormulario} className="form_border">
            <Row>
              <Col lg="6" xs="12">
                <Field
                  name="n_id_moneda"
                  label="Moneda"
                  options={optionsMonedas}
                  component={SuperSelect}
                  placeholder="Elija"
                />
              </Col>
              <Col lg="6" xs="12">
                <Field
                  name="n_id_persona_comisionista"
                  label="Comicionista"
                  options={optionsComisionista}
                  component={SuperSelect}
                  placeholder="Escolha"
                />
              </Col>
            </Row>
            <Row>
              <Col lg="6" xs="12">
                <Field
                  label="Data Inicial"
                  name={'d_fecha_ini'}
                  className="field form-control-lg form-control"
                  component={InputDate}
                />
              </Col>
              <Col lg="6" xs="12">
                <Field
                  label="Data Final"
                  name={'d_fecha_fin'}
                  className="field form-control-lg form-control"
                  component={InputDate}
                />
              </Col>
            </Row>
            <Row>
              <Col lg="6" xs="12">
                <Field
                  name="n_id_persona"
                  label="Cliente"
                  options={optionsClientes}
                  component={SuperSelect}
                  placeholder="Escolha"
                />
              </Col>
              <Col lg="6" xs="12">
                <Field
                  name="t_observacion"
                  bsSize="lg"
                  className="field"
                  label="Observacion"
                  component={InputText}
                  type="text"
                />
              </Col>
            </Row>
            <Row className="text-right">
              <Col sm="12">
                <Button type="submit" color="success" disabled={submitting}>
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
