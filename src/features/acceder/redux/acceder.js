import {
  ACCEDER_ACCEDER_BEGIN,
  ACCEDER_ACCEDER_SUCCESS,
  ACCEDER_ACCEDER_FAILURE,
  ACCEDER_ACCEDER_DISMISS_ERROR,
} from './constants';

import api_axio from '../../../common/api_axios';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function acceder(params) {

  return api_axio({
    api_funcion:'acceder',
    params,
    type_begin: { type: ACCEDER_ACCEDER_BEGIN },
    type_success: { type: ACCEDER_ACCEDER_SUCCESS },
    type_failure: { type: ACCEDER_ACCEDER_FAILURE },
  });
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissAccederError() {
  return {
    type: ACCEDER_ACCEDER_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ACCEDER_ACCEDER_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        accederPending: true,
        accederError: null,
      };

    case ACCEDER_ACCEDER_SUCCESS:
      // The request is success
      return {
        ...state,
        accederPending: false,
        accederError: null,
        usuario: action.data,
        avatar:null,
        existeEmail:false,
      };

    case ACCEDER_ACCEDER_FAILURE:
      // The request is failed
      return {
        ...state,
        accederPending: false,
        accederError: action.data.error,
      };

    case ACCEDER_ACCEDER_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        accederError: null,
      };

    default:
      return state;
  }
}
