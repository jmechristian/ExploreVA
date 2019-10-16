import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const NoContent = () => {
  return (
    <div className="flex flex-col items-center text-center mb-16">
      <div className="flex mb-6">
        <FontAwesomeIcon
          icon={faMapMarkerAlt}
          size="6x"
          className="font-color-secondary"
        />
      </div>
      <div className="text-4xl md:text-5xl font-extrabold flex w-3/4 mb-8 lg:mb-16 leading-tight font-secondary">
        Click a pin to see what we've been up to!
      </div>
      <div className="md:text-2xl text-indigo-300 flex w-3/4 my-8">
        Use your mouse to zoom and move around the map.
      </div>
    </div>
  );
};

export default NoContent;
