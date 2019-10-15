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
    <div className="flex justify-between items-center py-6 px-10 w-full bg-blue-400 ">
      <div className="text-white text-xs font-bold uppercase">
        Hello, {currentUser.displayName}
      </div>
      <div>
        <button
          onClick={signOutHandler}
          className="text-white text-xs font-bold uppercase"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Header;
