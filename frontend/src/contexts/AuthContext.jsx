import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing user on app start
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const savedUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        // try to load avatar (may be base64 data URL)
        const savedAvatar = localStorage.getItem('avatar');

        if (savedUser && token) {
          const parsedUser = JSON.parse(savedUser);
          // attach token and avatar
          parsedUser.token = token;
          if (savedAvatar) parsedUser.avatar = savedAvatar;
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Clear corrupted data
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Mock login function
  const login = useCallback(async (email, password) => {
    try {
      // Input validation
      if (!email || !password) {
        throw new Error('Email and password are required');
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock validation
      if (password.length < 3) {
        throw new Error('Password must be at least 3 characters');
      }

      // Check if user exists in registered users
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const existingUser = registeredUsers.find(u => u.email === email);
      
      // Mock user data
      const mockUser = {
        id: existingUser?.id || Date.now(),
        name: existingUser?.name || email.split('@')[0] || 'Demo User',
        email: email,
        role: email.includes('admin') ? 'admin' : 'customer',
        token: 'mock-jwt-token-for-demo-' + Date.now()
      };
      
      // Save to localStorage
      const { token, ...userWithoutToken } = mockUser;
      localStorage.setItem('user', JSON.stringify(userWithoutToken));
      localStorage.setItem('token', token);
      setUser(mockUser);
      
      return { 
        success: true, 
        user: mockUser,
        message: 'Login successful' 
      };
    } catch (error) {
      return { 
        success: false, 
        user: null,
        message: error.message || 'Invalid email or password' 
      };
    }
  }, []);

  // Mock register function
  const register = useCallback(async (userData) => {
    try {
      // Input validation
      if (!userData.email || !userData.password || !userData.name) {
        throw new Error('Name, email and password are required');
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Check if user already exists
      const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
      const userExists = registeredUsers.some(u => u.email === userData.email);
      
      if (userExists) {
        throw new Error('User with this email already exists');
      }
      
      // Create new user
      const mockUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone || '',
        role: 'customer',
        createdAt: new Date().toISOString(),
        token: 'mock-jwt-token-for-demo-' + Date.now()
      };
      
      // Save to registered users list
      registeredUsers.push({ 
        id: mockUser.id, 
        email: userData.email, 
        name: userData.name 
      });
      localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
      
      // Save current session
      const { token, ...userWithoutToken } = mockUser;
      localStorage.setItem('user', JSON.stringify(userWithoutToken));
      localStorage.setItem('token', token);
      setUser(mockUser);
      
      return { 
        success: true, 
        user: mockUser,
        message: 'Registration successful' 
      };
    } catch (error) {
      return { 
        success: false, 
        user: null,
        message: error.message || 'Registration failed' 
      };
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  }, []);

  // Update avatar (accepts a File or a data URL string)
  const updateAvatar = useCallback(async (fileOrDataUrl) => {
    try {
      let dataUrl = fileOrDataUrl;
      if (fileOrDataUrl instanceof File) {
        dataUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = (e) => reject(e);
          reader.readAsDataURL(fileOrDataUrl);
        });
      }

      if (dataUrl) {
        localStorage.setItem('avatar', dataUrl);
        setUser((prev) => prev ? { ...prev, avatar: dataUrl } : prev);
        return { success: true, avatar: dataUrl };
      }
      return { success: false, message: 'Invalid avatar' };
    } catch (error) {
      console.error('Error updating avatar', error);
      return { success: false, message: error.message };
    }
  }, []);

  // Update localStorage when user changes
  useEffect(() => {
    if (user) {
      const { token, ...userWithoutToken } = user;
      localStorage.setItem('user', JSON.stringify(userWithoutToken));
      if (token) {
        localStorage.setItem('token', token);
      }
    }
  }, [user]);

  const value = {
    user,
    login,
    register,
    logout,
    updateAvatar,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
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