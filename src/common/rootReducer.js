import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import homeReducer from '../features/home/redux/reducer';
import commonReducer from '../features/common/redux/reducer';
import esqueletoReducer from '../features/esqueleto/redux/reducer';
import serviciosGruposReducer from '../features/servicios-grupos/redux/reducer';
import accederReducer from '../features/acceder/redux/reducer';
import { reducer as formReducer } from 'redux-form'
import personasReducer from '../features/personas/redux/reducer';
import usuariosReducer from '../features/usuarios/redux/reducer';
import cotizacionesReducer from '../features/cotizaciones/redux/reducer';
import configuracionesReducer from '../features/configuraciones/redux/reducer';
import serviciosReducer from '../features/servicios/redux/reducer';
import mercaderiasGruposReducer from '../features/mercaderias-grupos/redux/reducer';
import fletesReducer from '../features/fletes/redux/reducer';
import mercaderiasSubGruposReducer from '../features/mercaderias-sub-grupos/redux/reducer';
import mercaderiasMarcasReducer from '../features/mercaderias-marcas/redux/reducer';
import mercaderiasReducer from '../features/mercaderias/redux/reducer';
import segurosReducer from '../features/seguros/redux/reducer';
import presupuestosReducer from '../features/presupuestos/redux/reducer';
import informesReducer from '../features/informes/redux/reducer';

// NOTE 1: DO NOT CHANGE the 'reducerMap' name and the declaration pattern.
// This is used for Rekit cmds to register new features, remove features, etc.
// NOTE 2: always use the camel case of the feature folder name as the store branch name
// So that it's easy for others to understand it and Rekit could manage them.

const reducerMap = {
  router: connectRouter,
  home: homeReducer,
  common: commonReducer,
  esqueleto: esqueletoReducer,
  serviciosGrupos: serviciosGruposReducer,
  acceder: accederReducer,
  form: formReducer,
  personas: personasReducer,
  usuarios: usuariosReducer,
  cotizaciones: cotizacionesReducer,
  configuraciones: configuracionesReducer,
  servicios: serviciosReducer,
  mercaderiasGrupos: mercaderiasGruposReducer,
  fletes: fletesReducer,
  mercaderiasSubGrupos: mercaderiasSubGruposReducer,
  mercaderiasMarcas: mercaderiasMarcasReducer,
  mercaderias: mercaderiasReducer,
  seguros: segurosReducer,
  presupuestos: presupuestosReducer,
  informes: informesReducer,
};

export default (history) => {
  reducerMap.router = connectRouter(history);
  return combineReducers(reducerMap)
  };
