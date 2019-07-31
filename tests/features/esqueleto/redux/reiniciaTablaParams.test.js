import {
  ESQUELETO_REINICIA_TABLA_PARAMS,
} from '../../../../src/features/esqueleto/redux/constants';

import {
  reiniciaTablaParams,
  reducer,
} from '../../../../src/features/esqueleto/redux/reiniciaTablaParams';

describe('esqueleto/redux/reiniciaTablaParams', () => {
  it('returns correct action by reiniciaTablaParams', () => {
    expect(reiniciaTablaParams()).toHaveProperty('type', ESQUELETO_REINICIA_TABLA_PARAMS);
  });

  it('handles action type ESQUELETO_REINICIA_TABLA_PARAMS correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: ESQUELETO_REINICIA_TABLA_PARAMS }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
