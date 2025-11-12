import React, { useEffect, useState } from "react";
import {
  getAllOrders,
  deleteOrder,
  updateOrder,
} from "../../services/orderService";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddresses } from "../../store/addressSlice";
import "bootstrap/dist/css/bootstrap.min.css";

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [error, setError] = useState(null);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [updatedStatus, setUpdatedStatus] = useState("");
  const [updatedDeliveryDate, setUpdatedDeliveryDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");

  const dispatch = useDispatch();
  const { addresses, loading: loadingAddresses } = useSelector(
    (state) => state.address
  );

  // ✅ Fetch orders & addresses
  useEffect(() => {
    fetchOrders();
    dispatch(fetchAddresses());
  }, [dispatch]);

  const fetchOrders = async () => {
    try {
      const data = await getAllOrders();
      console.log("Fetched Orders:", data);
      setOrders(data);
      setFilteredOrders(data);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load orders.");
    } finally {
      setLoadingOrders(false);
    }
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    setFilteredOrders(
      status === "ALL" ? orders : orders.filter((o) => o.status === status)
    );
  };

  const handleDelete = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await deleteOrder(orderId);
        alert("Order deleted successfully!");
        fetchOrders();
      } catch (err) {
        console.error("Error deleting order:", err);
        alert("Failed to delete order!");
      }
    }
  };

  const handleEdit = (order) => {
    setEditingOrderId(order.id);
    setUpdatedStatus(order.status);
    setUpdatedDeliveryDate(
      order.deliveryDate
        ? new Date(order.deliveryDate).toISOString().slice(0, 10)
        : ""
    );
  };

  const handleCancelEdit = () => {
    setEditingOrderId(null);
    setUpdatedStatus("");
    setUpdatedDeliveryDate("");
  };

  const handleUpdate = async (orderId) => {
    try {
      const existingOrder = orders.find((o) => o.id === orderId);
      const updatedOrder = {
        ...existingOrder,
        status: updatedStatus,
        deliveryDate: updatedDeliveryDate
          ? new Date(updatedDeliveryDate).toISOString()
          : null,
      };

      await updateOrder(orderId, updatedOrder);
      alert("Order updated successfully!");
      setEditingOrderId(null);
      fetchOrders();
    } catch (err) {
      console.error("Error updating order:", err);
      alert("Failed to update order!");
    }
  };

  if (loadingOrders || loadingAddresses)
    return <p className="text-center mt-4">Loading data...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  // ✅ Match address by both userId and addressId
  const getAddressDetails = (userId, addressId) => {
    const address = addresses.find(
      (a) => Number(a.id) === Number(addressId) && Number(a.userId) === Number(userId)
    );
    if (!address) return "Address not found";
    return `${address.houseNo || ""}, ${address.street || ""}, ${
                          address.landmark || ""
                        }, ${address.city || ""}, ${address.state || ""}, ${
                          address.postalCode || ""
                        }, ${address.country || ""}
`;
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>All Orders</h4>
        <div className="d-flex align-items-center">
          <label className="me-2 fw-bold">Filter by Status:</label>
          <select
            className="form-select form-select-sm"
            value={filterStatus}
            onChange={(e) => handleFilterChange(e.target.value)}
            style={{ width: "200px" }}
          >
            <option value="ALL">All</option>
            <option value="CREATED">Created</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="SHIPPED">Shipped</option>
            <option value="DELIVERED">Delivered</option>
            <option value="FAILED">Failed</option>
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th>Order ID</th>
              <th>User ID</th>
              <th>Status</th>
              <th>Total Price</th>
              <th>Order Date</th>
              <th>Delivery Date</th>
              <th>Address</th>
              <th>Payment Method</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.userId}</td>

                  {/* ✅ Editable Status */}
                  <td>
                    {editingOrderId === order.id ? (
                      <select
                        value={updatedStatus}
                        onChange={(e) => setUpdatedStatus(e.target.value)}
                        className="form-select form-select-sm"
                        style={{ width: "160px" }}
                      >
                        <option value="CREATED">CREATED</option>
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="CANCELLED">CANCELLED</option>
                        <option value="SHIPPED">SHIPPED</option>
                        <option value="DELIVERED">DELIVERED</option>
                        <option value="FAILED">FAILED</option>
                      </select>
                    ) : (
                      <span
                        className={`badge ${
                          order.status === "DELIVERED"
                            ? "bg-success"
                            : order.status === "CANCELLED"
                            ? "bg-danger"
                            : order.status === "SHIPPED"
                            ? "bg-primary"
                            : "bg-secondary"
                        }`}
                      >
                        {order.status}
                      </span>
                    )}
                  </td>

                  <td>₹{order.totalAmount?.toFixed(2)}</td>

                  <td>
                    {order.createdAt
                      ? new Date(order.createdAt).toISOString().slice(0, 10)
                      : "-"}
                  </td>

                  {/* ✅ Editable Delivery Date */}
                  <td>
                    {editingOrderId === order.id ? (
                      <input
                        type="date"
                        value={updatedDeliveryDate}
                        onChange={(e) => setUpdatedDeliveryDate(e.target.value)}
                        className="form-control form-control-sm"
                        style={{ width: "160px" }}
                      />
                    ) : order.deliveryDate ? (
                      new Date(order.deliveryDate).toISOString().slice(0, 10)
                    ) : (
                      "-"
                    )}
                  </td>

                  {/* ✅ Address (match by userId + addressId) */}
                  <td>{getAddressDetails(order.userId, order.addressId)}</td>

                  <td>{order.paymentMethod || "-"}</td>

                  <td>
                    {editingOrderId === order.id ? (
                      <>
                        <button
                          className="btn btn-sm btn-success me-2"
                          onClick={() => handleUpdate(order.id)}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-sm btn-primary me-2"
                          onClick={() => handleEdit(order)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(order.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center text-muted">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
