const mongoose = require('mongoose');
const Lesson = require('./models/Lesson.cjs');
const lessons8 = require('./areas/Hoahoc/class8/index.cjs');
const lessons9 = require('./areas/Hoahoc/class9/index.cjs');
const lessons10 = require('./areas/Hoahoc/class10/index.cjs');
const lessons11 = require('./areas/Hoahoc/class11/index.cjs');
const lessons12 = require('./areas/Hoahoc/class12/index.cjs');
const Challenge = require('./models/Challenge.cjs');
require('dotenv').config();

const challenges = [
  // GAME - Easy
  {
    id: 1,
    name: 'Đoán Hình Bắt Chữ',
    description: 'Đoán tên chất hóa học dựa trên hình ảnh và gợi ý. Thử thách khả năng liên tưởng và kiến thức về các chất phổ biến.',
    icon: '🎯',
    difficulty: 'Dễ',
    difficultyLevel: 'easy',
    difficultyColor: 'bg-green-500',
    category: 'game',
    grade: 8,
    time: '5-10 phút',
    points: 100,
    status: 'available',
    link: '/advanced-challenge/duoi-hinh',
    features: ['10 câu hỏi', 'Có gợi ý', 'Giới hạn thời gian', 'Điểm cao'],
    prerequisite: {
      classId: 8,
      lessonId: 1
    }
  },

  // STRUCTURE - Easy
  {
    id: 2,
    name: 'Cấu Trúc Nguyên Tử',
    description: 'Xác định số proton, neutron, electron trong nguyên tử và ion! Hiểu về số khối, số hiệu nguyên tử, đồng vị và sự hình thành ion.',
    icon: '⚛️',
    difficulty: 'Dễ',
    difficultyLevel: 'easy',
    difficultyColor: 'bg-green-500',
    category: 'structure',
    grade: 10,
    time: '15-20 phút',
    points: 200,
    status: 'available',
    link: '/advanced-challenge/cau-truc-nguyen-tu',
    features: ['10 thử thách', 'Mô phỏng nguyên tử', 'Vỏ electron', 'Học về đồng vị'],
    prerequisite: {
      classId: 10,
      lessonId: 1
    }
  },

  // STRUCTURE - Medium
  {
    id: 3,
    name: 'Ghép Nguyên Tử',
    description: 'Sắp xếp các electron vào đúng lớp vỏ nguyên tử. Thử thách hiểu biết về cấu trúc nguyên tử và phân bố electron.',
    icon: '⚛️',
    difficulty: 'Trung bình',
    difficultyLevel: 'medium',
    difficultyColor: 'bg-yellow-500',
    category: 'structure',
    grade: 10,
    time: '10-15 phút',
    points: 200,
    status: 'available',
    link: '/advanced-challenge/ghep-nguyen-tu',
    features: ['36 nguyên tố', 'Tương tác kéo thả', 'Hình ảnh 3D', '6 thử thách'],
    prerequisite: {
      classId: 10,
      lessonId: 2
    }
  },

  // EXPERIMENT - Easy
  {
    id: 4,
    name: 'Phòng Thí Nghiệm',
    description: 'Mô phỏng thí nghiệm kim loại tác dụng với axit! Quan sát bọt khí, màu sắc dung dịch, xác định sản phẩm phản ứng.',
    icon: '🧪',
    difficulty: 'Dễ',
    difficultyLevel: 'easy',
    difficultyColor: 'bg-green-600',
    category: 'experiment',
    grade: 8,
    time: '15-20 phút',
    points: 220,
    status: 'available',
    link: '/advanced-challenge/phong-thi-nghiem',
    features: ['10 thí nghiệm', 'Mô phỏng phản ứng', 'Bọt khí thực tế', 'Kệ hóa chất'],
    prerequisite: {
      classId: 8,
      lessonId: 5
    }
  },

  // EXPERIMENT - Medium
  {
    id: 5,
    name: 'Nhận Biết Dung Dịch',
    description: 'Mô phỏng thí nghiệm thực tế! Nhỏ các thuốc thử vào dung dịch X, quan sát hiện tượng và đoán xem đó là ion gì.',
    icon: '💧',
    difficulty: 'Trung bình',
    difficultyLevel: 'medium',
    difficultyColor: 'bg-blue-500',
    category: 'experiment',
    grade: 8,
    time: '15-20 phút',
    points: 250,
    status: 'available',
    link: '/advanced-challenge/nhan-biet-dung-dich',
    features: ['8 thí nghiệm', 'Mô phỏng phòng lab', 'Hiệu ứng thực tế', 'Nhiều vòng kiểm tra'],
    prerequisite: {
      classId: 8,
      lessonId: 38,
    }
  },

  // MOLECULE - Medium
  {
    id: 6,
    name: 'Xây Dựng Phân Tử',
    description: 'Kéo thả nguyên tử để xây dựng phân tử! Tạo liên kết đơn, đôi, ba giữa các nguyên tử để tạo thành phân tử hoàn chỉnh.',
    icon: '🧬',
    difficulty: 'Trung bình',
    difficultyLevel: 'medium',
    difficultyColor: 'bg-indigo-500',
    category: 'molecule',
    grade: 10,
    time: '15-25 phút',
    points: 280,
    status: 'available',
    link: '/advanced-challenge/xay-dung-phan-tu',
    features: ['3 cấp độ', '12 phân tử', 'Tương tác kéo thả', 'Hỗ trợ liên kết đa dạng'],
    prerequisite: {
      classId: 10,
      lessonId: 3
    }
  },

  // SOLUTION - Medium
  {
    id: 7,
    name: 'Pha Chế Dung Dịch',
    description: 'Học về nồng độ mol qua thí nghiệm tương tác! Điều chỉnh số mol và thể tích, giải các bài toán về pha loãng và trộn dung dịch.',
    icon: '⚗️',
    difficulty: 'Trung bình',
    difficultyLevel: 'medium',
    difficultyColor: 'bg-cyan-500',
    category: 'solution',
    grade: 8,
    time: '20-25 phút',
    points: 300,
    status: 'available',
    link: '/advanced-challenge/pha-che-dung-dich',
    features: ['12 thử thách', 'Mô phỏng bình thí nghiệm', '3 cấp độ', 'Công thức chi tiết'],
    prerequisite: {
      classId: 8,
      lessonId: 6
    }
  },

  // REACTION - Medium
  {
    id: 8,
    name: 'Cân Bằng Phương Trình',
    description: 'Cân bằng các phương trình hóa học bằng cách tìm hệ số thích hợp. Thử thách kỹ năng tính toán và logic.',
    icon: '⚖️',
    difficulty: 'Trung bình',
    difficultyLevel: 'medium',
    difficultyColor: 'bg-yellow-500',
    category: 'reaction',
    grade: 8,
    time: '15-20 phút',
    points: 250,
    status: 'available',
    link: '/advanced-challenge/can-bang',
    features: ['8 phản ứng', 'Tính khối lượng mol', 'Kiểm tra tức thì', 'Độ khó tăng dần'],
    prerequisite: {
      classId: 8,
      lessonId: 15
    }
  },

  // REACTION - Hard
  {
    id: 9,
    name: 'Suy Luận Phản Ứng',
    description: 'Dựa vào gợi ý để tìm các chất tham gia và sản phẩm của phản ứng. Thử thách tư duy logic và kiến thức tổng hợp.',
    icon: '🔬',
    difficulty: 'Khó',
    difficultyLevel: 'hard',
    difficultyColor: 'bg-red-500',
    category: 'reaction',
    grade: 10,
    time: '20-30 phút',
    points: 300,
    status: 'available',
    link: '/advanced-challenge/suy-luan',
    features: ['8 màn chơi', 'Gợi ý chi tiết', 'Kéo thả chất', 'Kiểm tra phản ứng'],
    prerequisite: {
      classId: 10,
      lessonId: 5
    }
  },

  // ELECTROCHEMISTRY - Medium (NEW)
  {
    id: 10,
    name: 'Tính Oxi Hóa - Khử',
    description: 'Xác định số oxi hóa của các nguyên tố, nhận biết chất khử và chất oxi hóa trong phản ứng. Thử thách kỹ năng tính toán và phân tích.',
    icon: '⚡',
    difficulty: 'Trung bình',
    difficultyLevel: 'medium',
    difficultyColor: 'bg-yellow-500',
    category: 'electrochemistry',
    grade: 10,
    time: '20-25 phút',
    points: 280,
    status: 'available',
    link: '/advanced-challenge/tinh-oxi-hoa',
    features: ['8 thử thách', 'Animation số oxi hóa', 'Giải thích chi tiết', 'Độ khó tăng dần'],
    prerequisite: {
      classId: 10,
      lessonId: 4
    }
  },

  // CALCULATION - Medium (NEW - Lớp 8)
  {
    id: 11,
    name: 'Tính Khối Lượng Mol',
    description: 'Rèn luyện kỹ năng chuyển đổi giữa khối lượng, mol và số phân tử. Bài tập tính toán nhanh với nhiều mức độ khó khác nhau.',
    icon: '🧮',
    difficulty: 'Trung bình',
    difficultyLevel: 'medium',
    difficultyColor: 'bg-yellow-500',
    category: 'calculation',
    grade: 8,
    time: '10-15 phút',
    points: 200,
    status: 'available',
    link: '/advanced-challenge/mol-quick-calc',
    features: ['Câu hỏi ngẫu nhiên', 'Gợi ý từng bước', 'Chế độ luyện tập', 'Time-attack', 'Streak bonus'],
    prerequisite: {
      classId: 8,
      lessonId: 18
    }
  },

  // OBSERVATION - Medium (NEW - Lớp 8, Chương 2)
  {
    id: 12,
    name: 'Quan Sát Phản Ứng',
    description: 'Nhận biết các hiện tượng hóa học qua quan sát phản ứng. Rèn luyện kỹ năng quan sát và phân tích các dấu hiệu của phản ứng hóa học.',
    icon: '👁️',
    difficulty: 'Trung bình',
    difficultyLevel: 'medium',
    difficultyColor: 'bg-blue-500',
    category: 'observation',
    grade: 8,
    time: '12-18 phút',
    points: 220,
    status: 'available',
    link: '/advanced-challenge/quan-sat-phan-ung',
    features: ['8 phản ứng thực tế', 'Nhận diện hiện tượng', 'Giải thích chi tiết', 'Hệ thống điểm thưởng'],
    prerequisite: {
      classId: 8,
      lessonId: 12
    }
  },

  // COMPREHENSIVE - Hard
  {
    id: 13,
    name: 'Tổng Kết Hóa Học Lớp 8',
    description: 'Thử thách tổng hợp toàn bộ kiến thức Hóa học lớp 8 với 30 câu hỏi đa dạng. Kiểm tra mức độ nắm vững của bạn qua trắc nghiệm, điền từ, tính toán và cân bằng phương trình.',
    icon: '🎓',
    difficulty: 'Khó',
    difficultyLevel: 'hard',
    difficultyColor: 'bg-red-500',
    category: 'game',
    grade: 8,
    time: '25-35 phút',
    points: 400,
    status: 'available',
    link: '/advanced-challenge/tong-ket-lop-8',
    features: ['30 câu hỏi tổng hợp', '4 dạng câu hỏi', 'Bao quát 10 chương', 'Điểm thưởng thời gian', 'Phân tích chi tiết'],
    prerequisite: {
      classId: 8,
      lessonId: 42
    }
  },
  // OXI - AIR - Medium (NEW - Lớp 8)
  {
    id: 14,
    name: 'Oxi — Không Khí',
    description: 'Thử thách tương tác về Oxi và không khí: thành phần không khí, sự oxi hóa, điều kiện cháy và bài toán stoichiometry đơn giản.',
    icon: '🌬️',
    difficulty: 'Trung bình',
    difficultyLevel: 'medium',
    difficultyColor: 'bg-yellow-500',
    category: 'observation',
    grade: 8,
    time: '10-20 phút',
    points: 220,
    status: 'available',
    link: '/advanced-challenge/oxi-khong-khi',
    features: ['MCQ', 'Thành phần không khí (nhập %)', 'Kiểm tra điều kiện cháy', 'Bài toán stoichiometry đơn giản'],
    prerequisite: {
      classId: 8,
      lessonId: 20
    }
  },
  // INORGANIC COMPOUNDS - Grade 9 (NEW)
  {
    id: 15,
    name: 'Các loại hợp chất vô cơ',
    description: 'Kiểm tra kiến thức về oxit, axit, bazơ, muối và mối quan hệ giữa chúng (lí thuyết + bài tập vận dụng).',
    icon: '🧪',
    difficulty: 'Trung bình',
    difficultyLevel: 'medium',
    difficultyColor: 'bg-indigo-500',
    category: 'structure',
    grade: 9,
    time: '15-20 phút',
    points: 240,
    status: 'available',
    link: '/advanced-challenge/hop-chat-vo-co',
    features: ['20 câu hỏi', 'Nhiều dạng: trắc nghiệm, điền từ, ghép, phân loại, sắp xếp', 'Gợi ý và giải thích'],
    prerequisite: {
      classId: 9,
      lessonId: 7
    }
  },
  // KIM LOAI - Grade 9 (NEW)
  {
    id: 16,
    name: 'Kim Loại',
    description: 'Các tính chất vật lí và hoá học của kim loại, dãy hoạt động, phản ứng với dung dịch muối, hợp kim và phương pháp điều chế.',
    icon: '🔩',
    difficulty: 'Trung bình',
    difficultyLevel: 'medium',
    difficultyColor: 'bg-amber-500',
    category: 'structure',
    grade: 9,
    time: '15-25 phút',
    points: 260,
    status: 'available',
    link: '/advanced-challenge/kim-loai',
    features: ['6 phần: tính chất vật lí, tính chất hoá học, dãy hoạt động, phản ứng với muối, hợp kim, điều chế'],
    prerequisite: {
      classId: 9,
      lessonId: 15
    }
  },
  // PHI KIM - HALOGEN - Grade 9 (NEW)
  {
    id: 17,
    name: 'Phi kim - Halogen',
    description: 'Tổng hợp kiến thức về phi kim: tính chất chung, Clo và hợp chất, Brom, Iot, Flo và bài tập luyện tập.',
    icon: '🧪',
    difficulty: 'Trung bình',
    difficultyLevel: 'medium',
    difficultyColor: 'bg-indigo-500',
    category: 'structure',
    grade: 9,
    time: '15-25 phút',
    points: 240,
    status: 'available',
    link: '/advanced-challenge/phi-kim-halogen',
    features: ['Tính chất của phi kim', 'Clo và hợp chất (HCl, NaCl, Ca(ClO)₂)', 'Tổng quan Br/ I/ F', 'Bài tập luyện tập'],
    prerequisite: {
      classId: 9,
      lessonId: 20
    }
  },
  // HIDROCACBON - Grade 9 (NEW)
  {
    id: 18,
    name: 'Hidrocacbon',
    description: 'Tìm hiểu về các hợp chất hidrocacbon: Metan, Etilen, Axetilen, Benzen, nhiên liệu (than, dầu mỏ, khí thiên nhiên) và luyện tập tổng hợp.',
    icon: '⛽',
    difficulty: 'Trung bình',
    difficultyLevel: 'medium',
    difficultyColor: 'bg-orange-500',
    category: 'structure',
    grade: 9,
    time: '15-25 phút',
    points: 100,
    status: 'available',
    link: '/advanced-challenge/hidrocacbon',
    features: ['Metan (CH₄)', 'Etilen (C₂H₄)', 'Axetilen (C₂H₂)', 'Benzen (C₆H₆)', 'Nhiên liệu hóa thạch', 'Bài tập luyện tập'],
    prerequisite: {
      classId: 9,
      lessonId: 26
    }
  },
  // HIDROCACBON - POLIME - Grade 9 (NEW)
  {
    id: 19,
    name: 'Hidrocacbon - Dẫn xuất & Polime',
    description: 'Mở rộng: ancol, axit axetic, este, glucozơ, saccarozơ, tinh bột, xenlulozơ và polime. Ôn tập dẫn xuất và ứng dụng vật liệu.',
    icon: '🧬',
    difficulty: 'Trung bình',
    difficultyLevel: 'medium',
    difficultyColor: 'bg-pink-500',
    category: 'structure',
    grade: 9,
    time: '15-30 phút',
    points: 120,
    status: 'available',
    link: '/advanced-challenge/hidrocacbon-polime',
    features: ['Ancol (Ethanol)', 'Axit axetic', 'Este', 'Glucozơ, Saccarozơ', 'Tinh bột & Xenlulozơ', 'Polime', 'Bài tập tổng hợp'],
    prerequisite: {
      classId: 9,
      lessonId: 26
    }
  },
  // TONG HOP - Grade 9 (NEW)
  {
    id: 20,
    name: 'Tổng Hợp Hóa Học 9',
    description: 'Kiểm tra kiến thức tổng hợp về Hóa học Vô cơ và Hữu cơ lớp 9. Vượt qua các thử thách để chứng tỏ bản lĩnh nhà hóa học trẻ!',
    icon: '🏆',
    difficulty: 'Khó',
    difficultyLevel: 'hard',
    difficultyColor: 'bg-red-500',
    category: 'structure',
    grade: 9,
    time: '20-30 phút',
    points: 300,
    status: 'available',
    link: '/advanced-challenge/tong-hop-lop-9',
    features: ['Tổng hợp Vô cơ', 'Tổng hợp Hữu cơ', 'Nhận biết chất', 'Thí nghiệm ảo'],
    prerequisite: {
      classId: 9,
      lessonId: 50
    }
  },
  // SOLUTION - Grade 10 (NEW)
  {
    id: 21,
    name: 'Chất Tan - Dung Môi',
    description: 'Khám phá khái niệm chất tan, dung môi qua thí nghiệm tương tác! Thử nghiệm độ tan của muối, đường, cát, iot trong nước và cồn.',
    icon: '💧',
    difficulty: 'Dễ',
    difficultyLevel: 'easy',
    difficultyColor: 'bg-green-500',
    category: 'solution',
    grade: 10,
    time: '10-15 phút',
    points: 180,
    status: 'available',
    link: '/advanced-challenge/bai06-chat-tan-dung-moi',
    features: ['12 thí nghiệm', 'Mô phỏng bình thí nghiệm', 'Hiệu ứng hòa tan thực tế', 'Học về dung môi phân cực'],
    prerequisite: {
      classId: 10,
      lessonId: 6
    }
  },
  // SOLUTION - ADVANCED - Grade 10 (NEW)
  {
    id: 22,
    name: 'Pha Chế Dung Dịch - Nâng Cao',
    description: 'Thử thách tổng hợp về nồng độ phần trăm, nồng độ mol, chuyển đổi, pha loãng và pha trộn! 20 câu hỏi nâng cao với mô phỏng thí nghiệm 3D.',
    icon: '⚗️',
    difficulty: 'Khó',
    difficultyLevel: 'hard',
    difficultyColor: 'bg-red-500',
    category: 'solution',
    grade: 10,
    time: '25-35 phút',
    points: 420,
    status: 'available',
    link: '/advanced-challenge/pha-che-dung-dich-nang-cao',
    features: ['20 thử thách', 'Nồng độ % & mol', 'Chuyển đổi C% ↔ CM', 'Pha loãng & trộn', 'Bài tập thực hành PTN'],
    prerequisite: {
      classId: 10,
      lessonId: 6
    }
  },
  // HALOGEN - Grade 10 (NEW)
  {
    id: 23,
    name: 'Nhóm Halogen (VIIA)',
    description: 'Tổng hợp kiến thức nhóm halogen: Flo, Clo, Brom, Iot — tính chất, phản ứng, ứng dụng và một số hợp chất quan trọng (HCl, NaCl, Ca(ClO)2).',
    icon: '🧪',
    difficulty: 'Trung bình',
    difficultyLevel: 'medium',
    difficultyColor: 'bg-indigo-500',
    category: 'structure',
    grade: 10,
    time: '15-25 phút',
    points: 260,
    status: 'available',
    link: '/advanced-challenge/nhom-halogen',
    features: ['Flo, Clo, Brom, Iot', 'Tính chất hoá học và vật lí', 'Ứng dụng: khử trùng, tẩy rửa, y tế', 'Hợp chất: HCl, NaCl, Ca(ClO)2'],
    prerequisite: {
      classId: 10,
      lessonId: 7
    }
  },
  // OXI - LƯU HUỲNH - Grade 10 (NEW)
  {
    id: 24,
    name: 'Oxi - Lưu Huỳnh',
    description: 'Tổng hợp kiến thức về oxi và lưu huỳnh: tính chất vật lý, phản ứng hóa học, hợp chất và thí nghiệm phòng lab.',
    icon: '🔥',
    difficulty: 'Trung bình',
    difficultyLevel: 'medium',
    difficultyColor: 'bg-yellow-500',
    category: 'structure',
    grade: 10,
    time: '15-25 phút',
    points: 300,
    status: 'available',
    link: '/advanced-challenge/oxi-luu-huynh',
    features: ['Tính chất O₂ và S', 'Phản ứng cháy, SO₂, H₂S, H₂SO₄', 'Thí nghiệm điều chế O₂', 'Bài tập tính toán'],
    prerequisite: {
      classId: 10,
      lessonId: 20
    }
  },

 

  // CÂN BẰNG PHẢN ỨNG NÂNG CAO - Grade 11
  {
    id: 26,
    name: 'Cân Bằng Phản Ứng Nâng Cao',
    description: 'Game cân bằng phương trình hóa học nâng cao với 4 loại phản ứng: Oxi hóa-khử, Axit-bazơ, Hữu cơ và Phức tạp. Phù hợp với kiến thức lớp 11.',
    icon: '⚖️',
    difficulty: 'Khó',
    difficultyLevel: 'hard',
    difficultyColor: 'bg-red-500',
    category: 'game',
    grade: 11,
    time: '20-30 phút',
    points: 400,
    status: 'available',
    link: '/advanced-challenge/can-bang-phan-ung-nang-cao',
    features: ['20+ phản ứng từ dễ đến khó', '4 loại phản ứng (Oxi hóa-khử, Axit-bazơ, Hữu cơ, Phức tạp)', 'Hệ thống điểm & combo streak', 'So sánh số nguyên tử trực quan', 'Gợi ý cho từng phản ứng'],
    prerequisite: {
      classId: 11,
      lessonId: 1
    }
  },

  // NITƠ - LƯU HUỲNH - Grade 11
  {
    id: 27,
    name: 'Nitơ - Lưu huỳnh',
    description: 'Thử thách tổng hợp về Nitơ và Lưu huỳnh: N₂, NH₃, HNO₃, S, H₂S, SO₂, H₂SO₄. Gồm 30 câu hỏi đa dạng từ lý thuyết đến tính toán.',
    icon: '⚗️',
    difficulty: 'Trung bình',
    difficultyLevel: 'medium',
    difficultyColor: 'bg-yellow-500',
    category: 'game',
    grade: 11,
    time: '25-35 phút',
    points: 350,
    status: 'available',
    link: '/advanced-challenge/nito-luu-huynh',
    features: ['30 câu hỏi tổng hợp', '4 chủ đề (N₂ & hợp chất, S & hợp chất, Phản ứng đặc trưng, Ứng dụng)', 'Chế độ thử thách có giới hạn thời gian', 'Nhiều dạng câu hỏi (trắc nghiệm, đúng/sai, điền từ, sắp xếp, ghép đôi)', 'Bài tập tính toán nâng cao'],
    prerequisite: {
      classId: 11,
      lessonId: 2
    }
  },
  
  // ĐẠI CƯƠNG HÓA HỮU CƠ - Grade 11
  {
    id: 28,
    name: 'Đại Cương Hóa Hữu Cơ',
    description: 'Khám phá thế giới hợp chất hữu cơ! Tìm hiểu về khái niệm, phân loại, cấu trúc phân tử và các loại phản ứng hữu cơ cơ bản.',
    icon: '🌿',
    difficulty: 'Trung bình',
    difficultyLevel: 'medium',
    difficultyColor: 'bg-green-500',
    category: 'structure',
    grade: 11,
    time: '15-20 phút',
    points: 250,
    status: 'available',
    link: '/advanced-challenge/dai-cuong-hoa-huu-co',
    features: ['Khái niệm & Phân loại', 'Cấu trúc phân tử', 'Phản ứng hữu cơ', 'Phân tích nguyên tố'],
    prerequisite: {
      classId: 11,
      lessonId: 3
    }
  },

  // HIDROCACBON - Grade 11
  {
    id: 29,
    name: 'Hidrocacbon',
    description: 'Khám phá thế giới hidrocacbon: Ankan, Anken, Ankin và Hidrocacbon thơm. Tìm hiểu tính chất, phản ứng và ứng dụng thực tế.',
    icon: '🔥',
    difficulty: 'Trung bình',
    difficultyLevel: 'medium',
    difficultyColor: 'bg-indigo-500',
    category: 'structure',
    grade: 11,
    time: '20-25 phút',
    points: 300,
    status: 'available',
    link: '/advanced-challenge/hidrocacbon-11',
    features: ['Ankan & Anken', 'Ankin & HC Thơm', 'Phản ứng đặc trưng', 'Nguồn hidrocacbon'],
    prerequisite: {
      classId: 11,
      lessonId: 4
    }
  },

  // DẪN XUẤT HALOGEN - ANCOL - PHENOL - Grade 11
  {
    id: 30,
    name: 'Dẫn xuất Halogen - Ancol - Phenol',
    description: 'Tìm hiểu về các hợp chất hữu cơ có nhóm chức: Dẫn xuất halogen, Ancol và Phenol. Tính chất, điều chế và ứng dụng.',
    icon: '🧪',
    difficulty: 'Trung bình',
    difficultyLevel: 'medium',
    difficultyColor: 'bg-cyan-500',
    category: 'structure',
    grade: 11,
    time: '20-25 phút',
    points: 320,
    status: 'available',
    link: '/advanced-challenge/dan-xuat-halogen-ancol-phenol',
    features: ['Dẫn xuất Halogen', 'Ancol (Rượu)', 'Phenol', 'Phản ứng & Nhận biết'],
    prerequisite: {
      classId: 11,
      lessonId: 5
    }
  },

  // HỢP CHẤT CARBONYL - CARBOXYLIC - Grade 11
  {
    id: 31,
    name: 'Hợp chất Carbonyl - Carboxylic',
    description: 'Khám phá Aldehit, Xeton và Axit Cacboxylic. Tìm hiểu cấu trúc, tính chất hóa học đặc trưng và ứng dụng trong đời sống.',
    icon: '⚗️',
    difficulty: 'Khó',
    difficultyLevel: 'hard',
    difficultyColor: 'bg-rose-500',
    category: 'structure',
    grade: 11,
    time: '25-30 phút',
    points: 350,
    status: 'available',
    link: '/advanced-challenge/hop-chat-carbonyl-carboxylic',
    features: ['Aldehit & Xeton', 'Axit Cacboxylic', 'Phản ứng tráng bạc', 'Phản ứng este hóa'],
    prerequisite: {
      classId: 11,
      lessonId: 6
    }
  },

  // HÓA HỌC VỚI CUỘC SỐNG - Grade 11
  {
    id: 32,
    name: 'Hóa học với Cuộc sống',
    description: 'Tìm hiểu vai trò của hóa học trong đời sống: Môi trường, Năng lượng, Vật liệu mới và Sức khỏe con người.',
    icon: '🌍',
    difficulty: 'Trung bình',
    difficultyLevel: 'medium',
    difficultyColor: 'bg-orange-500',
    category: 'structure',
    grade: 11,
    time: '20-25 phút',
    points: 300,
    status: 'available',
    link: '/advanced-challenge/hoa-hoc-voi-cuoc-song',
    features: ['Hóa học & Môi trường', 'Năng lượng & Nhiên liệu', 'Vật liệu mới', 'Hóa học & Sức khỏe'],
    prerequisite: {
      classId: 11,
      lessonId: 7
    }
  },

  // ESTE - LIPIT - Grade 12
  {
    id: 33,
    name: 'Este - Lipit',
    description: 'Khám phá thế giới hương thơm của Este và chất béo Lipit. Tìm hiểu cấu tạo, tính chất, phản ứng xà phòng hóa và ứng dụng.',
    icon: '🧪',
    difficulty: 'Trung bình',
    difficultyLevel: 'medium',
    difficultyColor: 'bg-pink-500',
    category: 'structure',
    grade: 12,
    time: '20-25 phút',
    points: 300,
    status: 'available',
    link: '/advanced-challenge/este-lipit',
    features: ['Este & Mùi hương', 'Lipit & Chất béo', 'Phản ứng xà phòng hóa', 'Chất giặt rửa'],
    prerequisite: {
      classId: 12,
      lessonId: 1
    }
  },

  // CACBOHIDRAT - Grade 12
  {
    id: 34,
    name: 'Cacbohidrat',
    description: 'Tìm hiểu về Glucozơ, Fructozơ, Saccarozơ, Tinh bột và Xenlulozơ. Cấu trúc phân tử, tính chất hóa học và vai trò sinh học.',
    icon: '🍬',
    difficulty: 'Trung bình',
    difficultyLevel: 'medium',
    difficultyColor: 'bg-orange-500',
    category: 'structure',
    grade: 12,
    time: '20-25 phút',
    points: 300,
    status: 'available',
    link: '/advanced-challenge/cacbohidrat',
    features: ['Monosaccarit', 'Disaccarit', 'Polisaccarit', 'Phản ứng tráng bạc'],
    prerequisite: {
      classId: 12,
      lessonId: 2
    }
  },

  // AMIN - AMINOAXIT - PROTEIN - Grade 12
  {
    id: 35,
    name: 'Amin - Aminoaxit - Protein',
    description: 'Nghiên cứu cơ sở của sự sống! Amin, Amino axit, Peptit và Protein. Tính chất lưỡng tính, phản ứng màu biure và cấu trúc protein.',
    icon: '🧬',
    difficulty: 'Khó',
    difficultyLevel: 'hard',
    difficultyColor: 'bg-purple-500',
    category: 'structure',
    grade: 12,
    time: '25-30 phút',
    points: 350,
    status: 'available',
    link: '/advanced-challenge/amin-aminoaxit-protein',
    features: ['Amin & Tính bazơ', 'Amino axit lưỡng tính', 'Peptit & Protein', 'Phản ứng màu đặc trưng'],
    prerequisite: {
      classId: 12,
      lessonId: 3
    }
  },

  // POLIME - Grade 12
  {
    id: 36,
    name: 'Polime & Vật liệu Polime',
    description: 'Thế giới vật liệu hiện đại: Chất dẻo, Tơ, Cao su và Keo dán. Phân loại, điều chế và ứng dụng của các loại polime.',
    icon: '🧶',
    difficulty: 'Trung bình',
    difficultyLevel: 'medium',
    difficultyColor: 'bg-blue-500',
    category: 'structure',
    grade: 12,
    time: '15-20 phút',
    points: 280,
    status: 'available',
    link: '/advanced-challenge/polime',
    features: ['Đại cương Polime', 'Chất dẻo & Compozit', 'Tơ & Cao su', 'Keo dán'],
    prerequisite: {
      classId: 12,
      lessonId: 4
    }
  },

  // ĐẠI CƯƠNG KIM LOẠI - Grade 12
  {
    id: 37,
    name: 'Đại cương Kim loại',
    description: 'Tổng quan về kim loại: Vị trí, cấu tạo, tính chất vật lý, tính chất hóa học, dãy điện hóa và sự ăn mòn kim loại.',
    icon: '🔩',
    difficulty: 'Trung bình',
    difficultyLevel: 'medium',
    difficultyColor: 'bg-gray-500',
    category: 'structure',
    grade: 12,
    time: '20-25 phút',
    points: 300,
    status: 'available',
    link: '/advanced-challenge/dai-cuong-kim-loai',
    features: ['Cấu tạo & Tính chất', 'Dãy điện hóa', 'Ăn mòn kim loại', 'Điều chế kim loại'],
    prerequisite: {
      classId: 12,
      lessonId: 5
    }
  },

  // SẮT - ĐỒNG - HỢP KIM - Grade 12
  {
    id: 38,
    name: 'Sắt - Đồng - Hợp kim',
    description: 'Tìm hiểu chi tiết về hai kim loại quan trọng nhất: Sắt (Fe) và Đồng (Cu), cùng các hợp kim của chúng như Gang, Thép.',
    icon: '🏗️',
    difficulty: 'Khó',
    difficultyLevel: 'hard',
    difficultyColor: 'bg-red-600',
    category: 'structure',
    grade: 12,
    time: '25-30 phút',
    points: 350,
    status: 'available',
    link: '/advanced-challenge/dai-cuong-sat-dong-hop-kim',
    features: ['Sắt & Hợp chất', 'Đồng & Hợp chất', 'Hợp kim (Gang, Thép)', 'Nhận biết ion'],
    prerequisite: {
      classId: 12,
      lessonId: 6
    }
  },

  // KIM LOẠI KIỀM - KIỀM THỔ - NHÔM - Grade 12
  {
    id: 39,
    name: 'Kim loại Kiềm - Kiềm thổ - Nhôm',
    description: 'Khám phá nhóm kim loại mạnh: Kiềm (IA), Kiềm thổ (IIA) và Nhôm (IIIA). Tính chất, ứng dụng và nước cứng.',
    icon: '⚡',
    difficulty: 'Khó',
    difficultyLevel: 'hard',
    difficultyColor: 'bg-indigo-600',
    category: 'structure',
    grade: 12,
    time: '25-30 phút',
    points: 350,
    status: 'available',
    link: '/advanced-challenge/kim-loai-kiem-kiem-tho-nhom',
    features: ['Kim loại Kiềm', 'Kim loại Kiềm thổ', 'Nhôm & Hợp chất', 'Nước cứng'],
    prerequisite: {
      classId: 12,
      lessonId: 7
    }
  },
    
  
];

