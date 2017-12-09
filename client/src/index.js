import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './index.css';
import AccountHome from './screens/AccountHome';
import AccountDetails from './screens/AccountDetails';

import registerServiceWorker from './registerServiceWorker';


ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={AccountHome} />
      <Route exact path="/accounts/:accountId" component={AccountDetails} />
    </Switch>
  </BrowserRouter>
  , document.getElementById('root')
);

registerServiceWorker();
