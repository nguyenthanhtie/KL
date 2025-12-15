module.exports = {
  classId: 11,
  curriculumType: 'ketnoi',
  chapterId: 6,
  chapterName: 'Chương 6: Hợp chất carbonyl - carboxylic acid',
  lessonId: 23,
  title: 'Bài 23: Hợp chất carbonyl',
  description: 'Anđehit và xeton: nhóm C=O, tính oxi hoá/khử, phản ứng đặc trưng.',
  level: 'Intermediate',
  order: 23,
  theory: `
    <h2>Hợp chất carbonyl</h2>
    <p style="margin:8px 0; color:#334155;">So sánh anđehit và xeton về tính oxi hoá/khử, phản ứng cộng nucleophin và phép nhận biết.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">Nhóm C=O</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Phân cực: Cδ+ dễ bị tấn công bởi nucleophin; Oδ− có thể bị proton hoá.</li>
          <li>Phản ứng cộng nucleophin kèm proton hoá: tạo ancol, xianohydrin (HCN), hemiacetal/acetal (ROH, axit).</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
        <h4 style="margin:0 0 6px; color:#9a3412;">Anđehit vs Xeton</h4>
        <ul style="margin:0; padding-left:18px; color:#7c2d12;">
          <li>Anđehit (R–CHO): dễ bị oxi hoá nhẹ → axit; tham gia tráng bạc/Fehling (trừ HCHO mạnh hơn).</li>
          <li>Xeton (R2C=O): khó oxi hoá (không tráng bạc), cần chất oxi hoá mạnh mới cắt mạch.</li>
          <li>Khử bằng H2/Ni → ancol bậc 1 (từ anđehit) hoặc bậc 2 (từ xeton).</li>
        </ul>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Nhận biết</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Thuốc thử Tollens: anđehit → Ag gương bạc.</li>
          <li>Fehling: anđehit mạch hở (trừ thơm) → kết tủa đỏ gạch Cu2O.</li>
          <li>Xeton không phản ứng Tollens/Fehling (trừ α-hydroxy xeton đặc biệt).</li>
        </ul>
      </div>
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc); color:#334155;">
        <h4 style="margin:0 0 6px; color:#312e81;">Ứng dụng</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Formaldehyde: nhựa, chất sát khuẩn; Acetaldehyde: trung gian tổng hợp.</li>
          <li>Acetone: dung môi công nghiệp, tẩy rửa; methyl ethyl ketone dùng sơn.</li>
        </ul>
      </div>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Thuốc thử Tollens cho phản ứng với:',
      options: ['Acetone', 'Benzophenone', 'Etanal', 'Propanone'],
      correctAnswer: 2,
      explanation: 'Anđehit (như etanal, formaldehyde) khử Tollens tạo gương bạc; xeton không phản ứng.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Sản phẩm khử butan-2-one bằng H2/Ni là:',
      options: ['Butan-2-ol', 'Butan-1-ol', 'Butanal', 'But-2-ene'],
      correctAnswer: 0,
      explanation: 'Xeton khử → ancol bậc 2 tương ứng.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Anđehit bị oxi hoá bởi KMnO4 loãng thành axit cacboxylic.',
      correctAnswer: true,
      explanation: 'Anđehit dễ bị oxi hoá mạnh thành axit tương ứng.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng tạo xianohydrin từ anđehit cần:',
      options: ['HCN có xúc tác bazơ', 'Br2', 'H2SO4 đặc', 'Na'],
      correctAnswer: 0,
      explanation: 'HCN/NaCN tấn công C=O tạo RCH(OH)CN.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Hợp chất không cho phản ứng Fehling:',
      options: ['Glucozơ', 'Formaldehyde', 'Acetone', 'Axit fomic'],
      correctAnswer: 2,
      explanation: 'Xeton (acetone) không bị oxi hoá bởi Fehling.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Acetal được tạo khi anđehit tác dụng hai phân tử ancol trong axit.',
      correctAnswer: true,
      explanation: 'Anđehit + 2ROH (H+) → acetal (bảo vệ nhóm C=O).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Xeton thường kém hoạt động hơn anđehit vì:',
      options: ['Có ít nhóm ankyl', 'Không phân cực', 'Cản trở không gian và hiệu ứng đẩy e của 2 nhóm ankyl', 'Do bền thơm'],
      correctAnswer: 2,
      explanation: 'Hai nhóm ankyl đẩy e và cản trở không gian làm giảm hoạt tính.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng gương bạc của axit fomic (HCOOH):',
      options: ['Không xảy ra', 'Xảy ra vì HCOOH có tính khử như anđehit', 'Cần xúc tác kiềm mạnh', 'Cho kết tủa Cu2O'],
      correctAnswer: 1,
      explanation: 'HCOOH có nhóm –CHO ẩn nên khử Tollens tạo Ag.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Acetone là dung môi phân cực dễ bay hơi.',
      correctAnswer: true,
      explanation: 'Acetone (propanone) phân cực vừa, bay hơi nhanh, hoà tan tốt.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'C2H5CHO + [O] → ______',
      correctAnswer: 'CH3COOH',
      explanation: 'Etanal oxi hoá thành axit axetic.',
      points: 10
    }
  ]
};
