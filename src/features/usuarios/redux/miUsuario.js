import {
  USUARIOS_MI_USUARIO_BEGIN,
  USUARIOS_MI_USUARIO_SUCCESS,
  USUARIOS_MI_USUARIO_FAILURE,
  USUARIOS_MI_USUARIO_DISMISS_ERROR,
} from './constants';
import api_axio from '../../../common/api_axios';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function miUsuario(args = {}) {
  return api_axio({
    api_funcion: `usuarios/miUsuario`,
    type_begin: { type: USUARIOS_MI_USUARIO_BEGIN },
    type_success: { type: USUARIOS_MI_USUARIO_SUCCESS },
    type_failure: { type: USUARIOS_MI_USUARIO_FAILURE },
  });
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissMiUsuarioError() {
  return {
    type: USUARIOS_MI_USUARIO_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case USUARIOS_MI_USUARIO_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        miUsuarioPending: true,
        miUsuarioError: null,
      };

    case USUARIOS_MI_USUARIO_SUCCESS:
      // The request is success
      return {
        ...state,
        miUsuarioPending: false,
        miUsuarioError: null,
        miUsuario: action.data,
      };

    case USUARIOS_MI_USUARIO_FAILURE:
      // The request is failed
      return {
        ...state,
        miUsuarioPending: false,
        miUsuarioError: action.data.error,
      };

    case USUARIOS_MI_USUARIO_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        miUsuarioError: null,
      };

    default:
      return state;
  }
}
