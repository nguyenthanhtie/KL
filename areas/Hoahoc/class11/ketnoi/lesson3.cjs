module.exports = {
  classId: 11,
  curriculumType: 'ketnoi',
  chapterId: 1,
  chapterName: 'Chương 1: Cân bằng hoá học',
  lessonId: 3,
  title: 'Bài 3: Ôn tập chương 1',
  description: 'Tóm tắt cân bằng động, hằng số K, Q và ứng dụng Le Chatelier.',
  level: 'Intermediate',
  order: 3,
  theory: `
    <h2>Ôn tập cân bằng hoá học</h2>
    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:10px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">Nhận diện & biểu thức K</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Phản ứng thuận nghịch trong hệ kín mới đạt cân bằng động.</li>
          <li>Viết $K_c, K_p$: đưa hệ số phản ứng thành số mũ, bỏ chất rắn/lỏng tinh khiết.</li>
          <li>So sánh Q và K để dự đoán chiều dịch chuyển.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
        <h4 style="margin:0 0 6px; color:#9a3412;">Le Chatelier nhanh</h4>
        <ul style="margin:0; padding-left:18px; color:#7c2d12;">
          <li>Tăng nồng độ chất phản ứng → dịch phải; tăng sản phẩm → dịch trái.</li>
          <li>Giảm thể tích (tăng áp) → ưu tiên phía có ít mol khí hơn.</li>
          <li>Nhiệt độ: phản ứng thu nhiệt dịch phải khi tăng T; toả nhiệt dịch trái khi tăng T.</li>
          <li>Xúc tác: không làm đổi K, chỉ đạt cân bằng nhanh hơn.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#ecfeff;">
        <h4 style="margin:0 0 6px; color:#0e7490;">Dung dịch & kết tủa</h4>
        <ul style="margin:0; padding-left:18px; color:#0f172a;">
          <li>pH: pH + pOH = 14 (25°C); Ka·Kb = Kw.</li>
          <li>Ksp: so Qsp với Ksp để xét kết tủa; ion chung làm giảm độ tan.</li>
        </ul>
      </div>
    </div>

    <div style="margin:10px 0; padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; color:#475569;">
      <h4 style="margin:0 0 6px;">Lỗi thường gặp</h4>
      <ul style="margin:0; padding-left:18px;">
        <li>Đưa chất rắn/tinh khiết vào K.</li>
        <li>Nhầm hướng dịch chuyển áp suất: phải so tổng mol khí hai vế.</li>
        <li>Hiểu sai vai trò xúc tác: không thay đổi K.</li>
      </ul>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Phản ứng nào dưới đây không thể thiết lập cân bằng trong điều kiện thường?',
      options: ['N2 + 3H2 ⇌ 2NH3', 'CaCO3(r) ⇌ CaO(r) + CO2(k)', 'HCl + NaOH → NaCl + H2O', '2SO2 + O2 ⇌ 2SO3'],
      correctAnswer: 2,
      explanation: 'HCl + NaOH gần như một chiều, không quay lại đáng kể.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Với phản ứng A ⇌ 2B, khi giảm thể tích (tăng áp) hệ sẽ:',
      options: ['Dịch phải', 'Dịch trái', 'Không đổi', 'Tuỳ nhiệt độ'],
      correctAnswer: 1,
      explanation: 'Phía trái 1 mol khí, phải 2 mol; tăng áp ưu tiên phía ít mol → dịch trái.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Thêm xúc tác làm giảm thời gian đạt cân bằng nhưng không đổi K.',
      correctAnswer: true,
      explanation: 'Xúc tác hạ Ea cho cả hai chiều, giá trị K giữ nguyên.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Ở 25°C, dung dịch có pH = 3 thì [H+] xấp xỉ:',
      options: ['1,0×10^{-3} M', '1,0×10^{-11} M', '1,0×10^{-7} M', '1,0×10^{3} M'],
      correctAnswer: 0,
      explanation: 'pH = 3 → [H+] ≈ 10^{-3} M.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Với phản ứng thu nhiệt, tăng nhiệt độ sẽ làm:',
      options: ['Dịch chuyển thuận và K tăng', 'Dịch chuyển nghịch và K tăng', 'Dịch chuyển thuận và K giảm', 'Không đổi'],
      correctAnswer: 0,
      explanation: 'Thu nhiệt coi như “nhận nhiệt” phía sản phẩm → T tăng làm K tăng, dịch thuận.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng 2NO2 ⇌ N2O4 có K = 7,0 ở 25°C. Nếu Q = 10, chiều chuyển dịch là:',
      options: ['Thuận', 'Nghịch', 'Đã cân bằng', 'Không xác định'],
      correctAnswer: 1,
      explanation: 'Q > K → dịch trái (tạo NO2).',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Trong Ksp của BaSO4 không xuất hiện chất rắn BaSO4.',
      correctAnswer: true,
      explanation: 'BaSO4 rắn có hoạt độ 1, không đưa vào biểu thức Ksp.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Khi tăng nồng độ sản phẩm, hệ sẽ:',
      options: ['Dịch chuyển tạo thêm sản phẩm', 'Dịch chuyển về phía chất phản ứng', 'Không đổi', 'K giảm'],
      correctAnswer: 1,
      explanation: 'Le Chatelier: tăng sản phẩm → dịch trái để giảm nồng độ sản phẩm.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Quan hệ đúng giữa Kp và Kc với Δn = (mol khí sp) - (mol khí chất tham gia):',
      options: ['Kp = Kc', 'Kp = Kc (RT)^{-Δn}', 'Kp = Kc (RT)^{Δn}', 'Kp = 1/Kc'],
      correctAnswer: 2,
      explanation: 'Kp = Kc (RT)^{Δn} (với R theo mol·K, T tuyệt đối).',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Ion chung làm ______ độ tan của muối ít tan.',
      correctAnswer: 'giảm',
      explanation: 'Thêm ion chung dịch cân bằng về chất rắn → giảm tan.',
      points: 10
    }
  ]
};
