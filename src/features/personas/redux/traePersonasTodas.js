import {
  PERSONAS_TRAE_PERSONAS_TODAS_BEGIN,
  PERSONAS_TRAE_PERSONAS_TODAS_SUCCESS,
  PERSONAS_TRAE_PERSONAS_TODAS_FAILURE,
  PERSONAS_TRAE_PERSONAS_TODAS_DISMISS_ERROR,
} from './constants';
import api_axio from '../../../common/api_axios';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function traePersonasTodas() {
    return api_axio({
    api_funcion:`personas/todas`,
    type_begin: { type: PERSONAS_TRAE_PERSONAS_TODAS_BEGIN },
    type_success: { type: PERSONAS_TRAE_PERSONAS_TODAS_SUCCESS },
    type_failure: { type: PERSONAS_TRAE_PERSONAS_TODAS_FAILURE },
  });

}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissTraePersonasTodasError() {
  return {
    type: PERSONAS_TRAE_PERSONAS_TODAS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case PERSONAS_TRAE_PERSONAS_TODAS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        traePersonasTodasPending: true,
        traePersonasTodasError: null,
      };

    case PERSONAS_TRAE_PERSONAS_TODAS_SUCCESS:
      // The request is success
      return {
        ...state,
        traePersonasTodasPending: false,
        traePersonasTodasError: null,
        personas:action.data,
      };

    case PERSONAS_TRAE_PERSONAS_TODAS_FAILURE:
      // The request is failed
      return {
        ...state,
        traePersonasTodasPending: false,
        traePersonasTodasError: action.data.error,
      };

    case PERSONAS_TRAE_PERSONAS_TODAS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        traePersonasTodasError: null,
      };

    default:
      return state;
  }
}
