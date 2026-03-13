const mongoose = require('mongoose');

const lessonCommentSchema = new mongoose.Schema({
  lessonId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2000
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
});

lessonCommentSchema.index({ lessonId: 1, createdAt: -1 });

lessonCommentSchema.pre('save', function(next) {
  if (this.isModified('content') && !this.isNew) {
    this.updatedAt = new Date();
  }
  next();
});

module.exports = mongoose.model('LessonComment', lessonCommentSchema);
