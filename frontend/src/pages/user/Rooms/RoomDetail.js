import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { adminInstance } from '../../../utils/Axios';
import { baseUrl } from '../../../utils/constants';

function RoomDetail() {
  const [roomList, setRoomList] = useState(null);
  const { id} = useParams();
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    // Fetch the room detail for the specified room ID
  
       adminInstance.get(`${baseUrl}/api/admin/room-list/${id}/`)
         .then((response) => response.data)
         .then((data) => {
          setRoomList(data);
          setIsLoading(false);
        })
         .catch((error) => {
          console.error('Error fetching room detail:', error)
          setIsLoading(false)
         });
        

     }, [id]);

     if (isLoading) {
      return <div>Loading...</div>; // Show a loading indicator
    }
  
    if (!roomList) {
      return <div>Error: Room data not available.</div>; // Show an error message
    }

    return (
      <div className="room-container p-4">
        <div className="text-center my-5">
          <h1 className="text-4xl font-bold text-gray-800">Room Detail</h1>
          <div className="w-16 h-1 bg-blue-500 mx-auto mt-2"></div>
        </div>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {roomList.map((room, index) => (
            <div key={room.id} className="mb-4">
              <div className={`p-6 ${room.backgroundColor} rounded-lg shadow-md border border-gray-300 relative group`}>
                <img src={room.cover_image} alt={room.title} className="mb-4 h-32 w-64 object-cover rounded-lg mx-auto" />
                <h2 className="text-xl font-semibold text-black mb-4">{room.title}</h2>
                <h3 className="text-xl font-semibold text-black mb-4">{room.price_per_night}</h3>
  
                <div className="container my-5 align-items-center justify-content">
                  <h1 title="Description">Description</h1>
  
                  <div className="row">
                    <div className="col-md-6 m-auto">
                      <h6>Details</h6>
                      <p className="text-justify" style={{ width: "80%" }}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                      enim ad minim veniam, quis nostrud exercitation ullamco laboris
                      nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                      in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                     nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                     sunt in culpa qui officia deserunt mollit anim id est laborum.
                      </p>
                    </div>
                  </div>
                </div>
  
                {/* Add more details here, e.g., capacity, room size, amenities, features */}
                <p>Capacity: {room.capacity}</p>
                <p>Room Size: {room.room_size}</p>
                <p>Amenities: {room.amenities.join(', ')}</p>
                <p>Features: {room.features.join(', ')}</p>
              </div>
            </div>
          ))}
          <Link to="/bookroom" className="mt-4 px-4 py-2 bg-white text-black rounded-md block text-center">
            Book Now
          </Link>
  
          <Link to="/roomlistuser" className="mt-4 px-4 py-2 bg-white text-black rounded-md block text-center">
            Back to Room List
          </Link>
        </div>
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
