// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import { ACCEDER_SETA_USUARIO } from './constants';

export function setaUsuario(data) {
  return {
    type: ACCEDER_SETA_USUARIO,
    data,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ACCEDER_SETA_USUARIO:
      return {
        ...state,
        usuario: action.data,
      };

    default:
      return state;
  }
}
