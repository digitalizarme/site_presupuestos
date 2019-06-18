import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  PRESUPUESTOS_TRAE_CUOTAS_BEGIN,
  PRESUPUESTOS_TRAE_CUOTAS_SUCCESS,
  PRESUPUESTOS_TRAE_CUOTAS_FAILURE,
  PRESUPUESTOS_TRAE_CUOTAS_DISMISS_ERROR,
} from '../../../../src/features/presupuestos/redux/constants';

import {
  traeCuotas,
  dismissTraeCuotasError,
  reducer,
} from '../../../../src/features/presupuestos/redux/traeCuotas';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('presupuestos/redux/traeCuotas', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when traeCuotas succeeds', () => {
    const store = mockStore({});

    return store.dispatch(traeCuotas())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PRESUPUESTOS_TRAE_CUOTAS_BEGIN);
        expect(actions[1]).toHaveProperty('type', PRESUPUESTOS_TRAE_CUOTAS_SUCCESS);
      });
  });

  it('dispatches failure action when traeCuotas fails', () => {
    const store = mockStore({});

    return store.dispatch(traeCuotas({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PRESUPUESTOS_TRAE_CUOTAS_BEGIN);
        expect(actions[1]).toHaveProperty('type', PRESUPUESTOS_TRAE_CUOTAS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissTraeCuotasError', () => {
    const expectedAction = {
      type: PRESUPUESTOS_TRAE_CUOTAS_DISMISS_ERROR,
    };
    expect(dismissTraeCuotasError()).toEqual(expectedAction);
  });

  it('handles action type PRESUPUESTOS_TRAE_CUOTAS_BEGIN correctly', () => {
    const prevState = { traeCuotasPending: false };
    const state = reducer(
      prevState,
      { type: PRESUPUESTOS_TRAE_CUOTAS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeCuotasPending).toBe(true);
  });

  it('handles action type PRESUPUESTOS_TRAE_CUOTAS_SUCCESS correctly', () => {
    const prevState = { traeCuotasPending: true };
    const state = reducer(
      prevState,
      { type: PRESUPUESTOS_TRAE_CUOTAS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeCuotasPending).toBe(false);
  });

  it('handles action type PRESUPUESTOS_TRAE_CUOTAS_FAILURE correctly', () => {
    const prevState = { traeCuotasPending: true };
    const state = reducer(
      prevState,
      { type: PRESUPUESTOS_TRAE_CUOTAS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeCuotasPending).toBe(false);
    expect(state.traeCuotasError).toEqual(expect.anything());
  });

  it('handles action type PRESUPUESTOS_TRAE_CUOTAS_DISMISS_ERROR correctly', () => {
    const prevState = { traeCuotasError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: PRESUPUESTOS_TRAE_CUOTAS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeCuotasError).toBe(null);
  });
});

