// This is the root reducer of the feature. It is used for:
//   1. Load reducers from each action in the feature and process them one by one.
//      Note that this part of code is mainly maintained by Rekit, you usually don't need to edit them.
//   2. Write cross-topic reducers. If a reducer is not bound to some specific action.
//      Then it could be written here.
// Learn more from the introduction of this approach:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da.

import initialState from './initialState';
import { reducer as menuToggleReducer } from './menuToggle';
import { reducer as procesarTablaReducer } from './procesarTabla';
import { reducer as lineaSeleccionadaReducer } from './lineaSeleccionada';
import { reducer as modalToggleReducer } from './modalToggle';
import { reducer as traerItemReducer } from './traerItem';
import { reducer as limpiarItemReducer } from './limpiarItem';
import { reducer as limpiarLineaSeleccionadaReducer } from './limpiarLineaSeleccionada';
import { reducer as limpiarItemLineaReducer } from './limpiarItemLinea';
import { reducer as setaImgReducer } from './setaImg';
import { reducer as toggleCargandoReducer } from './toggleCargando';
import { reducer as limpiaImgReducer } from './limpiaImg';
import { reducer as pararCargandoReducer } from './pararCargando';
import { reducer as iniciarCargandoReducer } from './iniciarCargando';
import { reducer as reiniciaTablaParamsReducer } from './reiniciaTablaParams';
import { reducer as noLimpiarFormModalReducer } from './noLimpiarFormModal';

const reducers = [
  menuToggleReducer,
  procesarTablaReducer,
  lineaSeleccionadaReducer,
  modalToggleReducer,
  traerItemReducer,
  limpiarItemReducer,
  limpiarLineaSeleccionadaReducer,
  limpiarItemLineaReducer,
  setaImgReducer,
  toggleCargandoReducer,
  limpiaImgReducer,
  pararCargandoReducer,
  iniciarCargandoReducer,
  reiniciaTablaParamsReducer,
  noLimpiarFormModalReducer,
];

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    // Handle cross-topic actions here
    default:
      newState = state;
      break;
  }
  return reducers.reduce((s, r) => r(s, action), newState);
}
