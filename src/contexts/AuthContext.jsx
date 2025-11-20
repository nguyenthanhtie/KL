import { createContext, useContext, useState, useEffect } from 'react';
import api from '../config/api';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');
      
      console.log('🔍 Checking auth on mount:', { 
        hasToken: !!token, 
        hasSavedUser: !!savedUser 
      });
      
      if (token && savedUser) {
        try {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          console.log('✅ User restored from localStorage:', userData.email);
          
          // Optionally verify token is still valid by fetching fresh user data
          // This ensures data is up-to-date after reload
          try {
            const userUid = userData.firebaseUid || userData.uid;
            if (userUid) {
              const response = await api.get(`/users/firebase/${userUid}`);
              if (response.data) {
                localStorage.setItem('user', JSON.stringify(response.data));
                setUser(response.data);
                console.log('✅ User data refreshed from server');
              }
            }
          } catch (refreshError) {
            console.warn('⚠️ Could not refresh user data, using cached data:', refreshError.message);
            // Keep using cached data if refresh fails (e.g., offline)
          }
        } catch (error) {
          console.error('❌ Error parsing user data:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      } else {
        console.log('ℹ️ No saved session found');
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/users/login', { email, password });
      const { token, user: userData } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      return userData;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Đăng nhập thất bại');
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await api.post('/users/register', { 
        username, 
        email, 
        password 
      });
      const { token, user: userData } = response.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      
      return userData;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Đăng ký thất bại');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('user'));
      const userUid = currentUser?.firebaseUid || currentUser?.uid;
      
      if (!userUid) return;
      
      const response = await api.get(`/users/firebase/${userUid}`);
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
        setUser(response.data);
        console.log('✅ User data refreshed');
      }
    } catch (error) {
      console.error('Error refreshing user data:', error);
    }
  };

  const value = {
    user,
    setUser,
    loading,
    login,
    register,
    logout,
    refreshUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

