import {
  SERVICIOS_LIMPIAR_SERVICIO,
} from '../../../../src/features/servicios/redux/constants';

import {
  limpiarServicio,
  reducer,
} from '../../../../src/features/servicios/redux/limpiarServicio';

describe('servicios/redux/limpiarServicio', () => {
  it('returns correct action by limpiarServicio', () => {
    expect(limpiarServicio()).toHaveProperty('type', SERVICIOS_LIMPIAR_SERVICIO);
  });

  it('handles action type SERVICIOS_LIMPIAR_SERVICIO correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: SERVICIOS_LIMPIAR_SERVICIO }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
