// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  FormConfiguracionesContainer,
} from './';

export default {
  path: 'configuraciones',
  name: 'Configuraciones',
  childRoutes: [
    { path: 'form-configuraciones-container', name: 'Form configuraciones container', component: FormConfiguracionesContainer, isIndex: true,protegido:true, admin:true },
  ],
};
