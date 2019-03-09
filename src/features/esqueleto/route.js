// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  Principal,
} from './';

export default {
  path: 'esqueleto',
  name: 'Esqueleto',
  childRoutes: [
    { path: 'principal', name: 'Principal', component: Principal, isIndex: true },
  ],
};
