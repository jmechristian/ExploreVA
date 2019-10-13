import React, { useContext } from 'react';
import PinContext from '../../PinContext';

const DisplayContent = props => {
  const { state } = useContext(PinContext);
  const { currentPin } = state;
  return (
    <div>
      <div className="mb-8 flex flex-col items-center">
        <div className="flex justify-left w-3/4 text-4xl font-extrabold leading-tight">
          {currentPin.location}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex flex-col justify-left mb-6 w-3/4">
          <div className="text-indigo-300 text-sm font-bold mb-2 uppercase">
            What was happening?
          </div>
          <div className="text-white font-semibold text-xl">
            {currentPin.title}
          </div>
        </div>
        <div className="flex flex-col justify-left mb-6 w-3/4">
          <div className="text-indigo-300 text-sm font-bold mb-2 uppercase">
            What Did We Get Up to?
          </div>
          <div className="text-white">{currentPin.content}</div>
        </div>
        <div className="flex flex-wrap justify-between w-3/4">
          <div className="mb-4">
            <img src={currentPin.image} alt="mom" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayContent;
