// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  ListaFletes,
} from './';

export default {
  path: 'fletes',
  name: 'Fletes',
  childRoutes: [
    { path: 'lista-fletes', name: 'Lista fletes', component: ListaFletes, isIndex: true, protegido:true },
  ],
};
