import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./ProductCard.css";

const ProductCard = ({ product, averageRating, reviews }) => {
   const navigate = useNavigate();
  const discountedPrice = product.price - (product.price * product.discount) / 100;
console.log(product)
  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="card product-card shadow-sm" onClick={handleClick}        
      style={{ cursor: "pointer" }} >
      {/* Product Image */}
      <div className="product-img-wrapper">
        <img
          // src= {"/images/tshirt.jpeg" } // fallback if no image
          src= {product.mainImage}
          className="card-img-top"
          alt={product.name}
        />
      </div>

      {/* Product Details */}
      <div className="card-body">
        {/* Category, Subcategory, Reviews & Ratings in one row */}
        <div className="d-flex justify-content-between align-items-center  flex-wrap">
          <span className="text-muted small">
            {product.category} - {product.subcategory}
          </span>

          <div className="d-flex align-items-center gap-2">
            <div className="text-black">
              {"★".repeat(Math.round(averageRating)) +
                "☆".repeat(5 - Math.round(averageRating))}
            </div>
            <small className="text-secondary">
              ({reviews?.length || 0} Reviews)
            </small>
          </div>
        </div>

        {/* Title */}
        <h6 className="card-title">{product.name}</h6>

        {/* Price */}
        <div className="d-flex align-items-center ">
          {product.discount > 0 && (
            <span className="text-muted text-decoration-line-through me-2">
              ₹{product.price.toFixed(2)}
            </span>
          )}
          <span className="fw-bold fs-6">₹{discountedPrice.toFixed(2)}</span>
          {product.discount > 0 && (
            <span className="text-danger fw-semibold ms-2">
              ({product.discount}% Off)
            </span>
          )}
        </div>

        {/* Optional Button */}
        {/* <button className="btn btn-primary mt-2">Add to Cart</button> */}
      </div>
    </div>
  );
};

export default ProductCard;
