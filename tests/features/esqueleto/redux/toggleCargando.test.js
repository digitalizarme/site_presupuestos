import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  ESQUELETO_TOGGLE_CARGANDO_BEGIN,
  ESQUELETO_TOGGLE_CARGANDO_SUCCESS,
  ESQUELETO_TOGGLE_CARGANDO_FAILURE,
  ESQUELETO_TOGGLE_CARGANDO_DISMISS_ERROR,
} from '../../../../src/features/esqueleto/redux/constants';

import {
  toggleCargando,
  dismissToggleCargandoError,
  reducer,
} from '../../../../src/features/esqueleto/redux/toggleCargando';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('esqueleto/redux/toggleCargando', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when toggleCargando succeeds', () => {
    const store = mockStore({});

    return store.dispatch(toggleCargando())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ESQUELETO_TOGGLE_CARGANDO_BEGIN);
        expect(actions[1]).toHaveProperty('type', ESQUELETO_TOGGLE_CARGANDO_SUCCESS);
      });
  });

  it('dispatches failure action when toggleCargando fails', () => {
    const store = mockStore({});

    return store.dispatch(toggleCargando({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ESQUELETO_TOGGLE_CARGANDO_BEGIN);
        expect(actions[1]).toHaveProperty('type', ESQUELETO_TOGGLE_CARGANDO_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissToggleCargandoError', () => {
    const expectedAction = {
      type: ESQUELETO_TOGGLE_CARGANDO_DISMISS_ERROR,
    };
    expect(dismissToggleCargandoError()).toEqual(expectedAction);
  });

  it('handles action type ESQUELETO_TOGGLE_CARGANDO_BEGIN correctly', () => {
    const prevState = { toggleCargandoPending: false };
    const state = reducer(
      prevState,
      { type: ESQUELETO_TOGGLE_CARGANDO_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.toggleCargandoPending).toBe(true);
  });

  it('handles action type ESQUELETO_TOGGLE_CARGANDO_SUCCESS correctly', () => {
    const prevState = { toggleCargandoPending: true };
    const state = reducer(
      prevState,
      { type: ESQUELETO_TOGGLE_CARGANDO_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.toggleCargandoPending).toBe(false);
  });

  it('handles action type ESQUELETO_TOGGLE_CARGANDO_FAILURE correctly', () => {
    const prevState = { toggleCargandoPending: true };
    const state = reducer(
      prevState,
      { type: ESQUELETO_TOGGLE_CARGANDO_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.toggleCargandoPending).toBe(false);
    expect(state.toggleCargandoError).toEqual(expect.anything());
  });

  it('handles action type ESQUELETO_TOGGLE_CARGANDO_DISMISS_ERROR correctly', () => {
    const prevState = { toggleCargandoError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ESQUELETO_TOGGLE_CARGANDO_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.toggleCargandoError).toBe(null);
  });
});

