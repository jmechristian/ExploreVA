import React from 'react';
import { Carousel } from 'react-responsive-carousel';

const Gallery = props => {
  return (
    <div>
      <Carousel infiniteLoop autoPlay dynamicHeight>
        {props.currentPin.image.map(img => (
          <div key={props.currentPin.id}>
            <img src={img} alt={props.currentPin.image} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Gallery;
