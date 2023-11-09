import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Banner.css'

import{ useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const images = [
  'images/hotel4.jpg',
  'images/hotel5.jpg',
  'images/hotel6.jpg',
  // Add more image URLs as needed
];




const ImageCarousel = () => {
  return (
    <div className="banner">
      <div style={{height:'100px'}}>

      </div>
  <Carousel autoPlay infiniteLoop showStatus={false} showThumbs={false}>
    {images.map((image, index) => (
      <div key={index}>
         <Link to="/categorylist">
        <img
          src={image}
          alt={`Image ${index + 1}`}
          className="carousel-image"
        />
        </Link>
      </div>
    ))}
  </Carousel>

</div>

  );
};

export default ImageCarousel;