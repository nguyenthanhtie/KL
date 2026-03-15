const mongoose = require('mongoose');

const systemSettingsSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    enum: ['general', 'registration', 'upload', 'teacher', 'notification'],
    default: 'general'
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

systemSettingsSchema.index({ category: 1 });
systemSettingsSchema.index({ key: 1 });

// Default settings khi chưa có data
systemSettingsSchema.statics.getDefaults = function () {
  return [
    { key: 'site_name', value: 'Chemistry Learning', description: 'Tên hệ thống', category: 'general' },
    { key: 'maintenance_mode', value: false, description: 'Bật chế độ bảo trì', category: 'general' },
    { key: 'announcement_banner', value: '', description: 'Thông báo hiển thị trên trang chủ', category: 'general' },
    { key: 'max_students_per_class', value: 50, description: 'Số học sinh tối đa mỗi lớp', category: 'general' },
    { key: 'registration_enabled', value: true, description: 'Cho phép đăng ký tài khoản mới', category: 'registration' },
    { key: 'max_file_upload_size_mb', value: 10, description: 'Kích thước file upload tối đa (MB)', category: 'upload' },
    { key: 'teacher_auto_approve', value: false, description: 'Tự động phê duyệt giáo viên', category: 'teacher' },
    { key: 'teacher_max_documents', value: 5, description: 'Số file chứng từ tối đa khi đăng ký GV', category: 'teacher' },
  ];
};

// Khởi tạo default settings nếu collection trống
systemSettingsSchema.statics.initDefaults = async function () {
  const count = await this.countDocuments();
  if (count === 0) {
    const defaults = this.getDefaults();
    await this.insertMany(defaults);
  }
};

module.exports = mongoose.model('SystemSettings', systemSettingsSchema);
