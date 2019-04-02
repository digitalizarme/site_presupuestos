import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  CONFIGURACIONES_GUARDAR_BEGIN,
  CONFIGURACIONES_GUARDAR_SUCCESS,
  CONFIGURACIONES_GUARDAR_FAILURE,
  CONFIGURACIONES_GUARDAR_DISMISS_ERROR,
} from '../../../../src/features/configuraciones/redux/constants';

import {
  guardar,
  dismissGuardarError,
  reducer,
} from '../../../../src/features/configuraciones/redux/guardar';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('configuraciones/redux/guardar', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when guardar succeeds', () => {
    const store = mockStore({});

    return store.dispatch(guardar())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CONFIGURACIONES_GUARDAR_BEGIN);
        expect(actions[1]).toHaveProperty('type', CONFIGURACIONES_GUARDAR_SUCCESS);
      });
  });

  it('dispatches failure action when guardar fails', () => {
    const store = mockStore({});

    return store.dispatch(guardar({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CONFIGURACIONES_GUARDAR_BEGIN);
        expect(actions[1]).toHaveProperty('type', CONFIGURACIONES_GUARDAR_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGuardarError', () => {
    const expectedAction = {
      type: CONFIGURACIONES_GUARDAR_DISMISS_ERROR,
    };
    expect(dismissGuardarError()).toEqual(expectedAction);
  });

  it('handles action type CONFIGURACIONES_GUARDAR_BEGIN correctly', () => {
    const prevState = { guardarPending: false };
    const state = reducer(
      prevState,
      { type: CONFIGURACIONES_GUARDAR_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.guardarPending).toBe(true);
  });

  it('handles action type CONFIGURACIONES_GUARDAR_SUCCESS correctly', () => {
    const prevState = { guardarPending: true };
    const state = reducer(
      prevState,
      { type: CONFIGURACIONES_GUARDAR_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.guardarPending).toBe(false);
  });

  it('handles action type CONFIGURACIONES_GUARDAR_FAILURE correctly', () => {
    const prevState = { guardarPending: true };
    const state = reducer(
      prevState,
      { type: CONFIGURACIONES_GUARDAR_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.guardarPending).toBe(false);
    expect(state.guardarError).toEqual(expect.anything());
  });

  it('handles action type CONFIGURACIONES_GUARDAR_DISMISS_ERROR correctly', () => {
    const prevState = { guardarError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CONFIGURACIONES_GUARDAR_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.guardarError).toBe(null);
  });
});

