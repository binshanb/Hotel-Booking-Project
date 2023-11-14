import React, { useState, useEffect } from 'react';
import './BookingList.css';
import { adminInstance } from '../../../utils/Axios';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await adminInstance.get('/admin/booking-list/');
        const data = await response.json();
        setBookings(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError('Error fetching bookings. Please try again.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // You can replace this with a loading spinner component
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Booking List</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            {booking.customer.email} - {booking.room.title} -{' '}
            {new Date(booking.checkingDate).toLocaleDateString()} to{' '}
            {new Date(booking.checkoutDate).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingList;

