import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toggleCargando } from './redux/actions';
import { ClipLoader } from 'react-spinners';

const ComponentCargando = ({ cargando }) => {
  const cssCargando = {
    marginLeft: '-75px',
    marginTop: '-75px',
    position: 'absolute',
    left: '50%',
    top: '50%',
  };

  return (
    <div className="esqueleto-cargando" style={{ display: cargando ? 'block' : 'none' }}>
      <ClipLoader
        css={cssCargando}
        sizeUnit={'px'}
        size={150}
        color={'#123abc'}
        loading={cargando}
      />
    </div>
  );
};

export class Cargando extends Component {
  static propTypes = {};

  render() {
    return <ComponentCargando cargando={this.props.cargando} />;
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    cargando: state.esqueleto.cargando,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ toggleCargando }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cargando);
