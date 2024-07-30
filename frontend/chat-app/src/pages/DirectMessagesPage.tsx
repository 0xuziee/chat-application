import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUser } from "react-icons/fa";
import "../styles/DirectMessagesPage.scss";
import ConversationWindow from "./ConversationWindow";

const DirectMessagesPage: React.FC = () => {
  const [users, setUsers] = useState<{ id: string; username: string; profilePicture: string }[]>([]);
  const [selectedUser, setSelectedUser] = useState<{ id: string; username: string; profilePicture: string } | null>(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/user/topTen');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserClick = (user: { id: string; username: string; profilePicture: string }) => {
    setSelectedUser(user);
  };

  return (
    <div className="direct-messages-page">
      <div className="users-list">
        {users.map(user => (
          <div key={user.id} className="user-item" onClick={() => handleUserClick(user)}>
            <img src={user.profilePicture || "/default-profile.png"} alt="Profile" className="user-profile-pic" />
            <div className="user-details">
              <p className="user-username">{user.username}</p>
            </div>
          </div>
        ))}
      </div>
      {selectedUser && <ConversationWindow user={selectedUser} />}
    </div>
  );
};

export default DirectMessagesPage;
