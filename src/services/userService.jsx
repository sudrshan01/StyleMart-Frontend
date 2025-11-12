import axios from "axios";

const API_URL = "http://localhost:8083/users"; 

// Create a new user
export const createUser = async (user) => {
  const response = await axios.post(API_URL, user);
  return response.data;
};

// Login user
export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

// Get all users
export const getAllUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get user by id 
export const getUserById = async (id) => {
  const response = await axios.get(`${API_URL}/user/${id}`);
  return response.data;
};

// Get user by id (UserResDto)
export const getUserResById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Update user
export const updateUser = async (id, user) => {
  const response = await axios.put(`${API_URL}/${id}`, user);
  return response.data;
};
export const updateUserAdmin = async (id, user) => {
  const response = await axios.put(`${API_URL}/admin/${id}`, user);
  return response.data;
};

// Delete user
export const deleteUser = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
