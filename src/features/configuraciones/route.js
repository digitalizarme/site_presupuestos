// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  PageConfiguraciones,
} from './';

export default {
  path: 'configuraciones',
  name: 'Configuraciones',
  childRoutes: [
    { path: 'page-configuraciones', name: 'Page configuraciones', component: PageConfiguraciones, isIndex: true },
  ],
};
