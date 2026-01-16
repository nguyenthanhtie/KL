// Index file cho lớp 8 - export lessons theo curriculum
const ketnoi = require('./ketnoi/index.cjs');

// Export lessons - chỉ sử dụng chương trình Kết nối tri thức
module.exports = {
  ketnoi: ketnoi
};

// Helper function to get lessons by curriculum type
module.exports.getLessonsByCurriculum = function(curriculumType) {
  return module.exports[curriculumType] || module.exports.ketnoi || [];
};
