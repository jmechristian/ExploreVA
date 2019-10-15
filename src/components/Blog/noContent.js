import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWalking } from '@fortawesome/free-solid-svg-icons';

const NoContent = () => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex mb-4">
        <FontAwesomeIcon
          icon={faWalking}
          size="6x"
          className="font-color-secondary"
        />
      </div>
      <div className="text-4xl font-extrabold flex w-3/4">
        Click a pin to see what we've been up to!
      </div>
      <div className="text-2xl font-extrabold flex w-3/4">
        Use your mouse to zoom and move around the map.
      </div>
    </div>
  );
};

export default NoContent;
