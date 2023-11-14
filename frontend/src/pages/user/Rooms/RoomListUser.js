import React, { useState, useEffect } from 'react';
import { adminInstance } from '../../../utils/Axios';
import { baseUrl } from '../../../utils/constants';
import { useParams } from 'react-router-dom';

function RoomListUser() {
  const [roomList, setRoomList] = useState([]);
  const {id} = useParams()
  

  useEffect(() => {
    // Fetch the list of rooms and update state
    adminInstance.get(`${baseUrl}/api/booking/roomlistuser/`)
      .then((response) => response.data)
      .then((data) => setRoomList(data))
      .catch((error) => console.error('Error fetching rooms:', error));
  }, []);

  return (
    <div className="room-container p-4">
      <div className="text-center my-5">
        <h1 className="text-4xl font-bold text-gray-800">Room List</h1>
        <div className="w-16 h-1 bg-blue-500 mx-auto mt-2"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {roomList.map((room, index) => (
          <div key={index} className="mb-4">
            <div className="p-6 rounded-lg shadow-md border border-gray-300 bg-white relative group overflow-hidden">
              <img
                src={room.cover_image}
                alt={room.title}
                className="mb-4 h-48 w-full object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-black mb-2">Name: {room.title}</h2>
                <h2 className="text-lg font-semibold text-black mb-2">Price Per Day: ₹ {room.price_per_night}</h2>
                <a
                  href={`/room-detail/${room.id}/`}
                  className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md text-center transition duration-300 ease-in-out hover:bg-blue-600"
                >
                  View Details
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomListUser;




