import React, { useContext, useReducer } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import './index.css';
import App from './App';
import Login from './components/Login';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from './Auth';
import PinContext from './PinContext';
import reducer from './reducer';
import AppDisplay from './AppDisplay';

const Root = () => {
  const initialState = useContext(PinContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthProvider>
      <PinContext.Provider value={{ state, dispatch }}>
        <Router>
          <Route exact path="/" component={AppDisplay} />
          <Switch>
            <PrivateRoute exact path="/app" component={App} />
          </Switch>
          <Switch>
            <Route exact path="/login" component={Login} />
          </Switch>
        </Router>
      </PinContext.Provider>
    </AuthProvider>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
