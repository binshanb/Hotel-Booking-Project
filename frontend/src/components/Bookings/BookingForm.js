import React, { useState,useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import instance from '../../utils/Axios';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../utils/constants';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import  {userInfo} from "../../redux/slices/userslices/authSlice"
import { activateRoomInfo } from '../../redux/slices/roomslices/roomSlice';

import { activateBookingInfo } from '../../redux/slices/bookingslices/bookingslice';
import TextInput from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DatePicker } from "@mui/x-date-pickers";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns// Adapter for date functions
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { makeStyles} from '@mui/styles';
import { createTheme } from '@mui/material/styles';
// import { useParams } from 'react-router-dom';



const theme = createTheme();
const useStyles = makeStyles(() => ({
  formContainer: {
    padding: theme.spacing(2),
    '& .MuiTextField-root': {
      marginBottom: theme.spacing(2),
    },
  },
}));

const BookingForm = ({roomId}) => {

  const classes = useStyles();
// const{id} = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const roomInfo= useSelector((state) => state.room.roomInfo);



  const userInfos = useSelector((state) => state.auth.userInfo);
  
  const loading = useSelector((state) => state.room.loading);
  const error = useSelector((state) => state.room.error);
  const [decodedUserInfo, setDecodedUserInfo] = useState({});
 
  
  const [formData, setFormData] = useState({
    check_in: '',
    check_out: '',
    number_of_guests: '',
  });
  useEffect(() => {
    if (userInfos) {
      // Decode the token and set the user info state
      const decodedInfo = jwtDecode(userInfos.access); // Assuming 'access' contains user details
      setDecodedUserInfo(decodedInfo);
    }
    if (roomId){
    // Fetch room info and user info when component mounts
    dispatch(activateRoomInfo(roomId));
    // dispatch(userInfos());
}}, [dispatch,roomId]);
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleCheckInDateChange = (date) => {
    setFormData({
      ...formData,
      check_in: date,
    });
  };

  const handleCheckOutDateChange = (date) => {
    setFormData({
      ...formData,
      check_out: date,
    });
  };
  function validateDate(date) {
    const currentDate = new Date();
    return date > currentDate;
  }
  const updatedFormData = {
    ...formData,
    user: decodedUserInfo.user_id,
    room: roomInfo.id,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  

    const { check_in, check_out } = formData;
    const checkInTimestamp = Date.parse(check_in);
    const checkOutTimestamp = Date.parse(check_out);



    if (checkInTimestamp >= checkOutTimestamp) {
      toast.error("Invalid date selection. Please choose future dates for check-in and checkout.", {
        position: 'top-right',
        autoClose: 3000, // Duration for which the toast is shown (in milliseconds)
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
   



    // try {
    //   // Validate formData and retrieve needed information
    //   // ... (assuming formData, decodedUserInfo, and roomInfo are defined)
  
    //   if (formData.check_in && formData.check_out) {
    //     // Construct Date objects from formData
    //     const checkInDate = new Date(formData.check_in);
    //     const checkOutDate = new Date(formData.check_out);
  
    //     // Check if the dates are valid
    //     if (!isNaN(checkInDate) && !isNaN(checkOutDate)) {
    //       // Convert dates to IST (India Standard Time)
    //       const istTimezone = 'Asia/Kolkata';
  
    //       // const checkInIST = new Date(checkInDate.toLocaleString('en-US', { timeZone: istTimezone }));
    //       // const checkOutIST = new Date(checkOutDate.toLocaleString('en-US', { timeZone: istTimezone }));
    //       const currentDate = AdapterDateFns.utcToday();
    //       // Format dates as ISO strings
    //       const formattedData = {
    //         ...formData,
    //         user: decodedUserInfo.user_id,
    //         room: roomInfo.id,
    //         // check_in: checkInIST.toISOString(),
    //         // check_out: checkOutIST.toISOString(),
    //       };
  
    //       console.log(formattedData, "This is formatted data");

 
    try {
      const response = await instance.post(`${baseUrl}/api/booking/check-overlapping-bookings/`, {
        check_in: updatedFormData.check_in,
        check_out: updatedFormData.check_out,
        number_of_guests:updatedFormData.number_of_guests,
        user: updatedFormData.user,
        room: updatedFormData.room,
      });
    
      if (response.data && response.data.message !== 'Overlapping booking exists') {
        console.log(response.data,"dataaaaaaaaaa");
        const createBookingResponse = await instance.post(`${baseUrl}/api/booking/add-roombooking/`, {
          check_in: updatedFormData.check_in,
          check_out: updatedFormData.check_out,
          number_of_guests:updatedFormData.number_of_guests,
          user: updatedFormData.user,
          room: updatedFormData.room,
        });
    
        if (createBookingResponse && createBookingResponse.data) {
          dispatch(activateBookingInfo({ ...createBookingResponse.data.data }));
          toast.success('Booking added. Proceed to Payments to Complete!', {
            // Toast configuration
          });
          console.log(createBookingResponse,"booking ressssssss");
          console.log(createBookingResponse.data.data.id,"iddd");
          const id = createBookingResponse.data.data.id
          navigate(`/roombooking-page/${id}`);
        } else {
          toast.error('Overlapping booking exists. Please choose different dates or room.');
        }
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      toast.error('Error creating booking. Please try again.');
    }}
return (
    <div>
      <h2>Room Booking Form</h2>
      <form className={classes.formContainer} onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Room"
              type="text"
              name="name"
              value={roomInfo.title}
              placeholder="Enter Name"
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid container spacing={3}></Grid>
          <Grid item xs={12}>
            <TextField
              label="User"
              type="email"
              name="email"
              value={decodedUserInfo.email}
              placeholder="Enter Email"
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Number of Guests:"
              type="text"
              name="number_of_guests"
              value={formData.number_of_guests}
              placeholder="Enter number of guests"
              onChange={handleChange}
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MuiPickersUtilsProvider utils={AdapterDateFns}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <DatePicker
              label="Check-in Date"
              value={formData.check_in}
              onChange={handleCheckInDateChange}
              renderInput={(params) => <TextField {...params} fullWidth />}
              minDate={new Date()} // Disable past dates
            />
            <DatePicker
              label="Check-Out Date"
              value={formData.check_out}
              onChange={handleCheckOutDateChange}
              renderInput={(params) => <TextField {...params} fullWidth />}
              minDate={new Date()} // Disable past dates
            />
          </Grid>
        </Grid>
      </MuiPickersUtilsProvider>
    </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" size="large">
              Book
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
    );
  };

export default BookingForm;
