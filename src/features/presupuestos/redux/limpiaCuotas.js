// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import { PRESUPUESTOS_LIMPIA_CUOTAS } from './constants';

export function limpiaCuotas() {
  return {
    type: PRESUPUESTOS_LIMPIA_CUOTAS,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case PRESUPUESTOS_LIMPIA_CUOTAS:
      return {
        ...state,
        cuotas: [],
      };

    default:
      return state;
  }
}
