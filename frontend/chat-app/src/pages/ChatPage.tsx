import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/ChatPage.scss';
import Sidebar from '../components/Dashboard/Sidebar';
import Chat from '../components/Chat/ChatWindow';
import IconSidebar from '../components/Dashboard/IconSidebar';

const ChatPage: React.FC = () => {
  // Use `Record<string, string | undefined>` to satisfy TypeScript's constraints
  const params = useParams<Record<string, string | undefined>>();
  const userIdFromUrl = params.userId;
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    // Get the current user ID from localStorage
    const storedUserId = localStorage.getItem('userId');
    setCurrentUserId(storedUserId);
  }, []);

  if (!userIdFromUrl || !currentUserId) {
    return <div>Error: User ID is required</div>;
  }

  return (
    <div className="dashboard">
      <IconSidebar />
      <Sidebar />
      
      <div className="dashboard-content">
        <Chat userId={currentUserId} otherUserId={userIdFromUrl} />
      </div>
    </div>
  );
};

export default ChatPage;
