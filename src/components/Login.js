import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import app, { provider } from '../firebase';
import { AuthContext } from '../Auth';

const Login = ({ history }) => {
  const handleLogin = useCallback(async () => {
    try {
      await app.auth().signInWithPopup(provider);
      history.push('/');
    } catch (error) {
      console.error(error);
    }
  }, [history]);

  const { currentUser } = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <button type="submit" className="bg-blue-800 p-4" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default withRouter(Login);
