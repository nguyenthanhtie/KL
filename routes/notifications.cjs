// ==================== NOTIFICATION API ROUTES ====================
const express = require('express');
const router = express.Router();
const User = require('../models/User.cjs');
const Notification = require('../models/Notification.cjs');
const notificationService = require('../services/notificationService.cjs');

// ==================== GET USER NOTIFICATIONS ====================
// GET /api/notifications
router.get('/', async (req, res) => {
  try {
    const { userId } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const unreadOnly = req.query.unreadOnly === 'true';

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const result = await Notification.getUserNotifications(userId, { page, limit, unreadOnly });
    const unreadCount = await Notification.getUnreadCount(userId);

    res.json({
      success: true,
      ...result,
      unreadCount
    });
  } catch (error) {
    console.error('Get notifications error:', error);
    res.status(500).json({ error: 'Failed to get notifications' });
  }
});

// ==================== GET UNREAD COUNT ====================
// GET /api/notifications/unread-count
router.get('/unread-count', async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const count = await Notification.getUnreadCount(userId);

    res.json({ success: true, unreadCount: count });
  } catch (error) {
    console.error('Get unread count error:', error);
    res.status(500).json({ error: 'Failed to get unread count' });
  }
});

// ==================== MARK NOTIFICATION AS READ ====================
// PUT /api/notifications/:id/read
router.put('/:id/read', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;

    const notification = await Notification.findOneAndUpdate(
      { _id: id, userId },
      { $set: { isRead: true } },
      { new: true }
    );

    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    // Update user's unread count
    await User.findByIdAndUpdate(userId, {
      $inc: { unreadNotifications: -1 }
    });

    res.json({ success: true, notification });
  } catch (error) {
    console.error('Mark as read error:', error);
    res.status(500).json({ error: 'Failed to mark as read' });
  }
});

// ==================== MARK ALL AS READ ====================
// PUT /api/notifications/read-all
router.put('/read-all', async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const result = await Notification.markAllAsRead(userId);

    // Reset user's unread count
    await User.findByIdAndUpdate(userId, {
      $set: { unreadNotifications: 0 }
    });

    res.json({ 
      success: true, 
      modifiedCount: result.modifiedCount 
    });
  } catch (error) {
    console.error('Mark all as read error:', error);
    res.status(500).json({ error: 'Failed to mark all as read' });
  }
});

// ==================== DELETE NOTIFICATION ====================
// DELETE /api/notifications/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;

    const notification = await Notification.findOneAndDelete({ _id: id, userId });

    if (!notification) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    // Update unread count if the notification was unread
    if (!notification.isRead) {
      await User.findByIdAndUpdate(userId, {
        $inc: { unreadNotifications: -1 }
      });
    }

    res.json({ success: true, message: 'Notification deleted' });
  } catch (error) {
    console.error('Delete notification error:', error);
    res.status(500).json({ error: 'Failed to delete notification' });
  }
});

// ==================== GET NOTIFICATION SETTINGS ====================
// GET /api/notifications/settings
router.get('/settings', async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const user = await User.findById(userId).select('notificationSettings fcmTokens');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      success: true,
      settings: user.notificationSettings || {},
      hasDeviceTokens: (user.fcmTokens || []).length > 0,
      deviceCount: (user.fcmTokens || []).length
    });
  } catch (error) {
    console.error('Get settings error:', error);
    res.status(500).json({ error: 'Failed to get settings' });
  }
});

// ==================== UPDATE NOTIFICATION SETTINGS ====================
// PUT /api/notifications/settings
router.put('/settings', async (req, res) => {
  try {
    const { userId, settings } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { notificationSettings: settings } },
      { new: true }
    ).select('notificationSettings');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      success: true,
      settings: user.notificationSettings
    });
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({ error: 'Failed to update settings' });
  }
});

// ==================== REGISTER FCM TOKEN ====================
// POST /api/notifications/register-token
router.post('/register-token', async (req, res) => {
  try {
    const { userId, token, deviceInfo } = req.body;

    if (!userId || !token) {
      return res.status(400).json({ error: 'userId and token are required' });
    }

    // Check if token already exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const existingToken = user.fcmTokens?.find(t => t.token === token);

    if (existingToken) {
      // Update last used
      await User.findOneAndUpdate(
        { _id: userId, 'fcmTokens.token': token },
        { $set: { 'fcmTokens.$.lastUsed': new Date() } }
      );
    } else {
      // Add new token
      await User.findByIdAndUpdate(userId, {
        $push: {
          fcmTokens: {
            token,
            deviceInfo: deviceInfo || 'Unknown device',
            createdAt: new Date(),
            lastUsed: new Date()
          }
        }
      });
    }

    res.json({ success: true, message: 'Token registered' });
  } catch (error) {
    console.error('Register token error:', error);
    res.status(500).json({ error: 'Failed to register token' });
  }
});

// ==================== UNREGISTER FCM TOKEN ====================
// DELETE /api/notifications/unregister-token
router.delete('/unregister-token', async (req, res) => {
  try {
    const { userId, token } = req.body;

    if (!userId || !token) {
      return res.status(400).json({ error: 'userId and token are required' });
    }

    await User.findByIdAndUpdate(userId, {
      $pull: { fcmTokens: { token } }
    });

    res.json({ success: true, message: 'Token unregistered' });
  } catch (error) {
    console.error('Unregister token error:', error);
    res.status(500).json({ error: 'Failed to unregister token' });
  }
});

// ==================== GET USER'S DEVICES ====================
// GET /api/notifications/devices
router.get('/devices', async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const user = await User.findById(userId).select('fcmTokens');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return devices without exposing full tokens
    const devices = (user.fcmTokens || []).map(t => ({
      id: t._id,
      deviceInfo: t.deviceInfo,
      createdAt: t.createdAt,
      lastUsed: t.lastUsed,
      tokenPreview: t.token ? `${t.token.substring(0, 10)}...` : null
    }));

    res.json({ success: true, devices });
  } catch (error) {
    console.error('Get devices error:', error);
    res.status(500).json({ error: 'Failed to get devices' });
  }
});

// ==================== REMOVE DEVICE ====================
// DELETE /api/notifications/devices/:deviceId
router.delete('/devices/:deviceId', async (req, res) => {
  try {
    const { deviceId } = req.params;
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    await User.findByIdAndUpdate(userId, {
      $pull: { fcmTokens: { _id: deviceId } }
    });

    res.json({ success: true, message: 'Device removed' });
  } catch (error) {
    console.error('Remove device error:', error);
    res.status(500).json({ error: 'Failed to remove device' });
  }
});

// ==================== SEND TEST NOTIFICATION ====================
// POST /api/notifications/test
router.post('/test', async (req, res) => {
  try {
    const { userId, type = 'system' } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const result = await notificationService.sendNotification(user, type, {
      title: '🔔 Thông báo thử nghiệm',
      body: 'Đây là thông báo thử nghiệm từ ChemLearn. Nếu bạn nhận được, hệ thống đang hoạt động tốt!',
      actionUrl: '/profile'
    });

    res.json({ 
      success: true, 
      message: 'Test notification sent',
      result 
    });
  } catch (error) {
    console.error('Test notification error:', error);
    res.status(500).json({ error: 'Failed to send test notification' });
  }
});

module.exports = router;
