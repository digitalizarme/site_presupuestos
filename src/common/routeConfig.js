import { App } from '../features/home';
import { PageNotFound } from '../features/common';
import homeRoute from '../features/home/route';
import commonRoute from '../features/common/route';
import _ from 'lodash';
import esqueletoRoute from '../features/esqueleto/route';
import serviciosGruposRoute from '../features/servicios-grupos/route';
import accederRoute from '../features/acceder/route';
import personasRoute from '../features/personas/route';
import usuariosRoute from '../features/usuarios/route';
import cotizacionesRoute from '../features/cotizaciones/route';
import configuracionesRoute from '../features/configuraciones/route';
import serviciosRoute from '../features/servicios/route';
import mercaderiasGruposRoute from '../features/mercaderias-grupos/route';
import fletesRoute from '../features/fletes/route';
import mercaderiasSubGruposRoute from '../features/mercaderias-sub-grupos/route';
import mercaderiasMarcasRoute from '../features/mercaderias-marcas/route';
import mercaderiasRoute from '../features/mercaderias/route';
import segurosRoute from '../features/seguros/route';
import presupuestosRoute from '../features/presupuestos/route';
import informesRoute from '../features/informes/route';

// NOTE: DO NOT CHANGE the 'childRoutes' name and the declaration pattern.
// This is used for Rekit cmds to register routes config for new features, and remove config when remove features, etc.
const childRoutes = [
  homeRoute,
  commonRoute,
  esqueletoRoute,
  serviciosGruposRoute,
  accederRoute,
  personasRoute,
  usuariosRoute,
  cotizacionesRoute,
  configuracionesRoute,
  serviciosRoute,
  mercaderiasGruposRoute,
  fletesRoute,
  mercaderiasSubGruposRoute,
  mercaderiasMarcasRoute,
  mercaderiasRoute,
  segurosRoute,
  presupuestosRoute,
  informesRoute,
];

const routes = [{
  path: '/',
  component: App,
  childRoutes: [
    ...childRoutes,
    { path: '*', name: 'Page not found', component: PageNotFound },
  ].filter(r => r.component || (r.childRoutes && r.childRoutes.length > 0)),
}];

// Handle isIndex property of route config:
//  Dupicate it and put it as the first route rule.
function handleIndexRoute(route) {
  if (!route.childRoutes || !route.childRoutes.length) {
    return;
  }

  const indexRoute = _.find(route.childRoutes, (child => child.isIndex));
  if (indexRoute) {
    const first = { ...indexRoute };
    first.path = '';
    first.exact = true;
    first.autoIndexRoute = true; // mark it so that the simple nav won't show it.
    route.childRoutes.unshift(first);
  }
  route.childRoutes.forEach(handleIndexRoute);
}

routes.forEach(handleIndexRoute);
export default routes;
