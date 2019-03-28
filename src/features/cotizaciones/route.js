// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  PageCotizaciones,
} from './';

export default {
  path: 'cotizaciones',
  name: 'Cotizaciones',
  childRoutes: [
    { path: 'page-cotizaciones', name: 'Page cotizaciones', component: PageCotizaciones, isIndex: true },
  ],
};
