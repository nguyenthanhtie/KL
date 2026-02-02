const mongoose = require('mongoose');

const classRoomSchema = new mongoose.Schema({
  // Thông tin lớp học
  name: {
    type: String,
    required: true,
    trim: true
  },
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  
  // Khối lớp (8, 9, 10, 11, 12)
  grade: {
    type: Number,
    required: true,
    enum: [8, 9, 10, 11, 12]
  },
  
  // Môn học
  subject: {
    type: String,
    default: 'chemistry',
    enum: ['chemistry', 'physics', 'biology', 'math']
  },
  
  // Chương trình học
  curriculumType: {
    type: String,
    enum: ['ketnoi', 'canhdieu', 'chantroicangtao', 'standard'],
    default: 'ketnoi'
  },
  
  // Giáo viên chủ nhiệm / Giáo viên bộ môn
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Danh sách học sinh
  students: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    enrolledAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'pending'],
      default: 'active'
    }
  }],
  
  // Cài đặt lớp học
  settings: {
    isPublic: { type: Boolean, default: false }, // Lớp công khai hay riêng tư
    allowSelfEnroll: { type: Boolean, default: false }, // Cho phép học sinh tự đăng ký
    maxStudents: { type: Number, default: 50 },
    requireApproval: { type: Boolean, default: true } // Yêu cầu duyệt khi học sinh tham gia
  },
  
  // Bài tập được giao
  assignments: [{
    title: { type: String, required: true },
    description: { type: String },
    type: {
      type: String,
      enum: ['lesson', 'challenge', 'quiz', 'homework'],
      default: 'lesson'
    },
    // Reference to lesson or challenge
    lessonId: { type: Number }, // lessonId trong hệ thống (e.g., 8001 for class 8, lesson 1)
    challengeSlug: { type: String }, // challengeSlug nếu là challenge
    
    dueDate: { type: Date },
    points: { type: Number, default: 100 },
    
    // Thống kê hoàn thành
    completedBy: [{
      student: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      completedAt: { type: Date },
      score: { type: Number },
      stars: { type: Number }
    }],
    
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
  }],
  
  // Thông báo của lớp
  announcements: [{
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isPinned: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  }],
  
  // Thống kê lớp học
  statistics: {
    totalLessonsCompleted: { type: Number, default: 0 },
    totalChallengesCompleted: { type: Number, default: 0 },
    averageScore: { type: Number, default: 0 },
    activeStudents: { type: Number, default: 0 }, // Học sinh hoạt động trong 7 ngày
    lastUpdated: { type: Date }
  },
  
  // Trạng thái lớp học
  status: {
    type: String,
    enum: ['active', 'archived', 'pending'],
    default: 'active'
  },
  
  // Năm học
  academicYear: {
    type: String,
    default: () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();
      // Năm học bắt đầu từ tháng 9
      if (month >= 8) {
        return `${year}-${year + 1}`;
      }
      return `${year - 1}-${year}`;
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

// Middleware cập nhật updatedAt
classRoomSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Tạo mã lớp học ngẫu nhiên
classRoomSchema.statics.generateClassCode = async function() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code;
  let isUnique = false;
  
  while (!isUnique) {
    code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    const existing = await this.findOne({ code });
    if (!existing) {
      isUnique = true;
    }
  }
  
  return code;
};

// Lấy thống kê lớp học
classRoomSchema.methods.updateStatistics = async function() {
  const User = mongoose.model('User');
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  
  let totalLessons = 0;
  let totalChallenges = 0;
  let totalScores = 0;
  let scoreCount = 0;
  let activeCount = 0;
  
  for (const studentEntry of this.students) {
    if (studentEntry.status !== 'active') continue;
    
    const student = await User.findById(studentEntry.student);
    if (!student) continue;
    
    const program = student.programs?.find(p => p.programId === this.subject);
    if (program) {
      totalLessons += program.progress?.completedLessons?.length || 0;
      totalChallenges += program.progress?.completedChallenges?.length || 0;
      
      if (program.progress?.totalScore) {
        totalScores += program.progress.totalScore;
        scoreCount++;
      }
      
      // Check if active in last 7 days
      if (program.progress?.lastStudyDate && new Date(program.progress.lastStudyDate) >= sevenDaysAgo) {
        activeCount++;
      }
    }
  }
  
  this.statistics = {
    totalLessonsCompleted: totalLessons,
    totalChallengesCompleted: totalChallenges,
    averageScore: scoreCount > 0 ? Math.round(totalScores / scoreCount) : 0,
    activeStudents: activeCount,
    lastUpdated: new Date()
  };
  
  return this.statistics;
};

// Virtual: Số lượng học sinh
classRoomSchema.virtual('studentCount').get(function() {
  return this.students.filter(s => s.status === 'active').length;
});

// Index for faster queries
classRoomSchema.index({ teacher: 1 });
classRoomSchema.index({ code: 1 });
classRoomSchema.index({ 'students.student': 1 });
classRoomSchema.index({ grade: 1, subject: 1 });

module.exports = mongoose.model('ClassRoom', classRoomSchema);
