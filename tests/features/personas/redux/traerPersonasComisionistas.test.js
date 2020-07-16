import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  PERSONAS_TRAER_PERSONAS_COMISIONISTAS_BEGIN,
  PERSONAS_TRAER_PERSONAS_COMISIONISTAS_SUCCESS,
  PERSONAS_TRAER_PERSONAS_COMISIONISTAS_FAILURE,
  PERSONAS_TRAER_PERSONAS_COMISIONISTAS_DISMISS_ERROR,
} from '../../../../src/features/personas/redux/constants';

import {
  traerPersonasComisionistas,
  dismissTraerPersonasComisionistasError,
  reducer,
} from '../../../../src/features/personas/redux/traerPersonasComisionistas';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('personas/redux/traerPersonasComisionistas', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when traerPersonasComisionistas succeeds', () => {
    const store = mockStore({});

    return store.dispatch(traerPersonasComisionistas())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PERSONAS_TRAER_PERSONAS_COMISIONISTAS_BEGIN);
        expect(actions[1]).toHaveProperty('type', PERSONAS_TRAER_PERSONAS_COMISIONISTAS_SUCCESS);
      });
  });

  it('dispatches failure action when traerPersonasComisionistas fails', () => {
    const store = mockStore({});

    return store.dispatch(traerPersonasComisionistas({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PERSONAS_TRAER_PERSONAS_COMISIONISTAS_BEGIN);
        expect(actions[1]).toHaveProperty('type', PERSONAS_TRAER_PERSONAS_COMISIONISTAS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissTraerPersonasComisionistasError', () => {
    const expectedAction = {
      type: PERSONAS_TRAER_PERSONAS_COMISIONISTAS_DISMISS_ERROR,
    };
    expect(dismissTraerPersonasComisionistasError()).toEqual(expectedAction);
  });

  it('handles action type PERSONAS_TRAER_PERSONAS_COMISIONISTAS_BEGIN correctly', () => {
    const prevState = { traerPersonasComisionistasPending: false };
    const state = reducer(
      prevState,
      { type: PERSONAS_TRAER_PERSONAS_COMISIONISTAS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traerPersonasComisionistasPending).toBe(true);
  });

  it('handles action type PERSONAS_TRAER_PERSONAS_COMISIONISTAS_SUCCESS correctly', () => {
    const prevState = { traerPersonasComisionistasPending: true };
    const state = reducer(
      prevState,
      { type: PERSONAS_TRAER_PERSONAS_COMISIONISTAS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traerPersonasComisionistasPending).toBe(false);
  });

  it('handles action type PERSONAS_TRAER_PERSONAS_COMISIONISTAS_FAILURE correctly', () => {
    const prevState = { traerPersonasComisionistasPending: true };
    const state = reducer(
      prevState,
      { type: PERSONAS_TRAER_PERSONAS_COMISIONISTAS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traerPersonasComisionistasPending).toBe(false);
    expect(state.traerPersonasComisionistasError).toEqual(expect.anything());
  });

  it('handles action type PERSONAS_TRAER_PERSONAS_COMISIONISTAS_DISMISS_ERROR correctly', () => {
    const prevState = { traerPersonasComisionistasError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: PERSONAS_TRAER_PERSONAS_COMISIONISTAS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traerPersonasComisionistasError).toBe(null);
  });
});

