import {
  PERSONAS_LIMPIAR_PERSONA,
} from '../../../../src/features/personas/redux/constants';

import {
  limpiarPersona,
  reducer,
} from '../../../../src/features/personas/redux/limpiarPersona';

describe('personas/redux/limpiarPersona', () => {
  it('returns correct action by limpiarPersona', () => {
    expect(limpiarPersona()).toHaveProperty('type', PERSONAS_LIMPIAR_PERSONA);
  });

  it('handles action type PERSONAS_LIMPIAR_PERSONA correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: PERSONAS_LIMPIAR_PERSONA }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
