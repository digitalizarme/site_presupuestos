import {
  ESQUELETO_LIMPIAR_LINEA_SELECCIONADA,
} from '../../../../src/features/esqueleto/redux/constants';

import {
  limpiarLineaSeleccionada,
  reducer,
} from '../../../../src/features/esqueleto/redux/limpiarLineaSeleccionada';

describe('esqueleto/redux/limpiarLineaSeleccionada', () => {
  it('returns correct action by limpiarLineaSeleccionada', () => {
    expect(limpiarLineaSeleccionada()).toHaveProperty('type', ESQUELETO_LIMPIAR_LINEA_SELECCIONADA);
  });

  it('handles action type ESQUELETO_LIMPIAR_LINEA_SELECCIONADA correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: ESQUELETO_LIMPIAR_LINEA_SELECCIONADA }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
