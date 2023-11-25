import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Image, Text, Button, Flex, VStack, Spinner } from '@chakra-ui/react';
import { adminInstance } from '../../../utils/Axios';
import { baseUrl } from '../../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {activateRoomInfo} from '../../../redux/slices/roomslices/roomSlice'


function RoomDetail(rooms) {
  const [roomData, setRoomData] = useState([]);
  const[isRoomData, setIsRoomData] = useState(false)
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch()
 

  

  useEffect(() => {
    // Fetch the room detail for the specified room ID
    adminInstance
      .get(`${baseUrl}/api/booking/room-detail/${id}/`)
      .then((response) => response.data)
      .then((data) => {
        console.log('Room data:',data);
        setRoomData(data[0]);
        dispatch(activateRoomInfo(data[0]))
        setIsRoomData(true);
      })
      .catch((error) => {
        console.error('Error fetching room detail:', error);
      });
  }, [id]);

  const handleRooms=()=>{
    navigate('/roomlistuser')
  }
  const handleBooking=()=>{
    navigate('/add-roombooking',{roomData})
    // navigate(`/add-booking/${id}/`,{ state: roomData })
  }
  // if (isLoading) {
  //   return <div>Loading...</div>; // Show a loading indicator
  // }

  // if (!Array.isArray(roomData) || roomData.length === 0) {
  //   return <div>Error: Room data not available.</div>; // Show an error message
  // }
  console.log("isRoomData:", isRoomData);


  return (
    <Box p={4} className="room-container">
      <Box textAlign="center" my={5}>
        <Heading as="h1" size="xl" fontWeight="bold" color="gray.800">
          Room Detail
        </Heading>
        <Box w="16" h="1" bg="blue.500" mx="auto" mt={2}></Box>
      </Box>

      {!isRoomData && (
        <Flex justifyContent="center">
          <Spinner size="xl" color="blue.500" />
        </Flex>
      )}

      {isRoomData && roomData && (
        <Flex justifyContent="center" flexWrap="wrap">
          <Box mb={4}>
            <Box p={6} rounded="lg" boxShadow="md" border="1px" borderColor="gray.300" bg="white" pos="relative" _groupHover={{}}>
              <Image src={`${baseUrl}${roomData.cover_image}`} alt={roomData.title} mb={4} h="64" w="full" objectFit="cover" rounded="lg" />
              <Heading as="h2" fontSize="2xl" fontWeight="semibold" color="black" mb={2}>
                {roomData.title}
              </Heading>
              <Text fontSize="lg" color="gray.700" mb={4}>
                Category: {roomData.category ? roomData.category.category_name : 'Not available'}
              </Text>
              <Text fontSize="xl" fontWeight="semibold" color="black" mb={2}>
                Price Per Day: ₹{roomData.price_per_night}
              </Text>
              <Text fontSize="lg" color="gray.900" mb={4}>
                Description: {roomData.description}
              </Text>
              <Text fontSize="lg" color="gray.900" mb={4}>
                Capacity: Maximum {roomData.capacity} people
              </Text>
              <Text fontSize="lg" color="gray.900" mb={4}>
                Room Size: {roomData.room_size} sq.ft
              </Text>
              <Text fontSize="lg" color="gray.900" mb={4}>
                Meals Included
              </Text>
              <Text fontSize="lg" color="gray.900" mb={4}>
                Features: {roomData.features ? roomData.features.map((feature) => feature.name).join(', ') : 'Not available'}
              </Text>
            </Box>
          </Box>
          <VStack alignItems="center" justifyContent="center">
            <Button onClick={handleBooking} mt={4} px={6} py={3} bg="blue.500" color="white" rounded="md" _hover={{ bg: 'blue.600' }}>
              Book Now
            </Button>
            <Button onClick={handleRooms} mt={4} px={6} py={3} bg="blue.300" color="black" rounded="md" border="1px" borderColor="gray.500" _hover={{ bg: 'gray.200' }}>
              Back to Room List
            </Button>
          </VStack>
        </Flex>
      )}
    </Box>
  );
}
export default RoomDetail;



















































// import React, { useContext } from "react";
// import { MyContext } from "../../../Context/Context";
// import Title from "../Services/Title";
// import Banner from "../Home/Banner"

// export default function RoomDetail({ match }) {
//   const context = useContext(MyContext);
//   const room = context.rooms.find(
//     (room) => room.room_slug === match.params["room_slug"]
//   );
//   if (!room) {
//     return <div>Eroror</div>;
//   } else {
//     return (
//       <>
//         <Banner room={room} />
//         <div className="container my-5 align-items-center justify-content">
//           <Title title="Description" />

//           <div className="row">
//             <div className="col-md-6 m-auto">
//               <h6>Details</h6>
//               <p className="text-justify" style={{ width: "80%" }}>
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//                 eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
//                 enim ad minim veniam, quis nostrud exercitation ullamco laboris
//                 nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
//                 in reprehenderit in voluptate velit esse cillum dolore eu fugiat
//                 nulla pariatur. Excepteur sint occaecat cupidatat non proident,
//                 sunt in culpa qui officia deserunt mollit anim id est laborum.
//               </p>
//             </div>
//             <div className="col-md-6 m-auto">
//               <h6>Information</h6>
//               <p>Price ${room.price_per_night}</p>
//               <p>Size {room.room_size} Sqr Feet</p>
//               <p>Capacity Maxium {room.capacity} People</p>
//               <p>Meals Included</p>
//             </div>
//           </div>

//           <Title title="Facilities" />

//           <div className="row mt-5">
//             <div className="col-md-4">
//               <p>
//                 eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
//                 proident, sunt in culpa qui officia deserunt mollit anim id est
//                 laborum.
//               </p>
//               <p>
//                 eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
//                 proident, sunt in culpa qui officia deserunt mollit anim id est
//                 laborum.
//               </p>
//               <p>
//                 eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
//                 proident, sunt in culpa qui officia deserunt mollit anim id est
//                 laborum.
//               </p>
//             </div>
//             <div className="col-md-4">
//               <p>
//                 eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
//                 proident, sunt in culpa qui officia deserunt mollit anim id est
//                 laborum.
//               </p>
//               <p>
//                 eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
//                 proident, sunt in culpa qui officia deserunt mollit anim id est
//                 laborum.
//               </p>
//               <p>
//                 eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
//                 proident, sunt in culpa qui officia deserunt mollit anim id est
//                 laborum.
//               </p>
//             </div>
//             <div className="col-md-4">
//               <p>
//                 eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
//                 proident, sunt in culpa qui officia deserunt mollit anim id est
//                 laborum.
//               </p>
//               <p>
//                 eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
//                 proident, sunt in culpa qui officia deserunt mollit anim id est
//                 laborum.
//               </p>
//               <p>
//                 eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
//                 proident, sunt in culpa qui officia deserunt mollit anim id est
//                 laborum.
//               </p>
//             </div>
//           </div>
//         </div>
//       </>
//     );
//   }
// }
