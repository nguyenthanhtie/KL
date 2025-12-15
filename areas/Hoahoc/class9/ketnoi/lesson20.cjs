module.exports = {
  classId: 9,
  curriculumType: 'ketnoi',
  chapterId: 6,
  chapterName: 'Chương 6: Kim loại. Sự khác nhau cơ bản giữa phi kim và kim loại',
  lessonId: 20,
  title: 'Bài 20: Tách kim loại và sử dụng hợp kim',
  description: 'Các phương pháp khai thác, chế biến kim loại và vai trò hợp kim.',
  level: 'Intermediate',
  order: 3,
  theory: `
    <h2>⛏️ Tách kim loại &amp; hợp kim</h2>
    <p style="margin:10px 0; color:#334155;">Mục tiêu: nắm các bước thu kim loại từ quặng, phương pháp khử/điện phân và lợi ích của hợp kim.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); margin:12px 0;">
      <div style="padding:14px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 8px; color:#0f172a;">Quặng &amp; chuẩn bị</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Kim loại hiếm khi tồn tại tự do, chủ yếu ở dạng oxit, sunfua, cacbonat.</li>
          <li>Tuyển quặng: đập, tuyển nổi/từ/đãi trọng lực để tăng hàm lượng kim loại.</li>
          <li>Nung quặng sunfua → oxit, giải phóng SO₂ (cần xử lí khí).</li>
        </ul>
      </div>
      <div style="padding:14px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
        <h4 style="margin:0 0 8px; color:#9a3412;">Khử hoá học</h4>
        <ul style="margin:0; padding-left:18px; color:#7c2d12;">
          <li>Khử bằng C/CO/H₂: Fe₂O₃ + 3CO → 2Fe + 3CO₂ (lò cao).</li>
          <li>Nhiệt luyện cho kim loại trung bình (Fe, Cu, Pb...).</li>
          <li>Thu hồi kim loại yếu (Cu) bằng xi măng hoá: Fe + CuSO₄ → FeSO₄ + Cu.</li>
        </ul>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); margin:12px 0;">
      <div style="padding:14px; border:1px solid #e2e8f0; border-radius:10px; background:#ecfeff;">
        <h4 style="margin:0 0 8px; color:#0e7490;">Điện phân</h4>
        <ul style="margin:0; padding-left:18px; color:#0f172a;">
          <li>Áp dụng cho kim loại hoạt động mạnh: Na, K, Mg, Al.</li>
          <li>Điện phân nóng chảy: Al₂O₃/cryolit → Al (catot) + O₂ (anot C).</li>
          <li>Muối nóng chảy NaCl → Na + Cl₂ (điện phân Downs).</li>
        </ul>
      </div>
      <div style="padding:14px; border:1px solid #e2e8f0; border-radius:10px; background:#f0f9ff;">
        <h4 style="margin:0 0 8px; color:#0f172a;">Hợp kim &amp; ứng dụng</h4>
        <ul style="margin:0; padding-left:18px; color:#334155;">
          <li>Trộn kim loại/phi kim để tăng bền, chống ăn mòn, giảm khối lượng.</li>
          <li>Ví dụ: Thép (Fe+C), Đồng thau (Cu+Zn), Nhôm hợp kim (Al+Mg/Si), Thép không gỉ (Fe-Cr-Ni).</li>
          <li>Tái chế kim loại/hợp kim giúp giảm năng lượng và ô nhiễm.</li>
        </ul>
      </div>
    </div>

    <div style="margin:14px 0; padding:14px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc);">
      <h3 style="margin:0 0 8px; color:#312e81;">Bảng tóm tắt nhanh</h3>
      <ul style="margin:0; padding-left:18px; color:#334155;">
        <li>Tuyển quặng → nung/khử → tinh luyện (hoá học hoặc điện phân).</li>
        <li>Kim loại mạnh phải điện phân nóng chảy; kim loại trung bình dùng chất khử.</li>
        <li>Hợp kim cải thiện cơ tính, chống gỉ; tái chế giảm phát thải.</li>
      </ul>
    </div>

    <div style="margin:14px 0; padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; color:#475569;">
      <p style="margin:0 0 6px;"><strong>Gợi ý hình</strong>:</p>
      <p style="margin:0 0 4px;">Sơ đồ lò cao luyện gang/thu Fe: <em>/images/hoahoc9/lesson20-blastfurnace.png</em></p>
      <p style="margin:0 0 4px;">Điện phân Al₂O₃ trong cryolit: <em>/images/hoahoc9/lesson20-hallheroult.png</em></p>
      <p style="margin:0;">Cấu trúc hợp kim đồng thau: <em>/images/hoahoc9/lesson20-brass.png</em></p>
    </div>

    <div style="margin:14px 0; padding:14px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
      <h3 style="margin:0 0 8px; color:#9a3412;">Mini quiz đọc nhanh</h3>
      <ul style="margin:0; padding-left:18px; color:#7c2d12;">
        <li>Vì sao Al không khử được bằng CO mà phải điện phân?</li>
        <li>Viết PTHH khử Fe₂O₃ bằng CO.</li>
        <li>Lợi ích chính khi dùng thép không gỉ thay thép cacbon?</li>
      </ul>
      <p style="margin:8px 0 0; font-size:13px; color:#854d0e;">Suy nghĩ trước khi làm bài trắc nghiệm.</p>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Kim loại nào thuộc nhóm phải điện phân oxit/nóng chảy để điều chế?',
      options: ['Fe', 'Al', 'Cu', 'Ag'],
      correctAnswer: 1,
      explanation: 'Al hoạt động mạnh, phải điện phân Al2O3 trong criolit.'
    },
    {
      type: 'true-false',
      question: 'Thép là hợp kim của Fe và C.',
      correctAnswer: true,
      explanation: 'Đúng, thép chứa ~0,02-2% C và có thể thêm phụ gia.'
    },
    {
      type: 'multiple-choice',
      question: 'Phương pháp nào phù hợp để thu Fe từ quặng hematit?',
      options: ['Dien phan', 'Dong nhat', 'Khu bang CO trong lo cao', 'Thu hoi tu dung dich'],
      correctAnswer: 2,
      explanation: 'Fe2O3 được khử bằng CO/H2 trong lò cao.'
    },
    {
      type: 'fill-in-blank',
      question: 'PT: Fe2O3 + 3CO → 2Fe + ___CO2',
      correctAnswer: '3',
      explanation: 'Hệ số CO2 là 3.'
    },
    {
      type: 'multiple-choice',
      question: 'Đồng thau (brass) gồm thành phần chính:',
      options: ['Cu + Zn', 'Cu + Sn', 'Fe + C', 'Al + Mg'],
      correctAnswer: 0,
      explanation: 'Brass là hợp kim Cu và Zn.'
    },
    {
      type: 'multiple-choice',
      question: 'Hợp kim nào được dùng làm vỏ máy bay vì nhẹ và bền?',
      options: ['Thép không gỉ', 'Nhôm + Mg/Si', 'Đồng thau', 'Gang xám'],
      correctAnswer: 1,
      explanation: 'Hợp kim nhôm với Mg/Si có tỉ trọng nhỏ, độ bền tốt.'
    },
    {
      type: 'true-false',
      question: 'Gang có hàm lượng C cao hơn thép.',
      correctAnswer: true,
      explanation: 'Gang ~2-4%C, thép <2% C.'
    },
    {
      type: 'fill-in-blank',
      question: 'Điện phân nóng chảy NaCl tạo ra Na + ___',
      correctAnswer: 'Cl2',
      explanation: 'Catot thu Na, anot giải phóng Cl2.'
    },
    {
      type: 'multiple-choice',
      question: 'Bước nào thường dùng trước khi khử quặng kim loại?',
      options: ['Nghiền mịn quặng', 'Tuyển chọn lọc quặng', 'Tuyển quặng/tăng hàm lượng', 'Đóng gói bán'],
      correctAnswer: 2,
      explanation: 'Tuyển quặng để tăng hàm lượng kim loại trước khi khử.'
    },
    {
      type: 'multiple-choice',
      question: 'Hợp kim nào chịu ăn mòn tốt nhất trong các lựa chọn sau?',
      options: ['Thép cacbon', 'Thép không gỉ (Fe-Cr-Ni)', 'Gang trắng', 'Đồng thau'],
      correctAnswer: 1,
      explanation: 'Thép không gỉ (Fe-Cr-Ni) chống rỉ sét rất tốt.'
    }
  ]
};
