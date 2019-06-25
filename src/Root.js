/* This is the Root component mainly initializes Redux and React Router. */

import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import history from './common/history';
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

function redireciona(props) {
  swal({
    title: 'Ops',
    text: !estoyLogado()
      ? 'Debes iniciar sesion antes acceder a ciertas paginas'
      : 'No tienes los permisos necesarios para acceder a aquella pagina',
    icon: 'error',
    button: 'OK!',
  });
  return (
    <Redirect
      to={{
        pathname: !estoyLogado() ? '/acceder' : '/',
        state: { from: props.location ? props.location : props },
      }}
    />
  );
}

function renderRouteConfigV3(routes, contextPath, store) {
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
      const childRoutes = renderRouteConfigV3(item.childRoutes, newContextPath, store);
      children.push(
        <Route
          key={newContextPath}
          render={props =>
            estoyLogado() || !protegido || !soloAdmin || (soloAdmin && soyAdmin()) ? (
              <item.component {...props}>{childRoutes}</item.component>
            ) : (
              redireciona(props)
            )
          }
          path={newContextPath}
        />,
      );
    } else if (item.component) {
      children.push(
        <Route
          key={newContextPath}
          render={props =>
            (estoyLogado() || !protegido) && ((soloAdmin && soyAdmin()) || !soloAdmin) ? (
              <item.component {...props} />
            ) : (
              redireciona(props)
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
  return <BrowserRouter><Switch>{children}</Switch></BrowserRouter>;
}

export default class Root extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    routeConfig: PropTypes.array.isRequired,
  };
  render() {
    const children = renderRouteConfigV3(this.props.routeConfig, '/', this.props.store);
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={history}>{children}</ConnectedRouter>
      </Provider>
    );
  }
}
