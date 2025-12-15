const express = require('express');
const router = express.Router();
const Challenge = require('../models/Challenge.cjs');
// ChallengeAttempt không cần nữa - tiến trình lưu trong User.programs

// Get all challenges
router.get('/', async (req, res) => {
  try {
    const challenges = await Challenge.find().sort({ id: 1 });
    res.json(challenges);
  } catch (error) {
    console.error('Error fetching challenges:', error);
    res.status(500).json({ message: 'Error fetching challenges', error: error.message });
  }
});

// Get challenges with unlock status for a specific user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const User = require('../models/User.cjs');
    
    // Get user data
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Get all challenges
    const challenges = await Challenge.find().sort({ id: 1 });
    
    // Find chemistry program progress
    const chemistryProgram = user.programs.find(p => p.programId === 'chemistry');
    const completedLessons = chemistryProgram?.progress?.completedLessons || [];
    
    // Debug log
    console.log('🔍 Checking unlock status for user:', userId);
    console.log('📚 Completed lessons:', completedLessons);
    console.log('📊 Completed lessons types:', completedLessons.map(l => typeof l));
    
    // Check unlock status for each challenge
    const challengesWithStatus = challenges.map(challenge => {
      const challengeObj = challenge.toObject();
      
      // If no prerequisite, challenge is unlocked
      if (!challenge.prerequisite || !challenge.prerequisite.classId || !challenge.prerequisite.lessonId) {
        challengeObj.isUnlocked = true;
        return challengeObj;
      }
      
      // Calculate unique lesson ID: classId * 1000 + lessonId
      const requiredLessonId = challenge.prerequisite.classId * 1000 + challenge.prerequisite.lessonId;
      
      // Check if user has completed the required lesson (convert both to numbers for comparison)
      const isUnlocked = completedLessons.some(lessonId => Number(lessonId) === Number(requiredLessonId));
      challengeObj.isUnlocked = isUnlocked;
      
      console.log(`🎯 Challenge ${challenge.id} (${challenge.name}): requires ${requiredLessonId}, unlocked: ${isUnlocked}`);
      challengeObj.prerequisiteInfo = {
        classId: challenge.prerequisite.classId,
        lessonId: challenge.prerequisite.lessonId,
        requiredLessonId: requiredLessonId,
        isCompleted: completedLessons.includes(requiredLessonId)
      };
      
      return challengeObj;
    });
    
    res.json(challengesWithStatus);
  } catch (error) {
    console.error('Error fetching challenges for user:', error);
    res.status(500).json({ message: 'Error fetching challenges', error: error.message });
  }
});

// Get challenge by ID
router.get('/:id', async (req, res) => {
  try {
    const challenge = await Challenge.findOne({ id: parseInt(req.params.id) });
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }
    res.json(challenge);
  } catch (error) {
    console.error('Error fetching challenge:', error);
    res.status(500).json({ message: 'Error fetching challenge', error: error.message });
  }
});

// Create new challenge (admin only - you can add authentication later)
router.post('/', async (req, res) => {
  try {
    const challenge = new Challenge(req.body);
    await challenge.save();
    res.status(201).json(challenge);
  } catch (error) {
    console.error('Error creating challenge:', error);
    res.status(500).json({ message: 'Error creating challenge', error: error.message });
  }
});

// Update challenge
router.put('/:id', async (req, res) => {
  try {
    const challenge = await Challenge.findOneAndUpdate(
      { id: parseInt(req.params.id) },
      req.body,
      { new: true, runValidators: true }
    );
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }
    res.json(challenge);
  } catch (error) {
    console.error('Error updating challenge:', error);
    res.status(500).json({ message: 'Error updating challenge', error: error.message });
  }
});

// Delete challenge
router.delete('/:id', async (req, res) => {
  try {
    const challenge = await Challenge.findOneAndDelete({ id: parseInt(req.params.id) });
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }
    res.json({ message: 'Challenge deleted successfully' });
  } catch (error) {
    console.error('Error deleting challenge:', error);
    res.status(500).json({ message: 'Error deleting challenge', error: error.message });
  }
});

// ============ CHALLENGE PROGRESS ROUTES (Lưu vào User.programs) ============

