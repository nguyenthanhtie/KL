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

  // Các chương trình học đã đăng ký
  programs: [{
    programId: {
      type: String,
      required: true,
      enum: ['chemistry', 'physics', 'biology', 'math'] // Các môn học có sẵn
    },
    programName: {
      type: String,
      required: true
    },
    enrolledAt: {
      type: Date,
      default: Date.now
    },
    isActive: {
      type: Boolean,
      default: true
    },
    // Tiến độ trong chương trình này
    programProgress: {
      // Lớp hiện tại đang học trong chương trình
      currentClass: {
        classId: Number,
        className: String
      },
      // Các lớp đã hoàn thành
      completedClasses: [{
        classId: Number,
        className: String,
        completedAt: Date,
        finalScore: Number
      }],
      // Chi tiết tiến độ theo lớp-chương-bài
      classProgress: [{
        classId: {
          type: Number,
          required: true
        },
        className: String,
        isUnlocked: {
          type: Boolean,
          default: false
        },
        startedAt: Date,
        completedAt: Date,
        // Tiến độ theo chương
        chapters: [{
          chapterId: {
            type: Number,
            required: true
          },
          chapterName: String,
          isUnlocked: {
            type: Boolean,
            default: false
          },
          startedAt: Date,
          completedAt: Date,
          // Tiến độ theo bài học
          lessons: [{
            lessonId: {
              type: Number,
              required: true
            },
            lessonTitle: String,
            isUnlocked: {
              type: Boolean,
              default: false
            },
            isCompleted: {
              type: Boolean,
              default: false
            },
            attempts: {
              type: Number,
              default: 0
            },
            bestScore: {
              type: Number,
              default: 0
            },
            lastScore: Number,
            stars: {
              basic: { type: Boolean, default: false },
              intermediate: { type: Boolean, default: false },
              advanced: { type: Boolean, default: false }
            },
            totalStars: {
              type: Number,
              default: 0,
              min: 0,
              max: 3
            },
            startedAt: Date,
            completedAt: Date,
            lastAttemptAt: Date,
            timeSpent: {
              type: Number,
              default: 0 // thời gian học (giây)
            }
          }]
        }]
      }],
      // Thống kê tổng quan cho chương trình
      statistics: {
        totalLessons: { type: Number, default: 0 },
        completedLessons: { type: Number, default: 0 },
        totalStars: { type: Number, default: 0 },
        totalPoints: { type: Number, default: 0 },
        averageScore: { type: Number, default: 0 },
        totalTimeSpent: { type: Number, default: 0 }
      }
    }
  }],
  
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

// Method để đăng ký chương trình học mới
userSchema.methods.enrollProgram = function(programId, programName, initialClassId = 8) {
  // Kiểm tra xem đã đăng ký chương trình chưa
  const existingProgram = this.programs.find(p => p.programId === programId);
  if (existingProgram) {
    existingProgram.isActive = true;
    return existingProgram;
  }

  // Tạo chương trình mới
  const newProgram = {
    programId,
    programName,
    enrolledAt: new Date(),
    isActive: true,
    programProgress: {
      currentClass: {
        classId: initialClassId,
        className: `Lớp ${initialClassId}`
      },
      completedClasses: [],
      classProgress: [],
      statistics: {
        totalLessons: 0,
        completedLessons: 0,
        totalStars: 0,
        totalPoints: 0,
        averageScore: 0,
        totalTimeSpent: 0
      }
    }
  };

  this.programs.push(newProgram);
  return newProgram;
};

// Method để lấy chương trình đang hoạt động
userSchema.methods.getActiveProgram = function(programId) {
  return this.programs.find(p => p.programId === programId && p.isActive);
};

