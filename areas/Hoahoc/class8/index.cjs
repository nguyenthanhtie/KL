// Index file cho lớp 8 - export lessons theo curriculum
const ketnoi = require('./ketnoi/index.cjs');
const canhdieu = require('./canhdieu/index.cjs');
const chantroicangtao = require('./chantroicangtao/index.cjs');

// Export lessons grouped by curriculum
module.exports = {
  ketnoi: ketnoi,
  canhdieu: canhdieu,
  chantroicangtao: chantroicangtao
};

// Helper function to get lessons by curriculum type
module.exports.getLessonsByCurriculum = function(curriculumType) {
  return module.exports[curriculumType] || [];
};
