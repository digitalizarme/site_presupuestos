import {
  CONFIGURACIONES_TRAER_CONFIGURACION_BEGIN,
  CONFIGURACIONES_TRAER_CONFIGURACION_SUCCESS,
  CONFIGURACIONES_TRAER_CONFIGURACION_FAILURE,
  CONFIGURACIONES_TRAER_CONFIGURACION_DISMISS_ERROR,
} from './constants';
import api_axio from '../../../common/api_axios';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function traerConfiguracion() {
  return api_axio({
    api_funcion:`configuraciones`,
    type_begin: { type: CONFIGURACIONES_TRAER_CONFIGURACION_BEGIN },
    type_success: { type: CONFIGURACIONES_TRAER_CONFIGURACION_SUCCESS },
    type_failure: { type: CONFIGURACIONES_TRAER_CONFIGURACION_FAILURE },
  });
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissTraerConfiguracionError() {
  return {
    type: CONFIGURACIONES_TRAER_CONFIGURACION_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CONFIGURACIONES_TRAER_CONFIGURACION_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        traerConfiguracionPending: true,
        traerConfiguracionError: null,
      };

    case CONFIGURACIONES_TRAER_CONFIGURACION_SUCCESS:
      // The request is success
      return {
        ...state,
        traerConfiguracionPending: false,
        traerConfiguracionError: null,
        configuracion:action.data,
      };

    case CONFIGURACIONES_TRAER_CONFIGURACION_FAILURE:
      // The request is failed
      return {
        ...state,
        traerConfiguracionPending: false,
        traerConfiguracionError: action.data.error,
      };

    case CONFIGURACIONES_TRAER_CONFIGURACION_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        traerConfiguracionError: null,
      };

    default:
      return state;
  }
}
