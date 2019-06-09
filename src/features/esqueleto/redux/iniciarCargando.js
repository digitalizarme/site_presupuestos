// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  ESQUELETO_INICIAR_CARGANDO,
} from './constants';

export function iniciarCargando() {
  return {
    type: ESQUELETO_INICIAR_CARGANDO,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ESQUELETO_INICIAR_CARGANDO:
      return {
        ...state,
        cargando: true,
      };

    default:
      return state;
  }
}
