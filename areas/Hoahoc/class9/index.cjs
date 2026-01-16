// Index file cho lớp 9 - nhóm theo từng bộ sách
const ketnoi = require('./ketnoi/index.cjs');

// Export lessons - chỉ sử dụng chương trình Kết nối tri thức
module.exports = {
  ketnoi: ketnoi
};

// Helper: lấy bài học theo bộ sách
module.exports.getLessonsByCurriculum = function (curriculumType) {
  return module.exports[curriculumType] || module.exports.ketnoi || [];
};
