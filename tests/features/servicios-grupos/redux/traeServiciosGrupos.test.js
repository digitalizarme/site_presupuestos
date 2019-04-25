import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  SERVICIOS_GRUPOS_TRAE_SERVICIOS_GRUPOS_BEGIN,
  SERVICIOS_GRUPOS_TRAE_SERVICIOS_GRUPOS_SUCCESS,
  SERVICIOS_GRUPOS_TRAE_SERVICIOS_GRUPOS_FAILURE,
  SERVICIOS_GRUPOS_TRAE_SERVICIOS_GRUPOS_DISMISS_ERROR,
} from '../../../../src/features/servicios-grupos/redux/constants';

import {
  traeServiciosGrupos,
  dismissTraeServiciosGruposError,
  reducer,
} from '../../../../src/features/servicios-grupos/redux/traeServiciosGrupos';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('servicios-grupos/redux/traeServiciosGrupos', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when traeServiciosGrupos succeeds', () => {
    const store = mockStore({});

    return store.dispatch(traeServiciosGrupos())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', SERVICIOS_GRUPOS_TRAE_SERVICIOS_GRUPOS_BEGIN);
        expect(actions[1]).toHaveProperty('type', SERVICIOS_GRUPOS_TRAE_SERVICIOS_GRUPOS_SUCCESS);
      });
  });

  it('dispatches failure action when traeServiciosGrupos fails', () => {
    const store = mockStore({});

    return store.dispatch(traeServiciosGrupos({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', SERVICIOS_GRUPOS_TRAE_SERVICIOS_GRUPOS_BEGIN);
        expect(actions[1]).toHaveProperty('type', SERVICIOS_GRUPOS_TRAE_SERVICIOS_GRUPOS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissTraeServiciosGruposError', () => {
    const expectedAction = {
      type: SERVICIOS_GRUPOS_TRAE_SERVICIOS_GRUPOS_DISMISS_ERROR,
    };
    expect(dismissTraeServiciosGruposError()).toEqual(expectedAction);
  });

  it('handles action type SERVICIOS_GRUPO_TRAE_SERVICIOS_GRUPOS_BEGIN correctly', () => {
    const prevState = { traeServiciosGruposPending: false };
    const state = reducer(
      prevState,
      { type: SERVICIOS_GRUPOS_TRAE_SERVICIOS_GRUPOS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeServiciosGruposPending).toBe(true);
  });

  it('handles action type SERVICIOS_GRUPO_TRAE_SERVICIOS_GRUPOS_SUCCESS correctly', () => {
    const prevState = { traeServiciosGruposPending: true };
    const state = reducer(
      prevState,
      { type: SERVICIOS_GRUPOS_TRAE_SERVICIOS_GRUPOS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeServiciosGruposPending).toBe(false);
  });

  it('handles action type SERVICIOS_GRUPO_TRAE_SERVICIOS_GRUPOS_FAILURE correctly', () => {
    const prevState = { traeServiciosGruposPending: true };
    const state = reducer(
      prevState,
      { type: SERVICIOS_GRUPOS_TRAE_SERVICIOS_GRUPOS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeServiciosGruposPending).toBe(false);
    expect(state.traeServiciosGruposError).toEqual(expect.anything());
  });

  it('handles action type SERVICIOS_GRUPO_TRAE_SERVICIOS_GRUPOS_DISMISS_ERROR correctly', () => {
    const prevState = { traeServiciosGruposError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: SERVICIOS_GRUPOS_TRAE_SERVICIOS_GRUPOS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeServiciosGruposError).toBe(null);
  });
});

