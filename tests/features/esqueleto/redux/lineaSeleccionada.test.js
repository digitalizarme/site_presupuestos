import {
  ESQUELETO_LINEA_SELECCIONADA,
} from '../../../../src/features/esqueleto/redux/constants';

import {
  lineaSeleccionada,
  reducer,
} from '../../../../src/features/esqueleto/redux/lineaSeleccionada';

describe('esqueleto/redux/lineaSeleccionada', () => {
  it('returns correct action by lineaSeleccionada', () => {
    expect(lineaSeleccionada()).toHaveProperty('type', ESQUELETO_LINEA_SELECCIONADA);
  });

  it('handles action type ESQUELETO_LINEA_SELECCIONADA correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: ESQUELETO_LINEA_SELECCIONADA }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
