// Index file cho lớp 8 - export lessons theo curriculum
const ketnoi = require('./ketnoi/lesson1.cjs');
const canhdieu = require('./canhdieu/lesson1.cjs');
const chantroicangtao = require('./chantroicangtao/lesson1.cjs');

// Export lessons grouped by curriculum
module.exports = {
  ketnoi: [ketnoi],
  canhdieu: [canhdieu],
  chantroicangtao: [chantroicangtao]
};

// Helper function to get lessons by curriculum type
module.exports.getLessonsByCurriculum = function(curriculumType) {
  return module.exports[curriculumType] || [];
};
