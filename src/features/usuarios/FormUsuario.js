import React, { Component } from 'react';
import { Field } from 'redux-form';
import { Row, Col, Container, Form, Button } from 'reactstrap';
import { InputText, SuperSelect, DragDrop } from '../esqueleto';

import PropTypes from 'prop-types';
import { InputCheckBox } from '../esqueleto';

export default class FormUsuario extends Component {
  static propTypes = {
    edicion: PropTypes.bool.isRequired,
    optionsPersonas: PropTypes.array.isRequired,
  };

  render() {
    const { miUsuario } = this.props;
    return miUsuario ? this.miUsuario() : this.usuario();
  }

  miUsuario = () => {
    const { enviarFormulario, pristine, submitting } = this.props;
    return (
      <div className="usuarios-form-usuario">
        <div className="titulo_formulario">Editar mi Usuario</div>
        <Container>
          <Form onSubmit={enviarFormulario} className="form_border">
            {this.form()}
            <Row>
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
  };

  usuario = () => {
    return (
      <div className="usuarios-form-usuario">
        <Container>{this.form()}</Container>
      </div>
    );
  };

  form = () => {
    const { optionsPersonas, edicion, miUsuario } = this.props;
    return (
      <div>
        <Field name="id" component="input" type="hidden" />
        <Row>
          <Col sm="12">
            <Field name="t_avatar" component={DragDrop} />
          </Col>
        </Row>
        {!miUsuario && (
          <Row>
            <Col sm="2" md="2" lg="3" xl="3">
              <Field name="b_activo" label="Activo" component={InputCheckBox} />
            </Col>
            <Col sm="2" md="2" lg="1" xl="1">
              <Field name="b_administrador" label="Administrador" component={InputCheckBox} />
            </Col>
          </Row>
        )}
        <Row>
          <Col sm="5">
            <Field
              name="n_id_persona"
              label="Persona"
              options={optionsPersonas}
              component={SuperSelect}
              placeholder="Elija"
              disabled={miUsuario}
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
              normalize={value => value && value.toUpperCase()}
            />
          </Col>
          <Col sm="3">
            <Field
              name="c_contrasena"
              label={edicion ? 'Nueva Contraseña' : 'Contraseña'}
              component={InputText}
              type="text"
              className="field"
              bsSize="lg"
            />
          </Col>
        </Row>
        {!miUsuario && (
          <Row>
            <Col>
              <div className="titulo_permisos">Permisos</div>
            </Col>
          </Row>
        )}
        {!miUsuario && (
          <Row>
            <Col sm="4" md="3" lg="3" xl="3">
              <Field name="b_cadastrar" label="Cadastrar" component={InputCheckBox} />
            </Col>
            <Col sm="4" md="3" lg="3" xl="3">
              <Field name="b_editar" label="Editar" component={InputCheckBox} />
            </Col>
            <Col sm="4" md="3" lg="3" xl="3">
              <Field name="b_eliminar" label="Eliminar" component={InputCheckBox} />
            </Col>
            <Col sm="4" md="3" lg="3" xl="3">
              <Field name="b_imprimir" label="Imprimir" component={InputCheckBox} />
            </Col>
          </Row>
        )}
      </div>
    );
  };
}
