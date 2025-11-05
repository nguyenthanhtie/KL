const mongoose = require('mongoose');
const Lesson = require('./models/Lesson.cjs');
const lessons8 = require('./class8/index.cjs');
const lessons9 = require('./class9/index.cjs');
const lessons10 = require('./class10/index.cjs');
const lessons11 = require('./class11/index.cjs');
const lessons12 = require('./class12/index.cjs');
require('dotenv').config();

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://2200002540_db_user:Luan123@dan-1211.epxn7qi.mongodb.net/chemlearn?retryWrites=true&w=majority');
    console.log('✓ Đã kết nối MongoDB');

    await Lesson.deleteMany({});
    console.log('✓ Đã xóa dữ liệu cũ');

    // Combine all lessons from all classes
    const allLessons = [
      ...lessons8,
      ...lessons9,
      ...lessons10,
      ...lessons11,
      ...lessons12
    ];

    await Lesson.insertMany(allLessons);
    console.log('✓ Đã thêm bài học:');
    console.log('  - Lớp 8:', lessons8.length, 'bài');
    console.log('  - Lớp 9:', lessons9.length, 'bài');
    console.log('  - Lớp 10:', lessons10.length, 'bài');
    console.log('  - Lớp 11:', lessons11.length, 'bài');
    console.log('  - Lớp 12:', lessons12.length, 'bài');
    console.log('✓ Tổng cộng:', allLessons.length, 'bài học');

    console.log('✓ Seed database thành công!');
    process.exit(0);
  } catch (error) {
    console.error('✗ Lỗi seed database:', error);
    process.exit(1);
  }
}

seedDatabase();
