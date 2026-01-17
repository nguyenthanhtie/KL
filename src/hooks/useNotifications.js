// ==================== NOTIFICATION HOOK ====================
// Hook để quản lý thông báo trong React

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getFCMToken, onForegroundMessage, getDeviceInfo } from '../config/firebase';
import api from '../config/api';

export const useNotifications = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState('default');
  const [fcmToken, setFcmToken] = useState(null);

  // Check notification permission
  useEffect(() => {
    if ('Notification' in window) {
      setPermissionStatus(Notification.permission);
    }
  }, []);

  // Fetch notifications
  const fetchNotifications = useCallback(async (page = 1, unreadOnly = false) => {
    if (!user?._id) return;

    setLoading(true);
    try {
      const response = await api.get('/notifications', {
        params: {
          userId: user._id,
          page,
          limit: 20,
          unreadOnly
        }
      });

      if (response.data.success) {
        if (page === 1) {
          setNotifications(response.data.notifications);
        } else {
          setNotifications(prev => [...prev, ...response.data.notifications]);
        }
        setUnreadCount(response.data.unreadCount);
        return response.data;
      }
    } catch (error) {
      console.error('Fetch notifications error:', error);
    } finally {
      setLoading(false);
    }
  }, [user?._id]);

  // Fetch unread count
  const fetchUnreadCount = useCallback(async () => {
    if (!user?._id) return;

    try {
      const response = await api.get('/notifications/unread-count', {
        params: { userId: user._id }
      });

      if (response.data.success) {
        setUnreadCount(response.data.unreadCount);
      }
    } catch (error) {
      console.error('Fetch unread count error:', error);
    }
  }, [user?._id]);

  // Mark notification as read
  const markAsRead = useCallback(async (notificationId) => {
    if (!user?._id) return;

    try {
      const response = await api.put(`/notifications/${notificationId}/read`, {
        userId: user._id
      });

      if (response.data.success) {
        setNotifications(prev =>
          prev.map(n => n._id === notificationId ? { ...n, isRead: true } : n)
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error('Mark as read error:', error);
    }
  }, [user?._id]);

  // Mark all as read
  const markAllAsRead = useCallback(async () => {
    if (!user?._id) return;

    try {
      const response = await api.put('/notifications/read-all', {
        userId: user._id
      });

      if (response.data.success) {
        setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
        setUnreadCount(0);
      }
    } catch (error) {
      console.error('Mark all as read error:', error);
    }
  }, [user?._id]);

  // Delete notification
  const deleteNotification = useCallback(async (notificationId) => {
    if (!user?._id) return;

    try {
      const notification = notifications.find(n => n._id === notificationId);
      const response = await api.delete(`/notifications/${notificationId}`, {
        params: { userId: user._id }
      });

      if (response.data.success) {
        setNotifications(prev => prev.filter(n => n._id !== notificationId));
        if (!notification?.isRead) {
          setUnreadCount(prev => Math.max(0, prev - 1));
        }
      }
    } catch (error) {
      console.error('Delete notification error:', error);
    }
  }, [user?._id, notifications]);

  // Fetch settings
  const fetchSettings = useCallback(async () => {
    if (!user?._id) return;

    try {
      const response = await api.get('/notifications/settings', {
        params: { userId: user._id }
      });

      if (response.data.success) {
        setSettings(response.data.settings);
      }
    } catch (error) {
      console.error('Fetch settings error:', error);
    }
  }, [user?._id]);

  // Update settings
  const updateSettings = useCallback(async (newSettings) => {
    if (!user?._id) return;

    try {
      const response = await api.put('/notifications/settings', {
        userId: user._id,
        settings: newSettings
      });

      if (response.data.success) {
        setSettings(response.data.settings);
        return true;
      }
    } catch (error) {
      console.error('Update settings error:', error);
    }
    return false;
  }, [user?._id]);

  // Request notification permission and register FCM token
  const requestPermission = useCallback(async () => {
    if (!user?._id) return false;

    try {
      const permission = await Notification.requestPermission();
      setPermissionStatus(permission);

      if (permission === 'granted') {
        const token = await getFCMToken();
        if (token) {
          setFcmToken(token);
          
          // Register token with server
          await api.post('/notifications/register-token', {
            userId: user._id,
            token,
            deviceInfo: getDeviceInfo()
          });

          return true;
        }
      }
    } catch (error) {
      console.error('Request permission error:', error);
    }
    return false;
  }, [user?._id]);

  // Unregister FCM token (for logout or disable notifications)
  const unregisterToken = useCallback(async () => {
    if (!user?._id || !fcmToken) return;

    try {
      await api.delete('/notifications/unregister-token', {
        data: {
          userId: user._id,
          token: fcmToken
        }
      });
      setFcmToken(null);
    } catch (error) {
      console.error('Unregister token error:', error);
    }
  }, [user?._id, fcmToken]);

  // Send test notification
  const sendTestNotification = useCallback(async () => {
    if (!user?._id) return false;

    try {
      const response = await api.post('/notifications/test', {
        userId: user._id
      });

      return response.data.success;
    } catch (error) {
      console.error('Send test notification error:', error);
      return false;
    }
  }, [user?._id]);

  // Listen for foreground messages
  useEffect(() => {
    if (!user?._id) return;

    const unsubscribe = onForegroundMessage((payload) => {
      // Show browser notification
      if (Notification.permission === 'granted') {
        new Notification(payload.notification?.title || 'ChemLearn', {
          body: payload.notification?.body,
          icon: '/images/notification-icon.png',
          data: payload.data
        });
      }

      // Refresh notifications
      fetchUnreadCount();
    });

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [user?._id, fetchUnreadCount]);

  // Auto-fetch on mount
  useEffect(() => {
    if (user?._id) {
      fetchUnreadCount();
      fetchSettings();
    }
  }, [user?._id, fetchUnreadCount, fetchSettings]);

  return {
    notifications,
    unreadCount,
    loading,
    settings,
    permissionStatus,
    fcmToken,
    fetchNotifications,
    fetchUnreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    fetchSettings,
    updateSettings,
    requestPermission,
    unregisterToken,
    sendTestNotification
  };
};

export default useNotifications;
