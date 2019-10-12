import React, { useContext } from 'react';
import { AuthContext } from '../Auth';

const Header = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="flex p-6 w-full bg-blue-400">
      Hello, {currentUser.displayName}
    </div>
  );
};

export default Header;
