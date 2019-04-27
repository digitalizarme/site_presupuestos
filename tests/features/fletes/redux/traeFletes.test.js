import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  FLETES_TRAE_FLETES_BEGIN,
  FLETES_TRAE_FLETES_SUCCESS,
  FLETES_TRAE_FLETES_FAILURE,
  FLETES_TRAE_FLETES_DISMISS_ERROR,
} from '../../../../src/features/fletes/redux/constants';

import {
  traeFletes,
  dismissTraeFletesError,
  reducer,
} from '../../../../src/features/fletes/redux/traeFletes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('fletes/redux/traeFletes', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when traeFletes succeeds', () => {
    const store = mockStore({});

    return store.dispatch(traeFletes())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', FLETES_TRAE_FLETES_BEGIN);
        expect(actions[1]).toHaveProperty('type', FLETES_TRAE_FLETES_SUCCESS);
      });
  });

  it('dispatches failure action when traeFletes fails', () => {
    const store = mockStore({});

    return store.dispatch(traeFletes({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', FLETES_TRAE_FLETES_BEGIN);
        expect(actions[1]).toHaveProperty('type', FLETES_TRAE_FLETES_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissTraeFletesError', () => {
    const expectedAction = {
      type: FLETES_TRAE_FLETES_DISMISS_ERROR,
    };
    expect(dismissTraeFletesError()).toEqual(expectedAction);
  });

  it('handles action type FLETES_TRAE_FLETES_BEGIN correctly', () => {
    const prevState = { traeFletesPending: false };
    const state = reducer(
      prevState,
      { type: FLETES_TRAE_FLETES_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeFletesPending).toBe(true);
  });

  it('handles action type FLETES_TRAE_FLETES_SUCCESS correctly', () => {
    const prevState = { traeFletesPending: true };
    const state = reducer(
      prevState,
      { type: FLETES_TRAE_FLETES_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeFletesPending).toBe(false);
  });

  it('handles action type FLETES_TRAE_FLETES_FAILURE correctly', () => {
    const prevState = { traeFletesPending: true };
    const state = reducer(
      prevState,
      { type: FLETES_TRAE_FLETES_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeFletesPending).toBe(false);
    expect(state.traeFletesError).toEqual(expect.anything());
  });

  it('handles action type FLETES_TRAE_FLETES_DISMISS_ERROR correctly', () => {
    const prevState = { traeFletesError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: FLETES_TRAE_FLETES_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeFletesError).toBe(null);
  });
});

