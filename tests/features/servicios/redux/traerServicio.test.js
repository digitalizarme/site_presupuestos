import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  SERVICIOS_TRAER_SERVICIO_BEGIN,
  SERVICIOS_TRAER_SERVICIO_SUCCESS,
  SERVICIOS_TRAER_SERVICIO_FAILURE,
  SERVICIOS_TRAER_SERVICIO_DISMISS_ERROR,
} from '../../../../src/features/servicios/redux/constants';

import {
  traerServicio,
  dismissTraerServicioError,
  reducer,
} from '../../../../src/features/servicios/redux/traerServicio';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('servicios/redux/traerServicio', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when traerServicio succeeds', () => {
    const store = mockStore({});

    return store.dispatch(traerServicio())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', SERVICIOS_TRAER_SERVICIO_BEGIN);
        expect(actions[1]).toHaveProperty('type', SERVICIOS_TRAER_SERVICIO_SUCCESS);
      });
  });

  it('dispatches failure action when traerServicio fails', () => {
    const store = mockStore({});

    return store.dispatch(traerServicio({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', SERVICIOS_TRAER_SERVICIO_BEGIN);
        expect(actions[1]).toHaveProperty('type', SERVICIOS_TRAER_SERVICIO_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissTraerServicioError', () => {
    const expectedAction = {
      type: SERVICIOS_TRAER_SERVICIO_DISMISS_ERROR,
    };
    expect(dismissTraerServicioError()).toEqual(expectedAction);
  });

  it('handles action type SERVICIOS_TRAER_SERVICIO_BEGIN correctly', () => {
    const prevState = { traerServicioPending: false };
    const state = reducer(
      prevState,
      { type: SERVICIOS_TRAER_SERVICIO_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traerServicioPending).toBe(true);
  });

  it('handles action type SERVICIOS_TRAER_SERVICIO_SUCCESS correctly', () => {
    const prevState = { traerServicioPending: true };
    const state = reducer(
      prevState,
      { type: SERVICIOS_TRAER_SERVICIO_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traerServicioPending).toBe(false);
  });

  it('handles action type SERVICIOS_TRAER_SERVICIO_FAILURE correctly', () => {
    const prevState = { traerServicioPending: true };
    const state = reducer(
      prevState,
      { type: SERVICIOS_TRAER_SERVICIO_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traerServicioPending).toBe(false);
    expect(state.traerServicioError).toEqual(expect.anything());
  });

  it('handles action type SERVICIOS_TRAER_SERVICIO_DISMISS_ERROR correctly', () => {
    const prevState = { traerServicioError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: SERVICIOS_TRAER_SERVICIO_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traerServicioError).toBe(null);
  });
});

