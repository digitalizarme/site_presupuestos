// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import { PERSONAS_LIMPIAR_PERSONA } from './constants';

export function limpiarPersona() {
  return {
    type: PERSONAS_LIMPIAR_PERSONA,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case PERSONAS_LIMPIAR_PERSONA:
      return {
        ...state,
        persona: {},
      };

    default:
      return state;
  }
}