// Save challenge progress (auto-save during gameplay)
router.post('/attempts/save', async (req, res) => {
  try {
    const { userId, challengeId, challengeSlug, programId, grade, progressData } = req.body;
    
    console.log('📥 Save progress request:', { userId, challengeSlug, progressData });
    
    if (!userId || !challengeSlug) {
      return res.status(400).json({ message: 'Missing required fields: userId, challengeSlug' });
    }

    const User = require('../models/User.cjs');
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find or create program
    let program = user.programs.find(p => p.programId === (programId || 'chemistry'));
    
    if (!program) {
      user.enrollProgram(programId || 'chemistry', 'Hóa học', grade || 8);
      program = user.programs.find(p => p.programId === (programId || 'chemistry'));
    }
    
    // Đảm bảo progress được khởi tạo đầy đủ
    user.ensureProgramProgress(programId || 'chemistry');

    // Lấy dữ liệu hiện tại nếu có
    let existingProgress = null;
    if (program.progress.challengeProgress instanceof Map) {
      existingProgress = program.progress.challengeProgress.get(challengeSlug);
    }
    
    // Lưu progress data
    const progressToSave = {
      progressData: progressData,
      lastSavedAt: new Date(),
      startedAt: existingProgress?.startedAt || new Date(),
      challengeId: challengeId
    };
    
    if (program.progress.challengeProgress instanceof Map) {
      program.progress.challengeProgress.set(challengeSlug, progressToSave);
    } else {
      program.progress.challengeProgress = new Map([[challengeSlug, progressToSave]]);
    }

    // QUAN TRỌNG: Đánh dấu toàn bộ programs array đã thay đổi
    user.markModified('programs');
    await user.save();

    console.log('✅ Saved challenge progress:', challengeSlug, 'for user:', userId);

    res.json({ 
      success: true, 
      message: 'Progress saved to user profile' 
    });
  } catch (error) {
    console.error('❌ Error saving challenge progress:', error);
    res.status(500).json({ message: 'Error saving challenge progress', error: error.message });
  }
});

// Get active challenge progress from User.programs
router.get('/attempts/active/:userId/:challengeSlug', async (req, res) => {
  try {
    const { userId, challengeSlug } = req.params;
    
    console.log('📥 Get active progress:', { userId, challengeSlug });
    
    const User = require('../models/User.cjs');
    const user = await User.findById(userId);
    
    if (!user) {
      return res.json({ hasProgress: false, attempt: null });
    }

    const program = user.programs.find(p => p.programId === 'chemistry');
    
    if (!program || !program.progress) {
      return res.json({ hasProgress: false, attempt: null });
    }

    // Kiểm tra challengeProgress có tồn tại và là Map không
    let savedProgress = null;
    if (program.progress.challengeProgress) {
      if (program.progress.challengeProgress instanceof Map) {
        savedProgress = program.progress.challengeProgress.get(challengeSlug);
      } else if (typeof program.progress.challengeProgress === 'object') {
        // Có thể là plain object sau khi load từ DB
        savedProgress = program.progress.challengeProgress[challengeSlug];
      }
    }
    
    if (!savedProgress) {
      return res.json({ hasProgress: false, attempt: null });
    }

    // Check if progress is older than 24 hours
    const hoursDiff = (new Date() - new Date(savedProgress.lastSavedAt)) / (1000 * 60 * 60);
    
    if (hoursDiff > 24) {
      // Remove expired progress
      if (program.progress.challengeProgress instanceof Map) {
        program.progress.challengeProgress.delete(challengeSlug);
      } else {
        delete program.progress.challengeProgress[challengeSlug];
      }
      user.markModified('programs');
      await user.save();
      return res.json({ hasProgress: false, attempt: null, message: 'Progress expired' });
    }

    console.log('✅ Found active progress:', challengeSlug);

    res.json({ 
      hasProgress: true,
      progressData: savedProgress.progressData || savedProgress
    });
  } catch (error) {
    console.error('❌ Error fetching challenge progress:', error);
    res.status(500).json({ message: 'Error fetching challenge progress', error: error.message });
  }
});

