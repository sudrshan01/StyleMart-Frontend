import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 
import { updateUser } from "../../services/userService";

const ProfileTab = ({ user, onUpdate }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user, gender: user.gender || "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setFormData({ ...user, gender: user.gender || "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const updatedUser = await updateUser(user.id, formData);
      setLoading(false);
      setIsEditing(false);
      if (onUpdate) onUpdate(updatedUser);
      alert("Profile updated successfully!");
    } catch (error) {
      setLoading(false);
      console.error("Error updating user:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div>
      {/* Back button outside the profile-card */}
      <div style={{ marginBottom: "15px" }}>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="btn btn-secondary"
        >
          Back
        </button>
      </div>

      <div className="profile-card" style={{ position: "relative", padding: "20px" }}>
        {!isEditing && (
          <FaEdit
            onClick={handleEditToggle}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              cursor: "pointer",
              fontSize: "1.4rem",
              color: "#161718ff",
            }}
            title="Edit Profile"
          />
        )}

        <h2 className="greeting">Hello, {user.firstName}!</h2>

        <form className="form-grid" onSubmit={handleSubmit}>
          <input type="hidden" value={formData.id} readOnly />

          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>

          <div className="form-group">
            <label>Contact Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>

          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type={isEditing ? "date" : "text"}
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              readOnly={!isEditing}
            />
          </div>

          <div className="form-group">
            <label>Gender</label>
            {isEditing ? (
              <select
                className="form-group"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <input type="text" value={formData.gender || "Not specified"} readOnly />
            )}
          </div>

          {isEditing && (
            <div
              className="form-actions"
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                marginTop: "20px",
              }}
            >
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleEditToggle}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ProfileTab;
