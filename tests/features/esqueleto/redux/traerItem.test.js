import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  ESQUELETO_TRAER_ITEM_BEGIN,
  ESQUELETO_TRAER_ITEM_SUCCESS,
  ESQUELETO_TRAER_ITEM_FAILURE,
  ESQUELETO_TRAER_ITEM_DISMISS_ERROR,
} from '../../../../src/features/esqueleto/redux/constants';

import {
  traerItem,
  dismissTraerItemError,
  reducer,
} from '../../../../src/features/esqueleto/redux/traerItem';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('esqueleto/redux/traerItem', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when traerItem succeeds', () => {
    const store = mockStore({});

    return store.dispatch(traerItem())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ESQUELETO_TRAER_ITEM_BEGIN);
        expect(actions[1]).toHaveProperty('type', ESQUELETO_TRAER_ITEM_SUCCESS);
      });
  });

  it('dispatches failure action when traerItem fails', () => {
    const store = mockStore({});

    return store.dispatch(traerItem({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', ESQUELETO_TRAER_ITEM_BEGIN);
        expect(actions[1]).toHaveProperty('type', ESQUELETO_TRAER_ITEM_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissTraerItemError', () => {
    const expectedAction = {
      type: ESQUELETO_TRAER_ITEM_DISMISS_ERROR,
    };
    expect(dismissTraerItemError()).toEqual(expectedAction);
  });

  it('handles action type ESQUELETO_TRAER_ITEM_BEGIN correctly', () => {
    const prevState = { traerItemPending: false };
    const state = reducer(
      prevState,
      { type: ESQUELETO_TRAER_ITEM_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traerItemPending).toBe(true);
  });

  it('handles action type ESQUELETO_TRAER_ITEM_SUCCESS correctly', () => {
    const prevState = { traerItemPending: true };
    const state = reducer(
      prevState,
      { type: ESQUELETO_TRAER_ITEM_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traerItemPending).toBe(false);
  });

  it('handles action type ESQUELETO_TRAER_ITEM_FAILURE correctly', () => {
    const prevState = { traerItemPending: true };
    const state = reducer(
      prevState,
      { type: ESQUELETO_TRAER_ITEM_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traerItemPending).toBe(false);
    expect(state.traerItemError).toEqual(expect.anything());
  });

  it('handles action type ESQUELETO_TRAER_ITEM_DISMISS_ERROR correctly', () => {
    const prevState = { traerItemError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: ESQUELETO_TRAER_ITEM_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traerItemError).toBe(null);
  });
});

