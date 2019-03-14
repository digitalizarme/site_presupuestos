import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { acceder } from './redux/actions';
import { Formulario } from './';
import { Principal } from '../esqueleto';
import { setToken } from '../../common/tokenManager';
import swal from 'sweetalert';
import history from '../../common/history';

export class PageAcceder extends Component {
  static propTypes = {
    acceder: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  

  submit = values => {
    const { acceder } = this.props.actions;

    // print the form values to the console
    acceder(values)
      .then(res => {
        const { acceder } = this.props;
        setToken(acceder.usuario.token, 0);//el 2 parametro es la cantidad de dias que esta sesion sera valida. 0 = 24 hs
        history.push('/servicios-grupo');
      })
      .catch(res => {
        const { message } =
          typeof res.response !== 'undefined'
            ? res.response.data
            : 'Error al intentar acceder';
        swal({
          title: 'Ops',
          text: message ? message : 'Error al intentar acceder',
          icon: 'warning',
          button: 'OK!',
        });
      });
  };

componentWillMount(){
    document.body.style.backgroundImage = "linear-gradient(rgb(104,145,162),rgb(12,97,33))";
};

componentWillUnmount(){
    document.body.style.backgroundImage = null;
}


  render() {

    return (
      <div className="acceder-page-acceder">
        <Principal component={Formulario} onSubmit={this.submit} />
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    acceder: state.acceder,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ acceder }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageAcceder);
