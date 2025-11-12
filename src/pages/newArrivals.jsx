import React from "react";
import { useNavigate } from "react-router-dom";

const NewArrivals = () => {
  const navigate = useNavigate(); // Initialize navigate

  return (
    <div className="container py-5">
      {/* Back Button */}
      <button
        className="btn btn-dark mb-3"
        onClick={() => navigate(-1)} // Go back to previous page
      >
        &larr; Back
      </button>

      <h1>New Arrivals</h1>
      <p>See what’s new in store this season.</p>
    </div>
  );
};

export default NewArrivals;
