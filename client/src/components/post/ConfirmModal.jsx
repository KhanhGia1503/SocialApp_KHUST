import React from "react";
import "./ConfirmModal.css";

const ConfirmModal = ({ show, onClose, onConfirm }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Are you sure you want to delete this post?</h3>
        <div className="modal-actions">
          <button className="modal-button" onClick={onConfirm}>Yes</button>
          <button className="modal-button" onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
