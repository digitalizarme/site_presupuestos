// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  ListaPresupuestos,
} from './';

export default {
  path: 'presupuestos',
  name: 'Presupuestos',
  childRoutes: [
    { path: 'lista-presupuestos', name: 'Lista presupuestos', component: ListaPresupuestos, isIndex: true, protegido:true },
  ],
};
