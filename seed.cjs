const mongoose = require('mongoose');
const Lesson = require('./models/Lesson.cjs');
const lessons = require('./listlessons/index.cjs');
require('dotenv').config();

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://nguyenthanhtien2120_db_user:7WgzKPi26QbyJcb2@chim.vcidcf8.mongodb.net/chemistry-learning?retryWrites=true&w=majority&appName=Chim');
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
