import {
  ESQUELETO_INICIAR_CARGANDO,
} from '../../../../src/features/esqueleto/redux/constants';

import {
  iniciarCargando,
  reducer,
} from '../../../../src/features/esqueleto/redux/iniciarCargando';

describe('esqueleto/redux/iniciarCargando', () => {
  it('returns correct action by iniciarCargando', () => {
    expect(iniciarCargando()).toHaveProperty('type', ESQUELETO_INICIAR_CARGANDO);
  });

  it('handles action type ESQUELETO_INICIAR_CARGANDO correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: ESQUELETO_INICIAR_CARGANDO }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
