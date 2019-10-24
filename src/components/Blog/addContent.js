import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import PinContext from '../../PinContext';
import { db, storage } from '../../firebase';
import FileUploader from 'react-firebase-file-uploader';

const AddContent = props => {
  const { state, dispatch } = useContext(PinContext);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [content, setContent] = useState('');
  const [downloadUrl, setDownloadUrl] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleDeleteDraft = () => {
    setTitle('');
    setLocation('');
    setContent('');
    setDownloadUrl('');
    dispatch({ type: 'DELETE_DRAFT' });
  };

  const handleSubmit = async event => {
    try {
      event.preventDefault();
      const { latitude, longitude } = state.draft;
      const pinData = {
        title,
        image: downloadUrl,
        location,
        content,
        latitude,
        longitude
      };
      await db
        .collection('users')
        .doc('Y9XHDpvoOpUAdhAb2Bzqox59rKB2')
        .collection('pins')
        .doc()
        .set(pinData);
      console.log(pinData);
      handleDeleteDraft();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUploadStart = () => {
    setIsUploading(true);
    setUploadProgress(0);
  };

  const handleProgress = progress => {
    setUploadProgress(progress);
  };

  const handleUploadError = error => {
    setIsUploading(false);
    console.error(error);
  };

  const handleUploadSuccess = async filename => {
    const downloadURL = await storage
      .ref(`${title}`)
      .child(filename)
      .getDownloadURL();

    setDownloadUrl(prevState => {
      return [...prevState, downloadURL];
    });
  };

  return (
    <div>
      <div className="mb-10 flex justify-center">
        <div className="text-5xl text-left w-3/4 leading-tight font-black tracking-wide">
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
        <div className="flex justify-between mb-6 w-3/4 flex-col md:flex-row md:items-center md:flex-wrap">
          <FileUploader
            accept="image/*"
            name="image-uploader-multiple"
            randomizeFilename
            storageRef={storage.ref(`${title}`)}
            onUploadStart={handleUploadStart.bind(this)}
            onUploadError={handleUploadError.bind(this)}
            onUploadSuccess={handleUploadSuccess.bind(this)}
            onProgress={handleProgress.bind(this)}
            multiple
          />
          <div className="my-4">
            <button
              type="submit"
              disabled={!location.trim() || !title.trim() || !content.trim()}
              onClick={handleSubmit}
            >
              <FontAwesomeIcon icon={faCheckCircle} size="lg" />
            </button>
            <button className="ml-4" onClick={handleDeleteDraft}>
              <FontAwesomeIcon icon={faTimesCircle} size="lg" />
            </button>
          </div>
          <p>Progress: {uploadProgress}</p>
        </div>
      </form>
    </div>
  );
};

export default AddContent;
