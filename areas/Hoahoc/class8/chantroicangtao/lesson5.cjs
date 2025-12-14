module.exports = {
  classId: 8,
  curriculumType: 'chantroicangtao',
  chapterId: 1,
  chapterName: "Chủ đề 1: Phản ứng hóa học",
  lessonId: 5,
  title: 'Bài 5: Mol và tỉ khối chất khí',
  order: 5,
  theory: `
    <h2>🧩 Bài 5: Mol và tỉ khối chất khí</h2>
    <p style="margin:10px 0; color:#334155;">Mục tiêu: hiểu mol, quy đổi n–m–M, tính nhanh thể tích khí và tỉ khối so với H₂/không khí.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); margin:14px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 8px; color:#0f172a;">Mol & Avogadro</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>1 mol = 6,02 × 10²³ hạt.</li>
          <li>Khối lượng mol (M): g/mol.</li>
          <li>Số mol: <strong>n = m/M</strong>.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#ecfeff;">
        <h4 style="margin:0 0 8px; color:#0e7490;">Thể tích mol khí (đktc)</h4>
        <ul style="margin:0; padding-left:18px; color:#0f172a;">
          <li>1 mol khí bất kỳ: 22,4 L.</li>
          <li><strong>V = n × 22,4 (L)</strong>.</li>
          <li>0,5 mol CO₂ → 11,2 L.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
        <h4 style="margin:0 0 8px; color:#9a3412;">Tỉ khối chất khí</h4>
        <ul style="margin:0; padding-left:18px; color:#7c2d12;">
          <li>d(A/B) = M(A)/M(B).</li>
          <li>d so với H₂: d = M/2.</li>
          <li>d so với không khí: d ≈ M/29.</li>
        </ul>
      </div>
    </div>

    <div style="margin:16px 0; padding:14px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc);">
      <h3 style="margin:0 0 8px; color:#312e81;">Ví dụ tính nhanh</h3>
      <ul style="margin:0; padding-left:18px; color:#334155;">
        <li>M(O₂) = 32 g/mol ⇒ d(O₂/kk) ≈ 32/29 ≈ 1,1.</li>
        <li>0,2 mol CO₂ → m = 0,2 × 44 = 8,8 g.</li>
        <li>n = m/M: 11 g CO₂ ⇒ n ≈ 11/44 = 0,25 mol ⇒ V = 5,6 L.</li>
      </ul>
    </div>

    <div style="margin:14px 0; padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f0f9ff;">
      <h4 style="margin:0 0 8px; color:#0f172a;">Mini quiz đọc nhanh</h4>
      <ol style="margin:0; padding-left:18px; color:#334155;">
        <li>Tính n từ m = 8,8 g CO₂.</li>
        <li>Tính V của 0,3 mol N₂ ở đktc.</li>
        <li>d(O₂/H₂) bằng bao nhiêu?</li>
      </ol>
      <p style="margin:8px 0 0; font-size:13px; color:#475569;">Tự giải trước khi làm 10 câu test.</p>
    </div>

    <div style="margin:16px 0; padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; text-align:center; color:#475569;">
      <p style="margin:0 0 6px;"><strong>Placeholder hình/sơ đồ</strong>:</p>
      <p style="margin:0 0 4px;">Sơ đồ n–m–M và V=22,4n: <em>/images/hoahoc/lesson5-formulas.png</em></p>
      <p style="margin:0;">Bảng tỉ khối phổ biến: <em>/images/hoahoc/lesson5-density.png</em></p>
    </div>
  `,
  game: [
    {
      question: 'Thể tích 1 mol khí ở đktc là:',
      options: ['1 L', '11,2 L', '22,4 L', '44,8 L'],
      correctAnswer: 2
    },
    {
      question: 'Số Avogadro xấp xỉ là:',
      options: ['6,02 × 10²³ hạt/mol', '6,02 × 10²⁰ hạt/mol', '6,02 × 10²⁶ hạt/mol', '6,02 × 10³ hạt/mol'],
      correctAnswer: 0
    },
    {
      question: 'Khối lượng mol (M) có đơn vị:',
      options: ['mol', 'g/mol', 'g', 'L'],
      correctAnswer: 1
    },
    {
      question: 'Công thức liên hệ thể tích khí và số mol ở đktc:',
      options: ['V = n × 22,4 (L)', 'V = n / 22,4', 'V = M / n', 'V = 22,4 / M'],
      correctAnswer: 0
    },
    {
      question: 'Tỉ khối của khí A so với không khí được tính xấp xỉ:',
      options: ['d = M/2', 'd = 29/M', 'd = M/29', 'd = 2/M'],
      correctAnswer: 2
    },
    {
      question: 'Khối lượng 0,2 mol CO₂ là:',
      options: ['8,8 g', '4,4 g', '2,2 g', '44 g'],
      correctAnswer: 0
    },
    {
      question: 'Công thức tính số mol từ khối lượng?',
      options: ['n = m × M', 'n = m / M', 'n = V × 22,4', 'n = M / m'],
      correctAnswer: 1
    },
    {
      question: 'Tỉ khối của CO₂ so với H₂ là:',
      options: ['44', '22', '11', 'd = M/2 = 44/2 = 22'],
      correctAnswer: 3
    },
    {
      question: '0,25 mol N₂ có thể tích ở đktc là:',
      options: ['5,6 L', '11,2 L', '22,4 L', '44,8 L'],
      correctAnswer: 0
    },
    {
      question: 'Thể tích 2 mol khí ở đktc là:',
      options: ['11,2 L', '22,4 L', '33,6 L', '44,8 L'],
      correctAnswer: 3
    }
  ]
};
