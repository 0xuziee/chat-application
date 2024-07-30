import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaHome, FaChartLine, FaEnvelope, FaEllipsisH, FaUser } from "react-icons/fa";
import "../../styles/IconSidebar.scss";
import ProfileModal from "./ProfileModal";

const IconSidebar: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [user, setUser] = useState<{
    id: string;
    username: string;
    email: string;
    displayName: string;
    profilePicture: string;
  } | null>(null);

  const navigate = useNavigate();

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      console.log('The Token is ' + token);

      const response = await axios.get('http://localhost:5000/api/user/profile', {
        headers: {
          Authorization: `Bearer ${token}` // Include the token in the Authorization header
        },
        withCredentials: true, // Ensure credentials are included
      });

      setUser(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error fetching user profile:', error.response?.data.message || error.message);
      } else {
        console.error('An unknown error occurred:', error);
      }
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const goToHome = () => {
    navigate('/dashboard');
  };

  const goToActivity = () => {
    navigate('/notifications');
  };

  const goToMessages = () => {
    navigate('/dashboard/direct-messageS');
  };

  const goToMore = () => {
    
  };

  return (
    <>
      <div className="icon-sidebar">
        <div className="icons-top">
          <div className="icon" onClick={goToHome}>
            <img src="/pictures/rectangle.png" alt="rectangle" />
          </div>
          <div className="icon" onClick={goToHome}>
            <FaHome />
            <span>Home</span>
          </div>
          <div className="icon" onClick={goToActivity}>
            <FaChartLine />
            <span>Activity</span>
          </div>
          <div className="icon" onClick={goToMessages}>
            <FaEnvelope />
            <span>Messages</span>
          </div>
          <div className="icon" onClick={goToMore}>
            <FaEllipsisH />
            <span>More</span>
          </div>
        </div>
        <div className="icon-bottom">
          <button className="profile-icon" onClick={openModal}>
            <FaUser />
          </button>
        </div>
      </div>
      {user && (
        <ProfileModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          user={user}
        />
      )}
    </>
  );
};

export default IconSidebar;
