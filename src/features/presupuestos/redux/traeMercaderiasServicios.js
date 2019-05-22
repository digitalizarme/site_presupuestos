import {
  PRESUPUESTOS_TRAE_MERCADERIAS_SERVICIOS_BEGIN,
  PRESUPUESTOS_TRAE_MERCADERIAS_SERVICIOS_SUCCESS,
  PRESUPUESTOS_TRAE_MERCADERIAS_SERVICIOS_FAILURE,
  PRESUPUESTOS_TRAE_MERCADERIAS_SERVICIOS_DISMISS_ERROR,
} from './constants';
import api_axio from '../../../common/api_axios';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function traeMercaderiasServicios() {
    return api_axio({
    api_funcion: `presupuestos/mercaderiasServicios`,
    type_begin: { type: PRESUPUESTOS_TRAE_MERCADERIAS_SERVICIOS_BEGIN },
    type_success: { type: PRESUPUESTOS_TRAE_MERCADERIAS_SERVICIOS_SUCCESS },
    type_failure: { type: PRESUPUESTOS_TRAE_MERCADERIAS_SERVICIOS_FAILURE },
  });

}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissTraeMercaderiasServiciosError() {
  return {
    type: PRESUPUESTOS_TRAE_MERCADERIAS_SERVICIOS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case PRESUPUESTOS_TRAE_MERCADERIAS_SERVICIOS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        traeMercaderiasServiciosPending: true,
        traeMercaderiasServiciosError: null,
      };

    case PRESUPUESTOS_TRAE_MERCADERIAS_SERVICIOS_SUCCESS:
      // The request is success
      return {
        ...state,
        traeMercaderiasServiciosPending: false,
        traeMercaderiasServiciosError: null,
        mercaderiasServicios:action.data,
      };

    case PRESUPUESTOS_TRAE_MERCADERIAS_SERVICIOS_FAILURE:
      // The request is failed
      return {
        ...state,
        traeMercaderiasServiciosPending: false,
        traeMercaderiasServiciosError: action.data.error,
      };

    case PRESUPUESTOS_TRAE_MERCADERIAS_SERVICIOS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        traeMercaderiasServiciosError: null,
      };

    default:
      return state;
  }
}
