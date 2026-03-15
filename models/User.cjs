const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  // Thông tin tài khoản
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String // Để trống nếu đăng nhập bằng Google
  },
  firebaseUid: {
    type: String,
    unique: true,
    sparse: true // Cho phép null
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true // Cho phép null
  },
  displayName: {
    type: String,
    default: ''
  },
  avatar: {
    type: String,
    default: ''
  },
  
  // ===== HỆ THỐNG PHÂN QUYỀN =====
  role: {
    type: String,
    enum: ['student', 'teacher', 'admin'],
    default: 'student'
  },

  // Trạng thái duyệt giáo viên
  teacherStatus: {
    type: String,
    enum: ['none', 'pending', 'approved', 'rejected'],
    default: 'none'
  },

  // Khóa tài khoản
  isLocked: {
    type: Boolean,
    default: false
  },
  lockReason: {
    type: String,
    default: ''
  },
  lockedAt: {
    type: Date
  },
  lockedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  
  // Thông tin giáo viên (chỉ dùng khi role = 'teacher')
  teacherInfo: {
    school: { type: String, default: '' },
    subject: { type: String, default: 'chemistry' }, // Môn giảng dạy
    department: { type: String, default: '' }, // Tổ bộ môn
    yearsOfExperience: { type: Number, default: 0 },
    qualification: { type: String, default: '' }, // Bằng cấp
    bio: { type: String, default: '' }, // Giới thiệu
    verifiedAt: { type: Date }, // Ngày được xác minh là giáo viên
    verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Admin xác minh
    documents: [{
      originalName: { type: String },
      fileName: { type: String },
      filePath: { type: String },
      fileType: { type: String },
      fileSize: { type: Number },
      uploadedAt: { type: Date, default: Date.now }
    }],
    rejectionReason: { type: String, default: '' },
    requestedAt: { type: Date },
    adminNotes: [{
      note: { type: String, required: true },
      addedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      addedAt: { type: Date, default: Date.now }
    }]
  },
  
  // Thông tin admin (chỉ dùng khi role = 'admin')
  adminInfo: {
    permissions: {
      type: [String],
      default: ['all'], // all, users, lessons, challenges, classes, reports, teachers, settings, content, audit_logs
      enum: ['all', 'users', 'lessons', 'challenges', 'classes', 'reports', 'teachers', 'settings', 'content', 'audit_logs']
    },
    assignedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    assignedAt: { type: Date }
  },
  
  // Liên kết giáo viên - học sinh
  assignedTeacher: { // Học sinh được gán cho giáo viên nào
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  
  // Danh sách học sinh của giáo viên (chỉ dùng khi role = 'teacher')
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  
  // Danh sách lớp học của giáo viên (tham chiếu đến ClassRoom model)
  managedClasses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClassRoom'
  }],
  
  // Học sinh thuộc lớp học nào
  enrolledClasses: [{
    classId: { type: mongoose.Schema.Types.ObjectId, ref: 'ClassRoom' },
    enrolledAt: { type: Date, default: Date.now }
  }],
  
  // XP và Level
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
  
  // Claimed missions (for mission-based XP system) - Regular missions
  claimedMissions: {
    type: [String],
    default: []
  },
  
  // Daily claimed missions (reset daily)
  dailyClaimedMissions: {
    type: [String],
    default: []
  },
  dailyMissionsDate: {
    type: String, // Format: 'YYYY-MM-DD'
    default: ''
  },
  
  // Today's progress for daily missions
  todayProgress: {
    date: { type: String, default: '' }, // Format: 'YYYY-MM-DD'
    lessons: { type: Number, default: 0 },
    challenges: { type: Number, default: 0 },
    perfectLessons: { type: Number, default: 0 },
    login: { type: Number, default: 0 }
  },
  
  // Chương trình học
  programs: [{
    programId: {
      type: String,
      required: true,
      enum: ['chemistry', 'physics', 'biology', 'math']
    },
    programName: String,
    currentClass: Number, // Lớp đang học (8, 9, 10, 11, 12)
    curriculumType: {
      type: String,
      enum: ['ketnoi', 'canhdieu', 'chantroicangtao', 'standard'],
      default: null // null = chưa chọn
    },
    // currentLesson: Number, // Bài đang học (removed - progress tracked in progress.completedLessons)
    isActive: {
      type: Boolean,
      default: true
    },
    placementTestCompleted: {
      type: Boolean,
      default: false
    },
    placementTestScore: Number,
    enrolledAt: {
      type: Date,
      default: Date.now
    },
    // Thời gian học và chuỗi ngày học
    studyTime: {
      type: Number,
      default: 0, // Tổng thời gian học (tính bằng phút)
      min: 0
    },
    studyStreak: {
      currentStreak: {
        type: Number,
        default: 0, // Số ngày học liên tiếp hiện tại
        min: 0
      },
      longestStreak: {
        type: Number,
        default: 0, // Chuỗi ngày học dài nhất
        min: 0
      },
      lastStudyDate: Date, // Ngày học gần nhất
      streakHistory: [{
        date: Date,
        duration: Number // Thời gian học trong ngày đó (phút)
      }]
    },
    progress: {
      completedLessons: {
        type: [Number],
        default: []
      },
      completedChallenges: {
        type: [String],
        default: []
      },
      lessonStars: {
        type: Map,
        of: Number,
        default: () => new Map()
      },
      challengeStars: {
        type: Map,
        of: Number,
        default: () => new Map()
      },
      // Tiến trình challenge đang làm dở - sử dụng Mixed thay vì nested Map
      challengeProgress: {
        type: Map,
        of: mongoose.Schema.Types.Mixed,
        default: () => new Map()
      },
      // Lịch sử hoàn thành challenge
      challengeHistory: {
        type: [{
          challengeSlug: String,
          challengeId: Number,
          score: Number,
          maxScore: Number,
          percentage: Number,
          stars: Number,
          timeSpent: Number,
          completedAt: Date
        }],
        default: []
      },
      totalScore: {
        type: Number,
        default: 0
      },
      lastStudyDate: Date
    }
  }],
  
  // Notification Settings
  notificationSettings: {
    // Push notification settings
    pushEnabled: {
      type: Boolean,
      default: true
    },
    // Email notification settings
    emailEnabled: {
      type: Boolean,
      default: true
    },
    // Reminder settings
    studyReminder: {
      enabled: { type: Boolean, default: true },
      time: { type: String, default: '18:00' }, // HH:mm format
      days: { type: [Number], default: [1, 2, 3, 4, 5, 6, 0] } // 0-6 (Sun-Sat)
    },
    // Streak reminder (notify before losing streak)
    streakReminder: {
      enabled: { type: Boolean, default: true }
    },
    // New lesson/challenge notification
    newContentNotification: {
      enabled: { type: Boolean, default: true }
    },
    // Achievement notification
    achievementNotification: {
      enabled: { type: Boolean, default: true }
    },
    // Weekly progress report
    weeklyReport: {
      enabled: { type: Boolean, default: true },
      dayOfWeek: { type: Number, default: 0 } // 0 = Sunday
    }
  },
  
  // FCM Tokens for push notifications (multiple devices)
  fcmTokens: [{
    token: { type: String, required: true },
    deviceInfo: { type: String }, // e.g., "Chrome on Windows"
    createdAt: { type: Date, default: Date.now },
    lastUsed: { type: Date, default: Date.now }
  }],
  
  // Unread notifications count
  unreadNotifications: {
    type: Number,
    default: 0
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

// Middleware tự động cập nhật updatedAt
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Methods - Authentication
userSchema.methods.setPassword = async function(password) {
  this.password = await bcrypt.hash(password, 10);
};

userSchema.methods.comparePassword = async function(candidatePassword) {
  if (!this.password) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

// Methods - XP & Level
userSchema.methods.addXP = function(amount) {
  this.xp += amount;
  const newLevel = Math.floor(this.xp / 100) + 1;
  const leveledUp = newLevel > this.level;
  this.level = newLevel;
  
  return { xp: this.xp, level: this.level, leveledUp };
};

// Methods - Program
// Helper method để đảm bảo progress object được khởi tạo đầy đủ
userSchema.methods.ensureProgramProgress = function(programId) {
  let program = this.programs.find(p => p.programId === programId);
  
  if (!program) {
    return null;
  }
  
  // Đảm bảo progress object tồn tại
  if (!program.progress) {
    program.progress = {};
  }
  
  // Khởi tạo các field nếu chưa có
  if (!program.progress.completedLessons) {
    program.progress.completedLessons = [];
  }
  if (!program.progress.completedChallenges) {
    program.progress.completedChallenges = [];
  }
  if (!program.progress.challengeHistory) {
    program.progress.challengeHistory = [];
  }
  if (!program.progress.totalScore) {
    program.progress.totalScore = 0;
  }
  
  // Khởi tạo Map nếu chưa có hoặc không phải Map
  if (!program.progress.lessonStars || !(program.progress.lessonStars instanceof Map)) {
    program.progress.lessonStars = new Map(program.progress.lessonStars || []);
  }
  if (!program.progress.challengeStars || !(program.progress.challengeStars instanceof Map)) {
    program.progress.challengeStars = new Map(program.progress.challengeStars || []);
  }
  if (!program.progress.challengeProgress || !(program.progress.challengeProgress instanceof Map)) {
    program.progress.challengeProgress = new Map(program.progress.challengeProgress || []);
  }
  
  return program;
};

userSchema.methods.enrollProgram = function(programId, programName, currentClass = null) {
  const existing = this.programs.find(p => p.programId === programId);
  if (existing) {
    // Đảm bảo progress được khởi tạo cho program đã tồn tại
    this.ensureProgramProgress(programId);
    return existing;
  }

  const newProgram = {
    programId,
    programName,
    currentClass: currentClass,
    enrolledAt: new Date(),
    studyTime: 0,
    studyStreak: {
      currentStreak: 0,
      longestStreak: 0,
      lastStudyDate: null,
      streakHistory: []
    },
    progress: {
      completedLessons: [],
      completedChallenges: [],
      lessonStars: new Map(),
      challengeStars: new Map(),
      challengeProgress: new Map(),
      challengeHistory: [],
      totalScore: 0,
      lastStudyDate: null
    }
  };

  this.programs.push(newProgram);
  this.markModified('programs');
  return this.programs[this.programs.length - 1];
};

userSchema.methods.updateProgramProgress = function(programId, classId, lessonId, score) {
  let program = this.programs.find(p => p.programId === programId);
  
  // Nếu chưa có program, tự động tạo mới
  if (!program) {
    const programNames = {
      chemistry: 'Hóa học',
      physics: 'Vật lý',
      biology: 'Sinh học',
      math: 'Toán học'
    };
    
    const newProgram = {
      programId: programId,
      programName: programNames[programId] || programId,
      currentClass: parseInt(classId),
      isActive: true,
      placementTestCompleted: false,
      enrolledAt: new Date(),
      progress: {
        completedLessons: [],
        totalScore: 0,
        lastStudyDate: null
      }
    };
    
    this.programs.push(newProgram);
    // Lấy lại reference từ array sau khi push
    program = this.programs[this.programs.length - 1];
    console.log('✅ Auto-created program:', programId, 'with lesson:', lessonId);
  }

  // Chỉ cập nhật currentClass nếu chưa có hoặc nếu lớp mới cao hơn
  // (không ghi đè currentClass xuống lớp thấp hơn khi user làm lại bài cũ)
  const lessonClassId = parseInt(classId);
  if (!program.currentClass || lessonClassId > program.currentClass) {
    program.currentClass = lessonClassId;
  }
  
  console.log('📝 Updating program:', {
    programId,
    currentClass: program.currentClass,
    lessonClassId: lessonClassId
  });
  
  // Tạo unique ID cho bài học: classId * 1000 + lessonId
  // Ví dụ: Lớp 8, Bài 1 -> 8001, Lớp 9, Bài 1 -> 9001
  const uniqueLessonId = parseInt(classId) * 1000 + parseInt(lessonId);
  
  // Thêm bài đã hoàn thành (kiểm tra trùng)
  if (!program.progress.completedLessons) {
    program.progress.completedLessons = [];
  }
  
  if (lessonId && !program.progress.completedLessons.includes(uniqueLessonId)) {
    program.progress.completedLessons.push(uniqueLessonId);
    console.log('✅ Added completed lesson:', uniqueLessonId);
  }
  
  // Cập nhật điểm
  if (score) {
    program.progress.totalScore = (program.progress.totalScore || 0) + score;
  }
  
  program.progress.lastStudyDate = new Date();
  
  // Đánh dấu programs array đã thay đổi để Mongoose lưu đúng
  this.markModified('programs');
  
  return program;
};

// Update lesson stars based on score percentage
userSchema.methods.updateLessonStars = function(programId, classId, lessonId, percentage) {
  const program = this.programs.find(p => p.programId === programId);
  if (!program) return null;

  const uniqueLessonId = parseInt(classId) * 1000 + parseInt(lessonId);
  
  // Initialize lessonStars Map if not exists
  if (!program.progress.lessonStars) {
    program.progress.lessonStars = new Map();
  }

  // Calculate stars: >=50%: 1 star, >=80%: 2 stars, 100%: 3 stars
  let stars = 0;
  if (percentage >= 100) {
    stars = 3;
  } else if (percentage >= 80) {
    stars = 2;
  } else if (percentage >= 50) {
    stars = 1;
  }

  // Only update if new stars are better than existing
  const currentStars = program.progress.lessonStars.get(uniqueLessonId.toString()) || 0;
  if (stars > currentStars) {
    program.progress.lessonStars.set(uniqueLessonId.toString(), stars);
    console.log(`⭐ Updated lesson ${uniqueLessonId} stars: ${currentStars} → ${stars}`);
  }

  this.markModified('programs');
  return stars;
};

userSchema.methods.getProgram = function(programId) {
  return this.programs.find(p => p.programId === programId);
};

// Methods - Study Time & Streak
userSchema.methods.updateStudyTime = function(programId, durationMinutes) {
  const program = this.programs.find(p => p.programId === programId);
  if (!program) return null;

  // Cập nhật tổng thời gian học
  if (!program.studyTime) {
    program.studyTime = 0;
  }
  program.studyTime += durationMinutes;

  // Cập nhật streak history
  if (!program.studyStreak) {
    program.studyStreak = {
      currentStreak: 0,
      longestStreak: 0,
      lastStudyDate: null,
      streakHistory: []
    };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastStudyDate = program.studyStreak.lastStudyDate 
    ? new Date(program.studyStreak.lastStudyDate) 
    : null;
  
  if (lastStudyDate) {
    lastStudyDate.setHours(0, 0, 0, 0);
  }

  // Kiểm tra xem đã học hôm nay chưa
  const todayEntry = program.studyStreak.streakHistory.find(entry => {
    const entryDate = new Date(entry.date);
    entryDate.setHours(0, 0, 0, 0);
    return entryDate.getTime() === today.getTime();
  });

  if (todayEntry) {
    // Đã học hôm nay, chỉ cộng thêm thời gian
    todayEntry.duration += durationMinutes;
  } else {
    // Chưa học hôm nay, thêm entry mới
    program.studyStreak.streakHistory.push({
      date: today,
      duration: durationMinutes
    });

    // Cập nhật streak - đếm ngược từ hôm nay
    // Sort history by date descending
    const sortedHistory = program.studyStreak.streakHistory
      .map(h => new Date(h.date))
      .sort((a, b) => b - a);
    
    let streak = 0;
    let checkDate = new Date(today);
    checkDate.setHours(0, 0, 0, 0);
    
    // Đếm ngược từ hôm nay để tìm chuỗi liên tiếp
    for (const historyDate of sortedHistory) {
      const hDate = new Date(historyDate);
      hDate.setHours(0, 0, 0, 0);
      
      if (hDate.getTime() === checkDate.getTime()) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1); // Lùi về 1 ngày trước
      } else {
        break; // Gặp ngày không liên tiếp, dừng
      }
    }
    
    program.studyStreak.currentStreak = streak;

    // Cập nhật longest streak
    if (program.studyStreak.currentStreak > program.studyStreak.longestStreak) {
      program.studyStreak.longestStreak = program.studyStreak.currentStreak;
    }

    program.studyStreak.lastStudyDate = today;
  }

  // Giữ lại 365 ngày gần nhất trong history
  if (program.studyStreak.streakHistory.length > 365) {
    program.studyStreak.streakHistory.sort((a, b) => b.date - a.date);
    program.studyStreak.streakHistory = program.studyStreak.streakHistory.slice(0, 365);
  }

  this.markModified('programs');
  
  return {
    studyTime: program.studyTime,
    currentStreak: program.studyStreak.currentStreak,
    longestStreak: program.studyStreak.longestStreak
  };
};

// Kiểm tra và reset streak nếu bỏ lỡ ngày học
userSchema.methods.checkAndResetStreak = function(programId) {
  const program = this.programs.find(p => p.programId === programId);
  if (!program || !program.studyStreak || !program.studyStreak.lastStudyDate) {
    return null;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const lastStudyDate = new Date(program.studyStreak.lastStudyDate);
  lastStudyDate.setHours(0, 0, 0, 0);

  const daysDiff = Math.floor((today - lastStudyDate) / (1000 * 60 * 60 * 24));

  // Nếu bỏ lỡ hơn 1 ngày, reset streak
  if (daysDiff > 1) {
    program.studyStreak.currentStreak = 0;
    this.markModified('programs');
    return {
      reset: true,
      currentStreak: 0,
      longestStreak: program.studyStreak.longestStreak
    };
  }

  return {
    reset: false,
    currentStreak: program.studyStreak.currentStreak,
    longestStreak: program.studyStreak.longestStreak
  };
};

module.exports = mongoose.model('User', userSchema);
