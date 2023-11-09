import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { AiOutlineAppstoreAdd, AiOutlineCheckCircle } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { FaBan, FaCheck } from "react-icons/fa";
import { GoCheckCircleFill } from "react-icons/go";
import { HiExclamationCircle } from "react-icons/hi";
import { adminInstance } from "../../../utils/Axios";
import '../UserManagement.css';  // Import your CSS for amenities management
import AddAmenityModal from "../Modal/AddAmenityModel";  // Import your modal for adding amenities
import EditAmenityModal from "../Modal/EditAmenityModal";  // Import your modal for editing amenities
import { toast } from "react-toastify";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 130 },
  
];

const showToast = (message, type = "error") => {
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

const AmenitiesList = () => {
  const [amenities, setAmenities] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAmenity, setSelectedAmenity] = useState([]);

  const fetchAmenities = async () => {
    try {
      const response = await adminInstance.get("/room-amenities/");
      setAmenities(response.data);
    } catch (error) {
      console.error("Error fetching amenities", error);
    }
  };

  useEffect(() => {
    fetchAmenities();
  }, []);

  const handleAddAmenity = async (amenityData) => {
    try {
      await adminInstance.post("/room-amenities/", amenityData);
      fetchAmenities();
      showToast("Amenity added", "success");
      setIsAddModalOpen(false);
    } catch (error) {
      showToast("Error adding amenity", "error");
      console.error("Error adding amenity", error);
    }
  };

  const handleEditAmenity = (amenity) => {
    console.log(amenity)
    setSelectedAmenity(amenity);
    setIsEditModalOpen(true);
  };

  const handleUpdateAmenity = async (updatedAmenityData, amenityId) => {
    try {
      await adminInstance.put(`/room-amenities/${amenityId}/`, updatedAmenityData);
      fetchAmenities();
      showToast("Amenity updated", "success");
      setIsEditModalOpen(false);
    } catch (error) {
      showToast("Error updating amenity", "error");
      console.error("Error updating amenity", error);
    }
  };

  const handleBlockUnblockAmenity = async (amenityId, isBlocked) => {
    try {
      await adminInstance.patch(`/room-amenities/block-unblock/${amenityId}/`, {
        is_active: !isBlocked,
      });
      fetchAmenities();
      showToast(`Amenity ${isBlocked ? 'Unblocked' : 'Blocked'}`, "success");
    } catch (error) {
      showToast("Error updating amenity", "error");
      console.error("Error updating amenity", error);
    }
  };

  const columnsWithActions = [
    ...columns,
    {
      field: "blockUnblock",
      headerName: "Block/Unblock",
      width: 150,
      renderCell: (params) => (
        <div>
          <button
            onClick={() => handleBlockUnblockAmenity(params.row.id, params.row.is_active)}
            style={{ border: "none", background: "none", cursor: "pointer" }}
          >
            {params.row.is_active ? <FaBan color="red" style={{ fontSize: "24px" }} /> : <AiOutlineCheckCircle color="green" style={{ fontSize: "24px" }} />}
          </button>{" "}
        </div>
      ),
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 130,
      renderCell: (params) => (
        <div>
          <button
            onClick={() => handleEditAmenity(params.row)}
            style={{ border: "none", background: "none", cursor: "pointer" }}
          >
            <BiSolidEdit style={{ fontSize: "24px", color: "blue" }} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ backgroundColor: "white", height: "100vh" }}>
      <div className="data-grid-container">
        <div className="header d-flex justify-content-between align-items-center mb-4">
          <div style={{ fontWeight: "bold" }}>Amenities List</div>
          <div
            className="d-flex align-items-center"
            onClick={() => setIsAddModalOpen(true)}
          >
            <AiOutlineAppstoreAdd style={{ fontSize: "30px" }} /> Add
          </div>
        </div>
        <div className="h-500 w-full overflow-hidden border border-gray-300">
          <DataGrid
            rows={amenities}
            columns={columnsWithActions}
            pageSize={5}
            checkboxSelection
            sx={{ backgroundColor: "white" }}
            isCellEditable={(params) => params.field !== "id"}
            onCellEditCommit={(params) => {
              const updatedData = [...amenities];
              updatedData[params.id - 1][params.field] = params.props.value;
              handleUpdateAmenity(updatedData[params.id - 1]);
            }}
          />
        </div>

        <AddAmenityModal
          isOpen={isAddModalOpen}
          onRequestClose={() => setIsAddModalOpen(false)}
          onAddAmenity={handleAddAmenity}
        />

        <EditAmenityModal
          isOpen={isEditModalOpen}
          onRequestClose={() => setIsEditModalOpen(false)}
          onUpdateAmenity={(updatedData) =>
            handleUpdateAmenity(updatedData, selectedAmenity.id)
          }
          amenityData={selectedAmenity}
        />
      </div>
    </div>
  );
};

export default AmenitiesList;

