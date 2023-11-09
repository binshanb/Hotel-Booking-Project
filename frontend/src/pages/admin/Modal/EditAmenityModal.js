import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';

export default function EditAmenityModal({
  isOpen,
  onRequestClose,
  onUpdateAmenity,
  amenityData,
}) {
  const [formError, setFormError] = useState({});
  const [amenityName, setAmenityName] = useState(amenityData?.name || '');

  useEffect(() => {
    console.log(amenityData,"uuuuuuuuuuuuu");
    setAmenityName(amenityData?.name || '');
  }, [amenityData]);

  const handleUpdateAmenity = () => {
    if (!amenityName) {
      setFormError('Amenity name is required.');
      return;
    }

    onUpdateAmenity(amenityData.id, amenityName);
    setAmenityName('');
    onRequestClose();
  };

  const validate = (amenityName) => {
    const errors = {};

    if (!amenityName) {
      errors.amenityName = 'Amenity name is required';
    } else if (amenityName.length < 3) {
      errors.amenityName = 'Enter at least 3 characters';
    }

    return errors;
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Amenity Modal"
      className="custom-modal" // You can create CSS classes for styling
      overlayClassName="custom-overlay"
    >
      <div className="modal-content p-4">
        <div className="header">
          <div className="close-icon" onClick={onRequestClose}>
            <FaTimes className="text-gray-500 hover:text-red-500 cursor-pointer" />
          </div>
        </div>
        <h2 className="text-3xl font-bold mt-4">Edit Amenity</h2>
        <input
          type="text"
          placeholder="Amenity Name"
          value={amenityName}
          onChange={(e) => setAmenityName(e.target.value)}
          className="w-full border rounded p-2 mt-2"
        />
        {formError && (
          <span className="text-red-500">{formError}</span>
        )}

        <div className="buttonDiv mt-4">
          <button
            onClick={handleUpdateAmenity}
            className="add-button bg-blue-500 text-white px-4 py-2 rounded cursor-pointer mx-auto"
          >
            Update
          </button>
        </div>
      </div>
    </Modal>
  );
}

