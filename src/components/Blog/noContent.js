import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWalking } from '@fortawesome/free-solid-svg-icons';

const NoContent = () => {
  return (
    <div className="px-16 text-center">
      <div>
        <FontAwesomeIcon icon={faWalking} size="6x" />
      </div>
      <div className="text-4xl font-extrabold">
        Click a pin to see what we've been up to!
      </div>
    </div>
  );
};

export default NoContent;
