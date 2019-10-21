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
  if (!isMobile || currentUser) {
    headerContent = (
      <>
        <div className="font-color-tertiary text-xs font-bold uppercase">
          Hello, {currentUser.displayName}
        </div>
        <button
          onClick={signOutHandler}
          className="font-color-tertiary text-xs font-bold uppercase"
        >
          Sign Out
        </button>
      </>
    );
  } else {
    headerContent = null;
  }

  return (
    <div className="flex justify-between items-center py-6 px-10 w-full">
      {headerContent}
    </div>
  );
};

export default Header;
