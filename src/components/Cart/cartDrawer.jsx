import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCartByUser } from "../../services/cartService"; 
import { getProductById } from "../../services/productService"; 
import CartItems from "./cartItems";

const CartDrawer = () => {
  const userId = localStorage.getItem("userId");
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [productDetails, setProductDetails] = useState([]); 

  useEffect(() => {
    if (!userId) return; // Don't fetch if not logged in

    setLoading(true);

    getCartByUser(userId)
      .then(async (data) => {
        setCart(data);

        if (data?.items && data.items.length > 0) {
          const productIds = data.items.map((item) => item.productId);

          const products = await Promise.all(
            productIds.map((id) => getProductById(id))
          );

          setProductDetails(products);
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching cart:", err);
        setLoading(false);
      });
  }, [userId]);
console.log(cart)
  return (
    <CartItems
      cart={cart}
      loading={loading}
      productDetails={productDetails}
      userId={userId}
      onCartUpdate={() =>
        getCartByUser(userId).then((data) => setCart(data))
      }
    />
  );
};

export default CartDrawer;
