import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductDetailSection from "./productDetailSection";
import SimilarProducts from "./similarProducts";
import WriteReview from "../Review/writeReview";
import ReviewList from "../Review/reviewList";
import "./ProductDetailCard.css";

function ProductDetailCard({ item, onAddToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = item.product ?? {};
  const rating = item.averageRating ?? 0.0;

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [gallery, setGallery] = useState([]);
  const [refreshReviews, setRefreshReviews] = useState(false); // to refresh ReviewList

  const discountPercent = product.discount || 0;
  const discountedPrice = product.price
    ? product.price - (product.price * discountPercent) / 100
    : 0;

  const userId = localStorage.getItem("userId"); // get logged-in user

  // Rebuild gallery whenever product changes
  useEffect(() => {
    const newGallery = product.mainImage
      ? [product.mainImage, ...(product.galleryImages || [])]
      : product.galleryImages || [];
    setGallery(newGallery);

    // Reset state
    setQuantity(1);
    setSelectedSize(null);
    setSelectedColor(null);
    setMainImage(newGallery[0] || "/images/tshirt.jpeg");
  }, [product]);

  const handleIncrease = () =>
    setQuantity((prev) => Math.min(prev + 1, product.stock || 10));
  const handleDecrease = () => setQuantity((prev) => Math.max(prev - 1, 1));

  const handleAdd = () => {
    if (!userId) {
      alert("Please login to add items to the cart.");
      navigate("/login");
      return;
    }

    if (!selectedSize) return alert("Please select a size!");
    if (product.colors && product.colors.length > 0 && !selectedColor)
      return alert("Please select a color!");

    const cartItem = {
      productId: product.id,
      productName: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
      userId: Number(userId),
    };

    onAddToCart(cartItem);
  };

  // Callback when a new review is submitted
  const handleReviewSubmitted = () => {
    // toggle state to trigger ReviewList refresh
    setRefreshReviews((prev) => !prev);
  };

  return (
    <>
      <button className="btn btn-dark mb-3" onClick={() => navigate(-1)}>
        &larr; Back
      </button>

      <ProductDetailSection
        product={product}
        gallery={gallery}
        mainImage={mainImage}
        setMainImage={setMainImage}
        rating={rating}
        discountedPrice={discountedPrice}
        discountPercent={discountPercent}
        selectedSize={selectedSize}
        setSelectedSize={setSelectedSize}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        quantity={quantity}
        handleDecrease={handleDecrease}
        handleIncrease={handleIncrease}
        handleAddToCart={handleAdd}
        reviewCount={item.reviews?.length || 0}
      />

      <div className="container my-5">
        <h3 className="fw-bold mb-3">Similar Products</h3>
        <SimilarProducts currentProduct={product} />
      </div>

      {/* Pass userId and the callback */}
      <WriteReview
        productId={product.id}
        userId={userId}
        onReviewSubmitted={handleReviewSubmitted}
      />

      <div className="container my-5">
        <h3 className="fw-bold mb-3">Customer Reviews</h3>
        <ReviewList productId={product.id} refresh={refreshReviews} />
      </div>
    </>
  );
}

export default ProductDetailCard;
