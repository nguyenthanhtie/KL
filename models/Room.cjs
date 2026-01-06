const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  oderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    alias: 'userId'
  },
  odername: {
    type: String,
    required: true,
    alias: 'username'
  },
  avatar: {
    type: String,
    default: ''
  },
  isReady: {
    type: Boolean,
    default: false
  },
  score: {
    type: Number,
    default: 0
  },
  correctAnswers: {
    type: Number,
    default: 0
  },
  isFinished: {
    type: Boolean,
    default: false
  },
  joinedAt: {
    type: Date,
    default: Date.now
  }
});

const roomSchema = new mongoose.Schema({
  roomCode: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  name: {
    type: String,
    required: true
  },
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mode: {
    type: String,
    enum: ['v1v1', 'multiplayer'],
    required: true
  },
  status: {
    type: String,
    enum: ['waiting', 'playing', 'finished'],
    default: 'waiting'
  },
  maxPlayers: {
    type: Number,
    default: 2,
    min: 2,
    max: 10
  },
  players: [playerSchema],
  grade: {
    type: Number,
    default: 8,
    min: 8,
    max: 12
  },
  subject: {
    type: String,
    default: 'chemistry'
  },
  questionCount: {
    type: Number,
    default: 10,
    min: 5,
    max: 30
  },
  timePerQuestion: {
    type: Number,
    default: 30, // seconds
    min: 10,
    max: 60
  },
  currentQuestion: {
    type: Number,
    default: 0
  },
  questions: [{
    type: {
      type: String,
      enum: ['multiple-choice', 'true-false', 'fill-in-blank', 'matching', 'ordering', 'drag-drop'],
      default: 'multiple-choice'
    },
    question: String,
    options: [String],
    correctAnswer: mongoose.Schema.Types.Mixed, // Number for MC, String for fill-in-blank, Boolean for T/F
    explanation: String,
    hint: String,
    // For matching type
    pairs: [{
      left: String,
      right: String
    }],
    // For ordering type
    correctOrder: [String],
    // For drag-drop type
    inline: Boolean,
    slots: [String],
    choices: [String]
  }],
  results: [{
    oderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    odername: String,
    score: Number,
    correctAnswers: Number,
    timeTaken: Number,
    rank: Number
  }],
  startedAt: {
    type: Date
  },
  finishedAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 30 * 60 * 1000) // 30 minutes expiry
  }
});

// Generate unique room code
roomSchema.statics.generateRoomCode = async function() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code;
  let isUnique = false;
  
  while (!isUnique) {
    code = '';
    for (let i = 0; i < 6; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    const existingRoom = await this.findOne({ roomCode: code, status: { $ne: 'finished' } });
    if (!existingRoom) {
      isUnique = true;
    }
  }
  
  return code;
};

// Check if room is full
roomSchema.methods.isFull = function() {
  return this.players.length >= this.maxPlayers;
};

// Check if all players are ready
roomSchema.methods.allPlayersReady = function() {
  return this.players.length >= 2 && this.players.every(p => p.isReady);
};

// Add index for auto-cleanup of expired rooms
roomSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
// roomCode already has unique index from schema definition, no need to add again
roomSchema.index({ status: 1 });

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
