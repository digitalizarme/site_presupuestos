// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  ESQUELETO_SETA_IMG,
} from './constants';

export function setaImg(img) {
  return {
    type: ESQUELETO_SETA_IMG,
    data: img
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ESQUELETO_SETA_IMG:
      return {
        ...state,
        img: action.data
      };

    default:
      return state;
  }
}
