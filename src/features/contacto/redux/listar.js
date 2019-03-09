import axios from 'axios';

import {
  CONTACTO_LISTAR_BEGIN,
  CONTACTO_LISTAR_SUCCESS,
  CONTACTO_LISTAR_FAILURE,
  CONTACTO_LISTAR_DISMISS_ERROR,
} from './constants';

import {
  API
} from '../../../common/constantesGenerales';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function listar(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: CONTACTO_LISTAR_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      const doRequest = axios.get(`${API}/contacto`);

      doRequest.then(
        (res) => {
          dispatch({
            type: CONTACTO_LISTAR_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: CONTACTO_LISTAR_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissListarError() {
  return {
    type: CONTACTO_LISTAR_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CONTACTO_LISTAR_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        listarPending: true,
        listarError: null,
      };

    case CONTACTO_LISTAR_SUCCESS:
      // The request is success
      return {
        ...state,
        listarPending: false,
        listarError: null,
        items: action.data.data
      };

    case CONTACTO_LISTAR_FAILURE:
      // The request is failed
      return {
        ...state,
        listarPending: false,
        listarError: action.data.error,
      };

    case CONTACTO_LISTAR_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        listarError: null,
      };

    default:
      return state;
  }
}
