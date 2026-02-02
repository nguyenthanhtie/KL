/**
 * Script tạo tài khoản Admin đầu tiên
 * Chạy: node scripts/create_admin.cjs <email>
 */

const mongoose = require('mongoose');
const User = require('../models/User.cjs');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/chemlearn';

async function createAdmin() {
  const email = process.argv[2];
  
  if (!email) {
    console.log('❌ Vui lòng cung cấp email');
    console.log('Usage: node scripts/create_admin.cjs <email>');
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
      console.log('💡 Vui lòng đăng ký tài khoản trước khi nâng cấp lên Admin');
      process.exit(1);
    }

    if (user.role === 'admin') {
      console.log(`ℹ️ Người dùng ${email} đã là Admin`);
      process.exit(0);
    }

    // Cập nhật role thành admin
    user.role = 'admin';
    user.adminInfo = {
      permissions: ['all'], // Super admin - có tất cả quyền
      assignedAt: new Date()
    };

    await user.save();

    console.log('');
    console.log('✅ Đã nâng cấp thành công!');
    console.log('━'.repeat(40));
    console.log(`📧 Email: ${user.email}`);
    console.log(`👤 Username: ${user.username}`);
    console.log(`🛡️ Role: ${user.role}`);
    console.log(`🔑 Permissions: ${user.adminInfo.permissions.join(', ')}`);
    console.log('━'.repeat(40));
    console.log('');
    console.log('🎉 Người dùng giờ có thể truy cập trang Admin tại /admin');

  } catch (error) {
    console.error('❌ Lỗi:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Đã ngắt kết nối MongoDB');
    process.exit(0);
  }
}

createAdmin();
