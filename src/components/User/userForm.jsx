// src/components/UserForm.jsx
import React, { useState } from "react";
import { createUser } from "../../services/userService"; // import your service

const UserForm = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    dateOfBirth: "",
    role: "USER",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    setErrors({ ...errors, [name]: "" }); // clear error on change
  };

  const validate = () => {
    const newErrors = {};
    if (!user.firstName.trim()) newErrors.firstName = "First name is required";
    if (!user.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!user.username.trim()) newErrors.username = "Username is required";
    if (!user.email.trim()) newErrors.email = "Email is required";
    if (!user.password.trim()) newErrors.password = "Password is required";
    if (!user.confirmPassword.trim()) newErrors.confirmPassword = "Confirm password is required";
    if (user.password !== user.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!user.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const { confirmPassword, ...userData } = user; // exclude confirmPassword
      const response = await createUser(userData); // call service function
      alert("User created successfully!");
      console.log(response);

      setUser({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        dateOfBirth: "",
        role: "USER",
      });
      setErrors({});
    } catch (error) {
      if (error.response && error.response.data) {
        const backendErrors = error.response.data.errors;
        if (backendErrors) {
          const newErrors = {};
          backendErrors.forEach((err) => {
            newErrors[err.field] = err.message;
          });
          setErrors(newErrors);
        } else {
          alert(error.response.data.message || "Failed to create user.");
        }
      } else {
        alert("Failed to create user.");
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        {/* First Name + Last Name */}
        <div className="row mb-3">
          <div className="col">
            <label className="form-label">First Name</label>
            <input
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
              className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.firstName}</div>
          </div>
          <div className="col">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
              className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.lastName}</div>
          </div>
        </div>

        {/* Username + Email */}
        <div className="row mb-3">
          <div className="col">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              className={`form-control ${errors.username ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.username}</div>
          </div>
          <div className="col">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.email}</div>
          </div>
        </div>

        {/* Phone Number + Date of Birth */}
        <div className="row mb-3">
          <div className="col">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={user.phoneNumber}
              onChange={handleChange}
              className={`form-control ${errors.phoneNumber ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.phoneNumber}</div>
          </div>
          <div className="col">
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={user.dateOfBirth}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </div>


        {/* Password + Confirm Password */}
        <div className="row mb-3">
          <div className="col">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.password}</div>
          </div>
          <div className="col">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
              className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
            />
            <div className="invalid-feedback">{errors.confirmPassword}</div>
          </div>
        </div>
        {/* Hidden Role */}
        <input type="hidden" name="role" value={user.role} />

        <button type="submit" className="btn btn-primary center">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserForm;
