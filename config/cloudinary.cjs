require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage for teacher documents
const teacherDocStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'lms-learn-more/teacher-documents',
    allowed_formats: ['pdf', 'docx', 'doc', 'jpg', 'jpeg', 'png', 'gif', 'webp'],
    resource_type: 'auto'
  },
});

// Storage for assignments attachments
const assignmentStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'lms-learn-more/assignments',
    allowed_formats: ['pdf', 'docx', 'doc', 'xls', 'xlsx', 'ppt', 'pptx', 'jpg', 'jpeg', 'png', 'gif', 'webp', 'txt'],
    resource_type: 'auto'
  },
});

const uploadTeacherDocsCloudinary = multer({
  storage: teacherDocStorage,
  limits: { fileSize: 10 * 1024 * 1024 }
});

const uploadAssignmentCloudinary = multer({
  storage: assignmentStorage,
  limits: { fileSize: 10 * 1024 * 1024 }
});

const uploadMemory = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }
});

module.exports = {
  cloudinary,
  uploadTeacherDocsCloudinary,
  uploadAssignmentCloudinary,
  uploadMemory
};
