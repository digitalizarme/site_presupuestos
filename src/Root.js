/* This is the Root component mainly initializes Redux and React Router. */

import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import swal from 'sweetalert';

function datosAcceder() {
  const root = JSON.parse(localStorage.getItem('persist:root'));
  const acceder = root ? root.acceder : '{}';
  return JSON.parse(acceder);
}

function estoyLogado() {
  const acceder = datosAcceder();
  const res = acceder.usuario && acceder.usuario.c_usuario ? true : false;
  //console.log(res, 'estoy logueado');
  return res;
}

function soyAdmin() {
  const acceder = datosAcceder();
  const res = estoyLogado() ? acceder.usuario.b_administrador : false;
  //console.log(res, 'soyAdmin');
  return res;
}

function redireciona(props, history) {
  swal({
    title: 'Ops',
    text: !estoyLogado()
      ? 'Debes iniciar sesion antes acceder a ciertas paginas'
      : 'No tienes los permisos necesarios para acceder a aquella pagina',
    icon: 'error',
    button: 'OK!',
  });
  setTimeout(() => {
    return history.push(!estoyLogado() ? '/acceder' : '/');
  }, 100);
}

function renderRouteConfigV3(routes, contextPath, store, history) {
  // Resolve route config object in React Router v3.
  const children = []; // children component list
  const renderRoute = (item, routeContextPath) => {
    let newContextPath, protegido, soloAdmin;
    protegido = false;
    soloAdmin = false;

    if (typeof item.protegido === 'boolean') {
      protegido = item.protegido;
    }

    if (typeof item.admin === 'boolean') {
      soloAdmin = item.admin;
    }

    if (/^\//.test(item.path)) {
      newContextPath = item.path;
    } else {
      newContextPath = `${routeContextPath}/${item.path}`;
    }
    newContextPath = newContextPath.replace(/\/+/g, '/');

    if (item.component && item.childRoutes) {
      const childRoutes = renderRouteConfigV3(item.childRoutes, newContextPath, store, history);
      const Component = item.component;

      children.push(
        <Route
          key={newContextPath}
          render={props =>
            (estoyLogado() || !protegido) && ((soloAdmin && soyAdmin()) || !soloAdmin) ? (
              <Component {...props}>{childRoutes}</Component>
            ) : (
              redireciona(props, history)
            )
          }
          path={newContextPath}
        />,
      );
    } else if (item.component) {
      const Component = item.component;
      children.push(
        <Route
          key={newContextPath}
          render={props =>
            (estoyLogado() || !protegido) && ((soloAdmin && soyAdmin()) || !soloAdmin) ? (
              <Component {...props} />
            ) : (
              redireciona(props, history)
            )
          }
          path={newContextPath}
          exact
        />,
      );
    } else if (item.childRoutes) {
      item.childRoutes.forEach(r => renderRoute(r, newContextPath));
    }
  };

  routes.forEach(item => renderRoute(item, contextPath));
  // Use Switch so that only the first matched route is rendered.
  return <Switch>{children}</Switch>;
}

export default class Root extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    routeConfig: PropTypes.array.isRequired,
  };
  render() {
    if (this.props.history) {
      const routes = renderRouteConfigV3(
        this.props.routeConfig,
        '/',
        this.props.store,
        this.props.history,
      );
      return (
        <Provider store={this.props.store}>
          <ConnectedRouter history={this.props.history}>{routes}</ConnectedRouter>
        </Provider>
      );
    }
  }
}
