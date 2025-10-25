const express = require('express');
const Progress = require('../models/Progress.cjs');
const User = require('../models/User.cjs');
const router = express.Router();

// Get user progress
router.get('/user/:firebaseUid', async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.params.firebaseUid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const progress = await Progress.find({ userId: user._id });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Submit lesson completion with level
router.post('/submit', async (req, res) => {
  try {
    const { firebaseUid, pathId, lessonId, score, totalQuestions, correctAnswers, level } = req.body;
    
    const user = await User.findOne({ firebaseUid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    let progress = await Progress.findOne({
      userId: user._id,
      pathId,
      lessonId
    });
    
    // Xác định cấp độ nếu không được cung cấp
    const currentLevel = level || 'basic';
    
    if (progress) {
      // Update existing progress
      progress.attempts += 1;
      progress.score = Math.max(progress.score, score);
      progress.correctAnswers = correctAnswers;
      progress.totalQuestions = totalQuestions;
      progress.lastAttemptDate = new Date();
      
      // Cập nhật điểm theo cấp độ
      if (currentLevel === 'basic') {
        progress.levelScores.basic = Math.max(progress.levelScores.basic || 0, score);
      } else if (currentLevel === 'intermediate') {
        progress.levelScores.intermediate = Math.max(progress.levelScores.intermediate || 0, score);
      } else if (currentLevel === 'advanced') {
        progress.levelScores.advanced = Math.max(progress.levelScores.advanced || 0, score);
      }
      
      // Cập nhật sao: đạt >= 80% để có sao
      const passThreshold = totalQuestions * 0.8;
      if (score >= passThreshold) {
        if (currentLevel === 'basic' && !progress.stars.basic) {
          progress.stars.basic = true;
        } else if (currentLevel === 'intermediate' && !progress.stars.intermediate) {
          progress.stars.intermediate = true;
        } else if (currentLevel === 'advanced' && !progress.stars.advanced) {
          progress.stars.advanced = true;
        }
      }
      
      // Tính tổng số sao
      progress.totalStars = 
        (progress.stars.basic ? 1 : 0) + 
        (progress.stars.intermediate ? 1 : 0) + 
        (progress.stars.advanced ? 1 : 0);
      
      // Hoàn thành khi có ít nhất 1 sao
      if (progress.totalStars > 0 && !progress.completed) {
        progress.completed = true;
        progress.completedAt = new Date();
      }
      
      // Cập nhật cấp độ hiện tại
      progress.currentLevel = currentLevel;
      
    } else {
      // Create new progress entry
      const passThreshold = totalQuestions * 0.8;
      const stars = {
        basic: currentLevel === 'basic' && score >= passThreshold,
        intermediate: currentLevel === 'intermediate' && score >= passThreshold,
        advanced: currentLevel === 'advanced' && score >= passThreshold
      };
      
      const levelScores = {
        basic: currentLevel === 'basic' ? score : 0,
        intermediate: currentLevel === 'intermediate' ? score : 0,
        advanced: currentLevel === 'advanced' ? score : 0
      };
      
      const totalStars = (stars.basic ? 1 : 0) + (stars.intermediate ? 1 : 0) + (stars.advanced ? 1 : 0);
      
      progress = new Progress({
        userId: user._id,
        pathId,
        lessonId,
        score,
        totalQuestions,
        correctAnswers,
        attempts: 1,
        stars,
        currentLevel,
        totalStars,
        levelScores,
        completed: totalStars > 0,
        completedAt: totalStars > 0 ? new Date() : null,
        lastAttemptDate: new Date()
      });
    }
    
    await progress.save();
    res.json(progress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get progress for specific lesson
router.get('/:firebaseUid/:pathId/:lessonId', async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.params.firebaseUid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const progress = await Progress.findOne({
      userId: user._id,
      pathId: parseInt(req.params.pathId),
      lessonId: parseInt(req.params.lessonId)
    });
    
    res.json(progress || { completed: false, score: 0 });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
