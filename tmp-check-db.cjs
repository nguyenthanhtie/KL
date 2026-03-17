require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User.cjs');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/LMS_learn_more')
  .then(async () => {
    try {
      console.log("Connected to DB");
      const counts = await User.countDocuments({ role: 'teacher' });
      console.log("Teacher count:", counts);
      const requestCounts = await User.countDocuments({ teacherStatus: 'pending' });
      console.log("Pending teachers:", requestCounts);
      
      const adminUsers = await User.find({ role: 'admin' });
      console.log("Admins:");
      adminUsers.forEach(a => console.log(a.username, a.adminInfo));
    } catch(err) {
      console.error(err);
    }
    process.exit(0);
  });
