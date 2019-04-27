import {
  MERCADERIAS_TRAER_MERCADERIA_BEGIN,
  MERCADERIAS_TRAER_MERCADERIA_SUCCESS,
  MERCADERIAS_TRAER_MERCADERIA_FAILURE,
  MERCADERIAS_TRAER_MERCADERIA_DISMISS_ERROR,
} from './constants';
import api_axio from '../../../common/api_axios';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function traerMercaderia(params) {
  return api_axio({
    api_funcion:`mercaderias/${params.id}`,
    type_begin: { type: MERCADERIAS_TRAER_MERCADERIA_BEGIN },
    type_success: { type: MERCADERIAS_TRAER_MERCADERIA_SUCCESS },
    type_failure: { type: MERCADERIAS_TRAER_MERCADERIA_FAILURE },
  });

}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissTraerMercaderiaError() {
  return {
    type: MERCADERIAS_TRAER_MERCADERIA_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case MERCADERIAS_TRAER_MERCADERIA_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        traerMercaderiaPending: true,
        traerMercaderiaError: null,
      };

    case MERCADERIAS_TRAER_MERCADERIA_SUCCESS:
      // The request is success
      return {
        ...state,
        traerMercaderiaPending: false,
        traerMercaderiaError: null,
        mercaderia:action.data,
      };

    case MERCADERIAS_TRAER_MERCADERIA_FAILURE:
      // The request is failed
      return {
        ...state,
        traerMercaderiaPending: false,
        traerMercaderiaError: action.data.error,
      };

    case MERCADERIAS_TRAER_MERCADERIA_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        traerMercaderiaError: null,
      };

    default:
      return state;
  }
}
