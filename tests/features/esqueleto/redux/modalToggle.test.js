import {
  ESQUELETO_MODAL_TOGGLE,
} from '../../../../src/features/esqueleto/redux/constants';

import {
  modalToggle,
  reducer,
} from '../../../../src/features/esqueleto/redux/modalToggle';

describe('esqueleto/redux/modalToggle', () => {
  it('returns correct action by modalToggle', () => {
    expect(modalToggle()).toHaveProperty('type', ESQUELETO_MODAL_TOGGLE);
  });

  it('handles action type ESQUELETO_MODAL_TOGGLE correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: ESQUELETO_MODAL_TOGGLE }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
