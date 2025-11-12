import React, { useEffect, useState } from "react";
import { getAddressesByUser, deleteAddress } from "../../services/addressService"; 
import AddAddress from "./AddAddress.jsx";
import EditAddress from "./EditAddress.jsx";
import { FaMapMarkerAlt, FaEdit, FaTrash } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom";
import "./AddressTab.css";

const AddressTab = ({ userId }) => {
  const navigate = useNavigate(); // initialize navigate
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editAddress, setEditAddress] = useState(null);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const data = await getAddressesByUser(userId);
      setAddresses(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching addresses:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchAddresses();
  }, [userId]);

  const handleAddClick = () => {
    setShowAddForm(true);
    setEditAddress(null);
  };

  const handleBack = () => {
    setShowAddForm(false);
    setEditAddress(null);
  };

  const handleAddressAdded = (newAddress) => {
    setAddresses([newAddress, ...addresses]);
  };

  const handleEditClick = (address) => {
    setEditAddress(address);
    setShowAddForm(false);
  };

  const handleAddressUpdated = (updatedAddress) => {
    setAddresses(
      addresses.map((addr) => (addr.id === updatedAddress.id ? updatedAddress : addr))
    );
    setEditAddress(null);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        await deleteAddress(id);
        setAddresses(addresses.filter((addr) => addr.id !== id));
        alert("Address deleted successfully!");
      } catch (error) {
        console.error(error);
        alert("Error deleting address!");
      }
    }
  };

  if (loading) return <p>Loading addresses...</p>;

  return (
    <div>
      {/* Back button above container */}
      <div style={{ marginBottom: "15px" }}>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/")}
        >
          Back
        </button>
      </div>

      <div className="address-container">
        {showAddForm && (
          <AddAddress
            userId={userId}
            onAddressAdded={handleAddressAdded}
            onBack={handleBack}
          />
        )}

        {editAddress && (
          <EditAddress
            address={editAddress}
            onAddressUpdated={handleAddressUpdated}
            onBack={handleBack}
          />
        )}

        {!showAddForm && !editAddress && (
          <>
            <div className="address-card add-card" onClick={handleAddClick}>
              <FaMapMarkerAlt size={40} />
              <span>Add New Address</span>
            </div>

            {addresses.map((addr) => (
              <div key={addr.id} className="address-card">
                {addr.isDefault && <div className="default-badge">DEFAULT</div>}
                <div className="address-actions">
                  <FaEdit
                    className="edit-icon"
                    onClick={() => handleEditClick(addr)}
                  />
                  <FaTrash
                    className="delete-icon"
                    onClick={() => handleDeleteClick(addr.id)}
                  />
                </div>
                <div className="address-info">
                  <p>{addr.street}</p>
                  <p>{addr.city}, {addr.state}</p>
                  <p>{addr.postalCode} {addr.country}</p>
                  {addr.landmark && <p>Landmark: {addr.landmark}</p>}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default AddressTab;
