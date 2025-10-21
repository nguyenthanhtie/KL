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

// Submit lesson completion
router.post('/submit', async (req, res) => {
  try {
    const { firebaseUid, pathId, lessonId, score, totalQuestions, correctAnswers } = req.body;
    
    const user = await User.findOne({ firebaseUid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    let progress = await Progress.findOne({
      userId: user._id,
      pathId,
      lessonId
    });
    
    if (progress) {
      // Update existing progress
      progress.attempts += 1;
      progress.score = Math.max(progress.score, score);
      progress.correctAnswers = correctAnswers;
      progress.totalQuestions = totalQuestions;
      progress.lastAttemptDate = new Date();
      
      if (score >= totalQuestions * 0.7 && !progress.completed) {
        progress.completed = true;
        progress.completedAt = new Date();
      }
    } else {
      // Create new progress entry
      progress = new Progress({
        userId: user._id,
        pathId,
        lessonId,
        score,
        totalQuestions,
        correctAnswers,
        attempts: 1,
        completed: score >= totalQuestions * 0.7,
        completedAt: score >= totalQuestions * 0.7 ? new Date() : null,
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
