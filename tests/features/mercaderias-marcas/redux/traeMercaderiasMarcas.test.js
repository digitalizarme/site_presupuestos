import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import {
  MERCADERIAS_MARCAS_TRAE_MERCADERIAS_MARCAS_BEGIN,
  MERCADERIAS_MARCAS_TRAE_MERCADERIAS_MARCAS_SUCCESS,
  MERCADERIAS_MARCAS_TRAE_MERCADERIAS_MARCAS_FAILURE,
  MERCADERIAS_MARCAS_TRAE_MERCADERIAS_MARCAS_DISMISS_ERROR,
} from '../../../../src/features/mercaderias-marcas/redux/constants';

import {
  traeMercaderiasMarcas,
  dismissTraeMercaderiasMarcasError,
  reducer,
} from '../../../../src/features/mercaderias-marcas/redux/traeMercaderiasMarcas';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('mercaderias-marcas/redux/traeMercaderiasMarcas', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('dispatches success action when traeMercaderiasMarcas succeeds', () => {
    const store = mockStore({});

    return store.dispatch(traeMercaderiasMarcas())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', MERCADERIAS_MARCAS_TRAE_MERCADERIAS_MARCAS_BEGIN);
        expect(actions[1]).toHaveProperty('type', MERCADERIAS_MARCAS_TRAE_MERCADERIAS_MARCAS_SUCCESS);
      });
  });

  it('dispatches failure action when traeMercaderiasMarcas fails', () => {
    const store = mockStore({});

    return store.dispatch(traeMercaderiasMarcas({ error: true }))
      .catch(() => {
        const actions = store.getActions();
        expect(actions[0]).toHaveProperty('type', MERCADERIAS_MARCAS_TRAE_MERCADERIAS_MARCAS_BEGIN);
        expect(actions[1]).toHaveProperty('type', MERCADERIAS_MARCAS_TRAE_MERCADERIAS_MARCAS_FAILURE);
        expect(actions[1]).toHaveProperty('data.error', expect.anything());
      });
  });

  it('returns correct action by dismissTraeMercaderiasMarcasError', () => {
    const expectedAction = {
      type: MERCADERIAS_MARCAS_TRAE_MERCADERIAS_MARCAS_DISMISS_ERROR,
    };
    expect(dismissTraeMercaderiasMarcasError()).toEqual(expectedAction);
  });

  it('handles action type MERCADERIAS_MARCAS_TRAE_MERCADERIAS_MARCAS_BEGIN correctly', () => {
    const prevState = { traeMercaderiasMarcasPending: false };
    const state = reducer(
      prevState,
      { type: MERCADERIAS_MARCAS_TRAE_MERCADERIAS_MARCAS_BEGIN }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeMercaderiasMarcasPending).toBe(true);
  });

  it('handles action type MERCADERIAS_MARCAS_TRAE_MERCADERIAS_MARCAS_SUCCESS correctly', () => {
    const prevState = { traeMercaderiasMarcasPending: true };
    const state = reducer(
      prevState,
      { type: MERCADERIAS_MARCAS_TRAE_MERCADERIAS_MARCAS_SUCCESS, data: {} }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeMercaderiasMarcasPending).toBe(false);
  });

  it('handles action type MERCADERIAS_MARCAS_TRAE_MERCADERIAS_MARCAS_FAILURE correctly', () => {
    const prevState = { traeMercaderiasMarcasPending: true };
    const state = reducer(
      prevState,
      { type: MERCADERIAS_MARCAS_TRAE_MERCADERIAS_MARCAS_FAILURE, data: { error: new Error('some error') } }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeMercaderiasMarcasPending).toBe(false);
    expect(state.traeMercaderiasMarcasError).toEqual(expect.anything());
  });

  it('handles action type MERCADERIAS_MARCAS_TRAE_MERCADERIAS_MARCAS_DISMISS_ERROR correctly', () => {
    const prevState = { traeMercaderiasMarcasError: new Error('some error') };
    const state = reducer(
      prevState,
      { type: MERCADERIAS_MARCAS_TRAE_MERCADERIAS_MARCAS_DISMISS_ERROR }
    );
    expect(state).not.toBe(prevState); // should be immutable
    expect(state.traeMercaderiasMarcasError).toBe(null);
  });
});

