module.exports = {
  classId: 11,
  curriculumType: 'ketnoi',
  chapterId: 2,
  chapterName: 'Chương 2: Nitrogen – sulfur',
  lessonId: 9,
  title: 'Bài 9: Ôn tập chương 2',
  description: 'Tổng hợp N, NH3, muối amoni, oxit N; S, SO2, H2SO4 và sunfat.',
  level: 'Intermediate',
  order: 9,
  theory: `
    <h2>Ôn tập Nitrogen – sulfur</h2>
    <p style="margin:8px 0; color:#334155;">Tổng hợp chuỗi chuyển hoá N và S, bài tập nhận biết, cân bằng phản ứng và liên hệ môi trường.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">Nitrogen</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>N2 bền, cần nhiệt/xúc tác để phản ứng (Haber: N2 + 3H2 ⇌ 2NH3).</li>
          <li>NH3: bazơ yếu, khử mạnh với Cl2, O2; muối amoni dễ bị kiềm đẩy NH3.</li>
          <li>Oxit N: NO (khử), NO2 (oxi hoá), N2O5 (anhiđrit HNO3); chuỗi Ostwald: NH3 → NO → NO2 → HNO3.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
        <h4 style="margin:0 0 6px; color:#9a3412;">Sulfur</h4>
        <ul style="margin:0; padding-left:18px; color:#7c2d12;">
          <li>S rắn, cháy tạo SO2; SO2 khử/oxi hoá yếu, tiền chất H2SO4.</li>
          <li>H2SO4 loãng: axit mạnh; H2SO4 đặc: háo nước, oxi hoá nóng.</li>
          <li>Nhận biết: SO4^{2-} (BaCl2/HCl), NH4+ (NaOH đun nóng, mùi khai), NO3- (thí nghiệm vòng nâu với FeSO4/H2SO4).</li>
        </ul>
      </div>
    </div>

    <div style="padding:12px; border-radius:12px; border:1px dashed #cbd5e1; background:#f8fafc; color:#475569;">
      <h4 style="margin:0 0 6px;">Liên hệ môi trường</h4>
      <ul style="margin:0; padding-left:18px;">
        <li>NOx, SO2 → mưa axit (HNO3, H2SO4) → ăn mòn, hại rừng, axit hoá nước.</li>
        <li>Kiểm soát: xúc tác SCR khử NOx bằng NH3/ure; khử SO2 bằng hấp thụ CaCO3/Ca(OH)2.</li>
      </ul>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Chuỗi Ostwald đúng là:',
      options: ['NH3 → NO2 → NO → HNO3', 'NH3 → NO → NO2 → HNO3', 'N2 → NH3 → N2O → HNO3', 'NH3 → N2 → NO → NO2'],
      correctAnswer: 1,
      explanation: 'Ostwald: oxi hoá NH3 thành NO, rồi NO2, hấp thụ tạo HNO3.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Thuốc thử nhận biết ion SO4^{2-}:',
      options: ['AgNO3/HNO3', 'BaCl2 trong HCl loãng', 'NaOH', 'NH4Cl'],
      correctAnswer: 1,
      explanation: 'BaSO4 kết tủa trắng bền với axit loãng.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'H2SO4 đặc nóng oxi hoá Cu tạo khí H2.',
      correctAnswer: false,
      explanation: 'Sản phẩm khí là SO2, không phải H2.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Khí dùng trong SCR để khử NOx là:',
      options: ['CO2', 'NH3 hoặc ure phân huỷ', 'SO2', 'Cl2'],
      correctAnswer: 1,
      explanation: 'NH3/ure làm tác nhân khử NOx trên xúc tác.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Muối nào dễ bị NaOH đẩy giải phóng NH3?',
      options: ['NH4Cl', 'NaNO3', 'BaSO4', 'K2SO4'],
      correctAnswer: 0,
      explanation: 'Muối amoni bị kiềm mạnh đẩy NH3.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'NO2 là chất oxi hoá mạnh hơn NO.',
      correctAnswer: true,
      explanation: 'NO2 có số oxi hoá +4, dễ nhận e hơn NO (+2).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Mưa axit chủ yếu chứa:',
      options: ['H2CO3 và H3PO4', 'HNO3 và H2SO4', 'HF và HCl', 'CH3COOH'],
      correctAnswer: 1,
      explanation: 'NOx → HNO3, SO2 → H2SO4 trong khí quyển.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Trong phản ứng Haber, yếu tố tăng hiệu suất NH3:',
      options: ['Giảm áp suất', 'Tăng nhiệt độ quá cao', 'Sử dụng xúc tác Fe, áp suất cao', 'Dùng N2 tinh khiết 50%'],
      correctAnswer: 2,
      explanation: 'Áp suất cao, xúc tác Fe/Al2O3/K2O, nhiệt độ vừa (~450°C).',
      points: 10
    },
    {
      type: 'true-false',
      question: 'BaSO4 tan trong HCl loãng.',
      correctAnswer: false,
      explanation: 'BaSO4 rất ít tan, bền với axit loãng.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Phản ứng nhận biết NH4+: NH4Cl + NaOH (đun) → ______ + NaCl + H2O',
      correctAnswer: 'NH3↑',
      explanation: 'Khí NH3 mùi khai, làm quỳ tím hoá xanh.',
      points: 10
    }
  ]
};
