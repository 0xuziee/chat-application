import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import "../../styles/EditProfileModal.scss";
Modal.setAppElement("#root");

interface EditProfileModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  user: {
    displayName: string;
    username: string;
    id: string;
    profilePicture: string;
    email: string;
  };
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onRequestClose,
  user,
}) => {
  const [displayName, setDisplayName] = useState(user.displayName);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  const handleSave = async () => {
    try {
      await axios.put('http://localhost:5000/api/user/profile', {
        id: user.id,
        displayName,
        username,
        email
      });
      onRequestClose();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Profile"
      className="edit-profile-modal"
      overlayClassName="edit-profile-modal-overlay"
    >
      <div className="edit-profile-modal-content">
        <button className="close-button" onClick={onRequestClose}>
          X
        </button>
        <h2>Edit Profile</h2>
        <div className="form-group">
          <label>Display Name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button className="save-button" onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </Modal>
  );
};

export default EditProfileModal;
