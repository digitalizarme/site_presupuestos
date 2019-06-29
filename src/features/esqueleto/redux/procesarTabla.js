import {
  ESQUELETO_PROCESAR_TABLA_BEGIN,
  ESQUELETO_PROCESAR_TABLA_SUCCESS,
  ESQUELETO_PROCESAR_TABLA_FAILURE,
  ESQUELETO_PROCESAR_TABLA_DISMISS_ERROR,
} from './constants';

import api_axio from '../../../common/api_axios';

import initialState from './initialState';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga

export function procesarTabla({
  api_funcion,
  offset,
  sizePerPage,
  page,
  sortField,
  sortOrder,
  columns,
  searchText,
  defaultSorted,
}) {
  const params = sizePerPage
    ? {
        offset,
        sizePerPage,
        sortField,
        sortOrder,
        columns,
        searchText,
        defaultSorted,
      }
    : {
        offset: 0,
        sizePerPage: initialState.sizePerPage,
      };

  return api_axio({
    api_funcion,
    params,
    type_begin: {
      type: ESQUELETO_PROCESAR_TABLA_BEGIN,
      data: { offset, sizePerPage, page, searchText, sortField, sortOrder, defaultSorted },
    },
    type_success: { type: ESQUELETO_PROCESAR_TABLA_SUCCESS },
    type_failure: { type: ESQUELETO_PROCESAR_TABLA_FAILURE },
  });
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissProcesarTablaError() {
  return {
    type: ESQUELETO_PROCESAR_TABLA_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ESQUELETO_PROCESAR_TABLA_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        procesarTablaPending: true,
        procesarTablaError: null,
        page: action.data.page,
        searchText: action.data.searchText,
        sortField: action.data.sortField,
        sortOrder: action.data.sortOrder,
        defaultSorted: action.data.defaultSorted,
        selected: [],
      };

    case ESQUELETO_PROCESAR_TABLA_SUCCESS:
      // The request is success
      return {
        ...state,
        procesarTablaPending: false,
        procesarTablaError: null,
        data: typeof action.data === 'string' ? { items: [], total: 0 } : action.data,
      };

    case ESQUELETO_PROCESAR_TABLA_FAILURE:
      // The request is failed
      return {
        ...state,
        procesarTablaPending: false,
        procesarTablaError: action.data.error,
        page: 1,
        data: { items: [], total: 0 },
      };

    case ESQUELETO_PROCESAR_TABLA_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        procesarTablaError: null,
      };

    default:
      return state;
  }
}
