// Hệ thống nhiệm vụ học tập - Quest System
// Học sinh hoàn thành nhiệm vụ để thu thập nguyên liệu kiến thức

import { knowledgeTypes } from './knowledgeIngredientsData';

// Loại nhiệm vụ
export const questTypes = {
  LEARN: 'learn',           // Học lý thuyết
  QUIZ: 'quiz',             // Trả lời câu hỏi
  EXPERIMENT: 'experiment', // Thực hành thí nghiệm
  DISCOVERY: 'discovery',   // Khám phá/tìm hiểu
  DAILY: 'daily',           // Nhiệm vụ hàng ngày
  CHALLENGE: 'challenge',   // Thử thách đặc biệt
};

// Trạng thái nhiệm vụ
export const questStatus = {
  LOCKED: 'locked',         // Chưa mở khóa
  AVAILABLE: 'available',   // Có thể làm
  IN_PROGRESS: 'in_progress', // Đang làm
  COMPLETED: 'completed',   // Đã hoàn thành
  CLAIMED: 'claimed',       // Đã nhận thưởng
};

// Danh sách nhiệm vụ học tập
export const quests = [
  // === CHƯƠNG 1: CẤU TẠO NGUYÊN TỬ ===
  {
    id: 'quest_atom_intro',
    name: 'Giới thiệu Nguyên tử',
    type: questTypes.LEARN,
    chapter: 1,
    description: 'Tìm hiểu về cấu tạo cơ bản của nguyên tử',
    objectives: [
      { id: 'obj1', text: 'Xem video giới thiệu nguyên tử', type: 'watch_video' },
      { id: 'obj2', text: 'Đọc bài học về proton, neutron, electron', type: 'read_lesson' },
      { id: 'obj3', text: 'Trả lời 3 câu hỏi ôn tập', type: 'answer_quiz', count: 3 }
    ],
    rewards: [
      { ingredientId: 'atom_knowledge', amount: 5 },
      { type: 'exp', amount: 50 }
    ],
    requiredLevel: 1,
    requiredQuests: [],
    estimatedTime: '15 phút',
    difficulty: 'easy',
    icon: '⚛️'
  },
  {
    id: 'quest_electron_shell',
    name: 'Lớp Electron',
    type: questTypes.LEARN,
    chapter: 1,
    description: 'Học về các lớp electron trong nguyên tử',
    objectives: [
      { id: 'obj1', text: 'Tìm hiểu về lớp vỏ electron', type: 'read_lesson' },
      { id: 'obj2', text: 'Xác định cấu hình electron của 5 nguyên tố', type: 'exercise', count: 5 },
      { id: 'obj3', text: 'Hoàn thành bài kiểm tra mini', type: 'mini_test' }
    ],
    rewards: [
      { ingredientId: 'atom_knowledge', amount: 3 },
      { ingredientId: 'electron_config', amount: 3 },
      { type: 'exp', amount: 75 }
    ],
    requiredLevel: 1,
    requiredQuests: ['quest_atom_intro'],
    estimatedTime: '20 phút',
    difficulty: 'easy',
    icon: '🔮'
  },
  {
    id: 'quest_atom_quiz_master',
    name: 'Bậc thầy Nguyên tử',
    type: questTypes.QUIZ,
    chapter: 1,
    description: 'Thử thách kiến thức về cấu tạo nguyên tử',
    objectives: [
      { id: 'obj1', text: 'Trả lời đúng 10 câu hỏi liên tiếp', type: 'quiz_streak', count: 10 }
    ],
    rewards: [
      { ingredientId: 'atom_knowledge', amount: 5 },
      { ingredientId: 'electron_config', amount: 2 },
      { type: 'exp', amount: 100 }
    ],
    requiredLevel: 2,
    requiredQuests: ['quest_electron_shell'],
    estimatedTime: '10 phút',
    difficulty: 'medium',
    icon: '🏆'
  },

  // === CHƯƠNG 2: LIÊN KẾT HÓA HỌC ===
  {
    id: 'quest_ionic_bond',
    name: 'Liên kết Ion',
    type: questTypes.LEARN,
    chapter: 2,
    description: 'Tìm hiểu về liên kết ion giữa kim loại và phi kim',
    objectives: [
      { id: 'obj1', text: 'Xem video về liên kết ion', type: 'watch_video' },
      { id: 'obj2', text: 'Mô phỏng sự hình thành NaCl', type: 'simulation' },
      { id: 'obj3', text: 'Xác định 5 hợp chất ion', type: 'exercise', count: 5 }
    ],
    rewards: [
      { ingredientId: 'ionic_bond', amount: 5 },
      { ingredientId: 'atom_knowledge', amount: 2 },
      { type: 'exp', amount: 80 }
    ],
    requiredLevel: 2,
    requiredQuests: ['quest_electron_shell'],
    estimatedTime: '20 phút',
    difficulty: 'medium',
    icon: '⚡'
  },
  {
    id: 'quest_covalent_bond',
    name: 'Liên kết Cộng hóa trị',
    type: questTypes.LEARN,
    chapter: 2,
    description: 'Tìm hiểu về liên kết cộng hóa trị',
    objectives: [
      { id: 'obj1', text: 'Học lý thuyết liên kết cộng hóa trị', type: 'read_lesson' },
      { id: 'obj2', text: 'Vẽ cấu trúc Lewis cho 5 phân tử', type: 'drawing', count: 5 },
      { id: 'obj3', text: 'Phân biệt liên kết đơn, đôi, ba', type: 'exercise', count: 3 }
    ],
    rewards: [
      { ingredientId: 'covalent_bond', amount: 5 },
      { ingredientId: 'atom_knowledge', amount: 2 },
      { type: 'exp', amount: 80 }
    ],
    requiredLevel: 2,
    requiredQuests: ['quest_ionic_bond'],
    estimatedTime: '25 phút',
    difficulty: 'medium',
    icon: '🔗'
  },
  {
    id: 'quest_metallic_bond',
    name: 'Liên kết Kim loại',
    type: questTypes.LEARN,
    chapter: 2,
    description: 'Khám phá liên kết trong kim loại',
    objectives: [
      { id: 'obj1', text: 'Tìm hiểu về biển electron', type: 'read_lesson' },
      { id: 'obj2', text: 'So sánh tính chất kim loại', type: 'exercise', count: 4 },
      { id: 'obj3', text: 'Hoàn thành bài kiểm tra', type: 'mini_test' }
    ],
    rewards: [
      { ingredientId: 'metallic_bond', amount: 4 },
      { ingredientId: 'periodic_pattern', amount: 2 },
      { type: 'exp', amount: 90 }
    ],
    requiredLevel: 3,
    requiredQuests: ['quest_covalent_bond'],
    estimatedTime: '20 phút',
    difficulty: 'medium',
    icon: '🔩'
  },

  // === CHƯƠNG 3: BẢNG TUẦN HOÀN ===
  {
    id: 'quest_periodic_table',
    name: 'Khám phá Bảng Tuần hoàn',
    type: questTypes.DISCOVERY,
    chapter: 3,
    description: 'Tìm hiểu cấu trúc bảng tuần hoàn',
    objectives: [
      { id: 'obj1', text: 'Tương tác với bảng tuần hoàn', type: 'explore' },
      { id: 'obj2', text: 'Tìm hiểu về 10 nguyên tố', type: 'view_elements', count: 10 },
      { id: 'obj3', text: 'Xác định nhóm và chu kỳ', type: 'exercise', count: 5 }
    ],
    rewards: [
      { ingredientId: 'periodic_pattern', amount: 4 },
      { ingredientId: 'atom_knowledge', amount: 3 },
      { type: 'exp', amount: 85 }
    ],
    requiredLevel: 2,
    requiredQuests: ['quest_atom_quiz_master'],
    estimatedTime: '25 phút',
    difficulty: 'easy',
    icon: '📊'
  },
  {
    id: 'quest_electronegativity',
    name: 'Độ âm điện',
    type: questTypes.LEARN,
    chapter: 3,
    description: 'Tìm hiểu về độ âm điện và xu hướng',
    objectives: [
      { id: 'obj1', text: 'Học về độ âm điện', type: 'read_lesson' },
      { id: 'obj2', text: 'So sánh độ âm điện các nguyên tố', type: 'exercise', count: 8 },
      { id: 'obj3', text: 'Dự đoán loại liên kết', type: 'prediction', count: 5 }
    ],
    rewards: [
      { ingredientId: 'electronegativity', amount: 3 },
      { ingredientId: 'periodic_pattern', amount: 2 },
      { type: 'exp', amount: 100 }
    ],
    requiredLevel: 3,
    requiredQuests: ['quest_periodic_table', 'quest_covalent_bond'],
    estimatedTime: '30 phút',
    difficulty: 'hard',
    icon: '🧲'
  },

  // === CHƯƠNG 4: PHẢN ỨNG HÓA HỌC ===
  {
    id: 'quest_reaction_types',
    name: 'Các loại Phản ứng',
    type: questTypes.LEARN,
    chapter: 4,
    description: 'Tìm hiểu các loại phản ứng hóa học cơ bản',
    objectives: [
      { id: 'obj1', text: 'Học về 4 loại phản ứng chính', type: 'read_lesson' },
      { id: 'obj2', text: 'Phân loại 10 phản ứng', type: 'classify', count: 10 },
      { id: 'obj3', text: 'Xem thí nghiệm mô phỏng', type: 'simulation' }
    ],
    rewards: [
      { ingredientId: 'synthesis_reaction', amount: 4 },
      { ingredientId: 'decomposition_reaction', amount: 4 },
      { ingredientId: 'displacement_reaction', amount: 3 },
      { type: 'exp', amount: 100 }
    ],
    requiredLevel: 3,
    requiredQuests: ['quest_ionic_bond', 'quest_covalent_bond'],
    estimatedTime: '30 phút',
    difficulty: 'medium',
    icon: '🔄'
  },
  {
    id: 'quest_balancing',
    name: 'Cân bằng Phương trình',
    type: questTypes.QUIZ,
    chapter: 4,
    description: 'Luyện tập cân bằng phương trình hóa học',
    objectives: [
      { id: 'obj1', text: 'Học quy tắc cân bằng', type: 'read_lesson' },
      { id: 'obj2', text: 'Cân bằng 10 phương trình', type: 'balance_equation', count: 10 },
      { id: 'obj3', text: 'Thử thách tốc độ cân bằng', type: 'speed_challenge' }
    ],
    rewards: [
      { ingredientId: 'balancing_equations', amount: 5 },
      { ingredientId: 'mole_concept', amount: 2 },
      { type: 'exp', amount: 120 }
    ],
    requiredLevel: 3,
    requiredQuests: ['quest_reaction_types'],
    estimatedTime: '25 phút',
    difficulty: 'hard',
    icon: '📐'
  },

  // === CHƯƠNG 5: AXIT - BAZƠ ===
  {
    id: 'quest_acid_basics',
    name: 'Nhập môn Axit',
    type: questTypes.LEARN,
    chapter: 5,
    description: 'Tìm hiểu về axit và tính chất của chúng',
    objectives: [
      { id: 'obj1', text: 'Học định nghĩa axit', type: 'read_lesson' },
      { id: 'obj2', text: 'Xác định 8 axit phổ biến', type: 'identify', count: 8 },
      { id: 'obj3', text: 'Thí nghiệm với chỉ thị màu', type: 'simulation' }
    ],
    rewards: [
      { ingredientId: 'acid_knowledge', amount: 5 },
      { ingredientId: 'safety_basics', amount: 2 },
      { type: 'exp', amount: 75 }
    ],
    requiredLevel: 2,
    requiredQuests: ['quest_reaction_types'],
    estimatedTime: '20 phút',
    difficulty: 'easy',
    icon: '🧪'
  },
  {
    id: 'quest_base_basics',
    name: 'Nhập môn Bazơ',
    type: questTypes.LEARN,
    chapter: 5,
    description: 'Tìm hiểu về bazơ và tính chất của chúng',
    objectives: [
      { id: 'obj1', text: 'Học định nghĩa bazơ', type: 'read_lesson' },
      { id: 'obj2', text: 'Xác định 6 bazơ phổ biến', type: 'identify', count: 6 },
      { id: 'obj3', text: 'So sánh axit và bazơ', type: 'comparison' }
    ],
    rewards: [
      { ingredientId: 'base_knowledge', amount: 5 },
      { ingredientId: 'safety_basics', amount: 2 },
      { type: 'exp', amount: 75 }
    ],
    requiredLevel: 2,
    requiredQuests: ['quest_acid_basics'],
    estimatedTime: '20 phút',
    difficulty: 'easy',
    icon: '🔵'
  },
  {
    id: 'quest_ph_scale',
    name: 'Thang đo pH',
    type: questTypes.EXPERIMENT,
    chapter: 5,
    description: 'Khám phá thang đo pH qua thí nghiệm',
    objectives: [
      { id: 'obj1', text: 'Tìm hiểu thang pH', type: 'read_lesson' },
      { id: 'obj2', text: 'Đo pH 10 dung dịch khác nhau', type: 'experiment', count: 10 },
      { id: 'obj3', text: 'Dự đoán pH từ công thức', type: 'prediction', count: 5 }
    ],
    rewards: [
      { ingredientId: 'ph_scale', amount: 4 },
      { ingredientId: 'acid_knowledge', amount: 2 },
      { ingredientId: 'base_knowledge', amount: 2 },
      { type: 'exp', amount: 110 }
    ],
    requiredLevel: 3,
    requiredQuests: ['quest_base_basics'],
    estimatedTime: '30 phút',
    difficulty: 'medium',
    icon: '📏'
  },

  // === CHƯƠNG 6: OXI HÓA - KHỬ ===
  {
    id: 'quest_oxidation_state',
    name: 'Số Oxi hóa',
    type: questTypes.LEARN,
    chapter: 6,
    description: 'Học cách xác định số oxi hóa',
    objectives: [
      { id: 'obj1', text: 'Học quy tắc số oxi hóa', type: 'read_lesson' },
      { id: 'obj2', text: 'Xác định số oxi hóa trong 12 hợp chất', type: 'exercise', count: 12 },
      { id: 'obj3', text: 'Kiểm tra kiến thức', type: 'mini_test' }
    ],
    rewards: [
      { ingredientId: 'oxidation_state', amount: 5 },
      { ingredientId: 'atom_knowledge', amount: 2 },
      { type: 'exp', amount: 90 }
    ],
    requiredLevel: 4,
    requiredQuests: ['quest_balancing'],
    estimatedTime: '25 phút',
    difficulty: 'medium',
    icon: '🔢'
  },
  {
    id: 'quest_redox_reactions',
    name: 'Phản ứng Oxi hóa-Khử',
    type: questTypes.LEARN,
    chapter: 6,
    description: 'Tìm hiểu về phản ứng oxi hóa khử',
    objectives: [
      { id: 'obj1', text: 'Học về chất oxi hóa và chất khử', type: 'read_lesson' },
      { id: 'obj2', text: 'Cân bằng 8 phản ứng oxi hóa khử', type: 'balance_redox', count: 8 },
      { id: 'obj3', text: 'Xác định chất oxi hóa/khử', type: 'identify', count: 10 }
    ],
    rewards: [
      { ingredientId: 'redox_reaction', amount: 4 },
      { ingredientId: 'oxidation_state', amount: 2 },
      { type: 'exp', amount: 130 }
    ],
    requiredLevel: 5,
    requiredQuests: ['quest_oxidation_state'],
    estimatedTime: '35 phút',
    difficulty: 'hard',
    icon: '⚡'
  },

  // === CHƯƠNG 7: NHIỆT ĐỘNG HỌC ===
  {
    id: 'quest_heat_energy',
    name: 'Năng lượng và Phản ứng',
    type: questTypes.LEARN,
    chapter: 7,
    description: 'Tìm hiểu về nhiệt trong phản ứng hóa học',
    objectives: [
      { id: 'obj1', text: 'Học về phản ứng tỏa/thu nhiệt', type: 'read_lesson' },
      { id: 'obj2', text: 'Phân loại 10 phản ứng theo nhiệt', type: 'classify', count: 10 },
      { id: 'obj3', text: 'Xem mô phỏng năng lượng', type: 'simulation' }
    ],
    rewards: [
      { ingredientId: 'heat_energy', amount: 4 },
      { ingredientId: 'synthesis_reaction', amount: 2 },
      { type: 'exp', amount: 95 }
    ],
    requiredLevel: 4,
    requiredQuests: ['quest_reaction_types'],
    estimatedTime: '25 phút',
    difficulty: 'medium',
    icon: '🔥'
  },
  {
    id: 'quest_enthalpy',
    name: 'Enthalpy và Biến đổi',
    type: questTypes.LEARN,
    chapter: 7,
    description: 'Tìm hiểu sâu về enthalpy',
    objectives: [
      { id: 'obj1', text: 'Học về enthalpy và ΔH', type: 'read_lesson' },
      { id: 'obj2', text: 'Tính toán ΔH cho 6 phản ứng', type: 'calculate', count: 6 },
      { id: 'obj3', text: 'Vẽ biểu đồ năng lượng', type: 'drawing', count: 3 }
    ],
    rewards: [
      { ingredientId: 'enthalpy', amount: 3 },
      { ingredientId: 'heat_energy', amount: 2 },
      { type: 'exp', amount: 140 }
    ],
    requiredLevel: 5,
    requiredQuests: ['quest_heat_energy'],
    estimatedTime: '40 phút',
    difficulty: 'hard',
    icon: '📈'
  },

  // === CHƯƠNG 8: HÓA HỌC HỮU CƠ ===
  {
    id: 'quest_hydrocarbon',
    name: 'Hydrocarbon Cơ bản',
    type: questTypes.LEARN,
    chapter: 8,
    description: 'Giới thiệu về hydrocarbon',
    objectives: [
      { id: 'obj1', text: 'Học về alkane, alkene, alkyne', type: 'read_lesson' },
      { id: 'obj2', text: 'Đặt tên 8 hydrocarbon', type: 'naming', count: 8 },
      { id: 'obj3', text: 'Vẽ cấu trúc phân tử', type: 'drawing', count: 5 }
    ],
    rewards: [
      { ingredientId: 'hydrocarbon_basic', amount: 4 },
      { ingredientId: 'covalent_bond', amount: 3 },
      { type: 'exp', amount: 100 }
    ],
    requiredLevel: 4,
    requiredQuests: ['quest_electronegativity'],
    estimatedTime: '30 phút',
    difficulty: 'medium',
    icon: '⛽'
  },
  {
    id: 'quest_functional_groups',
    name: 'Nhóm Chức năng',
    type: questTypes.LEARN,
    chapter: 8,
    description: 'Tìm hiểu các nhóm chức trong hữu cơ',
    objectives: [
      { id: 'obj1', text: 'Học về 7 nhóm chức cơ bản', type: 'read_lesson' },
      { id: 'obj2', text: 'Nhận diện nhóm chức', type: 'identify', count: 12 },
      { id: 'obj3', text: 'Dự đoán tính chất từ nhóm chức', type: 'prediction', count: 8 }
    ],
    rewards: [
      { ingredientId: 'functional_groups', amount: 3 },
      { ingredientId: 'hydrocarbon_basic', amount: 2 },
      { type: 'exp', amount: 150 }
    ],
    requiredLevel: 5,
    requiredQuests: ['quest_hydrocarbon'],
    estimatedTime: '40 phút',
    difficulty: 'hard',
    icon: '🔬'
  },

  // === NHIỆM VỤ AN TOÀN ===
  {
    id: 'quest_lab_safety',
    name: 'An toàn Phòng thí nghiệm',
    type: questTypes.LEARN,
    chapter: 0,
    description: 'Học các quy tắc an toàn cơ bản',
    objectives: [
      { id: 'obj1', text: 'Xem video an toàn phòng thí nghiệm', type: 'watch_video' },
      { id: 'obj2', text: 'Trả lời 10 câu hỏi an toàn', type: 'answer_quiz', count: 10 },
      { id: 'obj3', text: 'Nhận diện các biển cảnh báo', type: 'identify', count: 8 }
    ],
    rewards: [
      { ingredientId: 'safety_basics', amount: 5 },
      { ingredientId: 'hazard_handling', amount: 2 },
      { type: 'exp', amount: 60 }
    ],
    requiredLevel: 1,
    requiredQuests: [],
    estimatedTime: '15 phút',
    difficulty: 'easy',
    icon: '🦺'
  },
  {
    id: 'quest_hazard_master',
    name: 'Xử lý Tình huống Nguy hiểm',
    type: questTypes.CHALLENGE,
    chapter: 0,
    description: 'Học cách xử lý khi có sự cố',
    objectives: [
      { id: 'obj1', text: 'Học về các loại sự cố', type: 'read_lesson' },
      { id: 'obj2', text: 'Mô phỏng xử lý 5 tình huống', type: 'simulation', count: 5 },
      { id: 'obj3', text: 'Hoàn thành bài kiểm tra an toàn', type: 'safety_test' }
    ],
    rewards: [
      { ingredientId: 'hazard_handling', amount: 4 },
      { ingredientId: 'safety_basics', amount: 3 },
      { type: 'exp', amount: 100 }
    ],
    requiredLevel: 3,
    requiredQuests: ['quest_lab_safety'],
    estimatedTime: '25 phút',
    difficulty: 'medium',
    icon: '⚠️'
  }
];

