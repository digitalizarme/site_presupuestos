// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  ACCEDER_LIMPIAR_USUARIO,
} from './constants';

import { dropToken } from '../../../common/tokenManager';


export function limpiarUsuario() {
  dropToken();
  return {
    type: ACCEDER_LIMPIAR_USUARIO,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ACCEDER_LIMPIAR_USUARIO:
      return {
        ...state,
        usuario: {},
      };

    default:
      return state;
  }
}
