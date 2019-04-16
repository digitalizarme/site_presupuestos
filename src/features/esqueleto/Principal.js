import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Menu, Pie, Cargando } from './';
import { ReactTitle } from 'react-meta-tags';

export class Principal extends Component {
  static propTypes = {
    esqueleto: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const { component: Component, titulo } = this.props;
    return (
      <div className="esqueleto-principal">
        <Cargando />
        <ReactTitle title={`${titulo ? titulo : 'Principal'} | Presupuesto`} />
        <div className="margin_pie">
          <Menu />
          <div className="margin_component">
            {Component ? <Component {...this.props}  /> : 'Sin componente'}
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
)(Principal);
