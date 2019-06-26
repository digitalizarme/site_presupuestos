import {
  PRESUPUESTOS_TRAER_PRESUPUESTO_BEGIN,
  PRESUPUESTOS_TRAER_PRESUPUESTO_SUCCESS,
  PRESUPUESTOS_TRAER_PRESUPUESTO_FAILURE,
  PRESUPUESTOS_TRAER_PRESUPUESTO_DISMISS_ERROR,
} from './constants';
import api_axio from '../../../common/api_axios';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function traerPresupuesto(param) {
  return api_axio({
    api_funcion: `presupuestos/${param.id}`,
    type_begin: { type: PRESUPUESTOS_TRAER_PRESUPUESTO_BEGIN },
    type_success: { type: PRESUPUESTOS_TRAER_PRESUPUESTO_SUCCESS },
    type_failure: { type: PRESUPUESTOS_TRAER_PRESUPUESTO_FAILURE },
  });
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissTraerPresupuestoError() {
  return {
    type: PRESUPUESTOS_TRAER_PRESUPUESTO_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case PRESUPUESTOS_TRAER_PRESUPUESTO_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        traerPresupuestoPending: true,
        traerPresupuestoError: null,
        presupuesto: {},
        items: [],
      };

    case PRESUPUESTOS_TRAER_PRESUPUESTO_SUCCESS:
      // The request is success
      return {
        ...state,
        traerPresupuestoPending: false,
        traerPresupuestoError: null,
        presupuesto: action.data,
      };

    case PRESUPUESTOS_TRAER_PRESUPUESTO_FAILURE:
      // The request is failed
      return {
        ...state,
        traerPresupuestoPending: false,
        traerPresupuestoError: action.data.error,
      };

    case PRESUPUESTOS_TRAER_PRESUPUESTO_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        traerPresupuestoError: null,
      };

    default:
      return state;
  }
}
