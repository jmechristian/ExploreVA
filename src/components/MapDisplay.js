import React, { useState, useEffect, useContext } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import { useMediaQuery } from 'react-responsive';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import PinContext from '../PinContext';
import { db } from '../firebase';

const MapDisplay = () => {
  const INITIAL_VIEWPORT = {
    latitude: 38.739702160746965,
    longitude: -77.63519381402206,
    bearing: 4.539007092198582,
    pitch: 46.28088218000663,
    zoom: 8
  };

  const { state, dispatch } = useContext(PinContext);
  //   const { currentUser } = useContext(AuthContext);
  const [viewport, setViewport] = useState(INITIAL_VIEWPORT);

  const ref = db
    .collection('users')
    .doc('Y9XHDpvoOpUAdhAb2Bzqox59rKB2')
    .collection('pins');

  useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      const pins = [];
      querySnapshot.forEach(pin => {
        const {
          content,
          location,
          image,
          latitude,
          longitude,
          title
        } = pin.data();
        pins.push({
          id: pin.id,
          content,
          location,
          image,
          latitude,
          longitude,
          title
        });
      });

      dispatch({ type: 'SET_PINS', payload: pins });
    });
  }, []);

  const handlePinClick = pin => {
    dispatch({ type: 'CURRENT_PIN', payload: pin });
  };

  const isMobile = useMediaQuery({ maxWidth: 813 });

  return (
    <div className="w-full lg:w-2/3 lg:h-screen">
      <ReactMapGL
        width="100%"
        height={isMobile ? '50vh' : '100vh'}
        mapStyle="mapbox://styles/jmechristian/ck1ogvt4m1ses1brt5xfloncr"
        mapboxApiAccessToken="pk.eyJ1Ijoiam1lY2hyaXN0aWFuIiwiYSI6ImNrMWljamw4bDBqcGEzbm55Ynd2ZXl2cjgifQ.Ri325k-o8GPgudwW6o2NHw"
        onViewportChange={newViewport => setViewport(newViewport)}
        {...viewport}
      >
        <Marker
          latitude={38.8418972}
          longitude={-77.4339847}
          offsetLeft={-19}
          offsetTop={-37}
        >
          <FontAwesomeIcon icon={faHome} size="lg" />
        </Marker>

        {state.pins.map(pin => (
          <Marker
            key={pin.id}
            latitude={pin.latitude}
            longitude={pin.longitude}
            offsetLeft={-19}
            offsetTop={-37}
          >
            <FontAwesomeIcon
              icon={faMapMarkerAlt}
              size="2x"
              onClick={() => handlePinClick(pin)}
              className="font-color-secondary"
            />
          </Marker>
        ))}
      </ReactMapGL>
    </div>
  );
};

export default MapDisplay;
