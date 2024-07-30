import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import DashboardPage from './pages/DashboardPage';
import { useAuth } from './hooks/useAuth';
import ChatPage from './pages/ChatPage';
import NotificationsPage from './pages/NotificationPage';
import DirectMessagesPage from './pages/DirectMessagesPage';

const AppRouter: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" /> : <SignUpPage />} />
        <Route path="/signin" element={isAuthenticated ? <Navigate to="/dashboard" /> : <SignInPage />} />
        <Route path="/dashboard" element={isAuthenticated ? <DashboardPage /> : <Navigate to="/signin" />} />
        <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/signin" />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="dashboard/direct-messages" element={<DirectMessagesPage />} />
        <Route path="/dm/:userId" element={<ChatPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
