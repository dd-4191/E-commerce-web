import React, { useState } from "react";
import "./Profile.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "../../components/modal/Modal"; // Import the Modal

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // Track modal visibility

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  const handleEdit = () => {
    toast.info("Edit profile feature coming soon!");
  };

  const handleModalClose = () => {
    setShowModal(false); // Close the modal
  };

  const handleConfirmLogout = () => {
    setShowModal(false); // Close the modal
    handleLogout(); // Log the user out
  };

  if (!user) {
    return (
      <div className="profile-container">
        Please log in to view your profile.
      </div>
    );
  }

  return (
    <div className="profile-container">
      <img src={user.avatar_url} alt="Profile" className="profile-avatar" />
      <h2>{user.display_name}</h2>
      <div className="profile-info">
        <p>
          <strong>First Name:</strong> {user.first_name}
        </p>
        <p>
          <strong>Last Name:</strong> {user.last_name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>

      <div className="profile-actions">
        <button className="edit-btn" onClick={handleEdit}>
          Edit Profile
        </button>
        <button className="logout-btn" onClick={() => setShowModal(true)}>
          Logout
        </button>
      </div>

      {/* Confirmation Modal */}
      <Modal
        show={showModal}
        onConfirm={handleConfirmLogout}
        onCancel={handleModalClose}
      />
    </div>
  );
};

export default Profile;
