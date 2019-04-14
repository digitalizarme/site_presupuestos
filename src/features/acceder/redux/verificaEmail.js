import {
  ACCEDER_VERIFICA_EMAIL_BEGIN,
  ACCEDER_VERIFICA_EMAIL_SUCCESS,
  ACCEDER_VERIFICA_EMAIL_FAILURE,
  ACCEDER_VERIFICA_EMAIL_DISMISS_ERROR,
} from './constants';

import api_axio from '../../../common/api_axios';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function verificaEmail(email) {
  return api_axio({
    api_funcion:`acceder/verificaEmail/${email}`,
    params:null,
    type_begin: { type: ACCEDER_VERIFICA_EMAIL_BEGIN },
    type_success: { type: ACCEDER_VERIFICA_EMAIL_SUCCESS },
    type_failure: { type: ACCEDER_VERIFICA_EMAIL_FAILURE },
  });
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissVerificaEmailError() {
  return {
    type: ACCEDER_VERIFICA_EMAIL_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ACCEDER_VERIFICA_EMAIL_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        verificaEmailPending: true,
        verificaEmailError: null,
        avatar:null,
        existeEmail:false,
      };

    case ACCEDER_VERIFICA_EMAIL_SUCCESS:
      // The request is success
      return {
        ...state,
        verificaEmailPending: false,
        verificaEmailError: null,
        verificadoEmail:true,
        avatar:action.data.avatar,
        existeEmail:action.data.res,
      };

    case ACCEDER_VERIFICA_EMAIL_FAILURE:
      // The request is failed
      return {
        ...state,
        verificaEmailPending: false,
        verificaEmailError: action.data.error,
      };

    case ACCEDER_VERIFICA_EMAIL_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        verificaEmailError: null,
      };

    default:
      return state;
  }
}
