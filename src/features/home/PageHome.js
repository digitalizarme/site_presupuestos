import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Principal } from '../esqueleto';
import { Form } from './';

export class PageHome extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
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


export default connect(
  mapStateToProps,
)(PageHome);
