import React from 'react';
import BookingForm from '../../../components/Bookings/BookingForm';

const BookingPage = () => {
  const handleBookingSubmit = (formData) => {
    // Handle the form submission, e.g., send data to the server
    console.log('Form data submitted:', formData);
  };

  return (
    <div>
      <h2>Booking Form</h2>
      <BookingForm onSubmit={handleBookingSubmit} />
    </div>
  );
};

export default BookingPage;

