// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import { ESQUELETO_LIMPIAR_ITEM_LINEA } from './constants';

export function limpiarItemLinea() {
  return {
    type: ESQUELETO_LIMPIAR_ITEM_LINEA,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ESQUELETO_LIMPIAR_ITEM_LINEA:
      return {
        ...state,
        selected: [],
        item: {},
      };

    default:
      return state;
  }
}
