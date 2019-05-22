import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  COTIZACIONES_TRAE_ULTIMAS_COTIZACIONES_MONEDA_BEGIN,
  COTIZACIONES_TRAE_ULTIMAS_COTIZACIONES_MONEDA_SUCCESS,
  COTIZACIONES_TRAE_ULTIMAS_COTIZACIONES_MONEDA_FAILURE,
  COTIZACIONES_TRAE_ULTIMAS_COTIZACIONES_MONEDA_DISMISS_ERROR,
} from '../../../../src/features/cotizaciones/redux/constants';

import {
  traeUltimasCotizacionesMoneda,
  dismissTraeUltimasCotizacionesMonedaError,
  reducer,
} from '../../../../src/features/cotizaciones/redux/traeUltimasCotizacionesMoneda';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('cotizaciones/redux/traeUltimasCotizacionesMoneda', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when traeUltimasCotizacionesMoneda succeeds', () => {
    const store = mockStore({});

    return store.dispatch(traeUltimasCotizacionesMoneda())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COTIZACIONES_TRAE_ULTIMAS_COTIZACIONES_MONEDA_BEGIN);
        expect(actions[1]).toHaveProperty('type', COTIZACIONES_TRAE_ULTIMAS_COTIZACIONES_MONEDA_SUCCESS);
      });
  });

  it('dispatches failure action when traeUltimasCotizacionesMoneda fails', () => {
    const store = mockStore({});

    return store.dispatch(traeUltimasCotizacionesMoneda({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COTIZACIONES_TRAE_ULTIMAS_COTIZACIONES_MONEDA_BEGIN);
        expect(actions[1]).toHaveProperty('type', COTIZACIONES_TRAE_ULTIMAS_COTIZACIONES_MONEDA_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissTraeUltimasCotizacionesMonedaError', () => {
    const expectedAction = {
      type: COTIZACIONES_TRAE_ULTIMAS_COTIZACIONES_MONEDA_DISMISS_ERROR,
    };
    expect(dismissTraeUltimasCotizacionesMonedaError()).toEqual(expectedAction);
  });

  it('handles action type COTIZACIONES_TRAE_ULTIMAS_COTIZACIONES_MONEDA_BEGIN correctly', () => {
    const prevState = { traeUltimasCotizacionesMonedaPending: false };
    const state = reducer(
      prevState,
      { type: COTIZACIONES_TRAE_ULTIMAS_COTIZACIONES_MONEDA_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeUltimasCotizacionesMonedaPending).toBe(true);
  });

  it('handles action type COTIZACIONES_TRAE_ULTIMAS_COTIZACIONES_MONEDA_SUCCESS correctly', () => {
    const prevState = { traeUltimasCotizacionesMonedaPending: true };
    const state = reducer(
      prevState,
      { type: COTIZACIONES_TRAE_ULTIMAS_COTIZACIONES_MONEDA_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeUltimasCotizacionesMonedaPending).toBe(false);
  });

  it('handles action type COTIZACIONES_TRAE_ULTIMAS_COTIZACIONES_MONEDA_FAILURE correctly', () => {
    const prevState = { traeUltimasCotizacionesMonedaPending: true };
    const state = reducer(
      prevState,
      { type: COTIZACIONES_TRAE_ULTIMAS_COTIZACIONES_MONEDA_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeUltimasCotizacionesMonedaPending).toBe(false);
    expect(state.traeUltimasCotizacionesMonedaError).toEqual(expect.anything());
  });

  it('handles action type COTIZACIONES_TRAE_ULTIMAS_COTIZACIONES_MONEDA_DISMISS_ERROR correctly', () => {
    const prevState = { traeUltimasCotizacionesMonedaError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: COTIZACIONES_TRAE_ULTIMAS_COTIZACIONES_MONEDA_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeUltimasCotizacionesMonedaError).toBe(null);
  });
});

