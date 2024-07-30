import React, { useEffect, useState } from 'react';
import axios from 'axios';
import socket from '../../utils/socket'; // Ensure the correct path

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
}

const fetchMessages = async (userId: string, otherUserId: string) => {
  try {
    const response = await axios.get('http://localhost:5000/api/direct-messages', {
      params: { userId, otherUserId }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error;
  }
};

const sendMessage = async (userId: string, otherUserId: string, content: string) => {
  try {
    await axios.post('http://localhost:5000/api/send', {
      senderId: userId,
      receiverId: otherUserId,
      content,
      messageType: 'text',
    });
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

const ChatWindow: React.FC<{ userId: string; otherUserId: string }> = ({ userId, otherUserId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const messages = await fetchMessages(userId, otherUserId);
        setMessages(messages);
      } catch (error) {
        setError('Failed to fetch messages');
      } finally {
        setLoading(false);
      }
    };

    getMessages();

    socket.on('message', (message: Message) => {
      if (
        (message.senderId === otherUserId && message.receiverId === userId) ||
        (message.senderId === userId && message.receiverId === otherUserId)
      ) {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    return () => {
      socket.off('message');
    };
  }, [userId, otherUserId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      await sendMessage(userId, otherUserId, newMessage);
      setNewMessage('');
      socket.emit('sendMessage', {
        senderId: userId,
        receiverId: otherUserId,
        content: newMessage,
        messageType: 'text',
      });
    } catch (error) {
      setError('Failed to send message');
    }
  };

  return (
    <div className="chat-window">
      {loading && <div>Loading messages...</div>}
      {error && <div className="error">{error}</div>}
      <div className="message-list">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.senderId === userId ? 'sent' : 'received'}`}
          >
            <div className="message-content">{message.content}</div>
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
