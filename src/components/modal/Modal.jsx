import React from "react";
import "./Modal.css";

const Modal = ({ show, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>Are you sure you want to logout?</p>
        <div className="modal-buttons">
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onConfirm} className="confirm-btn">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
