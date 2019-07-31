// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import { ESQUELETO_REINICIA_TABLA_PARAMS } from './constants';
import initialState from './initialState';

export function reiniciaTablaParams() {
  return {
    type: ESQUELETO_REINICIA_TABLA_PARAMS,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ESQUELETO_REINICIA_TABLA_PARAMS:
      return {
        ...state,
        offset: initialState.offset,
        sizePerPage: initialState.sizePerPage,
        page: initialState.page,
        sortField: initialState.sortField,
        sortOrder: initialState.sortOrder,
        columns: initialState.columns,
        searchText: initialState.searchText,
        defaultSorted: initialState.defaultSorted,
      };

    default:
      return state;
  }
}
