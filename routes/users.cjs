const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.cjs');

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
      hashedPassword,
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
    if (!user.hashedPassword) {
      console.log('❌ User has no password (might be OAuth user):', email);
      return res.status(400).json({ 
        message: 'Vui lòng đăng nhập bằng Google' 
      });
    }

    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatch) {
      console.log('❌ Password mismatch for:', email);
      return res.status(400).json({ message: 'Email hoặc mật khẩu không đúng' });
    }

    // Update last active date
    user.progress.lastActiveDate = new Date();
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

// Submit lesson completion and update progress
router.post('/submit-lesson', async (req, res) => {
  try {
    const { firebaseUid, programId, pathId, lessonId, score, totalQuestions } = req.body;

    const user = await User.findOne({ firebaseUid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

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
      completed
    });

    // Update program progress using the model method
    const updatedProgram = user.updateProgramProgress(programId, pathId, lessonId, score);

    if (!updatedProgram) {
      return res.status(404).json({ message: 'Program not found in user profile' });
    }

    // Update lesson stars based on percentage
    const stars = user.updateLessonStars(programId, pathId, lessonId, percentage);

    // Add XP based on stars: 1 star=20 XP, 2 stars=40 XP, 3 stars=60 XP
    if (completed && stars > 0) {
      const xpGain = stars * 20;
      user.xp = (user.xp || 0) + xpGain;
      console.log(`✨ Added ${xpGain} XP to user (${stars} stars)`);
    }

    await user.save();
    console.log('✅ Lesson progress updated successfully');

    res.json({
      message: 'Lesson completed',
      completed,
      stars,
      score,
      totalQuestions,
      percentage: percentage.toFixed(2),
      xpGained: completed && stars > 0 ? stars * 20 : 0,
      program: updatedProgram
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

    // Add lesson if not exists
    if (!gradeData.lessons.includes(lesson)) {
      gradeData.lessons.push(lesson);
      user.xp += 10; // Add XP for completing lesson
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
    const { userId, programId, programName, initialClassId, placementTestScore, placementTestTotal } = req.body;

    console.log('📝 Enrolling user:', { userId, programId, initialClassId });

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
    } else {
      // Chưa có, thêm mới
      user.programs.push({
        programId,
        programName,
        currentClass: initialClassId,
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

// Get user by firebaseUid
router.get('/firebase/:firebaseUid', async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.params.firebaseUid });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      id: user._id,
      username: user.username,
      email: user.email,
      displayName: user.displayName || user.username || '',
      avatar: user.avatar || '',
      xp: user.xp,
      level: user.level,
      programs: user.programs,
      profile: user.profile,
      firebaseUid: user.firebaseUid
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

module.exports = router;

