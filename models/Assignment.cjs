const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  // Thông tin bài tập
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  instructions: {
    type: String,
    default: ''
  },
  
  // Loại bài tập
  type: {
    type: String,
    enum: ['lesson', 'challenge', 'quiz', 'homework', 'practice', 'exam'],
    required: true
  },
  
  // Reference đến nội dung
  content: {
    lessonId: { type: Number }, // Unique lesson ID (e.g., 8001)
    challengeSlug: { type: String },
    classGrade: { type: Number }, // Khối lớp
    chapterId: { type: Number },
    customQuestions: [{
      question: String,
      type: { type: String, enum: ['multiple-choice', 'true-false', 'fill-in', 'essay'] },
      options: [String],
      correctAnswer: mongoose.Schema.Types.Mixed,
      points: { type: Number, default: 10 },
      explanation: String
    }]
  },
  
  // Giáo viên tạo
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Giao cho lớp nào
  assignedTo: {
    classRoom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ClassRoom'
    },
    // Hoặc giao trực tiếp cho học sinh
    students: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  
  // Thời gian
  schedule: {
    assignedAt: { type: Date, default: Date.now },
    dueDate: { type: Date },
    lateSubmissionAllowed: { type: Boolean, default: false },
    lateSubmissionDeadline: { type: Date },
    timeLimit: { type: Number } // Thời gian làm bài (phút), null = không giới hạn
  },
  
  // Điểm số
  grading: {
    maxPoints: { type: Number, default: 100 },
    passingScore: { type: Number, default: 50 }, // % để đạt
    weightInClass: { type: Number, default: 1 }, // Hệ số điểm
    allowRetry: { type: Boolean, default: true },
    maxRetries: { type: Number, default: 3 }, // -1 = không giới hạn
    showAnswersAfter: {
      type: String,
      enum: ['immediately', 'after-due', 'never', 'after-grading'],
      default: 'immediately'
    }
  },
  
  // Bài nộp của học sinh
  submissions: [{
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    submittedAt: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ['in-progress', 'submitted', 'graded', 'late', 'missed'],
      default: 'in-progress'
    },
    attempt: { type: Number, default: 1 },
    
    // Kết quả
    answers: mongoose.Schema.Types.Mixed, // Câu trả lời của học sinh
    score: { type: Number },
    percentage: { type: Number },
    stars: { type: Number, min: 0, max: 3 },
    timeSpent: { type: Number }, // Thời gian làm bài (giây)
    
    // Nhận xét của giáo viên
    feedback: {
      comment: String,
      gradedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      gradedAt: Date
    },
    
    // Lịch sử các lần thử
    attempts: [{
      attempt: Number,
      submittedAt: Date,
      score: Number,
      percentage: Number,
      timeSpent: Number
    }]
  }],
  
  // Thống kê
  statistics: {
    totalSubmissions: { type: Number, default: 0 },
    completionRate: { type: Number, default: 0 }, // %
    averageScore: { type: Number, default: 0 },
    highestScore: { type: Number, default: 0 },
    lowestScore: { type: Number },
    averageTimeSpent: { type: Number, default: 0 },
    passRate: { type: Number, default: 0 } // % học sinh đạt
  },
  
  // Trạng thái
  status: {
    type: String,
    enum: ['draft', 'scheduled', 'active', 'closed', 'archived'],
    default: 'draft'
  },
  
  // Cài đặt hiển thị
  visibility: {
    showInStudentDashboard: { type: Boolean, default: true },
    showLeaderboard: { type: Boolean, default: false },
    notifyStudents: { type: Boolean, default: true }
  },
  
  // Tags để phân loại
  tags: [String],
  
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware
assignmentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Cập nhật thống kê
assignmentSchema.methods.updateStatistics = function() {
  const submissions = this.submissions.filter(s => s.status === 'submitted' || s.status === 'graded');
  
  if (submissions.length === 0) {
    this.statistics = {
      totalSubmissions: 0,
      completionRate: 0,
      averageScore: 0,
      highestScore: 0,
      lowestScore: null,
      averageTimeSpent: 0,
      passRate: 0
    };
    return this.statistics;
  }
  
  const totalAssigned = this.assignedTo.students?.length || 0;
  const scores = submissions.map(s => s.score).filter(s => s !== undefined);
  const times = submissions.map(s => s.timeSpent).filter(t => t !== undefined);
  const passing = submissions.filter(s => s.percentage >= this.grading.passingScore);
  
  this.statistics = {
    totalSubmissions: submissions.length,
    completionRate: totalAssigned > 0 ? Math.round((submissions.length / totalAssigned) * 100) : 0,
    averageScore: scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0,
    highestScore: scores.length > 0 ? Math.max(...scores) : 0,
    lowestScore: scores.length > 0 ? Math.min(...scores) : null,
    averageTimeSpent: times.length > 0 ? Math.round(times.reduce((a, b) => a + b, 0) / times.length) : 0,
    passRate: submissions.length > 0 ? Math.round((passing.length / submissions.length) * 100) : 0
  };
  
  return this.statistics;
};

// Lấy submission của học sinh
assignmentSchema.methods.getStudentSubmission = function(studentId) {
  return this.submissions.find(s => s.student.toString() === studentId.toString());
};

// Kiểm tra còn hạn nộp không
assignmentSchema.methods.isOverdue = function() {
  if (!this.schedule.dueDate) return false;
  return new Date() > new Date(this.schedule.dueDate);
};

// Index
assignmentSchema.index({ createdBy: 1 });
assignmentSchema.index({ 'assignedTo.classRoom': 1 });
assignmentSchema.index({ 'assignedTo.students': 1 });
assignmentSchema.index({ status: 1 });
assignmentSchema.index({ 'schedule.dueDate': 1 });

module.exports = mongoose.model('Assignment', assignmentSchema);
