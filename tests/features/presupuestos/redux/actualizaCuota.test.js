import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  PRESUPUESTOS_ACTUALIZA_CUOTA_BEGIN,
  PRESUPUESTOS_ACTUALIZA_CUOTA_SUCCESS,
  PRESUPUESTOS_ACTUALIZA_CUOTA_FAILURE,
  PRESUPUESTOS_ACTUALIZA_CUOTA_DISMISS_ERROR,
} from '../../../../src/features/presupuestos/redux/constants';

import {
  actualizaCuota,
  dismissActualizaCuotaError,
  reducer,
} from '../../../../src/features/presupuestos/redux/actualizaCuota';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('presupuestos/redux/actualizaCuota', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when actualizaCuota succeeds', () => {
    const store = mockStore({});

    return store.dispatch(actualizaCuota())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PRESUPUESTOS_ACTUALIZA_CUOTA_BEGIN);
        expect(actions[1]).toHaveProperty('type', PRESUPUESTOS_ACTUALIZA_CUOTA_SUCCESS);
      });
  });

  it('dispatches failure action when actualizaCuota fails', () => {
    const store = mockStore({});

    return store.dispatch(actualizaCuota({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PRESUPUESTOS_ACTUALIZA_CUOTA_BEGIN);
        expect(actions[1]).toHaveProperty('type', PRESUPUESTOS_ACTUALIZA_CUOTA_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissActualizaCuotaError', () => {
    const expectedAction = {
      type: PRESUPUESTOS_ACTUALIZA_CUOTA_DISMISS_ERROR,
    };
    expect(dismissActualizaCuotaError()).toEqual(expectedAction);
  });

  it('handles action type PRESUPUESTOS_ACTUALIZA_CUOTA_BEGIN correctly', () => {
    const prevState = { actualizaCuotaPending: false };
    const state = reducer(
      prevState,
      { type: PRESUPUESTOS_ACTUALIZA_CUOTA_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.actualizaCuotaPending).toBe(true);
  });

  it('handles action type PRESUPUESTOS_ACTUALIZA_CUOTA_SUCCESS correctly', () => {
    const prevState = { actualizaCuotaPending: true };
    const state = reducer(
      prevState,
      { type: PRESUPUESTOS_ACTUALIZA_CUOTA_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.actualizaCuotaPending).toBe(false);
  });

  it('handles action type PRESUPUESTOS_ACTUALIZA_CUOTA_FAILURE correctly', () => {
    const prevState = { actualizaCuotaPending: true };
    const state = reducer(
      prevState,
      { type: PRESUPUESTOS_ACTUALIZA_CUOTA_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.actualizaCuotaPending).toBe(false);
    expect(state.actualizaCuotaError).toEqual(expect.anything());
  });

  it('handles action type PRESUPUESTOS_ACTUALIZA_CUOTA_DISMISS_ERROR correctly', () => {
    const prevState = { actualizaCuotaError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: PRESUPUESTOS_ACTUALIZA_CUOTA_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.actualizaCuotaError).toBe(null);
  });
});

