// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  ListaMercaderiasSubGrupos,
} from './';

export default {
  path: 'mercaderias-sub-grupos',
  name: 'Mercaderias sub grupos',
  childRoutes: [
    { path: 'lista-mercaderias-sub-grupos', name: 'Lista mercaderias sub grupos', component: ListaMercaderiasSubGrupos, isIndex: true,protegido:true },
  ],
};