// Complete challenge and save result to User.programs
router.post('/attempts/complete', async (req, res) => {
  try {
    const { 
      userId, 
      challengeId,
      challengeSlug, 
      programId, 
      grade,
      score, 
      maxScore, 
      percentage: providedPercentage,
      stars: providedStars,
      timeSpent, 
      attempts, 
      hintsUsed,
      correctAnswers,
      totalQuestions
    } = req.body;
    
    console.log('📥 Complete challenge request:', { 
      userId, 
      challengeSlug, 
      score, 
      maxScore, 
      providedStars,
      providedPercentage 
    });
    
    if (!userId || !challengeSlug) {
      return res.status(400).json({ message: 'Missing required fields: userId, challengeSlug' });
    }

    const User = require('../models/User.cjs');
    const user = await User.findById(userId);
    
    if (!user) {
      console.error('❌ User not found:', userId);
      return res.status(404).json({ message: 'User not found' });
    }

    // Find or create program
    let program = user.programs.find(p => p.programId === (programId || 'chemistry'));
    
    if (!program) {
      console.log('📝 Creating new program for user');
      user.enrollProgram(programId || 'chemistry', 'Hóa học', grade || 8);
      program = user.programs.find(p => p.programId === (programId || 'chemistry'));
    }
    
    // Đảm bảo progress được khởi tạo đầy đủ
    user.ensureProgramProgress(programId || 'chemistry');
    
    // Reload program reference sau khi ensure
    program = user.programs.find(p => p.programId === (programId || 'chemistry'));

    // Calculate percentage and stars
    const percentage = providedPercentage || (maxScore > 0 ? Math.round((score / maxScore) * 100) : 0);
    let stars = providedStars;
    if (stars === undefined || stars === null) {
      if (percentage >= 80) stars = 3;
      else if (percentage >= 50) stars = 2;
      else stars = 1;
    }

    console.log('📊 Calculated stats:', { percentage, stars });
    console.log('📝 Before update - completedChallenges:', program.progress.completedChallenges);

    // 1. Add to completed challenges (avoid duplicates)
    if (!program.progress.completedChallenges.includes(challengeSlug)) {
      program.progress.completedChallenges.push(challengeSlug);
      console.log('✅ Added to completedChallenges');
    } else {
      console.log('⚠️ Challenge already in completedChallenges');
    }

    // 2. Update stars (only if better)
    let currentStars = 0;
    if (program.progress.challengeStars instanceof Map) {
      currentStars = program.progress.challengeStars.get(challengeSlug) || 0;
      if (stars > currentStars) {
        program.progress.challengeStars.set(challengeSlug, stars);
        console.log('✅ Updated challengeStars:', stars);
      }
    } else {
      program.progress.challengeStars = new Map([[challengeSlug, stars]]);
      console.log('✅ Created new challengeStars Map');
    }

    // 3. Add to history
    const historyEntry = {
      challengeSlug,
      challengeId: challengeId || 0,
      score: score || 0,
      maxScore: maxScore || 0,
      percentage,
      stars,
      timeSpent: timeSpent || 0,
      completedAt: new Date()
    };
    
    if (!Array.isArray(program.progress.challengeHistory)) {
      program.progress.challengeHistory = [];
    }
    program.progress.challengeHistory.push(historyEntry);
    console.log('✅ Added to challengeHistory');

    // 4. Update total score
    program.progress.totalScore = (program.progress.totalScore || 0) + (score || 0);

    // 5. Clear in-progress data
    if (program.progress.challengeProgress instanceof Map) {
      program.progress.challengeProgress.delete(challengeSlug);
    } else if (program.progress.challengeProgress && typeof program.progress.challengeProgress === 'object') {
      delete program.progress.challengeProgress[challengeSlug];
    }
    console.log('✅ Cleared challengeProgress');

    // 6. Update study time
    if (timeSpent && timeSpent > 0) {
      const timeSpentMinutes = Math.ceil(timeSpent / 60);
      user.updateStudyTime(programId || 'chemistry', timeSpentMinutes);
    }

    // 7. Add XP based on stars
    const xpReward = stars * 10;
    user.addXP(xpReward);

    // QUAN TRỌNG: Đánh dấu programs đã thay đổi
    user.markModified('programs');
    
    console.log('📝 After update - completedChallenges:', program.progress.completedChallenges);
    console.log('📝 Saving user...');
    
    await user.save();
    
    console.log('✅ Challenge completed and saved:', challengeSlug, '| Stars:', stars, '| XP:', xpReward);

    // Verify save
    const verifyUser = await User.findById(userId);
    const verifyProgram = verifyUser.programs.find(p => p.programId === (programId || 'chemistry'));
    console.log('🔍 Verify after save - completedChallenges:', verifyProgram?.progress?.completedChallenges);

    res.json({ 
      success: true, 
      stars,
      percentage,
      xpReward,
      completedChallenges: program.progress.completedChallenges,
      message: 'Challenge completed successfully' 
    });
  } catch (error) {
    console.error('❌ Error completing challenge:', error);
    console.error('❌ Stack:', error.stack);
    res.status(500).json({ message: 'Error completing challenge', error: error.message });
  }
});

