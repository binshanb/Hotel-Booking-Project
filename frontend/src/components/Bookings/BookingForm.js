import React, { useState } from 'react';
import BookingPayment from '../../pages/user/Bookings/BookingPayment';// Import the BookingPayment component
import instance from '../../utils/Axios';
import { useNavigate } from 'react-router-dom';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    checking_date:'',
    checkout_date: '',
    // Add other necessary fields
  });
  const navigate = useNavigate();
  const [bookingId, setBookingId] = useState(null);
  const [amount, setAmount] = useState(null);
  const handleBookingSubmit = () => {
    // Perform any necessary actions related to the booking...

    // Redirect to the booking payment component
    navigate('/booking-payment');
  };
  const handleBooking = async () => {
    try {
      const response = await instance.post('/api/booking/add-booking/', {...formData,},
    {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    
  
      if (response.ok) {
        const data = await response.json();
        const bookingId = data.bookingId;
        const amount = 100;

        setBookingId(bookingId);
        setAmount(amount);
      } else {
        console.error('Failed to create booking');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 border rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Booking Form</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleBooking(); }}>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Name:</label>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full border rounded p-2"
        />
        </div>
        <div className="mb-4">
        <label className="block text-sm font-bold mb-2">Email:</label>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full border rounded p-2"
        />
        </div>
         <div className="mb-4">
           <label className="block text-sm font-bold mb-2">Check-in Date:</label>
           <input
            type="datetime-local"
            name="checking_date"
            value={formData.checking_date}
            onChange={(e) => setFormData({ ...formData, checking_date: e.target.value })}
            className="w-full border rounded p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Check-out Date:</label>
          <input
            type="datetime-local"
            name="checkout_date"
            value={formData.checkout_date} 
            onChange={(e) => setFormData({ ...formData, checkout_date: e.target.value })}
             className="w-full border rounded p-2"
         />
      </div>
        

             <button onClick={handleBookingSubmit}
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer w-full"
        >
          Submit
        </button>
      </form>

      {bookingId && amount && <BookingPayment bookingId={bookingId} amount={amount} />}
    </div>
  );
};

export default BookingForm;
































// import React, { useState } from 'react';
// import axios from 'axios';
// import instance from '../../utils/Axios';

// const BookingForm = () => {
//   const [formData, setFormData] = useState({
//     checking_date: '',
//     checkout_date: '',
//     phone_number: '',
//     email: '',
//   });
//   const [bookingSuccess, setBookingSuccess] = useState(false);
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//         const {checking_date, checkout_date, phone_number, email } = formData;
//         const user_id = 1; // Replace with the actual user ID
//         const room_id = 1; // Replace with the actual room ID
//         const bookingData = {
//             customer: user_id,
//             room: room_id,
//             checking_date,
//             checkout_date,
//             phone_number,
//             email,
//           };
//         instance.post('/api/booking/add-booking/', bookingData);
//         setBookingSuccess(true);
//         // Optionally, reset the form data after successful booking
//         setFormData({
          
//           checking_date: '',
//           checkout_date: '',
//           phone_number: '',
//           email: '',
//         });
//       // Handle successful submission or redirect
//     } catch (error) {
//       // Handle error
//       console.error('Error creating booking:', error);
//     }
//   }; 
//   const validatePhoneNumber = (phone) => {
//     // Regular expression for a basic 10-digit phone number
//     const phoneRegex = /^\d{10}$/;
//     return phoneRegex.test(phone);
//   };
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === 'phone_number') {
//         if (validatePhoneNumber(value) || value === '') {
//           setFormData({ ...formData, [name]: value });
//         }
//         }else{
//     setFormData({ ...formData, [name]: value });
//   }};

//   return (
//     <div className="max-w-md mx-auto mt-8 p-6 border rounded shadow-md">
//       <h2 className="text-2xl font-semibold mb-4 text-center">Booking Form</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-sm font-bold mb-2">Check-in Date:</label>
//           <input
//             type="datetime-local"
//             name="checking_date"
//             value={formData.checking_date}
//             onChange={handleChange}
//             className="w-full border rounded p-2"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-bold mb-2">Check-out Date:</label>
//           <input
//             type="datetime-local"
//             name="checkout_date"
//             value={formData.checkout_date}
//             onChange={handleChange}
//             className="w-full border rounded p-2"
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-bold mb-2">Phone Number:</label>
//           <input
          
//           type="text"
//           name="phone_number"
//           value={formData.phone_number}
//           onChange={handleChange}
//           placeholder="Enter your phone number"
//           className="w-full border rounded p-2"
//         />
        
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-bold mb-2">Email:</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className="w-full border rounded p-2"
//           />
//         </div>

        
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer w-full"
//         >
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default BookingForm;







































































// import React, { useState,useEffect } from 'react';
// import instance from '../../utils/Axios';
// import { baseUrl } from '../../utils/constants';
// import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
// import jwt_decode from 'jwt-decode';

// import {useParams } from 'react-router-dom';



// const BookingForm = ({ onSubmit }) => {
//   const userData = useSelector((state)=>state.auth.userInfo);
//   const [user, setUser] = useState(null);

//       if (userData) {
//       try {
//         const decodedUser = jwt_decode(userData);
//         setUser(decodedUser);
//       } catch (error) {
//         console.error('Error decoding token:', error);
//       }
//     }

//   const [bookingData, setBookingData] = useState({
//     customer: '',
//     room: '',
//     checkingDate: '',
//     checkoutDate: '',
//     phoneNumber: '',
//     email: '',
//   });

//   const [customers, setCustomers] = useState([]); // state to store customers
//   const [rooms, setRooms] = useState([]); 
//   const { userId, roomId} = useParams();
//   console.log(roomId,"kjeblkjeb")
//         // state to store rooms
//  console.log(customers,rooms,userId)
//   useEffect(() => {
//     if (userData) {
//         try {
//           const decodedUser = jwt_decode(userData);
//           setUser(decodedUser);
//         } catch (error) {
//           console.error('Error decoding token:', error);
//         }
//       }
//     const fetchCustomersAndRooms = async () => {
//       try {
  
//         if (userId && roomId) {
//         const customerResponse = await instance.get(`${baseUrl}/api/user/user-detail/${userId}/`); // Adjust the API endpoint
//         const roomResponse = await instance.get(`${baseUrl}/api/booking/room-detail/${roomId}/`);  // Adjust the API endpoint

//         console.log('Customer response:', customerResponse); // Log the customers response
//         console.log('Room response:', roomResponse); // Log the rooms response
    
     
//         setCustomers([customerResponse.data]);
//         setRooms([roomResponse.data]);
//         }
//       } catch (error) {
//         console.error('Error fetching customers and rooms:', error);
//       }
//     };

//     fetchCustomersAndRooms();
// }

//   , [userData, userId, roomId]);
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setBookingData({ ...bookingData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
  
//     // Find the selected customer object
//     const selectedCustomer = customers.find(customer => customer.userId === parseInt(bookingData.customer, 10));
  
//     // Find the selected room object
//     const selectedRoom = rooms.find(room => room.roomId === parseInt(bookingData.room, 10));
  
//     // Update bookingData with selected customer and room
//     setBookingData(prevData => ({
//       ...prevData,
//       customer: selectedCustomer,
//       room: selectedRoom,
//     }));
  
//     console.log('Form data:', bookingData);
//     // Validate and submit the form data
//     onSubmit(bookingData);
//   };

//   return (
    
//         <div className="max-w-md mx-auto mt-8">
//           <div className="bg-white p-6 rounded-lg shadow-md">
//             <h2 className="text-2xl font-semibold mb-4">Booking Form</h2>
//             <form onSubmit={handleSubmit}>
    
//             <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Customer:
//             </label>
//             <select
//   name="customer"
//   value={bookingData.customer}
//   onChange={handleChange}
//   className="w-full border rounded p-2"
// >
//   <option value="">Select Customer</option>
//   {customers.map((customer) => (
//     <option key={customer.id} value={customer.id}>
//       {customer.first_name}
//     </option>
//   ))}
// </select>
//           </div>

//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-bold mb-2">
//               Room:
//             </label>
//             <select
//   name="room"
//   value={bookingData.room}
//   onChange={handleChange}
//   className="w-full border rounded p-2"
// >
//   <option value="">Select Room</option>
//   {rooms.map((room) => (
//     <option key={room.id} value={room.id}>
//       {room.title}
//     </option>
//   ))}
// </select>
//           </div>
    
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">
//                   Check-in Date and Time:
//                 </label>
//                 <input
//                   type="datetime-local"
//                   name="checkingDate"
//                   value={bookingData.checkingDate}
//                   onChange={handleChange}
//                   className="w-full border rounded p-2"
//                 />
//               </div>
    
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">
//                   Check-out Date and Time:
//                 </label>
//                 <input
//                   type="datetime-local"
//                   name="checkoutDate"
//                   value={bookingData.checkoutDate}
//                   onChange={handleChange}
//                   className="w-full border rounded p-2"
//                 />
//               </div>
    
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">
//                   Phone Number:
//                 </label>
//                 <input
//                   type="text"
//                   name="phoneNumber"
//                   value={bookingData.phoneNumber}
//                   onChange={handleChange}
//                   className="w-full border rounded p-2"
//                 />
//               </div>
    
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-sm font-bold mb-2">
//                   Email:
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={bookingData.email}
//                   onChange={handleChange}
//                   className="w-full border rounded p-2"
//                 />
//               </div>
    
//               <button
//                 type="submit"
//                 className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
//               >
//                 Submit
//               </button>
//             </form>
//           </div>
//         </div>
//       );
//     };
    
//     export default BookingForm;
    