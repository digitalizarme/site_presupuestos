// Rekit uses a new approach to organizing actions and reducers. That is
// putting related actions and reducers in one file. See more at:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da

import { ESQUELETO_MODAL_TOGGLE } from './constants';

export function modalToggle() {
  return {
    type: ESQUELETO_MODAL_TOGGLE,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case ESQUELETO_MODAL_TOGGLE:
      return {
        ...state,
        isOpenModal: !state.isOpenModal,
      };

    default:
      return state;
  }
}
