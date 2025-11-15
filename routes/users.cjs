const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User.cjs');
const router = express.Router();

// Tạo tài khoản mới (Local registration)
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, displayName, grade } = req.body;
    
    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ 
        message: 'Username, email và password là bắt buộc' 
      });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ 
        message: 'Mật khẩu phải có ít nhất 6 ký tự' 
      });
    }
    
    // Kiểm tra username và email đã tồn tại
    const existingUser = await User.findOne({ 
      $or: [{ username }, { email }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        message: existingUser.username === username ? 
          'Tên người dùng đã tồn tại' : 'Email đã được sử dụng' 
      });
    }
    
    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Tạo user mới với đầy đủ thông tin
    const user = new User({
      username,
      email,
      hashedPassword,
      displayName: displayName || username,
      xp: 0,
      level: 1,
      currentLesson: {
        classId: 8,
        chapterId: 1,
        lessonId: 1,
        lessonTitle: 'Bài 1: Chất – Tính chất của chất'
      },
      progress: {
        completedLessons: [],
        currentStreak: 0,
        totalPoints: 0,
        totalStudyTime: 0
      },
      profile: {
        grade: grade || 8
      }
    });
    
    await user.save();
    
    // Trả về thông tin user (không bao gồm mật khẩu)
    const userResponse = user.toObject();
    delete userResponse.hashedPassword;
    
    res.status(201).json({
      message: 'Tạo tài khoản thành công',
      user: userResponse
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Lỗi server: ' + error.message });
  }
});

// Đăng nhập (Local login)
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ 
        message: 'Username và password là bắt buộc' 
      });
    }
    
    // Tìm user bằng username hoặc email
    const user = await User.findOne({
      $or: [{ username }, { email: username }]
    });
    
    if (!user || !user.hashedPassword) {
      return res.status(401).json({ 
        message: 'Tên đăng nhập hoặc mật khẩu không đúng' 
      });
    }
    
    // Kiểm tra mật khẩu
    const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
    
    if (!isPasswordValid) {
      return res.status(401).json({ 
        message: 'Tên đăng nhập hoặc mật khẩu không đúng' 
      });
    }
    
    // Cập nhật last active
    user.progress.lastActiveDate = new Date();
    await user.save();
    
    // Trả về thông tin user (không bao gồm mật khẩu)
    const userResponse = user.toObject();
    delete userResponse.hashedPassword;
    
    res.json({
      message: 'Đăng nhập thành công',
      user: userResponse
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Lỗi server: ' + error.message });
  }
});

