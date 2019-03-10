import React, { Component } from 'react';
import { Field } from 'redux-form';
import { Button, Form } from 'reactstrap';
import PropTypes from 'prop-types';
import { InputText } from '../esqueleto';

class FormServGrupo extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
  };

  render() {
    const { enviarFormulario, submitting, pristine } = this.props;

    return (
      <div className="servicios-grupo-form-serv-grupo">
        <Form onSubmit={enviarFormulario}  >
          <Field name="id" component="input" type="hidden" />
          <Field
            name="c_descripcion"
            bsSize="lg"
            className="field"
            Label="Descripción"
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
