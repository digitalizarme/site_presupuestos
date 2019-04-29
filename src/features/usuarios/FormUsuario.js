import React, { Component } from 'react';
import { Field } from 'redux-form';
import { Row, Col, Container } from 'reactstrap';
import { InputText,SuperSelect,DragDrop } from '../esqueleto';

import PropTypes from 'prop-types';
import { InputCheckBox } from '../esqueleto';

export default class FormUsuario extends Component {
  static propTypes = {
    edicion: PropTypes.bool.isRequired,
    optionsPersonas:PropTypes.array.isRequired,
  };

  render() {
    const { optionsPersonas,edicion } = this.props;
    return (
      <div className="usuarios-form-usuario">
        <Container>
          <Field name="id" component="input" type="hidden" />
          <Row>
            <Col sm="12">
              <Field
                name="t_avatar"
                component={DragDrop}
              />
            </Col>
          </Row>
          <Row>
            <Col sm="2" md="2" lg="3" xl="3">
              <Field name="b_activo" label="Activo" activado component={InputCheckBox} />
            </Col>
            <Col sm="2" md="2" lg="1" xl="1">
              <Field name="b_administrador" label="Administrador" component={InputCheckBox} />
            </Col>
          </Row>
          <Row>
            <Col sm="5">
              <Field
                name="n_id_persona"
                label="Persona"
                options={optionsPersonas}
                component={SuperSelect}
                placeholder="Elija"
              />
            </Col>
            <Col sm="4">
              <Field
                name="c_usuario"
                label="Usuario"
                component={InputText}
                type="text"
                className="field"
                bsSize="lg"
              />
            </Col>
            <Col sm="3">
              <Field
                name="c_contrasena"
                label={edicion?"Nueva Contraseña":"Contraseña"}
                component={InputText}
                type="text"
                className="field"
                bsSize="lg"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="titulo_permisos">Permisos</div>
            </Col>
          </Row>
          <Row>
            <Col sm="4" md="3" lg="3" xl="3">
              <Field name="b_cadastrar" activado label="Cadastrar" component={InputCheckBox} />
            </Col>
            <Col sm="4" md="3" lg="3" xl="3">
              <Field name="b_editar" activado label="Editar" component={InputCheckBox} />
            </Col>
            <Col sm="4" md="3" lg="3" xl="3">
              <Field name="b_eliminar" activado label="Eliminar" component={InputCheckBox} />
            </Col>
            <Col sm="4" md="3" lg="3" xl="3">
              <Field name="b_imprimir" activado label="Imprimir" component={InputCheckBox} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
