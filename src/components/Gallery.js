import React from 'react';
import { Carousel } from 'react-responsive-carousel';

const Gallery = props => {
  return (
    <div>
      <Carousel dynamicHeight showThumbs={false}>
        {props.currentPin.image.map(img => (
          <div key={props.currentPin.id}>
            <img
              src={img}
              alt={props.currentPin.image}
              className="object-cover w-full"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Gallery;
