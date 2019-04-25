/* This is the Root component mainly initializes Redux and React Router. */

import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import history from './common/history';
import swal from 'sweetalert';

let logado = false;
let soyAdmin = false;

function estoyLogueado(store) {
  if (store) {
    const { getState } = store;
    const { acceder } = getState();
    logado = acceder.usuario.c_usuario ? true : false;
    soyAdmin  = acceder.usuario ? acceder.usuario.b_administrador : false;
    // console.log(soyAdmin,'soyadm');
  }
}

function redireciona(props, logado) {
  swal({
    title: 'Ops',
    text: !logado?'Debes iniciar sesion antes acceder a ciertas paginas':'No tienes los permisos necesarios para acceder a aquella pagina',
    icon: 'error',
    button: 'OK!',
  });
  return (
    <Redirect
      to={{
        pathname: !logado ? '/acceder' : '/',
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
    //console.log(soloAdmin,'soloadmin: '+ item.path)

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
            logado || !protegido || !soloAdmin || (soloAdmin && soyAdmin) ? (
              <item.component {...props}>{childRoutes}</item.component>
            ) : (
              redireciona(props, logado)
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
            (logado || !protegido) && ((soloAdmin && soyAdmin) || !soloAdmin) ? (
              <item.component {...props} />
            ) : (
              redireciona(props, logado)
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
    routeConfig: PropTypes.array.isRequired,
  };
  render() {
    estoyLogueado(this.props.store);
    const children = renderRouteConfigV3(this.props.routeConfig, '/', this.props.store);
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={history}>{children}</ConnectedRouter>
      </Provider>
    );
  }
}
