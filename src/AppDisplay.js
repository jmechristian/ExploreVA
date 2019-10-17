import React from 'react';
import BlogDisplay from './components/BlogDisplay';
import MapDisplay from './components/MapDisplay';

function AppDisplay() {
  return (
    <div className="flex flex-col lg:flex-row">
      <MapDisplay />
      <BlogDisplay />
    </div>
  );
}

export default AppDisplay;
