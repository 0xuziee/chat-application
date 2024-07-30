import { useState, useEffect } from 'react';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const signIn = (token: string) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const signOut = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    signIn,
    signOut,
  };
};

export { useAuth };
