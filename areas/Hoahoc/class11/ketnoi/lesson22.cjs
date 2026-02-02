module.exports = {
  classId: 11,
  curriculumType: 'ketnoi',
  chapterId: 5,
  chapterName: 'Chương 5: Dẫn xuất halogen - alcohol - phenol',
  lessonId: 22,
  title: 'Bài 22: Ôn tập chương 5',
  description: 'Tổng hợp halogenoankan, ancol, phenol: cấu tạo, phản ứng và ứng dụng.',
  level: 'Intermediate',
  order: 22,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Ôn tập dẫn xuất halogen - ancol - phenol',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Tổng hợp phản ứng then chốt và nhận biết của R-X, R-OH và Ar-OH.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'So sánh liên kết',
            content: 'R-X: phân cực, X rời tốt (I > Br > Cl); dễ SN/E.\nR-OH: -OH không phải nhóm rời tốt, cần proton hoá hay biến thành halogen để thế.\nAr-OH (phenol): liên hợp với vòng, axit hơn ancol; vòng hoạt hoá o,p.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'warningBox',
        content: {
            title: 'Phản ứng trọng tâm',
            content: 'Halogenoankan: SN1/SN2, E1/E2, Grignard.\nAncol: tách nước (ete/anken), oxi hoá (bậc 1 → anđehit/axit, bậc 2 → xeton).\nPhenol: tạo phenolat, brom hoá 2,4,6-tribromphenol, màu tím với FeCl3.',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Chuỗi chuyển hoá gợi ý',
            content: 'R-X → (KOH/H2O) R-OH → (H2SO4, 180°C) anken.\nBenzen → (nitro hoá) nitrobenzen → (khử) anilin → (diazoni hoá) phenol.\nR-X + Mg (ete khan) → RMgX → (HCHO) ancol bậc 1.',
            color: 'gray',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Nhóm rời tốt nhất trong dãy:',
      options: ['F', 'Cl', 'Br', 'I'],
      correctAnswer: 3,
      explanation: 'I- là nhóm rời tốt nhất nhờ liên kết C-I yếu.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng phân biệt phenol và etanol nhanh nhất:',
      options: ['Tác dụng Na', 'Tác dụng HCl', 'Dùng dung dịch Br2 hoặc FeCl3', 'Chưng cất'],
      correctAnswer: 2,
      explanation: 'Phenol cho màu với FeCl3 hoặc kết tủa trắng với dd Br2; etanol không.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Ancol bậc 3 dễ tham gia phản ứng SN1 hơn bậc 1.',
      correctAnswer: true,
      explanation: 'Carbocation bậc 3 bền hơn nên SN1 thuận lợi.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Sản phẩm khi đun R-X với KOH/etanol chủ yếu là:',
      options: ['R-OH', 'Alken', 'Ankin', 'Ete'],
      correctAnswer: 1,
      explanation: 'Base mạnh, dung môi anhidric → ưu tiên tách E2 tạo anken.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Sản phẩm brom hoá phenol trong dung dịch:',
      options: ['p-bromphenol', '2,4,6-tribromphenol', '1,3,5-tribrombenzen', 'Không phản ứng'],
      correctAnswer: 1,
      explanation: '-OH hoạt hoá mạnh → thế 3 vị trí o,p tạo kết tủa trắng.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Halogenoankan bậc 1 dễ tham gia SN2.',
      correctAnswer: true,
      explanation: 'Ít cản trở lập thể, một bước tấn công ngược hướng.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Tách nước etanol 140°C cho sản phẩm chính:',
      options: ['Eten', 'Dietyl ete', 'Axetilen', 'Metan'],
      correctAnswer: 1,
      explanation: '140°C → ete hoá liên phân tử tạo dietyl ete.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Thuốc thử Grignard hình thành từ:',
      options: ['R-OH + Mg', 'R-X + Mg trong ete khan', 'R-X + Na', 'R-COOH + Mg'],
      correctAnswer: 1,
      explanation: 'Magie chèn vào liên kết C-X trong dung môi ete khan.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Phenol mạnh hơn ancol nên phản ứng với NaHCO3 dễ dàng.',
      correctAnswer: false,
      explanation: 'Phenol vẫn yếu hơn H2CO3 nên không đẩy được CO2.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'R-X + Mg (ete khan) → ______',
      correctAnswer: 'RMgX',
      explanation: 'Tạo thuốc thử Grignard (organomagie halogenua).',
      points: 10
    }
  ]
};
