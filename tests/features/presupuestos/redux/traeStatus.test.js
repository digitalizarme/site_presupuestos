import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  PRESUPUESTOS_TRAE_STATUS_BEGIN,
  PRESUPUESTOS_TRAE_STATUS_SUCCESS,
  PRESUPUESTOS_TRAE_STATUS_FAILURE,
  PRESUPUESTOS_TRAE_STATUS_DISMISS_ERROR,
} from '../../../../src/features/presupuestos/redux/constants';

import {
  traeStatus,
  dismissTraeStatusError,
  reducer,
} from '../../../../src/features/presupuestos/redux/traeStatus';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('presupuestos/redux/traeStatus', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when traeStatus succeeds', () => {
    const store = mockStore({});

    return store.dispatch(traeStatus())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PRESUPUESTOS_TRAE_STATUS_BEGIN);
        expect(actions[1]).toHaveProperty('type', PRESUPUESTOS_TRAE_STATUS_SUCCESS);
      });
  });

  it('dispatches failure action when traeStatus fails', () => {
    const store = mockStore({});

    return store.dispatch(traeStatus({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PRESUPUESTOS_TRAE_STATUS_BEGIN);
        expect(actions[1]).toHaveProperty('type', PRESUPUESTOS_TRAE_STATUS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissTraeStatusError', () => {
    const expectedAction = {
      type: PRESUPUESTOS_TRAE_STATUS_DISMISS_ERROR,
    };
    expect(dismissTraeStatusError()).toEqual(expectedAction);
  });

  it('handles action type PRESUPUESTOS_TRAE_STATUS_BEGIN correctly', () => {
    const prevState = { traeStatusPending: false };
    const state = reducer(
      prevState,
      { type: PRESUPUESTOS_TRAE_STATUS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeStatusPending).toBe(true);
  });

  it('handles action type PRESUPUESTOS_TRAE_STATUS_SUCCESS correctly', () => {
    const prevState = { traeStatusPending: true };
    const state = reducer(
      prevState,
      { type: PRESUPUESTOS_TRAE_STATUS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeStatusPending).toBe(false);
  });

  it('handles action type PRESUPUESTOS_TRAE_STATUS_FAILURE correctly', () => {
    const prevState = { traeStatusPending: true };
    const state = reducer(
      prevState,
      { type: PRESUPUESTOS_TRAE_STATUS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeStatusPending).toBe(false);
    expect(state.traeStatusError).toEqual(expect.anything());
  });

  it('handles action type PRESUPUESTOS_TRAE_STATUS_DISMISS_ERROR correctly', () => {
    const prevState = { traeStatusError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: PRESUPUESTOS_TRAE_STATUS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeStatusError).toBe(null);
  });
});

