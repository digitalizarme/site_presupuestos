import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  PRESUPUESTOS_TRAE_MERCADERIAS_SERVICIOS_BEGIN,
  PRESUPUESTOS_TRAE_MERCADERIAS_SERVICIOS_SUCCESS,
  PRESUPUESTOS_TRAE_MERCADERIAS_SERVICIOS_FAILURE,
  PRESUPUESTOS_TRAE_MERCADERIAS_SERVICIOS_DISMISS_ERROR,
} from '../../../../src/features/presupuestos/redux/constants';

import {
  traeMercaderiasServicios,
  dismissTraeMercaderiasServiciosError,
  reducer,
} from '../../../../src/features/presupuestos/redux/traeMercaderiasServicios';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('presupuestos/redux/traeMercaderiasServicios', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when traeMercaderiasServicios succeeds', () => {
    const store = mockStore({});

    return store.dispatch(traeMercaderiasServicios())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PRESUPUESTOS_TRAE_MERCADERIAS_SERVICIOS_BEGIN);
        expect(actions[1]).toHaveProperty('type', PRESUPUESTOS_TRAE_MERCADERIAS_SERVICIOS_SUCCESS);
      });
  });

  it('dispatches failure action when traeMercaderiasServicios fails', () => {
    const store = mockStore({});

    return store.dispatch(traeMercaderiasServicios({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PRESUPUESTOS_TRAE_MERCADERIAS_SERVICIOS_BEGIN);
        expect(actions[1]).toHaveProperty('type', PRESUPUESTOS_TRAE_MERCADERIAS_SERVICIOS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissTraeMercaderiasServiciosError', () => {
    const expectedAction = {
      type: PRESUPUESTOS_TRAE_MERCADERIAS_SERVICIOS_DISMISS_ERROR,
    };
    expect(dismissTraeMercaderiasServiciosError()).toEqual(expectedAction);
  });

  it('handles action type PRESUPUESTOS_TRAE_MERCADERIAS_SERVICIOS_BEGIN correctly', () => {
    const prevState = { traeMercaderiasServiciosPending: false };
    const state = reducer(
      prevState,
      { type: PRESUPUESTOS_TRAE_MERCADERIAS_SERVICIOS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeMercaderiasServiciosPending).toBe(true);
  });

  it('handles action type PRESUPUESTOS_TRAE_MERCADERIAS_SERVICIOS_SUCCESS correctly', () => {
    const prevState = { traeMercaderiasServiciosPending: true };
    const state = reducer(
      prevState,
      { type: PRESUPUESTOS_TRAE_MERCADERIAS_SERVICIOS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeMercaderiasServiciosPending).toBe(false);
  });

  it('handles action type PRESUPUESTOS_TRAE_MERCADERIAS_SERVICIOS_FAILURE correctly', () => {
    const prevState = { traeMercaderiasServiciosPending: true };
    const state = reducer(
      prevState,
      { type: PRESUPUESTOS_TRAE_MERCADERIAS_SERVICIOS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeMercaderiasServiciosPending).toBe(false);
    expect(state.traeMercaderiasServiciosError).toEqual(expect.anything());
  });

  it('handles action type PRESUPUESTOS_TRAE_MERCADERIAS_SERVICIOS_DISMISS_ERROR correctly', () => {
    const prevState = { traeMercaderiasServiciosError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: PRESUPUESTOS_TRAE_MERCADERIAS_SERVICIOS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeMercaderiasServiciosError).toBe(null);
  });
});

