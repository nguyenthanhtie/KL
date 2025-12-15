const ketnoi = require('./ketnoi/index.cjs');
const canhdieu = require('./canhdieu/index.cjs');
const chantroicangtao = require('./chantroicangtao/index.cjs');

module.exports = {
	ketnoi: ketnoi,
	canhdieu: canhdieu,
	chantroicangtao: chantroicangtao
};

module.exports.getLessonsByCurriculum = function(curriculumType) {
	return module.exports[curriculumType] || [];
};
