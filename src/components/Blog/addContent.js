import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import {
  faCheckCircle,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import PinContext from '../../PinContext';
import { db } from '../../firebase';

const AddContent = props => {
  const { state, dispatch } = useContext(PinContext);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  // const [secureURL, setSecureURL] = useState('');

  const handleDeleteDraft = () => {
    setTitle('');
    setLocation('');
    setContent('');
    setImage('');
    dispatch({ type: 'DELETE_DRAFT' });
  };

  const handleImageUpload = async () => {
    // event.preventDefault();
    let newArray = [];
    image.map(async fle => {
      const data = new FormData();
      data.append('file', fle);
      data.append('upload_preset', 'exploreVA');
      data.append('cloud_name', 'jmechristian');

      const upload = await axios.post(
        'https://api.cloudinary.com/v1_1/jmechristian/image/upload',
        data
      );

      const urls = await upload.data.secure_url;
      console.log(urls);
      newArray.push({ url: urls });
    });
    return newArray;
  };

  // const handleImageUpload = async () => {
  //   const data = new FormData();
  //   // for (var x = 0; x < image.length; x++) {
  //   //   data.append('file', image[x]);
  //   // }
  //   data.append('file', image);
  //   data.append('upload_preset', 'exploreVA');
  //   data.append('cloud_name', 'jmechristian');
  //   const res = await axios.post(
  //     'https://api.cloudinary.com/v1_1/jmechristian/image/upload',
  //     data
  //   );
  //   return res.data.secure_url;
  // };

  const handleSubmit = async event => {
    try {
      event.preventDefault();
      const updatedUrls = await handleImageUpload();
      console.log(state.secureUrls);
      const { latitude, longitude } = state.draft;
      const pinData = {
        title,
        image: FieldValue.arrayUnion(updatedUrls),
        location,
        content,
        latitude,
        longitude
      };
      await db
        .collection('users')
        .doc(`${props.user.uid}`)
        .collection('pins')
        .doc()
        .set(pinData);
      console.log(pinData);
      handleDeleteDraft();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="mb-10 flex justify-center">
        <div className="text-5xl lg:text-6xl font-extrabold text-left w-3/4 leading-tight font-secondary tracking-wide">
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
            placeholder="Enter Location"
            value={location}
            onChange={e => setLocation(e.target.value)}
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
            placeholder="Enter Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
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
            placeholder="Enter our adventures"
            rows="6"
            value={content}
            onChange={e => setContent(e.target.value)}
          />
        </div>
        <div className="flex justify-between mb-6 w-3/4">
          <div className="w-1/2">
            <input
              type="file"
              accept="image/*"
              id="image"
              onChange={event => setImage([...image, ...event.target.files])}
              multiple
            />
          </div>
          <div>
            <button
              type="submit"
              // disabled={
              //   !location.trim() ||
              //   !title.trim() ||
              //   !content.trim() ||
              //   !image ||
              //   submitting
              // }
              onClick={handleSubmit}
            >
              <FontAwesomeIcon icon={faCheckCircle} size="lg" />
            </button>
            <button className="ml-4" onClick={handleDeleteDraft}>
              <FontAwesomeIcon icon={faTimesCircle} size="lg" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddContent;
