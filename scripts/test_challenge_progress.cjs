/**
 * Test script for Challenge Progress API
 * Run this file to test the challenge progress endpoints
 * 
 * Usage: node scripts/test_challenge_progress.cjs
 */

const mongoose = require('mongoose');
const ChallengeAttempt = require('../models/ChallengeAttempt.cjs');
const User = require('../models/User.cjs');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/kl-learning';

async function testChallengeProgress() {
  try {
    // Connect to MongoDB
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Find a test user
    let testUser = await User.findOne({});
    
    if (!testUser) {
      console.log('⚠️  No users found. Creating a test user...');
      testUser = new User({
        username: 'testuser',
        email: 'test@example.com',
        displayName: 'Test User',
        xp: 0,
        level: 1
      });
      await testUser.setPassword('password123');
      await testUser.save();
      console.log('✅ Test user created\n');
    }

    console.log('👤 Using test user:', testUser.username, '(ID:', testUser._id, ')\n');

    // Test 1: Create a new challenge attempt (save progress)
    console.log('📝 TEST 1: Save challenge progress');
    const attempt1 = new ChallengeAttempt({
      userId: testUser._id,
      challengeId: 1,
      challengeSlug: 'test-challenge-progress',
      programId: 'chemistry',
      grade: 8,
      status: 'in-progress',
      progressData: {
        currentQuestion: 5,
        score: 50,
        answers: [true, true, false, true, true],
        timeElapsed: 120
      }
    });
    await attempt1.save();
    console.log('✅ Progress saved. Attempt ID:', attempt1._id);
    console.log('   Current question:', attempt1.progressData.currentQuestion);
    console.log('   Score:', attempt1.progressData.score, '\n');

    // Test 2: Find active attempt
    console.log('🔍 TEST 2: Find active attempt');
    const activeAttempt = await ChallengeAttempt.findActiveAttempt(
      testUser._id, 
      'test-challenge-progress'
    );
    
    if (activeAttempt) {
      console.log('✅ Found active attempt');
      console.log('   Status:', activeAttempt.status);
      console.log('   Progress:', activeAttempt.progressData, '\n');
    } else {
      console.log('❌ No active attempt found\n');
    }

    // Test 3: Update progress
    console.log('🔄 TEST 3: Update progress');
    await activeAttempt.updateProgress({
      currentQuestion: 7,
      score: 70,
      answers: [...activeAttempt.progressData.answers, true, true],
      timeElapsed: 180
    });
    console.log('✅ Progress updated');
    console.log('   New question:', activeAttempt.progressData.currentQuestion);
    console.log('   New score:', activeAttempt.progressData.score, '\n');

    // Test 4: Complete challenge
    console.log('🎉 TEST 4: Complete challenge');
    await activeAttempt.complete({
      score: 95,
      maxScore: 100,
      percentage: 95,
      timeSpent: 300,
      attempts: 1,
      hintsUsed: 2
    });
    console.log('✅ Challenge completed');
    console.log('   Final score:', activeAttempt.result.score);
    console.log('   Stars earned:', activeAttempt.result.stars);
    console.log('   Status:', activeAttempt.status);
    console.log('   Completed at:', activeAttempt.completedAt, '\n');

    // Test 5: Create another attempt for the same challenge
    console.log('📝 TEST 5: Create another attempt (better score)');
    const attempt2 = new ChallengeAttempt({
      userId: testUser._id,
      challengeId: 1,
      challengeSlug: 'test-challenge-progress',
      programId: 'chemistry',
      grade: 8,
      status: 'completed',
      completedAt: new Date()
    });
    await attempt2.complete({
      score: 100,
      maxScore: 100,
      percentage: 100,
      timeSpent: 250,
      attempts: 1,
      hintsUsed: 0
    });
    console.log('✅ Second attempt completed with perfect score');
    console.log('   Stars:', attempt2.result.stars, '\n');

    // Test 6: Get best attempt
    console.log('🏆 TEST 6: Get best attempt');
    const bestAttempt = await ChallengeAttempt.getBestAttempt(
      testUser._id,
      'test-challenge-progress'
    );
    if (bestAttempt) {
      console.log('✅ Found best attempt');
      console.log('   Best score:', bestAttempt.result.score);
      console.log('   Stars:', bestAttempt.result.stars);
      console.log('   Time spent:', bestAttempt.result.timeSpent, 'seconds\n');
    }

    // Test 7: Get user's challenge history
    console.log('📚 TEST 7: Get challenge history');
    const history = await ChallengeAttempt.findUserAttempts(testUser._id, {
      status: 'completed',
      limit: 10
    });
    console.log('✅ Found', history.length, 'completed attempts');
    history.forEach((att, idx) => {
      console.log(`   ${idx + 1}. ${att.challengeSlug} - Score: ${att.result.score} - Stars: ${att.result.stars}`);
    });
    console.log();

    // Test 8: Update user's program progress
    console.log('👤 TEST 8: Update user progress');
    const program = testUser.enrollProgram('chemistry', 'Hóa học', 8);
    
    if (!program.progress.completedChallenges) {
      program.progress.completedChallenges = [];
    }
    if (!program.progress.challengeStars) {
      program.progress.challengeStars = new Map();
    }

    const challengeKey = 'test-challenge-progress-1';
    if (!program.progress.completedChallenges.includes(challengeKey)) {
      program.progress.completedChallenges.push(challengeKey);
    }
    program.progress.challengeStars.set('test-challenge-progress', 3);
    
    testUser.markModified('programs');
    await testUser.save();
    
    console.log('✅ User progress updated');
    console.log('   Completed challenges:', program.progress.completedChallenges);
    console.log('   Challenge stars:', Object.fromEntries(program.progress.challengeStars), '\n');

    // Cleanup
    console.log('🧹 Cleaning up test data...');
    await ChallengeAttempt.deleteMany({ challengeSlug: 'test-challenge-progress' });
    console.log('✅ Test data cleaned up\n');

    console.log('='.repeat(50));
    console.log('✅ ALL TESTS PASSED!');
    console.log('='.repeat(50));

  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await mongoose.connection.close();
    console.log('\n👋 Disconnected from MongoDB');
  }
}

// Run tests
testChallengeProgress();
