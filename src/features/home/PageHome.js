import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Principal } from '../esqueleto';
import { Form } from './';
import swal from 'sweetalert';

export class PageHome extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
  };

  componentDidMount = () => {
    const { path } = this.props.match;
    if(path && path.indexOf('sinPermiso') !== -1)
    {
        swal({
          title: 'Ops',
          text: 'No tienes los permisos necesarios para acceder a aquella pagina',
          icon: 'error',
          button: 'OK!',
        });
    }
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
