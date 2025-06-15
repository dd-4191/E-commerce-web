import React from "react";
import "./Cart.css";
import { useCart } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import CartCountToggle from "../CartCountToggle/CartCountToggle";

const Cart = () => {
  const { cart, dispatch } = useCart();
  const navigat = useNavigate();

  const handleRemove = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  return (
    <div className="wrapper">
      <div className="cart-page-container">
        {cart.length === 0 ? (
          <div className="cart-empty">
            <h3>Your Cart Is Empty...</h3>
            <button onClick={() => navigat("/")}>Back to Home</button>
          </div>
        ) : (
          <div className="cart-container">
            <h4>Your Cart</h4>

            {cart.map((item, index) => {
              const originalPrice = Number(item.price);
              const discount = Number(item.discountPercentage) || 0;
              const quantity = Number(item.quantity) || 1;
              const discountedPrice = +(
                originalPrice -
                (originalPrice * discount) / 100
              ).toFixed(2);
              const subTotal = +(discountedPrice * quantity).toFixed(2);

              return (
                <div className="cart-item" key={item.id || index}>
                  <Link to={`/products/${item.id}`}>
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="cart-item-img"
                    />
                  </Link>
                  <div className="cart-item-details">
                    <h4>{item.title}</h4>
                    <p>
                      <span className="cut-price">₹{originalPrice}</span>{" "}
                      <span className="discounted-price">
                        ₹{discountedPrice}
                      </span>
                    </p>
                    <p>Discount: {discount}%</p>
                    <p>Subtotal: ₹{subTotal}</p>
                  </div>
                  <div>
                    <CartCountToggle item={item} />
                    <button
                      className="remove-btn"
                      onClick={() => handleRemove(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Total Section */}
            <div className="cart-total">
              <p>
                Total: ₹
                {cart
                  .reduce((total, item) => {
                    const price = Number(item.price);
                    const discount = Number(item.discountPercentage) || 0;
                    const quantity = Number(item.quantity) || 1;
                    const discountedPrice = +(price - (price * discount) / 100);
                    return total + discountedPrice * quantity;
                  }, 0)
                  .toFixed(2)}
              </p>

              <div className="cart-buttons">
                <button
                  className="back-button"
                  onClick={() => navigat("/products")}
                >
                  Back to Shopping
                </button>

                <button
                  className="buy-now-button"
                  onClick={() => navigat("/checkout")} // Change route as per your app
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
