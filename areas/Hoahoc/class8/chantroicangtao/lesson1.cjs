// Bài mở đầu - Chân trời sáng tạo
module.exports = {
  classId: 8,
  curriculumType: 'chantroicangtao',
  chapterId: 0,
  chapterName: "Bài mở đầu",
  lessonId: 1,
  title: "Bài mở đầu: Hóa học - Khoa học về chất",
  description: "Làm quen với Hóa học và phương pháp nghiên cứu",
  level: "Beginner",
  order: 1,
  theory: `
    <h2>🧪 Bài mở đầu: Hóa học - Khoa học về chất</h2>
    
    <h3>I. Hóa học trong cuộc sống</h3>
    <div style="background: #f0f9ff; padding: 15px; border-left: 4px solid #0284c7; margin: 15px 0;">
      <p>🌍 <strong>Hóa học ở khắp mọi nơi:</strong></p>
      <p>• Không khí chúng ta hít thở</p>
      <p>• Thức ăn chúng ta sử dụng</p>
      <p>• Quần áo chúng ta mặc</p>
      <p>• Thuốc men chữa bệnh</p>
    </div>

    <h3>II. Phương pháp nghiên cứu Hóa học</h3>
    <div style="background: #dcfce7; padding: 15px; border-left: 4px solid #16a34a; margin: 15px 0;">
      <h4>1️⃣ Quan sát</h4>
      <p>Sử dụng các giác quan để nhận biết hiện tượng</p>
      
      <h4>2️⃣ Thí nghiệm</h4>
      <p>Tạo ra các điều kiện để nghiên cứu chất và phản ứng</p>
      
      <h4>3️⃣ Đo đạc và tính toán</h4>
      <p>Sử dụng công cụ đo lường để thu thập dữ liệu chính xác</p>
      
      <h4>4️⃣ Kết luận</h4>
      <p>Rút ra các quy luật từ kết quả nghiên cứu</p>
    </div>

    <h3>III. Kỹ năng cần thiết</h3>
    <ul>
      <li>🔬 <strong>Quan sát:</strong> Nhìn kỹ các hiện tượng</li>
      <li>📝 <strong>Ghi chép:</strong> Lưu lại kết quả thí nghiệm</li>
      <li>🧮 <strong>Tính toán:</strong> Xử lý số liệu chính xác</li>
      <li>💡 <strong>Sáng tạo:</strong> Đưa ra ý tưởng mới</li>
    </ul>

    <h3>IV. An toàn phòng thí nghiệm</h3>
    <div style="background: #fef2f2; padding: 15px; border-left: 4px solid #dc2626; margin: 15px 0;">
      <p>⚠️ <strong>5 nguyên tắc vàng:</strong></p>
      <p>1. Đeo đủ đồ bảo hộ</p>
      <p>2. Đọc kỹ hướng dẫn trước khi làm</p>
      <p>3. Không ăn uống trong phòng thí nghiệm</p>
      <p>4. Xử lý hóa chất đúng cách</p>
      <p>5. Báo cáo ngay khi có sự cố</p>
    </div>
  `,
  game: [
    {
      type: "multiple-choice",
      question: "Phương pháp nghiên cứu Hóa học bao gồm các bước nào?",
      options: [
        "Chỉ cần quan sát",
        "Quan sát, thí nghiệm, đo đạc, kết luận",
        "Chỉ cần tính toán",
        "Chỉ cần đọc sách"
      ],
      correctAnswer: 1,
      explanation: "✅ Phương pháp nghiên cứu Hóa học gồm: quan sát, thí nghiệm, đo đạc và kết luận.",
      points: 10
    },
    {
      type: "true-false",
      question: "Có thể ăn uống trong phòng thí nghiệm hóa học.",
      correctAnswer: false,
      explanation: "✅ Sai! Tuyệt đối không được ăn uống trong phòng thí nghiệm.",
      points: 10
    },
    {
      type: "multiple-choice",
      question: "Kỹ năng nào KHÔNG cần thiết khi học Hóa học?",
      options: [
        "Quan sát",
        "Ghi chép",
        "Chơi game",
        "Tính toán"
      ],
      correctAnswer: 2,
      explanation: "✅ Chơi game không phải kỹ năng cần thiết trong học Hóa học.",
      points: 10
    }
  ]
};
