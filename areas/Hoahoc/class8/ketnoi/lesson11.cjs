module.exports = {
  classId: 8,
  curriculumType: 'ketnoi',
  chapterId: 3,
  chapterName: "Chương 3: Một số hợp chất thông dụng",
  lessonId: 11,
  order: 11,
  title: 'Bài 11: Muối',
  theory: `
    <h2>🧂 Bài 11: Muối</h2>
    <p style="margin:10px 0; color:#334155;">Mục tiêu: phân biệt muối trung hòa/acid, tính tan, phản ứng trao đổi và ứng dụng.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); margin:14px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 8px; color:#0f172a;">Khái niệm & phân loại</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Muối: hợp chất ion giữa cation kim loại/NH₄⁺ và anion gốc acid.</li>
          <li>Muối trung hòa: NaCl, K₂SO₄.</li>
          <li>Muối acid: NaHCO₃, KH₂PO₄ (còn H chưa thay thế hết).</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
        <h4 style="margin:0 0 8px; color:#9a3412;">Tính chất chính</h4>
        <ul style="margin:0; padding-left:18px; color:#7c2d12;">
          <li>Nhiều muối tan; một số không tan (AgCl, BaSO₄).</li>
          <li>Với acid/bazơ: tạo muối mới + acid/bazơ mới nếu có kết tủa/khí/điện li yếu.</li>
          <li>Phản ứng trao đổi ion cần điều kiện: kết tủa/khí/điện li yếu sinh ra.</li>
        </ul>
      </div>
    </div>

    <div style="margin:16px 0; padding:14px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc);">
      <h3 style="margin:0 0 8px; color:#312e81;">Ví dụ phương trình</h3>
      <ul style="margin:0; padding-left:18px; color:#334155;">
        <li>NaCl + AgNO₃ → AgCl↓ + NaNO₃ (kết tủa trắng).</li>
        <li>CaCO₃ + 2HCl → CaCl₂ + CO₂↑ + H₂O (sủi bọt CO₂).</li>
        <li>NaHCO₃ + HCl → NaCl + CO₂↑ + H₂O.</li>
        <li>NaOH + CuSO₄ → Cu(OH)₂↓ + Na₂SO₄ (kết tủa lam).</li>
      </ul>
    </div>

    <div style="margin:14px 0; display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr));">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#ecfeff;">
        <h4 style="margin:0 0 8px; color:#0e7490;">Ứng dụng nhanh</h4>
        <ul style="margin:0; padding-left:18px; color:#0f172a;">
          <li>NaCl: gia vị, điện phân nước muối.</li>
          <li>CaCO₃: vật liệu xây dựng.</li>
          <li>KNO₃, NH₄NO₃: phân bón.</li>
          <li>CuSO₄: nông nghiệp (boóc-đô).</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f0f9ff;">
        <h4 style="margin:0 0 8px; color:#0f172a;">Mini quiz đọc nhanh</h4>
        <ol style="margin:0; padding-left:18px; color:#334155;">
          <li>Điều kiện nào làm phản ứng trao đổi xảy ra?</li>
          <li>Hiện tượng khi Na₂CO₃ gặp HCl?</li>
          <li>Muối acid khác gì muối trung hòa?</li>
        </ol>
        <p style="margin:8px 0 0; font-size:13px; color:#475569;">Tự trả lời trước khi làm test.</p>
      </div>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Muối là hợp chất giữa:',
      options: ['Kim loại và oxygen', 'Cation kim loại/NH₄⁺ và anion gốc acid', 'Phi kim và hydrogen', 'Chỉ có oxygen'],
      correctAnswer: 1
    },
    {
      type: 'multiple-choice',
      question: 'Khi cho NaCl vào dung dịch AgNO₃, hiện tượng:',
      options: ['Không đổi', 'Xuất hiện kết tủa trắng AgCl', 'Tỏa khí H₂', 'Tỏa mùi khai'],
      correctAnswer: 1
    },
    {
      type: 'multiple-choice',
      question: 'Muối nào sau đây không tan trong nước?',
      options: ['NaCl', 'KNO₃', 'AgCl', 'CuSO₄'],
      correctAnswer: 2
    },
    {
      type: 'multiple-choice',
      question: 'Muối acid đặc trưng bởi:',
      options: ['Chỉ có kim loại', 'Chứa gốc acid còn H chưa thay thế hết', 'Chứa gốc bazơ', 'Không chứa ion'],
      correctAnswer: 1
    },
    {
      type: 'multiple-choice',
      question: 'Điều kiện xảy ra phản ứng trao đổi giữa hai dung dịch muối/acid/bazơ là:',
      options: ['Luôn xảy ra', 'Có tạo kết tủa/khí/điện li yếu', 'Chỉ cần khuấy', 'Chỉ khi đun nóng'],
      correctAnswer: 1
    },
    {
      type: 'multiple-choice',
      question: 'Muối acid khác muối trung hòa ở chỗ:',
      options: ['Chứa gốc acid còn H chưa thay thế hết', 'Không chứa ion', 'Không có kim loại', 'Luôn không tan'],
      correctAnswer: 0
    },
    {
      type: 'multiple-choice',
      question: 'Hiện tượng khi cho Na₂CO₃ vào HCl loãng:',
      options: ['Không đổi', 'Sủi bọt CO₂', 'Kết tủa đỏ', 'Tỏa mùi khai'],
      correctAnswer: 1
    },
    {
      type: 'multiple-choice',
      question: 'Muối nào sau đây tan tốt trong nước?',
      options: ['BaSO₄', 'AgCl', 'KNO₃', 'PbSO₄'],
      correctAnswer: 2
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng tạo kết tủa xanh lam khi:',
      options: ['NaCl + AgNO₃', 'NaOH + CuSO₄', 'HCl + NaOH', 'KNO₃ + NaCl'],
      correctAnswer: 1
    },
    {
      type: 'multiple-choice',
      question: 'Khi viết tên muối, thứ tự là:',
      options: ['Gốc acid trước, kim loại sau', 'Kim loại (hoặc NH₄⁺) trước, gốc acid sau', 'Tên bất kỳ', 'Ion âm trước'],
      correctAnswer: 1
    }
  ]
};
