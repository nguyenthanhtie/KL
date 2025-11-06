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
  {
    id: 1,
    name: 'Đoán Hình Bắt Chữ Hóa Học',
    description: 'Đoán tên chất hóa học dựa trên hình ảnh và gợi ý. Thử thách khả năng liên tưởng và kiến thức về các chất phổ biến.',
    icon: '🎯',
    difficulty: 'Dễ',
    difficultyColor: 'bg-green-500',
    time: '5-10 phút',
    points: 100,
    status: 'available',
    link: '/advanced-challenge/duoi-hinh',
    features: ['10 câu hỏi', 'Có gợi ý', 'Giới hạn thời gian', 'Điểm cao']
  },
  {
    id: 2,
    name: 'Ghép Nguyên Tử',
    description: 'Sắp xếp các electron vào đúng lớp vỏ nguyên tử. Thử thách hiểu biết về cấu trúc nguyên tử và phân bố electron.',
    icon: '⚛️',
    difficulty: 'Trung bình',
    difficultyColor: 'bg-yellow-500',
    time: '10-15 phút',
    points: 200,
    status: 'available',
    link: '/advanced-challenge/ghep-nguyen-tu',
    features: ['36 nguyên tố', 'Tương tác kéo thả', 'Hình ảnh 3D', '6 thử thách']
  },
  {
    id: 3,
    name: 'Cân Bằng Phương Trình',
    description: 'Cân bằng các phương trình hóa học bằng cách tìm hệ số thích hợp. Thử thách kỹ năng tính toán và logic.',
    icon: '⚖️',
    difficulty: 'Trung bình',
    difficultyColor: 'bg-yellow-500',
    time: '15-20 phút',
    points: 250,
    status: 'available',
    link: '/advanced-challenge/can-bang',
    features: ['8 phản ứng', 'Tính khối lượng mol', 'Kiểm tra tức thì', 'Độ khó tăng dần']
  },
  {
    id: 5,
    name: 'Suy Luận Phản Ứng',
    description: 'Dựa vào gợi ý để tìm các chất tham gia và sản phẩm của phản ứng. Thử thách tư duy logic và kiến thức tổng hợp.',
    icon: '🔬',
    difficulty: 'Khó',
    difficultyColor: 'bg-red-500',
    time: '20-30 phút',
    points: 300,
    status: 'available',
    link: '/advanced-challenge/suy-luan',
    features: ['8 màn chơi', 'Gợi ý chi tiết', 'Kéo thả chất', 'Kiểm tra phản ứng']
  },
  {
    id: 6,
    name: 'Nhận Biết Dung Dịch',
    description: 'Mô phỏng thí nghiệm thực tế! Nhỏ các thuốc thử vào dung dịch X, quan sát hiện tượng và đoán xem đó là ion gì.',
    icon: '💧',
    difficulty: 'Trung bình',
    difficultyColor: 'bg-blue-500',
    time: '15-20 phút',
    points: 250,
    status: 'available',
    link: '/advanced-challenge/nhan-biet-dung-dich',
    features: ['8 thí nghiệm', 'Mô phỏng phòng lab', 'Hiệu ứng thực tế', 'Nhiều vòng kiểm tra']
  },
  {
    id: 7,
    name: 'Xây Dựng Phân Tử',
    description: 'Kéo thả nguyên tử để xây dựng phân tử! Tạo liên kết đơn, đôi, ba giữa các nguyên tử để tạo thành phân tử hoàn chỉnh.',
    icon: '🧬',
    difficulty: 'Trung bình',
    difficultyColor: 'bg-indigo-500',
    time: '15-25 phút',
    points: 280,
    status: 'available',
    link: '/advanced-challenge/xay-dung-phan-tu',
    features: ['3 cấp độ', '12 phân tử', 'Tương tác kéo thả', 'Hỗ trợ liên kết đa dạng']
  },
  {
    id: 8,
    name: 'Ghép Thẻ Hóa Học',
    description: 'Tìm các cặp thẻ giống nhau về công thức hóa học. Rèn luyện trí nhớ và khả năng nhận diện công thức nhanh.',
    icon: '🃏',
    difficulty: 'Dễ',
    difficultyColor: 'bg-green-500',
    time: '5-8 phút',
    points: 150,
    status: 'coming-soon',
    features: ['Nhiều cấp độ', 'Tính khối lượng mol', 'Tăng độ khó', 'Thời gian giới hạn']
  },
  {
    id: 10,
    name: 'Pha Chế Dung Dịch',
    description: 'Học về nồng độ mol qua thí nghiệm tương tác! Điều chỉnh số mol và thể tích, giải các bài toán về pha loãng và trộn dung dịch.',
    icon: '⚗️',
    difficulty: 'Trung bình',
    difficultyColor: 'bg-cyan-500',
    time: '20-25 phút',
    points: 300,
    status: 'available',
    link: '/advanced-challenge/pha-che-dung-dich',
    features: ['12 thử thách', 'Mô phỏng bình thí nghiệm', '3 cấp độ', 'Công thức chi tiết']
  },
  {
    id: 11,
    name: 'Thử Thách Tổng Hợp',
    description: 'Kết hợp tất cả các kỹ năng: cân bằng, tính toán, nhận diện công thức. Dành cho người chơi xuất sắc!',
    icon: '🏆',
    difficulty: 'Rất khó',
    difficultyColor: 'bg-purple-600',
    time: '30-45 phút',
    points: 500,
    status: 'coming-soon',
    features: ['Nhiều dạng bài', 'Giới hạn thời gian', 'Bảng xếp hạng', 'Phần thưởng đặc biệt']
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
