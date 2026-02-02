module.exports = {
  classId: 11,
  curriculumType: 'ketnoi',
  chapterId: 5,
  chapterName: 'Chương 5: Dẫn xuất halogen - alcohol - phenol',
  lessonId: 21,
  title: 'Bài 21: Phenol',
  description: 'C6H5OH: tính axit yếu, phản ứng thế vòng, so sánh với ancol.',
  level: 'Intermediate',
  order: 21,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Phenol',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Phân tích tính axit, phản ứng thế vòng định hướng o,p và so sánh phenol với ancol.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Tính chất',
            content: '-OH gắn trực tiếp vòng thơm → liên hợp, làm H trên O axit hơn ancol (pKa ~10).\nTạo muối phenolat với kiềm: C6H5OH + NaOH → C6H5ONa + H2O (không phản ứng với NaHCO3).\nH-bond làm phenol rắn (nhiệt độ nóng chảy cao hơn ancol tương khối lượng).',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'warningBox',
        content: {
            title: 'Phản ứng đặc trưng',
            content: 'Thế halogen nhẹ: C6H5OH + 3Br2 (dd) → 2,4,6-tribromphenol ↓ trắng + 3HBr.\nNitro hoá nhẹ: HNO3 loãng → o- và p-nitrophenol (không cần xúc tác mạnh).\nEste hoá: phenol kém hoạt tính hơn ancol → cần anhidrit/halogen axit (vd: CH3COCl).',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Nhận biết',
            content: 'Dd Br2: hiện kết tủa trắng 2,4,6-tribromphenol; dung dịch mất màu.\nFeCl3: cho màu tím/vàng đặc trưng (phức phenolat-Fe).',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Ứng dụng & an toàn',
            content: 'Nguyên liệu nhựa phenol-fomanđehit (bakelit), chất sát trùng.\nPhenol độc, ăn mòn; phải dùng găng, làm việc nơi thoáng.',
            color: 'purple',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Phenol khác ancol ở tính axit do:',
      options: ['Có nhiều C hơn', 'Liên hợp giữa vòng thơm và cặp e trên O ổn định anion phenolat', 'Không có H-bond', 'Không tan trong nước'],
      correctAnswer: 1,
      explanation: 'Anion phenolat được cộng hưởng ổn định nên phenol axit hơn ancol.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Thuốc thử nhận biết phenol nhanh:',
      options: ['BaCl2', 'FeCl3', 'NaHCO3', 'AgNO3'],
      correctAnswer: 1,
      explanation: 'Phenol + FeCl3 cho màu tím đặc trưng.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Phenol phản ứng với NaOH nhưng không với NaHCO3.',
      correctAnswer: true,
      explanation: 'Axit yếu hơn H2CO3, nên không đẩy được CO2 từ NaHCO3.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Sản phẩm brom hoá phenol (dd Br2) là:',
      options: ['Brombenzen', '2,4,6-tribromphenol kết tủa trắng', '1,3,5-tribrombenzen', 'p-bromphenol duy nhất'],
      correctAnswer: 1,
      explanation: '-OH hoạt hoá mạnh, thế nhanh vào o,p tạo 2,4,6-tribromphenol trắng.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phenol có pKa khoảng:',
      options: ['0', '4', '10', '16'],
      correctAnswer: 2,
      explanation: 'pKa ~10, axit yếu hơn H2CO3 (~6,3) nhưng mạnh hơn ancol (~16).',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Phenol cần xúc tác mạnh mới nitro hoá được.',
      correctAnswer: false,
      explanation: '-OH hoạt hoá vòng, nitro hoá nhẹ với HNO3 loãng không cần H2SO4 đặc.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng với FeCl3 của phenol cho màu:',
      options: ['Đỏ gạch', 'Tím hoặc xanh tím', 'Không đổi màu', 'Đen'],
      correctAnswer: 1,
      explanation: 'Phức phenolat-Fe3+ cho màu tím.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'So với etanol, phenol:',
      options: ['Bazơ hơn', 'Axit hơn', 'Có nhiệt độ sôi thấp hơn', 'Hoàn toàn không tan nước'],
      correctAnswer: 1,
      explanation: 'Phenol axit hơn do anion phenolat ổn định.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Phenol độc, cần bảo hộ khi thao tác.',
      correctAnswer: true,
      explanation: 'Phenol gây bỏng da, độc qua hô hấp.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'C6H5OH + NaOH → ______ + H2O',
      correctAnswer: 'C6H5ONa',
      explanation: 'Tạo muối phenolat natri.',
      points: 10
    }
  ]
};
