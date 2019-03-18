import {
  ACCEDER_SETA_USUARIO_PERSONA,
} from '../../../../src/features/acceder/redux/constants';

import {
  setaUsuarioPersona,
  reducer,
} from '../../../../src/features/acceder/redux/setaUsuarioPersona';

describe('acceder/redux/setaUsuarioPersona', () => {
  it('returns correct action by setaUsuarioPersona', () => {
    expect(setaUsuarioPersona()).toHaveProperty('type', ACCEDER_SETA_USUARIO_PERSONA);
  });

  it('handles action type ACCEDER_SETA_USUARIO_PERSONA correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: ACCEDER_SETA_USUARIO_PERSONA }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
