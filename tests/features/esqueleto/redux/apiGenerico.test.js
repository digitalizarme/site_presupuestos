import {
  ESQUELETO_API_GENERICO,
} from '../../../../src/features/esqueleto/redux/constants';

import {
  apiGenerico,
  reducer,
} from '../../../../src/features/esqueleto/redux/apiGenerico';

describe('esqueleto/redux/apiGenerico', () => {
  it('returns correct action by apiGenerico', () => {
    expect(apiGenerico()).toHaveProperty('type', ESQUELETO_API_GENERICO);
  });

  it('handles action type ESQUELETO_API_GENERICO correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: ESQUELETO_API_GENERICO }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
