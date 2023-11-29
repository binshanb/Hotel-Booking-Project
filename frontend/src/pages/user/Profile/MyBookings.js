import React, { useState, useEffect } from 'react';
import instance from '../../../utils/Axios'
import {useSelector} from 'react-redux'
import jwtDecode from 'jwt-decode';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { baseUrl } from '../../../utils/constants';

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const bookingData = useSelector((state)=>state.booking.bookingInfo)
  console.log(bookingData.id,"id number:") 


  useEffect(() => {
    const fetchBookings = async () => {
      try {
       if (bookingData.id) {
        const response = await instance.get(`${baseUrl}/api/booking/roombooking-page/${bookingData.id}/`);
        console.log(response,"resppppp")
        setBookings(response.data); // Set bookings state with fetched data
      } 
    }catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, [bookingData.id]);

  const handleCancel = async (bookingData) => {
    try {
      await instance.delete(`${baseUrl}/api/booking/roombooking-page/${bookingData.id}/cancel-booking`);
      setBookings(bookings.filter((booking) => booking.id !== bookingData.id));
    } catch (error) {
      console.error('Error canceling booking:', error);
    }
  };

  return (
    <Box p={4}>
    <Typography variant="h4" mb={4}>
      My Bookings
    </Typography>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Booking ID</TableCell>
          <TableCell>Check-in</TableCell>
          <TableCell>Check-out</TableCell>
          <TableCell>Booking Status</TableCell>
          <TableCell>Room Price Per Night</TableCell>
          <TableCell>Room Name</TableCell>
          <TableCell>User Email</TableCell>
          <TableCell>Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {bookings.map((booking) => (
          <TableRow key={booking.id}>
            <TableCell>{booking.id}</TableCell>
            <TableCell>{booking.check_in}</TableCell>
            <TableCell>{booking.check_out}</TableCell>
            <TableCell>{booking.booking_status}</TableCell>
            <TableCell>{booking.room.price_per_night}</TableCell>
            <TableCell>{booking.room.title}</TableCell>
            <TableCell>{booking.user.email}</TableCell>
            <TableCell>
              <IconButton
                color="error"
                aria-label="Cancel Booking"
                onClick={() => handleCancel(booking.id)}
              >
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </Box>
);
};

export default MyBookingsPage;
