const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  // User who receives the notification
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  
  // Notification type
  type: {
    type: String,
    enum: [
      'study_reminder',      // Nhắc nhở học tập
      'streak_warning',      // Cảnh báo sắp mất streak
      'streak_lost',         // Thông báo mất streak
      'achievement',         // Đạt thành tựu
      'level_up',            // Lên level
      'new_content',         // Nội dung mới
      'challenge_unlock',    // Mở khóa challenge mới
      'weekly_report',       // Báo cáo tuần
      'system',              // Thông báo hệ thống
      'promotion'            // Khuyến mãi/sự kiện
    ],
    required: true
  },
  
  // Notification title
  title: {
    type: String,
    required: true,
    maxlength: 100
  },
  
  // Notification body/message
  body: {
    type: String,
    required: true,
    maxlength: 500
  },
  
  // Additional data (JSON)
  data: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  
  // Icon/image for notification
  icon: {
    type: String,
    default: '/images/notification-icon.png'
  },
  
  // Action URL when clicked
  actionUrl: {
    type: String,
    default: '/'
  },
  
  // Read status
  isRead: {
    type: Boolean,
    default: false,
    index: true
  },
  
  // Sent via channels
  sentVia: {
    push: { type: Boolean, default: false },
    email: { type: Boolean, default: false },
    inApp: { type: Boolean, default: true }
  },
  
  // Scheduled time (for scheduled notifications)
  scheduledAt: {
    type: Date,
    default: null
  },
  
  // Sent status
  sentAt: {
    type: Date,
    default: null
  },
  
  // Expiry date (auto-delete old notifications)
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for efficient queries
notificationSchema.index({ userId: 1, createdAt: -1 });
notificationSchema.index({ userId: 1, isRead: 1 });
notificationSchema.index({ scheduledAt: 1 }, { sparse: true });
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // TTL index

// Static method to create notification
notificationSchema.statics.createNotification = async function(data) {
  const notification = new this(data);
  await notification.save();
  return notification;
};

// Static method to get unread count
notificationSchema.statics.getUnreadCount = async function(userId) {
  return await this.countDocuments({ userId, isRead: false });
};

// Static method to mark all as read
notificationSchema.statics.markAllAsRead = async function(userId) {
  return await this.updateMany(
    { userId, isRead: false },
    { $set: { isRead: true } }
  );
};

// Static method to get user notifications with pagination
notificationSchema.statics.getUserNotifications = async function(userId, options = {}) {
  const { page = 1, limit = 20, unreadOnly = false } = options;
  
  const query = { userId };
  if (unreadOnly) {
    query.isRead = false;
  }
  
  const notifications = await this.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
    
  const total = await this.countDocuments(query);
  
  return {
    notifications,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  };
};

module.exports = mongoose.model('Notification', notificationSchema);
