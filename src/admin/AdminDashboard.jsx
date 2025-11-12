import React, { useState } from "react";
import {
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaStar,
  FaBell,
  FaClipboardList,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdownToggle = (label) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const menuItems = [
    {
      label: "Products",
      icon: <FaBoxOpen />,
      dropdown: [
        { label: "Add Product", path: "/admin/products/add" },
        { label: "View All", path: "/admin/products/view" },
      ],
    },
    { label: "Orders", icon: <FaClipboardList />, path: "/admin/orders" },
    { label: "Users", icon: <FaUsers />, path: "/admin/users" },
    { label: "Reviews", icon: <FaStar />, path: "/admin/reviews" },
    { label: "Cart", icon: <FaShoppingCart />, path: "/admin/cart" },
    { label: "Notifications", icon: <FaBell />, path: "/admin/notifications" },
  ];

  return (
    <div className="admin-dashboard d-flex">
      {/* Sidebar */}
      <div className="admin-sidebar shadow-sm">
        <div className="sidebar-header text-center py-3 border-bottom">
          <h4>Admin Panel</h4>
        </div>

        <ul className="nav flex-column mt-3">
          {menuItems.map((item, index) => (
            <li key={index} className="nav-item">
              {/* If item has dropdown */}
              {item.dropdown ? (
                <>
                  <span
                    className="nav-link d-flex justify-content-between align-items-center"
                    role="button"
                    onClick={() => handleDropdownToggle(item.label)}
                  >
                    <span>
                      <span className="me-2 fs-5">{item.icon}</span>
                      {item.label}
                    </span>
                    {openDropdown === item.label ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </span>

                  {/* Dropdown Menu */}
                  {openDropdown === item.label && (
                    <ul className="nav flex-column ms-4 mt-1">
                      {item.dropdown.map((subItem, subIndex) => (
                        <li
                          key={subIndex}
                          className="nav-item"
                          onClick={() => navigate(subItem.path)}
                        >
                          <span className="nav-link small text-secondary">
                            {subItem.label}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                // Normal menu item (no dropdown)
                <span
                  className="nav-link d-flex align-items-center"
                  role="button"
                  onClick={() => navigate(item.path)}
                >
                  <span className="me-2 fs-5">{item.icon}</span>
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="admin-content flex-grow-1 p-4">
        {/* Show welcome message only when path === /admin */}
        {location.pathname === "/admin" ? (
          <h3 className="mb-4">Welcome to Admin Dashboard</h3>
        ) : null}

        {/* Render nested route components here */}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
