const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  content: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['system', 'class'],
    required: true
  },
  // If type is 'class', this field is required
  classId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClassRoom',
    default: null
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  priority: {
    type: String,
    enum: ['low', 'normal', 'high', 'urgent'],
    default: 'normal'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

announcementSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index to quickly fetch system or class announcements
announcementSchema.index({ type: 1, classId: 1, isActive: 1, createdAt: -1 });

module.exports = mongoose.model('Announcement', announcementSchema);
