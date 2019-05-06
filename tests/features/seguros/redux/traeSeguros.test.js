import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  SEGUROS_TRAE_SEGUROS_BEGIN,
  SEGUROS_TRAE_SEGUROS_SUCCESS,
  SEGUROS_TRAE_SEGUROS_FAILURE,
  SEGUROS_TRAE_SEGUROS_DISMISS_ERROR,
} from '../../../../src/features/seguros/redux/constants';

import {
  traeSeguros,
  dismissTraeSegurosError,
  reducer,
} from '../../../../src/features/seguros/redux/traeSeguros';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('seguros/redux/traeSeguros', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when traeSeguros succeeds', () => {
    const store = mockStore({});

    return store.dispatch(traeSeguros())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', SEGUROS_TRAE_SEGUROS_BEGIN);
        expect(actions[1]).toHaveProperty('type', SEGUROS_TRAE_SEGUROS_SUCCESS);
      });
  });

  it('dispatches failure action when traeSeguros fails', () => {
    const store = mockStore({});

    return store.dispatch(traeSeguros({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', SEGUROS_TRAE_SEGUROS_BEGIN);
        expect(actions[1]).toHaveProperty('type', SEGUROS_TRAE_SEGUROS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissTraeSegurosError', () => {
    const expectedAction = {
      type: SEGUROS_TRAE_SEGUROS_DISMISS_ERROR,
    };
    expect(dismissTraeSegurosError()).toEqual(expectedAction);
  });

  it('handles action type SEGUROS_TRAE_SEGUROS_BEGIN correctly', () => {
    const prevState = { traeSegurosPending: false };
    const state = reducer(
      prevState,
      { type: SEGUROS_TRAE_SEGUROS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeSegurosPending).toBe(true);
  });

  it('handles action type SEGUROS_TRAE_SEGUROS_SUCCESS correctly', () => {
    const prevState = { traeSegurosPending: true };
    const state = reducer(
      prevState,
      { type: SEGUROS_TRAE_SEGUROS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeSegurosPending).toBe(false);
  });

  it('handles action type SEGUROS_TRAE_SEGUROS_FAILURE correctly', () => {
    const prevState = { traeSegurosPending: true };
    const state = reducer(
      prevState,
      { type: SEGUROS_TRAE_SEGUROS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeSegurosPending).toBe(false);
    expect(state.traeSegurosError).toEqual(expect.anything());
  });

  it('handles action type SEGUROS_TRAE_SEGUROS_DISMISS_ERROR correctly', () => {
    const prevState = { traeSegurosError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: SEGUROS_TRAE_SEGUROS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeSegurosError).toBe(null);
  });
});

