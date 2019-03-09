import {
  ESQUELETO_MENU_TOGGLE,
} from '../../../../src/features/esqueleto/redux/constants';

import {
  menuToggle,
  reducer,
} from '../../../../src/features/esqueleto/redux/menuToggle';

describe('esqueleto/redux/menuToggle', () => {
  it('returns correct action by menuToggle', () => {
    expect(menuToggle()).toHaveProperty('type', ESQUELETO_MENU_TOGGLE);
  });

  it('handles action type ESQUELETO_MENU_TOGGLE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: ESQUELETO_MENU_TOGGLE }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
