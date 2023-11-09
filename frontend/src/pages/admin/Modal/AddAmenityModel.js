import React, { useState } from 'react';
import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';

export default function AddAmenityModal({
  isOpen,
  onRequestClose,
  onAddAmenity,
}) {
  const [amenityName, setAmenityName] = useState('');
  const [formError, setFormError] = useState('');

  const handleAddAmenity = () => {
    if (!amenityName) {
      setFormError('Amenity name is required.');
      return;
    }

    onAddAmenity(amenityName);
    setAmenityName('');
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Amenity Modal"
      className="custom-modal" // You can create CSS classes for styling
      overlayClassName="custom-overlay"
    >
      <div className="modal-content p-4">
        <div className="header">
          <div className="close-icon" onClick={onRequestClose}>
            <FaTimes className="text-gray-500 hover:text-red-500 cursor-pointer" />
          </div>
        </div>
        <h2 className="text-4xl font-bold mt-4">Add Amenity</h2>
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
            onClick={handleAddAmenity}
            className="add-button bg-blue-500 text-white px-4 py-2 rounded cursor-pointer mx-auto"
          >
            Add
          </button>
        </div>
      </div>
    </Modal>
  );
}

