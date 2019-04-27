import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  MERCADERIAS_GRUPOS_TRAE_MERCADERIAS_GRUPOS_BEGIN,
  MERCADERIAS_GRUPOS_TRAE_MERCADERIAS_GRUPOS_SUCCESS,
  MERCADERIAS_GRUPOS_TRAE_MERCADERIAS_GRUPOS_FAILURE,
  MERCADERIAS_GRUPOS_TRAE_MERCADERIAS_GRUPOS_DISMISS_ERROR,
} from '../../../../src/features/mercaderias-grupos/redux/constants';

import {
  traeMercaderiasGrupos,
  dismissTraeMercaderiasGruposError,
  reducer,
} from '../../../../src/features/mercaderias-grupos/redux/traeMercaderiasGrupos';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('mercaderias-grupos/redux/traeMercaderiasGrupos', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when traeMercaderiasGrupos succeeds', () => {
    const store = mockStore({});

    return store.dispatch(traeMercaderiasGrupos())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', MERCADERIAS_GRUPOS_TRAE_MERCADERIAS_GRUPOS_BEGIN);
        expect(actions[1]).toHaveProperty('type', MERCADERIAS_GRUPOS_TRAE_MERCADERIAS_GRUPOS_SUCCESS);
      });
  });

  it('dispatches failure action when traeMercaderiasGrupos fails', () => {
    const store = mockStore({});

    return store.dispatch(traeMercaderiasGrupos({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', MERCADERIAS_GRUPOS_TRAE_MERCADERIAS_GRUPOS_BEGIN);
        expect(actions[1]).toHaveProperty('type', MERCADERIAS_GRUPOS_TRAE_MERCADERIAS_GRUPOS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissTraeMercaderiasGruposError', () => {
    const expectedAction = {
      type: MERCADERIAS_GRUPOS_TRAE_MERCADERIAS_GRUPOS_DISMISS_ERROR,
    };
    expect(dismissTraeMercaderiasGruposError()).toEqual(expectedAction);
  });

  it('handles action type MERCADERIAS_GRUPOS_TRAE_MERCADERIAS_GRUPOS_BEGIN correctly', () => {
    const prevState = { traeMercaderiasGruposPending: false };
    const state = reducer(
      prevState,
      { type: MERCADERIAS_GRUPOS_TRAE_MERCADERIAS_GRUPOS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeMercaderiasGruposPending).toBe(true);
  });

  it('handles action type MERCADERIAS_GRUPOS_TRAE_MERCADERIAS_GRUPOS_SUCCESS correctly', () => {
    const prevState = { traeMercaderiasGruposPending: true };
    const state = reducer(
      prevState,
      { type: MERCADERIAS_GRUPOS_TRAE_MERCADERIAS_GRUPOS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeMercaderiasGruposPending).toBe(false);
  });

  it('handles action type MERCADERIAS_GRUPOS_TRAE_MERCADERIAS_GRUPOS_FAILURE correctly', () => {
    const prevState = { traeMercaderiasGruposPending: true };
    const state = reducer(
      prevState,
      { type: MERCADERIAS_GRUPOS_TRAE_MERCADERIAS_GRUPOS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeMercaderiasGruposPending).toBe(false);
    expect(state.traeMercaderiasGruposError).toEqual(expect.anything());
  });

  it('handles action type MERCADERIAS_GRUPOS_TRAE_MERCADERIAS_GRUPOS_DISMISS_ERROR correctly', () => {
    const prevState = { traeMercaderiasGruposError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: MERCADERIAS_GRUPOS_TRAE_MERCADERIAS_GRUPOS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeMercaderiasGruposError).toBe(null);
  });
});

