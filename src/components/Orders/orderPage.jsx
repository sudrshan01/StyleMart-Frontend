import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getOrdersByUser } from "../../services/orderService";
import { getProductById } from "../../services/productService";
import OrderItem from "./orderItems.jsx";

const OrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const userId = localStorage.getItem("userId");
  const prevOrdersRef = useRef([]); // store previous orders

  const products = useSelector((state) => state.products.items);
  const productsLoading = useSelector((state) => state.products.loading);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(amount);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  useEffect(() => {
    if (!userId) navigate("/login");
  }, [userId, navigate]);

  const fetchOrders = async () => {
    try {
      const data = await getOrdersByUser(userId);

      // ✅ Compare status with previous data to show notification
      prevOrdersRef.current.forEach((oldOrder) => {
        const newOrder = data.find((o) => o.id === oldOrder.id);
        if (newOrder && newOrder.status !== oldOrder.status) {
          toast.info(`Your order #${newOrder.id} is now ${newOrder.status}!`);
        }
      });

      prevOrdersRef.current = data; // store for next check

      // Load product details
      const ordersWithProducts = await Promise.all(
        data.map(async (order) => {
          const itemsWithDetails = await Promise.all(
            (order.items || []).map(async (item) => {
              let product = products.find((p) => Number(p.id) === Number(item.productId));
              if (!product) {
                try {
                  const response = await getProductById(item.productId);
                  product = response.product;
                } catch {
                  product = {};
                }
              }
              return { ...item, product };
            })
          );
          return { ...order, items: itemsWithDetails };
        })
      );

      setOrders(ordersWithProducts);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Unable to load your orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch initially + every 20 seconds
  useEffect(() => {
    if (!userId || productsLoading) return;
    fetchOrders();
    const interval = setInterval(fetchOrders, 20000); // 20 seconds
    return () => clearInterval(interval);
  }, [userId, productsLoading]);

  if (loading) return <p className="text-muted mt-4">Loading your orders...</p>;
  if (error) return <p className="text-danger mt-4">{error}</p>;

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="card mb-4 shadow-sm p-3">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-2 border-bottom pb-2">
              <h5 className="mb-0">Order #{order.id}</h5>
              <span
                className={`badge ${order.status === "Delivered" ? "bg-success" : "bg-info"}`}
              >
                {order.status}
              </span>
            </div>

            {/* ✅ Order Info (2-column layout) */}
            <div className="mb-3 text-muted">
              <div className="row">
                <div className="col-6">
                  <strong>Total:</strong> {formatCurrency(order.totalAmount)}
                </div>
                <div className="col-6">
                  <strong>Payment Method:</strong>{" "}
                  <span className="text-capitalize">
                    {order.paymentMethod || "N/A"}
                  </span>
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-6">
                  <strong>Order Date:</strong> {formatDate(order.createdAt)}
                </div>
                <div className="col-6">
                  <strong>Delivery Date:</strong>{" "}
                  {order.deliveryDate ? formatDate(order.deliveryDate) : "Pending"}
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="d-flex flex-column gap-3">
              {order.items && order.items.length > 0 ? (
                order.items.map((item) => (
                  <OrderItem key={item.id} item={item} formatCurrency={formatCurrency} />
                ))
              ) : (
                <span>No items</span>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrdersPage;
