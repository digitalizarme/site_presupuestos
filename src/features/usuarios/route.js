// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  PageUsuarios,
} from './';

export default {
  path: 'usuarios',
  name: 'Usuarios',
  childRoutes: [
    { path: 'page-usuarios', name: 'Page usuarios', component: PageUsuarios, isIndex: true,protegido:true, admin:true },
  ],
};
