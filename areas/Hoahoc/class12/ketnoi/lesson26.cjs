module.exports = {
  classId: 12,
  curriculumType: 'ketnoi',
  chapterId: 7,
  chapterName: 'Chương 7: Kim loại nhóm IA và IIA',
  lessonId: 26,
  title: 'Bài 26: Ôn tập chương 7',
  description: 'So sánh kim loại kiềm và kiềm thổ, nhận biết và bài tập áp dụng.',
  level: 'Intermediate',
  order: 26,
  theory: `
    <h2>Ôn tập kim loại nhóm IA, IIA</h2>
    <p style="margin:8px 0; color:#334155;">So sánh tính chất, nhận biết ion và luyện tập phản ứng đặc trưng của kim loại kiềm và kiềm thổ.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">So sánh tính chất</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>IA có 1e (ns1) khử mạnh hơn IIA (ns2).</li>
          <li>Hiđroxit: IA kiềm mạnh, tan; IIA bazơ mạnh nhưng Mg(OH)2 ít tan.</li>
          <li>Phản ứng với nước: IA (mạnh) > Ca,Sr,Ba > Mg (nóng).</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #cbd5e1; border-radius:10px; background:#fff7ed; color:#92400e;">
        <h4 style="margin:0 0 6px;">Nhận biết ion</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Màu ngọn lửa: Li đỏ, Na vàng, K tím; Ca đỏ gạch, Sr đỏ, Ba xanh lục.</li>
          <li>Kết tủa: BaSO4 trắng không tan; CaCO3 trắng ít tan; Mg(OH)2 trắng keo.</li>
          <li>Độ tan cacbonat: IA bền nhiệt; IIA dễ nhiệt phân.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Ứng dụng & bài tập</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Chu trình vôi-soda: CaCO3 → CaO → Ca(OH)2; Na2CO3 từ Solvay.</li>
          <li>Định tính nước cứng, làm mềm bằng Na2CO3, trao đổi ion.</li>
          <li>Viết phương trình với nước, axit, nhiệt phân muối, nhận biết mẫu.</li>
        </ul>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc); color:#0f172a;">
        <h4 style="margin:0 0 6px;">Bảng nhớ</h4>
        <ul style="margin:0; padding-left:18px; color:#334155;">
          <li>Màu ngọn lửa: Li đỏ, Na vàng, K tím; Ca đỏ gạch, Sr đỏ, Ba xanh lục.</li>
          <li>Độ tan hiđroxit: IA đều tan; IIA tăng Mg → Ba.</li>
          <li>Cacbonat: IA bền nhiệt; IIA phân huỷ tạo oxit + CO2.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#fffaf0; color:#92400e;">
        <h4 style="margin:0 0 6px;">Case & bẫy</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Mg không phản ứng nước lạnh; đừng quên lớp oxit bảo vệ.</li>
          <li>BaSO4 không tan cả trong axit loãng, khác với CaCO3 tan trong HCl.</li>
          <li>Chọn chất làm mềm: tạm thời (đun sôi), vĩnh cửu (Na2CO3/trao đổi ion).</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Ôn bài tập</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Viết chuỗi phản ứng nhận biết mẫu hỗn hợp muối IA/IIA bằng ngọn lửa + kết tủa.</li>
          <li>Tính khối lượng kết tủa khi thêm Na2CO3/NaOH vào dung dịch Ca2+, Ba2+.</li>
          <li>So sánh tốc độ phản ứng với nước của K, Na, Ca; giải thích bằng thế điện cực và năng lượng hoá hơi.</li>
        </ul>
      </div>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Nhóm nào có tính khử mạnh hơn?',
      options: ['IA', 'IIA', 'Như nhau', 'Phụ thuộc pH'],
      correctAnswer: 0,
      explanation: 'IA có 1e, ion hoá thấp hơn → khử mạnh hơn.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'BaSO4 kết tủa trắng không tan trong axit loãng.',
      correctAnswer: true,
      explanation: 'BaSO4 rất ít tan, hầu như không tan trong axit loãng.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Cacbonat nhóm IIA khi nung sẽ:',
      options: ['Không đổi', 'Chuyển thành oxit và CO2', 'Tạo peoxit', 'Tạo muối hidro'],
      correctAnswer: 1,
      explanation: 'MCO3 → MO + CO2 (nhiệt).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Màu ngọn lửa tím đặc trưng cho:',
      options: ['Na+', 'K+', 'Ca2+', 'Ba2+'],
      correctAnswer: 1,
      explanation: 'K+ cho màu tím.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Ca(OH)2 tan nhiều hơn Mg(OH)2.',
      correctAnswer: true,
      explanation: 'Độ tan tăng từ Mg(OH)2 → Ba(OH)2.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng nào dùng phát hiện Ca2+?',
      options: ['Na2CO3 tạo kết tủa', 'Thêm HCl khan', 'Thêm NaCl', 'Thêm KI'],
      correctAnswer: 0,
      explanation: 'CaCO3 trắng xuất hiện với CO3^2-.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Phản ứng Solvay chính: NH4HCO3 + NaCl → NaHCO3 + ______.',
      correctAnswer: 'NH4Cl',
      explanation: 'Sản phẩm còn lại là NH4Cl.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Kim loại nào phản ứng mạnh nhất với nước?',
      options: ['K', 'Ba', 'Na', 'Li'],
      correctAnswer: 0,
      explanation: 'K thuộc IA, hoạt động rất mạnh, mãnh liệt với nước.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Tại sao Mg không phản ứng với nước lạnh?',
      options: ['Không tan', 'Do lớp oxit mỏng bền và năng lượng hoạt hoá cao', 'Không có O2', 'Mg là kim loại quý'],
      correctAnswer: 1,
      explanation: 'Lớp oxit bảo vệ và phản ứng cần năng lượng cao.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Na2CO3 bền nhiệt hơn CaCO3.',
      correctAnswer: true,
      explanation: 'Cacbonat IA bền nhiệt, không phân huỷ ở nhiệt độ lò thường.',
      points: 10
    }
  ]
};
