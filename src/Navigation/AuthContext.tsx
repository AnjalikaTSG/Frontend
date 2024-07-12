import React, { createContext, useState, useContext } from 'react';

// Create a context
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  // Example function to log in a user and set their data
  const loginUser = (userData) => {
    // Ensure userData contains JobPosterID
    setUser(userData);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loginUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
