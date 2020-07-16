import {
  INFORMES_TRAER_COMISIONES_BEGIN,
  INFORMES_TRAER_COMISIONES_SUCCESS,
  INFORMES_TRAER_COMISIONES_FAILURE,
  INFORMES_TRAER_COMISIONES_DISMISS_ERROR,
} from './constants';
import api_axio from '../../../common/api_axios';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function traerComisiones(params) {
   return api_axio({
    api_funcion: `presupuestos/comisiones`,
    params,
    type_begin: { type: INFORMES_TRAER_COMISIONES_BEGIN },
    type_success: { type: INFORMES_TRAER_COMISIONES_SUCCESS },
    type_failure: { type: INFORMES_TRAER_COMISIONES_FAILURE },
  });
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissTraerComisionesError() {
  return {
    type: INFORMES_TRAER_COMISIONES_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case INFORMES_TRAER_COMISIONES_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        traerComisionesPending: true,
        traerComisionesError: null,
        comisiones: [],
      };

    case INFORMES_TRAER_COMISIONES_SUCCESS:
      // The request is success
      return {
        ...state,
        traerComisionesPending: false,
        traerComisionesError: null,
        comisiones: action.data,
      };

    case INFORMES_TRAER_COMISIONES_FAILURE:
      // The request is failed
      return {
        ...state,
        traerComisionesPending: false,
        traerComisionesError: action.data.error,
      };

    case INFORMES_TRAER_COMISIONES_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        traerComisionesError: null,
      };

    default:
      return state;
  }
}
