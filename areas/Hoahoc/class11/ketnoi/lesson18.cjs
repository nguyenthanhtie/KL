module.exports = {
  classId: 11,
  curriculumType: 'ketnoi',
  chapterId: 4,
  chapterName: 'Chương 4: Hydrocarbon',
  lessonId: 18,
  title: 'Bài 18: Ôn tập chương 4',
  description: 'Tổng hợp ankan, anken, ankin, arene: cấu trúc, phản ứng đặc trưng, ứng dụng.',
  level: 'Intermediate',
  order: 18,
  theory: `
    <h2>Ôn tập Hydrocarbon</h2>
    <p style="margin:8px 0; color:#334155;">Hệ thống hoá cấu trúc, phản ứng đặc trưng và chuỗi chuyển hoá giữa ankan, anken, ankin, arene.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">So sánh nhanh</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Ankan (sp3, no): phản ứng thế gốc tự do, cháy, cracking.</li>
          <li>Anken/ankin (sp2/sp): cộng điện tử, trùng hợp; ankin đầu mạch phản ứng bạc.</li>
          <li>Arene (thơm): SEAr thế electrophin, định hướng o,p/m tuỳ nhóm thế.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
        <h4 style="margin:0 0 6px; color:#9a3412;">Chuỗi chuyển hoá</h4>
        <ul style="margin:0; padding-left:18px; color:#7c2d12;">
          <li>Ankan → (cracking) anken/ankin; anken → (cộng H2) ankan; anken → (trùng hợp) polyme.</li>
          <li>Anken → (cộng HX) halogenoalkan → (KOH alc) anken; ankin → (hydro hoá) anken/alkan.</li>
          <li>Benzen → (Friedel–Crafts) dẫn xuất alkyl/acy; → (nitro hoá/ sulfo hoá) dẫn xuất nitro/sulfo.</li>
        </ul>
      </div>
    </div>

    <div style="padding:12px; border-radius:12px; border:1px dashed #cbd5e1; background:#f8fafc; color:#475569;">
      <h4 style="margin:0 0 6px;">Nhận biết</h4>
      <ul style="margin:0; padding-left:18px;">
        <li>Anken/ankin: làm mất màu Br2/CCl4.</li>
        <li>Ankin đầu mạch: kết tủa AgC≡C–R (tráng bạc/Fehling).</li>
        <li>Arene: khó phản ứng cộng, ưu tiên thế; khó nhận biết đơn giản → so sánh tính trơ tương đối.</li>
      </ul>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Thuốc thử phân biệt anken và ankan:',
      options: ['NaOH', 'Br2/CCl4', 'H2SO4 loãng', 'KMnO4 đặc'],
      correctAnswer: 1,
      explanation: 'Anken cộng Br2 làm mất màu; ankan không phản ứng.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Ankin đầu mạch phản ứng với:',
      options: ['Dung dịch AgNO3/NH3', 'NaCl', 'HCl', 'Br2/CCl4'],
      correctAnswer: 0,
      explanation: 'Tạo kết tủa muối bạc acetylua trắng.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Benzen ưu tiên phản ứng thế electrophin hơn cộng.',
      correctAnswer: true,
      explanation: 'Tính thơm ổn định khiến benzen chọn phản ứng thế.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Sản phẩm chính của hydrat hoá propen (H3PO4, t°) theo Markovnikov là:',
      options: ['1-propanol', '2-propanol', 'Prop-2-en-1-ol', 'Axit propionic'],
      correctAnswer: 1,
      explanation: 'H+ cộng vào C giàu H → 2-propanol.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Cracking butan có thể tạo hỗn hợp chứa:',
      options: ['Chỉ metan', 'Eten và etan', 'Chỉ CO2', 'Benzen'],
      correctAnswer: 1,
      explanation: 'Cracking tạo anken/ankan nhẹ hơn: C4H10 → C2H4 + C2H6...',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Trùng hợp etilen tạo polyme mạch nhánh nhiều.',
      correctAnswer: false,
      explanation: 'Tuỳ điều kiện; HDPE hầu như không nhánh; LDPE có nhánh. Phát biểu “nhiều” không luôn đúng.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Định hướng o,p là đặc trưng của nhóm thế:',
      options: ['–NO2', '–COOH', '–SO3H', '–CH3'],
      correctAnswer: 3,
      explanation: '–CH3 hoạt hoá và định hướng o,p.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Anken cộng KMnO4 loãng, lạnh tạo:',
      options: ['Ankan', 'Điol vicinal', 'Axit cacboxylic', 'Muội than'],
      correctAnswer: 1,
      explanation: 'Oxi hoá mềm tạo cis-diol.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Ankan cháy không khói do tỉ lệ H/C cao.',
      correctAnswer: true,
      explanation: 'Ankan có H nhiều hơn → cháy sạch hơn, ít muội.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Phản ứng thế gốc tự do: CH4 + Cl2 (as) → ______ + HCl',
      correctAnswer: 'CH3Cl',
      explanation: 'Ankan trải qua thế tạo halogenoankan.',
      points: 10
    }
  ]
};
