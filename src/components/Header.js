import React, { useContext } from 'react';
import { AuthContext } from '../Auth';
import { useMediaQuery } from 'react-responsive';
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

  const isMobile = useMediaQuery({ maxWidth: 767 });
  let headerContent = null;
  if (!isMobile) {
    headerContent = (
      <>
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
      </>
    );
  } else {
    headerContent = null;
  }

  return (
    <div className="flex justify-between items-center py-6 px-10 w-full bg-blue-400 ">
      {headerContent}
    </div>
  );
};

export default Header;
