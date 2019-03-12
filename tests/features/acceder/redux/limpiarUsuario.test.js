import {
  ACCEDER_LIMPIAR_USUARIO,
} from '../../../../src/features/acceder/redux/constants';

import {
  limpiarUsuario,
  reducer,
} from '../../../../src/features/acceder/redux/limpiarUsuario';

describe('acceder/redux/limpiarUsuario', () => {
  it('returns correct action by limpiarUsuario', () => {
    expect(limpiarUsuario()).toHaveProperty('type', ACCEDER_LIMPIAR_USUARIO);
  });

  it('handles action type ACCEDER_LIMPIAR_USUARIO correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: ACCEDER_LIMPIAR_USUARIO }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
