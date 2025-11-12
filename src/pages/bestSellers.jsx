import React from "react";
import { useNavigate } from "react-router-dom";

const BestSellers = () => {
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

      <h1>Best Sellers</h1>
      <p>Check out our most popular products.</p>
    </div>
  );
};

export default BestSellers;
