import {
  CONFIGURACIONES_GUARDAR_BEGIN,
  CONFIGURACIONES_GUARDAR_SUCCESS,
  CONFIGURACIONES_GUARDAR_FAILURE,
  CONFIGURACIONES_GUARDAR_DISMISS_ERROR,
} from './constants';

import api_axio from '../../../common/api_axios';


// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function guardar(data) {
  return api_axio({
    api_funcion:`configuraciones`,
    type_begin: { type: CONFIGURACIONES_GUARDAR_BEGIN },
    type_success: { type: CONFIGURACIONES_GUARDAR_SUCCESS },
    type_failure: { type: CONFIGURACIONES_GUARDAR_FAILURE },
    params:{method:'put',data},
  });
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissGuardarError() {
  return {
    type: CONFIGURACIONES_GUARDAR_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CONFIGURACIONES_GUARDAR_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        guardarPending: true,
        guardarError: null,
      };

    case CONFIGURACIONES_GUARDAR_SUCCESS:
      // The request is success
      return {
        ...state,
        guardarPending: false,
        guardarError: null,
        configuracion:action.data
      };

    case CONFIGURACIONES_GUARDAR_FAILURE:
      // The request is failed
      return {
        ...state,
        guardarPending: false,
        guardarError: action.data.error,
      };

    case CONFIGURACIONES_GUARDAR_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        guardarError: null,
      };

    default:
      return state;
  }
}
