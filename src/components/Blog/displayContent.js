import React, { useContext } from 'react';
import PinContext from '../../PinContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { db } from '../../firebase';

const DisplayContent = props => {
  const setEditMode = () => {
    dispatch({ type: 'EDIT_MODE' });
  };

  const deleteHandler = async id => {
    try {
      await db
        .collection('users')
        .doc(`${props.user.uid}`)
        .collection('pins')
        .doc(`${id}`)
        .delete();
      dispatch({ type: 'DELETE_PIN' });
      console.log('Deleted');
    } catch (err) {
      console.log(err);
    }
  };
  const { state, dispatch } = useContext(PinContext);
  const { currentPin } = state;
  return (
    <div className="flex flex-col content-center">
      <div className="mb-6 flex flex-col items-center">
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
          <div className="mb-6">
            <img src={currentPin.image} alt="mom" />
          </div>
        </div>
        <div className="flex justify-end w-3/4">
          <div>
            <button onClick={setEditMode}>
              <FontAwesomeIcon icon={faEdit} size="lg" />
            </button>
          </div>
          <div>
            <button
              onClick={deleteHandler.bind(this, currentPin.id)}
              className="ml-4"
            >
              <FontAwesomeIcon icon={faMinusCircle} size="lg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayContent;
