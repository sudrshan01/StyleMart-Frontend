import axios from "axios";

const API_BASE_URL = "http://localhost:8081";

// Fetch all products
export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
export const getProductsPaginated = async (page = 0, size = 5) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/admin`, {
      params: { page, size },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching products page ${page}:`, error);
    throw error;
  }
};

// Fetch a single product by ID
export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
};

// Add a new product
export const createProduct = async (product) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/products`, product);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};
export const updateProduct = async (id, formData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/products/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error.response || error);
    throw error;
  }
};

// Delete a product
export const deleteProduct = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/products/${id}`);
  } catch (error) {
    console.error(`Error deleting product ${id}:`, error);
    throw error;
  }
};
export const getProductWithoutReviewById = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/${id}/product`);
    return response.data; // this is the Product object
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error;
  }
};