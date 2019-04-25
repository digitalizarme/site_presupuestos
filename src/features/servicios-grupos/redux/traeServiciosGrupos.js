import {
  SERVICIOS_GRUPOS_TRAE_SERVICIOS_GRUPOS_BEGIN,
  SERVICIOS_GRUPOS_TRAE_SERVICIOS_GRUPOS_SUCCESS,
  SERVICIOS_GRUPOS_TRAE_SERVICIOS_GRUPOS_FAILURE,
  SERVICIOS_GRUPOS_TRAE_SERVICIOS_GRUPOS_DISMISS_ERROR,
} from './constants';
import api_axio from '../../../common/api_axios';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function traeServiciosGrupos() {
  return api_axio({
    api_funcion:`serviciosGrupos/todos`,
    type_begin: { type: SERVICIOS_GRUPOS_TRAE_SERVICIOS_GRUPOS_BEGIN },
    type_success: { type: SERVICIOS_GRUPOS_TRAE_SERVICIOS_GRUPOS_SUCCESS },
    type_failure: { type: SERVICIOS_GRUPOS_TRAE_SERVICIOS_GRUPOS_FAILURE },
  });
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissTraeServiciosGruposError() {
  return {
    type: SERVICIOS_GRUPOS_TRAE_SERVICIOS_GRUPOS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SERVICIOS_GRUPOS_TRAE_SERVICIOS_GRUPOS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        traeServiciosGruposPending: true,
        traeServiciosGruposError: null,
      };

    case SERVICIOS_GRUPOS_TRAE_SERVICIOS_GRUPOS_SUCCESS:
      // The request is success
      return {
        ...state,
        traeServiciosGruposPending: false,
        traeServiciosGruposError: null,
        grupos:action.data,
      };

    case SERVICIOS_GRUPOS_TRAE_SERVICIOS_GRUPOS_FAILURE:
      // The request is failed
      return {
        ...state,
        traeServiciosGruposPending: false,
        traeServiciosGruposError: action.data.error,
      };

    case SERVICIOS_GRUPOS_TRAE_SERVICIOS_GRUPOS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        traeServiciosGruposError: null,
      };

    default:
      return state;
  }
}
