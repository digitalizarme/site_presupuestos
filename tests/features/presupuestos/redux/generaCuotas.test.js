import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  PRESUPUESTOS_GENERA_CUOTAS_BEGIN,
  PRESUPUESTOS_GENERA_CUOTAS_SUCCESS,
  PRESUPUESTOS_GENERA_CUOTAS_FAILURE,
  PRESUPUESTOS_GENERA_CUOTAS_DISMISS_ERROR,
} from '../../../../src/features/presupuestos/redux/constants';

import {
  generaCuotas,
  dismissGeneraCuotasError,
  reducer,
} from '../../../../src/features/presupuestos/redux/generaCuotas';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('presupuestos/redux/generaCuotas', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when generaCuotas succeeds', () => {
    const store = mockStore({});

    return store.dispatch(generaCuotas())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PRESUPUESTOS_GENERA_CUOTAS_BEGIN);
        expect(actions[1]).toHaveProperty('type', PRESUPUESTOS_GENERA_CUOTAS_SUCCESS);
      });
  });

  it('dispatches failure action when generaCuotas fails', () => {
    const store = mockStore({});

    return store.dispatch(generaCuotas({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PRESUPUESTOS_GENERA_CUOTAS_BEGIN);
        expect(actions[1]).toHaveProperty('type', PRESUPUESTOS_GENERA_CUOTAS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGeneraCuotasError', () => {
    const expectedAction = {
      type: PRESUPUESTOS_GENERA_CUOTAS_DISMISS_ERROR,
    };
    expect(dismissGeneraCuotasError()).toEqual(expectedAction);
  });

  it('handles action type PRESUPUESTOS_GENERA_CUOTAS_BEGIN correctly', () => {
    const prevState = { generaCuotasPending: false };
    const state = reducer(
      prevState,
      { type: PRESUPUESTOS_GENERA_CUOTAS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.generaCuotasPending).toBe(true);
  });

  it('handles action type PRESUPUESTOS_GENERA_CUOTAS_SUCCESS correctly', () => {
    const prevState = { generaCuotasPending: true };
    const state = reducer(
      prevState,
      { type: PRESUPUESTOS_GENERA_CUOTAS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.generaCuotasPending).toBe(false);
  });

  it('handles action type PRESUPUESTOS_GENERA_CUOTAS_FAILURE correctly', () => {
    const prevState = { generaCuotasPending: true };
    const state = reducer(
      prevState,
      { type: PRESUPUESTOS_GENERA_CUOTAS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.generaCuotasPending).toBe(false);
    expect(state.generaCuotasError).toEqual(expect.anything());
  });

  it('handles action type PRESUPUESTOS_GENERA_CUOTAS_DISMISS_ERROR correctly', () => {
    const prevState = { generaCuotasError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: PRESUPUESTOS_GENERA_CUOTAS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.generaCuotasError).toBe(null);
  });
});

