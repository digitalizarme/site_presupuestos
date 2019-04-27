import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  MERCADERIAS_TRAER_MERCADERIA_BEGIN,
  MERCADERIAS_TRAER_MERCADERIA_SUCCESS,
  MERCADERIAS_TRAER_MERCADERIA_FAILURE,
  MERCADERIAS_TRAER_MERCADERIA_DISMISS_ERROR,
} from '../../../../src/features/mercaderias/redux/constants';

import {
  traerMercaderia,
  dismissTraerMercaderiaError,
  reducer,
} from '../../../../src/features/mercaderias/redux/traerMercaderia';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('mercaderias/redux/traerMercaderia', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when traerMercaderia succeeds', () => {
    const store = mockStore({});

    return store.dispatch(traerMercaderia())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', MERCADERIAS_TRAER_MERCADERIA_BEGIN);
        expect(actions[1]).toHaveProperty('type', MERCADERIAS_TRAER_MERCADERIA_SUCCESS);
      });
  });

  it('dispatches failure action when traerMercaderia fails', () => {
    const store = mockStore({});

    return store.dispatch(traerMercaderia({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', MERCADERIAS_TRAER_MERCADERIA_BEGIN);
        expect(actions[1]).toHaveProperty('type', MERCADERIAS_TRAER_MERCADERIA_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissTraerMercaderiaError', () => {
    const expectedAction = {
      type: MERCADERIAS_TRAER_MERCADERIA_DISMISS_ERROR,
    };
    expect(dismissTraerMercaderiaError()).toEqual(expectedAction);
  });

  it('handles action type MERCADERIAS_TRAER_MERCADERIA_BEGIN correctly', () => {
    const prevState = { traerMercaderiaPending: false };
    const state = reducer(
      prevState,
      { type: MERCADERIAS_TRAER_MERCADERIA_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traerMercaderiaPending).toBe(true);
  });

  it('handles action type MERCADERIAS_TRAER_MERCADERIA_SUCCESS correctly', () => {
    const prevState = { traerMercaderiaPending: true };
    const state = reducer(
      prevState,
      { type: MERCADERIAS_TRAER_MERCADERIA_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traerMercaderiaPending).toBe(false);
  });

  it('handles action type MERCADERIAS_TRAER_MERCADERIA_FAILURE correctly', () => {
    const prevState = { traerMercaderiaPending: true };
    const state = reducer(
      prevState,
      { type: MERCADERIAS_TRAER_MERCADERIA_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traerMercaderiaPending).toBe(false);
    expect(state.traerMercaderiaError).toEqual(expect.anything());
  });

  it('handles action type MERCADERIAS_TRAER_MERCADERIA_DISMISS_ERROR correctly', () => {
    const prevState = { traerMercaderiaError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: MERCADERIAS_TRAER_MERCADERIA_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traerMercaderiaError).toBe(null);
  });
});

