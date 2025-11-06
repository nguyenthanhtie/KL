const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    required: true,
    enum: ['Dễ', 'Trung bình', 'Khó', 'Rất khó']
  },
  difficultyColor: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    required: true,
    enum: ['available', 'coming-soon', 'locked'],
    default: 'available'
  },
  link: {
    type: String,
    required: false
  },
  features: [{
    type: String,
    required: true
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Challenge', challengeSchema);
