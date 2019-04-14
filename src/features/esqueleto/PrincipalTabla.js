import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import { Tabla, Menu, Pie } from './';
import { ReactTitle } from 'react-meta-tags';

export class PrincipalTabla extends Component {
  static propTypes = {
    esqueleto: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
    titulo: PropTypes.string.isRequired,
  };

  render() {
    const { titulo } = this.props;

    return (
      <div className="esqueleto-principal-tabla">
        <ReactTitle title={`${titulo ? titulo : 'Principal'} | Presupuesto`} />
        <div className="margin_pie">
          <Menu />
          <div className="margin_component">
          <Tabla  {...this.props} />
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
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PrincipalTabla);
