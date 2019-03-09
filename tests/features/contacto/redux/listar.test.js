import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  CONTACTO_LISTAR_BEGIN,
  CONTACTO_LISTAR_SUCCESS,
  CONTACTO_LISTAR_FAILURE,
  CONTACTO_LISTAR_DISMISS_ERROR,
} from '../../../../src/features/contacto/redux/constants';

import {
  listar,
  dismissListarError,
  reducer,
} from '../../../../src/features/contacto/redux/listar';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('contacto/redux/listar', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when listar succeeds', () => {
    const store = mockStore({});

    return store.dispatch(listar())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CONTACTO_LISTAR_BEGIN);
        expect(actions[1]).toHaveProperty('type', CONTACTO_LISTAR_SUCCESS);
      });
  });

  it('dispatches failure action when listar fails', () => {
    const store = mockStore({});

    return store.dispatch(listar({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', CONTACTO_LISTAR_BEGIN);
        expect(actions[1]).toHaveProperty('type', CONTACTO_LISTAR_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissListarError', () => {
    const expectedAction = {
      type: CONTACTO_LISTAR_DISMISS_ERROR,
    };
    expect(dismissListarError()).toEqual(expectedAction);
  });

  it('handles action type CONTACTO_LISTAR_BEGIN correctly', () => {
    const prevState = { listarPending: false };
    const state = reducer(
      prevState,
      { type: CONTACTO_LISTAR_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.listarPending).toBe(true);
  });

  it('handles action type CONTACTO_LISTAR_SUCCESS correctly', () => {
    const prevState = { listarPending: true };
    const state = reducer(
      prevState,
      { type: CONTACTO_LISTAR_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.listarPending).toBe(false);
  });

  it('handles action type CONTACTO_LISTAR_FAILURE correctly', () => {
    const prevState = { listarPending: true };
    const state = reducer(
      prevState,
      { type: CONTACTO_LISTAR_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.listarPending).toBe(false);
    expect(state.listarError).toEqual(expect.anything());
  });

  it('handles action type CONTACTO_LISTAR_DISMISS_ERROR correctly', () => {
    const prevState = { listarError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: CONTACTO_LISTAR_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.listarError).toBe(null);
  });
});

