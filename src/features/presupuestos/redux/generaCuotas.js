import {
  PRESUPUESTOS_GENERA_CUOTAS_BEGIN,
  PRESUPUESTOS_GENERA_CUOTAS_SUCCESS,
  PRESUPUESTOS_GENERA_CUOTAS_FAILURE,
  PRESUPUESTOS_GENERA_CUOTAS_DISMISS_ERROR,
} from './constants';
import api_axio from '../../../common/api_axios';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function generaCuotas(params = {}) {
    return api_axio({
    api_funcion: `presupuestos/cuotas`,
    params,
    type_begin: { type: PRESUPUESTOS_GENERA_CUOTAS_BEGIN },
    type_success: { type: PRESUPUESTOS_GENERA_CUOTAS_SUCCESS },
    type_failure: { type: PRESUPUESTOS_GENERA_CUOTAS_FAILURE },
  });

}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissGeneraCuotasError() {
  return {
    type: PRESUPUESTOS_GENERA_CUOTAS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case PRESUPUESTOS_GENERA_CUOTAS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        generaCuotasPending: true,
        generaCuotasError: null,
        cuotas:[]
      };

    case PRESUPUESTOS_GENERA_CUOTAS_SUCCESS:
      // The request is success
      return {
        ...state,
        generaCuotasPending: false,
        generaCuotasError: null,
        cuotas:action.data,
      };

    case PRESUPUESTOS_GENERA_CUOTAS_FAILURE:
      // The request is failed
      return {
        ...state,
        generaCuotasPending: false,
        generaCuotasError: action.data.error,
      };

    case PRESUPUESTOS_GENERA_CUOTAS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        generaCuotasError: null,
      };

    default:
      return state;
  }
}
