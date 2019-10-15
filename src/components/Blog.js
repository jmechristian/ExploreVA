import React, { useContext } from 'react';
import Header from './Header';

import AddContent from './Blog/addContent';
import NoContent from './Blog/noContent';
import DisplayContent from './Blog/displayContent';
import PinContext from '../PinContext';
import EditContent from './Blog/editContent';
import { AuthContext } from '../Auth';

const Blog = () => {
  const { state } = useContext(PinContext);
  const { currentUser } = useContext(AuthContext);
  const { draft, currentPin, editMode } = state;

  let BlogContent;
  if (!draft && !currentPin && !editMode) {
    BlogContent = <NoContent />;
  } else if (draft && !currentPin) {
    BlogContent = <AddContent user={currentUser} />;
  } else if (!draft && currentPin && !editMode) {
    BlogContent = <DisplayContent user={currentUser} />;
  } else if (editMode && !draft) {
    BlogContent = <EditContent user={currentUser} />;
  }

  return (
    <div className="flex flex-col w-full md:w-1/3">
      <Header />
      <div className="flex w-full bg-indigo-700 md:h-screen">
        <div className="text-white self-center -mt-16 flex-1">
          {BlogContent}
        </div>
      </div>
    </div>
  );
};

export default Blog;
