import React, { useContext } from 'react';

import NoContent from './Blog/noContent';
import DisplayContent from './Blog/displayContent';
import PinContext from '../PinContext';
import { AuthContext } from '../Auth';

const BlogDisplay = () => {
  const { state } = useContext(PinContext);
  const { currentUser } = useContext(AuthContext);
  const { draft, currentPin, editMode } = state;

  let BlogContent;
  if (!draft && !currentPin && !editMode) {
    BlogContent = <NoContent />;
  } else if (!draft && currentPin && !editMode) {
    BlogContent = <DisplayContent user={currentUser} />;
  }

  return (
    <div className="flex flex-col w-full lg:w-1/3 bg-primary items-center">
      <div className="flex w-full bg-primary h-full">
        <div className="text-white flex-1  self-center">{BlogContent}</div>
      </div>
    </div>
  );
};

export default BlogDisplay;
