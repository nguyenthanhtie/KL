module.exports = {
  classId: 9,
  curriculumType: 'ketnoi',
  chapterId: 9,
  chapterName: 'Chương 9: Lipid. Carbohydrate. Protein. Polymer',
  lessonId: 30,
  title: 'Bài 30: Tinh bột và xenlulozơ',
  description: 'Cấu trúc, tính chất và vai trò của tinh bột và xenlulozơ.',
  level: 'Beginner',
  order: 13,
  theory: `
    <h2>🌾 Tinh bột và xenlulozơ</h2>
    <ul>
      <li><strong>Tinh bột:</strong> polyme của glucose (amilozo + amilopectin); tan trong nước nóng tạo hồ tinh bột; bị thuỷ phân thành đường đơn.</li>
      <li><strong>Xenlulozơ:</strong> polyme dạng đường thẳng (beta-glucose); không tan nước; cấu tạo thành tế bào thực vật.</li>
      <li><strong>Phản ứng:</strong> thử iod (I2/KI) → màu xanh dương với tinh bột; thuỷ phân với enzyme/axit loãng → glucose.</li>
      <li><strong>Ứng dụng:</strong> thực phẩm, giấy dệt, vải sợi, phim sinh học, chất xốp.</li>
    </ul>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Tinh bột tan tốt trong điều kiện nào?',
      options: ['Nước lạnh', 'Nước nóng tạo hồ tinh bột', 'Dung môi hữu cơ', 'Không tan'],
      correctAnswer: 1,
      explanation: 'Nước nóng làm hồ tinh bột.'
    },
    {
      type: 'true-false',
      question: 'Xenlulozơ có cấu trúc mạch thẳng và không tan nước.',
      correctAnswer: true,
      explanation: 'Đúng, tạo độ bền cho thành tế bào.'
    },
    {
      type: 'multiple-choice',
      question: 'Thử iod (I2/KI) nhuộm màu xanh dương với:',
      options: ['Xenlulozơ', 'Tinh bột', 'Saccharose', 'Glycerol'],
      correctAnswer: 1,
      explanation: 'Tinh bột cho màu xanh dương đặc trưng.'
    },
    {
      type: 'fill-in-blank',
      question: 'Thuỷ phân tinh bột với enzyme → ___ (đường đơn)',
      correctAnswer: 'glucose',
      explanation: 'Thuỷ phân hoàn toàn cho glucose.'
    },
    {
      type: 'multiple-choice',
      question: 'Ứng dụng chính của xenlulozơ:',
      options: ['Nhiên liệu', 'Trang sức', 'Sản xuất giấy, sợi', 'Thuốc sát trùng'],
      correctAnswer: 2,
      explanation: 'Xenlulozơ là nguyên liệu giấy, sợi, vật liệu sinh học.'
    },
    {
      type: 'multiple-choice',
      question: 'Tinh bột gồm hai thành phần chính:',
      options: ['Amilozo và amilopectin', 'Glucozo và fructozo', 'Xenlulozơ và amilozo', 'Saccarozơ và xenlulozơ'],
      correctAnswer: 0,
      explanation: 'Tinh bột gồm amilozo (mạch thẳng) và amilopectin (phân nhánh).' 
    },
    {
      type: 'true-false',
      question: 'Xenlulozơ có cấu trúc beta-glucose liên kết 1,4-glycosid.',
      correctAnswer: true,
      explanation: 'Đúng, liên kết beta-1,4 tạo sợi bền.'
    },
    {
      type: 'fill-in-blank',
      question: 'Thử iod cho màu ___ với tinh bột.',
      correctAnswer: 'xanh dương',
      explanation: 'Dung dịch iod nhuộm tinh bột màu xanh dương đặc trưng.'
    },
    {
      type: 'multiple-choice',
      question: 'Sản phẩm thuỷ phân hoàn toàn xenlulozơ là:',
      options: ['Saccarozơ', 'Tinh bột', 'Glucozo', 'Fructozo'],
      correctAnswer: 2,
      explanation: 'Xenlulozơ thuỷ phân → glucose.'
    },
    {
      type: 'multiple-choice',
      question: 'Công dụng nào sau không phải của tinh bột?',
      options: ['Nguồn năng lượng trong thực phẩm', 'Sản xuất giấy cao cấp', 'Sản xuất đường glucose', 'Tạo hồ bao quát'],
      correctAnswer: 1,
      explanation: 'Giấy từ xenlulozơ; tinh bột dùng trong thực phẩm và chuyển đổi đường.'
    }
  ]
};
