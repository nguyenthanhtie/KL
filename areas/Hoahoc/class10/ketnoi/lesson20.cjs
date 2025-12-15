module.exports = {
  classId: 10,
  curriculumType: 'ketnoi',
  chapterId: 6,
  chapterName: 'Chương 6: Tốc độ phản ứng',
  lessonId: 20,
  title: 'Bài 20: Ôn tập chương 6',
  description: 'Ôn chương 6: công thức tốc độ, yếu tố ảnh hưởng, vai trò xúc tác và va chạm hiệu quả.',
  level: 'Intermediate',
  order: 2,
  theory: `
    <h2>Ôn tập chương 6</h2>
    <h3>Nhắc nhanh công thức</h3>
    <ul>
      <li>v = ΔC/Δt; tính theo chất phản ứng (dấu âm) hay sản phẩm (dấu dương) đều được nếu thống nhất.</li>
    </ul>
    <h3>Yếu tố tăng tốc độ</h3>
    <ul>
      <li>Tăng nồng độ/áp suất khí, tăng T, tăng diện tích bề mặt, khuấy trộn.</li>
      <li>Thêm xúc tác: hạ Ea, không làm thay đổi hằng số cân bằng.</li>
    </ul>
    <h3>Gợi ý vận dụng</h3>
    <ul>
      <li>So sánh hai điều kiện: điều kiện nào tạo nhiều va chạm đủ Ea hơn → tốc độ lớn hơn.</li>
      <li>Nhận biết ảnh hưởng mạch nhánh vs mạch thẳng (mạch thẳng có diện tích tiếp xúc lớn hơn nếu cùng công thức phân tử ở pha lỏng).</li>
    </ul>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Chất xúc tác làm gì với năng lượng hoạt hóa?',
      options: ['Tăng Ea', 'Không đổi Ea', 'Giảm Ea', 'Loại bỏ Ea'],
      correctAnswer: 2,
      explanation: 'Xúc tác hạ Ea bằng cách tạo cơ chế phản ứng khác.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Yếu tố nào không làm thay đổi tốc độ phản ứng khí?',
      options: ['Áp suất', 'Nhiệt độ', 'Khối lượng mol', 'Xúc tác'],
      correctAnswer: 2,
      explanation: 'Khối lượng mol không phải yếu tố động học trực tiếp.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Tăng nhiệt độ thường làm tốc độ phản ứng tăng.',
      correctAnswer: true,
      explanation: 'T tăng → nhiều va chạm đủ Ea hơn.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Tốc độ phản ứng được tính bằng:',
      options: ['Δt/ΔC', 'ΔC/Δt', 'C·t', 'C/t^2'],
      correctAnswer: 1,
      explanation: 'v = ΔC/Δt.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Trong pha khí, giảm thể tích bình phản ứng sẽ:',
      options: ['Giảm tốc độ', 'Không đổi tốc độ', 'Tăng tốc độ do áp suất tăng', 'Chỉ ảnh hưởng cân bằng'],
      correctAnswer: 2,
      explanation: 'Áp suất/nồng độ tăng → nhiều va chạm hơn.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Yếu tố nào giúp tăng số va chạm hiệu quả?',
      options: ['Giảm nồng độ', 'Tăng nhiệt độ, khuấy trộn', 'Thêm sản phẩm', 'Giảm diện tích tiếp xúc'],
      correctAnswer: 1,
      explanation: 'Tăng T, khuấy trộn làm phân tử năng động và gặp nhau hiệu quả hơn.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Xúc tác bị tiêu hao hoàn toàn sau phản ứng.',
      correctAnswer: false,
      explanation: 'Xúc tác tham gia rồi tái sinh sau chu kỳ.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Trong phản ứng dị thể (rắn - khí), yếu tố quan trọng là:',
      options: ['Áp suất khí không ảnh hưởng', 'Diện tích bề mặt rắn', 'Khối lượng mol khí', 'Màu sắc chất rắn'],
      correctAnswer: 1,
      explanation: 'Bề mặt lớn → nhiều vị trí hấp phụ, tăng tốc độ.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Tại sao mạch thẳng có thể sôi cao hơn mạch nhánh (cùng CTPT)?',
      options: ['Mạch thẳng nhẹ hơn', 'Mạch thẳng có lực London lớn hơn do diện tích tiếp xúc lớn', 'Mạch nhánh không có liên kết', 'Do liên kết ion'],
      correctAnswer: 1,
      explanation: 'Diện tích tiếp xúc lớn → lực van der Waals lớn → sôi cao.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Tốc độ phản ứng phụ thuộc vào số va chạm đủ năng lượng và đúng hướng.',
      correctAnswer: true,
      explanation: 'Theo thuyết va chạm.',
      points: 10
    }
  ]
};
