import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt, FaShoppingBag, FaSignOutAlt } from "react-icons/fa";

const UserDropdown = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setOpen((prev) => !prev); // just toggle dropdown, no login check
  };

  const closeDropdown = () => setOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("userId"); // clear session
    alert("Logged out!");
    closeDropdown();
    navigate("/login");
  };

  return (
    <div className="position-relative">
      <span
        className="d-flex align-items-center"
        style={{ cursor: "pointer" }}
        onClick={toggleDropdown}
      >
        <FaUserAlt size={20} color="#000" />
      </span>

      {open && (
        <ul
          className="dropdown-menu dropdown-menu-end shadow show my-4"
          style={{ display: "block", position: "absolute", right: 0 }}
        >
          <li>
            <Link
              className="dropdown-item d-flex align-items-center gap-2"
              to="/profile"
              onClick={closeDropdown}
            >
              <FaUserAlt /> Profile
            </Link>
          </li>
          <li>
            <Link
              className="dropdown-item d-flex align-items-center gap-2"
              to="/orders"
              onClick={closeDropdown}
            >
              <FaShoppingBag /> My Orders
            </Link>
          </li>
          <li>
            <button
              className="dropdown-item d-flex align-items-center gap-2"
              onClick={handleLogout}
            >
              <FaSignOutAlt /> Logout
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default UserDropdown;
