import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import { volunteerReducer } from './reducers/volunteerReducer';
import { groupReducer } from './reducers/groupReducer';
import { systemReducer } from './reducers/systemReducer';
import { authReducer } from './reducers/auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  volunteerReducer,
  groupReducer,
  systemReducer,
  authReducer,
});

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
