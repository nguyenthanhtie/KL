module.exports = {
  classId: 9,
  curriculumType: 'ketnoi',
  chapterId: 6,
  chapterName: 'Chương 6: Kim loại. Sự khác nhau cơ bản giữa phi kim và kim loại',
  lessonId: 19,
  title: 'Bài 19: Dãy hoạt động hóa học',
  description: 'Ôn thứ tự hoạt động kim loại và vận dụng dự đoán phản ứng.',
  level: 'Intermediate',
  order: 2,
  theory: `
    <h2>📈 Dãy hoạt động hoá học của kim loại</h2>
    <p style="margin:10px 0; color:#334155;">Mục tiêu: nhớ thứ tự hoạt động, quy tắc dự đoán phản ứng với nước, axit, muối và vận dụng thay thế.</p>

    <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc; margin:12px 0;">
      <h4 style="margin:0 0 8px; color:#0f172a;">Thứ tự dãy giảm dần</h4>
      <p style="margin:0; color:#475569;">K - Na - Ca - Mg - Al - Zn - Fe - Ni - Sn - Pb - (H) - Cu - Ag - Au.</p>
      <p style="margin:6px 0 0; color:#475569; font-size:13px;">Kim loại càng đứng trái càng dễ nhường electron → hoạt động mạnh.</p>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); margin:12px 0;">
      <div style="padding:14px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
        <h4 style="margin:0 0 8px; color:#9a3412;">Quy tắc phản ứng</h4>
        <ul style="margin:0; padding-left:18px; color:#7c2d12;">
          <li>Đẩy kim loại yếu hơn khỏi muối: Fe + CuSO₄ → FeSO₄ + Cu.</li>
          <li>Đứng trước H → đẩy H₂ khỏi axit loãng: Zn + 2HCl → ZnCl₂ + H₂.</li>
          <li>Phản ứng với nước lạnh: K, Na, Ca; với hơi nước nóng: Mg, Zn, Fe.</li>
        </ul>
      </div>
      <div style="padding:14px; border:1px solid #e2e8f0; border-radius:10px; background:#ecfeff;">
        <h4 style="margin:0 0 8px; color:#0e7490;">Ứng dụng dự đoán</h4>
        <ul style="margin:0; padding-left:18px; color:#0f172a;">
          <li>Chọn kim loại thu từ dung dịch muối: dùng kim loại đứng trước.</li>
          <li>Chọn axit để giải phóng H₂: dùng axit loãng với kim loại đứng trước H.</li>
          <li>Nhận biết kim loại yếu (Cu, Ag, Au) không phản ứng HCl loãng.</li>
        </ul>
      </div>
    </div>

    <div style="margin:14px 0; padding:14px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc);">
      <h3 style="margin:0 0 8px; color:#312e81;">Bảng tóm tắt nhanh</h3>
      <ul style="margin:0; padding-left:18px; color:#334155;">
        <li>Dãy hoạt động xếp theo độ dễ oxi hoá (nhường e).</li>
        <li>Đứng trước H: phản ứng axit loãng giải phóng H₂; sau H thì không.</li>
        <li>Đứng trước kim loại khác → có thể đẩy khỏi dung dịch muối của nó.</li>
      </ul>
    </div>

    <div style="margin:14px 0; padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; color:#475569;">
      <p style="margin:0 0 6px;"><strong>Gợi ý hình</strong>:</p>
      <p style="margin:0 0 4px;">Biểu đồ dãy hoạt động và vùng phản ứng với nước/axit: <em>/images/hoahoc9/lesson19-series.png</em></p>
      <p style="margin:0;">Thí nghiệm Fe + CuSO₄ (đổi màu, xuất hiện Cu): <em>/images/hoahoc9/lesson19-displacement.png</em></p>
    </div>

    <div style="margin:14px 0; padding:14px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
      <h3 style="margin:0 0 8px; color:#9a3412;">Mini quiz đọc nhanh</h3>
      <ul style="margin:0; padding-left:18px; color:#7c2d12;">
        <li>Kim loại nào đầu tiên không đẩy được H₂ khỏi axit loãng?</li>
        <li>Viết PTHH Mg tác dụng với hơi nước.</li>
        <li>Chọn kim loại phù hợp để thu Cu từ CuSO₄, vì sao?</li>
      </ul>
      <p style="margin:8px 0 0; font-size:13px; color:#854d0e;">Tự thử sức rồi làm bộ trắc nghiệm.</p>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Kim loại nào đứng ngay sau Al trong dãy hoạt động?',
      options: ['Mg', 'Zn', 'Fe', 'Ca'],
      correctAnswer: 1,
      explanation: 'Thứ tự ... Al - Zn - Fe ...'
    },
    {
      type: 'true-false',
      question: 'Cu có thể đẩy Fe khỏi dung dịch FeSO4.',
      correctAnswer: false,
      explanation: 'Cu hoạt động yếu hơn Fe, không thể đẩy Fe khỏi muối.'
    },
    {
      type: 'multiple-choice',
      question: 'Kim loại nào phản ứng mạnh nhất với nước lạnh?',
      options: ['Fe', 'Na', 'Zn', 'Cu'],
      correctAnswer: 1,
      explanation: 'K, Na, Ca phản ứng mạnh với nước lạnh.'
    },
    {
      type: 'fill-in-blank',
      question: 'Phương trình: Zn + 2HCl → ZnCl2 + ___',
      correctAnswer: 'H2',
      explanation: 'Sinh ra H2.'
    },
    {
      type: 'multiple-choice',
      question: 'Để thu Cu từ dung dịch CuSO4, nên dùng kim loại nào?',
      options: ['Ag', 'Au', 'Fe', 'Hg'],
      correctAnswer: 2,
      explanation: 'Fe đứng trước Cu nên đẩy được Cu ra khỏi muối.'
    },
    {
      type: 'true-false',
      question: 'Ag không đẩy được H2 khỏi axit HCl loãng.',
      correctAnswer: true,
      explanation: 'Ag đứng sau H trong dãy nên không phản ứng với HCl loãng.'
    },
    {
      type: 'multiple-choice',
      question: 'Cặp kim loại nào có thể phản ứng với H2SO4 loãng giải phóng H2?',
      options: ['Cu, Ag', 'Au, Pt', 'Mg, Zn', 'Hg, Cu'],
      correctAnswer: 2,
      explanation: 'Mg, Zn đứng trước H nên đẩy được H2 khỏi axit loãng.'
    },
    {
      type: 'fill-in-blank',
      question: 'Fe + CuSO4 → FeSO4 + ___',
      correctAnswer: 'Cu',
      explanation: 'Fe thay Cu trong muối CuSO4.'
    },
    {
      type: 'multiple-choice',
      question: 'Kim loại nào không bị H2O ở nhiệt độ thường tác động?',
      options: ['Na', 'K', 'Ca', 'Al'],
      correctAnswer: 3,
      explanation: 'Al không phản ứng với nước lạnh do có màng oxit bảo vệ.'
    },
    {
      type: 'multiple-choice',
      question: 'Mục đích của dãy hoạt động kim loại là gì?',
      options: ['Xếp kim loại theo độ bền', 'Xếp theo độ hôi độc', 'Dự đoán phản ứng thay thế và với axit', 'Xác định màu sắc kim loại'],
      correctAnswer: 2,
      explanation: 'Dãy hoạt động giúp dự đoán phản ứng thay thế và tác dụng với axit/nước.'
    }
  ]
};
