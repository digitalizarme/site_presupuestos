import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  COTIZACIONES_LISTA_MONEDAS_BEGIN,
  COTIZACIONES_LISTA_MONEDAS_SUCCESS,
  COTIZACIONES_LISTA_MONEDAS_FAILURE,
  COTIZACIONES_LISTA_MONEDAS_DISMISS_ERROR,
} from '../../../../src/features/cotizaciones/redux/constants';

import {
  listaMonedas,
  dismissListaMonedasError,
  reducer,
} from '../../../../src/features/cotizaciones/redux/listaMonedas';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('cotizaciones/redux/listaMonedas', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when listaMonedas succeeds', () => {
    const store = mockStore({});

    return store.dispatch(listaMonedas())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COTIZACIONES_LISTA_MONEDAS_BEGIN);
        expect(actions[1]).toHaveProperty('type', COTIZACIONES_LISTA_MONEDAS_SUCCESS);
      });
  });

  it('dispatches failure action when listaMonedas fails', () => {
    const store = mockStore({});

    return store.dispatch(listaMonedas({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', COTIZACIONES_LISTA_MONEDAS_BEGIN);
        expect(actions[1]).toHaveProperty('type', COTIZACIONES_LISTA_MONEDAS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissListaMonedasError', () => {
    const expectedAction = {
      type: COTIZACIONES_LISTA_MONEDAS_DISMISS_ERROR,
    };
    expect(dismissListaMonedasError()).toEqual(expectedAction);
  });

  it('handles action type COTIZACIONES_LISTA_MONEDAS_BEGIN correctly', () => {
    const prevState = { listaMonedasPending: false };
    const state = reducer(
      prevState,
      { type: COTIZACIONES_LISTA_MONEDAS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.listaMonedasPending).toBe(true);
  });

  it('handles action type COTIZACIONES_LISTA_MONEDAS_SUCCESS correctly', () => {
    const prevState = { listaMonedasPending: true };
    const state = reducer(
      prevState,
      { type: COTIZACIONES_LISTA_MONEDAS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.listaMonedasPending).toBe(false);
  });

  it('handles action type COTIZACIONES_LISTA_MONEDAS_FAILURE correctly', () => {
    const prevState = { listaMonedasPending: true };
    const state = reducer(
      prevState,
      { type: COTIZACIONES_LISTA_MONEDAS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.listaMonedasPending).toBe(false);
    expect(state.listaMonedasError).toEqual(expect.anything());
  });

  it('handles action type COTIZACIONES_LISTA_MONEDAS_DISMISS_ERROR correctly', () => {
    const prevState = { listaMonedasError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: COTIZACIONES_LISTA_MONEDAS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.listaMonedasError).toBe(null);
  });
});

