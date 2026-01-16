const ketnoi = require('./ketnoi/index.cjs');

// Export lessons - chỉ sử dụng chương trình Kết nối tri thức
module.exports = {
	ketnoi: ketnoi
};

module.exports.getLessonsByCurriculum = function(curriculumType) {
	return module.exports[curriculumType] || module.exports.ketnoi || [];
};
