import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  PRESUPUESTOS_TRAE_FRECUENCIAS_BEGIN,
  PRESUPUESTOS_TRAE_FRECUENCIAS_SUCCESS,
  PRESUPUESTOS_TRAE_FRECUENCIAS_FAILURE,
  PRESUPUESTOS_TRAE_FRECUENCIAS_DISMISS_ERROR,
} from '../../../../src/features/presupuestos/redux/constants';

import {
  traeFrecuencias,
  dismissTraeFrecuenciasError,
  reducer,
} from '../../../../src/features/presupuestos/redux/traeFrecuencias';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('presupuestos/redux/traeFrecuencias', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when traeFrecuencias succeeds', () => {
    const store = mockStore({});

    return store.dispatch(traeFrecuencias())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PRESUPUESTOS_TRAE_FRECUENCIAS_BEGIN);
        expect(actions[1]).toHaveProperty('type', PRESUPUESTOS_TRAE_FRECUENCIAS_SUCCESS);
      });
  });

  it('dispatches failure action when traeFrecuencias fails', () => {
    const store = mockStore({});

    return store.dispatch(traeFrecuencias({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PRESUPUESTOS_TRAE_FRECUENCIAS_BEGIN);
        expect(actions[1]).toHaveProperty('type', PRESUPUESTOS_TRAE_FRECUENCIAS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissTraeFrecuenciasError', () => {
    const expectedAction = {
      type: PRESUPUESTOS_TRAE_FRECUENCIAS_DISMISS_ERROR,
    };
    expect(dismissTraeFrecuenciasError()).toEqual(expectedAction);
  });

  it('handles action type PRESUPUESTOS_TRAE_FRECUENCIAS_BEGIN correctly', () => {
    const prevState = { traeFrecuenciasPending: false };
    const state = reducer(
      prevState,
      { type: PRESUPUESTOS_TRAE_FRECUENCIAS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeFrecuenciasPending).toBe(true);
  });

  it('handles action type PRESUPUESTOS_TRAE_FRECUENCIAS_SUCCESS correctly', () => {
    const prevState = { traeFrecuenciasPending: true };
    const state = reducer(
      prevState,
      { type: PRESUPUESTOS_TRAE_FRECUENCIAS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeFrecuenciasPending).toBe(false);
  });

  it('handles action type PRESUPUESTOS_TRAE_FRECUENCIAS_FAILURE correctly', () => {
    const prevState = { traeFrecuenciasPending: true };
    const state = reducer(
      prevState,
      { type: PRESUPUESTOS_TRAE_FRECUENCIAS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeFrecuenciasPending).toBe(false);
    expect(state.traeFrecuenciasError).toEqual(expect.anything());
  });

  it('handles action type PRESUPUESTOS_TRAE_FRECUENCIAS_DISMISS_ERROR correctly', () => {
    const prevState = { traeFrecuenciasError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: PRESUPUESTOS_TRAE_FRECUENCIAS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeFrecuenciasError).toBe(null);
  });
});

