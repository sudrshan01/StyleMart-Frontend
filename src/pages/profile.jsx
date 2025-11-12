// src/components/Profile.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaMapMarkerAlt,
  FaShoppingCart,
  FaSignOutAlt,
} from "react-icons/fa";
import { getUserResById } from "../services/userService";
import "./Profile.css";

import ProfileTab from "../components/User/ProfileTab";
import AddressTab from "../components/User/AddressTab";
import OrdersTab from "../components/Orders/orderPage";

const Profile = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/login");
      return;
    }

    getUserResById(userId)
      .then((data) => setUser(data))
      .catch((err) => console.error("Failed to fetch user:", err));

    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div className="profile-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div>
          {/* User Info */}
          <div className="user-info">
            <div className="avatar">
              {user
                ? user.firstName && user.lastName
                  ? `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`
                  : "AZ"
                : "AZ"}
            </div>
            <h2 className="username">
              {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
            </h2>
            <p className="time">{currentTime.toLocaleTimeString()}</p>
          </div>

          {/* Menu */}
          <nav className="menu">
            <button
              className={`menu-item ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              <FaUser className="icon" /> My Profile
            </button>
            <button
              className={`menu-item ${activeTab === "address" ? "active" : ""}`}
              onClick={() => setActiveTab("address")}
            >
              <FaMapMarkerAlt className="icon" /> Delivery Address
            </button>
            <button
              className={`menu-item ${activeTab === "orders" ? "active" : ""}`}
              onClick={() => setActiveTab("orders")}
            >
              <FaShoppingCart className="icon" /> My Orders
            </button>
          </nav>
        </div>

        {/* Logout */}
        <button onClick={handleLogout} className="logout">
          <FaSignOutAlt className="icon" /> Log Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {activeTab === "profile" && user && <ProfileTab user={user} />}
        {activeTab === "address" && <AddressTab userId={localStorage.getItem("userId")} />}
        {activeTab === "orders" && <OrdersTab />}
      </main>
    </div>
  );
};

export default Profile;
