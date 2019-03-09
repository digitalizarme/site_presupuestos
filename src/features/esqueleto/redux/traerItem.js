import {
  ESQUELETO_TRAER_ITEM_BEGIN,
  ESQUELETO_TRAER_ITEM_SUCCESS,
  ESQUELETO_TRAER_ITEM_FAILURE,
  ESQUELETO_TRAER_ITEM_DISMISS_ERROR,
} from './constants';

import api_axio from '../../../common/api_axios';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function traerItem({ api_funcion }) {
  return api_axio({
    api_funcion,
    type_begin: { type: ESQUELETO_TRAER_ITEM_BEGIN },
    type_success: { type: ESQUELETO_TRAER_ITEM_SUCCESS },
    type_failure: { type: ESQUELETO_TRAER_ITEM_FAILURE },
  });
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissTraerItemError() {
  return {
    type: ESQUELETO_TRAER_ITEM_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ESQUELETO_TRAER_ITEM_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        traerItemPending: true,
        traerItemError: null,
      };

    case ESQUELETO_TRAER_ITEM_SUCCESS:
      // The request is success
      return {
        ...state,
        traerItemPending: false,
        traerItemError: null,
        item: action.data
      };

    case ESQUELETO_TRAER_ITEM_FAILURE:
      // The request is failed
      return {
        ...state,
        traerItemPending: false,
        traerItemError: action.data.error,
      };

    case ESQUELETO_TRAER_ITEM_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        traerItemError: null,
      };

    default:
      return state;
  }
}
