import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  PERSONAS_TRAER_PERSONAS_BEGIN,
  PERSONAS_TRAER_PERSONAS_SUCCESS,
  PERSONAS_TRAER_PERSONAS_FAILURE,
  PERSONAS_TRAER_PERSONAS_DISMISS_ERROR,
} from '../../../../src/features/personas/redux/constants';

import {
  traerPersonas,
  dismissTraerPersonasError,
  reducer,
} from '../../../../src/features/personas/redux/traerPersonas';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('personas/redux/traerPersonas', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when traerPersonas succeeds', () => {
    const store = mockStore({});

    return store.dispatch(traerPersonas())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PERSONAS_TRAER_PERSONAS_BEGIN);
        expect(actions[1]).toHaveProperty('type', PERSONAS_TRAER_PERSONAS_SUCCESS);
      });
  });

  it('dispatches failure action when traerPersonas fails', () => {
    const store = mockStore({});

    return store.dispatch(traerPersonas({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PERSONAS_TRAER_PERSONAS_BEGIN);
        expect(actions[1]).toHaveProperty('type', PERSONAS_TRAER_PERSONAS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissTraerPersonasError', () => {
    const expectedAction = {
      type: PERSONAS_TRAER_PERSONAS_DISMISS_ERROR,
    };
    expect(dismissTraerPersonasError()).toEqual(expectedAction);
  });

  it('handles action type PERSONAS_TRAER_PERSONAS_BEGIN correctly', () => {
    const prevState = { traerPersonasPending: false };
    const state = reducer(
      prevState,
      { type: PERSONAS_TRAER_PERSONAS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traerPersonasPending).toBe(true);
  });

  it('handles action type PERSONAS_TRAER_PERSONAS_SUCCESS correctly', () => {
    const prevState = { traerPersonasPending: true };
    const state = reducer(
      prevState,
      { type: PERSONAS_TRAER_PERSONAS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traerPersonasPending).toBe(false);
  });

  it('handles action type PERSONAS_TRAER_PERSONAS_FAILURE correctly', () => {
    const prevState = { traerPersonasPending: true };
    const state = reducer(
      prevState,
      { type: PERSONAS_TRAER_PERSONAS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traerPersonasPending).toBe(false);
    expect(state.traerPersonasError).toEqual(expect.anything());
  });

  it('handles action type PERSONAS_TRAER_PERSONAS_DISMISS_ERROR correctly', () => {
    const prevState = { traerPersonasError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: PERSONAS_TRAER_PERSONAS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traerPersonasError).toBe(null);
  });
});