// Nhiệm vụ hàng ngày
export const dailyQuests = [
  {
    id: 'daily_login',
    name: 'Đăng nhập hàng ngày',
    type: questTypes.DAILY,
    description: 'Đăng nhập vào phòng thí nghiệm',
    objectives: [
      { id: 'obj1', text: 'Đăng nhập', type: 'login' }
    ],
    rewards: [
      { ingredientId: 'atom_knowledge', amount: 2 },
      { type: 'exp', amount: 20 }
    ],
    resetTime: '00:00',
    icon: '📅'
  },
  {
    id: 'daily_quiz',
    name: 'Câu hỏi ngày',
    type: questTypes.DAILY,
    description: 'Trả lời đúng 5 câu hỏi',
    objectives: [
      { id: 'obj1', text: 'Trả lời đúng 5 câu hỏi', type: 'answer_quiz', count: 5 }
    ],
    rewards: [
      { ingredientId: 'atom_knowledge', amount: 3 },
      { ingredientId: 'covalent_bond', amount: 2 },
      { type: 'exp', amount: 40 }
    ],
    resetTime: '00:00',
    icon: '❓'
  },
  {
    id: 'daily_craft',
    name: 'Chế tạo ngày',
    type: questTypes.DAILY,
    description: 'Chế tạo 2 hóa chất bất kỳ',
    objectives: [
      { id: 'obj1', text: 'Chế tạo 2 hóa chất', type: 'craft_chemical', count: 2 }
    ],
    rewards: [
      { ingredientId: 'synthesis_reaction', amount: 2 },
      { type: 'exp', amount: 35 }
    ],
    resetTime: '00:00',
    icon: '⚗️'
  },
  {
    id: 'daily_reaction',
    name: 'Thí nghiệm ngày',
    type: questTypes.DAILY,
    description: 'Thực hiện 3 phản ứng trong phòng thí nghiệm',
    objectives: [
      { id: 'obj1', text: 'Thực hiện 3 phản ứng', type: 'perform_reaction', count: 3 }
    ],
    rewards: [
      { ingredientId: 'decomposition_reaction', amount: 2 },
      { ingredientId: 'heat_energy', amount: 1 },
      { type: 'exp', amount: 50 }
    ],
    resetTime: '00:00',
    icon: '🧫'
  },
  {
    id: 'daily_explore',
    name: 'Khám phá ngày',
    type: questTypes.DAILY,
    description: 'Khám phá 3 nguyên tố trên bảng tuần hoàn',
    objectives: [
      { id: 'obj1', text: 'Xem thông tin 3 nguyên tố', type: 'view_elements', count: 3 }
    ],
    rewards: [
      { ingredientId: 'periodic_pattern', amount: 1 },
      { ingredientId: 'atom_knowledge', amount: 2 },
      { type: 'exp', amount: 30 }
    ],
    resetTime: '00:00',
    icon: '🔍'
  }
];

