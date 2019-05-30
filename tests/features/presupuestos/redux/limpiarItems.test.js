import {
  PRESUPUESTOS_LIMPIAR_ITEMS,
} from '../../../../src/features/presupuestos/redux/constants';

import {
  limpiarItems,
  reducer,
} from '../../../../src/features/presupuestos/redux/limpiarItems';

describe('presupuestos/redux/limpiarItems', () => {
  it('returns correct action by limpiarItems', () => {
    expect(limpiarItems()).toHaveProperty('type', PRESUPUESTOS_LIMPIAR_ITEMS);
  });

  it('handles action type PRESUPUESTOS_LIMPIAR_ITEMS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: PRESUPUESTOS_LIMPIAR_ITEMS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
