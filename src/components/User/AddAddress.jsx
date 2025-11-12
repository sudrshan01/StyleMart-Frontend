import React, { useState } from "react";
import { createAddress } from "../../services/addressService";

const AddAddress = ({ userId, onAddressAdded, onBack }) => {
  const [formData, setFormData] = useState({
    houseNo: "",
    street: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    landmark: "",
    isDefault: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData, userId };
      const response = await createAddress(payload);
      alert("✅ Address added successfully!");
      onAddressAdded(response);
      setFormData({
        houseNo: "",
        street: "",
        city: "",
        state: "",
        country: "",
        postalCode: "",
        landmark: "",
        isDefault: false,
      });
    } catch (error) {
      console.error(error);
      alert("❌ Error adding address!");
    }
  };

  return (
    <div className="card p-4 mt-3" style={{ width: "800px", position: "relative" }}>
      {/* 🔙 Back Button */}
      <button
        type="button"
        onClick={onBack}
        className="btn btn-secondary"
        style={{ position: "absolute", top: "10px", left: "10px" }}
      >
        Back
      </button>

      <h3 className="text-center mb-4">Add New Address</h3>

      <form onSubmit={handleSubmit}>
        {/* 🏠 House No */}
        <div className="mb-3">
          <label>House No</label>
          <input
            type="text"
            name="houseNo"
            value={formData.houseNo}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* 🏡 Street */}
        <div className="mb-3">
          <label>Street</label>
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        {/* 🏙️ City + State */}
        <div className="mb-3 d-flex gap-3">
          <div style={{ width: "366px" }}>
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div style={{ width: "366px" }}>
            <label>State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        </div>

        {/* 🌍 Country + Postal Code */}
        <div className="mb-3 d-flex gap-3">
          <div style={{ width: "366px" }}>
            <label>Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div style={{ width: "366px" }}>
            <label>Postal Code</label>
            <input
              type="text"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        </div>

        {/* 📍 Landmark */}
        <div className="mb-3">
          <label>Landmark</label>
          <input
            type="text"
            name="landmark"
            value={formData.landmark}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        {/* ✅ Default Checkbox */}
        <div className="form-check mb-3">
          <input
            type="checkbox"
            name="isDefault"
            checked={formData.isDefault}
            onChange={handleChange}
            className="form-check-input"
            id="isDefault"
          />
          <label className="form-check-label" htmlFor="isDefault">
            Set as Default
          </label>
        </div>

        {/* 📤 Submit Button */}
        <div className="d-flex justify-content-end">
          <button type="submit" className="btn btn-primary">
            Add Address
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAddress;
