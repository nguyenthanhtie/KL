module.exports = {
  classId: 11,
  curriculumType: 'ketnoi',
  chapterId: 2,
  chapterName: 'Chương 2: Nitrogen - sulfur',
  lessonId: 9,
  title: 'Bài 9: Ôn tập chương 2',
  description: 'Tổng hợp N, NH3, muối amoni, oxit N; S, SO2, H2SO4 và sunfat.',
  level: 'Intermediate',
  order: 9,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Ôn tập Nitrogen - sulfur',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Tổng hợp chuỗi chuyển hoá N và S, bài tập nhận biết, cân bằng phản ứng và liên hệ môi trường.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Nitrogen',
            content: 'N2 bền, cần nhiệt/xúc tác để phản ứng (Haber: N2 + 3H2 ⇌ 2NH3).\nNH3: bazơ yếu, khử mạnh với Cl2, O2; muối amoni dễ bị kiềm đẩy NH3.\nOxit N: NO (khử), NO2 (oxi hoá), N2O5 (anhiđrit HNO3); chuỗi Ostwald: NH3 → NO → NO2 → HNO3.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'warningBox',
        content: {
            title: 'Sulfur',
            content: 'S rắn, cháy tạo SO2; SO2 khử/oxi hoá yếu, tiền chất H2SO4.\nH2SO4 loãng: axit mạnh; H2SO4 đặc: háo nước, oxi hoá nóng.\nNhận biết: SO4^{2-} (BaCl2/HCl), NH4+ (NaOH đun nóng, mùi khai), NO3- (thí nghiệm vòng nâu với FeSO4/H2SO4).',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Liên hệ môi trường',
            content: 'NOx, SO2 → mưa axit (HNO3, H2SO4) → ăn mòn, hại rừng, axit hoá nước.\nKiểm soát: xúc tác SCR khử NOx bằng NH3/ure; khử SO2 bằng hấp thụ CaCO3/Ca(OH)2.',
            color: 'gray',
            listType: 'bullet'
        }
    }
  ],
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
