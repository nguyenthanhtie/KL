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
  // Hệ thống 3 cấp độ với sao
  stars: {
    basic: { type: Boolean, default: false },      // Cơ bản - 1 sao
    intermediate: { type: Boolean, default: false }, // Trung bình - 2 sao
    advanced: { type: Boolean, default: false }      // Nâng cao - 3 sao
  },
  currentLevel: {
    type: String,
    enum: ['basic', 'intermediate', 'advanced'],
    default: 'basic'
  },
  totalStars: {
    type: Number,
    default: 0,
    min: 0,
    max: 3
  },
  levelScores: {
    basic: { type: Number, default: 0 },
    intermediate: { type: Number, default: 0 },
    advanced: { type: Number, default: 0 }
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
