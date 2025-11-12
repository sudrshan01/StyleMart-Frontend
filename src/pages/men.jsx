import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // import useNavigate
import ProductCard from "../components/Product/productCard";

const Men = () => {
  const { items, loading, error } = useSelector((state) => state.products);
  const navigate = useNavigate(); // initialize navigate

  // filter only men products (case-insensitive)
  const menProducts = items.filter(
    (p) => p.product?.gender?.trim().toLowerCase() === "men"
  );

  return (
    <div className="container py-5">
      {/* Back Button */}
      <button
        className="btn btn-dark mb-4"
        onClick={() => navigate(-1)} // go back to previous page
      >
        &larr; Back
      </button>

      <h1>Men's Collection</h1>
  

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="row">
        {menProducts.length === 0 && !loading && (
          <p>No men's products found.</p>
        )}

        {menProducts.map(({ product, averageRating, reviews }) => (
          <div key={product.id} className="col-md-3 mb-4">
            <ProductCard
              product={product}
              averageRating={averageRating}
              reviews={reviews}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Men;
