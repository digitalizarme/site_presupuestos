import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  PRESUPUESTOS_TRAE_COBRADORES_BEGIN,
  PRESUPUESTOS_TRAE_COBRADORES_SUCCESS,
  PRESUPUESTOS_TRAE_COBRADORES_FAILURE,
  PRESUPUESTOS_TRAE_COBRADORES_DISMISS_ERROR,
} from '../../../../src/features/presupuestos/redux/constants';

import {
  traeCobradores,
  dismissTraeCobradoresError,
  reducer,
} from '../../../../src/features/presupuestos/redux/traeCobradores';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('presupuestos/redux/traeCobradores', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when traeCobradores succeeds', () => {
    const store = mockStore({});

    return store.dispatch(traeCobradores())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PRESUPUESTOS_TRAE_COBRADORES_BEGIN);
        expect(actions[1]).toHaveProperty('type', PRESUPUESTOS_TRAE_COBRADORES_SUCCESS);
      });
  });

  it('dispatches failure action when traeCobradores fails', () => {
    const store = mockStore({});

    return store.dispatch(traeCobradores({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PRESUPUESTOS_TRAE_COBRADORES_BEGIN);
        expect(actions[1]).toHaveProperty('type', PRESUPUESTOS_TRAE_COBRADORES_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissTraeCobradoresError', () => {
    const expectedAction = {
      type: PRESUPUESTOS_TRAE_COBRADORES_DISMISS_ERROR,
    };
    expect(dismissTraeCobradoresError()).toEqual(expectedAction);
  });

  it('handles action type PRESUPUESTOS_TRAE_COBRADORES_BEGIN correctly', () => {
    const prevState = { traeCobradoresPending: false };
    const state = reducer(
      prevState,
      { type: PRESUPUESTOS_TRAE_COBRADORES_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeCobradoresPending).toBe(true);
  });

  it('handles action type PRESUPUESTOS_TRAE_COBRADORES_SUCCESS correctly', () => {
    const prevState = { traeCobradoresPending: true };
    const state = reducer(
      prevState,
      { type: PRESUPUESTOS_TRAE_COBRADORES_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeCobradoresPending).toBe(false);
  });

  it('handles action type PRESUPUESTOS_TRAE_COBRADORES_FAILURE correctly', () => {
    const prevState = { traeCobradoresPending: true };
    const state = reducer(
      prevState,
      { type: PRESUPUESTOS_TRAE_COBRADORES_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeCobradoresPending).toBe(false);
    expect(state.traeCobradoresError).toEqual(expect.anything());
  });

  it('handles action type PRESUPUESTOS_TRAE_COBRADORES_DISMISS_ERROR correctly', () => {
    const prevState = { traeCobradoresError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: PRESUPUESTOS_TRAE_COBRADORES_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeCobradoresError).toBe(null);
  });
});

