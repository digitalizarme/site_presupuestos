import {
  PRESUPUESTOS_TRAE_FRECUENCIAS_BEGIN,
  PRESUPUESTOS_TRAE_FRECUENCIAS_SUCCESS,
  PRESUPUESTOS_TRAE_FRECUENCIAS_FAILURE,
  PRESUPUESTOS_TRAE_FRECUENCIAS_DISMISS_ERROR,
} from './constants';
import api_axio from '../../../common/api_axios';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function traeFrecuencias() {
  return api_axio({
    api_funcion: `frecuencias/todas`,
    type_begin: { type: PRESUPUESTOS_TRAE_FRECUENCIAS_BEGIN },
    type_success: { type: PRESUPUESTOS_TRAE_FRECUENCIAS_SUCCESS },
    type_failure: { type: PRESUPUESTOS_TRAE_FRECUENCIAS_FAILURE },
  });
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissTraeFrecuenciasError() {
  return {
    type: PRESUPUESTOS_TRAE_FRECUENCIAS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case PRESUPUESTOS_TRAE_FRECUENCIAS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        traeFrecuenciasPending: true,
        traeFrecuenciasError: null,
        frecuencias: [],

      };

    case PRESUPUESTOS_TRAE_FRECUENCIAS_SUCCESS:
      // The request is success
      return {
        ...state,
        traeFrecuenciasPending: false,
        traeFrecuenciasError: null,
        frecuencias: action.data,
      };

    case PRESUPUESTOS_TRAE_FRECUENCIAS_FAILURE:
      // The request is failed
      return {
        ...state,
        traeFrecuenciasPending: false,
        traeFrecuenciasError: action.data.error,
      };

    case PRESUPUESTOS_TRAE_FRECUENCIAS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        traeFrecuenciasError: null,
      };

    default:
      return state;
  }
}
