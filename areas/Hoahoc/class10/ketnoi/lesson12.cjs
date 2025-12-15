module.exports = {
  classId: 10,
  curriculumType: 'ketnoi',
  chapterId: 3,
  chapterName: 'Chương 3: Liên kết hóa học',
  lessonId: 12,
  title: 'Bài 12: Liên kết cộng hóa trị',
  description: 'Liên kết cộng hoá trị: dùng chung e, phân cực/không cực, bội liên kết.',
  level: 'Intermediate',
  order: 3,
  theory: `
    <h2>Liên kết cộng hóa trị</h2>
    <p style="margin:10px 0; color:#334155;">Mục tiêu: phân biệt liên kết đơn/đôi/ba, cực/không cực, hiểu hình học phân tử cơ bản (VSEPR) và ứng dụng Lewis.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(250px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">Bản chất & phân loại</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Dùng chung cặp e giữa các nguyên tử (thường phi kim hoặc H).</li>
          <li>Liên kết đơn/đôi/ba: 1/2/3 cặp e chung → bền và ngắn dần.</li>
          <li>Liên kết phối trí: một nguyên tử cho cả cặp e chung (vd: CO, NH4+).</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
        <h4 style="margin:0 0 6px; color:#9a3412;">Cực hay không cực</h4>
        <ul style="margin:0; padding-left:18px; color:#7c2d12;">
          <li>Không cực khi ΔEN rất nhỏ (H2, Cl2, CH4 gần đối xứng).</li>
          <li>Có cực khi ΔEN vừa phải (HCl, H2O); mômen lưỡng cực phụ thuộc hình học.</li>
          <li>Phân tử có thể không cực dù liên kết có cực nếu hình học đối xứng (CO2, CCl4).</li>
        </ul>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc);">
        <h4 style="margin:0 0 6px; color:#312e81;">Hình học (VSEPR cơ bản)</h4>
        <ul style="margin:0; padding-left:18px; color:#334155;">
          <li>2 miền e (AX2) → thẳng (CO2).</li>
          <li>3 miền e (AX3/AX2E) → tam giác phẳng / gấp khúc (SO2).</li>
          <li>4 miền e (AX4/AX3E/AX2E2) → tứ diện / tháp tam giác / gấp khúc (CH4, NH3, H2O).</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Công thức Lewis & lưu ý</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Đếm e hoá trị, vẽ khung, phân bổ e ngoài → trung tâm, tăng bậc nếu thiếu octet.</li>
          <li>Kiểm tra mômen tổng: liên kết có cực nhưng hình học đối xứng → phân tử không cực.</li>
          <li>Nguyên tử chu kỳ 2 không giãn octet; phân tử e lẻ (NO) không đủ 8e cho mọi nguyên tử.</li>
        </ul>
      </div>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Phân tử nào có liên kết cộng hóa trị không cực?',
      options: ['HCl', 'NaCl', 'Cl2', 'H2O'],
      correctAnswer: 2,
      explanation: 'Cl2 gồm 2 nguyên tử có độ âm điện bằng nhau → không cực.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Số cặp e dùng chung trong liên kết ba là?',
      options: ['1', '2', '3', '4'],
      correctAnswer: 2,
      explanation: 'Liên kết ba gồm 3 cặp electron chung (ví dụ N≡N).',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Liên kết cộng hóa trị chỉ xuất hiện giữa phi kim.',
      correctAnswer: false,
      explanation: 'Chủ yếu giữa phi kim, nhưng cũng có trong hợp chất kim loại thấp hóa trị (CO).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Liên kết cộng hóa trị hình thành khi:',
      options: ['Nguyên tử trao đổi e', 'Nguyên tử dùng chung e', 'Nguyên tử tách e tự do', 'Nguyên tử chuyển động hỗn loạn'],
      correctAnswer: 1,
      explanation: 'Bản chất là dùng chung cặp e giữa các nguyên tử.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Hình dạng phân tử H2O bị bẻ góc do:',
      options: ['Không có cặp e tự do', '2 cặp e tự do trên O đẩy liên kết', '3 liên kết đôi', 'Không phân cực'],
      correctAnswer: 1,
      explanation: '2 cặp e tự do tạo lực đẩy lớn, góc H-O-H ~104,5°.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phân tử nào có liên kết cộng hoá trị phân cực?',
      options: ['Cl2', 'H2', 'O2', 'HCl'],
      correctAnswer: 3,
      explanation: 'Độ âm điện H ≠ Cl → liên kết có cực.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Liên kết đôi ngắn hơn và mạnh hơn liên kết đơn.',
      correctAnswer: true,
      explanation: 'Nhiều cặp e chung hơn → lực hút lớn hơn → liên kết ngắn, bền.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Công thức Lewis giúp:',
      options: ['Tính khối lượng mol', 'Biểu diễn cặp e liên kết và không liên kết', 'Tính độ âm điện', 'Tính năng lượng ion hoá'],
      correctAnswer: 1,
      explanation: 'Lewis hiển thị cặp e chung và cặp e tự do.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Liên kết trong phân tử CO có đặc điểm:',
      options: ['Ion hoàn toàn', 'Cộng hoá trị phối trí và liên kết ba', 'Kim loại', 'Vander Waals'],
      correctAnswer: 1,
      explanation: 'CO có liên kết ba với một liên kết phối trí từ O → C.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Khi ΔEN giữa hai nguyên tử khoảng 0,5–1,7, thường tạo:',
      options: ['Liên kết ion', 'Liên kết cộng hoá trị phân cực', 'Liên kết kim loại', 'Không hình thành liên kết'],
      correctAnswer: 1,
      explanation: 'Chênh lệch vừa phải → cộng hoá trị có cực.',
      points: 10
    }
  ]
};
