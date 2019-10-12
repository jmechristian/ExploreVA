import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faImage,
  faCheckCircle,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';

const AddContent = () => {
  return (
    <div>
      <div className="mb-8 flex justify-center">
        <div className="text-4xl font-extrabold text-center w-3/4">
          We Went and Did Something!
        </div>
      </div>
      <form className="flex flex-col items-center">
        <div className="flex flex-col justify-left mb-6 w-3/4 md:w-1/2">
          <label
            className="block text-indigo-300 text-sm font-bold mb-2 uppercase"
            htmlFor="username"
          >
            Where Did We Go?
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder="Enter Title"
          />
        </div>
        <div className="flex flex-col justify-left mb-6 w-3/4 md:w-1/2">
          <label
            className="block text-indigo-300 text-sm font-bold mb-2 uppercase"
            htmlFor="title"
          >
            What did we do?
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="adventure"
            type="text"
            placeholder="Enter our adventures"
            rows="6"
          />
        </div>
        <div className="flex justify-between mb-6 w-3/4 md:w-1/2">
          <div>
            <button>
              <FontAwesomeIcon icon={faImage} size="lg" />
              <span className="text-indigo-300 text-sm font-bold mb-2 uppercase ml-2">
                Add Images
              </span>
            </button>
          </div>
          <div>
            <button>
              <FontAwesomeIcon icon={faCheckCircle} size="lg" />
            </button>
            <button className="ml-4">
              <FontAwesomeIcon icon={faTimesCircle} size="lg" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddContent;
