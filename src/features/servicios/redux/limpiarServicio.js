// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  SERVICIOS_LIMPIAR_SERVICIO,
} from './constants';

export function limpiarServicio() {
  return {
    type: SERVICIOS_LIMPIAR_SERVICIO,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SERVICIOS_LIMPIAR_SERVICIO:
      return {
        ...state,
        servicio:{},
      };

    default:
      return state;
  }
}
