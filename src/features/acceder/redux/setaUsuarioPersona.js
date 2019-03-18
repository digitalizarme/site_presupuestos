// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  ACCEDER_SETA_USUARIO_PERSONA,
} from './constants';

export function setaUsuarioPersona(data) {
  return {
    type: ACCEDER_SETA_USUARIO_PERSONA,
    data
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ACCEDER_SETA_USUARIO_PERSONA:
      const nuevoUser = {
        ...state.usuario
        ,persona: action.data
      };
      return {
        ...state,
        usuario: nuevoUser,

      };

    default:
      return state;
  }
}
