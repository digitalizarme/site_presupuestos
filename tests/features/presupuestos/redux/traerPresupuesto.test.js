import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  PRESUPUESTOS_TRAER_PRESUPUESTO_BEGIN,
  PRESUPUESTOS_TRAER_PRESUPUESTO_SUCCESS,
  PRESUPUESTOS_TRAER_PRESUPUESTO_FAILURE,
  PRESUPUESTOS_TRAER_PRESUPUESTO_DISMISS_ERROR,
} from '../../../../src/features/presupuestos/redux/constants';

import {
  traerPresupuesto,
  dismissTraerPresupuestoError,
  reducer,
} from '../../../../src/features/presupuestos/redux/traerPresupuesto';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('presupuestos/redux/traerPresupuesto', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when traerPresupuesto succeeds', () => {
    const store = mockStore({});

    return store.dispatch(traerPresupuesto())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PRESUPUESTOS_TRAER_PRESUPUESTO_BEGIN);
        expect(actions[1]).toHaveProperty('type', PRESUPUESTOS_TRAER_PRESUPUESTO_SUCCESS);
      });
  });

  it('dispatches failure action when traerPresupuesto fails', () => {
    const store = mockStore({});

    return store.dispatch(traerPresupuesto({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PRESUPUESTOS_TRAER_PRESUPUESTO_BEGIN);
        expect(actions[1]).toHaveProperty('type', PRESUPUESTOS_TRAER_PRESUPUESTO_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissTraerPresupuestoError', () => {
    const expectedAction = {
      type: PRESUPUESTOS_TRAER_PRESUPUESTO_DISMISS_ERROR,
    };
    expect(dismissTraerPresupuestoError()).toEqual(expectedAction);
  });

  it('handles action type PRESUPUESTOS_TRAER_PRESUPUESTO_BEGIN correctly', () => {
    const prevState = { traerPresupuestoPending: false };
    const state = reducer(
      prevState,
      { type: PRESUPUESTOS_TRAER_PRESUPUESTO_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traerPresupuestoPending).toBe(true);
  });

  it('handles action type PRESUPUESTOS_TRAER_PRESUPUESTO_SUCCESS correctly', () => {
    const prevState = { traerPresupuestoPending: true };
    const state = reducer(
      prevState,
      { type: PRESUPUESTOS_TRAER_PRESUPUESTO_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traerPresupuestoPending).toBe(false);
  });

  it('handles action type PRESUPUESTOS_TRAER_PRESUPUESTO_FAILURE correctly', () => {
    const prevState = { traerPresupuestoPending: true };
    const state = reducer(
      prevState,
      { type: PRESUPUESTOS_TRAER_PRESUPUESTO_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traerPresupuestoPending).toBe(false);
    expect(state.traerPresupuestoError).toEqual(expect.anything());
  });

  it('handles action type PRESUPUESTOS_TRAER_PRESUPUESTO_DISMISS_ERROR correctly', () => {
    const prevState = { traerPresupuestoError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: PRESUPUESTOS_TRAER_PRESUPUESTO_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traerPresupuestoError).toBe(null);
  });
});

