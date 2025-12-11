const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../models/User.cjs');
const Challenge = require('../models/Challenge.cjs');

/**
 * Create or update a test user that unlocks everything:
 * - enrolls in 'chemistry'
 * - marks lessons from classes 8..12, lesson IDs 1..200 as completed
 * - sets 3 stars for each lesson
 * - sets a large totalScore, xp and level
 * - updates all Challenge documents to status 'available'
 */

async function run() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/chemlearn';
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB');

  const username = 'test_all_unlocked';
  const email = 'test+unlocked@test.local';
  const password = 'password123';

  let user = await User.findOne({ username });
  if (!user) {
    user = new User({ username, email, displayName: 'Tester All Unlocked' });
    await user.setPassword(password);
    console.log('Created new user object');
  } else {
    user.email = email;
    console.log('Updating existing user:', username);
  }

  // Ensure chemistry program exists and is active
  user.enrollProgram('chemistry', 'Hóa học', 12);
  const program = user.getProgram('chemistry');

  // Initialize progress containers
  if (!program.progress) program.progress = { completedLessons: [], lessonStars: new Map(), totalScore: 0 };
  if (!program.progress.completedLessons) program.progress.completedLessons = [];
  if (!program.progress.lessonStars) program.progress.lessonStars = new Map();

  // Mark every lesson in classes 8..12 and lesson IDs 1..200 as completed and 3-starred
  const classes = [8, 9, 10, 11, 12];
  const maxLessonId = 200; // generous upper bound

  for (const cls of classes) {
    for (let lid = 1; lid <= maxLessonId; lid++) {
      const uniqueId = cls * 1000 + lid;
      if (!program.progress.completedLessons.includes(uniqueId)) {
        program.progress.completedLessons.push(uniqueId);
      }
      program.progress.lessonStars.set(uniqueId.toString(), 3);
    }
  }

  // Update aggregate progress
  program.progress.totalScore = program.progress.completedLessons.length * 100;
  program.progress.lastStudyDate = new Date();

  // Give the user a healthy XP and level
  user.xp = Math.max(user.xp || 0, program.progress.totalScore + 5000);
  user.level = Math.max(user.level || 1, Math.floor(user.xp / 100) + 1);

  user.markModified('programs');

  // Make all challenges available globally
  try {
    const res = await Challenge.updateMany({}, { $set: { status: 'available' } });
    console.log(`Updated ${res.modifiedCount || res.nModified || 0} challenges to status 'available'`);
  } catch (err) {
    console.warn('Could not update Challenge collection:', err && err.message ? err.message : err);
  }

  await user.save();
  console.log('Test user created/updated:', username);
  console.log('Email:', email, 'Password:', password);

  await mongoose.disconnect();
  console.log('Disconnected.');
}

run().catch(err => {
  console.error('Error creating test user:', err);
  process.exit(1);
});