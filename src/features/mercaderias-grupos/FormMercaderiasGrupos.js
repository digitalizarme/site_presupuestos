import React, { Component } from 'react';
import {  Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { InputText, InputCheckBox, SuperSelect } from '../esqueleto';
import { Field } from 'redux-form';

class FormMercaderiasGrupos extends Component {
  static propTypes = {
    optionsFletes: PropTypes.array.isRequired,
  };

  render() {
    const { optionsFletes } = this.props;

    return (
      <div className="mercaderias-grupos-form-mercaderias-grupos">
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
          <Col sm="6">
            <Field
              name="n_id_flete"
              label="Flete"
              options={optionsFletes}
              component={SuperSelect}
              placeholder="Elija"
            />
          </Col>
          <Col sm="6">
            <Field name="b_activo" label="Activo" component={InputCheckBox} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default FormMercaderiasGrupos;
