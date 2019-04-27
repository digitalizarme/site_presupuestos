// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  ListaSeguros,
} from './';

export default {
  path: 'seguros',
  name: 'Seguros',
  childRoutes: [
    { path: 'lista-seguros', name: 'Lista seguros', component: ListaSeguros, isIndex: true, protegido:true },
  ],
};
