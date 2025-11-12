import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { addReview } from "../../services/reviewService";

function WriteReview({ productId, userId, onReviewSubmitted }) {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("Please login to submit a review.");
      navigate("/login");
      return;
    }

    if (!title.trim()) return alert("Please enter a title");
    if (!comment.trim()) return alert("Please enter your review");
    if (!rating || rating < 1 || rating > 5)
      return alert("Please give a rating between 1 and 5");

    const review = {
      userId: Number(userId),
      productId: Number(productId),
      title,
      comment,
      rating: Number(rating),
    };

    setLoading(true);
    try {
      await addReview(review);
      setSuccessMessage("Review submitted successfully!");

      // Reset form fields
      setTitle("");
      setComment("");
      setRating(0);
      setHoverRating(0);

      // Notify parent to refresh reviews
      onReviewSubmitted && onReviewSubmitted();

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error(err);
      alert("Failed to submit review. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-4 p-4 border rounded bg-light">
      <h3 className="mb-4">Write a Review</h3>

      {successMessage && <div className="alert alert-success">{successMessage}</div>}

      <form onSubmit={handleSubmit}>
        <div className="row mb-3 align-items-center">
          <div className="col-md-6">
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={150}
              placeholder="Short review title"
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label d-block">Rating</label>
            <div>
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={25}
                  style={{ cursor: "pointer", marginRight: 5 }}
                  color={(hoverRating || rating) >= star ? "#ffc107" : "#e4e5e9"}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Comment</label>
          <textarea
            className="form-control"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            placeholder="Write your review"
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
}

export default WriteReview;
