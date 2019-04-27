// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  PageMercaderiasGrupos,
} from './';

export default {
  path: 'mercaderias-grupos',
  name: 'Mercaderias grupos',
  childRoutes: [
    { path: 'page-mercaderias-grupos', name: 'Page mercaderias grupos', component: PageMercaderiasGrupos, isIndex: true,protegido:true },
  ],
};
