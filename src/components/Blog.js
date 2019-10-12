import React from 'react';

// import AddContent from './Blog/addContent';
import NoContent from './Blog/noContent';
// import DisplayContent from './Blog/displayContent';

const Blog = () => {
  let blogContent = <NoContent />;

  return (
    <div className="flex w-full md:w-1/3 bg-indigo-700 md:h-screen">
      <div className="text-white self-center flex-1">{blogContent}</div>
    </div>
  );
};

export default Blog;
