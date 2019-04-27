import {
  FLETES_TRAE_FLETES_BEGIN,
  FLETES_TRAE_FLETES_SUCCESS,
  FLETES_TRAE_FLETES_FAILURE,
  FLETES_TRAE_FLETES_DISMISS_ERROR,
} from './constants';
import api_axio from '../../../common/api_axios';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function traeFletes() {
  return api_axio({
    api_funcion: `fletes/todos`,
    type_begin: { type: FLETES_TRAE_FLETES_BEGIN },
    type_success: { type: FLETES_TRAE_FLETES_SUCCESS },
    type_failure: { type: FLETES_TRAE_FLETES_FAILURE },
  });
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissTraeFletesError() {
  return {
    type: FLETES_TRAE_FLETES_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case FLETES_TRAE_FLETES_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        traeFletesPending: true,
        traeFletesError: null,
      };

    case FLETES_TRAE_FLETES_SUCCESS:
      // The request is success
      return {
        ...state,
        traeFletesPending: false,
        traeFletesError: null,
        fletes:action.data,
      };

    case FLETES_TRAE_FLETES_FAILURE:
      // The request is failed
      return {
        ...state,
        traeFletesPending: false,
        traeFletesError: action.data.error,
      };

    case FLETES_TRAE_FLETES_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        traeFletesError: null,
      };

    default:
      return state;
  }
}
