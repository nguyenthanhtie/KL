const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  // classId: represents 'lớp' or learning path grouping (optional - kept for flexibility)
  classId: {
    type: Number,
    required: false
  },
  // chapterId: represents 'chương' within a class
  chapterId: {
    type: Number,
    required: false
  },
  // lessonId: bài học identifier inside chapter
  lessonId: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
    default: 'Beginner'
  },
  // Theory content (HTML/Markdown) shown in lesson theory tab
  theory: {
    type: String
  },

  // Legacy content field kept for backward compatibility (optional)
  content: {
    type: String
  },

  // Game object containing quizzes / interactive content
  game: {
    quizzes: [{
      type: {
        type: String,
        enum: ['multiple-choice', 'true-false', 'fill-in-blank', 'matching', 'ordering', 'drag-drop', 'molecule-assembly'],
        required: true
      },
      question: {
        type: String,
        required: true
      },
      // For multiple-choice, matching options
      options: [String],
      // For matching: pairs of items to match
      pairs: [{
        left: String,
        right: String
      }],
      // For ordering: correct sequence
      correctOrder: [String],
      // Mixed type for different answer formats
      correctAnswer: mongoose.Schema.Types.Mixed,
      explanation: String,
      points: {
        type: Number,
        default: 10
      },
      // Optional hint for difficult questions
      hint: String
    }]
  },
  order: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Lesson', lessonSchema);
