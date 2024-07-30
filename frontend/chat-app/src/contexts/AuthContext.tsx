// src/contexts/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from '../hooks/useAuth'; // Import your custom hook

interface AuthContextType {
  isAuthenticated: boolean;
  user: any; // Adjust this to your user type
  signIn: (token: string) => void;
  signOut: () => void;
  fetchUserProfile: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuthenticated, signIn, signOut } = useAuth();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserProfile();
    }
  }, [isAuthenticated]);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/user/profile', {
        credentials: 'include', // Include cookies in the request
      });
      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn, signOut, fetchUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
