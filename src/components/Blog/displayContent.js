import React, { useContext } from 'react';
import PinContext from '../../PinContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { db, storage } from '../../firebase';
import { AuthContext } from '../../Auth';

const DisplayContent = props => {
  const { state, dispatch } = useContext(PinContext);
  const { currentUser } = useContext(AuthContext);
  const { currentPin } = state;

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

  let editContent = null;
  if (currentUser) {
    editContent = (
      <>
        <div>
          <button onClick={deleteHandler.bind(this, currentPin.id)}>
            <FontAwesomeIcon
              icon={faMinusCircle}
              size="lg"
              className="font-color-tertiary"
            />
          </button>
        </div>
        <div className="ml-4">
          <button onClick={setEditMode}>
            <FontAwesomeIcon
              icon={faEdit}
              size="lg"
              className="font-color-tertiary"
            />
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col content-center">
      <div className="mb-6 md:mb-8 flex flex-col items-center">
        <div className="flex justify-left w-3/4 text-5xl font-extrabold leading-none font-secondary tracking-wide">
          {currentPin.location}
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="flex flex-col justify-left mb-6 w-3/4">
          <div className="text-indigo-300 text-sm font-bold mb-2 uppercase">
            What was happening?
          </div>
          <div className="text-white font-semibold text-2xl">
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
            {currentPin.image.map(image => (
              <div className="w-50 flex-wrap">
                <img src={image} alt="your mom" />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end w-3/4 mb-8">{editContent}</div>
      </div>
    </div>
  );
};

export default DisplayContent;
