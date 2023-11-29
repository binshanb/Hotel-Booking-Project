import React, { useState, useEffect } from 'react';
import instance from '../../../utils/Axios';
import { useSelector } from 'react-redux';
import AdminBookingStatusChange from './AdminBookingStatusChange';
import {
  Box,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  FormControl,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { baseUrl } from '../../../utils/constants';

const BookingsList = () => {
  const [bookings, setBookings] = useState([]);
  const bookingData = useSelector((state) => state.booking.bookingInfo);

 
    const fetchBookings = async () => {
      try {
        const response = await instance.get(`${baseUrl}/api/booking/admin/booking-list`);
        setBookings(response.data); // Set bookings state with fetched data
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    useEffect(() => {
      fetchBookings();
    }, []);

  // const handleCancel = async (bookingId) => {
  //   try {
  //     await instance.delete(`${baseUrl}/api/booking/roombooking-page/${bookingId}/cancel-booking`);
  //     setBookings(bookings.filter((booking) => booking.id !== bookingId));
  //   } catch (error) {
  //     console.error('Error canceling booking:', error);
  //   }
  // };

  const handleStatusChange = async (event, bookingId) => {
    const newStatus = event.target.value;
    try {
      await instance.put(`${baseUrl}/api/booking/change-booking-status/${bookingId}/`, { booking_status: newStatus });
      // Fetch bookings again to update the data after changing the status
      fetchBookings();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleCheckout = async (roomId) => {
    try {
      const response = await instance.put(`/api/booking/roomlistuser/${roomId}/`);
      // Perform other operations upon successful checkout, if needed
      console.log(response.data); // Log the response
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  return (
    <Box p={4}>
    <Typography variant="h4" mb={4}>
      Booking List
    </Typography>
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Booking ID</TableCell>
            <TableCell>Check-in</TableCell>
            <TableCell>Check-out</TableCell>
            <TableCell>Booking Status</TableCell>
            {/* <TableCell>Room Name</TableCell>
            <TableCell>User Email</TableCell> */}
            {/* <TableCell>Action</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>{booking.id}</TableCell>
              <TableCell>{booking.check_in}</TableCell>
              <TableCell>{booking.check_out}</TableCell>
              <TableCell>
                <AdminBookingStatusChange
                  bookingId={booking.id}
                  initialStatus={booking.booking_status}
                />
              </TableCell>
              {/* <TableCell>{booking.room.title}</TableCell>
              <TableCell>{booking.user.email}</TableCell> */}
              <TableCell>
                  <Button variant="contained" color="primary" onClick={() => handleCheckout(booking.id)}>
                    Checkout
                  </Button>
                </TableCell>
              {/* <TableCell>
                <IconButton
                  color="secondary"
                  aria-label="Cancel Booking"
                  onClick={() => handleCancel(booking.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
  );
};

export default BookingsList;

