import React, { Component } from 'react';

export default class Redireccionar extends Component {
  static propTypes = {

  };

  componentDidMount() {
    const { history } = this.props;
    history.push('/presupuestos/nuevo');
  }

  render() {
    return (
      <div className="presupuestos-redireccionar">
        Redireccionando
      </div>
    );
  }
}
