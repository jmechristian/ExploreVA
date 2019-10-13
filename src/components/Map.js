import React, { useState, useEffect, useContext } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWalking, faHome } from '@fortawesome/free-solid-svg-icons';
import PinContext from '../PinContext';
import { AuthContext } from '../Auth';
import { db } from '../firebase';

const INITIAL_VIEWPORT = {
  latitude: 37.7577,
  longitude: -122.4376,
  zoom: 8
};

const Map = () => {
  const { state, dispatch } = useContext(PinContext);
  const { currentUser } = useContext(AuthContext);
  const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
  const [userPosition, setUserPosition] = useState(null);

  const ref = db
    .collection('users')
    .doc(`${currentUser.uid}`)
    .collection('pins');

  useEffect(() => {
    getUserPosition();
  }, []);

  useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      const pins = [];
      querySnapshot.forEach(pin => {
        const { content, image, latitude, longitude, title } = pin.data();
        pins.push({
          id: pin.id,
          content,
          image,
          latitude,
          longitude,
          title
        });
      });

      dispatch({ type: 'SET_PINS', payload: pins });
    });
  });

  const getUserPosition = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        setViewport({ ...viewport, latitude, longitude });
        setUserPosition({ latitude, longitude });
      });
    }
  };

  const handleMapClick = ({ lngLat, leftButton }) => {
    if (!leftButton) return;
    if (!state.draft) {
      dispatch({ type: 'CREATE_DRAFT' });
    }
    const [longitude, latitude] = lngLat;
    dispatch({
      type: 'UPDATE_DRAFT_LOCATION',
      payload: { longitude, latitude }
    });
  };

  return (
    <div className="w-full md:w-2/3 md:h-screen">
      <ReactMapGL
        width="100%"
        height="100vh"
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxApiAccessToken="pk.eyJ1Ijoiam1lY2hyaXN0aWFuIiwiYSI6ImNrMWljamw4bDBqcGEzbm55Ynd2ZXl2cjgifQ.Ri325k-o8GPgudwW6o2NHw"
        onViewportChange={newViewport => setViewport(newViewport)}
        onClick={handleMapClick}
        {...viewport}
      >
        {userPosition && (
          <Marker
            latitude={userPosition.latitude}
            longitude={userPosition.longitude}
            offsetLeft={-19}
            offsetTop={-37}
          >
            <FontAwesomeIcon icon={faHome} size="lg" />
          </Marker>
        )}
        {state.draft && (
          <Marker
            latitude={state.draft.latitude}
            longitude={state.draft.longitude}
            offsetLeft={-19}
            offsetTop={-37}
          >
            <FontAwesomeIcon icon={faWalking} size="lg" />
          </Marker>
        )}
        {state.pins.map(pin => (
          <Marker
            key={pin.id}
            latitude={pin.latitude}
            longitude={pin.longitude}
            offsetLeft={-19}
            offsetTop={-37}
          >
            <FontAwesomeIcon icon={faWalking} size="lg" />
          </Marker>
        ))}
      </ReactMapGL>
    </div>
  );
};

export default Map;
