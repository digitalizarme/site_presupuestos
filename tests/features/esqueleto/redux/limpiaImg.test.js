import {
  ESQUELETO_LIMPIA_IMG,
} from '../../../../src/features/esqueleto/redux/constants';

import {
  limpiaImg,
  reducer,
} from '../../../../src/features/esqueleto/redux/limpiaImg';

describe('esqueleto/redux/limpiaImg', () => {
  it('returns correct action by limpiaImg', () => {
    expect(limpiaImg()).toHaveProperty('type', ESQUELETO_LIMPIA_IMG);
  });

  it('handles action type ESQUELETO_LIMPIA_IMG correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: ESQUELETO_LIMPIA_IMG }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
