import {
  ESQUELETO_NO_LIMPIAR_FORM_MODAL,
} from '../../../../src/features/esqueleto/redux/constants';

import {
  noLimpiarFormModal,
  reducer,
} from '../../../../src/features/esqueleto/redux/noLimpiarFormModal';

describe('esqueleto/redux/noLimpiarFormModal', () => {
  it('returns correct action by noLimpiarFormModal', () => {
    expect(noLimpiarFormModal()).toHaveProperty('type', ESQUELETO_NO_LIMPIAR_FORM_MODAL);
  });

  it('handles action type ESQUELETO_NO_LIMPIAR_FORM_MODAL correctly', () => {
    const prevState = {};
    const state = reducer(
      prevState,
      { type: ESQUELETO_NO_LIMPIAR_FORM_MODAL }
    );
    // Should be immutable
    expect(state).not.toBe(prevState);

    // TODO: use real case expected value instead of {}.
    const expectedState = {};
    expect(state).toEqual(expectedState);
  });
});
