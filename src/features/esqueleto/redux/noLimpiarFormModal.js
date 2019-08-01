// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  ESQUELETO_NO_LIMPIAR_FORM_MODAL,
} from './constants';

export function noLimpiarFormModal() {
  return {
    type: ESQUELETO_NO_LIMPIAR_FORM_MODAL,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ESQUELETO_NO_LIMPIAR_FORM_MODAL:
      return {
        ...state,
        limpiarModal: false,
      };

    default:
      return state;
  }
}
