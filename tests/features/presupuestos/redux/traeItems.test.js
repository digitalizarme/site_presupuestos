import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  PRESUPUESTOS_TRAE_ITEMS_BEGIN,
  PRESUPUESTOS_TRAE_ITEMS_SUCCESS,
  PRESUPUESTOS_TRAE_ITEMS_FAILURE,
  PRESUPUESTOS_TRAE_ITEMS_DISMISS_ERROR,
} from '../../../../src/features/presupuestos/redux/constants';

import {
  traeItems,
  dismissTraeItemsError,
  reducer,
} from '../../../../src/features/presupuestos/redux/traeItems';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('presupuestos/redux/traeItems', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when traeItems succeeds', () => {
    const store = mockStore({});

    return store.dispatch(traeItems())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PRESUPUESTOS_TRAE_ITEMS_BEGIN);
        expect(actions[1]).toHaveProperty('type', PRESUPUESTOS_TRAE_ITEMS_SUCCESS);
      });
  });

  it('dispatches failure action when traeItems fails', () => {
    const store = mockStore({});

    return store.dispatch(traeItems({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', PRESUPUESTOS_TRAE_ITEMS_BEGIN);
        expect(actions[1]).toHaveProperty('type', PRESUPUESTOS_TRAE_ITEMS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissTraeItemsError', () => {
    const expectedAction = {
      type: PRESUPUESTOS_TRAE_ITEMS_DISMISS_ERROR,
    };
    expect(dismissTraeItemsError()).toEqual(expectedAction);
  });

  it('handles action type PRESUPUESTOS_TRAE_ITEMS_BEGIN correctly', () => {
    const prevState = { traeItemsPending: false };
    const state = reducer(
      prevState,
      { type: PRESUPUESTOS_TRAE_ITEMS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeItemsPending).toBe(true);
  });

  it('handles action type PRESUPUESTOS_TRAE_ITEMS_SUCCESS correctly', () => {
    const prevState = { traeItemsPending: true };
    const state = reducer(
      prevState,
      { type: PRESUPUESTOS_TRAE_ITEMS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeItemsPending).toBe(false);
  });

  it('handles action type PRESUPUESTOS_TRAE_ITEMS_FAILURE correctly', () => {
    const prevState = { traeItemsPending: true };
    const state = reducer(
      prevState,
      { type: PRESUPUESTOS_TRAE_ITEMS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeItemsPending).toBe(false);
    expect(state.traeItemsError).toEqual(expect.anything());
  });

  it('handles action type PRESUPUESTOS_TRAE_ITEMS_DISMISS_ERROR correctly', () => {
    const prevState = { traeItemsError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: PRESUPUESTOS_TRAE_ITEMS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeItemsError).toBe(null);
  });
});