// Thử thách đặc biệt (tuần/tháng)
export const specialChallenges = [
  {
    id: 'challenge_element_master',
    name: 'Bậc thầy Nguyên tố',
    type: questTypes.CHALLENGE,
    description: 'Tìm hiểu tất cả 118 nguyên tố',
    objectives: [
      { id: 'obj1', text: 'Xem thông tin 118 nguyên tố', type: 'view_elements', count: 118 }
    ],
    rewards: [
      { ingredientId: 'periodic_pattern', amount: 10 },
      { ingredientId: 'electronegativity', amount: 5 },
      { type: 'exp', amount: 500 },
      { type: 'title', title: 'Bậc thầy Nguyên tố' }
    ],
    timeLimit: null, // Không giới hạn
    icon: '🏅'
  },
  {
    id: 'challenge_reaction_chain',
    name: 'Chuỗi Phản ứng',
    type: questTypes.CHALLENGE,
    description: 'Thực hiện 10 phản ứng liên tiếp không sai',
    objectives: [
      { id: 'obj1', text: 'Thực hiện 10 phản ứng đúng liên tiếp', type: 'reaction_streak', count: 10 }
    ],
    rewards: [
      { ingredientId: 'synthesis_reaction', amount: 5 },
      { ingredientId: 'decomposition_reaction', amount: 5 },
      { type: 'exp', amount: 300 }
    ],
    timeLimit: 24 * 60 * 60 * 1000, // 24 giờ
    icon: '⛓️'
  },
  {
    id: 'challenge_craft_all',
    name: 'Nhà Giả kim',
    type: questTypes.CHALLENGE,
    description: 'Chế tạo thành công tất cả hóa chất',
    objectives: [
      { id: 'obj1', text: 'Chế tạo tất cả hóa chất có sẵn', type: 'craft_all' }
    ],
    rewards: [
      { type: 'exp', amount: 1000 },
      { type: 'title', title: 'Nhà Giả kim' },
      { ingredientId: 'redox_reaction', amount: 5 },
      { ingredientId: 'functional_groups', amount: 3 }
    ],
    timeLimit: null,
    icon: '🧙'
  }
];

