const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  pathId: {
    type: Number,
    required: true
  },
  lessonId: {
    type: Number,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  score: {
    type: Number,
    default: 0
  },
  totalQuestions: Number,
  correctAnswers: Number,
  attempts: {
    type: Number,
    default: 0
  },
  lastAttemptDate: Date,
  completedAt: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

progressSchema.index({ userId: 1, pathId: 1, lessonId: 1 }, { unique: true });

module.exports = mongoose.model('Progress', progressSchema);
