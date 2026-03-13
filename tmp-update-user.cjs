require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User.cjs');

async function update() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  await User.findOneAndUpdate(
    { email: 'student1@test.com' },
    { 
      programs: [
        {
          programId: 'chemistry',
          name: 'Hóa học THCS & THPT',
          isActive: true,
          progress: {
            completedLessons: [],
            currentStreak: 0,
            totalPoints: 0,
            totalStudyTime: 0
          }
        }
      ]
    }
  );
  
  console.log('User updated with active program');
  process.exit();
}
update();
