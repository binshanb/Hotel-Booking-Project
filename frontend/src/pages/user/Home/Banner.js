import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Banner.css'

import{ useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, ChakraProvider } from '@chakra-ui/react';

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
    <ChakraProvider>
    <Box className="banner" height="100%">
      <Box height="100px" />

      <Carousel autoPlay infiniteLoop showStatus={false} showThumbs={false}>
        {images.map((image, index) => (
          <Box key={index}>
            <Link to="/categorylist">
              <Box as="img" src={image} alt={`Image ${index + 1}`} className="carousel-image" />
            </Link>
          </Box>
        ))}
      </Carousel>
    </Box>
  </ChakraProvider>
);
};

export default ImageCarousel;