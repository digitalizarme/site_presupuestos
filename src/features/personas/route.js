// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  ListaPersonas,
  FormPersonasContainer,
} from './';

export default {
  path: 'personas',
  name: 'Personas',
  childRoutes: [
    { path: 'lista-personas', name: 'Lista personas', component: ListaPersonas, isIndex: true,protegido:true, },
    { path: 'nuevo', name: 'Form personas container', component: FormPersonasContainer,protegido:true, },
    { path: 'editar/:id', name: 'Form personas container', component: FormPersonasContainer,protegido:true, },
  ],
};
