const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const User = require('../models/User.cjs');
const Lesson = require('../models/Lesson.cjs');
const Announcement = require('../models/Announcement.cjs');
const { authMiddleware } = require('../middleware/roleAuth.cjs');

// ===== MULTER CONFIG CHO TEACHER DOCUMENTS =====
const { uploadTeacherDocsCloudinary } = require('../config/cloudinary.cjs');
const uploadTeacherDocs = uploadTeacherDocsCloudinary.array('documents', 5);

// Register route
router.post('/register', (req, res) => {
  uploadTeacherDocs(req, res, async (uploadErr) => {
    if (uploadErr instanceof multer.MulterError) {
      return res.status(400).json({ message: `Lỗi upload: ${uploadErr.message}` });
    }
    if (uploadErr) {
      return res.status(400).json({ message: uploadErr.message });
    }

    try {
      const { username, email, password, isGoogleAuth } = req.body;
      const requestedRole = req.body.role;

      console.log('📝 Register request received:', { username, email, role: requestedRole || 'student' });

      // Validation
      if (!username || !email || (!password && !isGoogleAuth)) {
        console.log('❌ Validation failed: Missing required fields');
        return res.status(400).json({
          message: 'Vui lòng điền đầy đủ thông tin'
        });
      }

      // Check if user exists in MongoDB
      const existingUser = await User.findOne({
        $or: [{ email }, { username }]
      });

      if (existingUser) {
        console.log('❌ User already exists:', email);
        const field = existingUser.email === email ? 'Email' : 'Tên người dùng';
        return res.status(400).json({
          message: `${field} đã được sử dụng`
        });
      }

      // Hash password if not Google auth
      let hashedPassword = '';
      if (!isGoogleAuth && password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }

      // Create new user in MongoDB
      const userData = {
        username,
        email,
        password: hashedPassword,
        displayName: username,
        xp: 0,
        level: 1,
        role: 'student',
        teacherStatus: 'none',
        progress: {
          completedLessons: [],
          currentStreak: 0,
          totalPoints: 0,
          totalStudyTime: 0
        },
        learningPrograms: [],
        achievements: [],
        settings: {
          notifications: true,
          soundEffects: true,
          dailyGoal: 30
        }
      };

      // Nếu đăng ký với vai trò giáo viên
      if (requestedRole === 'teacher') {
        userData.role = 'teacher';
        userData.teacherStatus = 'pending';
        userData.teacherInfo = {
          school: req.body.school || '',
          subject: req.body.subject || 'chemistry',
          department: req.body.department || '',
          yearsOfExperience: parseInt(req.body.yearsOfExperience) || 0,
          qualification: req.body.qualification || '',
          bio: req.body.bio || '',
          requestedAt: new Date(),
          documents: (req.files || []).map(file => ({
            originalName: file.originalname,
            fileName: file.filename, // This becomes the Cloudinary public_id
            filePath: file.path,     // This becomes the Cloudinary secure URL
            fileType: file.mimetype,
            fileSize: file.size,
            uploadedAt: new Date()
          }))
        };
      }

      const newUser = new User(userData);
      await newUser.save();

      console.log('✅ User registered successfully:', {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
        teacherStatus: newUser.teacherStatus
      });

      // Nếu đăng ký giáo viên, gửi thông báo cho admin
      if (requestedRole === 'teacher') {
        try {
          const admins = await User.find({ role: 'admin' }).select('email');
          const Notification = require('../models/Notification.cjs');
          for (const admin of admins) {
            await Notification.create({
              userId: admin._id,
              type: 'teacher_request',
              title: 'Yêu cầu giáo viên mới',
              body: `${username} (${email}) đã đăng ký tài khoản giáo viên và đang chờ phê duyệt.`,
              data: { requesterId: newUser._id }
            });
          }
        } catch (notifErr) {
          console.error('Notification error:', notifErr);
        }
      }

      // Generate token
      const token = jwt.sign(
        { userId: newUser._id.toString(), email: newUser.email },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '7d' }
      );

      res.status(201).json({
        message: requestedRole === 'teacher'
          ? 'Đăng ký thành công! Tài khoản giáo viên đang chờ phê duyệt.'
          : 'User registered successfully',
        token,
        user: {
          id: newUser._id,
          _id: newUser._id,
          username: newUser.username,
          email: newUser.email,
          displayName: newUser.displayName,
          xp: newUser.xp,
          level: newUser.level,
          role: newUser.role,
          teacherStatus: newUser.teacherStatus,
          learningPrograms: newUser.learningPrograms
        }
      });
    } catch (error) {
      console.error('❌ Register error:', error);

      // Handle MongoDB duplicate key error
      if (error.code === 11000) {
        const field = Object.keys(error.keyPattern)[0];
        const fieldName = field === 'email' ? 'Email' : 'Tên người dùng';
        return res.status(400).json({
          message: `${fieldName} đã được sử dụng`
        });
      }

      res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
  });
});

