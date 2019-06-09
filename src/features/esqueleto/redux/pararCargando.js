// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  ESQUELETO_PARAR_CARGANDO,
} from './constants';

export function pararCargando() {
  return {
    type: ESQUELETO_PARAR_CARGANDO,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ESQUELETO_PARAR_CARGANDO:
      return {
        ...state,
        cargando: false,
      };

    default:
      return state;
  }
}
