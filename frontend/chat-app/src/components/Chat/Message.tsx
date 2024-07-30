import React from 'react';

// Define Message type inline
interface IMessage {
  id: number;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface MessageProps {
  message: IMessage;
  currentUserId: string;
}

const Message: React.FC<MessageProps> = ({ message, currentUserId }) => {
  const isSentByCurrentUser = message.senderId === currentUserId;

  return (
    <div className={`message ${isSentByCurrentUser ? 'sent' : 'received'}`}>
      <div className="message-content">
        <p>{message.content}</p>
      </div>
      <div className="message-time">
        <span>{new Date(message.createdAt).toLocaleTimeString()}</span>
      </div>
    </div>
  );
};

export default Message;
