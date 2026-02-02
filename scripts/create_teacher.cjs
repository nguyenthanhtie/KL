/**
 * Script tạo tài khoản Giáo viên
 * Chạy: node scripts/create_teacher.cjs <email>
 */

const mongoose = require('mongoose');
const User = require('../models/User.cjs');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/chemlearn';

async function createTeacher() {
  const email = process.argv[2];
  const school = process.argv[3] || '';
  
  if (!email) {
    console.log('❌ Vui lòng cung cấp email');
    console.log('Usage: node scripts/create_teacher.cjs <email> [school_name]');
    process.exit(1);
  }

  try {
    console.log('🔗 Đang kết nối MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Đã kết nối MongoDB');

    // Tìm user theo email
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      console.log(`❌ Không tìm thấy người dùng với email: ${email}`);
      console.log('💡 Vui lòng đăng ký tài khoản trước khi nâng cấp lên Giáo viên');
      process.exit(1);
    }

    if (user.role === 'teacher') {
      console.log(`ℹ️ Người dùng ${email} đã là Giáo viên`);
      process.exit(0);
    }

    if (user.role === 'admin') {
      console.log(`ℹ️ Người dùng ${email} là Admin, không cần nâng cấp Giáo viên`);
      process.exit(0);
    }

    // Cập nhật role thành teacher
    user.role = 'teacher';
    user.teacherInfo = {
      school: school,
      subject: 'chemistry',
      department: '',
      yearsOfExperience: 0,
      qualification: '',
      bio: '',
      verifiedAt: new Date()
    };
    user.students = [];
    user.managedClasses = [];

    await user.save();

    console.log('');
    console.log('✅ Đã nâng cấp thành công!');
    console.log('━'.repeat(40));
    console.log(`📧 Email: ${user.email}`);
    console.log(`👤 Username: ${user.username}`);
    console.log(`👨‍🏫 Role: ${user.role}`);
    console.log(`🏫 Trường: ${user.teacherInfo.school || 'Chưa cập nhật'}`);
    console.log('━'.repeat(40));
    console.log('');
    console.log('🎉 Người dùng giờ có thể truy cập trang Giáo viên tại /teacher');

  } catch (error) {
    console.error('❌ Lỗi:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Đã ngắt kết nối MongoDB');
    process.exit(0);
  }
}

createTeacher();
