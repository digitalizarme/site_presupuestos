import {
  ESQUELETO_SETA_IMG,
} from '../../../../src/features/esqueleto/redux/constants';

import {
  setaImg,
  reducer,
} from '../../../../src/features/esqueleto/redux/setaImg';

describe('esqueleto/redux/setaImg', () => {
  it('returns correct action by setaImg', () => {
    expect(setaImg()).toHaveProperty('type', ESQUELETO_SETA_IMG);
  });

  it('handles action type ESQUELETO_SETA_IMG correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: ESQUELETO_SETA_IMG }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
