import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addItemToCart } from "../../services/cartService";

function Cart({ cart = [] }) {
  const navigate = useNavigate();

  // ✅ Get userId from localStorage
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      navigate("/login"); // Redirect if not logged in
      return;
    }

    if (cart.length === 0) return;

    const sendCartToBackend = async () => {
      try {
        for (const item of cart) {
          const payload = {
            productId: item.productId,
            productName: item.productName,
            price: item.price,
            size: item.size,
            color: item.color,
            quantity: item.quantity,
          };
          const response = await addItemToCart(userId, payload);
          console.log("Added to backend:", response);
        }
      } catch (err) {
        console.error("Error adding items to backend:", err);
      }
    };

    sendCartToBackend();
  }, [cart, userId, navigate]);

  
}

export default Cart;
