import {
  MERCADERIAS_MARCAS_TRAE_MERCADERIAS_MARCAS_BEGIN,
  MERCADERIAS_MARCAS_TRAE_MERCADERIAS_MARCAS_SUCCESS,
  MERCADERIAS_MARCAS_TRAE_MERCADERIAS_MARCAS_FAILURE,
  MERCADERIAS_MARCAS_TRAE_MERCADERIAS_MARCAS_DISMISS_ERROR,
} from './constants';
import api_axio from '../../../common/api_axios';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function traeMercaderiasMarcas() {
  return api_axio({
    api_funcion: `mercaderiasMarcas/todas`,
    type_begin: { type: MERCADERIAS_MARCAS_TRAE_MERCADERIAS_MARCAS_BEGIN },
    type_success: { type: MERCADERIAS_MARCAS_TRAE_MERCADERIAS_MARCAS_SUCCESS },
    type_failure: { type: MERCADERIAS_MARCAS_TRAE_MERCADERIAS_MARCAS_FAILURE },
  });
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissTraeMercaderiasMarcasError() {
  return {
    type: MERCADERIAS_MARCAS_TRAE_MERCADERIAS_MARCAS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case MERCADERIAS_MARCAS_TRAE_MERCADERIAS_MARCAS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        traeMercaderiasMarcasPending: true,
        traeMercaderiasMarcasError: null,
        marcas: [],
      };

    case MERCADERIAS_MARCAS_TRAE_MERCADERIAS_MARCAS_SUCCESS:
      // The request is success
      return {
        ...state,
        traeMercaderiasMarcasPending: false,
        traeMercaderiasMarcasError: null,
        marcas: action.data,
      };

    case MERCADERIAS_MARCAS_TRAE_MERCADERIAS_MARCAS_FAILURE:
      // The request is failed
      return {
        ...state,
        traeMercaderiasMarcasPending: false,
        traeMercaderiasMarcasError: action.data.error,
      };

    case MERCADERIAS_MARCAS_TRAE_MERCADERIAS_MARCAS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        traeMercaderiasMarcasError: null,
      };

    default:
      return state;
  }
}
