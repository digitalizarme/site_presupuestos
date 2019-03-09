import {
  ESQUELETO_LIMPIAR_ITEM_LINEA,
} from '../../../../src/features/esqueleto/redux/constants';

import {
  limpiarItemLinea,
  reducer,
} from '../../../../src/features/esqueleto/redux/limpiarItemLinea';

describe('esqueleto/redux/limpiarItemLinea', () => {
  it('returns correct action by limpiarItemLinea', () => {
    expect(limpiarItemLinea()).toHaveProperty('type', ESQUELETO_LIMPIAR_ITEM_LINEA);
  });

  it('handles action type ESQUELETO_LIMPIAR_ITEM_LINEA correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: ESQUELETO_LIMPIAR_ITEM_LINEA }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
