import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  PRESUPUESTOS_TRAE_MEDIOS_PAGO_BEGIN,
  PRESUPUESTOS_TRAE_MEDIOS_PAGO_SUCCESS,
  PRESUPUESTOS_TRAE_MEDIOS_PAGO_FAILURE,
  PRESUPUESTOS_TRAE_MEDIOS_PAGO_DISMISS_ERROR,
} from '../../../../src/features/presupuestos/redux/constants';

import {
  traeMediosPago,
  dismissTraeMediosPagoError,
  reducer,
} from '../../../../src/features/presupuestos/redux/traeMediosPago';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('presupuestos/redux/traeMediosPago', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when traeMediosPago succeeds', () => {
    const store = mockStore({});

    return store.dispatch(traeMediosPago())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PRESUPUESTOS_TRAE_MEDIOS_PAGO_BEGIN);
        expect(actions[1]).toHaveProperty('type', PRESUPUESTOS_TRAE_MEDIOS_PAGO_SUCCESS);
      });
  });

  it('dispatches failure action when traeMediosPago fails', () => {
    const store = mockStore({});

    return store.dispatch(traeMediosPago({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PRESUPUESTOS_TRAE_MEDIOS_PAGO_BEGIN);
        expect(actions[1]).toHaveProperty('type', PRESUPUESTOS_TRAE_MEDIOS_PAGO_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissTraeMediosPagoError', () => {
    const expectedAction = {
      type: PRESUPUESTOS_TRAE_MEDIOS_PAGO_DISMISS_ERROR,
    };
    expect(dismissTraeMediosPagoError()).toEqual(expectedAction);
  });

  it('handles action type PRESUPUESTOS_TRAE_MEDIOS_PAGO_BEGIN correctly', () => {
    const prevState = { traeMedioPagoPending: false };
    const state = reducer(
      prevState,
      { type: PRESUPUESTOS_TRAE_MEDIOS_PAGO_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeMedioPagoPending).toBe(true);
  });

  it('handles action type PRESUPUESTOS_TRAE_MEDIOS_PAGO_SUCCESS correctly', () => {
    const prevState = { traeMedioPagoPending: true };
    const state = reducer(
      prevState,
      { type: PRESUPUESTOS_TRAE_MEDIOS_PAGO_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeMedioPagoPending).toBe(false);
  });

  it('handles action type PRESUPUESTOS_TRAE_MEDIOS_PAGO_FAILURE correctly', () => {
    const prevState = { traeMedioPagoPending: true };
    const state = reducer(
      prevState,
      { type: PRESUPUESTOS_TRAE_MEDIOS_PAGO_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeMedioPagoPending).toBe(false);
    expect(state.traeMedioPagoError).toEqual(expect.anything());
  });

  it('handles action type PRESUPUESTOS_TRAE_MEDIOS_PAGO_DISMISS_ERROR correctly', () => {
    const prevState = { traeMedioPagoError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: PRESUPUESTOS_TRAE_MEDIOS_PAGO_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeMedioPagoError).toBe(null);
  });
});

