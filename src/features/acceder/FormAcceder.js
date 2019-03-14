import React , { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Container, Button, InputGroup, InputGroupAddon } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';

class FormAcceder extends Component {
  static propTypes = {};

  render() {
      const { handleSubmit,submitting, pristine, } = this.props;

    return (
      <div className="servicios-grupo-form">
    <div className="acceder-form-acceder">
      <Container fluid>
        <form onSubmit={handleSubmit}>
          <div className="card card-container">
            <img
              alt="foto do user"
              className="profile-img-card"
              src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            />
            <p className="profile-name-card" />
            <InputGroup>
              <InputGroupAddon addonType="prepend">@</InputGroupAddon>
              <Field
                name="email"
                placeholder="E-mail"
                component="input"
                type="email"
                className="form-control"
              />
            </InputGroup>
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
              />
            </InputGroup>
            <br />
            <Button type="submit" color="success" disabled={pristine || submitting}>
              {!submitting ? 'Acceder' : 'Accediendo...'}
            </Button>
          </div>
        </form>
      </Container>
    </div>
      </div>
    );
  }
}
FormAcceder = reduxForm({
  // a unique name for the form
  form: 'formlogin',
})(FormAcceder);

export default FormAcceder;


