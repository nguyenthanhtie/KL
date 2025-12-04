const mongoose = require('mongoose');
require('dotenv').config();
const User = require('../models/User.cjs');

// Load lessons arrays (same as seed.cjs)
const lessons8 = require('../areas/Hoahoc/class8/index.cjs');
const lessons9 = require('../areas/Hoahoc/class9/index.cjs');
const lessons10 = require('../areas/Hoahoc/class10/index.cjs');
const lessons11 = require('../areas/Hoahoc/class11/index.cjs');
const lessons12 = require('../areas/Hoahoc/class12/index.cjs');

async function run() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/chemlearn';
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB');

  const username = 'test_all_completed';
  const email = 'test@test.com';
  const password = '123456';

  let user = await User.findOne({ username });
  if (!user) {
    user = new User({ username, email, displayName: 'Tester All Completed' });
    await user.setPassword(password);
    console.log('Created new user object');
  } else {
    console.log('Updating existing user:', username);
  }

  // Ensure programs exists and enroll chemistry
  user.enrollProgram('chemistry', 'Hóa học', 12);
  const program = user.getProgram('chemistry');

  // Helper to add completed lessons from a lessons array
  function addLessonsFromArray(lessonsArray) {
    for (const lesson of lessonsArray) {
      const classId = lesson.classId || lesson.class || 8; // fallback
      const lessonId = lesson.lessonId || lesson.id || lesson.order || null;
      if (!lessonId) continue;
      const uniqueId = parseInt(classId) * 1000 + parseInt(lessonId);
      if (!program.progress.completedLessons.includes(uniqueId)) {
        program.progress.completedLessons.push(uniqueId);
      }
      // Set 3 stars for this lesson
      if (!program.progress.lessonStars) program.progress.lessonStars = new Map();
      program.progress.lessonStars.set(uniqueId.toString(), 3);
    }
  }

  addLessonsFromArray(lessons8);
  addLessonsFromArray(lessons9);
  addLessonsFromArray(lessons10);
  addLessonsFromArray(lessons11);
  addLessonsFromArray(lessons12);

  // Calculate a generous total score
  program.progress.totalScore = program.progress.completedLessons.length * 100;
  program.progress.lastStudyDate = new Date();
  user.xp = Math.max(user.xp || 0, 10000);
  user.level = Math.max(user.level || 1, 50);

  // Mark modified for Mongoose maps/arrays
  user.markModified('programs');

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