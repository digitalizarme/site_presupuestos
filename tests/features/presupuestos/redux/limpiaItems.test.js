import {
  PRESUPUESTOS_LIMPIA_ITEMS,
} from '../../../../src/features/presupuestos/redux/constants';

import {
  limpiaItems,
  reducer,
} from '../../../../src/features/presupuestos/redux/limpiaItems';

describe('presupuestos/redux/limpiaItems', () => {
  it('returns correct action by limpiaItems', () => {
    expect(limpiaItems()).toHaveProperty('type', PRESUPUESTOS_LIMPIA_ITEMS);
  });

  it('handles action type PRESUPUESTOS_LIMPIA_ITEMS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: PRESUPUESTOS_LIMPIA_ITEMS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
