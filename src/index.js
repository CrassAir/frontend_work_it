import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from 'react-redux';
import thunk  from 'redux-thunk';
import reducer from './store/reducer';
import {BrowserRouter} from "react-router-dom";

const composeEnhances = compose;

const store = createStore(reducer, [], composeEnhances(
    applyMiddleware(thunk)
));

const app = (
  <Provider store={store}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
