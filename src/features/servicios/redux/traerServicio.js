import {
  SERVICIOS_TRAER_SERVICIO_BEGIN,
  SERVICIOS_TRAER_SERVICIO_SUCCESS,
  SERVICIOS_TRAER_SERVICIO_FAILURE,
  SERVICIOS_TRAER_SERVICIO_DISMISS_ERROR,
} from './constants';
import api_axio from '../../../common/api_axios';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function traerServicio(params) {
  return api_axio({
    api_funcion: `servicios/${params.id}`,
    type_begin: { type: SERVICIOS_TRAER_SERVICIO_BEGIN },
    type_success: { type: SERVICIOS_TRAER_SERVICIO_SUCCESS },
    type_failure: { type: SERVICIOS_TRAER_SERVICIO_FAILURE },
  });
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissTraerServicioError() {
  return {
    type: SERVICIOS_TRAER_SERVICIO_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SERVICIOS_TRAER_SERVICIO_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        traerServicioPending: true,
        traerServicioError: null,
        servicio: {},
      };

    case SERVICIOS_TRAER_SERVICIO_SUCCESS:
      // The request is success
      return {
        ...state,
        traerServicioPending: false,
        traerServicioError: null,
        servicio: action.data,
      };

    case SERVICIOS_TRAER_SERVICIO_FAILURE:
      // The request is failed
      return {
        ...state,
        traerServicioPending: false,
        traerServicioError: action.data.error,
      };

    case SERVICIOS_TRAER_SERVICIO_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        traerServicioError: null,
      };

    default:
      return state;
  }
}
