import React, { Component } from 'react';
import { Field } from 'redux-form';
import { Button, Row, Col, Container, Form } from 'reactstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { InputCheckBox, InputNumber,InputText } from '../esqueleto';

class FormPersonas extends Component {
  static propTypes = {
    enviarFormulario: PropTypes.func.isRequired,
    edicion: PropTypes.bool.isRequired,
  };

  render() {
    const { enviarFormulario, submitting, pristine, edicion, b_comisionista } = this.props;
    return (
      <div>
        <div className="titulo_formulario">{edicion ? 'Editar' : 'Cadastrar'} Persona</div>
        <Container>
          <Form onSubmit={enviarFormulario} className="form_border">
            <Field name="id" component="input" type="hidden" />
            <Row>
              <Col sm="3">
                <Field
                  name="c_identificacion"
                  label="Identificación"
                  component={InputText}
                  type="text"
                  className="field"
                  bsSize="lg"
                />
              </Col>
              <Col sm="7">
                <Field
                  name="c_nombre"
                  label="Nombre"
                  component={InputText}
                  type="text"
                  className="field"
                  bsSize="lg"
                />
              </Col>
              <Col sm="2" md="2" lg="1" xl="1">
                <Field name="b_activo" label="Activo" component={InputCheckBox} />
              </Col>
            </Row>
            <Row>
              <Col sm="6" lg="3" xl="3">
                <Field
                  name="c_cel1"
                  label="Celular 1"
                  component={InputText}
                  type="text"
                  className="field"
                  bsSize="lg"
                />
              </Col>
              <Col sm="6" lg="3" xl="3">
                <Field
                  name="c_cel2"
                  label="Celular 2"
                  component={InputText}
                  type="text"
                  className="field"
                  bsSize="lg"
                />
              </Col>
              <Col sm="6" lg="3" xl="3">
                <Field
                  name="c_tel1"
                  component={InputText}
                  label="Telefono 1"
                  type="text"
                  className="field"
                  bsSize="lg"
                />
              </Col>
              <Col sm="6" lg="3" xl="3">
                <Field
                  name="c_tel2"
                  component={InputText}
                  label="Telefono 2"
                  type="text"
                  className="field"
                  bsSize="lg"
                />
              </Col>
            </Row>
            <Row>
              <Col sm="6" md="6" xl="2">
                <Field
                  name="c_contacto"
                  component={InputText}
                  type="text"
                  className="field"
                  label="Contacto"
                  bsSize="lg"
                />
              </Col>
              <Col sm="6" md="6" xl="4">
                <Field
                  name="c_email"
                  component={InputText}
                  label="Email"
                  type="email"
                  className="field"
                  bsSize="lg"
                />
              </Col>
              <Col md="12" xl="6">
                <Field
                  name="c_direccion"
                  label="Dirección"
                  component={InputText}
                  type="text"
                  className="field"
                  bsSize="lg"
                />
              </Col>
            </Row>
            <Row className="alturaChk">
              <Col sm="3" md="2" lg="3" xl="3">
                <Field name="b_comisionista" label="Comisionista" component={InputCheckBox} />
              </Col>
              {b_comisionista ? (
                <Col sm="2" md="3" lg="2" xl="2">
                  <Field
                    name="n_valor_porcentaje_comision"
                    label="% Comisión"
                    component={InputNumber}
                    decimalScale={2}
                    className="field form-control-lg form-control"
                  />
                </Col>
              ) : null}
              <Col sm="2" md="2" lg="2" xl="2">
                <Field name="b_cliente" activado label="Cliente" component={InputCheckBox} />
              </Col>
              <Col sm="3" md="2" lg="3" xl="3">
                <Field name="b_funcionario" label="Funcionario" component={InputCheckBox} />
              </Col>
              <Col sm="2" md="2" lg="2" xl="2">
                <Field name="b_usuario" label="Usuario" component={InputCheckBox} />
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
            <Button type="submit" color="success" disabled={pristine || submitting}>
              {submitting ? 'Guardando' : 'Guardar'}
            </Button>{' '}
            <Link to="/personas" className="btn btn-primary">
              Cancelar
            </Link>
          </Form>
        </Container>
      </div>
    );
  }
}

export default FormPersonas;
