import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  COTIZACIONES_GUARDAR_COTIZACIONES_BEGIN,
  COTIZACIONES_GUARDAR_COTIZACIONES_SUCCESS,
  COTIZACIONES_GUARDAR_COTIZACIONES_FAILURE,
  COTIZACIONES_GUARDAR_COTIZACIONES_DISMISS_ERROR,
} from '../../../../src/features/cotizaciones/redux/constants';

import {
  guardarCotizaciones,
  dismissGuardarCotizacionesError,
  reducer,
} from '../../../../src/features/cotizaciones/redux/guardarCotizaciones';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('cotizaciones/redux/guardarCotizaciones', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when guardarCotizaciones succeeds', () => {
    const store = mockStore({});

    return store.dispatch(guardarCotizaciones())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COTIZACIONES_GUARDAR_COTIZACIONES_BEGIN);
        expect(actions[1]).toHaveProperty('type', COTIZACIONES_GUARDAR_COTIZACIONES_SUCCESS);
      });
  });

  it('dispatches failure action when guardarCotizaciones fails', () => {
    const store = mockStore({});

    return store.dispatch(guardarCotizaciones({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COTIZACIONES_GUARDAR_COTIZACIONES_BEGIN);
        expect(actions[1]).toHaveProperty('type', COTIZACIONES_GUARDAR_COTIZACIONES_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissGuardarCotizacionesError', () => {
    const expectedAction = {
      type: COTIZACIONES_GUARDAR_COTIZACIONES_DISMISS_ERROR,
    };
    expect(dismissGuardarCotizacionesError()).toEqual(expectedAction);
  });

  it('handles action type COTIZACIONES_GUARDAR_COTIZACIONES_BEGIN correctly', () => {
    const prevState = { guardarCotizacionesPending: false };
    const state = reducer(
      prevState,
      { type: COTIZACIONES_GUARDAR_COTIZACIONES_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.guardarCotizacionesPending).toBe(true);
  });

  it('handles action type COTIZACIONES_GUARDAR_COTIZACIONES_SUCCESS correctly', () => {
    const prevState = { guardarCotizacionesPending: true };
    const state = reducer(
      prevState,
      { type: COTIZACIONES_GUARDAR_COTIZACIONES_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.guardarCotizacionesPending).toBe(false);
  });

  it('handles action type COTIZACIONES_GUARDAR_COTIZACIONES_FAILURE correctly', () => {
    const prevState = { guardarCotizacionesPending: true };
    const state = reducer(
      prevState,
      { type: COTIZACIONES_GUARDAR_COTIZACIONES_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.guardarCotizacionesPending).toBe(false);
    expect(state.guardarCotizacionesError).toEqual(expect.anything());
  });

  it('handles action type COTIZACIONES_GUARDAR_COTIZACIONES_DISMISS_ERROR correctly', () => {
    const prevState = { guardarCotizacionesError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: COTIZACIONES_GUARDAR_COTIZACIONES_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.guardarCotizacionesError).toBe(null);
  });
});

