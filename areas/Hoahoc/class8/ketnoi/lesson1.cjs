// Bài mở đầu - Kết nối tri thức
module.exports = {
  classId: 8,
  curriculumType: 'ketnoi',
  chapterId: 0,
  chapterName: "Bài mở đầu",
  lessonId: 1,
  title: "Bài mở đầu: Sử dụng một số hóa chất, thiết bị cơ bản trong phòng thí nghiệm",
  description: "Giới thiệu về các hóa chất, thiết bị và kỹ thuật sử dụng trong phòng thí nghiệm",
  level: "Beginner",
  order: 1,
  theory: `
    <h2>🧪 Bài mở đầu: Sử dụng hóa chất và thiết bị trong phòng thí nghiệm</h2>
    
    <h3>I. Một số hóa chất thường dùng</h3>
    <div style="background: #f0f9ff; padding: 15px; border-left: 4px solid #0284c7; margin: 15px 0;">
      <h4>1. Axit</h4>
      <p>• <strong>Axit clohidric (HCl):</strong> Chất lỏng không màu, có mùi hắc</p>
      <p>• <strong>Axit sunfuric (H₂SO₄):</strong> Chất lỏng sánh, không màu</p>
      <p>• <strong>Lưu ý:</strong> Không được chạm trực tiếp vào axit</p>
    </div>

    <div style="background: #dcfce7; padding: 15px; border-left: 4px solid #16a34a; margin: 15px 0;">
      <h4>2. Bazơ</h4>
      <p>• <strong>Natri hidroxit (NaOH):</strong> Chất rắn màu trắng</p>
      <p>• <strong>Canxi hidroxit (Ca(OH)₂):</strong> Bột trắng, ít tan trong nước</p>
    </div>

    <h3>II. Thiết bị phòng thí nghiệm</h3>
    <ul>
      <li>🧪 <strong>Ống nghiệm:</strong> Dùng để chứa và pha trộn hóa chất</li>
      <li>🔬 <strong>Kính hiển vi:</strong> Quan sát các mẫu vật nhỏ</li>
      <li>⚖️ <strong>Cân phân tích:</strong> Cân chính xác khối lượng chất</li>
      <li>🌡️ <strong>Nhiệt kế:</strong> Đo nhiệt độ</li>
      <li>🔥 <strong>Đèn cồn:</strong> Nguồn nhiệt trong thí nghiệm</li>
    </ul>

    <h3>III. Quy tắc an toàn</h3>
    <div style="background: #fef2f2; padding: 15px; border-left: 4px solid #dc2626; margin: 15px 0;">
      <p>⚠️ <strong>Luôn đeo kính bảo hộ và áo blouse</strong></p>
      <p>⚠️ <strong>Không nếm, ngửi trực tiếp hóa chất</strong></p>
      <p>⚠️ <strong>Rửa tay sau khi làm thí nghiệm</strong></p>
      <p>⚠️ <strong>Báo cáo ngay khi có sự cố</strong></p>
    </div>
  `,
  game: [
    {
      type: "multiple-choice",
      question: "Thiết bị nào dùng để đo chính xác khối lượng chất?",
      options: [
        "Ống nghiệm",
        "Cân phân tích",
        "Nhiệt kế",
        "Đèn cồn"
      ],
      correctAnswer: 1,
      explanation: "✅ Cân phân tích được dùng để cân chính xác khối lượng chất.",
      points: 10
    },
    {
      type: "true-false",
      question: "Có thể nếm hóa chất để kiểm tra tính chất của chúng.",
      correctAnswer: false,
      explanation: "✅ Sai! Tuyệt đối không được nếm hóa chất vì có thể gây nguy hiểm.",
      points: 10
    },
    {
      type: "multiple-choice",
      question: "Công thức hóa học của natri hidroxit là gì?",
      options: [
        "NaCl",
        "NaOH",
        "Na₂CO₃",
        "NaHCO₃"
      ],
      correctAnswer: 1,
      explanation: "✅ Natri hidroxit có công thức hóa học là NaOH.",
      points: 10
    }
  ]
};
