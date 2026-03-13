const mongoose = require('mongoose');
require('dotenv').config();
const Lesson = require('../models/Lesson.cjs');

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const total = await Lesson.countDocuments();
  const withTheory = await Lesson.countDocuments({ theoryModules: { $exists: true, $ne: [] } });
  const withQuizzes = await Lesson.countDocuments({ 'game.quizzes': { $exists: true, $ne: [] } });
  console.log('Total:', total, '| With theoryModules:', withTheory, '| With game.quizzes:', withQuizzes);
  process.exit(0);
});
