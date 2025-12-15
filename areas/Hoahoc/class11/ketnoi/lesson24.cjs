module.exports = {
  classId: 11,
  curriculumType: 'ketnoi',
  chapterId: 6,
  chapterName: 'Chương 6: Hợp chất carbonyl - carboxylic acid',
  lessonId: 24,
  title: 'Bài 24: Carboxylic acid',
  description: 'R–COOH: tính axit, phản ứng thế ở nhóm chức, este hoá, ứng dụng.',
  level: 'Intermediate',
  order: 24,
  theory: `
    <h2>Axit cacboxylic</h2>
    <p style="margin:8px 0; color:#334155;">Hiểu tính axit, liên kết hidro dimer, phản ứng muối/este hoá và tính khử/oxi hoá của nhóm –COOH.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">Cấu tạo & tính axit</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Nhóm –COOH có cộng hưởng giữa C=O và C–O, làm H axit (pKa ~4–5 với axit béo).</li>
          <li>Tạo dimer bằng H-bond trong pha khí/lỏng, tăng T sôi.</li>
          <li>Hiệu ứng -I của nhóm carbonyl và O làm ổn định anion carboxylat.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
        <h4 style="margin:0 0 6px; color:#9a3412;">Phản ứng đặc trưng</h4>
        <ul style="margin:0; padding-left:18px; color:#7c2d12;">
          <li>Tạo muối với bazơ/carbonat: RCOOH + NaHCO3 → RCOONa + CO2 + H2O.</li>
          <li>Este hoá (Fischer): RCOOH + R'OH (H2SO4 đặc, t°) ⇌ RCOOR' + H2O.</li>
          <li>Thế –OH bằng Cl: RCOOH + SOCl2 → RCOCl + SO2 + HCl (hoạt hoá để tiếp tục phản ứng).</li>
          <li>Khử mạnh (LiAlH4) → ancol bậc 1.</li>
        </ul>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Ứng dụng & nguồn</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Axit fomic: thuộc da, dệt; axit axetic: giấm, dung môi, vinyl acetate.</li>
          <li>Axit benzoic: bảo quản; axit lactic: thực phẩm, mỹ phẩm.</li>
        </ul>
      </div>
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc); color:#334155;">
        <h4 style="margin:0 0 6px; color:#312e81;">Nhận biết & an toàn</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Phản ứng với NaHCO3 giải phóng CO2 sủi bọt (phân biệt với ancol/phenol).</li>
          <li>Mùi chua, ăn mòn nhẹ; làm việc nơi thoáng, tránh tiếp xúc trực tiếp axit đậm đặc.</li>
        </ul>
      </div>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Tính axit của R–COOH mạnh hơn ancol vì:',
      options: ['Khối lượng lớn', 'Anion carboxylat được cộng hưởng ổn định', 'Không có liên kết π', 'Có nhiều H hơn'],
      correctAnswer: 1,
      explanation: 'Cộng hưởng và hiệu ứng -I ổn định anion carboxylat.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng với NaHCO3 của axit cacboxylic tạo khí:',
      options: ['H2', 'CO', 'CO2', 'O2'],
      correctAnswer: 2,
      explanation: 'Axit + muối cacbonat/bicacbonat → CO2 sủi bọt.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Axit axetic có pKa khoảng 4.8.',
      correctAnswer: true,
      explanation: 'Phản ánh độ axit trung bình của axit béo đơn giản.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Điều kiện este hoá Fischer:',
      options: ['Xúc tác bazơ, nhiệt', 'H2SO4 đặc, đun nóng, loại nước', 'KMnO4', 'Ánh sáng'],
      correctAnswer: 1,
      explanation: 'Axit mạnh xúc tác và loại nước để dịch chuyển cân bằng tạo este.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Chất dùng hoạt hoá –COOH thành –COCl:',
      options: ['NaOH', 'SOCl2', 'KMnO4', 'HBr'],
      correctAnswer: 1,
      explanation: 'SOCl2 thay –OH bằng Cl, giải phóng SO2, HCl.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Carboxylate có thể khử bằng LiAlH4 thành ancol bậc 1.',
      correctAnswer: true,
      explanation: 'LiAlH4 khử mạnh –COOH/ester thành ancol.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Ứng dụng nổi bật của axit benzoic:',
      options: ['Làm nhiên liệu', 'Thuốc nhuộm', 'Chất bảo quản thực phẩm', 'Tẩy rửa kim loại'],
      correctAnswer: 2,
      explanation: 'Axit benzoic là chất bảo quản chống nấm mốc.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Dimer của axit cacboxylic tồn tại nhờ:',
      options: ['Liên kết ion', 'Liên kết kim loại', 'Liên kết hidro giữa hai nhóm –COOH', 'Liên kết cộng hoá trị mới'],
      correctAnswer: 2,
      explanation: 'Hai nhóm –COOH tạo hai H-bond, hình thành dimer.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Axit fomic có thể cho phản ứng tráng bạc.',
      correctAnswer: true,
      explanation: 'HCOOH có tính khử do chứa nhóm –CHO ẩn, khử Tollens.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Phản ứng: CH3COOH + C2H5OH ⇌ ______ + H2O',
      correctAnswer: 'CH3COOC2H5',
      explanation: 'Este hoá tạo etyl axetat.',
      points: 10
    }
  ]
};
