const express = require('express');
const router = express.Router();
const User = require('../models/User.cjs');
const ClassRoom = require('../models/ClassRoom.cjs');
const Assignment = require('../models/Assignment.cjs');
const Lesson = require('../models/Lesson.cjs');
const Challenge = require('../models/Challenge.cjs');
const { authMiddleware, adminMiddleware, checkAdminPermission } = require('../middleware/roleAuth.cjs');

// Tất cả routes đều yêu cầu đăng nhập và là admin
router.use(authMiddleware);
router.use(adminMiddleware);

// ==================== DASHBOARD STATS ====================

// GET /api/admin/dashboard - Lấy thống kê tổng quan
router.get('/dashboard', async (req, res) => {
  try {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    // Đếm số lượng users theo role
    const [totalUsers, totalStudents, totalTeachers, totalAdmins] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: 'student' }),
      User.countDocuments({ role: 'teacher' }),
      User.countDocuments({ role: 'admin' })
    ]);
    
    // Người dùng mới trong 30 ngày
    const newUsersThisMonth = await User.countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });
    
    // Người dùng hoạt động trong 7 ngày
    const activeUsers = await User.countDocuments({
      'programs.progress.lastStudyDate': { $gte: sevenDaysAgo }
    });
    
    // Thống kê lớp học
    const [totalClasses, activeClasses] = await Promise.all([
      ClassRoom.countDocuments(),
      ClassRoom.countDocuments({ status: 'active' })
    ]);
    
    // Thống kê bài học và thử thách
    const [totalLessons, totalChallenges] = await Promise.all([
      Lesson.countDocuments(),
      Challenge.countDocuments()
    ]);
    
    // Thống kê assignments
    const totalAssignments = await Assignment.countDocuments();
    const activeAssignments = await Assignment.countDocuments({ status: 'active' });
    
    // Thống kê XP và Level trung bình
    const xpStats = await User.aggregate([
      { $match: { role: 'student' } },
      {
        $group: {
          _id: null,
          avgXP: { $avg: '$xp' },
          avgLevel: { $avg: '$level' },
          maxXP: { $max: '$xp' },
          maxLevel: { $max: '$level' }
        }
      }
    ]);
    
    // Top 10 học sinh theo XP
    const topStudents = await User.find({ role: 'student' })
      .sort({ xp: -1 })
      .limit(10)
      .select('username displayName email xp level avatar');
    
    // Thống kê người dùng theo tháng (6 tháng gần nhất)
    const sixMonthsAgo = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
    const usersByMonth = await User.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);
    
    res.json({
      success: true,
      data: {
        users: {
          total: totalUsers,
          students: totalStudents,
          teachers: totalTeachers,
          admins: totalAdmins,
          newThisMonth: newUsersThisMonth,
          activeThisWeek: activeUsers
        },
        classes: {
          total: totalClasses,
          active: activeClasses
        },
        content: {
          lessons: totalLessons,
          challenges: totalChallenges
        },
        assignments: {
          total: totalAssignments,
          active: activeAssignments
        },
        performance: xpStats[0] || { avgXP: 0, avgLevel: 1, maxXP: 0, maxLevel: 1 },
        topStudents,
        usersByMonth
      }
    });
  } catch (error) {
    console.error('Admin dashboard error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// ==================== USER MANAGEMENT ====================

// GET /api/admin/users - Lấy danh sách người dùng
router.get('/users', checkAdminPermission('users'), async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      role, 
      search, 
      sortBy = 'createdAt', 
      sortOrder = 'desc' 
    } = req.query;
    
    const query = {};
    
    if (role && role !== 'all') {
      query.role = role;
    }
    
    if (search) {
      query.$or = [
        { username: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { displayName: { $regex: search, $options: 'i' } }
      ];
    }
    
    const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };
    
    const [users, total] = await Promise.all([
      User.find(query)
        .select('-password')
        .sort(sort)
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .lean(),
      User.countDocuments(query)
    ]);
    
    res.json({
      success: true,
      data: {
        users,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// GET /api/admin/users/:userId - Lấy chi tiết người dùng
router.get('/users/:userId', checkAdminPermission('users'), async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .select('-password')
      .populate('assignedTeacher', 'username displayName email')
      .populate('students', 'username displayName email xp level')
      .populate('managedClasses', 'name code grade studentCount');
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng' });
    }
    
    res.json({ success: true, data: user });
  } catch (error) {
    console.error('Get user detail error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// PUT /api/admin/users/:userId - Cập nhật người dùng
router.put('/users/:userId', checkAdminPermission('users'), async (req, res) => {
  try {
    const { role, displayName, email, teacherInfo, adminInfo, status } = req.body;
    const userId = req.params.userId;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng' });
    }
    
    // Không cho phép thay đổi role của admin cuối cùng
    if (user.role === 'admin' && role !== 'admin') {
      const adminCount = await User.countDocuments({ role: 'admin' });
      if (adminCount <= 1) {
        return res.status(400).json({ 
          success: false, 
          message: 'Không thể bỏ quyền admin của admin cuối cùng' 
        });
      }
    }
    
    // Cập nhật thông tin
    if (role) user.role = role;
    if (displayName) user.displayName = displayName;
    if (email) user.email = email;
    
    // Cập nhật thông tin giáo viên
    if (role === 'teacher' && teacherInfo) {
      user.teacherInfo = {
        ...user.teacherInfo,
        ...teacherInfo,
        verifiedAt: teacherInfo.verified ? new Date() : user.teacherInfo?.verifiedAt,
        verifiedBy: teacherInfo.verified ? req.user._id : user.teacherInfo?.verifiedBy
      };
    }
    
    // Cập nhật quyền admin
    if (role === 'admin' && adminInfo) {
      user.adminInfo = {
        ...user.adminInfo,
        ...adminInfo,
        assignedBy: req.user._id,
        assignedAt: new Date()
      };
    }
    
    await user.save();
    
    res.json({ 
      success: true, 
      message: 'Cập nhật thành công',
      data: user 
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// DELETE /api/admin/users/:userId - Xóa người dùng
router.delete('/users/:userId', checkAdminPermission('users'), async (req, res) => {
  try {
    const userId = req.params.userId;
    
    // Không cho xóa chính mình
    if (userId === req.user._id.toString()) {
      return res.status(400).json({ 
        success: false, 
        message: 'Không thể xóa chính mình' 
      });
    }
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng' });
    }
    
    // Kiểm tra admin cuối cùng
    if (user.role === 'admin') {
      const adminCount = await User.countDocuments({ role: 'admin' });
      if (adminCount <= 1) {
        return res.status(400).json({ 
          success: false, 
          message: 'Không thể xóa admin cuối cùng' 
        });
      }
    }
    
    // Xóa user khỏi các lớp học
    await ClassRoom.updateMany(
      { 'students.student': userId },
      { $pull: { students: { student: userId } } }
    );
    
    // Nếu là giáo viên, cần xử lý lớp học của họ
    if (user.role === 'teacher') {
      // Có thể chuyển lớp cho admin hoặc giáo viên khác
      // Hoặc đánh dấu lớp cần xử lý
      await ClassRoom.updateMany(
        { teacher: userId },
        { status: 'pending', $set: { 'notes': 'Giáo viên đã bị xóa - cần chuyển giao' } }
      );
    }
    
    await User.findByIdAndDelete(userId);
    
    res.json({ 
      success: true, 
      message: 'Xóa người dùng thành công' 
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// POST /api/admin/users/:userId/change-role - Thay đổi role người dùng
router.post('/users/:userId/change-role', checkAdminPermission('users'), async (req, res) => {
  try {
    const { role, teacherInfo, adminInfo } = req.body;
    const userId = req.params.userId;
    
    if (!['student', 'teacher', 'admin'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Role không hợp lệ' });
    }
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng' });
    }
    
    const oldRole = user.role;
    user.role = role;
    
    // Thiết lập thông tin theo role mới
    if (role === 'teacher') {
      user.teacherInfo = {
        school: teacherInfo?.school || '',
        subject: teacherInfo?.subject || 'chemistry',
        department: teacherInfo?.department || '',
        yearsOfExperience: teacherInfo?.yearsOfExperience || 0,
        qualification: teacherInfo?.qualification || '',
        bio: teacherInfo?.bio || '',
        verifiedAt: new Date(),
        verifiedBy: req.user._id
      };
      user.students = [];
      user.managedClasses = [];
    } else if (role === 'admin') {
      user.adminInfo = {
        permissions: adminInfo?.permissions || ['all'],
        assignedBy: req.user._id,
        assignedAt: new Date()
      };
    }
    
    await user.save();
    
    res.json({ 
      success: true, 
      message: `Đã thay đổi role từ ${oldRole} thành ${role}`,
      data: user 
    });
  } catch (error) {
    console.error('Change role error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// ==================== TEACHER MANAGEMENT ====================

// GET /api/admin/teachers - Lấy danh sách giáo viên
router.get('/teachers', checkAdminPermission('teachers'), async (req, res) => {
  try {
    const { page = 1, limit = 20, search, verified } = req.query;
    
    const query = { role: 'teacher' };
    
    if (search) {
      query.$or = [
        { username: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { displayName: { $regex: search, $options: 'i' } },
        { 'teacherInfo.school': { $regex: search, $options: 'i' } }
      ];
    }
    
    if (verified === 'true') {
      query['teacherInfo.verifiedAt'] = { $exists: true };
    } else if (verified === 'false') {
      query['teacherInfo.verifiedAt'] = { $exists: false };
    }
    
    const [teachers, total] = await Promise.all([
      User.find(query)
        .select('-password')
        .populate('managedClasses', 'name code grade studentCount')
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .lean(),
      User.countDocuments(query)
    ]);
    
    // Thêm thống kê cho mỗi giáo viên
    const teachersWithStats = await Promise.all(teachers.map(async (teacher) => {
      const classCount = await ClassRoom.countDocuments({ teacher: teacher._id });
      const studentCount = await User.countDocuments({ assignedTeacher: teacher._id });
      
      return {
        ...teacher,
        stats: {
          classCount,
          studentCount
        }
      };
    }));
    
    res.json({
      success: true,
      data: {
        teachers: teachersWithStats,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get teachers error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// POST /api/admin/teachers/:teacherId/verify - Xác minh giáo viên
router.post('/teachers/:teacherId/verify', checkAdminPermission('teachers'), async (req, res) => {
  try {
    const teacher = await User.findOne({ 
      _id: req.params.teacherId, 
      role: 'teacher' 
    });
    
    if (!teacher) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy giáo viên' });
    }
    
    teacher.teacherInfo.verifiedAt = new Date();
    teacher.teacherInfo.verifiedBy = req.user._id;
    
    await teacher.save();
    
    res.json({ 
      success: true, 
      message: 'Đã xác minh giáo viên thành công',
      data: teacher 
    });
  } catch (error) {
    console.error('Verify teacher error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// ==================== CLASS MANAGEMENT ====================

// GET /api/admin/classes - Lấy danh sách tất cả lớp học
router.get('/classes', checkAdminPermission('classes'), async (req, res) => {
  try {
    const { page = 1, limit = 20, grade, status, teacherId, search } = req.query;
    
    const query = {};
    
    if (grade) query.grade = parseInt(grade);
    if (status) query.status = status;
    if (teacherId) query.teacher = teacherId;
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { code: { $regex: search, $options: 'i' } }
      ];
    }
    
    const [classes, total] = await Promise.all([
      ClassRoom.find(query)
        .populate('teacher', 'username displayName email')
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .lean(),
      ClassRoom.countDocuments(query)
    ]);
    
    // Thêm số lượng học sinh
    const classesWithStats = classes.map(c => ({
      ...c,
      studentCount: c.students?.filter(s => s.status === 'active').length || 0
    }));
    
    res.json({
      success: true,
      data: {
        classes: classesWithStats,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get classes error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// PUT /api/admin/classes/:classId/transfer - Chuyển lớp cho giáo viên khác
router.put('/classes/:classId/transfer', checkAdminPermission('classes'), async (req, res) => {
  try {
    const { newTeacherId } = req.body;
    
    const newTeacher = await User.findOne({ _id: newTeacherId, role: 'teacher' });
    if (!newTeacher) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy giáo viên mới' });
    }
    
    const classRoom = await ClassRoom.findById(req.params.classId);
    if (!classRoom) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy lớp học' });
    }
    
    const oldTeacherId = classRoom.teacher;
    
    // Cập nhật giáo viên mới
    classRoom.teacher = newTeacherId;
    await classRoom.save();
    
    // Cập nhật managedClasses của giáo viên cũ và mới
    await User.findByIdAndUpdate(oldTeacherId, {
      $pull: { managedClasses: classRoom._id }
    });
    
    await User.findByIdAndUpdate(newTeacherId, {
      $addToSet: { managedClasses: classRoom._id }
    });
    
    res.json({ 
      success: true, 
      message: 'Chuyển lớp thành công',
      data: classRoom 
    });
  } catch (error) {
    console.error('Transfer class error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// ==================== REPORTS ====================

// GET /api/admin/reports/learning - Báo cáo học tập tổng quan
router.get('/reports/learning', checkAdminPermission('reports'), async (req, res) => {
  try {
    const { startDate, endDate, grade } = req.query;
    
    const dateFilter = {};
    if (startDate) dateFilter.$gte = new Date(startDate);
    if (endDate) dateFilter.$lte = new Date(endDate);
    
    // Thống kê hoàn thành bài học theo khối
    const lessonStats = await User.aggregate([
      { $match: { role: 'student' } },
      { $unwind: '$programs' },
      {
        $group: {
          _id: '$programs.currentClass',
          totalStudents: { $sum: 1 },
          avgCompletedLessons: { $avg: { $size: '$programs.progress.completedLessons' } },
          avgStudyTime: { $avg: '$programs.studyTime' },
          avgStreak: { $avg: '$programs.studyStreak.currentStreak' }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    
    // Thống kê XP theo thời gian
    const xpDistribution = await User.aggregate([
      { $match: { role: 'student' } },
      {
        $bucket: {
          groupBy: '$xp',
          boundaries: [0, 100, 500, 1000, 2500, 5000, 10000, Infinity],
          default: 'Other',
          output: { count: { $sum: 1 } }
        }
      }
    ]);
    
    // Thống kê level
    const levelDistribution = await User.aggregate([
      { $match: { role: 'student' } },
      {
        $group: {
          _id: '$level',
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    
    res.json({
      success: true,
      data: {
        lessonStats,
        xpDistribution,
        levelDistribution
      }
    });
  } catch (error) {
    console.error('Learning report error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// GET /api/admin/reports/activity - Báo cáo hoạt động
router.get('/reports/activity', checkAdminPermission('reports'), async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    // Hoạt động theo ngày (30 ngày gần nhất)
    const dailyActivity = await User.aggregate([
      { $unwind: '$programs' },
      { $unwind: '$programs.studyStreak.streakHistory' },
      { $match: { 'programs.studyStreak.streakHistory.date': { $gte: thirtyDaysAgo } } },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$programs.studyStreak.streakHistory.date' }
          },
          activeUsers: { $addToSet: '$_id' },
          totalMinutes: { $sum: '$programs.studyStreak.streakHistory.duration' }
        }
      },
      {
        $project: {
          date: '$_id',
          activeUsers: { $size: '$activeUsers' },
          totalMinutes: 1
        }
      },
      { $sort: { date: 1 } }
    ]);
    
    res.json({
      success: true,
      data: {
        dailyActivity
      }
    });
  } catch (error) {
    console.error('Activity report error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// ==================== SYSTEM SETTINGS ====================

// POST /api/admin/create-admin - Tạo admin mới (chỉ super admin)
router.post('/create-admin', async (req, res) => {
  try {
    const { userId, permissions } = req.body;
    
    // Kiểm tra người tạo có quyền 'all' không
    if (!req.user.adminInfo?.permissions?.includes('all')) {
      return res.status(403).json({ 
        success: false, 
        message: 'Chỉ Super Admin mới có quyền tạo admin mới' 
      });
    }
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng' });
    }
    
    user.role = 'admin';
    user.adminInfo = {
      permissions: permissions || ['users', 'lessons', 'classes'],
      assignedBy: req.user._id,
      assignedAt: new Date()
    };
    
    await user.save();
    
    res.json({ 
      success: true, 
      message: 'Tạo admin thành công',
      data: user 
    });
  } catch (error) {
    console.error('Create admin error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

module.exports = router;
