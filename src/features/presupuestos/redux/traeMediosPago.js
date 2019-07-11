import {
  PRESUPUESTOS_TRAE_MEDIOS_PAGO_BEGIN,
  PRESUPUESTOS_TRAE_MEDIOS_PAGO_SUCCESS,
  PRESUPUESTOS_TRAE_MEDIOS_PAGO_FAILURE,
  PRESUPUESTOS_TRAE_MEDIOS_PAGO_DISMISS_ERROR,
} from './constants';
import api_axio from '../../../common/api_axios';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function traeMediosPago() {
  return api_axio({
    api_funcion: `mediosPagos/todos`,
    type_begin: { type: PRESUPUESTOS_TRAE_MEDIOS_PAGO_BEGIN },
    type_success: { type: PRESUPUESTOS_TRAE_MEDIOS_PAGO_SUCCESS },
    type_failure: { type: PRESUPUESTOS_TRAE_MEDIOS_PAGO_FAILURE },
  });
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissTraeMediosPagoError() {
  return {
    type: PRESUPUESTOS_TRAE_MEDIOS_PAGO_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case PRESUPUESTOS_TRAE_MEDIOS_PAGO_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        traeMediosPagoPending: true,
        traeMediosPagoError: null,
      };

    case PRESUPUESTOS_TRAE_MEDIOS_PAGO_SUCCESS:
      // The request is success
      return {
        ...state,
        traeMediosPagoPending: false,
        traeMediosPagoError: null,
        mediosPago:action.data,
      };

    case PRESUPUESTOS_TRAE_MEDIOS_PAGO_FAILURE:
      // The request is failed
      return {
        ...state,
        traeMediosPagoPending: false,
        traeMediosPagoError: action.data.error,
      };

    case PRESUPUESTOS_TRAE_MEDIOS_PAGO_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        traeMediosPagoError: null,
      };

    default:
      return state;
  }
}
