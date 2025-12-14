// Bài mở đầu - Kết nối tri thức
module.exports = {
  classId: 8,
  curriculumType: 'ketnoi',
  chapterId: 1,
  chapterName: "Chương mở đầu",
  lessonId: 1,
  title: "Bài 1: Sử dụng một số hóa chất, thiết bị cơ bản trong phòng thí nghiệm",
  description: "Giới thiệu hóa chất, dụng cụ, an toàn phòng thí nghiệm cho chương Phản ứng hóa học",
  level: "Beginner",
  order: 1,
  theory: `
    <h2>🧪 Bài mở đầu: Sử dụng hóa chất và thiết bị trong phòng thí nghiệm</h2>
    <p style="margin:12px 0; color:#334155;">Mục tiêu: nhận diện nhanh hóa chất cơ bản, nắm dụng cụ cốt lõi, và thực hành an toàn tức thì.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); margin:16px 0;">
      <div style="padding:14px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 8px; color:#0f172a;">Hóa chất thường gặp</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li><strong>HCl:</strong> lỏng, mùi hắc; ăn mòn mạnh.</li>
          <li><strong>H₂SO₄:</strong> lỏng sánh; thêm axit vào nước khi pha loãng.</li>
          <li><strong>NaOH, Ca(OH)₂:</strong> bazơ ăn da; bảo quản kín, tránh ẩm.</li>
        </ul>
      </div>
      <div style="padding:14px; border:1px solid #e2e8f0; border-radius:10px; background:#f0fdf4;">
        <h4 style="margin:0 0 8px; color:#14532d;">Dụng cụ cốt lõi</h4>
        <ul style="margin:0; padding-left:18px; color:#166534;">
          <li>Ống nghiệm, giá ống nghiệm: phản ứng nhỏ.</li>
          <li>Cốc thủy tinh, ống đong: chứa, đo thể tích gần đúng.</li>
          <li>Pipet/ống nhỏ giọt: lấy thể tích nhỏ chính xác.</li>
          <li>Cân phân tích: đo khối lượng chuẩn.</li>
          <li>Đèn cồn, kẹp gỗ: đun nóng an toàn.</li>
        </ul>
      </div>
    </div>

    <div style="margin:18px 0; padding:14px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc);">
      <h3 style="margin:0 0 10px; color:#312e81;">Sơ đồ thao tác an toàn nhanh</h3>
      <ol style="margin:0; padding-left:18px; color:#334155;">
        <li>Chuẩn bị: áo blouse, kính, găng; kiểm tra dụng cụ sạch, khô.</li>
        <li>Cân/đong: hiệu chỉnh cân về 0; lót giấy/boat; đo thể tích bằng ống đong ở tầm mắt.</li>
        <li>Pha chế: luôn rót <strong>axit vào nước</strong> từ từ, khuấy nhẹ.</li>
        <li>Đun nóng: hướng miệng ống nghiệm ra xa, kẹp và lắc nhẹ.</li>
        <li>Xử lý sự cố: rửa ngay bằng nước nhiều phút nếu dính da/mắt; báo giáo viên.</li>
      </ol>
    </div>

    <div style="margin:18px 0; display:grid; gap:14px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr));">
      <div style="padding:14px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
        <h4 style="margin:0 0 8px; color:#9a3412;">An toàn tức thì</h4>
        <ul style="margin:0; padding-left:18px; color:#7c2d12;">
          <li>Không nếm, không ngửi trực tiếp; dùng tay quạt nhẹ hơi.</li>
          <li>Không đổ hóa chất thừa về chai gốc.</li>
          <li>Không để gần nguồn lửa khi dùng dung môi dễ bay hơi.</li>
          <li>Rửa tay sau khi thao tác; thu gom rác hóa chất đúng nơi.</li>
        </ul>
      </div>
      <div style="padding:14px; border:1px solid #e2e8f0; border-radius:10px; background:#eff6ff;">
        <h4 style="margin:0 0 8px; color:#1d4ed8;">Mẹo ghi nhớ nhanh</h4>
        <ul style="margin:0; padding-left:18px; color:#1e3a8a;">
          <li><strong>A vào N</strong>: Axit vào Nước.</li>
          <li><strong>3 kiểm tra</strong>: cân về 0, ống đong ngang mắt, kẹp chắc trước khi đun.</li>
          <li><strong>3 tránh</strong>: tránh hít mạnh, tránh quay miệng ống vào người, tránh để tràn hóa chất.</li>
        </ul>
      </div>
    </div>

    <div style="margin:18px 0; padding:14px; border:1px solid #e2e8f0; border-radius:10px; background:#f0f9ff;">
      <h3 style="margin:0 0 10px; color:#0f172a;">Mini quiz đọc nhanh</h3>
      <ul style="margin:0; padding-left:18px; color:#334155;">
        <li>Khi pha loãng H₂SO₄ đặc, rót theo chiều nào?</li>
        <li>Thiết bị đo khối lượng chính xác? Vì sao cần lót giấy?</li>
        <li>Khi đun ống nghiệm, miệng ống nên hướng về đâu?</li>
      </ul>
      <p style="margin:10px 0 0; color:#475569; font-size:14px;">Trả lời nhanh để tự check trước khi làm bài test 10 câu.</p>
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
    },
    {
      type: "multiple-choice",
      question: "Thiết bị nào dùng để đun nóng an toàn trong phòng thí nghiệm?",
      options: [
        "Ống đong",
        "Đèn cồn",
        "Pipet",
        "Cân phân tích"
      ],
      correctAnswer: 1,
      explanation: "Đèn cồn cung cấp nhiệt để đun nóng mẫu thử ở quy mô nhỏ.",
      points: 10
    },
    {
      type: "multiple-choice",
      question: "Khi dung dịch bắn vào mắt, thao tác đúng là:",
      options: [
        "Dùng giấy lau",
        "Rửa ngay bằng nhiều nước và báo giáo viên",
        "Nhắm mắt đợi",
        "Tiếp tục thí nghiệm"
      ],
      correctAnswer: 1,
      explanation: "Rửa ngay dưới vòi nước và báo giáo viên để xử lý kịp thời.",
      points: 10
    },
    {
      type: "multiple-choice",
      question: "Dụng cụ đo thể tích gần đúng (ml) thường dùng là:",
      options: [
        "Ống đong",
        "Chén sứ",
        "Phiễu giấy",
        "Đũa thủy tinh"
      ],
      correctAnswer: 0,
      explanation: "Ống đong chia vạch để đo thể tích dung dịch gần đúng.",
      points: 10
    },
    {
      type: "multiple-choice",
      question: "Làm việc với axit/bazơ mạnh cần:",
      options: [
        "Mang kính, găng tay, áo blouse",
        "Không cần bảo hộ",
        "Thử bằng tay xem nóng",
        "Ngửi trực tiếp"
      ],
      correctAnswer: 0,
      explanation: "Trang bị bảo hộ cá nhân để tránh bỏng hóa chất.",
      points: 10
    },
    {
      type: "multiple-choice",
      question: "Dụng cụ lấy lượng nhỏ dung dịch chính xác là:",
      options: [
        "Ống hút nhỏ giọt/Pipet",
        "Chai rửa",
        "Chày cối",
        "Kẹp gỗ"
      ],
      correctAnswer: 0,
      explanation: "Pipet/ống nhỏ giọt cho phép lấy thể tích nhỏ chính xác.",
      points: 10
    },
    {
      type: "multiple-choice",
      question: "Bước đầu tiên trước khi cân hóa chất rắn là:",
      options: [
        "Bật đèn cồn",
        "Hiệu chỉnh cân về 0 và lót giấy/boat cân",
        "Thổi bụi vào cân",
        "Đặt trực tiếp hóa chất lên đĩa cân"
      ],
      correctAnswer: 1,
      explanation: "Hiệu chỉnh cân và dùng giấy/boat cân để bảo vệ đĩa cân.",
      points: 10
    },
    {
      type: "multiple-choice",
      question: "Khi ngửi hóa chất dễ bay hơi, nên:",
      options: [
        "Hít mạnh vào",
        "Dùng tay quạt nhẹ hơi về phía mũi",
        "Đưa mũi sát miệng chai",
        "Nếm thử"
      ],
      correctAnswer: 1,
      explanation: "Quạt nhẹ hơi để ngửi, tránh hít trực tiếp khí đậm đặc.",
      points: 10
    }
  ]
};
