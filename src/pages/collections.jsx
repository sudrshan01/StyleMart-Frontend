import React from "react";
import { useNavigate } from "react-router-dom";

const Collections = () => {
  const navigate = useNavigate();

  return (
    <div className="container py-5">
      {/* Back Button */}
      <button
        className="btn btn-dark mb-3"
        onClick={() => navigate(-1)}
      >
        &larr; Back
      </button>

      <h1>Collections</h1>
      <p>Browse through our curated collections.</p>
    </div>
  );
};

export default Collections;
