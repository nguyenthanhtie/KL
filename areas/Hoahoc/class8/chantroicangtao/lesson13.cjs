module.exports = {
  classId: 8,
  curriculumType: 'chantroicangtao',
  chapterId: 2,
  chapterName: "Chủ đề 2: Một số hợp chất vô cơ. Thang pH",
  lessonId: 13,
  title: 'Bài 13: Muối',
  order: 13,
  theory: `
    <h2>🧂 Bài 13: Muối</h2>
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

    <div style="margin:16px 0; padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; text-align:center; color:#475569;">
      <p style="margin:0 0 6px;"><strong>Placeholder hình/sơ đồ</strong>:</p>
      <p style="margin:0 0 4px;">Bảng tính tan muối phổ biến: <em>/images/hoahoc/lesson13-solubility.png</em></p>
      <p style="margin:0;">Sơ đồ phân loại muối: <em>/images/hoahoc/lesson13-salts.png</em></p>
    </div>
  `,
  game: [
    {
      question: 'Muối là hợp chất giữa:',
      options: ['Kim loại và kim loại', 'Cation kim loại/NH₄⁺ và anion gốc acid', 'Hai phi kim', 'Kim loại và hydro'],
      correctAnswer: 1
    },
    {
      question: 'Muối acid khác muối trung hòa ở chỗ:',
      options: ['Không có gốc acid', 'Còn H chưa thay thế hết', 'Chỉ chứa kim loại', 'Không tan trong nước'],
      correctAnswer: 1
    },
    {
      question: 'Điều kiện để phản ứng trao đổi tạo muối xảy ra là có:',
      options: ['Chỉ cần trộn', 'Kết tủa/khí/điện li yếu tạo thành', 'Nhiệt độ cao', 'Ánh sáng mạnh'],
      correctAnswer: 1
    },
    {
      question: 'Sản phẩm kết tủa khi NaCl + AgNO₃ là:',
      options: ['NaNO₃', 'AgCl', 'Ag', 'Na'],
      correctAnswer: 1
    },
    {
      question: 'CaCO₃ + 2HCl tạo khí:',
      options: ['H₂', 'O₂', 'CO₂', 'Cl₂'],
      correctAnswer: 2
    },
    {
      question: 'Muối nào ít tan trong nước?',
      options: ['NaCl', 'KNO₃', 'AgCl', 'Na₂SO₄'],
      correctAnswer: 2
    },
    {
      question: 'Cu(OH)₂ kết tủa màu:',
      options: ['Trắng', 'Lam', 'Đen', 'Vàng'],
      correctAnswer: 1
    },
    {
      question: 'Phản ứng trung hòa cho sản phẩm:',
      options: ['Chỉ muối', 'Muối + nước', 'Chỉ nước', 'Chỉ khí'],
      correctAnswer: 1
    },
    {
      question: 'Ứng dụng đúng của KNO₃:',
      options: ['Gia vị', 'Phân bón', 'Dược phẩm an thần', 'Thuốc nhuộm'],
      correctAnswer: 1
    },
    {
      question: 'CuSO₄ thường dùng trong:',
      options: ['Tẩy gỉ thép', 'Phun phòng nấm (boóc-đô)', 'Chế biến thực phẩm', 'Pha đồ uống'],
      correctAnswer: 1
    }
  ]
};
