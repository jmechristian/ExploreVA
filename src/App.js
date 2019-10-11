import React from 'react';
import Blog from './components/Blog';
import Map from './components/Map';

function App() {
  return (
    <div className="flex flex-col md:flex-row">
      <Map />
      <Blog />
    </div>
  );
}

export default App;
