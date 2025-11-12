import React from "react";

const OrderItem = ({ item, formatCurrency }) => {
  const product = item.product || {};
  // Use mainImage from product or fallback
  const imageUrl = product.mainImage || "/images/no-image.png";

  return (
    <div
      className="d-flex align-items-center border rounded p-2"
      style={{ gap: "15px" }}
    >
      <img
        src={imageUrl}
        alt={product.name || item.productName || "Product"}
        style={{ width: "70px", height: "70px", objectFit: "fill" }}
        className="rounded"
      />

      <div className="flex-grow-1">
        <div className="d-flex justify-content-between align-items-start">
          <strong>{product.name || item.productName}</strong>
          <div className="text-success">
            {item.discount
              ? formatCurrency(item.price - item.discount)
              : formatCurrency(item.price)}
          </div>
        </div>

        <div className="text-muted">
          Size: {item.size} | Color: {item.color || product.color} | Qty: {item.quantity}
        </div>

        {item.discount && (
          <div className="text-decoration-line-through text-muted">
            {formatCurrency(item.price)}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderItem;
