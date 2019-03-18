import {
  ACCEDER_SETA_USUARIO,
} from '../../../../src/features/acceder/redux/constants';

import {
  setaUsuario,
  reducer,
} from '../../../../src/features/acceder/redux/setaUsuario';

describe('acceder/redux/setaUsuario', () => {
  it('returns correct action by setaUsuario', () => {
    expect(setaUsuario()).toHaveProperty('type', ACCEDER_SETA_USUARIO);
  });

  it('handles action type ACCEDER_SETA_USUARIO correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: ACCEDER_SETA_USUARIO }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
