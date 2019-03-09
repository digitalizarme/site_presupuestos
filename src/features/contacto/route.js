// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  DefaultPage,
  Listar,
} from './';

export default {
  path: 'contacto',
  name: 'Contacto',
  childRoutes: [
    { path: 'default-page', name: 'Default page', component: DefaultPage, isIndex: true },
    { path: 'listar', name: 'Listar', component: Listar },
  ],
};