// Clear/abandon challenge progress from User.programs
router.delete('/attempts/:userId/:challengeSlug', async (req, res) => {
  try {
    const { userId, challengeSlug } = req.params;
    
    console.log('📥 Clear progress request:', { userId, challengeSlug });
    
    const User = require('../models/User.cjs');
    const user = await User.findById(userId);
    
    if (!user) {
      return res.json({ success: true, message: 'User not found' });
    }

    const program = user.programs.find(p => p.programId === 'chemistry');
    
    if (program && program.progress && program.progress.challengeProgress) {
      if (program.progress.challengeProgress instanceof Map) {
        program.progress.challengeProgress.delete(challengeSlug);
      } else if (typeof program.progress.challengeProgress === 'object') {
        delete program.progress.challengeProgress[challengeSlug];
      }
      user.markModified('programs');
      await user.save();
      console.log('✅ Progress cleared:', challengeSlug);
    }

    res.json({ success: true, message: 'Progress cleared' });
  } catch (error) {
    console.error('❌ Error clearing challenge progress:', error);
    res.status(500).json({ message: 'Error clearing challenge progress', error: error.message });
  }
});

// Get user's challenge history from User.programs
router.get('/attempts/history/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { programId, limit } = req.query;
    
    const User = require('../models/User.cjs');
    const user = await User.findById(userId);
    
    if (!user) {
      return res.json({ history: [] });
    }

    const program = user.programs.find(p => p.programId === (programId || 'chemistry'));
    
    if (!program || !program.progress.challengeHistory) {
      return res.json({ history: [] });
    }

    let history = program.progress.challengeHistory.sort((a, b) => 
      new Date(b.completedAt) - new Date(a.completedAt)
    );

    if (limit) {
      history = history.slice(0, parseInt(limit));
    }

    res.json({ history });
  } catch (error) {
    console.error('Error fetching challenge history:', error);
    res.status(500).json({ message: 'Error fetching challenge history', error: error.message });
  }
});

// Get best attempt for a specific challenge from User.programs
router.get('/attempts/best/:userId/:challengeSlug', async (req, res) => {
  try {
    const { userId, challengeSlug } = req.params;
    
    const User = require('../models/User.cjs');
    const user = await User.findById(userId);
    
    if (!user) {
      return res.json({ hasBestAttempt: false, bestAttempt: null });
    }

    const program = user.programs.find(p => p.programId === 'chemistry');
    
    if (!program || !program.progress.challengeHistory) {
      return res.json({ hasBestAttempt: false, bestAttempt: null });
    }

    // Find best attempt by score
    const attempts = program.progress.challengeHistory.filter(h => h.challengeSlug === challengeSlug);
    
    if (attempts.length === 0) {
      return res.json({ hasBestAttempt: false, bestAttempt: null });
    }

    const bestAttempt = attempts.reduce((best, current) => 
      (current.score > best.score) ? current : best
    );

    res.json({ 
      hasBestAttempt: true,
      bestAttempt,
      stars: program.progress.challengeStars?.get(challengeSlug) || 0
    });
  } catch (error) {
    console.error('Error fetching best attempt:', error);
    res.status(500).json({ message: 'Error fetching best attempt', error: error.message });
  }
});

module.exports = router;
