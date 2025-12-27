import React, { createContext, useState, useContext, useEffect } from 'react';
import * as authService from '../services/authService';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing user on app start
  useEffect(() => {
    const checkAuth = async () => {
      const savedToken = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');
      
      if (savedToken && savedUser) {
        try {
          // Verify token is still valid by fetching current user
          const response = await authService.getCurrentUser();
          if (response.success && response.user) {
            setUser(response.user);
            localStorage.setItem('user', JSON.stringify(response.user));
          } else {
            // Token invalid, clear storage
            authService.logout();
          }
        } catch (error) {
          // Token invalid or expired, clear storage
          console.error('Auth check failed:', error);
          authService.logout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Login function - connects to real backend
  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      
      if (response.success && response.token && response.user) {
        // Store token and user
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        setUser(response.user);
        
        return { 
          success: true, 
          user: response.user,
          message: response.message || 'Login successful' 
        };
      } else {
        return { 
          success: false, 
          error: response.error || 'Login failed' 
        };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.error || error.message || 'Login failed' 
      };
    }
  };

  // Register function - connects to real backend
  const register = async (userData) => {
    try {
      const response = await authService.register(userData);
      
      if (response.success && response.token && response.user) {
        // Store token and user
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        setUser(response.user);
        
        return { 
          success: true, 
          user: response.user,
          message: 'Registration successful' 
        };
      } else {
        return { 
          success: false, 
          error: response.error || 'Registration failed' 
        };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.error || error.message || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    authService.logout();
    localStorage.removeItem('cart'); // Clear cart on logout
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}