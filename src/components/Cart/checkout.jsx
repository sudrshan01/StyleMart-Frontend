import React, { useState, useEffect } from "react";
import { getAddressesByUser } from "../../services/addressService";
import { placeOrder } from "../../services/orderService";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // ✅ Only CSS, no JS
import * as bootstrap from "bootstrap"; // ✅ Import Bootstrap JS for modal control

const Checkout = ({totalPrice}) => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  // ✅ Fetch user addresses on mount
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        if (!userId) {
          alert("Please log in first!");
          navigate("/login");
          return;
        }

        const data = await getAddressesByUser(userId);
        setAddresses(data);
      } catch (err) {
        console.error("Error fetching addresses:", err);
      }
    };
    fetchAddresses();
  }, [userId, navigate]);

  // ✅ Place order
  const handlePlaceOrder = async () => {
    if (!selectedAddress || !paymentMethod) {
      alert("Please select both an address and a payment method.");
      return;
    }

    try {
      await placeOrder({
        userId,
        addressId: selectedAddress,
        paymentMethod,
      });

      alert("✅ Order placed successfully!");
      navigate("/");
    } catch (err) {
      console.error("Order creation failed:", err);
      alert("❌ Order failed. Please try again.");
    }
  };

  // ✅ Add new address — close modal before navigating
  const handleAddNewAddress = () => {
    // Close the Bootstrap modal (if open)
    const modalEl = document.getElementById("checkoutModal");
    if (modalEl) {
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      modalInstance?.hide(); // ✅ close modal properly
    }

    // Also remove any lingering backdrop manually (extra safety)
    const backdrop = document.querySelector(".modal-backdrop");
    if (backdrop) backdrop.remove();

    // Navigate to Profile page
    navigate("/profile");
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">Checkout</h2>
<h4>Total Amount:  ₹{totalPrice}</h4>
      <div className="row">
        {/* Address Section */}
        <div className="col-md-6">
          <h5>Select Delivery Address</h5>
          {addresses.length > 0 ? (
            addresses.map((addr) => (
              <div
                key={addr.id}
                className={`card mb-2 p-3 ${
                  selectedAddress === addr.id ? "border-dark shadow-sm" : ""
                }`}
                onClick={() => setSelectedAddress(addr.id)}
                style={{ cursor: "pointer" }}
              >
                <p>
                  <b>{addr.fullName}</b>
                </p>
                <p>
                  {addr.street}, {addr.city}, {addr.state} - {addr.pincode}
                </p>
                <p>{addr.phone}</p>
              </div>
            ))
          ) : (
            <p>No saved addresses found.</p>
          )}
          <button
            className="btn btn-outline-dark mt-3"
            onClick={handleAddNewAddress}
          >
            + Add New Address
          </button>
        </div>

        {/* Payment Section */}
        <div className="col-md-6">
          <h5>Select Payment Method</h5>
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="payment"
              id="cod"
              value="COD"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="cod" className="form-check-label">
              Cash on Delivery
            </label>
          </div>

          <div className="form-check mt-2">
            <input
              type="radio"
              className="form-check-input"
              name="payment"
              id="razorpay"
              value="Razorpay"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="razorpay" className="form-check-label">
              Pay with Razorpay
            </label>
          </div>

          <button className="btn btn-dark mt-4" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  )
};

export default Checkout;
