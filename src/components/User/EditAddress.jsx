import React, { useState, useEffect } from "react";
import { updateAddress } from "../../services/addressService";

const EditAddress = ({ address, onAddressUpdated, onBack }) => {
  const [formData, setFormData] = useState({ ...address });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updated = await updateAddress(address.id, formData);
      alert("Address updated successfully!");
      onAddressUpdated(updated);
    } catch (error) {
      console.error(error);
      alert("Error updating address!");
    }
  };

  return (
    <div className="card p-4 mt-3" style={{ width: "800px" }}>
      <h3>Edit Address</h3>
      <form onSubmit={handleSubmit}>
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

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
          <button type="button" className="btn btn-secondary" onClick={onBack}>
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAddress;
