import {
  PRESUPUESTOS_TRAE_STATUS_BEGIN,
  PRESUPUESTOS_TRAE_STATUS_SUCCESS,
  PRESUPUESTOS_TRAE_STATUS_FAILURE,
  PRESUPUESTOS_TRAE_STATUS_DISMISS_ERROR,
} from './constants';
import api_axio from '../../../common/api_axios';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function traeStatus() {
  return api_axio({
    api_funcion: `status`,
    type_begin: { type: PRESUPUESTOS_TRAE_STATUS_BEGIN },
    type_success: { type: PRESUPUESTOS_TRAE_STATUS_SUCCESS },
    type_failure: { type: PRESUPUESTOS_TRAE_STATUS_FAILURE },
  });
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissTraeStatusError() {
  return {
    type: PRESUPUESTOS_TRAE_STATUS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case PRESUPUESTOS_TRAE_STATUS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        traeStatusPending: true,
        traeStatusError: null,
        status: [],
      };

    case PRESUPUESTOS_TRAE_STATUS_SUCCESS:
      // The request is success
      return {
        ...state,
        traeStatusPending: false,
        traeStatusError: null,
        status: action.data,
      };

    case PRESUPUESTOS_TRAE_STATUS_FAILURE:
      // The request is failed
      return {
        ...state,
        traeStatusPending: false,
        traeStatusError: action.data.error,
      };

    case PRESUPUESTOS_TRAE_STATUS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        traeStatusError: null,
      };

    default:
      return state;
  }
}
