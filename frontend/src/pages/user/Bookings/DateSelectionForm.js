import React, { useState } from 'react';
import './DateSelectionForm.css'; // Import your CSS file for form styling

function DateSelectionForm() {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');

  const handleCheckInChange = (event) => {
    setCheckInDate(event.target.value);
  };

  const handleCheckOutChange = (event) => {
    setCheckOutDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Check-in date:', checkInDate);
    console.log('Check-out date:', checkOutDate);
    // Handle form submission logic
  };

  return (
    <form onSubmit={handleSubmit} className="date-selection-form">
      <div className="form-group">
        <label htmlFor="checkInDate">Check-in Date:</label>
        <input
          type="date"
          id="checkInDate"
          value={checkInDate}
          onChange={handleCheckInChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="checkOutDate">Check-out Date:</label>
        <input
          type="date"
          id="checkOutDate"
          value={checkOutDate}
          onChange={handleCheckOutChange}
          required
        />
      </div>

      <button type="submit" className="submit-button">Submit</button>
    </form>
  );
}

export default DateSelectionForm;

