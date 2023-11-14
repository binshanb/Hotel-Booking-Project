import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { adminInstance } from '../../../utils/Axios';
import { baseUrl } from '../../../utils/constants';
import { useNavigate } from 'react-router-dom';

function RoomDetail() {
  const [roomData, setRoomData] = useState([]);
  const[isRoomData, setIsRoomData] = useState(false)
  const { id } = useParams();
  const navigate = useNavigate();
 

  

  useEffect(() => {
    // Fetch the room detail for the specified room ID
    adminInstance
      .get(`${baseUrl}/api/booking/room-detail/${id}/`)
      .then((response) => response.data)
      .then((data) => {
        console.log('Room data:',data);
        setRoomData(data[0]);
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
    navigate('/add-booking')
  }
  // if (isLoading) {
  //   return <div>Loading...</div>; // Show a loading indicator
  // }

  // if (!Array.isArray(roomData) || roomData.length === 0) {
  //   return <div>Error: Room data not available.</div>; // Show an error message
  // }
  console.log("isRoomData:", isRoomData);
  return (
    <div className="room-container p-4">
      <div className="text-center my-5">
        <h1 className="text-4xl font-bold text-gray-800">Room Detail</h1>
        <div className="w-16 h-1 bg-blue-500 mx-auto mt-2"></div>
      </div>
      {isRoomData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-center">
          <div className="mb-4">
            <div className="p-6 rounded-lg shadow-md border border-gray-300 bg-white relative group">
              <img
                src={`${baseUrl}${roomData.cover_image}`}
                alt={roomData.title}
                className="mb-4 h-64 w-full object-cover rounded-lg"
              />
              <h2 className="text-2xl font-semibold text-black mb-2">{roomData.title}</h2>
              <p className="text-lg text-gray-700 mb-4">
                Category: {roomData.category ? roomData.category.category_name : 'Not available'}
              </p>
              <h3 className="text-xl font-semibold text-black mb-2">Price Per Day: ₹{roomData.price_per_night}</h3>
              <p className="text-lg text-gray-900 mb-4">Description: {roomData.description}</p>
              <p className="text-lg text-gray-900 mb-4">Capacity: Maximum {roomData.capacity} people</p>
              <p className="text-lg text-gray-900 mb-4">Room Size: {roomData.room_size} sq.ft</p>
              <p className="text-lg text-gray-900 mb-4">Meals Included</p>
              <p className="text-lg text-gray-900 mb-4">
                Amenities: {roomData.amenities ? roomData.amenities.map(amenity => amenity.name).join(', ') : 'Not available'}
              </p>
              <p className="text-lg text-gray-900 mb-4">
                Features: {roomData.features ? roomData.features.map(feature => feature.name).join(', ') : 'Not available'}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <button onClick={handleBooking}
    
              className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-md text-center hover:bg-blue-600 transition duration-300 ease-in-out"
            >
              Book Now
            </button>
            <button onClick={handleRooms}
    
              className="mt-4 px-6 py-3 bg-blue-300 text-black rounded-md text-center border border-gray-500 hover:bg-gray-200 transition duration-300 ease-in-out"
            >
              Back to Room List
            </button>
          </div>
        </div>
      )}
    </div>
      
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
