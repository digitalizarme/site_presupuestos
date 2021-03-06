// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html
import {
  ListaPresupuestos,
  FormPresupuestosContainer,
  GenerarPdf,
  Redireccionar,
} from './';

export default {
  path: 'presupuestos',
  name: 'Presupuestos',
  childRoutes: [
    { path: 'lista-presupuestos', name: 'Lista presupuestos', component: ListaPresupuestos, isIndex: true, protegido:true },
    { path: 'pendientes', name: 'Presupuestos pendientes', component: ListaPresupuestos, protegido:true },
    { path: 'aprobados', name: 'Presupuestos aprobados', component: ListaPresupuestos, protegido:true, admin:true },
    { path: 'concluidos', name: 'Presupuestos concluidos', component: ListaPresupuestos, protegido:true, admin:true },
    { path: 'nuevo', name: 'Nuevo presupuesto', component: FormPresupuestosContainer, protegido:true },
    { path: 'editar/:id', name: 'Editar presupuesto', component: FormPresupuestosContainer, protegido:true },
    { path: 'pendientes/editar/:id', name: 'Editar presupuesto', component: FormPresupuestosContainer, protegido:true },
    { path: 'aprobados/editar/:id', name: 'Editar presupuesto', component: FormPresupuestosContainer, protegido:true, admin:true },
    { path: 'concluidos/editar/:id', name: 'Editar presupuesto', component: FormPresupuestosContainer, protegido:true, admin:true },
    { path: 'generar_pdf/:id', name: 'Generar pdf', component: GenerarPdf },
    { path: '*', name: 'Redireccionar', component: Redireccionar },

  ],
};
