import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';
import instance from '../../../utils/Axios'; // Adjust the Axios instance path
import { baseUrl } from '../../../utils/constants';

const BookingReport = () => {
  const [reportData, setReportData] = useState([]);
  console.log(reportData,"reportttttttt");

  useEffect(() => {
    const fetchMonthlyReport = async () => {
      const year = 2023; // Example year
      const month = 12; // Example month (November)

      try {
        const response = await instance.get(`${baseUrl}/api/booking/admin/booking-report/${year}/${month}`);
        console.log(response.data,"datatattttttt");
        setReportData(response.data);
      } catch (error) {
        console.error('Error fetching monthly report:', error);
        // Handle error scenario
      }
    };

    fetchMonthlyReport();
  }, []);

  return (
    <div>
      <Typography variant="h4">Booking Report</Typography>
      <List>
        {reportData.map((data, index) => (
          <ListItem key={index}>
            <ListItemText primary={`${data.booking_date || 'N/A'} - Bookings: ${data.count || 0}`} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default BookingReport;
