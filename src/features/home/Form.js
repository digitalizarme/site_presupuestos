import React, { Component } from 'react';
import { Jumbotron, Container, Row, Col } from 'reactstrap';

export default class Form extends Component {
  static propTypes = {

  };

  render() {
    return (
      <div className="home-form">
        <Container fluid={true}>
          <Row>
              <Col xs='12'>
                &nbsp;&nbsp;
              </Col>
          </Row>
        </Container>
        <Container fluid={true}>
          <Row>
              <Col xs='12'>
                <Jumbotron>
                    <h1 className="display-4">Bienvenido!</h1>
                    <p className="lead">El sistema Presupuesto tiene como finalidad ayudarle a organizar sus presupuestos y poder enviarlos rapidamente a sus clientes</p>
                    <hr className="my-4" />
                    <p>Deseas empezar ahora? haga click abajo para acceder al sistema.</p>
                    <a className="btn btn-primary btn-lg" href="/acceder" role="button">Acceder ahora</a>
                </Jumbotron>
              </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
