import React, { useContext } from 'react';
import Header from './Header';

import AddContent from './Blog/addContent';
import NoContent from './Blog/noContent';
import DisplayContent from './Blog/displayContent';
import PinContext from '../PinContext';
import { AuthContext } from '../Auth';

const Blog = () => {
  const { state } = useContext(PinContext);
  const { currentUser } = useContext(AuthContext);
  const { draft, currentPin } = state;

  let BlogContent = <NoContent />;

  if (draft && !currentPin) {
    BlogContent = AddContent;
  } else if (!draft && !currentPin) {
    BlogContent = NoContent;
  } else if (!draft && currentPin) {
    BlogContent = DisplayContent;
  }

  return (
    <div className="flex flex-col w-full md:w-1/3">
      <Header />
      <div className="flex w-full bg-indigo-700 md:h-screen">
        <div className="text-white self-center flex-1">
          <BlogContent user={currentUser} />
        </div>
      </div>
    </div>
  );
};

export default Blog;
