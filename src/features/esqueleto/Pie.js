import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class Pie extends Component {
  static propTypes = {
    esqueleto: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="esqueleto-pie">
        <footer className="footer">
          <div className="container">
            <div className="form-row">
                <div className="form-group col-6 text-left">
                  <span><a className="text-danger" href="http://digitalizar.me" target="_new"><span className="d-none d-sm-inline">Powered by</span> Digitalizar.me</a></span>
                </div>
                <div className="form-group col-6 text-right">
                  <a href="/Configuraciones">
                      <span className="text-info">c_nombre_fantasia</span>
                      <span className="text-success d-none d-md-inline">c_slogan</span>
                  </a>
                </div>
            </div>
          </div>
        </footer>
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
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pie);
