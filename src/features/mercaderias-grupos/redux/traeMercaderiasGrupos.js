import {
  MERCADERIAS_GRUPOS_TRAE_MERCADERIAS_GRUPOS_BEGIN,
  MERCADERIAS_GRUPOS_TRAE_MERCADERIAS_GRUPOS_SUCCESS,
  MERCADERIAS_GRUPOS_TRAE_MERCADERIAS_GRUPOS_FAILURE,
  MERCADERIAS_GRUPOS_TRAE_MERCADERIAS_GRUPOS_DISMISS_ERROR,
} from './constants';
import api_axio from '../../../common/api_axios';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function traeMercaderiasGrupos() {
  return api_axio({
    api_funcion:`mercaderiasGrupos/todos`,
    type_begin: { type: MERCADERIAS_GRUPOS_TRAE_MERCADERIAS_GRUPOS_BEGIN },
    type_success: { type: MERCADERIAS_GRUPOS_TRAE_MERCADERIAS_GRUPOS_SUCCESS },
    type_failure: { type: MERCADERIAS_GRUPOS_TRAE_MERCADERIAS_GRUPOS_FAILURE },
  });
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissTraeMercaderiasGruposError() {
  return {
    type: MERCADERIAS_GRUPOS_TRAE_MERCADERIAS_GRUPOS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case MERCADERIAS_GRUPOS_TRAE_MERCADERIAS_GRUPOS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        traeMercaderiasGruposPending: true,
        traeMercaderiasGruposError: null,
      };

    case MERCADERIAS_GRUPOS_TRAE_MERCADERIAS_GRUPOS_SUCCESS:
      // The request is success
      return {
        ...state,
        traeMercaderiasGruposPending: false,
        traeMercaderiasGruposError: null,
        grupos:action.data,
      };

    case MERCADERIAS_GRUPOS_TRAE_MERCADERIAS_GRUPOS_FAILURE:
      // The request is failed
      return {
        ...state,
        traeMercaderiasGruposPending: false,
        traeMercaderiasGruposError: action.data.error,
      };

    case MERCADERIAS_GRUPOS_TRAE_MERCADERIAS_GRUPOS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        traeMercaderiasGruposError: null,
      };

    default:
      return state;
  }
}
