// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  ESQUELETO_LINEA_SELECCIONADA,
} from './constants';

export function lineaSeleccionada(data) {
  return {
    type: ESQUELETO_LINEA_SELECCIONADA,
    data
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ESQUELETO_LINEA_SELECCIONADA:
      return {
        ...state,
        selected:action.data
      };

    default:
      return state;
  }
}
