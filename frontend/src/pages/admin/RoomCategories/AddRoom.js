import React, { useState } from 'react';
import axios from 'axios';
import { adminInstance } from '../../../utils/Axios';
import { useDropzone } from 'react-dropzone';

const AddRoom = () => {
  const [roomName, setRoomName] = useState('');
  const [roomImage, setRoomImage] = useState(null);
  const [pricePerDay, setPricePerDay] = useState('');
  const [category, setCategory] = useState('');
  const [capacity, setCapacity] = useState('');
  const [roomSize, setRoomSize] = useState('');
 
  const [isBooked, setIsBooked] = useState(false);
  
  const [roomSlug, setRoomSlug] = useState('');
  const [amenities, setAmenities] = useState([]);
  const [features, setFeatures] = useState([]);

  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const onDrop = (acceptedFiles) => {
    // Set the first accepted file as the category image
    if (acceptedFiles && acceptedFiles.length > 0) {
      setRoomImage(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const toggleIsBooked = () => {
    setIsBooked(!isBooked); // Toggle between true and false
  };

  const handleImageChange = (e) => {
    setRoomImage(e.target.files[0]);
  };

  const handleAmenityChange = (e) => {
    const amenityId = e.target.value;
    if (e.target.checked) {
      setSelectedAmenities([...selectedAmenities, amenityId]);
    } else {
      setSelectedAmenities(selectedAmenities.filter(id => id !== amenityId));
    }
  };

  const handleFeatureChange = (e) => {
    const featureId = e.target.value;
    if (e.target.checked) {
      setSelectedFeatures([...selectedFeatures, featureId]);
    } else {
      setSelectedFeatures(selectedFeatures.filter(id => id !== featureId));
    }
  }; 

  const handleAddRoom = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', roomName);
    formData.append('price_per_night', pricePerDay);
    formData.append('cover_image', roomImage);
    formData.append('category', category);
    formData.append('capacity', capacity);
    formData.append('room_size', roomSize);
   
   
    formData.append('room_slug', roomSlug);
    formData.append('is_booked', isBooked);

    try {
      const response = await adminInstance.post('/addroom', formData);

      if (response.status === 201) {
        // Room added successfully, you can show a success message if needed
        console.log('Room added successfully');

        // Clear the form fields and reset the state
        setRoomName('');
        setPricePerDay('');
        setRoomImage(null);
        setCategory('');
        setCapacity('');
        setRoomSize('');
        setRoomSlug('');
      
      
        setIsBooked(false);

        // Reload the page to show the updated list of rooms
        window.location.reload();
      } else {
        // Handle errors and show an error message
        console.error('Error adding room');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Add Room</h2>
      <form onSubmit={handleAddRoom}>
        {/* Input fields for room details */}
        <div className="mb-4">
          <label htmlFor="roomName" className="block text-gray-700 text-xs font-bold mb-2">
            Room Name
          </label>
          <input
            // ... other attributes
            type="text"
            id="roomName"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="Enter room name"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="pricePerDay" className="block text-gray-700 text-xs font-bold mb-2">
           Price Per Day
          </label>
          <input
            
            type="number"
            id="pricePerDay"
            value={pricePerDay}
            onChange={(e) => setPricePerDay(e.target.value)}
            placeholder="Enter price"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="roomImage" className="block text-gray-700 text-xs font-bold mb-2">
           Room Image
          </label>
        <div {...getRootProps()} className="mb-4 p-4 border-dashed border-2 border-gray-400 rounded text-center">
      <input {...getInputProps()} />
      {roomImage ? (
        <p className="text-gray-700">Selected Image: {roomImage.name}</p>
      ) : (
        <p className="text-gray-700">Drag 'n' drop an image here, or click to select an image.</p>
      )}
    </div>
    </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 text-xs font-bold mb-2">
            Category
          </label>
          <input
     
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter category"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="capacity" className="block text-gray-700 text-xs font-bold mb-2">
            Capacity
          </label>
          <input
          
            type="number"
            id="capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            placeholder="Enter capacity"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="roomSize" className="block text-gray-700 text-xs font-bold mb-2">
            Room Name
          </label>
          <input
            // ... other attributes
            type="number"
            id="roomSize"
            value={roomSize}
            onChange={(e) => setRoomSize(e.target.value)}
            placeholder="Enter room size"
          />
        </div>
        <div className="mb-4">
          <label>Amenities</label>
          {amenities.map((amenity) => (
            <label key={amenity.id}>
              <input
                type="checkbox"
                value={amenity.id}
                onChange={handleAmenityChange}
                checked={selectedAmenities.includes(amenity.id)}
              />
              {amenity.name}
            </label>
          )
          
          )}
          
        </div>

        {/* Checkbox inputs for features */}
        <div className="mb-4">
          <label>Features</label>
          {features.map((feature) => (
            <label key={feature.id}>
              <input
                type="checkbox"
                value={feature.id}
                onChange={handleFeatureChange}
                checked={selectedFeatures.includes(feature.id)}
              />
              {feature.name}
            </label>
          )
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="roomSlug" className="block text-gray-700 text-xs font-bold mb-2">
       Room Slug
          </label>
          <input
            
            type="text"
            id="roomSlug"
            value={roomSlug}
            onChange={(e) => setRoomSlug(e.target.value)}
            placeholder="Enter roomslug"
          />
        </div>
        
        {/* Checkbox for 'isBooked' */}
        <label>
          <input
            type="checkbox"
            checked={isBooked}
            onChange={toggleIsBooked}
          />
          Is Booked
        </label>
        
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default AddRoom;


