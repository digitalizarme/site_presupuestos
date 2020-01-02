import {
  PERSONAS_TRAER_PERSONAS_COMISIONISTAS_BEGIN,
  PERSONAS_TRAER_PERSONAS_COMISIONISTAS_SUCCESS,
  PERSONAS_TRAER_PERSONAS_COMISIONISTAS_FAILURE,
  PERSONAS_TRAER_PERSONAS_COMISIONISTAS_DISMISS_ERROR,
} from './constants';
import api_axio from '../../../common/api_axios';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function traerPersonasComisionistas(args = {}) {
  return api_axio({
    api_funcion: `personas/comisionistas`,
    type_begin: { type: PERSONAS_TRAER_PERSONAS_COMISIONISTAS_BEGIN },
    type_success: { type: PERSONAS_TRAER_PERSONAS_COMISIONISTAS_SUCCESS },
    type_failure: { type: PERSONAS_TRAER_PERSONAS_COMISIONISTAS_FAILURE },
  });
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissTraerPersonasComisionistasError() {
  return {
    type: PERSONAS_TRAER_PERSONAS_COMISIONISTAS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case PERSONAS_TRAER_PERSONAS_COMISIONISTAS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        traerPersonasComisionistasPending: true,
        traerPersonasComisionistasError: null,
        comisionistas:[]
      };

    case PERSONAS_TRAER_PERSONAS_COMISIONISTAS_SUCCESS:
      // The request is success
      return {
        ...state,
        traerPersonasComisionistasPending: false,
        traerPersonasComisionistasError: null,
        comisionistas: action.data,
      };

    case PERSONAS_TRAER_PERSONAS_COMISIONISTAS_FAILURE:
      // The request is failed
      return {
        ...state,
        traerPersonasComisionistasPending: false,
        traerPersonasComisionistasError: action.data.error,
      };

    case PERSONAS_TRAER_PERSONAS_COMISIONISTAS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        traerPersonasComisionistasError: null,
      };

    default:
      return state;
  }
}
