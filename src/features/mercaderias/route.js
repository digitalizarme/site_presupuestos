// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  ListaMercaderias,
  FormMercaderiasContainer,
} from './';

export default {
  path: 'mercaderias',
  name: 'Mercaderias',
  childRoutes: [
    { path: 'lista-mercaderias', name: 'Lista mercaderias', component: ListaMercaderias, isIndex: true, protegido:true },
    { path: 'nuevo', name: 'Nueva mercaderia', component: FormMercaderiasContainer, protegido:true },
    { path: 'editar/:id', name: 'Editar mercaderia', component: FormMercaderiasContainer, protegido:true },
  ],
};
