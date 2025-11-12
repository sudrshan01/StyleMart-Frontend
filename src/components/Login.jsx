import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/userService.jsx"; // import your API function
import "bootstrap/dist/css/bootstrap.min.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
     
      const response = await loginUser(formData.username, formData.password);
console.log("Login API Response:", response);
      if (response && response.userId) {
     
        localStorage.setItem("userId", response.userId);
        console.log(response.userId);
      
        navigate("/");
      } else {
        setError("Invalid login credentials");
      }
    } catch (err) {
      console.error(err);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-4">Login</h3>
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Enter email"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="text-danger">{error}</p>}

          {/* Login button */}
          <button type="submit" className="btn btn-dark w-100">
            Login
          </button>
        </form>

        {/* Extra Links */}
        <div className="text-center mt-3">
          <p className="mb-1">
            Don’t have an account?{" "}
            <span
              className="text-primary fw-semibold"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
          <p className="text-muted" style={{ cursor: "pointer" }}>
            Forgot password?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
