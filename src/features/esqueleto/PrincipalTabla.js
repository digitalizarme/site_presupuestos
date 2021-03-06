import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Tabla, Menu, Pie, Cargando } from './';
import { ReactTitle } from 'react-meta-tags';

export class PrincipalTabla extends Component {
  static propTypes = {
    esqueleto: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    titulo: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    this.toggleCargado = this.toggleCargado.bind(this);

    this.state = {
      cargado: false,
    };
  }

  toggleCargado() {
    this.setState(state => ({ cargado: !state.cargado }));
  }

  componentDidMount = () => {
    const { reiniciaTablaParams } = this.props.actions;
    reiniciaTablaParams();
    setTimeout(() => {
      this.toggleCargado();
    }, 50);
  };

  render() {
    const { titulo } = this.props;
    const { toggleCargando } = this.props.actions;
    return (
      <div className="esqueleto-principal-tabla">
        <Cargando />
        <ReactTitle title={`${titulo ? titulo : 'Principal'} | Presupuesto`} />
        <div className="margin_pie">
          <Menu {...this.props} />
          <div className="margin_component">
            {this.state.cargado ? (
              <Tabla {...this.props} toggleCargando={toggleCargando} />
            ) : (
              ''
            )}
          </div>
          <Pie />
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    esqueleto: state.esqueleto,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PrincipalTabla);
