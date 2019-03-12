import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import homeReducer from '../features/home/redux/reducer';
import commonReducer from '../features/common/redux/reducer';
import examplesReducer from '../features/examples/redux/reducer';
import contactoReducer from '../features/contacto/redux/reducer';
import esqueletoReducer from '../features/esqueleto/redux/reducer';
import serviciosGrupoReducer from '../features/servicios-grupo/redux/reducer';
import accederReducer from '../features/acceder/redux/reducer';
import { reducer as formReducer } from 'redux-form'
import personasReducer from '../features/personas/redux/reducer';

// NOTE 1: DO NOT CHANGE the 'reducerMap' name and the declaration pattern.
// This is used for Rekit cmds to register new features, remove features, etc.
// NOTE 2: always use the camel case of the feature folder name as the store branch name
// So that it's easy for others to understand it and Rekit could manage them.

const reducerMap = {
  router: routerReducer,
  home: homeReducer,
  common: commonReducer,
  examples: examplesReducer,
  contacto: contactoReducer,
  esqueleto: esqueletoReducer,
  serviciosGrupo: serviciosGrupoReducer,
  acceder: accederReducer,
  form: formReducer,
  personas: personasReducer,
};

export default combineReducers(reducerMap);
