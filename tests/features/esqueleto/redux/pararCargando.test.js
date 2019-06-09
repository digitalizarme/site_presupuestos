import {
  ESQUELETO_PARAR_CARGANDO,
} from '../../../../src/features/esqueleto/redux/constants';

import {
  pararCargando,
  reducer,
} from '../../../../src/features/esqueleto/redux/pararCargando';

describe('esqueleto/redux/pararCargando', () => {
  it('returns correct action by pararCargando', () => {
    expect(pararCargando()).toHaveProperty('type', ESQUELETO_PARAR_CARGANDO);
  });

  it('handles action type ESQUELETO_PARAR_CARGANDO correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: ESQUELETO_PARAR_CARGANDO }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
