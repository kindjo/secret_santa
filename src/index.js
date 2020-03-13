import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { reducer as fromReducer } from 'redux-form';
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension/logOnlyInProduction";

import hostReducer from './store/reducers/host';
import infoReducer from './store/reducers/info';
import participantsReducer from './store/reducers/participants';
import formValidityReducer from './store/reducers/formValidity';

const rootReducer = combineReducers({
  host: hostReducer,
  info: infoReducer,
  participants: participantsReducer,
  formValidity: formValidityReducer,
  form: fromReducer
});

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, 
  document.getElementById('root')
);

serviceWorker.unregister();
