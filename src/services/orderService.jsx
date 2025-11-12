import axios from "axios";

const API_BASE_URL = "http://localhost:8085/orders"; // ✅ your Spring Boot URL

// ✅ Place a new order
// export const placeOrder = async (userId) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/place/${userId}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error placing order:", error);
//     throw error;
//   }
// };
// ✅ Corrected Place Order function
export const placeOrder = async ({ userId, addressId, paymentMethod }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/place/${userId}`, {
      addressId,
      paymentMethod,
    });
    return response.data;
  } catch (error) {
    console.error("Error placing order:", error);
    throw error;
  }
};

// ✅ Get order by ID
export const getOrderById = async (orderId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
};

// ✅ Get all orders
export const getAllOrders = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all orders:", error);
    throw error;
  }
};

// ✅ Get orders by user
export const getOrdersByUser = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders for user:", error);
    throw error;
  }
};

// ✅ Update order
export const updateOrder = async (orderId, updatedOrder) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${orderId}`, updatedOrder);
    return response.data;
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
};

// ✅ Delete order
export const deleteOrder = async (orderId) => {
  try {
    await axios.delete(`${API_BASE_URL}/${orderId}`);
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
};

// ✅ Get product by ID
export const getProductById = async (productId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/product/${productId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};