// Login route
router.post('/login', async (req, res) => {
  try {
    console.log('📝 Login request received:', { email: req.body.email });
    
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      console.log('❌ Validation failed: Missing credentials');
      return res.status(400).json({ 
        message: 'Vui lòng nhập email và mật khẩu' 
      });
    }

    // Find user in MongoDB
    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ User not found:', email);
      return res.status(400).json({ message: 'Email hoặc mật khẩu không đúng' });
    }

    // Kiểm tra tài khoản bị khóa
    if (user.isLocked) {
      const isTeacherRejected = user.teacherStatus === 'rejected';
      return res.status(403).json({
        message: isTeacherRejected
          ? 'Tài khoản giáo viên của bạn đã bị từ chối. Bạn có thể nộp lại hồ sơ để được xem xét lại.'
          : 'Tài khoản của bạn đã bị khóa. Vui lòng liên hệ admin.',
        code: 'ACCOUNT_LOCKED',
        lockReason: user.lockReason || '',
        isTeacherRejected,
        rejectionReason: isTeacherRejected ? (user.teacherInfo?.rejectionReason || '') : ''
      });
    }

    // Check password
    if (!user.password) {
      console.log('❌ User has no password (might be OAuth user):', email);
      return res.status(400).json({ 
        message: 'Vui lòng đăng nhập bằng Google' 
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('❌ Password mismatch for:', email);
      return res.status(400).json({ message: 'Email hoặc mật khẩu không đúng' });
    }

    // Update last active date (ensure progress object exists)
    if (!user.progress) {
      user.progress = {
        completedLessons: [],
        currentStreak: 0,
        totalPoints: 0,
        totalStudyTime: 0,
        lastActiveDate: new Date()
      };
    } else {
      user.progress.lastActiveDate = new Date();
    }

    await user.save();

    // Generate token
    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    console.log('✅ Login successful:', { id: user._id, email: user.email, role: user.role });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        _id: user._id,
        username: user.username,
        email: user.email,
        displayName: user.displayName,
        firebaseUid: user.firebaseUid,
        uid: user.firebaseUid,
        xp: user.xp,
        level: user.level,
        role: user.role || 'student',
        teacherStatus: user.teacherStatus || 'none',
        teacherInfo: user.teacherInfo,
        adminInfo: user.adminInfo,
        programs: user.programs,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

// ===== YÊU CẦU NÂNG CẤP LÊN GIÁO VIÊN (student hiện tại) =====
router.post('/request-teacher', authMiddleware, (req, res) => {
  uploadTeacherDocs(req, res, async (uploadErr) => {
    if (uploadErr instanceof multer.MulterError) {
      return res.status(400).json({ success: false, message: `Lỗi upload: ${uploadErr.message}` });
    }
    if (uploadErr) {
      return res.status(400).json({ success: false, message: uploadErr.message });
    }

    try {
      const user = req.user;

      if (user.role === 'teacher' && user.teacherStatus === 'approved') {
        return res.status(400).json({ success: false, message: 'Bạn đã là giáo viên' });
      }
      if (user.role === 'teacher' && user.teacherStatus === 'pending') {
        return res.status(400).json({ success: false, message: 'Yêu cầu của bạn đang được xem xét' });
      }

      user.role = 'teacher';
      user.teacherStatus = 'pending';
      user.teacherInfo = {
        school: req.body.school || '',
        subject: req.body.subject || 'chemistry',
        department: req.body.department || '',
        yearsOfExperience: parseInt(req.body.yearsOfExperience) || 0,
        qualification: req.body.qualification || '',
        bio: req.body.bio || '',
        requestedAt: new Date(),
        documents: (req.files || []).map(file => ({
          originalName: file.originalname,
          fileName: file.filename, // This becomes the Cloudinary public_id
          filePath: file.path,     // This becomes the Cloudinary secure URL
          fileType: file.mimetype,
          fileSize: file.size,
          uploadedAt: new Date()
        }))
      };

      await user.save();

      // Gửi thông báo cho admin
      try {
        const admins = await User.find({ role: 'admin' }).select('email');
        const Notification = require('../models/Notification.cjs');
        for (const admin of admins) {
          await Notification.create({
            userId: admin._id,
            type: 'teacher_request',
            title: 'Yêu cầu giáo viên mới',
            body: `${user.username} (${user.email}) yêu cầu nâng cấp tài khoản lên giáo viên.`,
            data: { requesterId: user._id }
          });
        }
      } catch (notifErr) {
        console.error('Notification error:', notifErr);
      }

      res.json({
        success: true,
        message: 'Yêu cầu trở thành giáo viên đã được gửi. Vui lòng chờ admin phê duyệt.',
        data: {
          teacherStatus: user.teacherStatus,
          role: user.role
        }
      });
    } catch (error) {
      console.error('Request teacher error:', error);
      res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
    }
  });
});

// Google OAuth login/register
router.post('/auth/google', async (req, res) => {
  try {
    const { email, username, googleId, displayName } = req.body;

    // Find or create user in MongoDB
    let user = await User.findOne({ email });

    if (!user) {
      // Create new user for Google auth
      user = new User({
        username: username || email.split('@')[0],
        email,
        displayName: displayName || username,
        firebaseUid: googleId,
        xp: 0,
        level: 1,
        progress: {
          completedLessons: [],
          currentStreak: 0,
          totalPoints: 0,
          totalStudyTime: 0
        },
        learningPrograms: [],
        achievements: [],
        settings: {
          notifications: true,
          soundEffects: true,
          dailyGoal: 30
        }
      });
      
      await user.save();
      console.log('✅ New Google user created:', { id: user._id, email: user.email });
    } else {
      console.log('✅ Existing Google user logged in:', { id: user._id, email: user.email });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Google authentication successful',
      token,
      user: {
        id: user._id,
        _id: user._id,
        username: user.username,
        email: user.email,
        displayName: user.displayName,
        xp: user.xp,
        level: user.level,
        role: user.role || 'student',
        teacherInfo: user.teacherInfo,
        adminInfo: user.adminInfo,
        learningPrograms: user.learningPrograms
      }
    });
  } catch (error) {
    console.error('❌ Google auth error:', error);
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

// Update user profile (displayName, avatar)
router.put('/:userId', authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;
    const { displayName, avatar } = req.body;

    // Kiểm tra user chỉ có thể sửa profile của chính mình
    if (req.user._id.toString() !== userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Bạn không có quyền sửa profile này' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update fields if provided
    if (displayName !== undefined) {
      user.displayName = displayName;
    }
    if (avatar !== undefined) {
      user.avatar = avatar;
    }

    await user.save();

    console.log('✅ User profile updated:', { userId, displayName, avatar });

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        displayName: user.displayName,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error('❌ Error updating user profile:', error);
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

// Submit lesson completion and update progress
router.post('/submit-lesson', authMiddleware, async (req, res) => {
  try {
    const { firebaseUid, programId, pathId, lessonId, score, totalQuestions, studyDuration } = req.body;

    let user = await User.findOne({ firebaseUid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check and reset daily data
    user = checkAndResetDailyData(user);

    // Calculate percentage and stars
    const percentage = (score / totalQuestions) * 100;
    const completed = percentage >= 50; // Need at least 50% to complete (1 star)

    console.log('📝 Updating lesson progress:', { 
      programId, 
      pathId, 
      lessonId, 
      score, 
      totalQuestions,
      percentage: percentage.toFixed(2),
      completed,
      studyDuration
    });

    // Update program progress using the model method
    const updatedProgram = user.updateProgramProgress(programId, pathId, lessonId, score);

    if (!updatedProgram) {
      return res.status(404).json({ message: 'Program not found in user profile' });
    }

    // Update lesson stars based on percentage
    const stars = user.updateLessonStars(programId, pathId, lessonId, percentage);

    // XP is now awarded through MISSION completion only (not per lesson)
    // But we need to track today's progress for daily missions
    if (completed) {
      user.todayProgress.lessons = (user.todayProgress.lessons || 0) + 1;
      if (stars === 3) {
        user.todayProgress.perfectLessons = (user.todayProgress.perfectLessons || 0) + 1;
      }
    }

    // Update study time and streak if duration provided
    let studyStats = null;
    if (studyDuration && studyDuration > 0) {
      studyStats = user.updateStudyTime(programId, studyDuration);
      console.log('⏱️ Study time updated:', studyStats);
    }

    // ============ AUTO-UPGRADE CLASS LOGIC ============
    // Check if user completed all lessons in current class and upgrade to next class
    let classUpgraded = false;
    let newClass = null;
    
    // Only check for class upgrade if the lesson was completed and user is at the class of this lesson
    const lessonClassId = parseInt(pathId);
    if (completed && lessonClassId === updatedProgram.currentClass && lessonClassId < 12) {
      const currentClass = lessonClassId;
      
      // Get total lessons count for current class from database
      const totalLessonsInClass = await Lesson.countDocuments({ classId: currentClass });
      
      // Count completed lessons for current class (uniqueId format: classId * 1000 + lessonId)
      const completedLessonsInClass = updatedProgram.progress.completedLessons.filter(
        uniqueId => Math.floor(uniqueId / 1000) === currentClass
      ).length;
      
      console.log(`📊 Class ${currentClass} progress: ${completedLessonsInClass}/${totalLessonsInClass} lessons`);
      
      // If all lessons completed, upgrade to next class
      if (completedLessonsInClass >= totalLessonsInClass && totalLessonsInClass > 0) {
        const nextClass = currentClass + 1;
        updatedProgram.currentClass = nextClass;
        user.markModified('programs');
        classUpgraded = true;
        newClass = nextClass;
        console.log(`🎉 AUTO-UPGRADE: User upgraded from class ${currentClass} to class ${nextClass}!`);
      }
    }
    // ============ END AUTO-UPGRADE CLASS LOGIC ============

    await user.save();
    console.log('✅ Lesson progress updated successfully');

    res.json({
      message: 'Lesson completed',
      completed,
      stars,
      score,
      totalQuestions,
      percentage: percentage.toFixed(2),
      program: updatedProgram,
      studyStats,
      todayProgress: user.todayProgress,
      classUpgraded,
      newClass
    });
  } catch (error) {
    console.error('❌ Error updating lesson progress:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update learning progress (legacy - kept for backward compatibility)
router.post('/progress', authMiddleware, async (req, res) => {
  try {
    const { userId, program, grade, lesson } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find or create learning program
    let learningProgram = user.learningPrograms.find(p => p.program === program);
    
    if (!learningProgram) {
      learningProgram = {
        program, // e.g., "Hóa học"
        grades: []
      };
      user.learningPrograms.push(learningProgram);
    }

    // Find or create grade
    let gradeData = learningProgram.grades.find(g => g.grade === grade);
    
    if (!gradeData) {
      gradeData = {
        grade, // e.g., "Lớp 8"
        lessons: []
      };
      learningProgram.grades.push(gradeData);
    }

    // XP is now awarded through MISSION completion only
    if (!gradeData.lessons.includes(lesson)) {
      gradeData.lessons.push(lesson);
    }

    await user.save();
    console.log('✅ Progress updated for user:', userId);

    res.json({
      message: 'Progress updated',
      user: {
        id: user.id,
        xp: user.xp,
        learningPrograms: user.learningPrograms
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update user grade after placement test
router.post('/update-grade', authMiddleware, async (req, res) => {
  try {
    const { userId, grade } = req.body;

    // Tìm user theo firebaseUid hoặc _id
    const user = await User.findOne({ $or: [{ firebaseUid: userId }, { _id: userId }] });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Cập nhật grade vào profile nếu có
    if (!user.profile) {
      user.profile = {};
    }
    user.profile.grade = grade;
    
    await user.save();
    console.log('✅ Grade updated for user:', userId, 'to grade:', grade);

    res.json({
      message: 'Grade updated successfully',
      user: {
        id: user._id,
        grade: grade
      }
    });
  } catch (error) {
    console.error('❌ Update grade error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Enroll user in a program after placement test
router.post('/enroll-program', authMiddleware, async (req, res) => {
  try {
    const { userId, programId, programName, initialClassId, placementTestScore, placementTestTotal, curriculumType } = req.body;

    console.log('📝 Enrolling user:', { userId, programId, initialClassId, curriculumType });

    // Tìm user theo email trước (vì PlacementTest gửi email), sau đó firebaseUid
    let user;
    try {
      // Thử tìm theo email hoặc firebaseUid trước
      user = await User.findOne({ 
        $or: [
          { email: userId },
          { firebaseUid: userId }
        ] 
      });
      
      // Nếu không tìm thấy và userId có format ObjectId, thử tìm theo _id
      if (!user && userId.match(/^[0-9a-fA-F]{24}$/)) {
        user = await User.findById(userId);
      }
    } catch (error) {
      console.log('⚠️ Error finding user:', error.message);
    }
    
    if (!user) {
      console.log('❌ User not found:', userId);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('✅ Found user:', user.email);

    // Kiểm tra xem đã đăng ký chương trình này chưa
    const existingProgram = user.programs.find(p => p.programId === programId);
    
    if (existingProgram) {
      console.log('⚠️ Program already enrolled, updating...');
      // Nếu đã có, cập nhật thông tin
      existingProgram.currentClass = initialClassId;
      existingProgram.placementTestCompleted = true;
      existingProgram.placementTestScore = placementTestScore || 0;
      existingProgram.isActive = true;
      // Cập nhật curriculum type nếu có
      if (curriculumType) {
        existingProgram.curriculumType = curriculumType;
      }
    } else {
      // Chưa có, thêm mới
      user.programs.push({
        programId,
        programName,
        currentClass: initialClassId,
        curriculumType: curriculumType || null, // Thêm curriculum type
        isActive: true,
        placementTestCompleted: true,
        placementTestScore: placementTestScore || 0,
        enrolledAt: new Date(),
        progress: {
          completedLessons: [],
          totalScore: 0,
          lastStudyDate: null
        }
      });
    }

    // Cập nhật grade vào profile
    if (!user.profile) {
      user.profile = {};
    }
    user.profile.grade = initialClassId;
    
    await user.save();
    console.log('✅ Program enrolled successfully for user:', user.email);

    res.json({
      success: true,
      message: 'Program enrolled successfully',
      user: {
        id: user._id,
        email: user.email,
        programs: user.programs,
        profile: user.profile
      }
    });
  } catch (error) {
    console.error('❌ Enroll program error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: error.message 
    });
  }
});

// Helper function to get today's date string
const getTodayDateString = () => {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

// Helper function to check and reset daily data if new day
const checkAndResetDailyData = (user) => {
  const today = getTodayDateString();
  
  // Reset daily claimed missions if it's a new day
  if (user.dailyMissionsDate !== today) {
    user.dailyClaimedMissions = [];
    user.dailyMissionsDate = today;
  }
  
  // Reset today progress if it's a new day
  if (!user.todayProgress || user.todayProgress.date !== today) {
    user.todayProgress = {
      date: today,
      lessons: 0,
      challenges: 0,
      perfectLessons: 0,
      login: 1 // Login counts as 1 when they access
    };
  } else {
    // Mark login for today
    user.todayProgress.login = 1;
  }
  
  return user;
};

// Get user by firebaseUid
router.get('/firebase/:firebaseUid', async (req, res) => {
  try {
    let user = await User.findOne({ firebaseUid: req.params.firebaseUid });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check and reset daily data
    user = checkAndResetDailyData(user);
    await user.save();

    res.json({
      _id: user._id,
      id: user._id,
      username: user.username,
      email: user.email,
      displayName: user.displayName || user.username || '',
      avatar: user.avatar || '',
      xp: user.xp,
      level: user.level,
      role: user.role || 'student',
      teacherInfo: user.teacherInfo,
      adminInfo: user.adminInfo,
      programs: user.programs,
      profile: user.profile,
      firebaseUid: user.firebaseUid,
      claimedMissions: user.claimedMissions || [],
      dailyClaimedMissions: user.dailyClaimedMissions || [],
      todayProgress: user.todayProgress || { lessons: 0, challenges: 0, perfectLessons: 0, login: 1 }
    });
  } catch (error) {
    console.error('❌ Error fetching user by firebaseUid:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user profile
router.get('/profile/:userId', async (req, res) => {
  try {
    const user = await User.findOne({ $or: [{ firebaseUid: req.params.userId }, { _id: req.params.userId }] });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      xp: user.xp,
      level: user.level,
      programs: user.programs,
      profile: user.profile,
      firebaseUid: user.firebaseUid
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get study statistics for a program
router.get('/study-stats/:firebaseUid/:programId', async (req, res) => {
  try {
    const { firebaseUid, programId } = req.params;
    
    const user = await User.findOne({ firebaseUid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const program = user.programs.find(p => p.programId === programId);
    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }

    // Check and reset streak if needed
    const streakStatus = user.checkAndResetStreak(programId);
    if (streakStatus && streakStatus.reset) {
      await user.save();
    }

    res.json({
      studyTime: program.studyTime || 0,
      studyStreak: program.studyStreak || {
        currentStreak: 0,
        longestStreak: 0,
        lastStudyDate: null,
        streakHistory: []
      },
      streakStatus: streakStatus
    });
  } catch (error) {
    console.error('❌ Error fetching study stats:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update study time manually (for tracking time spent on lessons)
router.post('/update-study-time', async (req, res) => {
  try {
    const { firebaseUid, programId, durationMinutes } = req.body;

    if (!firebaseUid || !programId || !durationMinutes) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const user = await User.findOne({ firebaseUid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const studyStats = user.updateStudyTime(programId, durationMinutes);
    
    if (!studyStats) {
      return res.status(404).json({ message: 'Program not found' });
    }

    await user.save();

    res.json({
      message: 'Study time updated successfully',
      studyStats
    });
  } catch (error) {
    console.error('❌ Error updating study time:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update stage progress for Journey mode
router.put('/firebase/:firebaseUid/stage-progress', async (req, res) => {
  try {
    const { firebaseUid } = req.params;
    const { stageKey, stars, programId } = req.body;

    console.log('📝 Updating stage progress:', { firebaseUid, stageKey, stars, programId });

    const user = await User.findOne({ firebaseUid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find or create the program
    let program = user.programs.find(p => p.programId === programId);
    if (!program) {
      return res.status(404).json({ message: 'Program not found' });
    }

    // Initialize stageStars if not exists
    if (!program.progress) {
      program.progress = {};
    }
    if (!program.progress.stageStars) {
      program.progress.stageStars = {};
    }

    // Only update if new stars is higher than existing
    const existingStars = program.progress.stageStars[stageKey] || 0;
    if (stars > existingStars) {
      program.progress.stageStars[stageKey] = stars;
      
      // Add XP: 20 XP per new star earned
      const newStarsEarned = stars - existingStars;
      user.xp = (user.xp || 0) + (newStarsEarned * 20);
      console.log(`✨ Added ${newStarsEarned * 20} XP for ${newStarsEarned} new stars`);
    }

    user.markModified('programs');
    await user.save();

    console.log('✅ Stage progress updated:', { stageKey, stars });

    res.json({
      success: true,
      message: 'Stage progress updated',
      stageStars: program.progress.stageStars
    });
  } catch (error) {
    console.error('❌ Error updating stage progress:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Select curriculum for a program
router.post('/select-curriculum', async (req, res) => {
  try {
    const { userId, programId, curriculumType, classId } = req.body;

    console.log('📝 Selecting curriculum:', { userId, programId, curriculumType, classId });

    if (!userId || !programId || !curriculumType) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Validate curriculum type
    const validCurriculums = ['ketnoi', 'canhdieu', 'chantroicangtao', 'standard'];
    if (!validCurriculums.includes(curriculumType)) {
      return res.status(400).json({ message: 'Invalid curriculum type' });
    }

    // Find user
    let user;
    try {
      user = await User.findOne({ 
        $or: [
          { email: userId },
          { firebaseUid: userId }
        ] 
      });
      
      if (!user && userId.match(/^[0-9a-fA-F]{24}$/)) {
        user = await User.findById(userId);
      }
    } catch (error) {
      console.log('⚠️ Error finding user:', error.message);
    }
    
    if (!user) {
      console.log('❌ User not found:', userId);
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('✅ Found user:', user.email);

    // Find the program
    const program = user.programs.find(p => p.programId === programId);
    
    if (!program) {
      console.log('❌ Program not found:', programId);
      return res.status(404).json({ message: 'Program not found. Please enroll in the program first.' });
    }

    // Update curriculum type
    program.curriculumType = curriculumType;
    
    // Update class if provided
    if (classId) {
      program.currentClass = parseInt(classId);
    }

    user.markModified('programs');
    await user.save();
    
    console.log('✅ Curriculum selected successfully:', { programId, curriculumType });

    res.json({
      success: true,
      message: 'Curriculum selected successfully',
      user: {
        id: user._id,
        email: user.email,
        programs: user.programs,
        profile: user.profile
      }
    });
  } catch (error) {
    console.error('❌ Select curriculum error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server error', 
      error: error.message 
    });
  }
});

// ==================== MISSION SYSTEM ====================

// Get user's completed missions
router.get('/:userId/missions', authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;
    
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check and reset daily data
    user = checkAndResetDailyData(user);
    await user.save();
    
    res.json({
      success: true,
      claimedMissions: user.claimedMissions || [],
      dailyClaimedMissions: user.dailyClaimedMissions || [],
      todayProgress: user.todayProgress || { lessons: 0, challenges: 0, perfectLessons: 0, login: 1 },
      xp: user.xp || 0,
      level: user.level || 1
    });
  } catch (error) {
    console.error('❌ Get missions error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Claim a mission reward
router.post('/:userId/missions/claim', authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;
    const { missionId, missionExp, isDaily } = req.body;
    
    if (!missionId || !missionExp) {
      return res.status(400).json({ message: 'Mission ID and EXP are required' });
    }
    
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check and reset daily data first
    user = checkAndResetDailyData(user);
    
    // Handle daily vs regular missions
    if (isDaily) {
      // Initialize dailyClaimedMissions array if not exists
      if (!user.dailyClaimedMissions) {
        user.dailyClaimedMissions = [];
      }
      
      // Check if daily mission already claimed today
      if (user.dailyClaimedMissions.includes(missionId)) {
        return res.status(400).json({ 
          success: false,
          message: 'Daily mission already claimed today' 
        });
      }
      
      // Mark daily mission as claimed
      user.dailyClaimedMissions.push(missionId);
    } else {
      // Initialize claimedMissions array if not exists
      if (!user.claimedMissions) {
        user.claimedMissions = [];
      }
      
      // Check if regular mission already claimed
      if (user.claimedMissions.includes(missionId)) {
        return res.status(400).json({ 
          success: false,
          message: 'Mission already claimed' 
        });
      }
      
      // Mark regular mission as claimed
      user.claimedMissions.push(missionId);
    }
    
    // Add XP
    user.xp = (user.xp || 0) + missionExp;
    
    // Check for level up (every 100 XP = 1 level)
    const newLevel = Math.floor(user.xp / 100) + 1;
    const leveledUp = newLevel > (user.level || 1);
    user.level = newLevel;
    
    await user.save();
    
    console.log(`🎁 ${isDaily ? 'Daily' : 'Regular'} mission claimed: ${missionId} | +${missionExp} XP | User: ${userId}`);
    
    res.json({
      success: true,
      message: 'Mission claimed successfully',
      missionId,
      isDaily,
      xpGained: missionExp,
      totalXp: user.xp,
      level: user.level,
      leveledUp
    });
  } catch (error) {
    console.error('❌ Claim mission error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// ==================== STUDENT CLASSROOM ROUTES ====================
const ClassRoom = require('../models/ClassRoom.cjs');

// POST /api/users/classes/join - Học sinh tham gia lớp bằng mã lớp
router.post('/classes/join', authMiddleware, async (req, res) => {
  try {
    const { classCode } = req.body;
    const userId = req.user._id.toString();

    if (!classCode) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng nhập mã lớp học'
      });
    }

    // Tìm user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy người dùng'
      });
    }

    // Chỉ học sinh mới có thể tham gia lớp
    if (user.role !== 'student') {
      return res.status(403).json({
        success: false,
        message: 'Chỉ học sinh mới có thể tham gia lớp học'
      });
    }

    // Tìm lớp học bằng mã
    const classRoom = await ClassRoom.findOne({ 
      code: classCode.toUpperCase().trim(),
      status: 'active'
    });

    if (!classRoom) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy lớp học với mã này'
      });
    }

    // Kiểm tra xem đã tham gia chưa
    const isAlreadyEnrolled = classRoom.students.some(
      s => s.student.toString() === userId && s.status === 'active'
    );

    if (isAlreadyEnrolled) {
      return res.status(400).json({
        success: false,
        message: 'Bạn đã tham gia lớp học này rồi'
      });
    }

    // Kiểm tra số lượng học sinh tối đa
    const activeStudents = classRoom.students.filter(s => s.status === 'active').length;
    if (activeStudents >= classRoom.settings.maxStudents) {
      return res.status(400).json({
        success: false,
        message: `Lớp học đã đầy (tối đa ${classRoom.settings.maxStudents} học sinh)`
      });
    }

    // Kiểm tra xem có cần duyệt không
    const enrollStatus = classRoom.settings.requireApproval ? 'pending' : 'active';

    // Kiểm tra xem user đã có trong danh sách chưa (có thể là inactive/pending)
    const existingEntry = classRoom.students.find(
      s => s.student.toString() === userId
    );

    if (existingEntry) {
      // Cập nhật status
      existingEntry.status = enrollStatus;
      existingEntry.enrolledAt = new Date();
    } else {
      // Thêm mới
      classRoom.students.push({
        student: userId,
        enrolledAt: new Date(),
        status: enrollStatus
      });
    }

    await classRoom.save();

    // Cập nhật enrolledClasses của học sinh
    const existingEnrollment = user.enrolledClasses?.find(
      e => e.classId.toString() === classRoom._id.toString()
    );

    if (!existingEnrollment) {
      if (!user.enrolledClasses) {
        user.enrolledClasses = [];
      }
      user.enrolledClasses.push({
        classId: classRoom._id,
        enrolledAt: new Date()
      });
      
      // Cập nhật assignedTeacher
      if (!user.assignedTeacher) {
        user.assignedTeacher = classRoom.teacher;
      }
      
      await user.save();
    }

    // Populate để lấy thông tin giáo viên
    await classRoom.populate('teacher', 'username displayName email');

    const message = enrollStatus === 'pending' 
      ? 'Đã gửi yêu cầu tham gia lớp. Vui lòng chờ giáo viên duyệt.'
      : 'Tham gia lớp học thành công!';

    res.json({
      success: true,
      message,
      data: {
        classId: classRoom._id,
        className: classRoom.name,
        classCode: classRoom.code,
        grade: classRoom.grade,
        teacher: classRoom.teacher,
        status: enrollStatus
      }
    });

  } catch (error) {
    console.error('❌ Join class error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
});

// GET /api/users/classes - Lấy danh sách lớp học của học sinh
router.get('/classes', authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id.toString();

    // Lấy danh sách lớp học của học sinh - sử dụng $elemMatch để đảm bảo match đúng student
    const classes = await ClassRoom.find({
      students: {
        $elemMatch: {
          student: userId,
          status: { $in: ['active', 'pending'] }
        }
      }
    })
      .populate('teacher', 'username displayName email avatar')
      .select('name code description grade subject curriculumType teacher settings statistics students announcements createdAt')
      .sort({ createdAt: -1 });

    // Format response với thông tin enrollment của user
    const formattedClasses = classes.map(classRoom => {
      const studentEntry = classRoom.students.find(
        s => s.student.toString() === userId
      );
      
      return {
        _id: classRoom._id,
        name: classRoom.name,
        code: classRoom.code,
        description: classRoom.description,
        grade: classRoom.grade,
        subject: classRoom.subject,
        curriculumType: classRoom.curriculumType,
        teacher: classRoom.teacher,
        studentCount: classRoom.students.filter(s => s.status === 'active').length,
        announcements: classRoom.announcements?.slice(0, 3) || [], // 3 thông báo gần nhất
        statistics: classRoom.statistics,
        enrolledAt: studentEntry?.enrolledAt,
        enrollmentStatus: studentEntry?.status,
        createdAt: classRoom.createdAt
      };
    });

    res.json({
      success: true,
      data: formattedClasses
    });

  } catch (error) {
    console.error('❌ Get student classes error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
});

// GET /api/users/classes/:classId - Lấy chi tiết lớp học (cho học sinh)
router.get('/classes/:classId', authMiddleware, async (req, res) => {
  try {
    const { classId } = req.params;
    const userId = req.user._id.toString();

    const classRoom = await ClassRoom.findById(classId)
      .populate('teacher', 'username displayName email avatar')
      .populate('students.student', 'username displayName avatar xp level');

    if (!classRoom) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy lớp học'
      });
    }

    // Kiểm tra xem học sinh có trong lớp không
    const studentEntry = classRoom.students.find(
      s => s.student._id.toString() === userId && ['active', 'pending'].includes(s.status)
    );

    if (!studentEntry) {
      return res.status(403).json({
        success: false,
        message: 'Bạn không phải thành viên của lớp học này'
      });
    }

    // Nếu đang pending, chỉ trả về thông tin cơ bản
    if (studentEntry.status === 'pending') {
      return res.json({
        success: true,
        data: {
          _id: classRoom._id,
          name: classRoom.name,
          code: classRoom.code,
          grade: classRoom.grade,
          teacher: classRoom.teacher,
          enrollmentStatus: 'pending',
          message: 'Đang chờ giáo viên duyệt'
        }
      });
    }

    // Lấy danh sách bạn học (chỉ active students, ẩn thông tin nhạy cảm)
    const classmates = classRoom.students
      .filter(s => s.status === 'active' && s.student._id.toString() !== userId)
      .map(s => ({
        _id: s.student._id,
        displayName: s.student.displayName,
        avatar: s.student.avatar,
        level: s.student.level
      }));

    // Lấy bài tập được giao (chỉ active)
    const assignments = classRoom.assignments
      ?.filter(a => a.isActive)
      .map(a => {
        const myCompletion = a.completedBy?.find(
          c => c.student.toString() === userId
        );
        return {
          _id: a._id,
          title: a.title,
          description: a.description,
          type: a.type,
          lessonId: a.lessonId,
          challengeSlug: a.challengeSlug,
          dueDate: a.dueDate,
          points: a.points,
          isCompleted: !!myCompletion,
          myScore: myCompletion?.score,
          myStars: myCompletion?.stars,
          completedAt: myCompletion?.completedAt,
          createdAt: a.createdAt
        };
      }) || [];

    res.json({
      success: true,
      data: {
        _id: classRoom._id,
        name: classRoom.name,
        code: classRoom.code,
        description: classRoom.description,
        grade: classRoom.grade,
        subject: classRoom.subject,
        curriculumType: classRoom.curriculumType,
        teacher: classRoom.teacher,
        studentCount: classRoom.students.filter(s => s.status === 'active').length,
        classmates,
        announcements: classRoom.announcements?.slice(0, 10) || [],
        assignments,
        statistics: classRoom.statistics,
        enrollmentStatus: 'active',
        enrolledAt: studentEntry.enrolledAt
      }
    });

  } catch (error) {
    console.error('❌ Get class detail error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
});

// DELETE /api/users/classes/:classId/leave - Học sinh rời khỏi lớp
router.delete('/classes/:classId/leave', authMiddleware, async (req, res) => {
  try {
    const { classId } = req.params;
    const userId = req.user._id.toString();

    const classRoom = await ClassRoom.findById(classId);
    if (!classRoom) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy lớp học'
      });
    }

    // Tìm học sinh trong lớp
    const studentIndex = classRoom.students.findIndex(
      s => s.student.toString() === userId
    );

    if (studentIndex === -1) {
      return res.status(400).json({
        success: false,
        message: 'Bạn không phải thành viên của lớp học này'
      });
    }

    // Đánh dấu inactive
    classRoom.students[studentIndex].status = 'inactive';
    await classRoom.save();

    // Xóa khỏi enrolledClasses của học sinh
    await User.findByIdAndUpdate(userId, {
      $pull: { enrolledClasses: { classId: classRoom._id } }
    });

    res.json({
      success: true,
      message: 'Đã rời khỏi lớp học'
    });

  } catch (error) {
    console.error('❌ Leave class error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
});

// GET /api/users/classes/:classId/assignments - Lấy bài tập của lớp (cho học sinh)
router.get('/classes/:classId/assignments', authMiddleware, async (req, res) => {
  try {
    const { classId } = req.params;
    const userId = req.user._id.toString();

    const classRoom = await ClassRoom.findById(classId);
    if (!classRoom) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy lớp học'
      });
    }

    // Kiểm tra học sinh có trong lớp không
    const isEnrolled = classRoom.students.some(
      s => s.student.toString() === userId && s.status === 'active'
    );

    if (!isEnrolled) {
      return res.status(403).json({
        success: false,
        message: 'Bạn không phải thành viên của lớp học này'
      });
    }

    // Lấy bài tập
    const assignments = classRoom.assignments
      ?.filter(a => a.isActive)
      .map(a => {
        const myCompletion = a.completedBy?.find(
          c => c.student.toString() === userId
        );
        return {
          _id: a._id,
          title: a.title,
          description: a.description,
          type: a.type,
          lessonId: a.lessonId,
          challengeSlug: a.challengeSlug,
          dueDate: a.dueDate,
          points: a.points,
          isCompleted: !!myCompletion,
          myScore: myCompletion?.score,
          myStars: myCompletion?.stars,
          completedAt: myCompletion?.completedAt,
          createdAt: a.createdAt,
          // Thống kê hoàn thành của lớp
          totalCompleted: a.completedBy?.length || 0
        };
      }) || [];

    // Sắp xếp: chưa hoàn thành + sắp đến hạn lên đầu
    assignments.sort((a, b) => {
      // Ưu tiên chưa hoàn thành
      if (a.isCompleted !== b.isCompleted) {
        return a.isCompleted ? 1 : -1;
      }
      // Ưu tiên deadline gần
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      return 0;
    });

    res.json({
      success: true,
      data: assignments
    });

  } catch (error) {
    console.error('❌ Get class assignments error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
});

// GET /api/users/classes/:classId/pk-rooms - Lấy danh sách phòng PK của lớp (cho học sinh)
router.get('/classes/:classId/pk-rooms', authMiddleware, async (req, res) => {
  try {
    const { classId } = req.params;
    const userId = req.user._id.toString();
    const Room = require('../models/Room.cjs');

    // Kiểm tra học sinh có trong lớp không
    const classroom = await ClassRoom.findById(classId);
    if (!classroom) {
      return res.status(404).json({
        success: false,
        message: 'Không tìm thấy lớp học'
      });
    }

    const isEnrolled = classroom.students.some(
      s => s.student.toString() === userId && s.status === 'active'
    );

    if (!isEnrolled) {
      return res.status(403).json({
        success: false,
        message: 'Bạn không phải là học sinh của lớp này'
      });
    }

    // Lấy các phòng PK đang hoạt động của lớp
    const rooms = await Room.find({
      classRoom: classId,
      isClassRoom: true,
      status: { $in: ['waiting', 'playing'] }
    })
    .populate('host', 'displayName username')
    .sort({ createdAt: -1 });

    const roomData = rooms.map(room => ({
      _id: room._id,
      code: room.code,
      name: room.name,
      status: room.status,
      mode: room.mode,
      host: {
        displayName: room.host?.displayName || room.host?.username,
      },
      playerCount: room.players?.length || 0,
      maxPlayers: room.maxPlayers,
      questionCount: room.questionCount,
      timePerQuestion: room.timePerQuestion,
      createdAt: room.createdAt
    }));

    res.json({
      success: true,
      data: roomData
    });

  } catch (error) {
    console.error('❌ Get class PK rooms error:', error);
    res.status(500).json({
      success: false,
      message: 'Lỗi server',
      error: error.message
    });
  }
});

// ==================== RESUBMIT TEACHER (NỘP LẠI HỒ SƠ GV) ====================

// POST /api/users/resubmit-teacher - Nộp lại hồ sơ giáo viên (không cần auth vì tài khoản bị khóa)
router.post('/resubmit-teacher', (req, res) => {
  uploadTeacherDocs(req, res, async (uploadErr) => {
    if (uploadErr instanceof multer.MulterError) {
      return res.status(400).json({ success: false, message: `Lỗi upload: ${uploadErr.message}` });
    }
    if (uploadErr) {
      return res.status(400).json({ success: false, message: uploadErr.message });
    }

    try {
      const { email, password, school, subject, department, yearsOfExperience, qualification, bio } = req.body;

      if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Vui lòng nhập email và mật khẩu' });
      }

      // Tìm user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ success: false, message: 'Không tìm thấy tài khoản với email này' });
      }

      // Xác thực mật khẩu
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ success: false, message: 'Mật khẩu không đúng' });
      }

      // Kiểm tra trạng thái
      if (user.teacherStatus !== 'rejected') {
        return res.status(400).json({ success: false, message: 'Tài khoản này không ở trạng thái bị từ chối' });
      }

      // Cập nhật thông tin giáo viên
      if (school) user.teacherInfo.school = school;
      if (subject) user.teacherInfo.subject = subject;
      if (department) user.teacherInfo.department = department;
      if (yearsOfExperience) user.teacherInfo.yearsOfExperience = parseInt(yearsOfExperience);
      if (qualification) user.teacherInfo.qualification = qualification;
      if (bio) user.teacherInfo.bio = bio;

      // Xử lý documents mới
      if (req.files && req.files.length > 0) {
        const newDocuments = req.files.map(file => ({
          originalName: file.originalname,
          fileName: file.filename, // Cloudinary public_id
          filePath: file.path,     // Cloudinary secure URL
          fileType: file.mimetype,
          fileSize: file.size,
          uploadedAt: new Date()
        }));
        user.teacherInfo.documents = newDocuments;
      }

      // Cập nhật trạng thái
      user.teacherInfo.requestedAt = new Date();
      user.teacherInfo.rejectionReason = '';
      user.teacherStatus = 'pending';
      user.isLocked = false;
      user.lockReason = '';
      user.lockedAt = undefined;
      user.lockedBy = undefined;

      await user.save();

      // Gửi notification cho admins
      try {
        const Notification = require('../models/Notification.cjs');
        const admins = await User.find({ role: 'admin' });
        for (const admin of admins) {
          await Notification.create({
            userId: admin._id,
            type: 'teacher_request',
            title: 'Yêu cầu giáo viên nộp lại',
            body: `${user.displayName || user.username} đã nộp lại hồ sơ giáo viên sau khi bị từ chối.`,
            data: { userId: user._id, isResubmission: true }
          });
        }
      } catch (notifErr) {
        console.error('Notification error:', notifErr);
      }

      // Ghi audit log
      try {
        const AuditLog = require('../models/AuditLog.cjs');
        await AuditLog.create({
          action: 'resubmit_teacher',
          performedBy: user._id,
          targetUser: user._id,
          details: { resubmission: true },
          ip: req.ip
        });
      } catch (auditErr) {
        console.error('Audit log error:', auditErr);
      }

      res.json({
        success: true,
        message: 'Hồ sơ giáo viên đã được nộp lại. Vui lòng chờ admin phê duyệt.'
      });
    } catch (error) {
      console.error('Resubmit teacher error:', error);
      res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
    }
  });
});

// ==================== ANNOUNCEMENTS (PUBLIC READ) ====================

// GET /api/users/announcements/system - Lấy thông báo hệ thống đang active
router.get('/announcements/system', async (req, res) => {
  try {
    const announcements = await Announcement.find({
      type: 'system',
      isActive: true
    })
      .populate('author', 'displayName email')
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();
    
    res.json({ success: true, data: announcements });
  } catch (error) {
    console.error('Get system announcements error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

// GET /api/users/classes/:classId/announcements - Lấy thông báo của lớp (cho học sinh)
router.get('/classes/:classId/announcements', authMiddleware, async (req, res) => {
  try {
    const announcements = await Announcement.find({
      type: 'class',
      classId: req.params.classId,
      isActive: true
    })
      .populate('author', 'displayName email')
      .sort({ createdAt: -1 })
      .lean();
    
    res.json({ success: true, data: announcements });
  } catch (error) {
    console.error('Get class announcements error:', error);
    res.status(500).json({ success: false, message: 'Lỗi server', error: error.message });
  }
});

module.exports = router;

