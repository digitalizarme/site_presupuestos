import React, { Component } from 'react';
import { InputText,InputCheckBox } from '../esqueleto';
import { Field } from 'redux-form';

class FormServGrupo extends Component {

  render() {

    return (
      <div className="servicios-grupos-form-serv-grupo">
        <Field name="id" component="input" type="hidden" />
        <Field
          name="c_descripcion"
          bsSize="lg"
          className="field"
          label="Descripción"
          component={InputText}
          type="text"
        />
        <Field name="b_activo" label="Activo" component={InputCheckBox} />
      </div>
    );
  }
}

export default FormServGrupo;
