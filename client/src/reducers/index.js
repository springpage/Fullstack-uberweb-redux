import { combineReducers } from 'redux';
import authReducer from './authReducer';
import mapReducer from './mapReducer';
import tripReducer from './tripReducer';
import historyReducer from './historyReducer';

export default combineReducers({
  auth: authReducer,
  map: mapReducer,
  trip: tripReducer,
  history: historyReducer
});
