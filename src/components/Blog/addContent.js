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
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleDeleteDraft = () => {
    setTitle('');
    setImage('');
    setContent('');
    dispatch({ type: 'DELETE_DRAFT' });
  };

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
      setSubmitting(true);
      const url = await handleImageUpload();
      const { latitude, longitude } = state.draft;
      const pinData = { title, image: url, content, latitude, longitude };
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
        <div className="text-5xl font-extrabold text-left w-3/4 leading-tight">
          We Went and Did Things!
        </div>
      </div>
      <form className="flex flex-col items-center">
        <div className="flex flex-col justify-left mb-6 w-3/4">
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
              onChange={e => setImage(e.target.files[0])}
              multiple
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={
                !title.trim() || !content.trim() || !image || submitting
              }
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
