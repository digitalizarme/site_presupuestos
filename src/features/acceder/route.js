// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  PageAcceder,
} from './';

export default {
  path: 'acceder',
  name: 'Acceder',
  childRoutes: [
    { path: 'page-acceder', name: 'Page acceder', component: PageAcceder, isIndex: true },
    { path: 'sinSesion'  , name: 'Page acceder', component: PageAcceder },
  ],
};
