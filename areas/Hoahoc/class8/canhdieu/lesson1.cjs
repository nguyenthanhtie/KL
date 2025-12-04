// Bài mở đầu - Cánh diều
module.exports = {
  classId: 8,
  curriculumType: 'canhdieu',
  chapterId: 0,
  chapterName: "Bài mở đầu",
  lessonId: 1,
  title: "Bài mở đầu: Khám phá thế giới Hóa học",
  description: "Giới thiệu về môn Hóa học và ứng dụng trong đời sống",
  level: "Beginner",
  order: 1,
  theory: `
    <h2>🧪 Bài mở đầu: Khám phá thế giới Hóa học</h2>
    
    <h3>I. Hóa học là gì?</h3>
    <div style="background: #f0f9ff; padding: 15px; border-left: 4px solid #0284c7; margin: 15px 0;">
      <p><strong>Hóa học</strong> là khoa học nghiên cứu về:</p>
      <p>• Thành phần, cấu tạo của các chất</p>
      <p>• Tính chất của các chất</p>
      <p>• Sự biến đổi của các chất thành chất khác</p>
    </div>

    <h3>II. Vai trò của Hóa học</h3>
    <div style="background: #dcfce7; padding: 15px; border-left: 4px solid #16a34a; margin: 15px 0;">
      <h4>🏥 Y học và sức khỏe</h4>
      <p>• Sản xuất thuốc chữa bệnh</p>
      <p>• Chế tạo vật liệu y tế</p>
      
      <h4>🌾 Nông nghiệp</h4>
      <p>• Sản xuất phân bón</p>
      <p>• Chế tạo thuốc bảo vệ thực vật</p>
      
      <h4>🏭 Công nghiệp</h4>
      <p>• Sản xuất vật liệu mới</p>
      <p>• Chế biến năng lượng</p>
    </div>

    <h3>III. An toàn trong học Hóa học</h3>
    <div style="background: #fef2f2; padding: 15px; border-left: 4px solid #dc2626; margin: 15px 0;">
      <p>⚠️ Đeo đồ bảo hộ khi làm thí nghiệm</p>
      <p>⚠️ Không tự ý trộn lẫn hóa chất</p>
      <p>⚠️ Tuân thủ hướng dẫn của giáo viên</p>
      <p>⚠️ Giữ gìn vệ sinh phòng thí nghiệm</p>
    </div>
  `,
  game: [
    {
      type: "multiple-choice",
      question: "Hóa học nghiên cứu về điều gì?",
      options: [
        "Chỉ nghiên cứu về kim loại",
        "Thành phần, cấu tạo và tính chất của chất",
        "Chỉ nghiên cứu về nước",
        "Chỉ nghiên cứu về không khí"
      ],
      correctAnswer: 1,
      explanation: "✅ Hóa học nghiên cứu về thành phần, cấu tạo, tính chất và sự biến đổi của các chất.",
      points: 10
    },
    {
      type: "true-false",
      question: "Hóa học chỉ có ứng dụng trong y học.",
      correctAnswer: false,
      explanation: "✅ Sai! Hóa học có ứng dụng rộng rãi trong nhiều lĩnh vực: y học, nông nghiệp, công nghiệp...",
      points: 10
    },
    {
      type: "multiple-choice",
      question: "Khi làm thí nghiệm hóa học, điều quan trọng nhất là gì?",
      options: [
        "Làm nhanh cho xong",
        "Tuân thủ quy tắc an toàn",
        "Không cần đeo bảo hộ",
        "Có thể trộn tùy ý hóa chất"
      ],
      correctAnswer: 1,
      explanation: "✅ Tuân thủ quy tắc an toàn là điều quan trọng nhất khi làm thí nghiệm.",
      points: 10
    }
  ]
};
