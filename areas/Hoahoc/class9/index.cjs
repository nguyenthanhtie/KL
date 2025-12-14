// Index file cho lớp 9 - nhóm theo từng bộ sách
const ketnoi = require('./ketnoi/index.cjs');
const canhdieu = require('./canhdieu/index.cjs');
const chantroicangtao = require('./chantroicangtao/index.cjs');

// Export lessons grouped by curriculum
module.exports = {
  ketnoi: ketnoi,
  canhdieu: canhdieu,
  chantroicangtao: chantroicangtao
};

// Helper: lấy bài học theo bộ sách
module.exports.getLessonsByCurriculum = function (curriculumType) {
  return module.exports[curriculumType] || [];
};
