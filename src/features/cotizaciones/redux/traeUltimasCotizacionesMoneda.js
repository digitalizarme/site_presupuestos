import {
  COTIZACIONES_TRAE_ULTIMAS_COTIZACIONES_MONEDA_BEGIN,
  COTIZACIONES_TRAE_ULTIMAS_COTIZACIONES_MONEDA_SUCCESS,
  COTIZACIONES_TRAE_ULTIMAS_COTIZACIONES_MONEDA_FAILURE,
  COTIZACIONES_TRAE_ULTIMAS_COTIZACIONES_MONEDA_DISMISS_ERROR,
} from './constants';
import api_axio from '../../../common/api_axios';
// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function traeUltimasCotizacionesMoneda(monedas) {
    return api_axio({
    api_funcion: `cotizaciones/ultimas?monedas=${monedas}`,
    type_begin: { type: COTIZACIONES_TRAE_ULTIMAS_COTIZACIONES_MONEDA_BEGIN },
    type_success: { type: COTIZACIONES_TRAE_ULTIMAS_COTIZACIONES_MONEDA_SUCCESS },
    type_failure: { type: COTIZACIONES_TRAE_ULTIMAS_COTIZACIONES_MONEDA_FAILURE },
  });

}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissTraeUltimasCotizacionesMonedaError() {
  return {
    type: COTIZACIONES_TRAE_ULTIMAS_COTIZACIONES_MONEDA_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case COTIZACIONES_TRAE_ULTIMAS_COTIZACIONES_MONEDA_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        traeUltimasCotizacionesMonedaPending: true,
        traeUltimasCotizacionesMonedaError: null,
      };

    case COTIZACIONES_TRAE_ULTIMAS_COTIZACIONES_MONEDA_SUCCESS:
      // The request is success
      return {
        ...state,
        traeUltimasCotizacionesMonedaPending: false,
        traeUltimasCotizacionesMonedaError: null,
        cotizaciones: action.data,
      };

    case COTIZACIONES_TRAE_ULTIMAS_COTIZACIONES_MONEDA_FAILURE:
      // The request is failed
      return {
        ...state,
        traeUltimasCotizacionesMonedaPending: false,
        traeUltimasCotizacionesMonedaError: action.data.error,
      };

    case COTIZACIONES_TRAE_ULTIMAS_COTIZACIONES_MONEDA_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        traeUltimasCotizacionesMonedaError: null,
      };

    default:
      return state;
  }
}
