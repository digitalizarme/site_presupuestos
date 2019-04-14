import {
  ACCEDER_LIMPIAR_AVATAR,
} from '../../../../src/features/acceder/redux/constants';

import {
  limpiarAvatar,
  reducer,
} from '../../../../src/features/acceder/redux/limpiarAvatar';

describe('acceder/redux/limpiarAvatar', () => {
  it('returns correct action by limpiarAvatar', () => {
    expect(limpiarAvatar()).toHaveProperty('type', ACCEDER_LIMPIAR_AVATAR);
  });

  it('handles action type ACCEDER_LIMPIAR_AVATAR correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: ACCEDER_LIMPIAR_AVATAR }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
