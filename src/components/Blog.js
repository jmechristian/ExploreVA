import React, { useContext } from 'react';
import app from '../firebase';

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

  const signOutHandler = async () => {
    try {
      await app.auth().signOut();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col w-full md:w-1/3 bg-primary items-center">
      <div className="flex justify-between items-center mt-8 w-3/4">
        <div className="text-white text-xs font-bold uppercase font-color-tertiary">
          Hello, {currentUser.displayName}
        </div>
        <div>
          <button
            onClick={signOutHandler}
            className="text-white text-xs font-bold uppercase font-color-tertiary"
          >
            Sign Out
          </button>
        </div>
      </div>
      <div className="flex w-full bg-primary h-full">
        <div className="text-white flex-1  self-center">{BlogContent}</div>
      </div>
    </div>
  );
};

export default Blog;
