// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import { ACCEDER_LIMPIAR_AVATAR } from './constants';

export function limpiarAvatar() {
  return {
    type: ACCEDER_LIMPIAR_AVATAR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ACCEDER_LIMPIAR_AVATAR:
      return {
        ...state,
        avatar: null,
        existeEmail: false,
        verificadoEmail:false,
      };

    default:
      return state;
  }
}
