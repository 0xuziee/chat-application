import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPaperPlane } from "react-icons/fa";
import "../styles/ConversationWindow.scss";

interface ConversationWindowProps {
  user: { id: string; username: string; profilePicture: string };
}

const ConversationWindow: React.FC<ConversationWindowProps> = ({ user }) => {
  const [messages, setMessages] = useState<{ text: string; senderId: string }[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/messages?userId=${user.id}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [user]);

  const handleSendMessage = async () => {
    try {
      await axios.post('http://localhost:5000/api/messages', {
        text: newMessage,
        recipientId: user.id,
      });
      setNewMessage('');
      fetchMessages(); // Refresh messages after sending
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="conversation-window">
      <header className="chat-header">
        <img src={user.profilePicture || "/default-profile.png"} alt="Profile" className="chat-profile-pic" />
        <h2>{user.username}</h2>
      </header>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.senderId === user.id ? 'received' : 'sent'}`}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={handleSendMessage}>
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default ConversationWindow;
