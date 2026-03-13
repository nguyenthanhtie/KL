export const CURRICULUM_LABELS = {
  'ketnoi': 'Kết nối tri thức',
  'canhdieu': 'Cánh diều',
  'chantroicangtao': 'Chân trời sáng tạo'
};

export const getCurriculumLabel = (type) => {
  return CURRICULUM_LABELS[type] || type;
};

export const CURRICULUM_OPTIONS = Object.entries(CURRICULUM_LABELS).map(
  ([value, label]) => ({ value, label })
);
