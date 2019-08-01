import {
  PRESUPUESTOS_LIMPIA_CUOTAS,
} from '../../../../src/features/presupuestos/redux/constants';

import {
  limpiaCuotas,
  reducer,
} from '../../../../src/features/presupuestos/redux/limpiaCuotas';

describe('presupuestos/redux/limpiaCuotas', () => {
  it('returns correct action by limpiaCuotas', () => {
    expect(limpiaCuotas()).toHaveProperty('type', PRESUPUESTOS_LIMPIA_CUOTAS);
  });

  it('handles action type PRESUPUESTOS_LIMPIA_CUOTAS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: PRESUPUESTOS_LIMPIA_CUOTAS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
