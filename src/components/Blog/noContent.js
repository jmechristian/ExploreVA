import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { useMediaQuery } from 'react-responsive';

const NoContent = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <div className="flex flex-col items-center text-center my-8">
      <div className="flex mb-6">
        <FontAwesomeIcon
          icon={faMapMarkerAlt}
          size={isMobile ? '4x' : '6x'}
          className="font-color-secondary"
        />
      </div>
      <div className="text-4xl md:text-5xl flex w-3/4 mb-8 lg:mb-8 leading-tight font-secondary">
        Click a pin to see what we've been up to!
      </div>
      <div className="flex text-lg justify-center text-indigo-300 flex my-12 w-3/4 ">
        Use your mouse to zoom and move around the map.
      </div>
    </div>
  );
};

export default NoContent;
