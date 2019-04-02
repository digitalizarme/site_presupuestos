import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  CONFIGURACIONES_TRAER_CONFIGURACION_BEGIN,
  CONFIGURACIONES_TRAER_CONFIGURACION_SUCCESS,
  CONFIGURACIONES_TRAER_CONFIGURACION_FAILURE,
  CONFIGURACIONES_TRAER_CONFIGURACION_DISMISS_ERROR,
} from '../../../../src/features/configuraciones/redux/constants';

import {
  traerConfiguracion,
  dismissTraerConfiguracionError,
  reducer,
} from '../../../../src/features/configuraciones/redux/traerConfiguracion';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('configuraciones/redux/traerConfiguracion', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when traerConfiguracion succeeds', () => {
    const store = mockStore({});

    return store.dispatch(traerConfiguracion())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CONFIGURACIONES_TRAER_CONFIGURACION_BEGIN);
        expect(actions[1]).toHaveProperty('type', CONFIGURACIONES_TRAER_CONFIGURACION_SUCCESS);
      });
  });

  it('dispatches failure action when traerConfiguracion fails', () => {
    const store = mockStore({});

    return store.dispatch(traerConfiguracion({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CONFIGURACIONES_TRAER_CONFIGURACION_BEGIN);
        expect(actions[1]).toHaveProperty('type', CONFIGURACIONES_TRAER_CONFIGURACION_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissTraerConfiguracionError', () => {
    const expectedAction = {
      type: CONFIGURACIONES_TRAER_CONFIGURACION_DISMISS_ERROR,
    };
    expect(dismissTraerConfiguracionError()).toEqual(expectedAction);
  });

  it('handles action type CONFIGURACIONES_TRAER_CONFIGURACION_BEGIN correctly', () => {
    const prevState = { traerConfiguracionPending: false };
    const state = reducer(
      prevState,
      { type: CONFIGURACIONES_TRAER_CONFIGURACION_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traerConfiguracionPending).toBe(true);
  });

  it('handles action type CONFIGURACIONES_TRAER_CONFIGURACION_SUCCESS correctly', () => {
    const prevState = { traerConfiguracionPending: true };
    const state = reducer(
      prevState,
      { type: CONFIGURACIONES_TRAER_CONFIGURACION_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traerConfiguracionPending).toBe(false);
  });

  it('handles action type CONFIGURACIONES_TRAER_CONFIGURACION_FAILURE correctly', () => {
    const prevState = { traerConfiguracionPending: true };
    const state = reducer(
      prevState,
      { type: CONFIGURACIONES_TRAER_CONFIGURACION_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traerConfiguracionPending).toBe(false);
    expect(state.traerConfiguracionError).toEqual(expect.anything());
  });

  it('handles action type CONFIGURACIONES_TRAER_CONFIGURACION_DISMISS_ERROR correctly', () => {
    const prevState = { traerConfiguracionError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CONFIGURACIONES_TRAER_CONFIGURACION_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traerConfiguracionError).toBe(null);
  });
});

