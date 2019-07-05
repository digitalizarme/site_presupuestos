import React, { Component } from 'react';
import { Button, Form, Row, Col, Container } from 'reactstrap';
import { Link } from '../esqueleto';
import PropTypes from 'prop-types';
import { InputText, InputCheckBox, InputNumber, SuperSelect } from '../esqueleto';
import { Field } from 'redux-form';

class FormMercaderias extends Component {
  static propTypes = {
    enviarFormulario: PropTypes.func.isRequired,
  };

  render() {
    const {
      enviarFormulario,
      submitting,
      pristine,
      edicion,
      optionsMonedas,
      optionsIVA,
      optionsUnidad,
      optionsMarcas,
      optionsGrupos,
      optionsSubGrupos,
      decimales,
    } = this.props;
    return (
      <div>
        <div className="titulo_formulario">{edicion ? 'Editar' : 'Cadastrar'} Mercaderia</div>
        <Container>
          <Form onSubmit={enviarFormulario} className="form_border">
            <Field name="id" component="input" type="hidden" />
            <Row>
              <Col sm="9" md="10" lg="9" xl="9">
                <Field
                  name="c_descripcion"
                  bsSize="lg"
                  className="field"
                  label="Descripción"
                  component={InputText}
                  type="text"
                  normalize={value => value && value.toUpperCase()}
                />
              </Col>
              <Col sm="3" md="2" lg="3" xl="3">
                <Field name="b_activo" label="Activo" component={InputCheckBox} />
              </Col>
            </Row>
            <Row>
              <Col sm="2" md="3" lg="3" xl="3">
                <Field
                  name="c_codigo"
                  label="Codigo"
                  component={InputText}
                  bsSize="lg"
                  className="field"
                  type="text"
                  normalize={value => value && value.toUpperCase()}
                />
              </Col>
              <Col sm="2" md="3" lg="3" xl="3">
                <Field
                  name="n_id_moneda"
                  label="Moneda"
                  options={optionsMonedas}
                  component={SuperSelect}
                  placeholder="Elija"
                />
              </Col>
              <Col sm="2" md="3" lg="3" xl="3">
                <Field
                  name="n_costo"
                  label="Costo"
                  component={InputNumber}
                  decimalScale={decimales}
                  className="field form-control-lg form-control"
                />
              </Col>
              <Col sm="2" md="3" lg="3" xl="3">
                <Field
                  name="n_venta"
                  label="Venta"
                  component={InputNumber}
                  decimalScale={decimales}
                  className="field form-control-lg form-control"
                />
              </Col>
            </Row>
            <Row>
              <Col sm="2" md="3" lg="4" xl="4">
                <Field
                  name="n_iva"
                  label="IVA"
                  options={optionsIVA}
                  component={SuperSelect}
                  placeholder="Elija"
                />
              </Col>
              <Col sm="6" md="6" lg="4" xl="4">
                <Field
                  name="c_unidad"
                  label="Unidad"
                  options={optionsUnidad}
                  component={SuperSelect}
                  placeholder="Elija"
                />
              </Col>
              <Col sm="2" md="3" lg="4" xl="4">
                <Field
                  name="n_peso"
                  label="Peso"
                  component={InputNumber}
                  decimalScale={2}
                  className="field form-control-lg form-control"
                />
              </Col>
            </Row>
            <Row>
              <Col sm="6" md="6" lg="4" xl="4">
                <Field
                  name="n_id_marca"
                  label="Marca"
                  options={optionsMarcas}
                  component={SuperSelect}
                  placeholder="Elija"
                  permiteCrear={true}
                />
              </Col>
              <Col sm="6" md="6" lg="4" xl="4">
                <Field
                  name="n_id_grupo"
                  label="Grupo"
                  options={optionsGrupos}
                  component={SuperSelect}
                  placeholder="Elija"
                />
              </Col>
              <Col sm="6" md="6" lg="4" xl="4">
                <Field
                  name="n_id_subgrupo"
                  label="Sub-Grupo"
                  options={optionsSubGrupos}
                  component={SuperSelect}
                  placeholder="Elija"
                  permiteCrear={true}
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
                />
              </Col>
            </Row>
            <Row>
              <Col sm="12">
                <Button type="submit" color="success" disabled={pristine || submitting}>
                  {submitting ? 'Guardando' : 'Guardar'}
                </Button>{' '}
                <Link to="/mercaderias" className="btn btn-primary" history={this.props.history}>
                  Cancelar
                </Link>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    );
  }
}

export default FormMercaderias;
