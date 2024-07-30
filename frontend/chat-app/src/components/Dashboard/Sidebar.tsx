import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaUsers, FaEnvelope } from "react-icons/fa";
import "../../styles/Sidebar.scss";
import axios from 'axios';

// Define a type for user
interface User {
  id: number;
  username: string;
  profilePicture: string | null;
}

const Sidebar: React.FC = () => {
  const [isGroupsOpen, setIsGroupsOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  
  const toggleGroups = () => {
    setIsGroupsOpen(!isGroupsOpen);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  // Fetch top 10 users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/topTen');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  // Function to get random profile picture URL

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>QLU Recruiting</h2>
      </div>
      <div className="sidebar-links">
        <ul>
          <li>
            <Link to="/dashboard/groups">
              <FaUsers />
              Groups
            </Link>
          </li>
          <li>
            <Link to="/dashboard/direct-messages">
              <FaEnvelope />
              Direct Messages
            </Link>
          </li>
        </ul>
      </div>
      <div className="sidebar-dropdowns">
        <ul>
          <li>
            <button onClick={toggleGroups} className="dropdown-btn">
              Groups
              <RiArrowDropDownLine />
            </button>
            {isGroupsOpen && (
              <ul className="dropdown-content">
                <li>
                  <Link to="/group/log-rocket-updates">Log Rocket Updates</Link>
                </li>
                <li>
                  <Link to="/group/random">Random</Link>
                </li>
                <li>
                  <Link to="/group/general">General</Link>
                </li>
                <li>
                  <Link to="/group/hr">HR</Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <button onClick={toggleChat} className="dropdown-btn">
              Direct Messages
              <RiArrowDropDownLine />
            </button>
            {isChatOpen && (
              <ul className="dropdown-content">
                {users.map(user => (
                  <li key={user.id}>
                    <Link to={`/dm/${user.id}`}>
                      <img
                        src={user.profilePicture ? user.profilePicture : '/default-profile.png'}
                        alt={user.username}
                        className="user-profile-picture"
                      />
                      <span>{user.username}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
