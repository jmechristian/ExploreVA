import React, { useContext } from 'react';
import { AuthContext } from '../Auth';
import app from '../firebase';

const Header = () => {
  const { currentUser } = useContext(AuthContext);

  const signOutHandler = async () => {
    try {
      await app.auth().signOut();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-between text-white p-6 w-full bg-blue-400">
      <div>Hello, {currentUser.displayName}</div>
      <div>
        <button onClick={signOutHandler}>Sign Out</button>
      </div>
    </div>
  );
};

export default Header;
