import React, { Component } from 'react';
import {  Row, Col } from 'reactstrap';
import { InputText, InputCheckBox } from '../esqueleto';
import { Field } from 'redux-form';

class FormMercaderiasMarcas extends Component {

  render() {

    return (
      <div className="mercaderias-marcas-form-mercaderias-marcas">
        <Row>
          <Col sm="12">
            <Field name="id" component="input" type="hidden" />
            <Field
              name="c_descripcion"
              bsSize="lg"
              className="field"
              label="Descripción"
              component={InputText}
              type="text"
            />
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <Field name="b_activo" label="Activo"  component={InputCheckBox} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default FormMercaderiasMarcas;
