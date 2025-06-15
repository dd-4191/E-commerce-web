import React from "react";
import { useNavigate } from "react-router-dom";
import "./OrderSuccess.css";

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="order-success-container">
      <h2> Your Order Placed Successfully!</h2>
      <p>
        Thank you for your purchase. We will contact you soon with delivery
        details.
      </p>
      <button className="continue-btn" onClick={() => navigate("/")}>
        Continue Shopping
      </button>
    </div>
  );
};

export default OrderSuccess;
