module.exports = {
  classId: 10,
  curriculumType: 'ketnoi',
  chapterId: 6,
  chapterName: 'Chương 6: Tốc độ phản ứng',
  lessonId: 19,
  title: 'Bài 19: Tốc độ phản ứng',
  description: 'Tốc độ phản ứng, biểu thức v = ΔC/Δt, yếu tố chi phối, thuyết va chạm và Ea.',
  level: 'Intermediate',
  order: 1,
  theory: `
    <h2>Tốc độ phản ứng</h2>
    <h3>Khái niệm</h3>
    <ul>
      <li>v = ΔC/Δt: ΔC là độ giảm nồng độ chất phản ứng hoặc tăng nồng độ sản phẩm.</li>
      <li>Đơn vị thường gặp: mol·L^{-1}·s^{-1}.</li>
    </ul>
    <h3>Yếu tố ảnh hưởng</h3>
    <ul>
      <li>Nồng độ/áp suất (khí): cao → va chạm nhiều → v tăng.</li>
      <li>Nhiệt độ: tăng T → nhiều phân tử đạt Ea → v tăng (quy tắc Van’t Hoff gần đúng).</li>
      <li>Diện tích tiếp xúc (rắn): nghiền nhỏ, khuấy trộn → v tăng.</li>
      <li>Xúc tác: hạ Ea, mở cơ chế mới; không thay đổi cân bằng nhưng đạt cân bằng nhanh hơn.</li>
    </ul>
    <h3>Thuyết va chạm</h3>
    <ul>
      <li>Phản ứng xảy ra khi va chạm đủ năng lượng (≥ Ea) và đúng định hướng.</li>
      <li>Năng lượng hoạt hóa (Ea) là rào cản; càng thấp → phản ứng càng nhanh.</li>
    </ul>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Yếu tố nào thường làm tăng tốc độ phản ứng?',
      options: ['Giảm nhiệt độ', 'Giảm nồng độ', 'Thêm xúc tác', 'Giảm áp suất khí'],
      correctAnswer: 2,
      explanation: 'Xúc tác hạ Ea, tăng số va chạm hiệu quả → tăng tốc độ.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Năng lượng hoạt hóa là?',
      options: [
        'Năng lượng giải phóng khi phản ứng xảy ra',
        'Năng lượng tối thiểu để phản ứng diễn ra',
        'Năng lượng liên kết của sản phẩm',
        'Năng lượng của xúc tác'
      ],
      correctAnswer: 1,
      explanation: 'Ea là rào cản năng lượng cần vượt qua để phản ứng xảy ra.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Tăng diện tích bề mặt rắn làm giảm tốc độ phản ứng.',
      correctAnswer: false,
      explanation: 'Tăng diện tích tiếp xúc → va chạm nhiều hơn → tốc độ tăng.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Công thức tốc độ trung bình v = ΔC/Δt, ΔC có thể lấy theo:',
      options: ['Độ tăng sản phẩm hoặc độ giảm chất phản ứng', 'Chỉ sản phẩm', 'Chỉ chất phản ứng', 'Khối lượng riêng'],
      correctAnswer: 0,
      explanation: 'Có thể dùng biến thiên nồng độ của chất phản ứng hoặc sản phẩm.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Tăng 10°C làm tốc độ tăng xấp xỉ 2–4 lần (quy tắc Van’t Hoff). Đây là do:',
      options: ['Nồng độ tăng', 'Nhiệt độ tăng làm nhiều phân tử vượt Ea', 'Ea giảm', 'Áp suất giảm'],
      correctAnswer: 1,
      explanation: 'T tăng → phân bố Maxwell dịch chuyển → nhiều va chạm đủ Ea.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Xúc tác làm thay đổi hằng số cân bằng của phản ứng.',
      correctAnswer: false,
      explanation: 'Xúc tác chỉ làm phản ứng đạt cân bằng nhanh hơn, không đổi K.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Trong phản ứng khí, tăng áp suất tương đương:',
      options: ['Giảm nồng độ', 'Tăng nồng độ', 'Giảm nhiệt độ', 'Tăng Ea'],
      correctAnswer: 1,
      explanation: 'Áp suất cao → mật độ phân tử cao → nhiều va chạm.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Yếu tố nào KHÔNG làm tăng tốc độ phản ứng?',
      options: ['Giảm nhiệt độ', 'Nghiền nhỏ chất rắn', 'Khuấy trộn dung dịch', 'Thêm xúc tác'],
      correctAnswer: 0,
      explanation: 'Giảm T giảm năng lượng va chạm → tốc độ giảm.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Cơ chế phản ứng nhiều bước có thể bị chi phối bởi bước chậm nhất.',
      correctAnswer: true,
      explanation: 'Bước chậm là bước quyết định tốc độ (rate-determining step).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Khi tăng diện tích bề mặt kim loại trong phản ứng với axit, tốc độ tăng vì:',
      options: ['Nhiệt độ tăng', 'Có nhiều tâm va chạm hơn', 'Ea giảm về 0', 'Áp suất giảm'],
      correctAnswer: 1,
      explanation: 'Bề mặt lớn tạo nhiều vị trí va chạm hiệu quả hơn.',
      points: 10
    }
  ]
};
