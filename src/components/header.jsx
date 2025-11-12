import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingBag } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import CartDrawer from "./Cart/cartDrawer";
import UserDropdown from "./userDropdown"; // React-only dropdown

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleTabClick = (path) => {
    if (location.pathname === path) {
      navigate("/"); // if already on same page, go home
    } else {
      navigate(path); // otherwise go to selected page
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm fixed-top">
        <div className="container-fluid px-4">
          {/* Logo */}
          <Link className="navbar-brand" to="/">
            <h2>StyleMart</h2>
          </Link>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Nav Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              {[
                { path: "/men", label: "Men" },
                { path: "/women", label: "Women" },
                { path: "/collections", label: "Collections" },
                { path: "/bestsellers", label: "Best Sellers" },
                { path: "/newarrivals", label: "New Arrivals" },
                { path: "/admin", label: "Admin Panel" }, // 👈 Added Admin tab
              ].map((item) => (
                <li className="nav-item" key={item.path}>
                  <span
                    role="button"
                    className={
                      "nav-link" +
                      (location.pathname === item.path
                        ? " fw-bold text-decoration-underline"
                        : "")
                    }
                    onClick={() => handleTabClick(item.path)}
                  >
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>

            {/* Icons */}
            <div className="d-flex gap-3 align-items-center">
              <FaSearch size={18} style={{ cursor: "pointer" }} />
              <UserDropdown />
              <FaShoppingBag
                size={18}
                style={{ cursor: "pointer" }}
                data-bs-toggle="offcanvas"
                data-bs-target="#cartDrawer"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Optional spacing for fixed-top navbar */}
      <div style={{ paddingTop: "70px" }}></div>
    </>
  );
};

export default Header;
