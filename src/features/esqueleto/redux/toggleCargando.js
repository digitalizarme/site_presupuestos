import {
  ESQUELETO_TOGGLE_CARGANDO_SUCCESS,
} from './constants';

export function toggleCargando(args = {}) {
  return (dispatch, getState) => {
    const cargando = getState().esqueleto.cargando;
    const tiempo = !cargando ? 0 : 100;
    const promise = new Promise((resolve, reject) => {
      setTimeout(function() {
        dispatch({
          type: ESQUELETO_TOGGLE_CARGANDO_SUCCESS,
        });
        resolve();
      }, tiempo);
    });

    return promise;
  };
}


export function reducer(state, action) {
  switch (action.type) {
    case ESQUELETO_TOGGLE_CARGANDO_SUCCESS:
      return {
        ...state,
        cargando: !state.cargando,
      };

    default:
      return state;
  }
}