async function seedDatabase() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('✗ MONGODB_URI environment variable is not set. Aborting seed.');
      process.exit(1);
    }
    await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('✓ Đã kết nối MongoDB');

    // Xóa dữ liệu cũ
    // Drop old unique indexes first to avoid conflicts during re-creation
    try {
      await mongoose.connection.collection('lessons').dropIndex('classId_1_lessonId_1');
      console.log('✓ Đã xóa index cũ: classId_1_lessonId_1');
    } catch (err) {}

    try {
      await mongoose.connection.collection('lessons').dropIndex('classId_1_curriculumType_1_lessonId_1');
      console.log('✓ Đã xóa index cũ: classId_1_curriculumType_1_lessonId_1');
    } catch (err) {}
    
    await Lesson.deleteMany({});
    console.log('✓ Đã xóa dữ liệu bài học cũ');

    // Combine all lessons from all classes (CHỈ INSERT 1 LẦN)
    // Class 8 lessons now organized by curriculum
    const class8Lessons = [
      ...(lessons8.ketnoi || []),
      ...(lessons8.canhdieu || []),
      ...(lessons8.chantroicangtao || [])
    ];

    const class9Lessons = Array.isArray(lessons9)
      ? lessons9
      : [
          ...(lessons9.ketnoi || []),
          ...(lessons9.canhdieu || []),
          ...(lessons9.chantroicangtao || [])
        ];

    const class10Lessons = Array.isArray(lessons10)
      ? lessons10
      : [
          ...(lessons10.ketnoi || []),
          ...(lessons10.canhdieu || []),
          ...(lessons10.chantroicangtao || [])
        ];

    const class11Lessons = Array.isArray(lessons11)
      ? lessons11
      : [
          ...(lessons11.ketnoi || []),
          ...(lessons11.canhdieu || []),
          ...(lessons11.chantroicangtao || [])
        ];

    const class12Lessons = Array.isArray(lessons12)
      ? lessons12
      : [
          ...(lessons12.ketnoi || []),
          ...(lessons12.canhdieu || []),
          ...(lessons12.chantroicangtao || [])
        ];
    
    const allLessons = [
      ...class8Lessons,
      ...class9Lessons,
      ...class10Lessons,
      ...class11Lessons,
      ...class12Lessons
    ];

    // Transform legacy structure to new modular structure (Coursera-like)
    const transformedLessons = allLessons.map(lesson => {
      // 1. Ensure game.quizzes exists for legacy code compatibility
      let allQuizzes = [];
      if (Array.isArray(lesson.game)) {
        allQuizzes = lesson.game.map(quiz => ({
          ...quiz,
          type: quiz.type || 'multiple-choice'
        }));
      } else if (lesson.game && typeof lesson.game === 'object') {
        allQuizzes = [
          ...(lesson.game.quizzes || []),
          ...(lesson.game.basic || []),
          ...(lesson.game.intermediate || []),
          ...(lesson.game.advanced || [])
        ].map(quiz => ({
          ...quiz,
          type: quiz.type || 'multiple-choice'
        }));
      }

      // 2. Create the modular structure if missing
      if (!lesson.modules || lesson.modules.length === 0) {
        let items = [];
        
        // Intelligently split theoryModules into separate items
        if (lesson.theoryModules && lesson.theoryModules.length > 0) {
          let currentItem = null;
          
          lesson.theoryModules.forEach((mod, idx) => {
            const isNewSection = mod.type === 'heading' || (mod.content && mod.content.title);
            
            if (isNewSection || !currentItem) {
              // Start a new item
              let title = 'Tiếp tục tìm hiểu';
              if (mod.type === 'heading') title = mod.content.text;
              else if (mod.content && mod.content.title) title = mod.content.title;
              else if (idx === 0) title = 'Mở đầu bài học';

              currentItem = {
                type: 'theory',
                title: title,
                theoryModules: [mod],
                duration: '3 min',
                section: mod.type === 'heading' ? 'Đề mục chính' : 'Nội dung chi tiết'
              };
              items.push(currentItem);
            } else {
              // Append to current item
              currentItem.theoryModules.push(mod);
            }
          });
        } else {
          // Fallback to single item if no theoryModules
          items.push({
            type: 'theory',
            title: lesson.title || 'Nội dung bài học',
            content: lesson.theory || lesson.content || '',
            theoryModules: [],
            duration: '15 min',
            section: 'Kiến thức trọng tâm'
          });
        }

        // If there's a videoUrl at the root, add it as a video item
        if (lesson.videoUrl) {
          items.unshift({
            type: 'video',
            title: 'Video giảng dạy',
            videoUrl: lesson.videoUrl,
            duration: '10 min',
            section: 'Học liệu'
          });
        }

        // Define Study items
        const studyItems = [...items];

        lesson.modules = [
          {
            title: 'I. Học phần: ' + (lesson.title || 'Kiến thức trọng tâm'),
            description: lesson.description || '',
            items: studyItems,
            quizzes: [] // No quiz in study module
          },
          {
            title: 'II. Thử thách tổng kết',
            description: 'Đánh giá lại toàn bộ kiến thức bài học.',
            items: [],
            quizzes: allQuizzes // All quizzes go to the final module
          }
        ];
      }

      // 3. Keep legacy game structure for backward compatibility with old quiz components
      if (!lesson.game || typeof lesson.game !== 'object' || !lesson.game.quizzes) {
        lesson.game = {
          quizzes: allQuizzes,
          basic: (lesson.game && lesson.game.basic) || allQuizzes.slice(0, 5),
          intermediate: (lesson.game && lesson.game.intermediate) || [],
          advanced: (lesson.game && lesson.game.advanced) || []
        };
      }

      return lesson;
    });

    // Deduplicate lessons by (classId, lessonId) to avoid bulk insert duplicate key errors
    const dedupMap = new Map();
    for (const ls of transformedLessons) {
      const key = `${ls.classId ?? 'x'}-${ls.lessonId ?? 'x'}`;
      if (!dedupMap.has(key)) dedupMap.set(key, ls);
    }
    const dedupedLessons = Array.from(dedupMap.values());
    console.log('• Lessons before dedupe:', transformedLessons.length, 'after dedupe:', dedupedLessons.length);
    // Use ordered:false so insertion continues when there are remaining non-duplicate issues
    await Lesson.insertMany(dedupedLessons, { ordered: false });
    console.log('✓ Đã thêm bài học:');
    console.log('  - Lớp 8:', class8Lessons.length, 'bài (', 
      (lessons8.ketnoi || []).length, 'Kết nối,',
      (lessons8.canhdieu || []).length, 'Cánh diều,',
      (lessons8.chantroicangtao || []).length, 'Chân trời)');
    console.log('  - Lớp 9:', class9Lessons.length, 'bài (',
      (lessons9.ketnoi || []).length, 'Kết nối,',
      (lessons9.canhdieu || []).length, 'Cánh diều,',
      (lessons9.chantroicangtao || []).length, 'Chân trời)');
    console.log('  - Lớp 10:', class10Lessons.length, 'bài (',
      (lessons10.ketnoi || []).length, 'Kết nối,',
      (lessons10.canhdieu || []).length, 'Cánh diều,',
      (lessons10.chantroicangtao || []).length, 'Chân trời)');
    console.log('  - Lớp 11:', class11Lessons.length, 'bài (',
      (lessons11.ketnoi || []).length, 'Kết nối,',
      (lessons11.canhdieu || []).length, 'Cánh diều,',
      (lessons11.chantroicangtao || []).length, 'Chân trời)');
    console.log('  - Lớp 12:', class12Lessons.length, 'bài (',
      (lessons12.ketnoi || []).length, 'Kết nối,',
      (lessons12.canhdieu || []).length, 'Cánh diều,',
      (lessons12.chantroicangtao || []).length, 'Chân trời)');
    console.log('✓ Tổng cộng:', allLessons.length, 'bài học');

    // Tạo index unique mới bao gồm curriculumType để ngăn chặn trùng lặp
    try {
      await mongoose.connection.collection('lessons').createIndex(
        { classId: 1, curriculumType: 1, lessonId: 1 },
        { unique: true, background: true, sparse: true }
      );
      console.log('✓ Đã tạo index unique cho (classId, curriculumType, lessonId)');
    } catch (idxErr) {
      console.warn('⚠️ Index unique đã tồn tại hoặc có lỗi:', idxErr.message);
    }

    // Seed challenges
    await Challenge.deleteMany({});
    console.log('✓ Đã xóa dữ liệu thử thách cũ');
    
    await Challenge.insertMany(challenges);
    console.log('✓ Đã thêm', challenges.length, 'thử thách');

    console.log('✓ Seed database thành công!');
    process.exit(0);
  } catch (error) {
    console.error('✗ Lỗi seed database:', error);
    process.exit(1);
  }
}

seedDatabase();
