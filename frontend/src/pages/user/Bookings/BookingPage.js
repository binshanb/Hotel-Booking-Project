import React ,{useState,useEffect}from 'react';
import { loadRazorpayScript, createRazorpayOrder } from '../../../utils/razorpay';
import {
  Box,
  Text,
  Heading,
  Divider,
  VStack,
  Button,
  Input,
  FormControl,
  FormLabel,
  Flex,
  Spacer,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { baseUrl } from '../../../utils/constants';
import instance from '../../../utils/Axios';
// import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setBookingInfo } from '../../../redux/slices/bookingslices/bookingslice';
import { useNavigate } from 'react-router-dom';


function BookingPage  ({ razorpayKey}) {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [price,setPrice] = useState(0);
  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  const [bookingDetails, setBookingDetails] = useState(null);
  console.log(bookingDetails,"boking");
  const userInfos = useSelector((state) => state.auth.userInfo);
  const [decodedUserInfo, setDecodedUserInfo] = useState({});
  const roomData = useSelector((state)=>state.room.roomInfo)
  const bookingData = useSelector((state)=>state.booking.bookingData)
  console.log(bookingData.id,"id number:")
  console.log(roomData,"jndc.kljd")
  // const bookingRoomData = { id: bookingData.id };
 


  useEffect(() => {
    if (userInfos) {
      // Decode the token and set the user info state
      const decodedInfo = jwtDecode(userInfos.access); // Assuming 'access' contains user details
      console.log(decodedInfo);
      setDecodedUserInfo(decodedInfo);
}},[]);

  // useEffect(()=>{
  //   if (bookingId){
  //     dispatch(setBookingInfo(bookingId));
  //   }
  // },[dispatch,bookingId]);

  useEffect(() => {
    instance.get(`/api/booking/roombooking-page/${bookingData.id}/`)
      .then((response) => response.data)
        .then((data) => {
          console.log('Booking data:',data);;
        setBookingDetails(data[0]);
        dispatch(setBookingInfo(data[0]))
      })
      .catch(error => {
        console.error('Error fetching booking details:', error);
      });
  }, [bookingData.id]);
  

  // Calculate price based on booking details
  useEffect(() => {
    if (bookingData) {
      const checkInDate = new Date(bookingData.check_in);
      console.log(checkInDate,"check in");
      const checkOutDate = new Date(bookingData.check_out);
      const numberOfGuests = parseInt(bookingData.number_of_guests);
   console.log(numberOfGuests,"guests");
      const oneDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day
      const diffDays = Math.round(Math.abs((checkOutDate - checkInDate) / oneDay));
      console.log(diffDays,"diff");

      const pricePerNight = roomData.price_per_night; // Replace with actual price per night
      console.log(pricePerNight,"per");
      const calculatedPrice = diffDays * pricePerNight * numberOfGuests;
      
      console.log(calculatedPrice,"total");
      setPrice(calculatedPrice)
      console.log(setPrice(calculatedPrice),"log");
      setPrice(calculatedPrice)
    }
  }, [bookingData,roomData]);
  // Retrieve other form data fields similarly
  const bookingId = bookingData.id
  console.log(bookingId,"ideeee");
  console.log(price,"amount");
  console.log(roomData,"room");


  const handleHotelBookingPayment = async (bookingId, price, roomData) => {

    console.log(bookingId,price,"joooo");
  
    try {
      // Load the Razorpay script
      await loadRazorpayScript();
  
      // Create a Razorpay order
      const order = await createRazorpayOrder(bookingId, price);

      console.log(bookingId,price,"boook amt");

    
      // Open the Razorpay payment UI
      const options = {
        key: order.notes.key,
        amount: order.amount,
        currency: order.currency,
        name: 'Hotel Booking',
        description: `Payment for Room ${bookingId}`,
        order_id: order.id,
        handler: function (response) { 
          // Handle successful payment response
          console.log('Payment successful:', response);
          const bookingId = bookingData.id;
         navigate('/booking-success',{bookingId})
          // Proceed to book the room after successful payment
          // bookRoom(roomData, bookingData);
        },
        prefill: {
          email: decodedUserInfo.email, // Replace with the user's email for booking
          contact: decodedUserInfo.phone_number, // Replace with the user's contact number for booking
        },
      };
  
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error handling Hotel Booking Razorpay payment:', error);
    }
  };


  // const bookRoom = async (roomId, bookingData) => {
  //   try {
  //     // Implement the logic to book the room with the provided roomId and bookingDetails
  //     // Make an API call or perform necessary actions to confirm the booking
  
  //     // Example API call to book the room
  //     const response = await instance.post('/api/hotel/booking', {
  //       room_id: roomId,
        
  //       email: decodedUserInfo.email,
  //       phone: decodedUserInfo.phone,
  //       // Add other relevant booking details
  //     });
  
      // if (response.status === 201) {
      //   console.log('Room booked successfully:', response.data);
      //   navigate('/booking-success');
      // } else {
      //   console.error('Failed to book the room:', response.data);
      // }
    
  


  return (
    <Flex p={6}>
      <Box flex={1} mr={6}>
        <Heading as="h2" size="xl" mb={4}>
           Booking Details
        </Heading>

        {/* Guest Details Card */}
        <Box borderWidth="1px" borderRadius="lg" p={4} mb={6}>
          <Heading as="h3" size="lg" mb={4}>
            Guest Details
          </Heading>
          {/* Input fields for guest details */}
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input value={decodedUserInfo.email} isReadOnly />
          </FormControl>
          {/* Add more input fields for other guest details */}
        </Box>

        {/* Room Details Card */}
        <Box borderWidth="1px" borderRadius="lg" p={4} mb={6}>
          <Heading as="h3" size="lg" mb={4}>
            Room Details
          </Heading>
          {/* Display room details */}
          <Text fontSize="lg">Room Name: {roomData ? roomData.title : ''}</Text>
          <Text fontSize="lg">
            Category: {roomData && roomData.category ? roomData.category.category_name : ''}
          </Text>
          {/* Add more room details */}
        </Box>
      </Box>

      {/* Price Summary Card */}
      <Box flex={1}>
        <Box borderWidth="1px" borderRadius="lg" p={4} mb={6}>
          <Heading as="h3" size="lg" mb={4}>
            Price Summary
          </Heading>
          {/* Display price details */}
          <Text fontSize="lg">Price Per Night: {roomData ? roomData.price_per_night : ''}</Text>
          <Divider />
          <Text fontSize="lg">Total Price: ${price}</Text>

          {/* Payment method using Razorpay */}
          <Button colorScheme="blue" mt={4} onClick={() => handleHotelBookingPayment(bookingData.id, price , roomData)}>
            Pay Now with Razorpay
          </Button>
        </Box>
      </Box>
    </Flex>
  );
};
export default BookingPage;




