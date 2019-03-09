// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  ESQUELETO_API_GENERICO,
} from './constants';

import api_axio from '../../../common/api_axios';

export function apiGenerico({api_funcion, params}) {
  return api_axio({
    api_funcion,
    params,
  });
}


export function reducer(state, action) {
  switch (action.type) {
    case ESQUELETO_API_GENERICO:
      return {
        ...state,
      };

    default:
      return state;
  }
}
