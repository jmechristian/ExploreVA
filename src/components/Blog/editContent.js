import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import {
  faCheckCircle,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import PinContext from '../../PinContext';
import { db } from '../../firebase';

const EditContent = props => {
  const { state, dispatch } = useContext(PinContext);
  const [newTitle, setNewTitle] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newContent, setNewContent] = useState('');
  const [image, setImage] = useState('');

  const handleImageUpload = async () => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'exploreVA');
    data.append('cloud_name', 'jmechristian');
    const res = await axios.post(
      'https://api.cloudinary.com/v1_1/jmechristian/image/upload',
      data
    );
    return res.data.url;
  };

  const handleSubmit = async event => {
    try {
      event.preventDefault();
      const url = await handleImageUpload();
      const { latitude, longitude } = state.currentPin;
      const title = !newTitle ? state.currentPin.title : newTitle;
      const location = !newLocation ? state.currentPin.location : newLocation;
      const content = !newContent ? state.currentPin.content : newContent;
      const pinData = {
        title,
        location,
        image: url,
        content,
        latitude,
        longitude
      };
      await db
        .collection('users')
        .doc(`${props.user.uid}`)
        .collection('pins')
        .doc(`${state.currentPin.id}`)
        .set(pinData);
      dispatch({ type: 'UPDATE_PIN' });
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancelEdit = () => {
    dispatch({ type: 'CANCEL_EDIT' });
  };

  return (
    <div>
      <div className="mb-10 flex justify-center">
        <div className="text-5xl font-extrabold text-left w-3/4 leading-tight">
          We Went and Did Things!
        </div>
      </div>
      <form className="flex flex-col items-center">
        <div className="flex flex-col justify-left mb-6 w-3/4">
          <label
            className="block text-indigo-300 text-sm font-bold mb-2 uppercase"
            htmlFor="location"
          >
            Where Did We Go?
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="location"
            type="text"
            placeholder={state.currentPin.location}
            value={!newLocation ? state.currentPin.location : newLocation}
            onChange={e => setNewLocation(e.target.value)}
          />
        </div>
        <div className="flex flex-col justify-left mb-6 w-3/4">
          <label
            className="block text-indigo-300 text-sm font-bold mb-2 uppercase"
            htmlFor="title"
          >
            Why Were We There?
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="title"
            type="text"
            placeholder={state.currentPin.title}
            value={!newTitle ? state.currentPin.title : newTitle}
            onChange={e => setNewTitle(e.target.value)}
          />
        </div>
        <div className="flex flex-col justify-left mb-6 w-3/4">
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
            placeholder={state.currentPin.content}
            rows="6"
            value={!newContent ? state.currentPin.content : newContent}
            onChange={e => setNewContent(e.target.value)}
          />
        </div>
        <div className="flex justify-between mb-6 w-3/4">
          <div className="w-1/2">
            <input
              type="file"
              accept="image/*"
              id="image"
              onChange={e => setImage(e.target.files[0])}
              multiple
            />
          </div>
          <div>
            <button type="submit" onClick={handleSubmit}>
              <FontAwesomeIcon
                icon={faCheckCircle}
                size="lg"
                className="font-color-tertiary"
              />
            </button>
            <button className="ml-4" onClick={handleCancelEdit}>
              <FontAwesomeIcon
                icon={faTimesCircle}
                size="lg"
                className="font-color-tertiary"
              />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditContent;
