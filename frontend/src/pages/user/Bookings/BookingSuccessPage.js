import React from 'react';

import {
  Box,
  Typography,
  Divider,
  Button,
  Container,
} from '@mui/material';

import { useLocation,Link } from 'react-router-dom'; 

const BookingSuccessPage = () => {
  // Use the location hook to get data passed from the previous page (if needed)

  const location = useLocation();
  const bookingId = location.state?.bookingRoomData.id || '';  // Access the booking ID if passed from the previous page
  console.log(bookingId,"dataa")

  return (
    <Container maxWidth="sm">
      <Box p={6}>
        <Typography variant="h4" align="center">
          Booking Successful!
        </Typography>
        <Divider />
        <Typography variant="body1" align="center" mt={2}>
          Thank you for your booking. Your booking ID is: {bookingId}
        </Typography>
        <Typography variant="body1" align="center" mt={2}>
          Your room has been successfully booked. We hope you enjoy your stay!
        </Typography>
        {/* Add more details or options/buttons as needed */}
        <Box mt={4} display="flex" justifyContent="center">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary">
              Back to Home
            </Button>
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default BookingSuccessPage;

