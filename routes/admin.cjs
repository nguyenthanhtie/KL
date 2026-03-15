const express = require('express');
const router = express.Router();
const User = require('../models/User.cjs');
const ClassRoom = require('../models/ClassRoom.cjs');
const Assignment = require('../models/Assignment.cjs');
const Lesson = require('../models/Lesson.cjs');
const Challenge = require('../models/Challenge.cjs');
const AuditLog = require('../models/AuditLog.cjs');
const Notification = require('../models/Notification.cjs');
const SystemSettings = require('../models/SystemSettings.cjs');
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
    const [totalUsers, totalStudents, totalTeachers, totalAdmins, pendingTeachers] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: 'student' }),
      User.countDocuments({ role: 'teacher' }),
      User.countDocuments({ role: 'admin' }),
      User.countDocuments({ teacherStatus: 'pending' })
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
          pendingTeachers: pendingTeachers,
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

// ==================== TEACHER APPROVAL (DUYỆT GIÁO VIÊN) ====================

// GET /api/admin/teacher-requests/count - Đếm yêu cầu pending (cho badge)
router.get('/teacher-requests/count', async (req, res) => {
  try {
    const pendingCount = await User.countDocuments({ teacherStatus: 'pending' });
    res.json({ success: true, data: { pendingCount } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Lỗi server' });
  }
});

// GET /api/admin/teacher-requests - Danh sách yêu cầu giáo viên
router.get('/teacher-requests', checkAdminPermission('teachers'), async (req, res) => {
  try {
    const { page = 1, limit = 20, search, status = 'pending' } = req.query;

    const query = {};
    if (status && status !== 'all') {
      query.teacherStatus = status;
    } else {
      query.teacherStatus = { $in: ['pending', 'approved', 'rejected'] };
    }

    if (search) {
      query.$or = [
        { username: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { displayName: { $regex: search, $options: 'i' } },
        { 'teacherInfo.school': { $regex: search, $options: 'i' } }
      ];
    }

    const [requests, total] = await Promise.all([
      User.find(query)
        .select('-password')
        .sort({ 'teacherInfo.requestedAt': -1, createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .lean(),
      User.countDocuments(query)
    ]);

    res.json({
      success: true,
      data: {
        requests,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get teacher requests error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// POST /api/admin/teacher-requests/:userId/approve - Phê duyệt giáo viên
router.post('/teacher-requests/:userId/approve', checkAdminPermission('teachers'), async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng' });
    }
    if (user.teacherStatus !== 'pending') {
      return res.status(400).json({ success: false, message: 'Yêu cầu này không ở trạng thái chờ duyệt' });
    }

    user.teacherStatus = 'approved';
    user.teacherInfo.verifiedAt = new Date();
    user.teacherInfo.verifiedBy = req.user._id;
    user.students = user.students || [];
    user.managedClasses = user.managedClasses || [];

    await user.save();

    // Gửi thông báo cho giáo viên
    try {
      const Notification = require('../models/Notification.cjs');
      await Notification.create({
        userId: user._id,
        type: 'teacher_approved',
        title: 'Yêu cầu giáo viên đã được phê duyệt!',
        body: 'Chúc mừng! Tài khoản giáo viên của bạn đã được phê duyệt. Bạn có thể bắt đầu sử dụng các tính năng giáo viên.'
      });
    } catch (notifErr) {
      console.error('Notification error:', notifErr);
    }

    // Ghi audit log
    try {
      const AuditLog = require('../models/AuditLog.cjs');
      await AuditLog.create({
        action: 'verify_teacher',
        performedBy: req.user._id,
        targetUser: user._id,
        details: { teacherStatus: 'approved' }
      });
    } catch (auditErr) {
      console.error('Audit log error:', auditErr);
    }

    res.json({
      success: true,
      message: 'Đã phê duyệt giáo viên thành công',
      data: user
    });
  } catch (error) {
    console.error('Approve teacher error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// POST /api/admin/teacher-requests/:userId/reject - Từ chối giáo viên
router.post('/teacher-requests/:userId/reject', checkAdminPermission('teachers'), async (req, res) => {
  try {
    const { reason } = req.body;
    if (!reason || !reason.trim()) {
      return res.status(400).json({ success: false, message: 'Vui lòng nhập lý do từ chối' });
    }

    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng' });
    }
    if (user.teacherStatus !== 'pending') {
      return res.status(400).json({ success: false, message: 'Yêu cầu này không ở trạng thái chờ duyệt' });
    }

    user.teacherStatus = 'rejected';
    user.teacherInfo.rejectionReason = reason;
    user.isLocked = true;
    user.lockReason = `Yêu cầu giáo viên bị từ chối: ${reason}`;
    user.lockedAt = new Date();
    user.lockedBy = req.user._id;

    await user.save();

    // Gửi thông báo cho người dùng
    try {
      const Notification = require('../models/Notification.cjs');
      await Notification.create({
        userId: user._id,
        type: 'teacher_rejected',
        title: 'Yêu cầu giáo viên bị từ chối',
        body: `Yêu cầu tài khoản giáo viên của bạn đã bị từ chối. Lý do: ${reason}`
      });
    } catch (notifErr) {
      console.error('Notification error:', notifErr);
    }

    // Ghi audit log
    try {
      const AuditLog = require('../models/AuditLog.cjs');
      await AuditLog.create({
        action: 'verify_teacher',
        performedBy: req.user._id,
        targetUser: user._id,
        details: { teacherStatus: 'rejected', reason }
      });
    } catch (auditErr) {
      console.error('Audit log error:', auditErr);
    }

    res.json({
      success: true,
      message: 'Đã từ chối yêu cầu giáo viên',
      data: user
    });
  } catch (error) {
    console.error('Reject teacher error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// POST /api/admin/users/:userId/unlock - Mở khóa tài khoản
router.post('/users/:userId/unlock', checkAdminPermission('users'), async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng' });
    }
    if (!user.isLocked) {
      return res.status(400).json({ success: false, message: 'Tài khoản này không bị khóa' });
    }

    user.isLocked = false;
    user.lockReason = '';
    user.lockedAt = undefined;
    user.lockedBy = undefined;

    // Nếu là giáo viên bị từ chối, reset về student
    if (user.teacherStatus === 'rejected') {
      user.role = 'student';
      user.teacherStatus = 'none';
    }

    await user.save();

    // Ghi audit log
    try {
      const AuditLog = require('../models/AuditLog.cjs');
      await AuditLog.create({
        action: 'update_user',
        performedBy: req.user._id,
        targetUser: user._id,
        details: { action: 'unlock' }
      });
    } catch (auditErr) {
      console.error('Audit log error:', auditErr);
    }

    res.json({
      success: true,
      message: 'Đã mở khóa tài khoản',
      data: user
    });
  } catch (error) {
    console.error('Unlock user error:', error);
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

// ==================== AUDIT LOG VIEWER ====================

// GET /api/admin/audit-logs - Xem nhật ký hoạt động
router.get('/audit-logs', checkAdminPermission('all'), async (req, res) => {
  try {
    const {
      page = 1, limit = 20,
      action, search,
      startDate, endDate,
      sortOrder = 'desc'
    } = req.query;

    const query = {};
    if (action && action !== 'all') query.action = action;
    if (startDate || endDate) {
      query.timestamp = {};
      if (startDate) query.timestamp.$gte = new Date(startDate);
      if (endDate) query.timestamp.$lte = new Date(endDate);
    }

    // Nếu có search, tìm users trước rồi filter
    if (search) {
      const matchedUsers = await User.find({
        $or: [
          { username: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
          { displayName: { $regex: search, $options: 'i' } }
        ]
      }).select('_id');
      const userIds = matchedUsers.map(u => u._id);
      query.$or = [
        { performedBy: { $in: userIds } },
        { targetUser: { $in: userIds } }
      ];
    }

    const [logs, total] = await Promise.all([
      AuditLog.find(query)
        .populate('performedBy', 'username displayName email avatar')
        .populate('targetUser', 'username displayName email avatar')
        .sort({ timestamp: sortOrder === 'desc' ? -1 : 1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .lean(),
      AuditLog.countDocuments(query)
    ]);

    res.json({
      success: true,
      data: {
        logs,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get audit logs error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// ==================== SYSTEM SETTINGS (CÀI ĐẶT HỆ THỐNG) ====================

// GET /api/admin/settings - Lấy tất cả cài đặt
router.get('/settings', checkAdminPermission('all'), async (req, res) => {
  try {
    await SystemSettings.initDefaults();
    const settings = await SystemSettings.find()
      .populate('updatedBy', 'username displayName')
      .sort({ category: 1, key: 1 })
      .lean();

    // Nhóm theo category
    const grouped = {};
    settings.forEach(s => {
      if (!grouped[s.category]) grouped[s.category] = [];
      grouped[s.category].push(s);
    });

    res.json({ success: true, data: { settings, grouped } });
  } catch (error) {
    console.error('Get settings error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// PUT /api/admin/settings - Cập nhật cài đặt (bulk)
router.put('/settings', checkAdminPermission('all'), async (req, res) => {
  try {
    const { updates } = req.body; // [{key, value}, ...]
    if (!Array.isArray(updates) || updates.length === 0) {
      return res.status(400).json({ success: false, message: 'Dữ liệu không hợp lệ' });
    }

    const results = [];
    for (const { key, value } of updates) {
      const setting = await SystemSettings.findOneAndUpdate(
        { key },
        { value, updatedBy: req.user._id, updatedAt: new Date() },
        { new: true, upsert: true }
      );
      results.push(setting);
    }

    // Ghi audit log
    try {
      await AuditLog.create({
        action: 'system_settings_change',
        performedBy: req.user._id,
        targetUser: req.user._id,
        details: { changes: updates },
        ip: req.ip
      });
    } catch (auditErr) {
      console.error('Audit log error:', auditErr);
    }

    res.json({ success: true, message: 'Cập nhật cài đặt thành công', data: results });
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// ==================== CONTENT MANAGEMENT (QUẢN LÝ NỘI DUNG) ====================

// GET /api/admin/content/overview - Tổng quan nội dung
router.get('/content/overview', checkAdminPermission('content'), async (req, res) => {
  try {
    const [
      lessonsByClass,
      challengesByGrade,
      challengesByStatus,
      totalLessons,
      totalChallenges,
      recentLessons,
      recentChallenges
    ] = await Promise.all([
      Lesson.aggregate([
        { $group: { _id: '$classId', count: { $sum: 1 } } },
        { $sort: { _id: 1 } }
      ]),
      Challenge.aggregate([
        { $group: { _id: '$grade', count: { $sum: 1 } } },
        { $sort: { _id: 1 } }
      ]),
      Challenge.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } }
      ]),
      Lesson.countDocuments(),
      Challenge.countDocuments(),
      Lesson.find().sort({ createdAt: -1 }).limit(5)
        .populate('createdBy', 'username displayName')
        .select('title classId chapterName curriculumType createdAt')
        .lean(),
      Challenge.find().sort({ createdAt: -1 }).limit(5)
        .select('name grade category status difficulty createdAt')
        .lean()
    ]);

    res.json({
      success: true,
      data: {
        totalLessons,
        totalChallenges,
        lessonsByClass,
        challengesByGrade,
        challengesByStatus,
        recentLessons,
        recentChallenges
      }
    });
  } catch (error) {
    console.error('Content overview error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// GET /api/admin/content/lessons - Danh sách bài học
router.get('/content/lessons', checkAdminPermission('content'), async (req, res) => {
  try {
    const { page = 1, limit = 20, classId, curriculumType, search } = req.query;
    const query = {};
    if (classId) query.classId = parseInt(classId);
    if (curriculumType) query.curriculumType = curriculumType;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { chapterName: { $regex: search, $options: 'i' } }
      ];
    }

    const [lessons, total] = await Promise.all([
      Lesson.find(query)
        .populate('createdBy', 'username displayName')
        .sort({ classId: 1, chapterId: 1, order: 1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .select('title classId chapterId chapterName curriculumType lessonId order createdBy createdAt')
        .lean(),
      Lesson.countDocuments(query)
    ]);

    res.json({
      success: true,
      data: {
        lessons,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get lessons error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// GET /api/admin/content/challenges - Danh sách thử thách
router.get('/content/challenges', checkAdminPermission('content'), async (req, res) => {
  try {
    const { page = 1, limit = 20, grade, category, status, search } = req.query;
    const query = {};
    if (grade) query.grade = parseInt(grade);
    if (category) query.category = category;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const [challenges, total] = await Promise.all([
      Challenge.find(query)
        .sort({ grade: 1, category: 1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .select('id name grade category status difficulty difficultyLevel points time createdAt')
        .lean(),
      Challenge.countDocuments(query)
    ]);

    res.json({
      success: true,
      data: {
        challenges,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get challenges error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// ==================== TEACHER NOTES ====================

// POST /api/admin/teacher-requests/:userId/notes - Thêm ghi chú admin
router.post('/teacher-requests/:userId/notes', checkAdminPermission('teachers'), async (req, res) => {
  try {
    const { note } = req.body;
    if (!note || !note.trim()) {
      return res.status(400).json({ success: false, message: 'Vui lòng nhập nội dung ghi chú' });
    }

    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy người dùng' });
    }

    if (!user.teacherInfo) {
      return res.status(400).json({ success: false, message: 'Người dùng này không phải giáo viên' });
    }

    if (!user.teacherInfo.adminNotes) {
      user.teacherInfo.adminNotes = [];
    }

    user.teacherInfo.adminNotes.push({
      note: note.trim(),
      addedBy: req.user._id,
      addedAt: new Date()
    });

    await user.save();

    // Populate admin notes để trả về
    const updatedUser = await User.findById(req.params.userId)
      .populate('teacherInfo.adminNotes.addedBy', 'username displayName')
      .select('teacherInfo.adminNotes');

    res.json({
      success: true,
      message: 'Đã thêm ghi chú',
      data: updatedUser.teacherInfo.adminNotes
    });
  } catch (error) {
    console.error('Add teacher note error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

module.exports = router;
