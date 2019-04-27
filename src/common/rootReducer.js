import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
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

// NOTE 1: DO NOT CHANGE the 'reducerMap' name and the declaration pattern.
// This is used for Rekit cmds to register new features, remove features, etc.
// NOTE 2: always use the camel case of the feature folder name as the store branch name
// So that it's easy for others to understand it and Rekit could manage them.

const reducerMap = {
  router: routerReducer,
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
};

export default combineReducers(reducerMap);
