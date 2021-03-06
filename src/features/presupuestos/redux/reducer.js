// This is the root reducer of the feature. It is used for:
//   1. Load reducers from each action in the feature and process them one by one.
//      Note that this part of code is mainly maintained by Rekit, you usually don't need to edit them.
//   2. Write cross-topic reducers. If a reducer is not bound to some specific action.
//      Then it could be written here.
// Learn more from the introduction of this approach:
// https://medium.com/@nate_wang/a-new-approach-for-managing-redux-actions-91c26ce8b5da.

import initialState from './initialState';
import { reducer as traeStatusReducer } from './traeStatus';
import { reducer as traerPresupuestoReducer } from './traerPresupuesto';
import { reducer as traeFrecuenciasReducer } from './traeFrecuencias';
import { reducer as traeItemsReducer } from './traeItems';
import { reducer as traeMercaderiasServiciosReducer } from './traeMercaderiasServicios';
import { reducer as generaCuotasReducer } from './generaCuotas';
import { reducer as traeCuotasReducer } from './traeCuotas';
import { reducer as eliminaCuotasReducer } from './eliminaCuotas';
import { reducer as traeCobradoresReducer } from './traeCobradores';
import { reducer as traeMediosPagoReducer } from './traeMediosPago';
import { reducer as actualizaCuotaReducer } from './actualizaCuota';
import { reducer as limpiaCuotasReducer } from './limpiaCuotas';

const reducers = [
  traeStatusReducer,
  traerPresupuestoReducer,
  traeFrecuenciasReducer,
  traeItemsReducer,
  traeMercaderiasServiciosReducer,
  generaCuotasReducer,
  traeCuotasReducer,
  eliminaCuotasReducer,
  traeCobradoresReducer,
  traeMediosPagoReducer,
  actualizaCuotaReducer,
  limpiaCuotasReducer,
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
