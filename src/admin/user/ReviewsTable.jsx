import React, { useEffect, useState } from "react";
import { getReviewsPage, deleteReview } from "../../services/reviewService";
import "bootstrap/dist/css/bootstrap.min.css";

const ReviewsTable = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(0);
  const [size] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  const fetchReviews = async (page) => {
    setLoading(true);
    try {
      const data = await getReviewsPage(page, size);
      setReviews(data.content);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch reviews.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews(page);
  }, [page]);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this review?")) {
      try {
        await deleteReview(id);
        fetchReviews(page);
      } catch (err) {
        console.error(err);
        alert("Failed to delete review!");
      }
    }
  };

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="container mt-3">
      <h4 className="mb-3">All Reviews</h4>
      <table className="table table-bordered table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>User</th>
            <th>Product</th>
            <th>Rating</th>
            <th>Comment</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.length ? (
            reviews.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.user?.username || r.userId}</td>
                <td>{r.productId}</td>
                <td>{r.rating}</td>
                <td>{r.comment}</td>
                <td>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(r.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center text-muted">
                No reviews found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setPage(page - 1)}>Previous</button>
            </li>
            {[...Array(totalPages)].map((_, idx) => (
              <li key={idx} className={`page-item ${page === idx ? "active" : ""}`}>
                <button className="page-link" onClick={() => setPage(idx)}>{idx + 1}</button>
              </li>
            ))}
            <li className={`page-item ${page + 1 === totalPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setPage(page + 1)}>Next</button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default ReviewsTable;
