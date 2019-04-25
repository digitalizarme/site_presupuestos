import React, { Component } from 'react';
import { Button, Form } from 'reactstrap';
import PropTypes from 'prop-types';
import { InputText } from '../esqueleto';
import { Field } from 'redux-form';

class FormServGrupo extends Component {
  static propTypes = {
    enviarFormulario: PropTypes.func.isRequired,
  };

  render() {
    const { enviarFormulario, submitting, pristine } = this.props;

    return (
      <div className="servicios-grupos-form-serv-grupo">
        <Form onSubmit={enviarFormulario}  >
          <Field name="id" component="input" type="hidden" />
          <Field
            name="c_descripcion"
            bsSize="lg"
            className="field"
            label="Descripción"
            component={InputText}
            type="text"
          />
          <Button type="submit" color="success" disabled={pristine || submitting}>
            {submitting ? 'Guardando' : 'Guardar'}
          </Button>
        </Form>
      </div>
    );
  }
}

export default FormServGrupo;
