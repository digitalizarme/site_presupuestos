// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import {
  ESQUELETO_MENU_TOGGLE,
} from './constants';

export function menuToggle() {
  return {
    type: ESQUELETO_MENU_TOGGLE,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ESQUELETO_MENU_TOGGLE:
      return {
        ...state,
        isOpen: !state.isOpen
      };

    default:
      return state;
  }
}
