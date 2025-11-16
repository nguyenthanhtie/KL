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
  
  // Profile information
  profile: {
    grade: Number, // Lớp học hiện tại sau khi làm placement test
    bio: String,
    avatar: String
  },
  
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
  
  // Chương trình học
  programs: [{
    programId: {
      type: String,
      required: true,
      enum: ['chemistry', 'physics', 'biology', 'math']
    },
    programName: String,
    currentClass: Number, // Lớp đang học (8, 9, 10, 11, 12)
    currentLesson: Number, // Bài đang học
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
    progress: {
      completedLessons: [Number], // Danh sách ID các bài đã hoàn thành
      totalScore: {
        type: Number,
        default: 0
      },
      lastStudyDate: Date
    }
  }],
  
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
userSchema.methods.enrollProgram = function(programId, programName, currentClass = null) {
  const existing = this.programs.find(p => p.programId === programId);
  if (existing) return existing;

  const newProgram = {
    programId,
    programName,
    currentClass: currentClass, // Lớp được chọn khi đăng ký
    currentLesson: null, // Để trống khi đăng nhập lần đầu
    enrolledAt: new Date(),
    progress: {
      completedLessons: [],
      totalScore: 0,
      lastStudyDate: null
    }
  };

  this.programs.push(newProgram);
  return newProgram;
};

userSchema.methods.updateProgramProgress = function(programId, classId, lessonId, score) {
  const program = this.programs.find(p => p.programId === programId);
  if (!program) return null;

  // Cập nhật lớp và bài hiện tại
  program.currentClass = classId;
  program.currentLesson = lessonId;
  
  // Thêm bài đã hoàn thành
  if (lessonId && !program.progress.completedLessons.includes(lessonId)) {
    program.progress.completedLessons.push(lessonId);
  }
  
  // Cập nhật điểm
  if (score) {
    program.progress.totalScore += score;
  }
  
  program.progress.lastStudyDate = new Date();
  
  return program;
};

userSchema.methods.getProgram = function(programId) {
  return this.programs.find(p => p.programId === programId);
};

module.exports = mongoose.model('User', userSchema);
