import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaStar, FaUserCircle } from "react-icons/fa";
import { fetchReviews } from "../../store/reviewStore"; // Redux thunk
import "./ReviewList.css";

const ReviewList = ({ productId }) => {
  const dispatch = useDispatch();
  const { items: reviews, loading, error } = useSelector((state) => state.reviews);

  const [expanded, setExpanded] = useState({}); // track expanded comments

  // Fetch all reviews (will filter later)
  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  const toggleReadMore = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter reviews for the given productId
  const filteredReviews = reviews.filter((rev) => rev.productId === productId);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;
  if (!filteredReviews || filteredReviews.length === 0)
    return <p>No reviews yet. Be the first to review!</p>;

  return (
    <div className="row">
      {filteredReviews.map((rev) => {
        const isExpanded = expanded[rev.id];
        const comment = rev.comment || "";
        const shortComment = comment.length > 150 ? comment.slice(0, 150) + "..." : comment;

        return (
          <div key={rev.id} className="col-md-4 mb-3">
            <div className="review-card p-3 rounded bg-white h-100">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div className="d-flex align-items-center">
                  <FaUserCircle size={30} className="me-2 text-secondary" />
                  <strong>{rev.username }</strong>
                </div>
                <small className="text-muted">{timeAgo(rev.createdAt)}</small>
              </div>
              <div className="mb-2">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    size={18}
                    color={i < rev.rating ? "black" : "#e4e5e9"}
                    className="me-1"
                  />
                ))}
              </div>
               <strong>{rev.title }</strong>
              <p className="mb-1 review-comment">
                {isExpanded ? comment : shortComment}
                {comment.length > 150 && (
                  <span
                    className="read-more text-primary ms-1"
                    onClick={() => toggleReadMore(rev.id)}
                    style={{ cursor: "pointer" }}
                  >
                    {isExpanded ? "Read less" : "Read more"}
                  </span>
                )}
              </p>
            </div>
          </div>
          
        );
      })}
    </div>
  );
};

// Helper to format "time ago"
const timeAgo = (date) => {
  const diff = Math.floor((new Date() - new Date(date)) / (1000 * 60 * 60 * 24));
  if (diff === 0) return "Today";
  if (diff === 1) return "1 day ago";
  if (diff < 30) return `${diff} days ago`;
  const months = Math.floor(diff / 30);
  if (months === 1) return "1 month ago";
  return `${months} months ago`;
};

export default ReviewList;
