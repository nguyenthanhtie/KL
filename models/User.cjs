const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Thông tin tài khoản cơ bản
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  userId: {
    type: String,
    unique: true,
    sparse: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  // Mật khẩu mã hóa (nếu không dùng Firebase Auth)
  hashedPassword: {
    type: String,
    // required: false vì có thể dùng Firebase Auth
  },
  // Firebase UID (nếu dùng Firebase Auth)
  firebaseUid: {
    type: String,
    unique: true,
    sparse: true // Cho phép null nếu không dùng Firebase
  },
  displayName: {
    type: String,
    default: ''
  },
  
  // Thông tin học tập
  xp: {
    type: Number,
    default: 0,
    min: 0
  },
  level: {
    type: Number,
    default: 1,
    min: 1
  },
  currentLesson: {
    classId: {
      type: Number,
      default: 8
    },
    chapterId: {
      type: Number,
      default: 1
    },
    lessonId: {
      type: Number,
      default: 1
    },
    lessonTitle: {
      type: String,
      default: 'Bài 1: Chất – Tính chất của chất'
    }
  },
  
  // Tiến độ học tập chi tiết
  progress: {
    completedLessons: [{
      classId: Number,
      chapterId: Number,
      lessonId: Number,
      pathId: Number, // legacy field for backward compatibility
      completedAt: Date,
      score: Number,
      timeSpent: Number, // thời gian học (giây)
      attempts: {
        type: Number,
        default: 1
      }
    }],
    currentStreak: {
      type: Number,
      default: 0
    },
    totalPoints: {
      type: Number,
      default: 0
    },
    lastActiveDate: Date,
    totalStudyTime: {
      type: Number,
      default: 0 // tổng thời gian học (giây)
    }
  },
  
  // Thông tin cá nhân
  profile: {
    avatar: {
      type: String,
      default: ''
    },
    grade: {
      type: Number,
      default: 8
    },
    school: {
      type: String,
      default: ''
    },
    bio: {
      type: String,
      default: ''
    }
  },
  
  // Cài đặt
  settings: {
    language: {
      type: String,
      default: 'vi'
    },
    notifications: {
      type: Boolean,
      default: true
    },
    soundEffects: {
      type: Boolean,
      default: true
    }
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

// Middleware để cập nhật updatedAt và tạo userId
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  
  // Tự động tạo userId nếu chưa có
  if (!this.userId) {
    this.userId = 'USER_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
  
  next();
});

// Method để tính level dựa trên XP
userSchema.methods.calculateLevel = function() {
  // Công thức: Level = Math.floor(XP / 100) + 1
  // Ví dụ: 0-99 XP = Level 1, 100-199 XP = Level 2, ...
  const newLevel = Math.floor(this.xp / 100) + 1;
  if (newLevel !== this.level) {
    this.level = newLevel;
    return true; // Level up occurred
  }
  return false;
};

// Method để thêm XP
userSchema.methods.addXP = function(amount) {
  const oldLevel = this.level;
  this.xp += amount;
  this.progress.totalPoints += amount;
  
  const leveledUp = this.calculateLevel();
  
  return {
    newXP: this.xp,
    newLevel: this.level,
    leveledUp,
    xpGained: amount
  };
};

// Method để cập nhật bài học hiện tại
userSchema.methods.updateCurrentLesson = function(classId, chapterId, lessonId, lessonTitle) {
  this.currentLesson = {
    classId,
    chapterId,
    lessonId,
    lessonTitle
  };
};

module.exports = mongoose.model('User', userSchema);
