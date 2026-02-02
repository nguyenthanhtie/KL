const jwt = require('jsonwebtoken');
const User = require('../models/User.cjs');

// Middleware xác thực người dùng
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ 
        success: false,
        message: 'Vui lòng đăng nhập để tiếp tục' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    // Lấy thông tin user đầy đủ từ database
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: 'Người dùng không tồn tại' 
      });
    }
    
    req.userId = decoded.userId;
    req.email = decoded.email;
    req.user = user;
    
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        success: false,
        message: 'Phiên đăng nhập đã hết hạn' 
      });
    }
    res.status(401).json({ 
      success: false,
      message: 'Token không hợp lệ' 
    });
  }
};

// Middleware kiểm tra quyền Admin
const adminMiddleware = async (req, res, next) => {
  try {
    // authMiddleware phải chạy trước
    if (!req.user) {
      return res.status(401).json({ 
        success: false,
        message: 'Vui lòng đăng nhập' 
      });
    }
    
    if (req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false,
        message: 'Bạn không có quyền truy cập. Chỉ Admin mới được phép.' 
      });
    }
    
    next();
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Lỗi kiểm tra quyền Admin' 
    });
  }
};

// Middleware kiểm tra quyền Giáo viên (hoặc Admin)
const teacherMiddleware = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ 
        success: false,
        message: 'Vui lòng đăng nhập' 
      });
    }
    
    if (req.user.role !== 'teacher' && req.user.role !== 'admin') {
      return res.status(403).json({ 
        success: false,
        message: 'Bạn không có quyền truy cập. Chỉ Giáo viên hoặc Admin mới được phép.' 
      });
    }
    
    next();
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Lỗi kiểm tra quyền Giáo viên' 
    });
  }
};

// Middleware kiểm tra quyền cụ thể của Admin
const checkAdminPermission = (permission) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({ 
          success: false,
          message: 'Vui lòng đăng nhập' 
        });
      }
      
      if (req.user.role !== 'admin') {
        return res.status(403).json({ 
          success: false,
          message: 'Chỉ Admin mới được phép' 
        });
      }
      
      const permissions = req.user.adminInfo?.permissions || [];
      if (!permissions.includes('all') && !permissions.includes(permission)) {
        return res.status(403).json({ 
          success: false,
          message: `Bạn không có quyền: ${permission}` 
        });
      }
      
      next();
    } catch (error) {
      res.status(500).json({ 
        success: false,
        message: 'Lỗi kiểm tra quyền' 
      });
    }
  };
};

// Middleware kiểm tra giáo viên có quản lý lớp học này không
const checkClassOwnership = async (req, res, next) => {
  try {
    const ClassRoom = require('../models/ClassRoom.cjs');
    const classId = req.params.classId || req.body.classId;
    
    if (!classId) {
      return res.status(400).json({ 
        success: false,
        message: 'Thiếu thông tin lớp học' 
      });
    }
    
    const classRoom = await ClassRoom.findById(classId);
    if (!classRoom) {
      return res.status(404).json({ 
        success: false,
        message: 'Không tìm thấy lớp học' 
      });
    }
    
    // Admin có quyền truy cập tất cả
    if (req.user.role === 'admin') {
      req.classRoom = classRoom;
      return next();
    }
    
    // Kiểm tra giáo viên có phải chủ lớp không
    if (classRoom.teacher.toString() !== req.user._id.toString()) {
      return res.status(403).json({ 
        success: false,
        message: 'Bạn không có quyền quản lý lớp học này' 
      });
    }
    
    req.classRoom = classRoom;
    next();
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Lỗi kiểm tra quyền lớp học' 
    });
  }
};

// Middleware kiểm tra xem user có phải học sinh của lớp không
const checkClassMembership = async (req, res, next) => {
  try {
    const ClassRoom = require('../models/ClassRoom.cjs');
    const classId = req.params.classId || req.body.classId;
    
    if (!classId) {
      return res.status(400).json({ 
        success: false,
        message: 'Thiếu thông tin lớp học' 
      });
    }
    
    const classRoom = await ClassRoom.findById(classId);
    if (!classRoom) {
      return res.status(404).json({ 
        success: false,
        message: 'Không tìm thấy lớp học' 
      });
    }
    
    // Admin và Giáo viên chủ lớp có quyền truy cập
    if (req.user.role === 'admin' || 
        (req.user.role === 'teacher' && classRoom.teacher.toString() === req.user._id.toString())) {
      req.classRoom = classRoom;
      return next();
    }
    
    // Kiểm tra học sinh có trong lớp không
    const isStudent = classRoom.students.some(
      s => s.student.toString() === req.user._id.toString() && s.status === 'active'
    );
    
    if (!isStudent) {
      return res.status(403).json({ 
        success: false,
        message: 'Bạn không phải thành viên của lớp học này' 
      });
    }
    
    req.classRoom = classRoom;
    next();
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Lỗi kiểm tra thành viên lớp học' 
    });
  }
};

module.exports = {
  authMiddleware,
  adminMiddleware,
  teacherMiddleware,
  checkAdminPermission,
  checkClassOwnership,
  checkClassMembership
};
