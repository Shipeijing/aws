import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Index from './routes/Index/Index';
import Login from './routes/Login/Index';
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/Login" exact component={Login} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
