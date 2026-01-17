const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.cjs');
const Lesson = require('../models/Lesson.cjs');

// Register route
router.post('/register', async (req, res) => {
  try {
    console.log('📝 Register request received:', { 
      username: req.body.username, 
      email: req.body.email 
    });
    
    const { username, email, password, isGoogleAuth } = req.body;

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
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      displayName: username,
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

    await newUser.save();
    
    console.log('✅ User registered successfully:', { 
      id: newUser._id, 
      email: newUser.email
    });

    // Generate token
    const token = jwt.sign(
      { userId: newUser._id.toString(), email: newUser.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        displayName: newUser.displayName,
        xp: newUser.xp,
        level: newUser.level,
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

    console.log('✅ Login successful:', { id: user._id, email: user.email });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        displayName: user.displayName,
        xp: user.xp,
        level: user.level,
        learningPrograms: user.learningPrograms
      }
    });
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
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
        username: user.username,
        email: user.email,
        displayName: user.displayName,
        xp: user.xp,
        level: user.level,
        learningPrograms: user.learningPrograms
      }
    });
  } catch (error) {
    console.error('❌ Google auth error:', error);
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
});

// Update user profile (displayName, avatar)
router.put('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { displayName, avatar } = req.body;

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
router.post('/submit-lesson', async (req, res) => {
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
router.post('/progress', async (req, res) => {
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
router.post('/update-grade', async (req, res) => {
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
router.post('/enroll-program', async (req, res) => {
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
router.get('/:userId/missions', async (req, res) => {
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
router.post('/:userId/missions/claim', async (req, res) => {
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

module.exports = router;

