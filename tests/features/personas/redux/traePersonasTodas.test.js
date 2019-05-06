import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  PERSONAS_TRAE_PERSONAS_TODAS_BEGIN,
  PERSONAS_TRAE_PERSONAS_TODAS_SUCCESS,
  PERSONAS_TRAE_PERSONAS_TODAS_FAILURE,
  PERSONAS_TRAE_PERSONAS_TODAS_DISMISS_ERROR,
} from '../../../../src/features/personas/redux/constants';

import {
  traePersonasTodas,
  dismissTraePersonasTodasError,
  reducer,
} from '../../../../src/features/personas/redux/traePersonasTodas';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('personas/redux/traePersonasTodas', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when traePersonasTodas succeeds', () => {
    const store = mockStore({});

    return store.dispatch(traePersonasTodas())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PERSONAS_TRAE_PERSONAS_TODAS_BEGIN);
        expect(actions[1]).toHaveProperty('type', PERSONAS_TRAE_PERSONAS_TODAS_SUCCESS);
      });
  });

  it('dispatches failure action when traePersonasTodas fails', () => {
    const store = mockStore({});

    return store.dispatch(traePersonasTodas({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PERSONAS_TRAE_PERSONAS_TODAS_BEGIN);
        expect(actions[1]).toHaveProperty('type', PERSONAS_TRAE_PERSONAS_TODAS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissTraePersonasTodasError', () => {
    const expectedAction = {
      type: PERSONAS_TRAE_PERSONAS_TODAS_DISMISS_ERROR,
    };
    expect(dismissTraePersonasTodasError()).toEqual(expectedAction);
  });

  it('handles action type PERSONAS_TRAE_PERSONAS_TODAS_BEGIN correctly', () => {
    const prevState = { traePersonasTodasPending: false };
    const state = reducer(
      prevState,
      { type: PERSONAS_TRAE_PERSONAS_TODAS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traePersonasTodasPending).toBe(true);
  });

  it('handles action type PERSONAS_TRAE_PERSONAS_TODAS_SUCCESS correctly', () => {
    const prevState = { traePersonasTodasPending: true };
    const state = reducer(
      prevState,
      { type: PERSONAS_TRAE_PERSONAS_TODAS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traePersonasTodasPending).toBe(false);
  });

  it('handles action type PERSONAS_TRAE_PERSONAS_TODAS_FAILURE correctly', () => {
    const prevState = { traePersonasTodasPending: true };
    const state = reducer(
      prevState,
      { type: PERSONAS_TRAE_PERSONAS_TODAS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traePersonasTodasPending).toBe(false);
    expect(state.traePersonasTodasError).toEqual(expect.anything());
  });

  it('handles action type PERSONAS_TRAE_PERSONAS_TODAS_DISMISS_ERROR correctly', () => {
    const prevState = { traePersonasTodasError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: PERSONAS_TRAE_PERSONAS_TODAS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traePersonasTodasError).toBe(null);
  });
});

