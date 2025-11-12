import axios from "axios";

const API_URL = "http://localhost:8083/addresses"; // your backend URL

export const getAllAddress = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
// Create a new address
export const createAddress = async (address) => {
  const response = await axios.post(API_URL, address);
  return response.data;
};

// Get all addresses for a specific user
export const getAddressesByUser = async (userId) => {
  const response = await axios.get(`${API_URL}/user/${userId}`);
  return response.data;
};

// Get address by ID
export const getAddressById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Update address
export const updateAddress = async (id, address) => {
  const response = await axios.put(`${API_URL}/${id}`, address);
  return response.data;
};

// Delete address
export const deleteAddress = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
