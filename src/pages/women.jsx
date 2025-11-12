import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductCard from "../components/Product/productCard";

const Women = () => {
 const { items, loading, error } = useSelector((state) => state.products);
const navigate = useNavigate();
  const menProducts = items.filter(
    (p) => p.product?.gender?.trim().toLowerCase() === "women"
  );

  return (
    <div className="container py-5">
      <button
          className="btn btn-dark mb-3"
          onClick={() => navigate(-1)} // <-- goes back to previous page
        >
          &larr; Back
        </button>
      <h1>Women's Collection</h1>

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

export default Women;
