import axios from "axios";

const API_URL = "http://localhost:8084/carts"; // adjust backend URL/port

export const addItemToCart = async (userId, item) => {
  // Send payload without 'id' and 'cart'
  const response = await axios.post(`${API_URL}/${userId}/items`, item);
  return response.data;
};
// Get cart by user
export const getCartByUser = async (userId) => {
  const response = await axios.get(`${API_URL}/${userId}`);
  return response.data;
};

// Update quantity
export const updateCartItem = async (userId, itemId, quantity) => {
  const response = await axios.put(
    `${API_URL}/${userId}/items/${itemId}?quantity=${quantity}`
  );
  return response.data;
};

// Remove single item
export const removeCartItem = async (userId, itemId) => {
  const response = await axios.delete(`${API_URL}/${userId}/items/${itemId}`);
  return response.data;
};

// Clear cart
export const clearCart = async (userId) => {
  await axios.delete(`${API_URL}/${userId}/clear`);
};

// Get all carts (admin use maybe)
export const getAllCarts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
