import {
  ESQUELETO_LIMPIAR_ITEM,
} from '../../../../src/features/esqueleto/redux/constants';

import {
  limpiarItem,
  reducer,
} from '../../../../src/features/esqueleto/redux/limpiarItem';

describe('esqueleto/redux/limpiarItem', () => {
  it('returns correct action by limpiarItem', () => {
    expect(limpiarItem()).toHaveProperty('type', ESQUELETO_LIMPIAR_ITEM);
  });

  it('handles action type ESQUELETO_LIMPIAR_ITEM correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: ESQUELETO_LIMPIAR_ITEM }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
