import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  PRESUPUESTOS_ELIMINA_CUOTAS_BEGIN,
  PRESUPUESTOS_ELIMINA_CUOTAS_SUCCESS,
  PRESUPUESTOS_ELIMINA_CUOTAS_FAILURE,
  PRESUPUESTOS_ELIMINA_CUOTAS_DISMISS_ERROR,
} from '../../../../src/features/presupuestos/redux/constants';

import {
  eliminaCuotas,
  dismissEliminaCuotasError,
  reducer,
} from '../../../../src/features/presupuestos/redux/eliminaCuotas';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('presupuestos/redux/eliminaCuotas', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when eliminaCuotas succeeds', () => {
    const store = mockStore({});

    return store.dispatch(eliminaCuotas())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PRESUPUESTOS_ELIMINA_CUOTAS_BEGIN);
        expect(actions[1]).toHaveProperty('type', PRESUPUESTOS_ELIMINA_CUOTAS_SUCCESS);
      });
  });

  it('dispatches failure action when eliminaCuotas fails', () => {
    const store = mockStore({});

    return store.dispatch(eliminaCuotas({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PRESUPUESTOS_ELIMINA_CUOTAS_BEGIN);
        expect(actions[1]).toHaveProperty('type', PRESUPUESTOS_ELIMINA_CUOTAS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissEliminaCuotasError', () => {
    const expectedAction = {
      type: PRESUPUESTOS_ELIMINA_CUOTAS_DISMISS_ERROR,
    };
    expect(dismissEliminaCuotasError()).toEqual(expectedAction);
  });

  it('handles action type PRESUPUESTOS_ELIMINA_CUOTAS_BEGIN correctly', () => {
    const prevState = { eliminaCuotasPending: false };
    const state = reducer(
      prevState,
      { type: PRESUPUESTOS_ELIMINA_CUOTAS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.eliminaCuotasPending).toBe(true);
  });

  it('handles action type PRESUPUESTOS_ELIMINA_CUOTAS_SUCCESS correctly', () => {
    const prevState = { eliminaCuotasPending: true };
    const state = reducer(
      prevState,
      { type: PRESUPUESTOS_ELIMINA_CUOTAS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.eliminaCuotasPending).toBe(false);
  });

  it('handles action type PRESUPUESTOS_ELIMINA_CUOTAS_FAILURE correctly', () => {
    const prevState = { eliminaCuotasPending: true };
    const state = reducer(
      prevState,
      { type: PRESUPUESTOS_ELIMINA_CUOTAS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.eliminaCuotasPending).toBe(false);
    expect(state.eliminaCuotasError).toEqual(expect.anything());
  });

  it('handles action type PRESUPUESTOS_ELIMINA_CUOTAS_DISMISS_ERROR correctly', () => {
    const prevState = { eliminaCuotasError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: PRESUPUESTOS_ELIMINA_CUOTAS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.eliminaCuotasError).toBe(null);
  });
});

