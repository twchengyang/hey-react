import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './index.css';
import App from './pages/App';
import History from './pages/History'

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <App />
      </Route>
      <Route exact path="/show">
        <History />
      </Route>
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
