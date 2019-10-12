import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './index.css';
import App from './App';
import Login from './components/Login';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from './Auth';

const Root = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={App} />
        </Switch>
        <Switch>
          <Route exact path="/login" component={Login} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
