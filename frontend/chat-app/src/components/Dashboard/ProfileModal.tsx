import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import "../../styles/ProfileModal.scss";
import "../../styles/EditProfileModal.scss";

Modal.setAppElement("#root");

interface ProfileModalProps {
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

const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onRequestClose,
  user,
}) => {
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [formValues, setFormValues] = useState({
    displayName: user.displayName,
    username: user.username,
    email: user.email,
  });
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await axios.put('http://localhost:5000/api/user/profile', formValues, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      // Handle successful response
      console.log('Profile updated successfully:', response.data);
      setEditModalIsOpen(false);
      onRequestClose();
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="User Profile"
        className="profile-modal"
        overlayClassName="profile-modal-overlay"
      >
        <div className="profile-modal-content">
          <button className="close-button" onClick={onRequestClose}>
            X
          </button>
          <div className="profile-header">
            <img
              src={user.profilePicture || "/default-profile.png"}
              alt="Profile"
              className="profile-pic"
            />
            <button className="edit-button" onClick={() => setEditModalIsOpen(true)}>Edit</button>
            <h2>{user.displayName}</h2>
            <p>@{user.username}</p>
          </div>
          <div className="profile-info">
            <h3>Email Address</h3>
            <p>{user.email}</p>
          </div>
        </div>
      </Modal>

      {editModalIsOpen && (
        <EditProfileModal
          isOpen={editModalIsOpen}
          onRequestClose={() => setEditModalIsOpen(false)}
          formValues={formValues}
          handleInputChange={handleInputChange}
          handleSave={handleSave}
          error={error}
        />
      )}
    </>
  );
};

interface EditProfileModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  formValues: {
    displayName: string;
    username: string;
    email: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSave: () => void;
  error: string | null;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onRequestClose,
  formValues,
  handleInputChange,
  handleSave,
  error
}) => {
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
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="displayName">Display Name</label>
          <input
            id="displayName"
            name="displayName"
            type="text"
            value={formValues.displayName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            value={formValues.username}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formValues.email}
            onChange={handleInputChange}
          />
        </div>
        <button className="save-button" onClick={handleSave}>Save</button>
      </div>
    </Modal>
  );
};

export default ProfileModal;
