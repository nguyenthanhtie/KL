const mongoose = require('mongoose');
const Lesson = require('./models/Lesson.cjs');
const lessons8 = require('./class8/index.cjs');
const lessons9 = require('./class9/index.cjs');
const lessons10 = require('./class10/index.cjs');
const lessons11 = require('./class11/index.cjs');
const lessons12 = require('./class12/index.cjs');
const Challenge = require('./models/Challenge.cjs');
const lessons = require('./class8/index.cjs');
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
    features: ['10 câu hỏi', 'Có gợi ý', 'Giới hạn thời gian', 'Điểm cao']
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
    features: ['10 thử thách', 'Mô phỏng nguyên tử', 'Vỏ electron', 'Học về đồng vị']
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
    features: ['36 nguyên tố', 'Tương tác kéo thả', 'Hình ảnh 3D', '6 thử thách']
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
    grade: 9,
    time: '15-20 phút',
    points: 220,
    status: 'available',
    link: '/advanced-challenge/phong-thi-nghiem',
    features: ['10 thí nghiệm', 'Mô phỏng phản ứng', 'Bọt khí thực tế', 'Kệ hóa chất']
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
    grade: 12,
    time: '15-20 phút',
    points: 250,
    status: 'available',
    link: '/advanced-challenge/nhan-biet-dung-dich',
    features: ['8 thí nghiệm', 'Mô phỏng phòng lab', 'Hiệu ứng thực tế', 'Nhiều vòng kiểm tra']
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
    features: ['3 cấp độ', '12 phân tử', 'Tương tác kéo thả', 'Hỗ trợ liên kết đa dạng']
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
    grade: 10,
    time: '20-25 phút',
    points: 300,
    status: 'available',
    link: '/advanced-challenge/pha-che-dung-dich',
    features: ['12 thử thách', 'Mô phỏng bình thí nghiệm', '3 cấp độ', 'Công thức chi tiết']
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
    features: ['8 phản ứng', 'Tính khối lượng mol', 'Kiểm tra tức thì', 'Độ khó tăng dần']
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
    grade: 11,
    time: '20-30 phút',
    points: 300,
    status: 'available',
    link: '/advanced-challenge/suy-luan',
    features: ['8 màn chơi', 'Gợi ý chi tiết', 'Kéo thả chất', 'Kiểm tra phản ứng']
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
    features: ['8 thử thách', 'Animation số oxi hóa', 'Giải thích chi tiết', 'Độ khó tăng dần']
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://2200002540_db_user:Luan123@dan-1211.epxn7qi.mongodb.net/chemlearn?retryWrites=true&w=majority');
    console.log('✓ Đã kết nối MongoDB');

    // Seed lessons
    await Lesson.deleteMany({});
    console.log('✓ Đã xóa dữ liệu cũ');

    // Combine all lessons from all classes
    const allLessons = [
      ...lessons8,
      ...lessons9,
      ...lessons10,
      ...lessons11,
      ...lessons12
    ];

    await Lesson.insertMany(allLessons);
    console.log('✓ Đã thêm bài học:');
    console.log('  - Lớp 8:', lessons8.length, 'bài');
    console.log('  - Lớp 9:', lessons9.length, 'bài');
    console.log('  - Lớp 10:', lessons10.length, 'bài');
    console.log('  - Lớp 11:', lessons11.length, 'bài');
    console.log('  - Lớp 12:', lessons12.length, 'bài');
    console.log('✓ Tổng cộng:', allLessons.length, 'bài học');
    console.log('✓ Đã xóa dữ liệu bài học cũ');

    await Lesson.insertMany(lessons);
    console.log('✓ Đã thêm', lessons.length, 'bài học Hóa 8');

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
