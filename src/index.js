import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { render } from 'react-dom';
import configStore, { history } from './common/configStore';
import routeConfig from './common/routeConfig';
import Root from './Root';
import { PersistGate } from 'redux-persist/integration/react';
import './interceptors';

const { store, persistor } = configStore();

function renderApp(app) {
  render(
    <AppContainer>
      <PersistGate loading={null} persistor={persistor}>
        {app}
      </PersistGate>
    </AppContainer>,
    document.getElementById('root'),
  );
}

renderApp(<Root store={store} history={history} routeConfig={routeConfig} />);

// Hot Module Replacement API
/* istanbul ignore if  */
if (module.hot) {
  module.hot.accept('./common/routeConfig', () => {
    const nextRouteConfig = require('./common/routeConfig').default; // eslint-disable-line
    renderApp(<Root store={store} history={history} routeConfig={nextRouteConfig} />);
  });
  module.hot.accept('./Root', () => {
    const nextRoot = require('./Root').default; // eslint-disable-line
    renderApp(<Root store={store} history={history} routeConfig={routeConfig} />);
  });
}
