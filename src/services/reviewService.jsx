// src/services/reviewService.js
import axios from "axios";

const API_BASE_URL = "http://localhost:8082/reviews"; // replace with your Review service URL/port

// Get all reviews
export const getAllReviews = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};
export const getReviewsPage = async (page = 0, size = 5) => {
  const response = await axios.get(`${API_BASE_URL}/page?page=${page}&size=${size}`);
  return response.data; // expects { content, totalPages, number, size, ... }
};

// Get reviews by product
export const getReviewsByProduct = async (productId) => {
  const response = await axios.get(`${API_BASE_URL}/product/${productId}`);
  return response.data;
};

// Get reviews by user
export const getReviewsByUser = async (userId) => {
  const response = await axios.get(`${API_BASE_URL}/user/${userId}`);
  return response.data;
};

// Add a new review
export const addReview = async (review) => {
  const response = await axios.post(API_BASE_URL, review);
  return response.data;
};

// Update a review
export const updateReview = async (id, review) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, review);
  return response.data;
};

// Delete a review
export const deleteReview = async (id) => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};
