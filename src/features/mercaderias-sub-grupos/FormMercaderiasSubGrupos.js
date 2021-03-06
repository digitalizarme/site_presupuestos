import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { InputText, InputCheckBox } from '../esqueleto';
import { Field } from 'redux-form';

class FormMercaderiasSubGrupos extends Component {
  render() {
    return (
      <div className="mercaderias-sub-grupos-form-mercaderias-sub-grupos">
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
              normalize={value => value && value.toUpperCase()}
            />
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <Field name="b_activo" label="Activo" component={InputCheckBox} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default FormMercaderiasSubGrupos;