// Method để cập nhật tiến độ bài học trong chương trình
userSchema.methods.updateLessonProgress = function(programId, classId, chapterId, lessonId, progressData) {
  const program = this.programs.find(p => p.programId === programId);
  if (!program) return null;

  // Tìm hoặc tạo class progress
  let classProgress = program.programProgress.classProgress.find(c => c.classId === classId);
  if (!classProgress) {
    classProgress = {
      classId,
      className: `Lớp ${classId}`,
      isUnlocked: true,
      startedAt: new Date(),
      chapters: []
    };
    program.programProgress.classProgress.push(classProgress);
  }

  // Tìm hoặc tạo chapter progress
  let chapterProgress = classProgress.chapters.find(ch => ch.chapterId === chapterId);
  if (!chapterProgress) {
    chapterProgress = {
      chapterId,
      chapterName: `Chương ${chapterId}`,
      isUnlocked: true,
      startedAt: new Date(),
      lessons: []
    };
    classProgress.chapters.push(chapterProgress);
  }

  // Tìm hoặc tạo lesson progress
  let lessonProgress = chapterProgress.lessons.find(l => l.lessonId === lessonId);
  if (!lessonProgress) {
    lessonProgress = {
      lessonId,
      lessonTitle: progressData.lessonTitle || `Bài ${lessonId}`,
      isUnlocked: true,
      isCompleted: false,
      attempts: 0,
      bestScore: 0,
      stars: {
        basic: false,
        intermediate: false,
        advanced: false
      },
      totalStars: 0,
      timeSpent: 0
    };
    chapterProgress.lessons.push(lessonProgress);
  }

  // Cập nhật thông tin bài học
  lessonProgress.attempts += 1;
  lessonProgress.lastAttemptAt = new Date();
  
  if (!lessonProgress.startedAt) {
    lessonProgress.startedAt = new Date();
  }

  if (progressData.score !== undefined) {
    lessonProgress.lastScore = progressData.score;
    if (progressData.score > lessonProgress.bestScore) {
      lessonProgress.bestScore = progressData.score;
    }
  }

  if (progressData.timeSpent) {
    lessonProgress.timeSpent += progressData.timeSpent;
  }

  if (progressData.stars) {
    lessonProgress.stars = { ...lessonProgress.stars, ...progressData.stars };
    lessonProgress.totalStars = 
      (lessonProgress.stars.basic ? 1 : 0) +
      (lessonProgress.stars.intermediate ? 1 : 0) +
      (lessonProgress.stars.advanced ? 1 : 0);
  }

  if (progressData.isCompleted) {
    lessonProgress.isCompleted = true;
    lessonProgress.completedAt = new Date();
  }

  // Cập nhật statistics
  this.updateProgramStatistics(programId);

  return lessonProgress;
};

// Method để cập nhật thống kê chương trình
userSchema.methods.updateProgramStatistics = function(programId) {
  const program = this.programs.find(p => p.programId === programId);
  if (!program) return;

  let totalLessons = 0;
  let completedLessons = 0;
  let totalStars = 0;
  let totalPoints = 0;
  let totalTimeSpent = 0;
  let scoreSum = 0;
  let scoreCount = 0;

  program.programProgress.classProgress.forEach(classP => {
    classP.chapters.forEach(chapterP => {
      chapterP.lessons.forEach(lessonP => {
        totalLessons++;
        if (lessonP.isCompleted) completedLessons++;
        totalStars += lessonP.totalStars || 0;
        totalPoints += lessonP.bestScore || 0;
        totalTimeSpent += lessonP.timeSpent || 0;
        if (lessonP.bestScore) {
          scoreSum += lessonP.bestScore;
          scoreCount++;
        }
      });
    });
  });

  program.programProgress.statistics = {
    totalLessons,
    completedLessons,
    totalStars,
    totalPoints,
    averageScore: scoreCount > 0 ? Math.round(scoreSum / scoreCount) : 0,
    totalTimeSpent
  };
};

// Method để mở khóa lớp mới
userSchema.methods.unlockClass = function(programId, classId) {
  const program = this.programs.find(p => p.programId === programId);
  if (!program) return false;

  let classProgress = program.programProgress.classProgress.find(c => c.classId === classId);
  if (!classProgress) {
    classProgress = {
      classId,
      className: `Lớp ${classId}`,
      isUnlocked: true,
      startedAt: new Date(),
      chapters: []
    };
    program.programProgress.classProgress.push(classProgress);
  } else {
    classProgress.isUnlocked = true;
  }

  return true;
};

module.exports = mongoose.model('User', userSchema);