// Helper functions
export const getQuestById = (id) => {
  return quests.find(q => q.id === id) || 
         dailyQuests.find(q => q.id === id) ||
         specialChallenges.find(q => q.id === id);
};

export const getQuestsByChapter = (chapter) => {
  return quests.filter(q => q.chapter === chapter);
};

export const getAvailableQuests = (completedQuests, playerLevel) => {
  return quests.filter(quest => {
    // Đã hoàn thành rồi thì không hiển thị
    if (completedQuests.includes(quest.id)) return false;
    
    // Kiểm tra level
    if (playerLevel < quest.requiredLevel) return false;
    
    // Kiểm tra nhiệm vụ yêu cầu
    const hasCompletedRequired = quest.requiredQuests.every(
      reqId => completedQuests.includes(reqId)
    );
    
    return hasCompletedRequired;
  });
};

export const getDifficultyInfo = (difficulty) => {
  const info = {
    easy: { name: 'Dễ', color: '#22C55E', stars: 1 },
    medium: { name: 'Trung bình', color: '#F59E0B', stars: 2 },
    hard: { name: 'Khó', color: '#EF4444', stars: 3 },
    expert: { name: 'Chuyên gia', color: '#8B5CF6', stars: 4 }
  };
  return info[difficulty] || info.medium;
};

