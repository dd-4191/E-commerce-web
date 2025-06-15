import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";
import { toast } from "react-toastify";

const Checkout = () => {
  const { cart, dispatch } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
  });

  //  Check for Buy Now item
  const buyNowItem = JSON.parse(localStorage.getItem("buyNowItem"));
  const isBuyNow = !!buyNowItem;

  //  Use either cart or buyNowItem
  const cartItems = isBuyNow ? [buyNowItem] : cart;

  //  Total calculation
  const total = cartItems
    .reduce((acc, item) => {
      const price = Number(item.price);
      const discount = Number(item.discountPercentage) || 0;
      const quantity = Number(item.quantity) || 1;
      const discountedPrice = +(price - (price * discount) / 100);
      return acc + discountedPrice * quantity;
    }, 0)
    .toFixed(2);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    if (!form.name || !form.address || !form.phone) {
      toast.warning("Please fill all fields");
      return;
    }

    toast.success("Order placed successfully!");

    if (isBuyNow) {
      localStorage.removeItem("buyNowItem");
    } else {
      dispatch({ type: "CLEAR_CART" });
    }

    navigate("/success");
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="checkout-content">
        {/* Shipping Form */}
        <div className="checkout-form">
          <h3>Shipping Information</h3>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
          />
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <h3>Order Summary</h3>
          {cartItems.map((item) => {
            const price = Number(item.price);
            const discount = Number(item.discountPercentage) || 0;
            const quantity = Number(item.quantity) || 1;
            const discountedPrice = +(price - (price * discount) / 100).toFixed(
              2
            );
            const subTotal = +(discountedPrice * quantity).toFixed(2);

            return (
              <div key={item.id} className="summary-item">
                <span>{item.title}</span>
                <p>
                  ₹{discountedPrice} × {quantity}
                </p>
                <p>₹{subTotal}</p>
              </div>
            );
          })}
          <hr />
          <h4>Total: ₹{total}</h4>
          <button className="place-order-btn" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
