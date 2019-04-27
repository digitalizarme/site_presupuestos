// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  ListaCotizaciones,
} from './';

export default {
  path: 'cotizaciones',
  name: 'Cotizaciones',
  childRoutes: [
    { path: 'lista-cotizaciones', name: 'Lista cotizaciones', component: ListaCotizaciones, isIndex: true,protegido:true, admin:true },
  ],
};
