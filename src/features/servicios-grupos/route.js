// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  ListaServiciosGrupo,
} from './';

export default {
  path: 'servicios-grupos',
  name: 'Servicios grupos',
  childRoutes: [
    { path: 'lista-servicios-grupo', name: 'Lista servicios grupo', component: ListaServiciosGrupo, isIndex: true,protegido:true },
  ],
};
