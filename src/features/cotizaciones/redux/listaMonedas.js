import {
  COTIZACIONES_LISTA_MONEDAS_BEGIN,
  COTIZACIONES_LISTA_MONEDAS_SUCCESS,
  COTIZACIONES_LISTA_MONEDAS_FAILURE,
  COTIZACIONES_LISTA_MONEDAS_DISMISS_ERROR,
} from './constants';
import api_axio from '../../../common/api_axios';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function listaMonedas() {
  return api_axio({
    api_funcion: `monedas/todas`,
    type_begin: { type: COTIZACIONES_LISTA_MONEDAS_BEGIN },
    type_success: { type: COTIZACIONES_LISTA_MONEDAS_SUCCESS },
    type_failure: { type: COTIZACIONES_LISTA_MONEDAS_FAILURE },
  });
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissListaMonedasError() {
  return {
    type: COTIZACIONES_LISTA_MONEDAS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case COTIZACIONES_LISTA_MONEDAS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        listaMonedasPending: true,
        listaMonedasError: null,
        monedas: [],
      };

    case COTIZACIONES_LISTA_MONEDAS_SUCCESS:
      // The request is success
      return {
        ...state,
        listaMonedasPending: false,
        listaMonedasError: null,
        monedas: action.data,
      };

    case COTIZACIONES_LISTA_MONEDAS_FAILURE:
      // The request is failed
      return {
        ...state,
        listaMonedasPending: false,
        listaMonedasError: action.data.error,
      };

    case COTIZACIONES_LISTA_MONEDAS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        listaMonedasError: null,
      };

    default:
      return state;
  }
}
