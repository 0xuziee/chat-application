import React from 'react';
import '../styles/NotificationPage.scss';

const dummyNotifications = [
  {
    id: 1,
    text: "Your profile has been updated successfully.",
    timestamp: "2024-07-29T12:00:00Z",
  },
  {
    id: 2,
    text: "New message from John Doe.",
    timestamp: "2024-07-28T09:30:00Z",
  },
  {
    id: 3,
    text: "Your password was changed successfully.",
    timestamp: "2024-07-27T15:45:00Z",
  },
  {
    id: 4,
    text: "System update scheduled for tonight.",
    timestamp: "2024-07-26T20:00:00Z",
  },
];

const NotificationsPage: React.FC = () => {
  const user = {
    username: "Usman",
  };

  return (
    <div className="notifications-page">
      <header className="notifications-header">
        <h1>Notifications</h1>
        <p>Notifications for {user.username}</p>
      </header>
      <div className="notifications-list">
        {dummyNotifications.map((notification) => (
          <div key={notification.id} className="notification-item">
            <p>{notification.text}</p>
            <span className="notification-timestamp">
              {new Date(notification.timestamp).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
