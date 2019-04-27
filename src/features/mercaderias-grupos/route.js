// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  ListaMercaderiasGrupos,
} from './';

export default {
  path: 'mercaderias-grupos',
  name: 'Mercaderias grupos',
  childRoutes: [
    { path: 'lista-mercaderias-grupos', name: 'Lista mercaderias grupos', component: ListaMercaderiasGrupos, isIndex: true,protegido:true },
  ],
};
