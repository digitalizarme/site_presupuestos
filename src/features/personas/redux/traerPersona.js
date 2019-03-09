import {
  PERSONAS_TRAER_PERSONA_BEGIN,
  PERSONAS_TRAER_PERSONA_SUCCESS,
  PERSONAS_TRAER_PERSONA_FAILURE,
  PERSONAS_TRAER_PERSONA_DISMISS_ERROR,
} from './constants';

import api_axio from '../../../common/api_axios';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function traerPersona(params) {
  return api_axio({
    api_funcion:`personas/${params.id}`,
    type_begin: { type: PERSONAS_TRAER_PERSONA_BEGIN },
    type_success: { type: PERSONAS_TRAER_PERSONA_SUCCESS },
    type_failure: { type: PERSONAS_TRAER_PERSONA_FAILURE },
  });
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissTraerPersonaError() {
  return {
    type: PERSONAS_TRAER_PERSONA_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case PERSONAS_TRAER_PERSONA_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        traerPersonaPending: true,
        traerPersonaError: null,
      };

    case PERSONAS_TRAER_PERSONA_SUCCESS:
      // The request is success
      return {
        ...state,
        traerPersonaPending: false,
        traerPersonaError: null,
        persona: action.data
      };

    case PERSONAS_TRAER_PERSONA_FAILURE:
      // The request is failed
      return {
        ...state,
        traerPersonaPending: false,
        traerPersonaError: action.data.error,
      };

    case PERSONAS_TRAER_PERSONA_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        traerPersonaError: null,
      };

    default:
      return state;
  }
}
