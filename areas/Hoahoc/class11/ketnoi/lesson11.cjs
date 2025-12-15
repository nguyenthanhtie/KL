module.exports = {
  classId: 11,
  curriculumType: 'ketnoi',
  chapterId: 3,
  chapterName: 'Chương 3: Đại cương về hoá học hữu cơ',
  lessonId: 11,
  title: 'Bài 11: Phương pháp tách biệt và tinh chế hợp chất hữu cơ',
  description: 'Chưng cất, chiết, kết tinh, sắc kí cơ bản cho hợp chất hữu cơ.',
  level: 'Intermediate',
  order: 11,
  theory: `
    <h2>Tách biệt và tinh chế</h2>
    <p style="margin:8px 0; color:#334155;">Chọn phương pháp tinh chế dựa trên độ bay hơi, độ tan, độ bền nhiệt và tính hấp phụ.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">Chưng cất</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Chưng cất đơn: tách chất có chênh lệch điểm sôi lớn (>25–30°C), không tạo azeotrop.</li>
          <li>Chưng cất phân đoạn: dùng cột chưng, tách hỗn hợp nhiều cấu tử gần điểm sôi.</li>
          <li>Chưng cất chân không: cho chất dễ phân huỷ nhiệt, hạ áp để giảm điểm sôi.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
        <h4 style="margin:0 0 6px; color:#9a3412;">Chiết</h4>
        <ul style="margin:0; padding-left:18px; color:#7c2d12;">
          <li>Dựa trên độ tan khác nhau giữa hai pha lỏng không trộn (nước/hữu cơ).</li>
          <li>Phễu chiết: lắc nhẹ, xả lớp nặng trước; chọn dung môi hữu cơ nhẹ hơn (ete, dichloromethan nặng hơn nước).</li>
          <li>Có thể chiết axit-bazơ: chuyển dạng ion để thay đổi độ tan.</li>
        </ul>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Kết tinh</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Chọn dung môi: tan tốt nóng, tan ít lạnh; không phản ứng với chất.</li>
          <li>Hoà tan nóng, lọc nóng loại tạp không tan, làm lạnh kết tinh; rửa và sấy tinh thể.</li>
          <li>Dùng than hoạt để khử màu (hấp phụ), lọc bỏ trước khi kết tinh.</li>
        </ul>
      </div>
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc); color:#334155;">
        <h4 style="margin:0 0 6px; color:#312e81;">Sắc kí mỏng (TLC)</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Pha tĩnh: lớp mỏng silica gel/Al2O3 trên bản kính/nhôm.</li>
          <li>Pha động: dung môi hoặc hỗn hợp dung môi; chất di chuyển với tốc độ khác nhau.</li>
          <li>Rf = (khoảng cách chất chạy)/(khoảng cách dung môi); dùng theo dõi phản ứng, độ tinh khiết.</li>
        </ul>
      </div>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Chưng cất phân đoạn dùng khi:',
      options: ['Điểm sôi chênh lệch rất lớn', 'Tách rắn khỏi lỏng', 'Điểm sôi các cấu tử gần nhau', 'Chất dễ cháy nổ'],
      correctAnswer: 2,
      explanation: 'Cột chưng giúp tăng bậc tách khi điểm sôi gần nhau.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Dung môi nặng hơn nước trong chiết là:',
      options: ['Ete etylic', 'Hexan', 'Dichloromethan (CH2Cl2)', 'Toluene'],
      correctAnswer: 2,
      explanation: 'CH2Cl2 tỷ trọng ~1.33 > nước, nên nằm lớp dưới.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Chưng cất chân không giúp giảm nhiệt độ sôi, tránh phân huỷ.',
      correctAnswer: true,
      explanation: 'Hạ áp suất làm giảm nhiệt độ sôi, phù hợp chất kém bền nhiệt.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Tiêu chí chọn dung môi kết tinh:',
      options: ['Tan mạnh ở lạnh', 'Phản ứng với chất cần tinh chế', 'Tan tốt nóng, tan kém lạnh', 'Có màu đậm'],
      correctAnswer: 2,
      explanation: 'Cần tan tốt khi nóng để hoà tan, kém tan khi lạnh để kết tinh.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Rf trong TLC được tính bằng:',
      options: ['Thời gian lưu', 'Khoảng cách dung môi/ khoảng cách chất', 'Khoảng cách chất/ khoảng cách dung môi', 'Độ nhớt'],
      correctAnswer: 2,
      explanation: 'Rf = (khoảng cách chất chạy)/(khoảng cách mặt dung môi).',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Chiết axit-bazơ có thể chuyển axit hữu cơ thành dạng muối tan trong nước.',
      correctAnswer: true,
      explanation: 'Tạo muối carboxylat tan trong pha nước để tách khỏi tạp hữu cơ.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Tách nước khỏi dung môi hữu cơ thường dùng:',
      options: ['MgSO4 khan', 'NaCl rắn', 'KMnO4', 'HCl'],
      correctAnswer: 0,
      explanation: 'Muối khan hút ẩm (MgSO4, Na2SO4 khan) rồi lọc bỏ.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Azeotrop là:',
      options: ['Dung dịch không sôi', 'Hỗn hợp sôi ở nhiệt độ cố định và thành phần hơi = lỏng', 'Dung dịch rắn-lỏng', 'Dung dịch điện li'],
      correctAnswer: 1,
      explanation: 'Azeotrop làm hạn chế tách hoàn toàn bằng chưng cất thường.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Trong phễu chiết, luôn xả lớp nhẹ trước.',
      correctAnswer: false,
      explanation: 'Xả lớp nặng (tỷ trọng lớn) trước, thường là nước hoặc dung môi nặng.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Trong TLC, pha tĩnh thường là ______',
      correctAnswer: 'silica gel',
      explanation: 'Silica gel hoặc Al2O3 được tráng mỏng trên bản TLC.',
      points: 10
    }
  ]
};
