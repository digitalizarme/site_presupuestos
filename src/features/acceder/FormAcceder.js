import React, { Component } from 'react';
import { Field } from 'redux-form';
import { Container, Button, InputGroup, InputGroupAddon, Form } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';

export default class FormAcceder extends Component {
  static propTypes = {};



  render() {
    const { enviarFormulario, submitting, pristine, acceder, onBlurEmail, email, errorEmail, onChangeEmail } = this.props;



    return (
      <div className="servicios-grupo-form">
        <div className="acceder-form-acceder">
          <Container fluid>
            <Form onSubmit={enviarFormulario}>
              <div className="card card-container">
                <img
                  alt="foto do user"
                  className="profile-img-card"
                  src={
                    acceder.avatar && email && email !== ''
                      ? acceder.avatar
                      : '//ssl.gstatic.com/accounts/ui/avatar_2x.png'
                  }
                />
                <p className="profile-name-card" />
                <InputGroup>
                  <InputGroupAddon addonType="prepend">@</InputGroupAddon>
                  <Field
                    name="email"
                    placeholder="E-mail"
                    component="input"
                    type="email"
                    autoFocus
                    className="form-control"
                    onBlur={onBlurEmail}
                    onChange={onChangeEmail}
                  />
                </InputGroup>
                <span className="text-danger">{acceder.verificadoEmail?errorEmail:null}</span>

                <br />
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <span className="input-group-text">
                      <FontAwesomeIcon icon={faKey} />
                    </span>
                  </InputGroupAddon>
                  <Field
                    name="contrasena"
                    placeholder="Contraseña"
                    component="input"
                    type="password"
                    className="form-control"
                    disabled={!acceder.existeEmail}
                  />
                </InputGroup>
                <br />
                <Button
                  type="submit"
                  color="success"
                  disabled={pristine || submitting || !acceder.existeEmail}
                >
                  {!submitting ? 'Acceder' : 'Accediendo...'}
                </Button>
              </div>
            </Form>
          </Container>
        </div>
      </div>
    );
  }
}
