// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  PageServiciosGrupo,
} from './';

export default {
  path: 'servicios-grupo',
  name: 'Servicios grupo',
  childRoutes: [
    { path: 'page-servicios-grupo', name: 'Page servicios grupo', component: PageServiciosGrupo, isIndex: true,protegido:true },
  ],
};
