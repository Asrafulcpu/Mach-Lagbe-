import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import * as authService from '../services/authService';

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

    const hydrateFromServer = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const me = await authService.getCurrentUser();
        if (me?.success && me?.user) {
          const savedAvatar = localStorage.getItem('avatar');
          const nextUser = { ...me.user, token };
          if (savedAvatar) nextUser.avatar = savedAvatar;
          setUser(nextUser);
          localStorage.setItem('user', JSON.stringify(me.user));
        }
      } catch (e) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
      }
    };

    (async () => {
      initializeAuth();
      await hydrateFromServer();
    })();
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const res = await authService.login(email, password);
      if (res?.success && res?.token && res?.user) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));

        const savedAvatar = localStorage.getItem('avatar');
        const nextUser = { ...res.user, token: res.token };
        if (savedAvatar) nextUser.avatar = savedAvatar;
        setUser(nextUser);

        return { success: true, user: nextUser, message: 'Login successful' };
      }
      return { success: false, user: null, message: res?.error || 'Login failed' };
    } catch (error) {
      return { success: false, user: null, message: error?.error || error?.message || 'Login failed' };
    }
  }, []);

  const register = useCallback(async (userData) => {
    try {
      const res = await authService.register(userData);
      if (res?.success && res?.token && res?.user) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));

        const savedAvatar = localStorage.getItem('avatar');
        const nextUser = { ...res.user, token: res.token };
        if (savedAvatar) nextUser.avatar = savedAvatar;
        setUser(nextUser);

        return { success: true, user: nextUser, message: 'Registration successful' };
      }
      return { success: false, user: null, message: res?.error || 'Registration failed' };
    } catch (error) {
      return { success: false, user: null, message: error?.error || error?.message || 'Registration failed' };
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  const updateProfile = useCallback(async (profileData) => {
    try {
      const res = await authService.updateProfile(profileData);
      if (res?.success && res?.user) {
        const token = localStorage.getItem('token');
        const savedAvatar = localStorage.getItem('avatar');
        const nextUser = { ...res.user, token };
        if (savedAvatar) nextUser.avatar = savedAvatar;
        setUser(nextUser);
        localStorage.setItem('user', JSON.stringify(res.user));
        return { success: true, user: nextUser };
      }
      return { success: false, message: res?.error || 'Failed to update profile' };
    } catch (error) {
      return { success: false, message: error?.error || error?.message || 'Failed to update profile' };
    }
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
    updateProfile,
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