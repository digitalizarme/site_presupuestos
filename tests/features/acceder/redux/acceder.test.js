import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  ACCEDER_ACCEDER_BEGIN,
  ACCEDER_ACCEDER_SUCCESS,
  ACCEDER_ACCEDER_FAILURE,
  ACCEDER_ACCEDER_DISMISS_ERROR,
} from '../../../../src/features/acceder/redux/constants';

import {
  acceder,
  dismissAccederError,
  reducer,
} from '../../../../src/features/acceder/redux/acceder';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('acceder/redux/acceder', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when acceder succeeds', () => {
    const store = mockStore({});

    return store.dispatch(acceder())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ACCEDER_ACCEDER_BEGIN);
        expect(actions[1]).toHaveProperty('type', ACCEDER_ACCEDER_SUCCESS);
      });
  });

  it('dispatches failure action when acceder fails', () => {
    const store = mockStore({});

    return store.dispatch(acceder({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ACCEDER_ACCEDER_BEGIN);
        expect(actions[1]).toHaveProperty('type', ACCEDER_ACCEDER_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissAccederError', () => {
    const expectedAction = {
      type: ACCEDER_ACCEDER_DISMISS_ERROR,
    };
    expect(dismissAccederError()).toEqual(expectedAction);
  });

  it('handles action type LOGIN_LOGAR_BEGIN correctly', () => {
    const prevState = { logarPending: false };
    const state = reducer(
      prevState,
      { type: ACCEDER_ACCEDER_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.logarPending).toBe(true);
  });

  it('handles action type LOGIN_LOGAR_SUCCESS correctly', () => {
    const prevState = { logarPending: true };
    const state = reducer(
      prevState,
      { type: ACCEDER_ACCEDER_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.logarPending).toBe(false);
  });

  it('handles action type LOGIN_LOGAR_FAILURE correctly', () => {
    const prevState = { logarPending: true };
    const state = reducer(
      prevState,
      { type: ACCEDER_ACCEDER_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.logarPending).toBe(false);
    expect(state.logarError).toEqual(expect.anything());
  });

  it('handles action type LOGIN_LOGAR_DISMISS_ERROR correctly', () => {
    const prevState = { logarError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ACCEDER_ACCEDER_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.logarError).toBe(null);
  });
});

