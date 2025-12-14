module.exports = {
  classId: 8,
  curriculumType: 'chantroicangtao',
  chapterId: 2,
  chapterName: "Chủ đề 2: Một số hợp chất vô cơ. Thang pH",
  lessonId: 9,
  title: 'Bài 9: Acid',
  order: 9,
  theory: `
    <h2>🌋 Bài 9: Acid</h2>
    <p style="margin:10px 0; color:#334155;">Mục tiêu: hiểu acid, tính chất, phản ứng đặc trưng và an toàn pha loãng.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); margin:14px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 8px; color:#0f172a;">Khái niệm</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Acid phân li ra H⁺ trong nước.</li>
          <li>Công thức thường bắt đầu bằng H (HCl, H₂SO₄...).</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
        <h4 style="margin:0 0 8px; color:#9a3412;">Tính chất chính</h4>
        <ul style="margin:0; padding-left:18px; color:#7c2d12;">
          <li>Vị chua (không nếm!), quỳ tím → đỏ.</li>
          <li>Với kim loại trước H: tạo muối + H₂.</li>
          <li>Với bazơ/oxide bazơ: muối + nước (trung hòa).</li>
        </ul>
      </div>
    </div>

    <div style="margin:16px 0; padding:14px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc);">
      <h3 style="margin:0 0 8px; color:#312e81;">Phương trình tiêu biểu</h3>
      <ul style="margin:0; padding-left:18px; color:#334155;">
        <li>Zn + 2HCl → ZnCl₂ + H₂↑ (kim loại + acid loãng).</li>
        <li>2HCl + CuO → CuCl₂ + H₂O (acid + oxide bazơ).</li>
        <li>H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O (trung hòa).</li>
      </ul>
    </div>

    <div style="margin:14px 0; display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr));">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#ecfeff;">
        <h4 style="margin:0 0 8px; color:#0e7490;">An toàn & pha loãng</h4>
        <ul style="margin:0; padding-left:18px; color:#0f172a;">
          <li>Luôn rót <strong>axit vào nước</strong>, khuấy nhẹ.</li>
          <li>Đeo kính, găng; tránh hít hơi.</li>
          <li>Trung hòa tràn đổ nhẹ bằng NaHCO₃.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f0f9ff;">
        <h4 style="margin:0 0 8px; color:#0f172a;">Ứng dụng nhanh</h4>
        <ul style="margin:0; padding-left:18px; color:#334155;">
          <li>HCl: sản xuất muối, tẩy gỉ.</li>
          <li>H₂SO₄: ắc quy, phân bón.</li>
          <li>HNO₃: phân bón, thuốc nổ.</li>
        </ul>
      </div>
    </div>

    <div style="margin:14px 0; padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f0f9ff;">
      <h4 style="margin:0 0 8px; color:#0f172a;">Mini quiz đọc nhanh</h4>
      <ol style="margin:0; padding-left:18px; color:#334155;">
        <li>Ion đặc trưng của acid là gì?</li>
        <li>Khi pha loãng H₂SO₄ đặc, rót theo chiều nào?</li>
        <li>Hiện tượng khi CaCO₃ gặp HCl loãng?</li>
      </ol>
      <p style="margin:8px 0 0; font-size:13px; color:#475569;">Tự trả lời trước khi làm test 10 câu.</p>
    </div>

    <div style="margin:16px 0; padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; text-align:center; color:#475569;">
      <p style="margin:0 0 6px;"><strong>Placeholder hình/sơ đồ</strong>:</p>
      <p style="margin:0 0 4px;">Chu trình phản ứng acid: <em>/images/hoahoc/lesson9-acid.png</em></p>
      <p style="margin:0;">Sơ đồ pha loãng an toàn: <em>/images/hoahoc/lesson9-dilution.png</em></p>
    </div>
  `,
  game: [
    {
      question: 'Acid làm quỳ tím:',
      options: ['Xanh', 'Đỏ', 'Vàng', 'Không đổi'],
      correctAnswer: 1
    },
    {
      question: 'Phản ứng nào tạo H₂?',
      options: ['NaOH + HCl', 'Zn + HCl', 'CuO + H₂SO₄', 'Na₂O + H₂O'],
      correctAnswer: 1
    },
    {
      question: 'Acid phản ứng với bazơ tạo:',
      options: ['Kim loại', 'Oxide', 'Muối và nước', 'Khí trơ'],
      correctAnswer: 2
    },
    {
      question: 'Công thức đúng của acid sulfuric:',
      options: ['H₂SO₄', 'H₂SO₃', 'H₂S', 'HSO₄'],
      correctAnswer: 0
    },
    {
      question: 'Ion đặc trưng của dung dịch acid là:',
      options: ['OH⁻', 'H⁺', 'Na⁺', 'Cl⁻'],
      correctAnswer: 1
    },
    {
      question: 'Hiện tượng khi cho CaCO₃ vào HCl loãng là:',
      options: ['Không đổi', 'Sủi bọt khí CO₂', 'Tạo kết tủa trắng', 'Đổi màu tím'],
      correctAnswer: 1
    },
    {
      question: 'Sản phẩm trung hòa giữa H₂SO₄ và 2NaOH là:',
      options: ['NaHSO₄', 'Na₂SO₄ + 2H₂O', 'Na₂S + H₂O', 'NaOHSO₄'],
      correctAnswer: 1
    },
    {
      question: 'Axit tác dụng với oxide bazơ tạo:',
      options: ['Kim loại', 'Muối + nước', 'Khí CO₂', 'Chỉ nước'],
      correctAnswer: 1
    },
    {
      question: 'Khi pha loãng H₂SO₄ đặc cần:',
      options: ['Đổ nước vào axit', 'Đổ axit vào nước từ từ, khuấy đều', 'Đun nóng trước', 'Không cần lưu ý'],
      correctAnswer: 1
    },
    {
      question: 'Ứng dụng đúng của H₂SO₄ là:',
      options: ['Nước giải khát', 'Ắc quy chì và phân bón', 'Gia vị', 'Thuốc tím'],
      correctAnswer: 1
    }
  ]
};
