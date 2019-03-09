// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  PagePersonas,
  FormPersonasContainer,
} from './';

export default {
  path: 'personas',
  name: 'Personas',
  childRoutes: [
    { path: 'page-personas', name: 'Page personas', component: PagePersonas, isIndex: true },
    { path: 'nuevo', name: 'Form personas container', component: FormPersonasContainer },
    { path: 'editar/:id', name: 'Form personas container', component: FormPersonasContainer },
  ],
};
