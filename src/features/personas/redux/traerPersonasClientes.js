import {
  PERSONAS_TRAER_PERSONAS_CLIENTES_BEGIN,
  PERSONAS_TRAER_PERSONAS_CLIENTES_SUCCESS,
  PERSONAS_TRAER_PERSONAS_CLIENTES_FAILURE,
  PERSONAS_TRAER_PERSONAS_CLIENTES_DISMISS_ERROR,
} from './constants';
import api_axio from '../../../common/api_axios';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function traerPersonasClientes(args = {}) {
  return api_axio({
    api_funcion: `personas/clientes`,
    type_begin: { type: PERSONAS_TRAER_PERSONAS_CLIENTES_BEGIN },
    type_success: { type: PERSONAS_TRAER_PERSONAS_CLIENTES_SUCCESS },
    type_failure: { type: PERSONAS_TRAER_PERSONAS_CLIENTES_FAILURE },
  });
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissTraerPersonasClientesError() {
  return {
    type: PERSONAS_TRAER_PERSONAS_CLIENTES_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case PERSONAS_TRAER_PERSONAS_CLIENTES_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        traerPersonasClientesPending: true,
        traerPersonasClientesError: null,
        clientes:[]
      };

    case PERSONAS_TRAER_PERSONAS_CLIENTES_SUCCESS:
      // The request is success
      return {
        ...state,
        traerPersonasClientesPending: false,
        traerPersonasClientesError: null,
        clientes: action.data,
      };

    case PERSONAS_TRAER_PERSONAS_CLIENTES_FAILURE:
      // The request is failed
      return {
        ...state,
        traerPersonasClientesPending: false,
        traerPersonasClientesError: action.data.error,
      };

    case PERSONAS_TRAER_PERSONAS_CLIENTES_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        traerPersonasClientesError: null,
      };

    default:
      return state;
  }
}
