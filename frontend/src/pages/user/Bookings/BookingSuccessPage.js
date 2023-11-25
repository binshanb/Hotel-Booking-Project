import React from 'react';

import {
  Box,
  Text,
  Heading,
  Divider,
  VStack,
  Button,
} from '@chakra-ui/react';

import { useLocation,Link } from 'react-router-dom'; 

const BookingSuccessPage = () => {
  // Use the location hook to get data passed from the previous page (if needed)

  const location = useLocation();
  const bookingId = location.state?.bookingRoomData.id || '';  // Access the booking ID if passed from the previous page
  console.log(bookingId,"dataa")

  return (
    <Box p={6}>
      <VStack spacing={6} align="center">
        <Heading as="h1" size="xl">
          Booking Successful!
        </Heading>
        <Divider />
        <Text fontSize="lg">
          Thank you for your booking. Your booking ID is: {bookingId}
        </Text>
        <Text fontSize="lg">
          Your room has been successfully booked. We hope you enjoy your stay!
        </Text>
        {/* Add more details or options/buttons as needed */}
        <Link to="/">
        <Button colorScheme="blue">Back to Home</Button>
        </Link>
      </VStack>
    </Box>
  );
};

export default BookingSuccessPage;

