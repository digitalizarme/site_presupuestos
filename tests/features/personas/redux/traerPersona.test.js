import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  PERSONAS_TRAER_PERSONA_BEGIN,
  PERSONAS_TRAER_PERSONA_SUCCESS,
  PERSONAS_TRAER_PERSONA_FAILURE,
  PERSONAS_TRAER_PERSONA_DISMISS_ERROR,
} from '../../../../src/features/personas/redux/constants';

import {
  traerPersona,
  dismissTraerPersonaError,
  reducer,
} from '../../../../src/features/personas/redux/traerPersona';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('personas/redux/traerPersona', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when traerPersona succeeds', () => {
    const store = mockStore({});

    return store.dispatch(traerPersona())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PERSONAS_TRAER_PERSONA_BEGIN);
        expect(actions[1]).toHaveProperty('type', PERSONAS_TRAER_PERSONA_SUCCESS);
      });
  });

  it('dispatches failure action when traerPersona fails', () => {
    const store = mockStore({});

    return store.dispatch(traerPersona({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PERSONAS_TRAER_PERSONA_BEGIN);
        expect(actions[1]).toHaveProperty('type', PERSONAS_TRAER_PERSONA_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissTraerPersonaError', () => {
    const expectedAction = {
      type: PERSONAS_TRAER_PERSONA_DISMISS_ERROR,
    };
    expect(dismissTraerPersonaError()).toEqual(expectedAction);
  });

  it('handles action type PERSONAS_TRAER_PERSONA_BEGIN correctly', () => {
    const prevState = { traerPersonaPending: false };
    const state = reducer(
      prevState,
      { type: PERSONAS_TRAER_PERSONA_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traerPersonaPending).toBe(true);
  });

  it('handles action type PERSONAS_TRAER_PERSONA_SUCCESS correctly', () => {
    const prevState = { traerPersonaPending: true };
    const state = reducer(
      prevState,
      { type: PERSONAS_TRAER_PERSONA_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traerPersonaPending).toBe(false);
  });

  it('handles action type PERSONAS_TRAER_PERSONA_FAILURE correctly', () => {
    const prevState = { traerPersonaPending: true };
    const state = reducer(
      prevState,
      { type: PERSONAS_TRAER_PERSONA_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traerPersonaPending).toBe(false);
    expect(state.traerPersonaError).toEqual(expect.anything());
  });

  it('handles action type PERSONAS_TRAER_PERSONA_DISMISS_ERROR correctly', () => {
    const prevState = { traerPersonaError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: PERSONAS_TRAER_PERSONA_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traerPersonaError).toBe(null);
  });
});

