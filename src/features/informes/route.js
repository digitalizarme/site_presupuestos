// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  ComisionesContainer,
} from './';

export default {
  path: 'informes',
  name: 'Informes',
  childRoutes: [
    { path: 'comisiones-container', name: 'Comisiones container', component: ComisionesContainer, isIndex: true },
  ],
};
