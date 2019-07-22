// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import { ListaUsuarios, MiUsuario } from './';

export default {
  path: 'usuarios',
  name: 'Usuarios',
  childRoutes: [
    {
      path: 'lista-usuarios',
      name: 'Lista usuarios',
      component: ListaUsuarios,
      isIndex: true,
      protegido: true,
      admin: true,
    },
    { path: 'miUsuario', name: 'Mi usuario', component: MiUsuario, protegido: true },
  ],
};