// Get user profile by userId or firebaseUid
router.get('/profile/:identifier', async (req, res) => {
  try {
    const { identifier } = req.params;
    
    // Tìm user bằng userId, firebaseUid, hoặc username
    const user = await User.findOne({
      $or: [
        { userId: identifier },
        { firebaseUid: identifier },
        { username: identifier }
      ]
    }).select('-hashedPassword'); // Không trả về mật khẩu
    
    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create or update user (Firebase Auth integration)
router.post('/profile', async (req, res) => {
  try {
    const { email, firebaseUid, displayName, username } = req.body;
    
    let user = await User.findOne({ firebaseUid });
    
    if (user) {
      // Update existing user
      user.email = email;
      user.displayName = displayName || user.displayName;
      user.progress.lastActiveDate = new Date();
      await user.save();
    } else {
      // Create new user với Firebase Auth
      const generatedUsername = username || displayName || email.split('@')[0];
      
      // Đảm bảo username là unique
      let finalUsername = generatedUsername;
      let counter = 1;
      while (await User.findOne({ username: finalUsername })) {
        finalUsername = `${generatedUsername}${counter}`;
        counter++;
      }
      
      user = new User({
        username: finalUsername,
        email,
        firebaseUid,
        displayName: displayName || finalUsername,
        xp: 0,
        level: 1,
        currentLesson: {
          classId: 8,
          chapterId: 1,
          lessonId: 1,
          lessonTitle: 'Bài 1: Chất – Tính chất của chất'
        },
        progress: {
          completedLessons: [],
          currentStreak: 0,
          totalPoints: 0,
          totalStudyTime: 0
        }
      });
      await user.save();
    }
    
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Cập nhật tiến độ học tập
router.patch('/progress/:identifier', async (req, res) => {
  try {
    const { completedLesson, xpGained, timeSpent, lessonUpdate } = req.body;
    
    const user = await User.findOne({
      $or: [
        { userId: req.params.identifier },
        { firebaseUid: req.params.identifier },
        { username: req.params.identifier }
      ]
    });
    
    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }
    
    let levelUpResult = null;
    
    // Thêm XP
    if (xpGained && xpGained > 0) {
      levelUpResult = user.addXP(xpGained);
    }
    
    // Thêm bài học đã hoàn thành
    if (completedLesson) {
      const existingLesson = user.progress.completedLessons.find(
        l => l.classId === completedLesson.classId && 
             l.chapterId === completedLesson.chapterId && 
             l.lessonId === completedLesson.lessonId
      );
      
      if (!existingLesson) {
        user.progress.completedLessons.push({
          ...completedLesson,
          completedAt: new Date(),
          timeSpent: timeSpent || 0
        });
      } else {
        // Update existing lesson with better score if applicable
        if (completedLesson.score > existingLesson.score) {
          existingLesson.score = completedLesson.score;
          existingLesson.attempts = (existingLesson.attempts || 1) + 1;
        }
      }
    }
    
    // Cập nhật bài học hiện tại
    if (lessonUpdate) {
      user.updateCurrentLesson(
        lessonUpdate.classId,
        lessonUpdate.chapterId,
        lessonUpdate.lessonId,
        lessonUpdate.lessonTitle
      );
    }
    
    // Cập nhật thời gian học
    if (timeSpent && timeSpent > 0) {
      user.progress.totalStudyTime += timeSpent;
    }
    
    // Update streak
    const today = new Date().setHours(0, 0, 0, 0);
    const lastActive = user.progress.lastActiveDate ? 
      new Date(user.progress.lastActiveDate).setHours(0, 0, 0, 0) : 0;
    
    if (today - lastActive === 86400000) { // 1 day difference
      user.progress.currentStreak += 1;
    } else if (today - lastActive > 86400000) {
      user.progress.currentStreak = 1;
    }
    
    user.progress.lastActiveDate = new Date();
    await user.save();
    
    // Trả về kết quả với thông tin level up nếu có
    const userResponse = user.toObject();
    delete userResponse.hashedPassword;
    
    res.json({
      user: userResponse,
      levelUp: levelUpResult
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Cập nhật thông tin cá nhân
router.patch('/profile/:identifier', async (req, res) => {
  try {
    const { displayName, profile, settings } = req.body;
    
    const user = await User.findOne({
      $or: [
        { userId: req.params.identifier },
        { firebaseUid: req.params.identifier },
        { username: req.params.identifier }
      ]
    });
    
    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }
    
    // Cập nhật thông tin
    if (displayName) user.displayName = displayName;
    if (profile) {
      user.profile = { ...user.profile, ...profile };
    }
    if (settings) {
      user.settings = { ...user.settings, ...settings };
    }
    
    await user.save();
    
    const userResponse = user.toObject();
    delete userResponse.hashedPassword;
    
    res.json(userResponse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Endpoint to update user's grade
router.post('/update-grade', async (req, res) => {
  try {
    const { grade, userId } = req.body; // Assuming userId is sent in the body

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const user = await User.findOne({ $or: [{ userId }, { firebaseUid: userId }] });

    if (!user) {
      return res.status(404).json({ message: 'Không tìm thấy người dùng' });
    }

    user.profile.grade = grade;
    await user.save();

    const userResponse = user.toObject();
    delete userResponse.hashedPassword;

    res.json(userResponse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
