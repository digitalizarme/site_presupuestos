import {
  PRESUPUESTOS_TRAE_ITEMS_BEGIN,
  PRESUPUESTOS_TRAE_ITEMS_SUCCESS,
  PRESUPUESTOS_TRAE_ITEMS_FAILURE,
  PRESUPUESTOS_TRAE_ITEMS_DISMISS_ERROR,
} from './constants';
import api_axio from '../../../common/api_axios';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function traeItems(params) {
  return api_axio({
    api_funcion: `presupuestos/itemsMercaderiasServicios/${params.id}`,
    type_begin: { type: PRESUPUESTOS_TRAE_ITEMS_BEGIN },
    type_success: { type: PRESUPUESTOS_TRAE_ITEMS_SUCCESS },
    type_failure: { type: PRESUPUESTOS_TRAE_ITEMS_FAILURE },
  });
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissTraeItemsError() {
  return {
    type: PRESUPUESTOS_TRAE_ITEMS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case PRESUPUESTOS_TRAE_ITEMS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        traeItemsPending: true,
        traeItemsError: null,
        items:[],

      };

    case PRESUPUESTOS_TRAE_ITEMS_SUCCESS:
      // The request is success
      return {
        ...state,
        traeItemsPending: false,
        traeItemsError: null,
        items:action.data,
      };

    case PRESUPUESTOS_TRAE_ITEMS_FAILURE:
      // The request is failed
      return {
        ...state,
        traeItemsPending: false,
        traeItemsError: action.data.error,
      };

    case PRESUPUESTOS_TRAE_ITEMS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        traeItemsError: null,
      };

    default:
      return state;
  }
}
