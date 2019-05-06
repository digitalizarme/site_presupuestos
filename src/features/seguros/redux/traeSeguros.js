import {
  SEGUROS_TRAE_SEGUROS_BEGIN,
  SEGUROS_TRAE_SEGUROS_SUCCESS,
  SEGUROS_TRAE_SEGUROS_FAILURE,
  SEGUROS_TRAE_SEGUROS_DISMISS_ERROR,
} from './constants';
import api_axio from '../../../common/api_axios';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function traeSeguros() {
    return api_axio({
    api_funcion:`seguros/todos`,
    type_begin: { type: SEGUROS_TRAE_SEGUROS_BEGIN },
    type_success: { type: SEGUROS_TRAE_SEGUROS_SUCCESS },
    type_failure: { type: SEGUROS_TRAE_SEGUROS_FAILURE },
  });

}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissTraeSegurosError() {
  return {
    type: SEGUROS_TRAE_SEGUROS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SEGUROS_TRAE_SEGUROS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        traeSegurosPending: true,
        traeSegurosError: null,
      };

    case SEGUROS_TRAE_SEGUROS_SUCCESS:
      // The request is success
      return {
        ...state,
        traeSegurosPending: false,
        traeSegurosError: null,
        seguros:action.data,
      };

    case SEGUROS_TRAE_SEGUROS_FAILURE:
      // The request is failed
      return {
        ...state,
        traeSegurosPending: false,
        traeSegurosError: action.data.error,
      };

    case SEGUROS_TRAE_SEGUROS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        traeSegurosError: null,
      };

    default:
      return state;
  }
}