// Hướng dẫn chi tiết cho từng loại objective với đường dẫn trực tiếp
export const objectiveGuides = {
  watch_video: {
    icon: '🎬',
    title: 'Xem Video',
    description: 'Xem video bài giảng để hiểu kiến thức',
    actionPath: '/program/chemistry/dashboard',
    actionLabel: 'Đi đến Bài học'
  },
  read_lesson: {
    icon: '📖',
    title: 'Đọc Bài học',
    description: 'Đọc nội dung bài học lý thuyết',
    actionPath: '/program/chemistry/dashboard',
    actionLabel: 'Đi đến Bài học'
  },
  answer_quiz: {
    icon: '❓',
    title: 'Trả lời Câu hỏi',
    description: 'Trả lời đúng các câu hỏi ôn tập',
    actionPath: '/advanced-challenge',
    actionLabel: 'Đi đến Thử thách'
  },
  exercise: {
    icon: '✏️',
    title: 'Làm Bài tập',
    description: 'Hoàn thành các bài tập thực hành',
    actionPath: '/advanced-challenge',
    actionLabel: 'Đi đến Thử thách'
  },
  mini_test: {
    icon: '📝',
    title: 'Bài kiểm tra Mini',
    description: 'Hoàn thành bài kiểm tra ngắn',
    actionPath: '/advanced-challenge',
    actionLabel: 'Đi đến Thử thách'
  },
  simulation: {
    icon: '🧪',
    title: 'Mô phỏng Thí nghiệm',
    description: 'Thực hiện thí nghiệm ảo trên máy tính',
    actionPath: '/chemistry-lab',
    actionLabel: 'Đi đến Phòng thí nghiệm'
  },
  explore: {
    icon: '🔍',
    title: 'Khám phá',
    description: 'Tự do khám phá và tìm hiểu',
    actionPath: '/chemistry-lab',
    actionLabel: 'Đi đến Phòng thí nghiệm'
  },
  view_elements: {
    icon: '⚛️',
    title: 'Xem Nguyên tố',
    description: 'Xem thông tin các nguyên tố trong bảng tuần hoàn',
    actionPath: '/chemistry-lab',
    actionLabel: 'Đi đến Phòng thí nghiệm'
  },
  quiz_streak: {
    icon: '🔥',
    title: 'Chuỗi Câu hỏi',
    description: 'Trả lời đúng liên tiếp không được sai',
    actionPath: '/advanced-challenge',
    actionLabel: 'Đi đến Thử thách'
  },
  drawing: {
    icon: '🎨',
    title: 'Vẽ/Xây dựng',
    description: 'Vẽ cấu trúc hoặc xây dựng mô hình',
    actionPath: '/advanced-challenge/xay-dung-phan-tu',
    actionLabel: 'Đi đến Xây dựng phân tử'
  },
  prediction: {
    icon: '🔮',
    title: 'Dự đoán',
    description: 'Dự đoán kết quả dựa trên kiến thức',
    actionPath: '/advanced-challenge',
    actionLabel: 'Đi đến Thử thách'
  },
  classify: {
    icon: '📂',
    title: 'Phân loại',
    description: 'Phân loại các chất hoặc phản ứng vào đúng nhóm',
    actionPath: '/advanced-challenge',
    actionLabel: 'Đi đến Thử thách'
  },
  identify: {
    icon: '🎯',
    title: 'Nhận diện',
    description: 'Nhận diện và xác định đúng đối tượng',
    actionPath: '/advanced-challenge/nhan-biet-dung-dich',
    actionLabel: 'Đi đến Nhận biết dung dịch'
  },
  comparison: {
    icon: '⚖️',
    title: 'So sánh',
    description: 'So sánh và tìm điểm giống/khác nhau',
    actionPath: '/advanced-challenge',
    actionLabel: 'Đi đến Thử thách'
  },
  experiment: {
    icon: '🔬',
    title: 'Thí nghiệm',
    description: 'Thực hiện thí nghiệm và quan sát kết quả',
    actionPath: '/chemistry-lab',
    actionLabel: 'Đi đến Phòng thí nghiệm'
  },
  balance_equation: {
    icon: '⚖️',
    title: 'Cân bằng Phương trình',
    description: 'Cân bằng phương trình hóa học',
    actionPath: '/advanced-challenge/can-bang',
    actionLabel: 'Đi đến Cân bằng phương trình'
  },
  balance_redox: {
    icon: '⚡',
    title: 'Cân bằng Oxi hóa-Khử',
    description: 'Cân bằng phản ứng oxi hóa khử',
    actionPath: '/advanced-challenge/tinh-oxi-hoa',
    actionLabel: 'Đi đến Tính oxi hóa'
  },
  calculate: {
    icon: '🧮',
    title: 'Tính toán',
    description: 'Thực hiện các phép tính hóa học',
    actionPath: '/advanced-challenge/mol-quick-calc',
    actionLabel: 'Đi đến Tính toán Mol'
  },
  naming: {
    icon: '🏷️',
    title: 'Đặt tên',
    description: 'Gọi tên đúng các hợp chất hóa học',
    actionPath: '/advanced-challenge',
    actionLabel: 'Đi đến Thử thách'
  },
  speed_challenge: {
    icon: '⚡',
    title: 'Thử thách Tốc độ',
    description: 'Hoàn thành nhanh nhất có thể',
    actionPath: '/advanced-challenge',
    actionLabel: 'Đi đến Thử thách'
  },
  craft_chemical: {
    icon: '⚗️',
    title: 'Chế tạo Hóa chất',
    description: 'Chế tạo hóa chất trong xưởng',
    actionPath: '/lab-adventure',
    actionLabel: 'Đi đến Phiêu lưu Lab'
  },
  perform_reaction: {
    icon: '🧪',
    title: 'Thực hiện Phản ứng',
    description: 'Thực hiện phản ứng hóa học',
    actionPath: '/chemistry-lab',
    actionLabel: 'Đi đến Phòng thí nghiệm'
  },
  login: {
    icon: '📅',
    title: 'Đăng nhập',
    description: 'Đăng nhập vào ứng dụng',
    actionPath: '/',
    actionLabel: 'Trang chủ'
  },
  safety_test: {
    icon: '🦺',
    title: 'Kiểm tra An toàn',
    description: 'Hoàn thành bài kiểm tra an toàn phòng thí nghiệm',
    actionPath: '/advanced-challenge/phong-thi-nghiem',
    actionLabel: 'Đi đến Phòng thí nghiệm an toàn'
  },
  reaction_streak: {
    icon: '⛓️',
    title: 'Chuỗi Phản ứng',
    description: 'Thực hiện nhiều phản ứng đúng liên tiếp',
    actionPath: '/chemistry-lab',
    actionLabel: 'Đi đến Phòng thí nghiệm'
  },
  craft_all: {
    icon: '🧙',
    title: 'Chế tạo Tất cả',
    description: 'Chế tạo thành công tất cả hóa chất có thể',
    actionPath: '/lab-adventure',
    actionLabel: 'Đi đến Phiêu lưu Lab'
  }
};

// Hàm lấy hướng dẫn cho objective
export const getObjectiveGuide = (objectiveType) => {
  return objectiveGuides[objectiveType] || {
    icon: '📋',
    title: 'Nhiệm vụ',
    description: 'Hoàn thành nhiệm vụ được giao',
    howTo: 'Làm theo hướng dẫn trên màn hình',
    tips: ['Đọc kỹ yêu cầu', 'Làm từng bước một']
  };
};
