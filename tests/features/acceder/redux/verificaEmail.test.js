import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  ACCEDER_VERIFICA_EMAIL_BEGIN,
  ACCEDER_VERIFICA_EMAIL_SUCCESS,
  ACCEDER_VERIFICA_EMAIL_FAILURE,
  ACCEDER_VERIFICA_EMAIL_DISMISS_ERROR,
} from '../../../../src/features/acceder/redux/constants';

import {
  verificaEmail,
  dismissVerificaEmailError,
  reducer,
} from '../../../../src/features/acceder/redux/verificaEmail';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('acceder/redux/verificaEmail', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when verificaEmail succeeds', () => {
    const store = mockStore({});

    return store.dispatch(verificaEmail())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ACCEDER_VERIFICA_EMAIL_BEGIN);
        expect(actions[1]).toHaveProperty('type', ACCEDER_VERIFICA_EMAIL_SUCCESS);
      });
  });

  it('dispatches failure action when verificaEmail fails', () => {
    const store = mockStore({});

    return store.dispatch(verificaEmail({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ACCEDER_VERIFICA_EMAIL_BEGIN);
        expect(actions[1]).toHaveProperty('type', ACCEDER_VERIFICA_EMAIL_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissVerificaEmailError', () => {
    const expectedAction = {
      type: ACCEDER_VERIFICA_EMAIL_DISMISS_ERROR,
    };
    expect(dismissVerificaEmailError()).toEqual(expectedAction);
  });

  it('handles action type ACCEDER_VERIFICA_EMAIL_BEGIN correctly', () => {
    const prevState = { verificaEmailPending: false };
    const state = reducer(
      prevState,
      { type: ACCEDER_VERIFICA_EMAIL_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.verificaEmailPending).toBe(true);
  });

  it('handles action type ACCEDER_VERIFICA_EMAIL_SUCCESS correctly', () => {
    const prevState = { verificaEmailPending: true };
    const state = reducer(
      prevState,
      { type: ACCEDER_VERIFICA_EMAIL_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.verificaEmailPending).toBe(false);
  });

  it('handles action type ACCEDER_VERIFICA_EMAIL_FAILURE correctly', () => {
    const prevState = { verificaEmailPending: true };
    const state = reducer(
      prevState,
      { type: ACCEDER_VERIFICA_EMAIL_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.verificaEmailPending).toBe(false);
    expect(state.verificaEmailError).toEqual(expect.anything());
  });

  it('handles action type ACCEDER_VERIFICA_EMAIL_DISMISS_ERROR correctly', () => {
    const prevState = { verificaEmailError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ACCEDER_VERIFICA_EMAIL_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.verificaEmailError).toBe(null);
  });
});

