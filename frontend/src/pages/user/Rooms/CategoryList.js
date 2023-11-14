

// import hotelImage1 from '../../../assets/hotel11.jpg';
// import hotelImage3 from '../../../assets/singlebed1.jpg';
// import hotelImage4 from '../../../assets/familybed1.jpg';
// import hotelImage5 from '../../../assets/triplebed1.jpg';



// const roomsData = [
//   {
//     title: 'Single Room',
//     imageUrl: hotelImage3,
//     backgroundColor: 'bg-gray-400',
//     price: '550/day',
//     features: [
      
//     ],
//   },
//   {
//     title: 'Double Room',
//     imageUrl: hotelImage1,
//     backgroundColor: 'bg-gray-400',
//     price: '₹ 999/ day',
//     features: [
      
//     ],
//   },
//   {
//     title: 'Tripple Room',
//     imageUrl: hotelImage5,
//     backgroundColor: 'bg-gray-400',
//     price: '₹ 1999/day',
//     features: [
    
//     ],
//   },
//   {
//     title: 'Family Room',
//     imageUrl: hotelImage4,
//     backgroundColor: 'bg-gray-400',
//     price: '₹ 3000/day',
//     features: [
    
//     ],
//   },
// ];





import React, { useState, useEffect } from 'react';
import { baseUrl } from '../../../utils/constants';
import { adminInstance } from '../../../utils/Axios';
import { useNavigate } from 'react-router-dom';

function CategoryList() {
  const [categorylist, setCategoryList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the room categories and update state
    adminInstance.get(`${baseUrl}/api/booking/admin/room-category/`)
      .then((response) => response.data)  // Use response.data instead of response.json()
      .then((data) => setCategoryList(data))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);
  const handleRoomList=()=>{
    navigate('/roomlistuser')
  }
  return (
    <div className="room-container p-4">
    <div className="text-center my-5">
      <h1 className="text-4xl font-bold text-gray-800">Room Categories</h1>
      <div className="w-16 h-1 bg-blue-500 mx-auto mt-2"></div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {categorylist.map((category, index) => (
        <div key={index} className="mb-6">
          <div
            className={`p-6 rounded-lg shadow-md border border-gray-300 relative group ${category.backgroundColor}`}
          >
            <img
              src={category.image}
              alt={category.category_name}
              className="mb-4 h-48 w-full object-cover rounded-lg mx-auto"
            />
            <h2 className="text-2xl font-semibold text-black mb-2">{category.category_name}</h2>
            <button onClick={handleRoomList}
              
                className="inline-block px-6 py-3 bg-blue-500 text-white rounded-md text-center transition duration-300 ease-in-out transform hover:scale-105 hover:bg-blue-600"
              >
                Go to Rooms
              </button>
          </div>
        </div>
      ))}
    </div>
  </div>
  );
}

export default CategoryList;













