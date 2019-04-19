import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { acceder, verificaEmail, limpiarAvatar } from './redux/actions';
import { FormAcceder } from './';
import { Principal } from '../esqueleto';
import { toggleCargando } from '../esqueleto/redux/actions';
import { setToken } from '../../common/tokenManager';
import swal from 'sweetalert';
import history from '../../common/history';
import { reduxForm, formValueSelector } from 'redux-form';

// Decorate with connect to read form values
const selector = formValueSelector('formAcceder'); // <-- same as form name

export class PageAcceder extends Component {
  static propTypes = {
    acceder: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  submit = values => {
    const { acceder, toggleCargando } = this.props.actions;
    toggleCargando();
    acceder(values)
      .then(res => {
        toggleCargando();
        const { acceder } = this.props;
        setToken(acceder.usuario.token, 0); //el 2 parametro es la cantidad de dias que esta sesion sera valida. 0 = 24 hs
        history.push('/');
      })
      .catch(res => {
        toggleCargando();
        const { message } =
          typeof res.response !== 'undefined' ? res.response.data : 'Error al intentar acceder';
        swal({
          title: 'Ops',
          text: message ? message : 'Error al intentar acceder',
          icon: 'warning',
          button: 'OK!',
        });
      });
  };

  onChangeEmail = (event, email, oldEmail) => {
    const { limpiarAvatar } = this.props.actions;
    limpiarAvatar();
  }

  onBlurEmail = (event, email) => {
    const { verificaEmail,toggleCargando } = this.props.actions;
    toggleCargando();
    verificaEmail(email)
      .then(res => {
        toggleCargando();
        if (res.data.res) {
          document.getElementsByName('contrasena')[0].focus();
        } else {
          document.getElementsByName('email')[0].focus();
        }
        return res;
      })
      .catch(err => {
        toggleCargando();
        swal({
          title: 'Ops',
          text: 'Error al verificar este email',
          icon: 'error',
          button: 'OK!',
        });
      });
  };

  componentWillMount() {
    document.body.style.backgroundImage = 'linear-gradient(rgb(104,145,162),rgb(12,97,33))';
  }

  componentWillUnmount() {
    document.body.style.backgroundImage = null;
  }

  componentDidMount = () => {
    const {  limpiarAvatar } = this.props.actions;
    limpiarAvatar();
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="acceder-page-acceder">
        <Principal
          titulo="Acceder"
          component={FormAcceder}
          enviarFormulario={handleSubmit(this.submit)}
          {...this.props}
          onBlurEmail={this.onBlurEmail}
          onChangeEmail={this.onChangeEmail}
        />
      </div>
    );
  }
}

PageAcceder = reduxForm({
  // a unique name for the form
  form: 'formAcceder',
})(PageAcceder);

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    acceder: state.acceder,
    email: selector(state, 'email'),
    errorEmail:
      state.acceder.existeEmail || !selector(state, 'email') || selector(state, 'email') === ''
        ? ''
        : state.acceder.msg,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      { acceder, verificaEmail, limpiarAvatar, toggleCargando },
      dispatch,
    ),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageAcceder);
