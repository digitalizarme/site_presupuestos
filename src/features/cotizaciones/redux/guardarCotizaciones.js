import {
  COTIZACIONES_GUARDAR_COTIZACIONES_BEGIN,
  COTIZACIONES_GUARDAR_COTIZACIONES_SUCCESS,
  COTIZACIONES_GUARDAR_COTIZACIONES_FAILURE,
  COTIZACIONES_GUARDAR_COTIZACIONES_DISMISS_ERROR,
} from './constants';
import api_axio from '../../../common/api_axios';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function guardarCotizaciones(monedas = 'USD_PYG,USD_BRL,USD_ARS,USD_EUR') {
  return api_axio({
    api_funcion: `cotizaciones/ultimas?monedas=${monedas}`,
    type_begin: { type: COTIZACIONES_GUARDAR_COTIZACIONES_BEGIN },
    type_success: { type: COTIZACIONES_GUARDAR_COTIZACIONES_SUCCESS },
    type_failure: { type: COTIZACIONES_GUARDAR_COTIZACIONES_FAILURE },
  });
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissGuardarCotizacionesError() {
  return {
    type: COTIZACIONES_GUARDAR_COTIZACIONES_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case COTIZACIONES_GUARDAR_COTIZACIONES_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        guardarCotizacionesPending: true,
        guardarCotizacionesError: null,
        cotizaciones: [],
      };

    case COTIZACIONES_GUARDAR_COTIZACIONES_SUCCESS:
      // The request is success
      return {
        ...state,
        guardarCotizacionesPending: false,
        guardarCotizacionesError: null,
        cotizaciones: action.data,
      };

    case COTIZACIONES_GUARDAR_COTIZACIONES_FAILURE:
      // The request is failed
      return {
        ...state,
        guardarCotizacionesPending: false,
        guardarCotizacionesError: action.data.error,
      };

    case COTIZACIONES_GUARDAR_COTIZACIONES_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        guardarCotizacionesError: null,
      };

    default:
      return state;
  }
}
