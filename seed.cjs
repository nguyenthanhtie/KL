const mongoose = require('mongoose');
const Lesson = require('./models/Lesson.cjs');
const lessons = require('./class8/index.cjs');
require('dotenv').config();

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://2200002540_db_user:Luan123@dan-1211.epxn7qi.mongodb.net/chemlearn?retryWrites=true&w=majority');
    console.log(' Đã kết nối MongoDB');

    await Lesson.deleteMany({});
    console.log(' Đã xóa dữ liệu cũ');

    await Lesson.insertMany(lessons);
    console.log(' Đã thêm', lessons.length, 'bài học Hóa 8');

    console.log(' Seed database thành công!');
    process.exit(0);
  } catch (error) {
    console.error(' Lỗi seed database:', error);
    process.exit(1);
  }
}

seedDatabase();
