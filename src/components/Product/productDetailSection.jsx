import React from "react";
import { Navigate,useNavigate  } from "react-router-dom";

const ProductDetailSection = ({
  product,
  gallery,
  mainImage,
  setMainImage,
  rating,
  discountedPrice,
  discountPercent,
  selectedSize,
  setSelectedSize,
  selectedColor,
  setSelectedColor,
  quantity,
  handleDecrease,
  handleIncrease,
  handleAddToCart,
  reviewCount
}) => {
   const navigate = useNavigate(); // ✅ useNavigate hook

  const handleCartClick = () => {
    handleAddToCart();        // first add item to cart
    navigate("/");  // then open or redirect to cart drawer route
    window.location.reload(); 
  };
  return (
    <div className="container product-detail-card d-flex flex-column flex-lg-row gap-4  ">
      {/* Left column: Images */}
      <div className="image-section d-flex gap-2">
        {/* Thumbnails */}
        <div className="thumbnail-column d-flex flex-column gap-2">
          {gallery.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`thumb-${index}`}
              className={`thumbnail-image ${mainImage === img ? "active" : ""}`}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>

        {/* Main image */}
        <div className="main-image-wrapper  ">
          <img
            src={mainImage || gallery[0] || "/images/tshirt.jpeg"}
            alt={product.name}
            className="main-product-image"
          />
        </div>
      </div>

      {/* Right column: Details */}
      <div className="details-section">
        <h2 className="fw-bold">{product.name || "Unnamed Product"}</h2>
        <p className="text-muted">{product.subcategory}</p>
        <p className="text-muted">{product.occasion}</p>

        {/* Rating */}
        <p className="rating">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i}>{i < Math.round(rating) ? "★" : "☆"}</span>
          ))}{" "}
          <span className="rating-num">
            {rating.toFixed(1)} / 5 ({reviewCount} reviews)
          </span>
        </p>

        {/* Price */}
        <div className="price-section my-3 d-flex align-items-center gap-2">
          {discountPercent > 0 ? (
            <>
              <span
                className="price-original text-muted"
                style={{ textDecoration: "line-through", fontSize: "1.2rem" }}
              >
                ₹{product.price.toFixed(2)}
              </span>
              <span
                className="price-discounted fw-bold"
                style={{ fontSize: "1.5rem" }}
              >
                ₹{discountedPrice.toFixed(2)}
              </span>
              <span
                className="discount-percent text-danger"
                style={{ fontSize: "1rem" }}
              >
                <b>({discountPercent}% OFF)</b>
              </span>
            </>
          ) : (
            <span className="price fw-bold" style={{ fontSize: "1.5rem" }}>
              ₹{product.price?.toFixed(2) || 0}
            </span>
          )}
        </div>

        {/* Sizes */}
        <p><b>Size:</b></p>
        <div className="d-flex gap-2 mb-3">
          {product.sizes?.map((size, index) => (
            <button
              key={index}
              className={`btn btn-sm ${selectedSize === size ? "btn-dark" : "btn-outline-dark"}`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Colors */}
        {product.colors?.length > 0 && (
          <>
            <p><b>Color:</b></p>
            <div className="d-flex gap-2 mb-3">
              {product.colors.map((color, index) => (
                <button
                  key={index}
                  className={`color-btn ${selectedColor === color ? "active" : ""}`}
                  style={{
                    backgroundColor: color.toLowerCase() === "white" ? "#f8f8f8" : color,
                    border: "1px solid #ccc",
                  }}
                  onClick={() => setSelectedColor(color)}
                  title={color}
                ></button>
              ))}
            </div>
          </>
        )}

        {/* Quantity */}
        <div className="quantity-wrapper my-3">
          <label className="quantity-label">Quantity</label>
          <div className="quantity-selector">
            <button onClick={handleDecrease}>−</button>
            <input type="number" value={quantity} readOnly />
            <button onClick={handleIncrease}>+</button>
          </div>
        </div>

        {/* Add to Cart */}
        <button className="btn btn-dark btn-lg mt-2" onClick={handleCartClick} > 
          
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetailSection;
