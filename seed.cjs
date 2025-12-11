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
    name: 'CD — DUNG DỊCH',
    description: 'Ôn các khái niệm dung dịch: chất tan, dung môi, độ tan, nồng độ phần trăm, nồng độ mol, pha chế và pH. Bao gồm câu hỏi trắc nghiệm và thực hành pha chế.',
    icon: '💧',
    difficulty: 'Trung bình',
    difficultyLevel: 'medium',
    difficultyColor: 'bg-cyan-500',
    category: 'solution',
    grade: 10,
    time: '15-25 phút',
    points: 260,
    status: 'available',
    link: '/advanced-challenge/cd-dung-dich',
    features: ['Khái niệm cơ bản', 'Bài tập nồng độ %', 'Pha chế molarity', 'Mini-quiz tự chấm'],
    prerequisite: {
      classId: 10,
      lessonId: 6
    }
  },
  
    
  
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://2200002540_db_user:Luan123@dan-1211.epxn7qi.mongodb.net/chemlearn?retryWrites=true&w=majority');
    console.log('✓ Đã kết nối MongoDB');

    // Xóa dữ liệu cũ
    await Lesson.deleteMany({});
    console.log('✓ Đã xóa dữ liệu bài học cũ');

    // Combine all lessons from all classes (CHỈ INSERT 1 LẦN)
    // Class 8 lessons now organized by curriculum
    const class8Lessons = [
      ...(lessons8.ketnoi || []),
      ...(lessons8.canhdieu || []),
      ...(lessons8.chantroicangtao || [])
    ];
    
    const allLessons = [
      ...class8Lessons,
      ...lessons9,
      ...lessons10,
      ...lessons11,
      ...lessons12
    ];

    // Transform game structure from array to object with quizzes
    const transformedLessons = allLessons.map(lesson => {
      if (Array.isArray(lesson.game)) {
        // If game is an array, wrap it in quizzes property
        return {
          ...lesson,
          game: {
            quizzes: lesson.game
          }
        };
      }
      // If game is already an object (legacy structure with basic/intermediate/advanced)
      // keep it as is, or transform to quizzes if needed
      if (lesson.game && typeof lesson.game === 'object' && !lesson.game.quizzes) {
        const quizzes = [
          ...(lesson.game.basic || []),
          ...(lesson.game.intermediate || []),
          ...(lesson.game.advanced || [])
        ];
        return {
          ...lesson,
          game: {
            quizzes: quizzes.length > 0 ? quizzes : undefined,
            basic: lesson.game.basic,
            intermediate: lesson.game.intermediate,
            advanced: lesson.game.advanced
          }
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
    console.log('  - Lớp 9:', lessons9.length, 'bài');
    console.log('  - Lớp 10:', lessons10.length, 'bài');
    console.log('  - Lớp 11:', lessons11.length, 'bài');
    console.log('  - Lớp 12:', lessons12.length, 'bài');
    console.log('✓ Tổng cộng:', allLessons.length, 'bài học');

    // Tạo index unique để ngăn chặn trùng lặp trong tương lai
    try {
      await mongoose.connection.collection('lessons').createIndex(
        { classId: 1, lessonId: 1 },
        { unique: true, background: true }
      );
      console.log('✓ Đã tạo index unique cho (classId, lessonId)');
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
