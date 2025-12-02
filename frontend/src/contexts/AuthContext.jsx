import React, { createContext, useState, useContext } from 'react';

// Create and export the context
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

 // In frontend/src/contexts/AuthContext.jsx - Simplify:
const login = async (email, password) => {
  // Mock login - works without backend
  const mockUser = {
    id: 1,
    name: 'Test User',
    email: email,
    role: 'customer'
  };
  
  localStorage.setItem('user', JSON.stringify(mockUser));
  setUser(mockUser);
  return { success: true, user: mockUser };
};
  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Export the hook
export function useAuth() {
  return useContext(AuthContext);
}