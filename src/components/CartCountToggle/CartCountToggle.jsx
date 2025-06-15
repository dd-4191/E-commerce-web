import React from "react";
import "./CartCountToggle.css";
import { useCart } from "../../context/CartContext";

const CartCountToggle = ({ item }) => {
  const { dispatch } = useCart();

  if (!item) return null; // 👈 prevent crash if item is not passed

  const handleQuantityChange = (type) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id: item.id, type },
    });
  };

  return (
    <div className="cart-count-toggle">
      <button onClick={() => handleQuantityChange("dec")}>-</button>
      <span>{item.quantity}</span>
      <button onClick={() => handleQuantityChange("inc")}>+</button>
    </div>
  );
};

export default CartCountToggle;
