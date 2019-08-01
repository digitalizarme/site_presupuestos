import React, { Component } from 'react';
import { Button, Form, Container, Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { InputText, InputCheckBox, InputNumber, DragDrop } from '../esqueleto';
import { Field } from 'redux-form';

export default class FormConfiguraciones extends Component {
  static propTypes = {
    enviarFormulario: PropTypes.func.isRequired,
  };

  render() {
    const { enviarFormulario, submitting, pristine, b_comision } = this.props;

    return (
      <div className="configuraciones-form-configuraciones">
        <div className="titulo_formulario">Editar Configuraciones</div>
        <Container>
          <Form onSubmit={enviarFormulario} className="form_border">
            <Row>
              <Col sm="12">
                <Field name="t_logo" component={DragDrop} />
              </Col>
            </Row>
            <Row>
              <Col sm="2">
                <Field name="id" component="input" type="hidden" />
                <Field
                  name="c_ruc"
                  bsSize="lg"
                  className="field"
                  label="RUC"
                  component={InputText}
                  type="text"
                />
              </Col>

              <Col sm="5">
                <Field
                  name="c_razon_social"
                  bsSize="lg"
                  className="field"
                  label="Razón Social"
                  component={InputText}
                  type="text"
                  normalize={value => value && value.toUpperCase()}
                />
              </Col>
              <Col sm="5">
                <Field
                  name="c_nombre_fantasia"
                  bsSize="lg"
                  className="field"
                  label="Nombre Fantasia"
                  component={InputText}
                  type="text"
                  normalize={value => value && value.toUpperCase()}
                />
              </Col>
            </Row>
            <Row>
              <Col sm="5">
                <Field
                  name="c_email"
                  bsSize="lg"
                  className="field"
                  label="E-mail"
                  component={InputText}
                  type="email"
                  normalize={value => value && value.toLowerCase()}
                />
              </Col>
              <Col sm="3">
                <Field
                  name="c_tel"
                  bsSize="lg"
                  className="field"
                  label="Telefono"
                  component={InputText}
                  type="text"
                />
              </Col>
              <Col sm="4">
                <Field
                  name="c_slogan"
                  bsSize="lg"
                  className="field"
                  label="Slogan"
                  component={InputText}
                  type="text"
                  normalize={value => value && value.toUpperCase()}
                />
              </Col>
            </Row>
            <Row>
              <Col sm="10">
                <Field
                  name="c_direccion"
                  bsSize="lg"
                  className="field"
                  label="Dirección"
                  component={InputText}
                  type="text"
                  normalize={value => value && value.toUpperCase()}
                />
              </Col>
              <Col sm="2" md="2" lg="1" xl="1">
                <Field name="b_flete" label="Flete" component={InputCheckBox} />
              </Col>
            </Row>
            <Row>
              <Col sm="3" md="3" lg="2" xl="2">
                <Field name="b_comision" label="Comisión" component={InputCheckBox} />
              </Col>
              {b_comision ? (
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
              <Col sm="2" md="2" lg="1" xl="1">
                <Field name="b_seguro" label="Seguro" component={InputCheckBox} />
              </Col>
            </Row>
            <Row>
              <Col sm="12">
                <Field
                  name="t_obs_presup_1"
                  styleDiv={{ width: '100%' }}
                  label="Observación 1"
                  component={InputText}
                  type="textarea"
                  className="field"
                  normalize={value => value && value.toUpperCase()}
                />
              </Col>
            </Row>
            <Row>
              <Col sm="12">
                <Field
                  name="t_obs_presup_2"
                  styleDiv={{ width: '100%' }}
                  label="Observación 2"
                  component={InputText}
                  type="textarea"
                  className="field"
                  normalize={value => value && value.toUpperCase()}
                />
              </Col>
            </Row>
            <Row className="text-right">
              <Col sm="12">
                <Button type="submit" color="success" disabled={pristine || submitting}>
                  {submitting ? 'Guardando' : 'Guardar'}
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    );
  }
}
