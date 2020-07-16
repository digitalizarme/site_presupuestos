import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  INFORMES_TRAER_COMISIONES_BEGIN,
  INFORMES_TRAER_COMISIONES_SUCCESS,
  INFORMES_TRAER_COMISIONES_FAILURE,
  INFORMES_TRAER_COMISIONES_DISMISS_ERROR,
} from '../../../../src/features/informes/redux/constants';

import {
  traerComisiones,
  dismissTraerComisionesError,
  reducer,
} from '../../../../src/features/informes/redux/traerComisiones';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('informes/redux/traerComisiones', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when traerComisiones succeeds', () => {
    const store = mockStore({});

    return store.dispatch(traerComisiones())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', INFORMES_TRAER_COMISIONES_BEGIN);
        expect(actions[1]).toHaveProperty('type', INFORMES_TRAER_COMISIONES_SUCCESS);
      });
  });

  it('dispatches failure action when traerComisiones fails', () => {
    const store = mockStore({});

    return store.dispatch(traerComisiones({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', INFORMES_TRAER_COMISIONES_BEGIN);
        expect(actions[1]).toHaveProperty('type', INFORMES_TRAER_COMISIONES_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissTraerComisionesError', () => {
    const expectedAction = {
      type: INFORMES_TRAER_COMISIONES_DISMISS_ERROR,
    };
    expect(dismissTraerComisionesError()).toEqual(expectedAction);
  });

  it('handles action type INFORMES_TRAER_COMISIONES_BEGIN correctly', () => {
    const prevState = { traerComisionesPending: false };
    const state = reducer(
      prevState,
      { type: INFORMES_TRAER_COMISIONES_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traerComisionesPending).toBe(true);
  });

  it('handles action type INFORMES_TRAER_COMISIONES_SUCCESS correctly', () => {
    const prevState = { traerComisionesPending: true };
    const state = reducer(
      prevState,
      { type: INFORMES_TRAER_COMISIONES_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traerComisionesPending).toBe(false);
  });

  it('handles action type INFORMES_TRAER_COMISIONES_FAILURE correctly', () => {
    const prevState = { traerComisionesPending: true };
    const state = reducer(
      prevState,
      { type: INFORMES_TRAER_COMISIONES_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traerComisionesPending).toBe(false);
    expect(state.traerComisionesError).toEqual(expect.anything());
  });

  it('handles action type INFORMES_TRAER_COMISIONES_DISMISS_ERROR correctly', () => {
    const prevState = { traerComisionesError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: INFORMES_TRAER_COMISIONES_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traerComisionesError).toBe(null);
  });
});

