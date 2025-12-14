module.exports = {
  classId: 8,
  curriculumType: 'chantroicangtao',
  chapterId: 2,
  chapterName: "Chủ đề 2: Một số hợp chất vô cơ. Thang pH",
  lessonId: 12,
  title: 'Bài 12: Oxide',
  order: 12,
  theory: `
    <h2>🪨 Bài 12: Oxide</h2>
    <p style="margin:10px 0; color:#334155;">Mục tiêu: nhận diện oxide, phân loại, gọi tên, điều chế và ứng dụng.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); margin:14px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 8px; color:#0f172a;">Định nghĩa & phân loại</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Oxide: hợp chất gồm O và 1 nguyên tố khác.</li>
          <li>Oxide bazơ (kim loại): Na₂O, CaO, CuO... phản ứng với acid.</li>
          <li>Oxide acid (phi kim): CO₂, SO₂, P₂O₅... phản ứng với bazơ.</li>
          <li>Oxide lưỡng tính: Al₂O₃, ZnO (phản ứng được với cả acid và bazơ).</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#ecfeff;">
        <h4 style="margin:0 0 8px; color:#0e7490;">Gọi tên & phản ứng tiêu biểu</h4>
        <ul style="margin:0; padding-left:18px; color:#0f172a;">
          <li>Gọi: [Tên nguyên tố] + oxide; nhiều hóa trị ghi số La Mã (FeO sắt(II), Fe₂O₃ sắt(III)).</li>
          <li>CaO + H₂O → Ca(OH)₂ (oxide bazơ + nước tạo bazơ).</li>
          <li>SO₂ + 2NaOH → Na₂SO₃ + H₂O (oxide acid + bazơ).</li>
        </ul>
      </div>
    </div>

    <div style="margin:16px 0; padding:14px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc);">
      <h3 style="margin:0 0 8px; color:#312e81;">Điều chế</h3>
      <ul style="margin:0; padding-left:18px; color:#334155;">
        <li>Đốt cháy đơn chất: 2Mg + O₂ → 2MgO; C + O₂ → CO₂.</li>
        <li>Nhiệt phân: CaCO₃ → CaO + CO₂; Cu(OH)₂ → CuO + H₂O.</li>
      </ul>
    </div>

    <div style="margin:14px 0; display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr));">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
        <h4 style="margin:0 0 8px; color:#9a3412;">Ứng dụng nhanh</h4>
        <ul style="margin:0; padding-left:18px; color:#7c2d12;">
          <li>CaO: sản xuất vôi.</li>
          <li>CO₂: chữa cháy, nước giải khát.</li>
          <li>Al₂O₃: luyện nhôm; Fe₂O₃/Fe₃O₄: quặng sắt.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f0f9ff;">
        <h4 style="margin:0 0 8px; color:#0f172a;">Mini quiz đọc nhanh</h4>
        <ol style="margin:0; padding-left:18px; color:#334155;">
          <li>Oxide lưỡng tính là gì? Ví dụ?</li>
          <li>Phản ứng CaO + H₂O cho sản phẩm nào?</li>
          <li>Gọi tên Fe₂O₃?</li>
        </ol>
        <p style="margin:8px 0 0; font-size:13px; color:#475569;">Tự trả lời trước khi làm test.</p>
      </div>
    </div>

    <div style="margin:16px 0; padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; text-align:center; color:#475569;">
      <p style="margin:0 0 6px;"><strong>Placeholder hình/sơ đồ</strong>:</p>
      <p style="margin:0 0 4px;">Bảng phân loại oxide: <em>/images/hoahoc/lesson12-oxides.png</em></p>
      <p style="margin:0;">Quá trình nung đá vôi: <em>/images/hoahoc/lesson12-caco3.png</em></p>
    </div>
  `,
  game: [
    {
      question: 'Oxide là hợp chất của:',
      options: ['Hai kim loại', 'Một phi kim và hydro', 'Hai nguyên tố, có oxygen', 'Chỉ oxygen'],
      correctAnswer: 2
    },
    {
      question: 'Oxide acid thường phản ứng với:',
      options: ['Kim loại', 'Oxide bazơ hoặc bazơ', 'Khí trơ', 'Muối trung tính'],
      correctAnswer: 1
    },
    {
      question: 'Oxide bazơ tan (kiềm) gồm:',
      options: ['Na₂O, K₂O', 'CO₂, SO₂', 'P₂O₅', 'SiO₂'],
      correctAnswer: 0
    },
    {
      question: 'Phản ứng CaO + H₂O → Ca(OH)₂ minh họa tính chất:',
      options: ['Oxide acid + nước', 'Oxide bazơ + nước tạo bazơ', 'Oxide lưỡng tính + nước', 'Không phản ứng'],
      correctAnswer: 1
    },
    {
      question: 'SO₂ + 2NaOH → Na₂SO₃ + H₂O thuộc loại:',
      options: ['Oxide bazơ + bazơ', 'Oxide acid + bazơ', 'Oxide bazơ + acid', 'Oxide acid + muối'],
      correctAnswer: 1
    },
    {
      question: 'Điều chế CaO trong công nghiệp thường bằng:',
      options: ['Đốt Mg trong O₂', 'Nhiệt phân đá vôi CaCO₃', 'Điện phân nước', 'Đốt H₂ trong O₂'],
      correctAnswer: 1
    },
    {
      question: 'Oxide lưỡng tính có thể phản ứng với cả acid và bazơ. Ví dụ:',
      options: ['Al₂O₃', 'Na₂O', 'SO₂', 'CO₂'],
      correctAnswer: 0
    },
    {
      question: 'Chất nào là oxide bazơ?',
      options: ['CO₂', 'SO₂', 'CuO', 'P₂O₅'],
      correctAnswer: 2
    },
    {
      question: 'CO₂ + Ca(OH)₂ → CaCO₃ + H₂O là phản ứng giữa:',
      options: ['Oxide bazơ và nước', 'Oxide acid và bazơ', 'Oxide acid và acid', 'Oxide bazơ và bazơ'],
      correctAnswer: 1
    },
    {
      question: 'Tên gọi Fe₂O₃ là:',
      options: ['Sắt oxide', 'Sắt(II) oxide', 'Sắt(III) oxide', 'Sắt(I) oxide'],
      correctAnswer: 2
    }
  ]
};
