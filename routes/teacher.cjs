const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const User = require('../models/User.cjs');
const ClassRoom = require('../models/ClassRoom.cjs');
const Assignment = require('../models/Assignment.cjs');
const Lesson = require('../models/Lesson.cjs');
const Challenge = require('../models/Challenge.cjs');
const Announcement = require('../models/Announcement.cjs');
const { authMiddleware, teacherMiddleware, checkClassOwnership } = require('../middleware/roleAuth.cjs');

// Multer configuration for file uploads
const { uploadAssignmentCloudinary, uploadMemory, cloudinary } = require('../config/cloudinary.cjs');

// Tất cả routes đều yêu cầu đăng nhập và là giáo viên
router.use(authMiddleware);
router.use(teacherMiddleware);

// ==================== DASHBOARD ====================

// GET /api/teacher/dashboard - Lấy thống kê tổng quan của giáo viên
router.get('/dashboard', async (req, res) => {
  try {
    const teacherId = req.user._id;
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    // Lấy danh sách lớp của giáo viên
    const classes = await ClassRoom.find({ 
      teacher: teacherId,
      status: 'active'
    }).lean();
    
    // Thống kê tổng quan
    let totalStudents = 0;
    let activeStudents = 0;
    const classIds = [];
    
    for (const cls of classes) {
      classIds.push(cls._id);
      totalStudents += cls.students?.filter(s => s.status === 'active').length || 0;
    }
    
    // Đếm học sinh hoạt động
    if (totalStudents > 0) {
      const studentIds = classes.flatMap(c => 
        c.students?.filter(s => s.status === 'active').map(s => s.student) || []
      );
      
      activeStudents = await User.countDocuments({
        _id: { $in: studentIds },
        'programs.progress.lastStudyDate': { $gte: sevenDaysAgo }
      });
    }
    
    // Thống kê bài tập
    const [totalAssignments, activeAssignments, pendingGrading] = await Promise.all([
      Assignment.countDocuments({ createdBy: teacherId }),
      Assignment.countDocuments({ createdBy: teacherId, status: 'active' }),
      Assignment.countDocuments({ 
        createdBy: teacherId, 
        'submissions.status': 'submitted',
        'submissions.feedback.gradedAt': { $exists: false }
      })
    ]);
    
    // Danh sách bài tập sắp hết hạn (trong 3 ngày tới)
    const threeDaysLater = new Date();
    threeDaysLater.setDate(threeDaysLater.getDate() + 3);
    
    const upcomingDeadlines = await Assignment.find({
      createdBy: teacherId,
      status: 'active',
      'schedule.dueDate': { $gte: new Date(), $lte: threeDaysLater }
    })
    .select('title schedule.dueDate assignedTo')
    .populate('assignedTo.classRoom', 'name')
    .sort({ 'schedule.dueDate': 1 })
    .limit(5);
    
    // Học sinh cần chú ý (điểm thấp hoặc không hoạt động)
    const studentsNeedingAttention = await User.find({
      assignedTeacher: teacherId,
      role: 'student',
      $or: [
        { 'programs.progress.lastStudyDate': { $lt: sevenDaysAgo } },
        { xp: { $lt: 100 } }
      ]
    })
    .select('username displayName email xp level programs.progress.lastStudyDate')
    .limit(10)
    .lean();
    
    // Thành tích gần đây của học sinh
    const recentAchievements = await User.aggregate([
      { $match: { assignedTeacher: teacherId, role: 'student' } },
      { $unwind: '$programs' },
      { $unwind: '$programs.progress.challengeHistory' },
      { $match: { 'programs.progress.challengeHistory.completedAt': { $gte: sevenDaysAgo } } },
      { $sort: { 'programs.progress.challengeHistory.completedAt': -1 } },
      { $limit: 10 },
      {
        $project: {
          username: 1,
          displayName: 1,
          challengeSlug: '$programs.progress.challengeHistory.challengeSlug',
          score: '$programs.progress.challengeHistory.score',
          stars: '$programs.progress.challengeHistory.stars',
          completedAt: '$programs.progress.challengeHistory.completedAt'
        }
      }
    ]);
    
    res.json({
      success: true,
      data: {
        overview: {
          totalClasses: classes.length,
          totalStudents,
          activeStudents,
          totalAssignments,
          activeAssignments,
          pendingGrading
        },
        classes: classes.map(c => ({
          _id: c._id,
          name: c.name,
          code: c.code,
          grade: c.grade,
          studentCount: c.students?.filter(s => s.status === 'active').length || 0
        })),
        upcomingDeadlines,
        studentsNeedingAttention,
        recentAchievements
      }
    });
  } catch (error) {
    console.error('Teacher dashboard error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// ==================== CLASS MANAGEMENT ====================

// GET /api/teacher/classes - Lấy danh sách lớp của giáo viên
router.get('/classes', async (req, res) => {
  try {
    const query = req.user.role === 'admin' ? {} : { teacher: req.user._id };
    const classes = await ClassRoom.find(query)
      .sort({ createdAt: -1 })
      .lean();
    
    // Thêm thống kê cho mỗi lớp
    const classesWithStats = classes.map(cls => ({
      ...cls,
      studentCount: cls.students?.filter(s => s.status === 'active').length || 0,
      assignmentCount: cls.assignments?.filter(a => a.isActive).length || 0
    }));
    
    res.json({ success: true, data: classesWithStats });
  } catch (error) {
    console.error('Get classes error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// POST /api/teacher/classes - Tạo lớp học mới
router.post('/classes', async (req, res) => {
  try {
    const { name, description, grade, curriculumType, settings } = req.body;
    
    if (!name || !grade) {
      return res.status(400).json({ 
        success: false, 
        message: 'Vui lòng nhập tên lớp và khối lớp' 
      });
    }
    
    // Tạo mã lớp học
    const code = await ClassRoom.generateClassCode();
    
    const classRoom = new ClassRoom({
      name,
      code,
      description,
      grade,
      subject: 'chemistry',
      curriculumType: curriculumType || 'ketnoi',
      teacher: req.user._id,
      settings: {
        isPublic: settings?.isPublic || false,
        allowSelfEnroll: settings?.allowSelfEnroll || false,
        maxStudents: settings?.maxStudents || 50,
        requireApproval: settings?.requireApproval !== false
      }
    });
    
    await classRoom.save();
    
    // Thêm vào danh sách lớp quản lý của giáo viên
    await User.findByIdAndUpdate(req.user._id, {
      $addToSet: { managedClasses: classRoom._id }
    });
    
    res.status(201).json({ 
      success: true, 
      message: 'Tạo lớp học thành công',
      data: classRoom 
    });
  } catch (error) {
    console.error('Create class error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// GET /api/teacher/classes/:classId - Lấy chi tiết lớp học
router.get('/classes/:classId', checkClassOwnership, async (req, res) => {
  try {
    const classRoom = await ClassRoom.findById(req.params.classId)
      .populate('students.student', 'username displayName email xp level avatar programs')
      .populate('teacher', 'username displayName email');
    
    if (!classRoom) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy lớp học' });
    }
    
    // Cập nhật thống kê
    await classRoom.updateStatistics();
    await classRoom.save();
    
    res.json({ success: true, data: classRoom });
  } catch (error) {
    console.error('Get class detail error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// PUT /api/teacher/classes/:classId - Cập nhật lớp học
router.put('/classes/:classId', checkClassOwnership, async (req, res) => {
  try {
    const { name, description, settings, status } = req.body;
    const classRoom = req.classRoom;
    
    if (name) classRoom.name = name;
    if (description !== undefined) classRoom.description = description;
    if (settings) classRoom.settings = { ...classRoom.settings, ...settings };
    if (status) classRoom.status = status;
    
    await classRoom.save();
    
    res.json({ 
      success: true, 
      message: 'Cập nhật lớp học thành công',
      data: classRoom 
    });
  } catch (error) {
    console.error('Update class error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// DELETE /api/teacher/classes/:classId - Xóa/Archive lớp học
router.delete('/classes/:classId', checkClassOwnership, async (req, res) => {
  try {
    const classRoom = req.classRoom;
    
    // Soft delete - archive thay vì xóa hẳn
    classRoom.status = 'archived';
    await classRoom.save();
    
    res.json({ 
      success: true, 
      message: 'Đã lưu trữ lớp học' 
    });
  } catch (error) {
    console.error('Archive class error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// ==================== STUDENT MANAGEMENT ====================

// POST /api/teacher/classes/:classId/students - Thêm học sinh vào lớp
router.post('/classes/:classId/students', checkClassOwnership, async (req, res) => {
  try {
    const { studentEmails, studentIds } = req.body;
    const classRoom = req.classRoom;
    
    const addedStudents = [];
    const errors = [];
    
    // Thêm theo email
    if (studentEmails && studentEmails.length > 0) {
      for (const email of studentEmails) {
        const student = await User.findOne({ email, role: 'student' });
        if (!student) {
          errors.push(`Không tìm thấy học sinh với email: ${email}`);
          continue;
        }
        
        // Kiểm tra đã trong lớp chưa
        const exists = classRoom.students.some(
          s => s.student.toString() === student._id.toString()
        );
        
        if (exists) {
          errors.push(`Học sinh ${email} đã trong lớp`);
          continue;
        }
        
        // Kiểm tra số lượng học sinh tối đa
        if (classRoom.students.filter(s => s.status === 'active').length >= classRoom.settings.maxStudents) {
          errors.push(`Lớp đã đầy (tối đa ${classRoom.settings.maxStudents} học sinh)`);
          break;
        }
        
        classRoom.students.push({
          student: student._id,
          enrolledAt: new Date(),
          status: 'active'
        });
        
        // Cập nhật enrolledClasses của học sinh
        student.enrolledClasses.push({
          classId: classRoom._id,
          enrolledAt: new Date()
        });
        student.assignedTeacher = req.user._id;
        await student.save();
        
        addedStudents.push(student.email);
      }
    }
    
    // Thêm theo ID
    if (studentIds && studentIds.length > 0) {
      for (const studentId of studentIds) {
        const student = await User.findOne({ _id: studentId, role: 'student' });
        if (!student) {
          errors.push(`Không tìm thấy học sinh với ID: ${studentId}`);
          continue;
        }
        
        const exists = classRoom.students.some(
          s => s.student.toString() === studentId
        );
        
        if (exists) {
          errors.push(`Học sinh ${student.email} đã trong lớp`);
          continue;
        }
        
        if (classRoom.students.filter(s => s.status === 'active').length >= classRoom.settings.maxStudents) {
          errors.push(`Lớp đã đầy`);
          break;
        }
        
        classRoom.students.push({
          student: student._id,
          enrolledAt: new Date(),
          status: 'active'
        });
        
        student.enrolledClasses.push({
          classId: classRoom._id,
          enrolledAt: new Date()
        });
        student.assignedTeacher = req.user._id;
        await student.save();
        
        addedStudents.push(student.email);
      }
    }
    
    await classRoom.save();
    
    // Thêm chỉ các học sinh MỚI vào danh sách students của giáo viên
    const newStudentIds = addedStudents.length > 0 
      ? classRoom.students
          .filter(s => s.status === 'active')
          .map(s => s.student)
          .filter(id => {
            // Chỉ lấy ID của students vừa được thêm mới
            return addedStudents.some(email => true); // addToSet sẽ tự xử lý trùng
          })
      : [];
    
    if (addedStudents.length > 0) {
      // Lấy ID của các students vừa thêm thành công
      const newlyAddedUsers = await User.find({ 
        email: { $in: addedStudents } 
      }).select('_id');
      const newlyAddedIds = newlyAddedUsers.map(u => u._id);
      
      await User.findByIdAndUpdate(req.user._id, {
        $addToSet: { students: { $each: newlyAddedIds } }
      });
    }
    
    res.json({
      success: true,
      message: `Đã thêm ${addedStudents.length} học sinh`,
      data: {
        added: addedStudents,
        errors
      }
    });
  } catch (error) {
    console.error('Add students error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// DELETE /api/teacher/classes/:classId/students/:studentId - Xóa học sinh khỏi lớp
router.delete('/classes/:classId/students/:studentId', checkClassOwnership, async (req, res) => {
  try {
    const classRoom = req.classRoom;
    const studentId = req.params.studentId;
    
    const studentIndex = classRoom.students.findIndex(
      s => s.student.toString() === studentId
    );
    
    if (studentIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        message: 'Học sinh không trong lớp này' 
      });
    }
    
    // Soft delete - đánh dấu inactive
    classRoom.students[studentIndex].status = 'inactive';
    await classRoom.save();
    
    // Xóa khỏi enrolledClasses của học sinh
    await User.findByIdAndUpdate(studentId, {
      $pull: { enrolledClasses: { classId: classRoom._id } }
    });
    
    res.json({ 
      success: true, 
      message: 'Đã xóa học sinh khỏi lớp' 
    });
  } catch (error) {
    console.error('Remove student error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// PUT /api/teacher/classes/:classId/students/:studentId/approve - Duyệt học sinh pending
router.put('/classes/:classId/students/:studentId/approve', checkClassOwnership, async (req, res) => {
  try {
    const classRoom = req.classRoom;
    const studentId = req.params.studentId;
    
    const studentEntry = classRoom.students.find(
      s => s.student.toString() === studentId
    );
    
    if (!studentEntry) {
      return res.status(404).json({ 
        success: false, 
        message: 'Học sinh không trong lớp này' 
      });
    }
    
    if (studentEntry.status !== 'pending') {
      return res.status(400).json({ 
        success: false, 
        message: 'Học sinh không ở trạng thái chờ duyệt' 
      });
    }

    // Kiểm tra số lượng tối đa
    if (classRoom.students.filter(s => s.status === 'active').length >= classRoom.settings.maxStudents) {
      return res.status(400).json({ 
        success: false, 
        message: `Lớp đã đầy (tối đa ${classRoom.settings.maxStudents} học sinh)` 
      });
    }
    
    // Duyệt - đổi trạng thái thành active và cập nhật thời gian
    studentEntry.status = 'active';
    studentEntry.enrolledAt = new Date();
    await classRoom.save();
    
    // Đảm bảo học sinh có enrolledClasses tương ứng
    const student = await User.findById(studentId);
    if (student) {
      const existingEnrollment = student.enrolledClasses?.find(
        e => e.classId.toString() === classRoom._id.toString()
      );
      
      if (!existingEnrollment) {
        if (!student.enrolledClasses) {
          student.enrolledClasses = [];
        }
        student.enrolledClasses.push({
          classId: classRoom._id,
          enrolledAt: new Date()
        });
        
        // Cập nhật assignedTeacher nếu chưa có
        if (!student.assignedTeacher) {
          student.assignedTeacher = classRoom.teacher;
        }
        
        await student.save();
      }
    }
    
    // Thêm vào danh sách students lưu trong User model của giáo viên nếu chưa có
    await User.findByIdAndUpdate(req.user._id, {
      $addToSet: { students: studentId }
    });
    
    res.json({ 
      success: true, 
      message: 'Đã duyệt học sinh vào lớp' 
    });
  } catch (error) {
    console.error('Approve student error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// PUT /api/teacher/classes/:classId/students/:studentId/reject - Từ chối học sinh pending
router.put('/classes/:classId/students/:studentId/reject', checkClassOwnership, async (req, res) => {
  try {
    const classRoom = req.classRoom;
    const studentId = req.params.studentId;
    
    const studentIndex = classRoom.students.findIndex(
      s => s.student.toString() === studentId
    );
    
    if (studentIndex === -1) {
      return res.status(404).json({ 
        success: false, 
        message: 'Học sinh không trong lớp này' 
      });
    }
    
    if (classRoom.students[studentIndex].status !== 'pending') {
      return res.status(400).json({ 
        success: false, 
        message: 'Học sinh không ở trạng thái chờ duyệt' 
      });
    }
    
    // Từ chối - đánh dấu là rejected hoặc xóa khỏi list (chọn xóa khỏi list cho đơn giản)
    classRoom.students.splice(studentIndex, 1);
    await classRoom.save();
    
    // Xóa classId khỏi enrolledClasses của học sinh để cleanup
    await User.findByIdAndUpdate(studentId, {
      $pull: { enrolledClasses: { classId: classRoom._id } }
    });
    
    res.json({ 
      success: true, 
      message: 'Đã từ chối học sinh' 
    });
  } catch (error) {
    console.error('Reject student error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// GET /api/teacher/classes/:classId/pending-students - Lấy danh sách học sinh chờ duyệt
router.get('/classes/:classId/pending-students', checkClassOwnership, async (req, res) => {
  try {
    const classRoom = await ClassRoom.findById(req.params.classId)
      .populate('students.student', 'username displayName email avatar createdAt');
    
    const pendingStudents = classRoom.students
      .filter(s => s.status === 'pending')
      .map(s => ({
        _id: s.student._id,
        username: s.student.username,
        displayName: s.student.displayName,
        email: s.student.email,
        avatar: s.student.avatar,
        requestedAt: s.enrolledAt
      }));
    
    res.json({ success: true, data: pendingStudents });
  } catch (error) {
    console.error('Get pending students error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// GET /api/teacher/classes/:classId/students - Lấy danh sách học sinh với tiến trình
router.get('/classes/:classId/students', checkClassOwnership, async (req, res) => {
  try {
    const classRoom = await ClassRoom.findById(req.params.classId)
      .populate('students.student', 'username displayName email xp level avatar programs createdAt');
    
    const studentsWithProgress = classRoom.students
      .filter(s => s.status === 'active')
      .map(s => {
        const student = s.student;
        const program = student.programs?.find(p => p.programId === classRoom.subject);
        
        return {
          _id: student._id,
          username: student.username,
          displayName: student.displayName,
          email: student.email,
          xp: student.xp,
          level: student.level,
          avatar: student.avatar,
          enrolledAt: s.enrolledAt,
          progress: program ? {
            completedLessons: program.progress?.completedLessons?.length || 0,
            completedChallenges: program.progress?.completedChallenges?.length || 0,
            totalScore: program.progress?.totalScore || 0,
            currentStreak: program.studyStreak?.currentStreak || 0,
            studyTime: program.studyTime || 0,
            lastStudyDate: program.progress?.lastStudyDate
          } : null
        };
      });
    
    res.json({ success: true, data: studentsWithProgress });
  } catch (error) {
    console.error('Get students progress error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// ==================== ASSIGNMENT MANAGEMENT ====================

// GET /api/teacher/assignments - Lấy tất cả bài tập của giáo viên
router.get('/assignments', async (req, res) => {
  try {
    const { status, classId, page = 1, limit = 20 } = req.query;
    
    const query = req.user.role === 'admin' ? {} : { createdBy: req.user._id };
    if (status) query.status = status;
    if (classId) query['assignedTo.classRoom'] = classId;
    
    const [assignments, total] = await Promise.all([
      Assignment.find(query)
        .populate('assignedTo.classRoom', 'name code grade')
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .lean(),
      Assignment.countDocuments(query)
    ]);
    
    res.json({
      success: true,
      data: {
        assignments,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    console.error('Get assignments error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// POST /api/teacher/assignments - Tạo bài tập mới
router.post('/assignments', async (req, res) => {
  try {
    const { 
      title, description, type, content, 
      classRoomId, studentIds,
      schedule, grading, visibility 
    } = req.body;
    
    if (!title || !type) {
      return res.status(400).json({ 
        success: false, 
        message: 'Vui lòng nhập tiêu đề và loại bài tập' 
      });
    }
    
    // Kiểm tra quyền với lớp học
    if (classRoomId) {
      const classRoom = await ClassRoom.findById(classRoomId);
      if (!classRoom || classRoom.teacher.toString() !== req.user._id.toString()) {
        return res.status(403).json({ 
          success: false, 
          message: 'Bạn không có quyền giao bài cho lớp này' 
        });
      }
    }
    
    const assignment = new Assignment({
      title,
      description,
      type,
      content,
      createdBy: req.user._id,
      assignedTo: {
        classRoom: classRoomId || null,
        students: studentIds || []
      },
      schedule: {
        assignedAt: new Date(),
        dueDate: schedule?.dueDate,
        lateSubmissionAllowed: schedule?.lateSubmissionAllowed || false,
        timeLimit: schedule?.timeLimit
      },
      grading: grading || {},
      visibility: visibility || {},
      status: schedule?.dueDate && new Date(schedule.dueDate) > new Date() ? 'active' : 'draft'
    });
    
    await assignment.save();
    
    // Thêm assignment vào lớp học
    if (classRoomId) {
      await ClassRoom.findByIdAndUpdate(classRoomId, {
        $push: {
          assignments: {
            title,
            type,
            lessonId: content?.lessonId,
            challengeSlug: content?.challengeSlug,
            dueDate: schedule?.dueDate,
            points: grading?.maxPoints || 100,
            isActive: true,
            createdAt: new Date()
          }
        }
      });
    }
    
    res.status(201).json({ 
      success: true, 
      message: 'Tạo bài tập thành công',
      data: assignment 
    });
  } catch (error) {
    console.error('Create assignment error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// GET /api/teacher/assignments/:assignmentId - Lấy chi tiết bài tập
router.get('/assignments/:assignmentId', async (req, res) => {
  try {
    const assignment = await Assignment.findOne({
      _id: req.params.assignmentId,
      createdBy: req.user._id
    })
    .populate('assignedTo.classRoom', 'name code grade')
    .populate('submissions.student', 'username displayName email avatar');
    
    if (!assignment) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy bài tập' });
    }
    
    // Cập nhật thống kê
    assignment.updateStatistics();
    await assignment.save();
    
    res.json({ success: true, data: assignment });
  } catch (error) {
    console.error('Get assignment detail error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// PUT /api/teacher/assignments/:assignmentId - Cập nhật bài tập
router.put('/assignments/:assignmentId', async (req, res) => {
  try {
    const assignment = await Assignment.findOne({
      _id: req.params.assignmentId,
      createdBy: req.user._id
    });
    
    if (!assignment) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy bài tập' });
    }
    
    const allowedUpdates = ['title', 'description', 'content', 'schedule', 'grading', 'visibility', 'status'];
    const updates = {};
    
    for (const key of allowedUpdates) {
      if (req.body[key] !== undefined) {
        updates[key] = req.body[key];
      }
    }
    
    Object.assign(assignment, updates);
    await assignment.save();
    
    res.json({ 
      success: true, 
      message: 'Cập nhật bài tập thành công',
      data: assignment 
    });
  } catch (error) {
    console.error('Update assignment error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// POST /api/teacher/assignments/:assignmentId/grade - Chấm điểm bài nộp
router.post('/assignments/:assignmentId/grade', async (req, res) => {
  try {
    const { studentId, score, feedback } = req.body;
    
    const assignment = await Assignment.findOne({
      _id: req.params.assignmentId,
      createdBy: req.user._id
    });
    
    if (!assignment) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy bài tập' });
    }
    
    const submission = assignment.submissions.find(
      s => s.student.toString() === studentId
    );
    
    if (!submission) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy bài nộp' });
    }
    
    submission.score = score;
    submission.percentage = Math.round((score / assignment.grading.maxPoints) * 100);
    submission.stars = submission.percentage >= 100 ? 3 : 
                       submission.percentage >= 80 ? 2 : 
                       submission.percentage >= 50 ? 1 : 0;
    submission.status = 'graded';
    submission.feedback = {
      comment: feedback,
      gradedBy: req.user._id,
      gradedAt: new Date()
    };
    
    await assignment.save();
    assignment.updateStatistics();
    await assignment.save();
    
    res.json({ 
      success: true, 
      message: 'Chấm điểm thành công',
      data: submission 
    });
  } catch (error) {
    console.error('Grade submission error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// ==================== FILE UPLOAD ====================

// POST /api/teacher/assignments/:assignmentId/upload - Upload file đính kèm
router.post('/assignments/:assignmentId/upload', uploadAssignmentCloudinary.array('files', 5), async (req, res) => {
  try {
    const assignment = await Assignment.findOne({
      _id: req.params.assignmentId,
      createdBy: req.user._id
    });
    
    if (!assignment) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy bài tập' });
    }
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'Không có file nào được tải lên' });
    }
    
    const attachments = req.files.map(file => ({
      originalName: file.originalname,
      fileName: file.filename, // This becomes the Cloudinary public_id
      filePath: file.path,     // This becomes the Cloudinary secure URL
      fileType: file.mimetype,
      fileSize: file.size,
      uploadedAt: new Date()
    }));
    
    if (!assignment.content) assignment.content = {};
    if (!assignment.content.attachments) assignment.content.attachments = [];
    assignment.content.attachments.push(...attachments);
    
    await assignment.save();
    
    res.json({
      success: true,
      message: `Đã tải lên ${attachments.length} file`,
      data: attachments
    });
  } catch (error) {
    console.error('Upload file error:', error);
    res.status(500).json({ success: false, message: error.message || 'Lỗi server' });
  }
});

// DELETE /api/teacher/assignments/:assignmentId/attachments/:fileName - Xóa file đính kèm
router.delete('/assignments/:assignmentId/attachments/:fileName', async (req, res) => {
  try {
    const assignment = await Assignment.findOne({
      _id: req.params.assignmentId,
      createdBy: req.user._id
    });
    
    if (!assignment) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy bài tập' });
    }
    
    // Remove from DB
    if (assignment.content?.attachments) {
      assignment.content.attachments = assignment.content.attachments.filter(
        a => a.fileName !== req.params.fileName
      );
      await assignment.save();
    }
    
    // Remove file from Cloudinary 
    try {
      await cloudinary.uploader.destroy(req.params.fileName);
    } catch (err) {
      console.error('Lỗi khi xóa file trên Cloudinary:', err);
    }
    
    res.json({ success: true, message: 'Đã xóa file' });
  } catch (error) {
    console.error('Delete file error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server' });
  }
});

// POST /api/teacher/assignments/parse-file - Upload & parse file thành câu hỏi
router.post('/assignments/parse-file', uploadMemory.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Không có file nào được tải lên' });
    }

    const mimeType = req.file.mimetype;
    let text = '';

    // Extract text based on file type
    if (mimeType === 'application/pdf') {
      const pdfData = await pdfParse(req.file.buffer);
      text = pdfData.text;
    } else if (
      mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      mimeType === 'application/msword'
    ) {
      const result = await mammoth.extractRawText({ buffer: req.file.buffer });
      text = result.value;
    } else if (mimeType === 'text/plain') {
      text = req.file.buffer.toString('utf-8');
    } else {
      return res.status(400).json({ success: false, message: 'Chỉ hỗ trợ parse PDF, Word (.docx) và text (.txt)' });
    }

    if (!text.trim()) {
      return res.json({ success: true, data: { rawText: '', questions: [] }, message: 'File trống' });
    }

    // Parse text into questions
    const questions = parseTextToQuestions(text);

    res.json({
      success: true,
      message: `Đã phân tích ${questions.length} câu hỏi từ file`,
      data: {
        rawText: text.substring(0, 5000),
        questions
      }
    });
  } catch (error) {
    console.error('Parse file error:', error);
    // Clean up on error
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ success: false, message: 'Lỗi phân tích file: ' + error.message });
  }
});

// Helper: Parse text content into structured questions
function parseTextToQuestions(text) {
  const qs = [];
  // Tách các khối bắt đầu bằng "Câu X:", "Bài X:", "X.", hoặc "X\n"
  const blocks = text.split(/(?=^C[aâ]u\s*\d+|^Bài\s*\d+|^\d+[.:)\/]?\s|^(?:[A-Z]{2,}\s*)?\d+\r?\n)/gmi);
  
  for (let b of blocks) {
    b = b.trim();
    if (!b) continue;
    
    // Check if the block actually starts with a question identifier.
    // If it doesn't, it's likely a header/title.
    const isQuestionBlock = /^(?:C[aâ]u\s*\d+|Bài\s*\d+|^\d+[.:)\/]?\s|^(?:[A-Z]{2,}\s*)?\d+\r?\n)/i.test(b);
    if (!isQuestionBlock) {
      continue;
    }
    
    // Tìm đáp án (Ví dụ: "Đáp án: A", "ĐA: B", "=> C", "Key: A")
    const ansMatch = b.match(/(?:Đ[aá]p\s*[aá]n|ĐA|=>|Trả lời|Key)[.:)\s]*([A-Da-d])/i);
    let ans = ansMatch ? ansMatch[1].toUpperCase() : null;
    if (ansMatch) b = b.replace(ansMatch[0], '').trim(); // Bỏ phần đáp án khỏi khối text
    
    // Tìm các lựa chọn (A., B., C., D.)
    // Dùng regex linh hoạt cho cả trường hợp các lựa chọn dính liền: A. textB. text
    const optRegex = /([A-Da-d])[.)]\s+([\s\S]*?)(?=\s*[A-Da-d][.)]\s+|$)/gi;
    const options = [];
    let qText = b;
    let firstOptIdx = b.length;
    let m;
    
    while ((m = optRegex.exec(b)) !== null) {
      if (firstOptIdx === b.length) firstOptIdx = m.index;
      options.push(m[2].trim());
    }
    
    // Phần trước lựa chọn đầu tiên là nội dung câu hỏi
    if (firstOptIdx < b.length) {
      qText = b.substring(0, firstOptIdx).trim();
    }
    
    // Bỏ tiếp đầu ngữ "Câu 1:", "1.", "1" ...
    qText = qText.replace(/^(?:C[aâ]u\s*\d+|Bài\s*\d+|^\d+)[.:)\/]?\s*/i, '').trim();
    
    if (!qText) continue;

    const currentQ = {
      question: qText,
      type: 'multiple-choice',
      options: options,
      correctAnswer: ans ? ans.charCodeAt(0) - 65 : 0,
      points: 10,
      explanation: ''
    };

    // Phân loại thêm nếu cần
    if (options.length >= 2) {
      currentQ.type = 'multiple-choice';
    } else if (/đúng.*sai|true.*false/i.test(qText)) {
      currentQ.type = 'true-false';
      if (options.length === 0) {
        currentQ.options = ['Đúng', 'Sai'];
      }
    } else if (/điền|fill/i.test(qText)) {
      currentQ.type = 'fill-in';
    } else if (options.length === 0) {
      currentQ.type = 'essay';
    }

    qs.push(currentQ);
  }
  
  return qs;
}


// POST /api/teacher/classes/:classId/announcements - Đăng thông báo
router.post('/classes/:classId/announcements', checkClassOwnership, async (req, res) => {
  try {
    const { title, content, isPinned } = req.body;
    const classRoom = req.classRoom;
    
    if (!title || !content) {
      return res.status(400).json({ 
        success: false, 
        message: 'Vui lòng nhập tiêu đề và nội dung' 
      });
    }
    
    classRoom.announcements.push({
      title,
      content,
      author: req.user._id,
      isPinned: isPinned || false,
      createdAt: new Date()
    });
    
    await classRoom.save();
    
    res.status(201).json({ 
      success: true, 
      message: 'Đăng thông báo thành công' 
    });
  } catch (error) {
    console.error('Create announcement error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// ==================== REPORTS ====================

// GET /api/teacher/classes/:classId/report - Báo cáo tiến trình lớp
router.get('/classes/:classId/report', checkClassOwnership, async (req, res) => {
  try {
    const classRoom = await ClassRoom.findById(req.params.classId)
      .populate('students.student', 'username displayName xp level programs');
    
    await classRoom.updateStatistics();
    
    // Thống kê chi tiết
    const studentsData = classRoom.students
      .filter(s => s.status === 'active')
      .map(s => {
        const student = s.student;
        const program = student.programs?.find(p => p.programId === classRoom.subject);
        
        return {
          name: student.displayName || student.username,
          xp: student.xp,
          level: student.level,
          completedLessons: program?.progress?.completedLessons?.length || 0,
          completedChallenges: program?.progress?.completedChallenges?.length || 0,
          totalScore: program?.progress?.totalScore || 0,
          studyTime: program?.studyTime || 0,
          currentStreak: program?.studyStreak?.currentStreak || 0
        };
      });
    
    // Xếp hạng theo XP
    const ranking = [...studentsData].sort((a, b) => b.xp - a.xp);
    
    // Tính trung bình
    const avgStats = {
      avgXP: studentsData.reduce((sum, s) => sum + s.xp, 0) / (studentsData.length || 1),
      avgLessons: studentsData.reduce((sum, s) => sum + s.completedLessons, 0) / (studentsData.length || 1),
      avgChallenges: studentsData.reduce((sum, s) => sum + s.completedChallenges, 0) / (studentsData.length || 1),
      avgStudyTime: studentsData.reduce((sum, s) => sum + s.studyTime, 0) / (studentsData.length || 1)
    };
    
    res.json({
      success: true,
      data: {
        classInfo: {
          name: classRoom.name,
          code: classRoom.code,
          grade: classRoom.grade,
          studentCount: studentsData.length
        },
        statistics: classRoom.statistics,
        averages: avgStats,
        ranking,
        students: studentsData
      }
    });
  } catch (error) {
    console.error('Get class report error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// GET /api/teacher/students/:studentId/progress - Xem tiến trình học sinh cụ thể
router.get('/students/:studentId/progress', async (req, res) => {
  try {
    const student = await User.findById(req.params.studentId)
      .select('-password');
    
    if (!student) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy học sinh' });
    }
    
    // Kiểm tra giáo viên có quyền xem không
    if (student.assignedTeacher?.toString() !== req.user._id.toString() &&
        req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false, 
        message: 'Bạn không có quyền xem tiến trình học sinh này' 
      });
    }
    
    // Lấy chi tiết bài tập của học sinh
    const assignments = await Assignment.find({
      'submissions.student': student._id
    })
    .select('title type schedule.dueDate submissions.$');
    
    res.json({
      success: true,
      data: {
        student: {
          _id: student._id,
          username: student.username,
          displayName: student.displayName,
          email: student.email,
          xp: student.xp,
          level: student.level,
          avatar: student.avatar
        },
        programs: student.programs,
        assignments: assignments.map(a => ({
          title: a.title,
          type: a.type,
          dueDate: a.schedule?.dueDate,
          submission: a.submissions[0]
        }))
      }
    });
  } catch (error) {
    console.error('Get student progress error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// ==================== LESSON MANAGEMENT ====================

// GET /api/teacher/lessons - Lấy danh sách bài học (có filter và pagination)
router.get('/lessons', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      classId, 
      curriculumType, 
      chapterId, 
      search 
    } = req.query;
    
    // Build query
    const query = {};
    
    if (classId) query.classId = parseInt(classId);
    if (curriculumType) query.curriculumType = curriculumType;
    if (chapterId) query.chapterId = parseInt(chapterId);
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { chapterName: { $regex: search, $options: 'i' } }
      ];
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [lessons, total] = await Promise.all([
      Lesson.find(query)
        .populate('createdBy', 'displayName username email')
        .sort({ classId: 1, chapterId: 1, order: 1 })
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      Lesson.countDocuments(query)
    ]);
    
    res.json({
      success: true,
      lessons,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Get lessons error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// GET /api/teacher/lessons/:id - Lấy chi tiết một bài học
router.get('/lessons/:id', async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id)
      .populate('createdBy', 'displayName username email')
      .lean();
    
    if (!lesson) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy bài học' });
    }
    
    res.json({ success: true, lesson });
  } catch (error) {
    console.error('Get lesson error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// POST /api/teacher/lessons - Tạo bài học mới
router.post('/lessons', async (req, res) => {
  try {
    const {
      classId,
      curriculumType,
      chapterId,
      chapterName,
      lessonId,
      title,
      description,
      level,
      order,
      theory,
      theoryModules,
      game
    } = req.body;
    
    if (!title) {
      return res.status(400).json({ success: false, message: 'Vui lòng nhập tiêu đề bài học' });
    }
    
    // Kiểm tra bài học đã tồn tại chưa (match với MongoDB index)
    const existingLesson = await Lesson.findOne({
      classId: parseInt(classId),
      curriculumType,
      lessonId: parseInt(lessonId)
    });
    
    if (existingLesson) {
      return res.status(400).json({ 
        success: false, 
        message: `Bài học số ${lessonId} trong lớp ${classId} (${curriculumType}) đã tồn tại. Vui lòng chọn số bài khác.` 
      });
    }
    
    // Build game data in both formats for compatibility
    const allQuizzes = [
      ...(game?.basic || []),
      ...(game?.intermediate || []),
      ...(game?.advanced || [])
    ];
    
    const lesson = new Lesson({
      classId: parseInt(classId),
      curriculumType,
      chapterId: parseInt(chapterId),
      chapterName,
      lessonId: parseInt(lessonId),
      title,
      description,
      level,
      order: parseInt(order) || 1,
      theoryModules: theoryModules || [],
      game: {
        quizzes: allQuizzes,
        basic: game?.basic || [],
        intermediate: game?.intermediate || [],
        advanced: game?.advanced || []
      },
      modules: modules || [],
      createdBy: req.user._id
    });
    
    await lesson.save();
    
    res.status(201).json({ 
      success: true, 
      message: 'Tạo bài học thành công',
      lesson 
    });
  } catch (error) {
    console.error('Create lesson error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// PUT /api/teacher/lessons/:id - Cập nhật bài học
router.put('/lessons/:id', async (req, res) => {
  try {
    const {
      classId,
      curriculumType,
      chapterId,
      chapterName,
      lessonId,
      title,
      description,
      level,
      order,
      theoryModules,
      game,
      modules
    } = req.body;
    
    const lesson = await Lesson.findById(req.params.id);
    
    if (!lesson) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy bài học' });
    }
    
    // Kiểm tra xung đột nếu thay đổi thông tin định danh (match với MongoDB index)
    if (parseInt(classId) !== lesson.classId || 
        curriculumType !== lesson.curriculumType || 
        parseInt(lessonId) !== lesson.lessonId) {
      const existingLesson = await Lesson.findOne({
        _id: { $ne: req.params.id },
        classId: parseInt(classId),
        curriculumType,
        lessonId: parseInt(lessonId)
      });
      
      if (existingLesson) {
        return res.status(400).json({ 
          success: false, 
          message: `Bài học số ${lessonId} trong lớp ${classId} (${curriculumType}) đã tồn tại` 
        });
      }
    }
    
    // Cập nhật bài học
    lesson.classId = parseInt(classId);
    lesson.curriculumType = curriculumType;
    lesson.chapterId = parseInt(chapterId);
    lesson.chapterName = chapterName;
    lesson.lessonId = parseInt(lessonId);
    lesson.title = title;
    lesson.description = description;
    lesson.level = level;
    lesson.order = parseInt(order) || lesson.order;
    lesson.theoryModules = theoryModules || [];
    lesson.modules = modules || lesson.modules || [];
    
    if (game) {
      // Save in both formats for compatibility
      const allQuizzes = [
        ...(game.basic || []),
        ...(game.intermediate || []),
        ...(game.advanced || [])
      ];
      
      lesson.game = {
        quizzes: allQuizzes, // Single level format (for compatibility)
        basic: game.basic || [],
        intermediate: game.intermediate || [],
        advanced: game.advanced || []
      };
    }
    
    lesson.updatedAt = new Date();
    lesson.updatedBy = req.user._id;
    
    await lesson.save();
    
    res.json({ 
      success: true, 
      message: 'Cập nhật bài học thành công',
      lesson 
    });
  } catch (error) {
    console.error('Update lesson error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// DELETE /api/teacher/lessons/:id - Xóa bài học
router.delete('/lessons/:id', async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    
    if (!lesson) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy bài học' });
    }
    
    await Lesson.findByIdAndDelete(req.params.id);
    
    res.json({ 
      success: true, 
      message: 'Xóa bài học thành công' 
    });
  } catch (error) {
    console.error('Delete lesson error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// POST /api/teacher/lessons/:id/duplicate - Sao chép bài học
router.post('/lessons/:id/duplicate', async (req, res) => {
  try {
    const originalLesson = await Lesson.findById(req.params.id).lean();
    
    if (!originalLesson) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy bài học' });
    }
    
    // Tìm lessonId mới
    const maxLesson = await Lesson.findOne({
      classId: originalLesson.classId,
      curriculumType: originalLesson.curriculumType
    }).sort({ lessonId: -1 });
    
    const newLessonId = (maxLesson?.lessonId || 0) + 1;
    
    // Tạo bản sao
    const { _id, createdAt, ...lessonData } = originalLesson;
    const duplicatedLesson = new Lesson({
      ...lessonData,
      lessonId: newLessonId,
      title: `${originalLesson.title} (Bản sao)`,
      order: (originalLesson.order || 0) + 1,
      createdBy: req.user._id
    });
    
    await duplicatedLesson.save();
    
    res.status(201).json({ 
      success: true, 
      message: 'Sao chép bài học thành công',
      lesson: duplicatedLesson 
    });
  } catch (error) {
    console.error('Duplicate lesson error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// GET /api/teacher/lessons/stats - Thống kê bài học
router.get('/lessons-stats', async (req, res) => {
  try {
    const stats = await Lesson.aggregate([
      {
        $group: {
          _id: { classId: '$classId', curriculumType: '$curriculumType' },
          count: { $sum: 1 },
          totalQuizzes: {
            $sum: {
              $add: [
                { $size: { $ifNull: ['$game.basic', []] } },
                { $size: { $ifNull: ['$game.intermediate', []] } },
                { $size: { $ifNull: ['$game.advanced', []] } }
              ]
            }
          }
        }
      },
      {
        $group: {
          _id: '$_id.classId',
          curricula: {
            $push: {
              type: '$_id.curriculumType',
              lessonCount: '$count',
              quizCount: '$totalQuizzes'
            }
          },
          totalLessons: { $sum: '$count' }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    
    res.json({ success: true, stats });
  } catch (error) {
    console.error('Get lesson stats error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// ==================== CLASS PK ROOM ====================
const Room = require('../models/Room.cjs');

// Ngân hàng câu hỏi PK theo lớp
const questionBanks = {
  8: [
    { type: 'multiple-choice', question: "Nguyên tử được cấu tạo bởi các hạt nào?", options: ["Proton và neutron", "Proton, neutron và electron", "Electron và neutron", "Chỉ có proton"], correctAnswer: 1, explanation: "Nguyên tử gồm hạt nhân (chứa proton và neutron) và vỏ electron." },
    { type: 'multiple-choice', question: "Công thức hóa học của nước là gì?", options: ["HO", "H2O", "H2O2", "OH"], correctAnswer: 1, explanation: "Nước có công thức H2O." },
    { type: 'multiple-choice', question: "Khối lượng mol của H2SO4 là bao nhiêu?", options: ["96 g/mol", "98 g/mol", "100 g/mol", "94 g/mol"], correctAnswer: 1, explanation: "M(H2SO4) = 2×1 + 32 + 4×16 = 98 g/mol" },
    { type: 'true-false', question: "Oxi chiếm tỉ lệ lớn nhất trong không khí?", correctAnswer: false, explanation: "Nitơ (N2) chiếm khoảng 78% không khí." },
    { type: 'true-false', question: "Fe là ký hiệu hóa học của Sắt?", correctAnswer: true, explanation: "Fe (Ferrum) là ký hiệu hóa học của Sắt." }
  ],
  9: [
    { type: 'multiple-choice', question: "Kim loại nào dẫn điện tốt nhất?", options: ["Vàng", "Bạc", "Đồng", "Nhôm"], correctAnswer: 1, explanation: "Bạc là kim loại dẫn điện tốt nhất." },
    { type: 'multiple-choice', question: "Công thức của metan là gì?", options: ["C2H6", "CH4", "C2H4", "C2H2"], correctAnswer: 1, explanation: "Metan là hidrocacbon đơn giản nhất với công thức CH4." },
    { type: 'true-false', question: "Natri (Na) có thể tác dụng với nước ở nhiệt độ thường?", correctAnswer: true, explanation: "Na tác dụng mạnh với nước: 2Na + 2H2O → 2NaOH + H2." }
  ],
  10: [
    { type: 'multiple-choice', question: "Số hiệu nguyên tử cho biết điều gì?", options: ["Số neutron", "Số proton", "Số electron hóa trị", "Khối lượng nguyên tử"], correctAnswer: 1, explanation: "Số hiệu nguyên tử Z = số proton." },
    { type: 'multiple-choice', question: "Liên kết cộng hóa trị là gì?", options: ["Liên kết do lực hút tĩnh điện", "Liên kết do dùng chung electron", "Liên kết do cho nhận electron", "Liên kết kim loại"], correctAnswer: 1, explanation: "Liên kết cộng hóa trị hình thành do sự dùng chung cặp electron." },
    { type: 'true-false', question: "Phản ứng oxi hóa khử luôn có sự thay đổi số oxi hóa?", correctAnswer: true, explanation: "Đặc trưng của phản ứng oxi hóa khử là có sự thay đổi số oxi hóa." }
  ],
  11: [
    { type: 'multiple-choice', question: "Nitơ có số oxi hóa bao nhiêu trong NH3?", options: ["+3", "-3", "0", "+5"], correctAnswer: 1, explanation: "Trong NH3: N(x) + 3×H(+1) = 0 → x = -3" },
    { type: 'true-false', question: "Anken có liên kết đôi C=C trong phân tử?", correctAnswer: true, explanation: "Anken là hidrocacbon không no có một liên kết đôi C=C." }
  ],
  12: [
    { type: 'multiple-choice', question: "Este được tạo từ phản ứng nào?", options: ["Axit + Bazơ", "Axit + Ancol", "Ancol + Ancol", "Axit + Axit"], correctAnswer: 1, explanation: "Este được tạo từ phản ứng giữa axit và ancol." },
    { type: 'multiple-choice', question: "Kim loại kiềm thuộc nhóm nào?", options: ["IA", "IIA", "IIIA", "IVA"], correctAnswer: 0, explanation: "Kim loại kiềm thuộc nhóm IA." }
  ]
};

function getRandomQuestions(grade, count) {
  const questions = questionBanks[grade] || questionBanks[8];
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}

// POST /api/teacher/classes/:classId/pk-room - Tạo phòng PK cho lớp
router.post('/classes/:classId/pk-room', checkClassOwnership, async (req, res) => {
  try {
    const { name, questionCount, timePerQuestion } = req.body;
    const classRoom = req.classRoom;
    
    const roomCode = await Room.generateRoomCode();
    const questions = getRandomQuestions(classRoom.grade, questionCount || 10);
    
    // Giáo viên là người tạo phòng và quan sát, không phải người chơi
    const room = new Room({
      roomCode,
      name: name || `PK Lớp ${classRoom.name}`,
      host: req.user._id,
      mode: 'class',
      maxPlayers: 500, // Không giới hạn số người tham gia
      grade: classRoom.grade,
      subject: classRoom.subject || 'chemistry',
      classRoom: classRoom._id,
      isClassRoom: true,
      questionCount: questionCount || 10,
      timePerQuestion: timePerQuestion || 30,
      questions,
      players: [], // Không thêm giáo viên vào players
      spectators: [{
        userId: req.user._id,
        username: req.user.username,
        displayName: req.user.displayName || req.user.username,
        role: 'teacher'
      }]
    });
    
    await room.save();
    
    res.status(201).json({
      success: true,
      message: 'Tạo phòng PK thành công',
      data: {
        roomCode: room.roomCode,
        name: room.name,
        maxPlayers: room.maxPlayers,
        grade: room.grade,
        questionCount: room.questionCount,
        timePerQuestion: room.timePerQuestion,
        joinUrl: `/chemistry/pk/room/${room.roomCode}`,
        spectatorUrl: `/chemistry/pk/spectate/${room.roomCode}` // URL cho giáo viên quan sát
      }
    });
  } catch (error) {
    console.error('Create class PK room error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// GET /api/teacher/classes/:classId/pk-rooms - Lấy danh sách phòng PK của lớp
router.get('/classes/:classId/pk-rooms', checkClassOwnership, async (req, res) => {
  try {
    const rooms = await Room.find({
      classRoom: req.params.classId,
      status: { $ne: 'finished' }
    })
    .select('roomCode name status players grade questionCount timePerQuestion createdAt')
    .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: rooms.map(r => ({
        ...r.toObject(),
        playerCount: r.players.length
      }))
    });
  } catch (error) {
    console.error('Get class PK rooms error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// ==================== QUICK ASSIGNMENT FOR CLASS ====================

// POST /api/teacher/classes/:classId/quick-assignment - Giao bài tập nhanh cho lớp
router.post('/classes/:classId/quick-assignment', checkClassOwnership, async (req, res) => {
  try {
    const { title, description, type, lessonId, challengeSlug, dueDate, dueTime, points } = req.body;
    const classRoom = req.classRoom;
    
    if (!title) {
      return res.status(400).json({ 
        success: false, 
        message: 'Vui lòng nhập tiêu đề bài tập' 
      });
    }
    
    // Kết hợp dueDate và dueTime thành DateTime
    let deadline = null;
    if (dueDate) {
      deadline = new Date(dueDate);
      if (dueTime) {
        const [hours, minutes] = dueTime.split(':');
        deadline.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      } else {
        deadline.setHours(23, 59, 59, 999);
      }
    }
    
    // Thêm assignment vào lớp học
    const newAssignment = {
      title,
      description: description || '',
      type: type || 'homework',
      lessonId: lessonId ? parseInt(lessonId) : null,
      challengeSlug: challengeSlug || null,
      dueDate: deadline,
      points: points || 100,
      isActive: true,
      createdAt: new Date(),
      completedBy: []
    };
    
    classRoom.assignments.push(newAssignment);
    await classRoom.save();
    
    res.status(201).json({
      success: true,
      message: 'Giao bài tập thành công',
      data: newAssignment
    });
  } catch (error) {
    console.error('Quick assignment error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// GET /api/teacher/classes/:classId/assignments - Lấy danh sách bài tập của lớp
router.get('/classes/:classId/assignments', checkClassOwnership, async (req, res) => {
  try {
    const classRoom = req.classRoom;
    
    // Tính toán thống kê cho từng bài tập
    const totalStudents = classRoom.students.filter(s => s.status === 'active').length;
    
    const assignmentsWithStats = classRoom.assignments.map(a => ({
      _id: a._id,
      title: a.title,
      description: a.description,
      type: a.type,
      lessonId: a.lessonId,
      challengeSlug: a.challengeSlug,
      dueDate: a.dueDate,
      points: a.points,
      isActive: a.isActive,
      createdAt: a.createdAt,
      completedCount: a.completedBy?.length || 0,
      totalStudents,
      completionRate: totalStudents > 0 
        ? Math.round((a.completedBy?.length || 0) / totalStudents * 100) 
        : 0,
      isOverdue: a.dueDate && new Date(a.dueDate) < new Date()
    }));
    
    res.json({
      success: true,
      data: assignmentsWithStats.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    });
  } catch (error) {
    console.error('Get class assignments error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// PUT /api/teacher/classes/:classId/assignments/:assignmentId - Cập nhật bài tập
router.put('/classes/:classId/assignments/:assignmentId', checkClassOwnership, async (req, res) => {
  try {
    const { title, description, dueDate, dueTime, points, isActive } = req.body;
    const classRoom = req.classRoom;
    
    const assignment = classRoom.assignments.id(req.params.assignmentId);
    if (!assignment) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy bài tập' });
    }
    
    // Cập nhật các trường
    if (title) assignment.title = title;
    if (description !== undefined) assignment.description = description;
    if (points) assignment.points = points;
    if (isActive !== undefined) assignment.isActive = isActive;
    
    // Cập nhật deadline
    if (dueDate) {
      assignment.dueDate = new Date(dueDate);
      if (dueTime) {
        const [hours, minutes] = dueTime.split(':');
        assignment.dueDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);
      }
    }
    
    await classRoom.save();
    
    res.json({
      success: true,
      message: 'Cập nhật bài tập thành công',
      data: assignment
    });
  } catch (error) {
    console.error('Update assignment error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// DELETE /api/teacher/classes/:classId/assignments/:assignmentId - Xóa bài tập
router.delete('/classes/:classId/assignments/:assignmentId', checkClassOwnership, async (req, res) => {
  try {
    const classRoom = req.classRoom;
    
    classRoom.assignments.pull({ _id: req.params.assignmentId });
    await classRoom.save();
    
    res.json({
      success: true,
      message: 'Xóa bài tập thành công'
    });
  } catch (error) {
    console.error('Delete assignment error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// ==================== CLASS ANNOUNCEMENTS ====================

// GET /api/teacher/classes/:classId/announcements - Lấy thông báo của lớp
router.get('/classes/:classId/announcements', checkClassOwnership, async (req, res) => {
  try {
    const announcements = await Announcement.find({
      type: 'class',
      classId: req.params.classId
    })
      .sort({ createdAt: -1 })
      .lean();
    
    res.json({ success: true, data: announcements });
  } catch (error) {
    console.error('Get class announcements error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// POST /api/teacher/classes/:classId/announcements - Tạo thông báo mới cho lớp
router.post('/classes/:classId/announcements', checkClassOwnership, async (req, res) => {
  try {
    const { title, content, priority, isActive } = req.body;
    
    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Vui lòng nhập tiêu đề và nội dung' });
    }
    
    const announcement = new Announcement({
      title,
      content,
      type: 'class',
      classId: req.params.classId,
      author: req.user._id,
      priority: priority || 'normal',
      isActive: isActive !== undefined ? isActive : true
    });
    
    await announcement.save();
    res.status(201).json({ success: true, message: 'Tạo thông báo thành công', data: announcement });
  } catch (error) {
    console.error('Create class announcement error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// PUT /api/teacher/announcements/:id - Cập nhật thông báo
router.put('/announcements/:id', async (req, res) => {
  try {
    const { title, content, priority, isActive } = req.body;
    const announcement = await Announcement.findById(req.params.id);
    
    if (!announcement) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy thông báo' });
    }

    if (announcement.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Không có quyền sửa thông báo này' });
    }
    
    if (title) announcement.title = title;
    if (content) announcement.content = content;
    if (priority) announcement.priority = priority;
    if (isActive !== undefined) announcement.isActive = isActive;
    
    await announcement.save();
    res.json({ success: true, message: 'Cập nhật thông báo thành công', data: announcement });
  } catch (error) {
    console.error('Update class announcement error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// DELETE /api/teacher/announcements/:id - Xóa thông báo
router.delete('/announcements/:id', async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    
    if (!announcement) {
      return res.status(404).json({ success: false, message: 'Không tìm thấy thông báo' });
    }

    if (announcement.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Không có quyền xóa thông báo này' });
    }
    
    await Announcement.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Đã xóa thông báo' });
  } catch (error) {
    console.error('Delete class announcement error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

module.exports = router;
