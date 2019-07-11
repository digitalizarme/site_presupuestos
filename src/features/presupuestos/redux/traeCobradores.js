import {
  PRESUPUESTOS_TRAE_COBRADORES_BEGIN,
  PRESUPUESTOS_TRAE_COBRADORES_SUCCESS,
  PRESUPUESTOS_TRAE_COBRADORES_FAILURE,
  PRESUPUESTOS_TRAE_COBRADORES_DISMISS_ERROR,
} from './constants';
import api_axio from '../../../common/api_axios';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function traeCobradores() {
    return api_axio({
    api_funcion: `presupuestos/cobradores`,
    type_begin: { type: PRESUPUESTOS_TRAE_COBRADORES_BEGIN },
    type_success: { type: PRESUPUESTOS_TRAE_COBRADORES_SUCCESS },
    type_failure: { type: PRESUPUESTOS_TRAE_COBRADORES_FAILURE },
  });
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissTraeCobradoresError() {
  return {
    type: PRESUPUESTOS_TRAE_COBRADORES_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case PRESUPUESTOS_TRAE_COBRADORES_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        traeCobradoresPending: true,
        traeCobradoresError: null,
      };

    case PRESUPUESTOS_TRAE_COBRADORES_SUCCESS:
      // The request is success
      return {
        ...state,
        traeCobradoresPending: false,
        traeCobradoresError: null,
        cobradores:action.data,
      };

    case PRESUPUESTOS_TRAE_COBRADORES_FAILURE:
      // The request is failed
      return {
        ...state,
        traeCobradoresPending: false,
        traeCobradoresError: action.data.error,
      };

    case PRESUPUESTOS_TRAE_COBRADORES_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        traeCobradoresError: null,
      };

    default:
      return state;
  }
}
