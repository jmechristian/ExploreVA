import React from 'react';
import { Carousel } from 'react-responsive-carousel';

const Gallery = props => {
  return (
    <div>
      <Carousel>
        {props.currentPin.image.map(img => (
          <div>
            <img src={img} alt={props.currentPin.title} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Gallery;
