import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  MERCADERIAS_SUB_GRUPOS_TRAE_MERCADERIAS_SUB_GRUPOS_BEGIN,
  MERCADERIAS_SUB_GRUPOS_TRAE_MERCADERIAS_SUB_GRUPOS_SUCCESS,
  MERCADERIAS_SUB_GRUPOS_TRAE_MERCADERIAS_SUB_GRUPOS_FAILURE,
  MERCADERIAS_SUB_GRUPOS_TRAE_MERCADERIAS_SUB_GRUPOS_DISMISS_ERROR,
} from '../../../../src/features/mercaderias-sub-grupos/redux/constants';

import {
  traeMercaderiasSubGrupos,
  dismissTraeMercaderiasSubGruposError,
  reducer,
} from '../../../../src/features/mercaderias-sub-grupos/redux/traeMercaderiasSubGrupos';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('mercaderias-sub-grupos/redux/traeMercaderiasSubGrupos', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when traeMercaderiasSubGrupos succeeds', () => {
    const store = mockStore({});

    return store.dispatch(traeMercaderiasSubGrupos())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', MERCADERIAS_SUB_GRUPOS_TRAE_MERCADERIAS_SUB_GRUPOS_BEGIN);
        expect(actions[1]).toHaveProperty('type', MERCADERIAS_SUB_GRUPOS_TRAE_MERCADERIAS_SUB_GRUPOS_SUCCESS);
      });
  });

  it('dispatches failure action when traeMercaderiasSubGrupos fails', () => {
    const store = mockStore({});

    return store.dispatch(traeMercaderiasSubGrupos({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', MERCADERIAS_SUB_GRUPOS_TRAE_MERCADERIAS_SUB_GRUPOS_BEGIN);
        expect(actions[1]).toHaveProperty('type', MERCADERIAS_SUB_GRUPOS_TRAE_MERCADERIAS_SUB_GRUPOS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissTraeMercaderiasSubGruposError', () => {
    const expectedAction = {
      type: MERCADERIAS_SUB_GRUPOS_TRAE_MERCADERIAS_SUB_GRUPOS_DISMISS_ERROR,
    };
    expect(dismissTraeMercaderiasSubGruposError()).toEqual(expectedAction);
  });

  it('handles action type MERCADERIAS_SUB_GRUPOS_TRAE_MERCADERIAS_SUB_GRUPOS_BEGIN correctly', () => {
    const prevState = { traeMercaderiasSubGruposPending: false };
    const state = reducer(
      prevState,
      { type: MERCADERIAS_SUB_GRUPOS_TRAE_MERCADERIAS_SUB_GRUPOS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeMercaderiasSubGruposPending).toBe(true);
  });

  it('handles action type MERCADERIAS_SUB_GRUPOS_TRAE_MERCADERIAS_SUB_GRUPOS_SUCCESS correctly', () => {
    const prevState = { traeMercaderiasSubGruposPending: true };
    const state = reducer(
      prevState,
      { type: MERCADERIAS_SUB_GRUPOS_TRAE_MERCADERIAS_SUB_GRUPOS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeMercaderiasSubGruposPending).toBe(false);
  });

  it('handles action type MERCADERIAS_SUB_GRUPOS_TRAE_MERCADERIAS_SUB_GRUPOS_FAILURE correctly', () => {
    const prevState = { traeMercaderiasSubGruposPending: true };
    const state = reducer(
      prevState,
      { type: MERCADERIAS_SUB_GRUPOS_TRAE_MERCADERIAS_SUB_GRUPOS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeMercaderiasSubGruposPending).toBe(false);
    expect(state.traeMercaderiasSubGruposError).toEqual(expect.anything());
  });

  it('handles action type MERCADERIAS_SUB_GRUPOS_TRAE_MERCADERIAS_SUB_GRUPOS_DISMISS_ERROR correctly', () => {
    const prevState = { traeMercaderiasSubGruposError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: MERCADERIAS_SUB_GRUPOS_TRAE_MERCADERIAS_SUB_GRUPOS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeMercaderiasSubGruposError).toBe(null);
  });
});

