// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  ListaMercaderiasMarcas,
} from './';

export default {
  path: 'mercaderias-marcas',
  name: 'Mercaderias marcas',
  childRoutes: [
    { path: 'lista-mercaderias-marcas', name: 'Lista mercaderias marcas', component: ListaMercaderiasMarcas, isIndex: true, protegido:true },
  ],
};
