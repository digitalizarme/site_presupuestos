import React, { Component } from 'react';
import { Jumbotron, Container, Row, Col } from 'reactstrap';

const FraseDeslogado = () => (
  <div>
    <p>Deseas empezar ahora? haga click abajo para acceder al sistema.</p>
    <a className="btn btn-success btn-lg" href="/acceder" role="button">
      Acceder ahora
    </a>
  </div>
);

const FraseLogado = () => (
  <div>
    <p>Deseas empezar ahora? haga click abajo para crear un nuevo presupuesto.</p>
    <a className="btn btn-primary btn-lg" href="/presupuestos/nuevo" role="button">
      Nuevo Presupuesto
    </a>
  </div>
);

export default class Form extends Component {
  static propTypes = {};

  render() {
    const { persona } = this.props.usuario;

    return (
      <div className="home-form">
        <Container fluid={true}>
          <Row>
            <Col xs="12">&nbsp;&nbsp;</Col>
          </Row>
        </Container>
        <Container fluid={true}>
          <Row>
            <Col xs="12">
              <Jumbotron>
                <h1 className="display-4">Bienvenido!</h1>
                <p className="lead">
                  El sistema Presupuesto tiene como finalidad ayudarle a organizar sus presupuestos
                  y poder enviarlos rapidamente a sus clientes
                </p>
                {persona?<FraseLogado/>:<FraseDeslogado />}
                <hr className="my-4" />
              </Jumbotron>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
