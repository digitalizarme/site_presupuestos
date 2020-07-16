import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  PERSONAS_TRAER_PERSONAS_CLIENTES_BEGIN,
  PERSONAS_TRAER_PERSONAS_CLIENTES_SUCCESS,
  PERSONAS_TRAER_PERSONAS_CLIENTES_FAILURE,
  PERSONAS_TRAER_PERSONAS_CLIENTES_DISMISS_ERROR,
} from '../../../../src/features/personas/redux/constants';

import {
  traerPersonasClientes,
  dismissTraerPersonasClientesError,
  reducer,
} from '../../../../src/features/personas/redux/traerPersonasClientes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('personas/redux/traerPersonasClientes', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when traerPersonasClientes succeeds', () => {
    const store = mockStore({});

    return store.dispatch(traerPersonasClientes())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PERSONAS_TRAER_PERSONAS_CLIENTES_BEGIN);
        expect(actions[1]).toHaveProperty('type', PERSONAS_TRAER_PERSONAS_CLIENTES_SUCCESS);
      });
  });

  it('dispatches failure action when traerPersonasClientes fails', () => {
    const store = mockStore({});

    return store.dispatch(traerPersonasClientes({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PERSONAS_TRAER_PERSONAS_CLIENTES_BEGIN);
        expect(actions[1]).toHaveProperty('type', PERSONAS_TRAER_PERSONAS_CLIENTES_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissTraerPersonasClientesError', () => {
    const expectedAction = {
      type: PERSONAS_TRAER_PERSONAS_CLIENTES_DISMISS_ERROR,
    };
    expect(dismissTraerPersonasClientesError()).toEqual(expectedAction);
  });

  it('handles action type PERSONAS_TRAER_PERSONAS_CLIENTES_BEGIN correctly', () => {
    const prevState = { traerPersonasClientesPending: false };
    const state = reducer(
      prevState,
      { type: PERSONAS_TRAER_PERSONAS_CLIENTES_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traerPersonasClientesPending).toBe(true);
  });

  it('handles action type PERSONAS_TRAER_PERSONAS_CLIENTES_SUCCESS correctly', () => {
    const prevState = { traerPersonasClientesPending: true };
    const state = reducer(
      prevState,
      { type: PERSONAS_TRAER_PERSONAS_CLIENTES_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traerPersonasClientesPending).toBe(false);
  });

  it('handles action type PERSONAS_TRAER_PERSONAS_CLIENTES_FAILURE correctly', () => {
    const prevState = { traerPersonasClientesPending: true };
    const state = reducer(
      prevState,
      { type: PERSONAS_TRAER_PERSONAS_CLIENTES_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traerPersonasClientesPending).toBe(false);
    expect(state.traerPersonasClientesError).toEqual(expect.anything());
  });

  it('handles action type PERSONAS_TRAER_PERSONAS_CLIENTES_DISMISS_ERROR correctly', () => {
    const prevState = { traerPersonasClientesError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: PERSONAS_TRAER_PERSONAS_CLIENTES_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traerPersonasClientesError).toBe(null);
  });
});

