// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  PageServicios,
  FormServiciosContainer,
} from './';

export default {
  path: 'servicios',
  name: 'Servicios',
  childRoutes: [
    { path: 'page-servicios', name: 'Page servicios', component: PageServicios, isIndex: true,protegido:true, },
    { path: 'nuevo', name: 'Nuevo servicio', component: FormServiciosContainer,protegido:true, },
    { path: 'editar/:id', name: 'Editar servicio', component: FormServiciosContainer,protegido:true, },
  ],
};
