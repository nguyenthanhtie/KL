require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User.cjs');

async function create() {
  await mongoose.connect(process.env.MONGODB_URI);
  const password = await bcrypt.hash('password123', 10);
  
  await User.findOneAndUpdate(
    { email: 'teacher1@test.com' },
    { 
      username: 'teacher1', email: 'teacher1@test.com', password, displayName: 'Teacher Test', role: 'teacher',
      xp: 0, level: 1
    },
    { upsert: true }
  );

  await User.findOneAndUpdate(
    { email: 'student1@test.com' },
    { 
      username: 'student1', email: 'student1@test.com', password, displayName: 'Student Test', role: 'student',
      xp: 0, level: 1
    },
    { upsert: true }
  );
  
  console.log('Users created');
  process.exit();
}
create();
