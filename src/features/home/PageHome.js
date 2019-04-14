import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { traerConfiguracion } from '../configuraciones/redux/actions';
import { Principal } from '../esqueleto';
import { Form } from './';

export class PageHome extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  componentDidMount = () => {
    const { traerConfiguracion } = this.props.actions;
    // traerConfiguracion();
  };

  render() {
    return (
      <div className="home-page-home">
        <Principal component={Form} {...this.props} titulo="Inicio" />
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
    usuario: state.acceder.usuario,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ traerConfiguracion }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageHome);
