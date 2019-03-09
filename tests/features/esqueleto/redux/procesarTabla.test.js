import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  ESQUELETO_PROCESAR_TABLA_BEGIN,
  ESQUELETO_PROCESAR_TABLA_SUCCESS,
  ESQUELETO_PROCESAR_TABLA_FAILURE,
  ESQUELETO_PROCESAR_TABLA_DISMISS_ERROR,
} from '../../../../src/features/esqueleto/redux/constants';

import {
  procesarTabla,
  dismissProcesarTablaError,
  reducer,
} from '../../../../src/features/esqueleto/redux/procesarTabla';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('esqueleto/redux/procesarTabla', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when procesarTabla succeeds', () => {
    const store = mockStore({});

    return store.dispatch(procesarTabla())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ESQUELETO_PROCESAR_TABLA_BEGIN);
        expect(actions[1]).toHaveProperty('type', ESQUELETO_PROCESAR_TABLA_SUCCESS);
      });
  });

  it('dispatches failure action when procesarTabla fails', () => {
    const store = mockStore({});

    return store.dispatch(procesarTabla({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ESQUELETO_PROCESAR_TABLA_BEGIN);
        expect(actions[1]).toHaveProperty('type', ESQUELETO_PROCESAR_TABLA_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissProcesarTablaError', () => {
    const expectedAction = {
      type: ESQUELETO_PROCESAR_TABLA_DISMISS_ERROR,
    };
    expect(dismissProcesarTablaError()).toEqual(expectedAction);
  });

  it('handles action type ESQUELETO_PROCESAR_TABLA_BEGIN correctly', () => {
    const prevState = { tablaPending: false };
    const state = reducer(
      prevState,
      { type: ESQUELETO_PROCESAR_TABLA_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.tablaPending).toBe(true);
  });

  it('handles action type ESQUELETO_PROCESAR_TABLA_SUCCESS correctly', () => {
    const prevState = { tablaPending: true };
    const state = reducer(
      prevState,
      { type: ESQUELETO_PROCESAR_TABLA_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.tablaPending).toBe(false);
  });

  it('handles action type ESQUELETO_PROCESAR_TABLA_FAILURE correctly', () => {
    const prevState = { tablaPending: true };
    const state = reducer(
      prevState,
      { type: ESQUELETO_PROCESAR_TABLA_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.tablaPending).toBe(false);
    expect(state.tablaError).toEqual(expect.anything());
  });

  it('handles action type ESQUELETO_PROCESAR_TABLA_DISMISS_ERROR correctly', () => {
    const prevState = { tablaError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ESQUELETO_PROCESAR_TABLA_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.tablaError).toBe(null);
  });
});

