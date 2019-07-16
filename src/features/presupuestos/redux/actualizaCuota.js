import {
  PRESUPUESTOS_ACTUALIZA_CUOTA_BEGIN,
  PRESUPUESTOS_ACTUALIZA_CUOTA_SUCCESS,
  PRESUPUESTOS_ACTUALIZA_CUOTA_FAILURE,
  PRESUPUESTOS_ACTUALIZA_CUOTA_DISMISS_ERROR,
} from './constants';
import api_axio from '../../../common/api_axios';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function actualizaCuota(params = {}) {
    return api_axio({
    api_funcion: `presupuestos/cuota/${params.data.id}`,
    params,
    type_begin: { type: PRESUPUESTOS_ACTUALIZA_CUOTA_BEGIN },
    type_success: { type: PRESUPUESTOS_ACTUALIZA_CUOTA_SUCCESS },
    type_failure: { type: PRESUPUESTOS_ACTUALIZA_CUOTA_FAILURE },
  });

}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissActualizaCuotaError() {
  return {
    type: PRESUPUESTOS_ACTUALIZA_CUOTA_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case PRESUPUESTOS_ACTUALIZA_CUOTA_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        actualizaCuotaPending: true,
        actualizaCuotaError: null,
      };

    case PRESUPUESTOS_ACTUALIZA_CUOTA_SUCCESS:
      // The request is success
      return {
        ...state,
        actualizaCuotaPending: false,
        actualizaCuotaError: null,
      };

    case PRESUPUESTOS_ACTUALIZA_CUOTA_FAILURE:
      // The request is failed
      return {
        ...state,
        actualizaCuotaPending: false,
        actualizaCuotaError: action.data.error,
      };

    case PRESUPUESTOS_ACTUALIZA_CUOTA_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        actualizaCuotaError: null,
      };

    default:
      return state;
  }
}
