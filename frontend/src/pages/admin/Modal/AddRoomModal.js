import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { FaTimes, FaTrash, FaImage } from "react-icons/fa";
import { FcAddImage } from "react-icons/fc";
import { toast } from 'react-toastify';

Modal.setAppElement('#root');

export default function AddRoomModal({
  isOpen,
  onRequestClose,
  onAddRoom,
  categories, // Pass a list of categories to select from
  amenities, // Pass a list of amenities to select from
  features, // Pass a list of features to select from
}) {
  const [formError, setFormError] = useState({});
  const [roomName, setRoomName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [pricePerNight, setPricePerNight] = useState("");
  const [capacity, setCapacity] = useState("");
  const [roomSize, setRoomSize] = useState("");
  const [description, setDescription] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const handleAddRoom = async (e) => {
    e.preventDefault();
    const errors = validate(roomName, selectedCategory, pricePerNight, capacity, roomSize);
    setFormError(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const roomData = new FormData();
        roomData.append('title', roomName);
        roomData.append('cover_image', selectedImage);
        roomData.append('category.category_name', selectedCategory);
        roomData.append('price_per_night', pricePerNight);
        roomData.append('capacity', capacity);
        roomData.append('room_size', roomSize);
        roomData.append('description', description);

        selectedAmenities.forEach((amenity) => roomData.append('amenities.name', amenity));
        selectedFeatures.forEach((feature) => roomData.append('features.name', feature));

        const response = await onAddRoom(roomData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response === null) {
          setRoomName("");
          setFormError({});
          setSelectedImage(null);
          setSelectedCategory("");
          setPricePerNight("");
          setCapacity("");
          setRoomSize("");
          setDescription("");

          setSelectedAmenities([]);
          setSelectedFeatures([]);
          onRequestClose();
          showToast('Room added successfully!', 'success');
        }
      } catch (error) {
        console.error('Error adding room:', error.response.data);
        showToast('Error adding room', 'error');
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  const validate = (roomName, selectedCategory, pricePerNight, capacity, roomSize) => {
    const errors = {};

    if (!roomName) {
      errors.roomName = "Room name is required";
    } else if (roomName.length < 3) {
      errors.roomName = "Enter at least 3 characters";
    }

    if (!selectedCategory) {
      errors.selectedCategory = "Select a category";
    }

    if (!pricePerNight) {
      errors.pricePerNight = "Price per night is required";
    } else if (isNaN(pricePerNight) || parseFloat(pricePerNight) <= 0) {
      errors.pricePerNight = "Invalid price";
    }

    if (!capacity) {
      errors.capacity = "Capacity is required";
    } else if (isNaN(capacity) || parseInt(capacity) <= 0) {
      errors.capacity = "Invalid capacity";
    }

    if (!roomSize) {
      errors.roomSize = "Room size is required";
    }

    return errors;

  if (!description) {
    errors.description = "Description is required";
  }
};
  const showToast = (message, type = 'error') => {
    toast[type](message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleAmenitiesChange = (e, amenityId) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      // Handle adding the amenity to the selectedAmenities state
      setSelectedAmenities((prevAmenities) => [...prevAmenities, amenityId]);
    } else {
      // Handle removing the amenity from the selectedAmenities state
      setSelectedAmenities((prevAmenities) =>
        prevAmenities.filter((id) => id !== amenityId)
      );
    }
  };

  const handleFeaturesChange = (e, featureId) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      // Handle adding the feature to the selectedFeatures state
      setSelectedFeatures((prevFeatures) => [...prevFeatures, featureId]);
    } else {
      // Handle removing the feature from the selectedFeatures state
      setSelectedFeatures((prevFeatures) =>
        prevFeatures.filter((id) => id !== featureId)
      );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Room Modal"
      className="custom-modal"
      overlayClassName="custom-overlay"
    >
      <div className="modal-content p-4">
        <div className="header">
          <div className="close-icon" onClick={onRequestClose}>
            <FaTimes className="text-gray-500 hover:text-red-500 cursor-pointer" />
          </div>
        </div>
        <h2 className="text-4xl font-bold mt-4">Add Room</h2>
        <input
          type="text"
          placeholder="Room Name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          className="w-full border rounded p-2 mt-2"
        />
        <span className="text-red-500">
          {formError?.roomName ? formError.roomName : ""}
        </span>

        <div className="category-select mt-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.category_name}
              </option>
            ))}
          </select>
          <span className="text-red-500">
            {formError?.selectedCategory ? formError.selectedCategory : ""}
          </span>
        </div>

        <input
          type="text"
          placeholder="Price per Night"
          value={pricePerNight}
          onChange={(e) => setPricePerNight(e.target.value)}
          className="w-full border rounded p-2 mt-2"
        />
        <span className="text-red-500">
          {formError?.pricePerNight ? formError.pricePerNight : ""}
        </span>

        <input
          type="text"
          placeholder="Capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          className="w-full border rounded p-2 mt-2"
        />
        <span className="text-red-500">
          {formError?.capacity ? formError.capacity : ""}
        </span>

        <input
          type="text"
          placeholder="Room Size"
          value={roomSize}
          onChange={(e) => setRoomSize(e.target.value)}
          className="w-full border rounded p-2 mt-2"
        />
        <span className="text-red-500">
          {formError?.roomSize ? formError.roomSize : ""}
        </span>
        <input
  type="text"
  placeholder="Description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  className="w-full border rounded p-2 mt-2"
/>
<span className="text-red-500">
  {formError?.description ? formError.description : ""}
</span>
 
        {/* Amenities and Features Selection */}
        <div className="amenities-select mt-2">
          <label>Amenities</label>
          {Array.isArray(amenities) &&
            amenities.map((amenity) => (
              <label key={amenity.id}>
                <input
                  type="checkbox"
                  value={amenity.id}
                  checked={selectedAmenities.includes(amenity.id)}
                  onChange={(e) => handleAmenitiesChange(e, amenity.id)}
                />
                {amenity.name}
              </label>
            ))}
          <span className="text-red-500">
            {formError?.selectedAmenities ? formError.selectedAmenities : ""}
          </span>
        </div>

        <div className="features-select mt-2">
          <label>Features</label>
          {Array.isArray(features) &&
            features.map((feature) => (
              <label key={feature.id}>
                <input
                  type="checkbox"
                  value={feature.id}
                  checked={selectedFeatures.includes(feature.id)}
                  onChange={(e) => handleFeaturesChange(e, feature.id)}
                />
                {feature.feature_name}
              </label>
            ))}
          <span className="text-red-500">
            {formError?.selectedFeatures ? formError.selectedFeatures : ""}
          </span>
        </div>

        <div className="image-input mt-4">
          {selectedImage ? (
            <div className="image-preview-container">
              <img
                src={typeof selectedImage === 'string' ? selectedImage : URL.createObjectURL(selectedImage)}
                alt="Selected Image"
                className="image-preview"
              />
              <div
                className="remove-image text-red-500 cursor-pointer"
                onClick={handleRemoveImage}
              >
                <FaTrash />
              </div>
            </div>
          ) : (
            <div
              style={{
                color: "#fff",
                padding: "8px 12px",
                borderRadius: "5px",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
              }}
              onClick={() => document.getElementById("addRoomImage").click()}
            >
              <FcAddImage
                style={{ marginRight: "5px", height: "100px", width: "100px" }}
              />
              <input
                type="file"
                id="addRoomImage"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            </div>
          )}
        </div>

        <div className="buttonDiv mt-4">
          <button
            onClick={handleAddRoom}
            className="add-button bg-blue-500 text-white px-4 py-2 rounded cursor-pointer mx-auto"
          >
            Add
          </button>
        </div>
      </div>
    </Modal>
  );
}
