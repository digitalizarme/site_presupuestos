import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  USUARIOS_MI_USUARIO_BEGIN,
  USUARIOS_MI_USUARIO_SUCCESS,
  USUARIOS_MI_USUARIO_FAILURE,
  USUARIOS_MI_USUARIO_DISMISS_ERROR,
} from '../../../../src/features/usuarios/redux/constants';

import {
  miUsuario,
  dismissMiUsuarioError,
  reducer,
} from '../../../../src/features/usuarios/redux/miUsuario';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('usuarios/redux/miUsuario', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when miUsuario succeeds', () => {
    const store = mockStore({});

    return store.dispatch(miUsuario())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', USUARIOS_MI_USUARIO_BEGIN);
        expect(actions[1]).toHaveProperty('type', USUARIOS_MI_USUARIO_SUCCESS);
      });
  });

  it('dispatches failure action when miUsuario fails', () => {
    const store = mockStore({});

    return store.dispatch(miUsuario({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', USUARIOS_MI_USUARIO_BEGIN);
        expect(actions[1]).toHaveProperty('type', USUARIOS_MI_USUARIO_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissMiUsuarioError', () => {
    const expectedAction = {
      type: USUARIOS_MI_USUARIO_DISMISS_ERROR,
    };
    expect(dismissMiUsuarioError()).toEqual(expectedAction);
  });

  it('handles action type USUARIOS_MI_USUARIO_BEGIN correctly', () => {
    const prevState = { miUsuarioPending: false };
    const state = reducer(
      prevState,
      { type: USUARIOS_MI_USUARIO_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.miUsuarioPending).toBe(true);
  });

  it('handles action type USUARIOS_MI_USUARIO_SUCCESS correctly', () => {
    const prevState = { miUsuarioPending: true };
    const state = reducer(
      prevState,
      { type: USUARIOS_MI_USUARIO_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.miUsuarioPending).toBe(false);
  });

  it('handles action type USUARIOS_MI_USUARIO_FAILURE correctly', () => {
    const prevState = { miUsuarioPending: true };
    const state = reducer(
      prevState,
      { type: USUARIOS_MI_USUARIO_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.miUsuarioPending).toBe(false);
    expect(state.miUsuarioError).toEqual(expect.anything());
  });

  it('handles action type USUARIOS_MI_USUARIO_DISMISS_ERROR correctly', () => {
    const prevState = { miUsuarioError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: USUARIOS_MI_USUARIO_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.miUsuarioError).toBe(null);
  });
});

