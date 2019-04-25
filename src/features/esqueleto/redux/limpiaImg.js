// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  ESQUELETO_LIMPIA_IMG,
} from './constants';

export function limpiaImg() {
  return {
    type: ESQUELETO_LIMPIA_IMG,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ESQUELETO_LIMPIA_IMG:
      return {
        ...state,
        img:null,
      };

    default:
      return state;
  }
}
