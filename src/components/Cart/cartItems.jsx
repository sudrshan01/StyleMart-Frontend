import React from "react";
import { useNavigate } from "react-router-dom";
import { removeCartItem } from "../../services/cartService";
import Checkout from "./checkout.jsx";
import * as bootstrap from "bootstrap"; // ✅ Bootstrap JS import
import "bootstrap/dist/css/bootstrap.min.css"; // ✅ Bootstrap CSS import

const CartItems = ({ cart, loading, productDetails, userId, onCartUpdate }) => {
  const navigate = useNavigate();

  // ✅ Merge cart items with product details
  const mergedItems =
    cart?.items?.map((item) => {
      const productObj = productDetails.find(
        (p) => p.product?.id === item.productId
      );
      const product = productObj?.product;
      return { ...item, product };
    }) || [];

  // ✅ Calculate total price (with discount if available)
  const totalPrice = mergedItems.reduce((sum, item) => {
    if (!item.product) return sum;
    const discount = item.product.discount || 0;
    const discountedPrice =
      item.product.price - (item.product.price * discount) / 100;
    return sum + discountedPrice * item.quantity;
  }, 0);

  // ✅ Handle remove item
  const handleRemove = async (itemId) => {
    try {
      await removeCartItem(userId, itemId);
      if (onCartUpdate) onCartUpdate(); // refresh cart dynamically
    } catch (err) {
      console.error("Error removing item:", err);
    }
  };

  // ✅ Handle Checkout button click safely
  const handleCheckout = () => {
    // Close cart drawer (offcanvas)
    const offcanvasEl = document.getElementById("cartDrawer");
    const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasEl);
    offcanvasInstance?.hide();

    // Then open checkout modal
    const modalEl = document.getElementById("checkoutModal");
    const modalInstance = new bootstrap.Modal(modalEl);
    modalInstance.show();
  };

  return (
    <>
      {/* 🛒 CART DRAWER */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="cartDrawer"
        aria-labelledby="cartDrawerLabel"
        style={{ width: "400px", height: "100vh" }}
      >
        <div className="offcanvas-header">
          <h5 id="cartDrawerLabel">Your Cart</h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        <div className="offcanvas-body">
          {loading ? (
            <p>Loading cart...</p>
          ) : mergedItems.length > 0 ? (
            <ul className="list-group mb-3">
              {mergedItems.map((item) => {
                const product = item.product;
                if (!product) return null;

                const discount = product.discount || 0;
                const discountedPrice =
                  product.price - (product.price * discount) / 100;

                return (
                  <li key={item.id} className="list-group-item d-flex flex-column">
                    <div className="d-flex">
                      <img
                        src={product.mainImage}
                        alt={product.name}
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "fill",
                          marginRight: "10px",
                          cursor: "pointer",
                        }}
                        onClick={() => navigate(`/product/${product.id}`)}
                      />
                      <div>
                        <h6
                          style={{ cursor: "pointer" }}
                          onClick={() => navigate(`/product/${product.id}`)}
                        >
                          {product.name}
                        </h6>
                        <p className="mb-1 text-muted">
                          Size: {item.size}, {item.color}
                        </p>
                        <div className="d-flex align-items-center mb-1">
                          {discount > 0 && (
                            <span className="text-success fw-bold me-2">
                              {discount}% off
                            </span>
                          )}
                          {discount > 0 && (
                            <span className="text-muted text-decoration-line-through me-2">
                              ₹{product.price}
                            </span>
                          )}
                          <span className="fw-bold">₹{discountedPrice}</span>
                        </div>
                        <div className="d-flex align-items-center">
                          <label className="me-2">Qty: {item.quantity}</label>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between mt-2">
                      <button className="btn btn-outline-secondary btn-sm">
                        Save for later
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleRemove(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p>Your cart is empty.</p>
          )}

          {/* ✅ Total + Checkout */}
          {mergedItems.length > 0 && (
            <div className="d-flex justify-content-between align-items-center mt-3">
              <h6 className="mb-0">Total: ₹{totalPrice}</h6>
              <button className="btn btn-dark" onClick={handleCheckout}>
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ✅ CHECKOUT MODAL */}
      <div
        className="modal fade"
  id="checkoutModal"
  tabIndex="-1"
  aria-labelledby="checkoutModalLabel"
  aria-hidden="true"
  data-bs-backdrop="false" 
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content p-3">
            <div className="modal-header">
              <h5 className="modal-title" id="checkoutModalLabel">
                Checkout
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <Checkout totalPrice={totalPrice} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItems;
