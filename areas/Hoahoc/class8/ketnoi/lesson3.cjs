module.exports = {
  classId: 8,
  curriculumType: 'ketnoi',
  chapterId: 2,
  chapterName: "Chương 2: Phản ứng hóa học",
  lessonId: 3,
  title: 'Bài 3: Mol và tỉ khối chất khí',
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: '🧩 Bài 3: Mol và tỉ khối chất khí',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Mục tiêu: hiểu mol, quy đổi n-m-M, tính nhanh thể tích khí và tỉ khối so với H₂/không khí.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Mol & Avogadro',
            content: '1 mol = 6,02 × 10²³ hạt.\nKhối lượng mol (M): g/mol.\nSố mol: **n = m/M**.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'infoBox',
        content: {
            title: 'Thể tích mol khí (đktc)',
            content: '1 mol khí bất kỳ: 22,4 L.\n**V = n × 22,4 (L)**.\n0,5 mol CO₂ → 11,2 L.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'warningBox',
        content: {
            title: 'Tỉ khối chất khí',
            content: 'd(A/B) = M(A)/M(B).\nd so với H₂: d = M/2.\nd so với không khí: d ≈ M/29.',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Ví dụ tính nhanh',
            content: 'M(O₂) = 32 g/mol ⇒ d(O₂/kk) ≈ 32/29 ≈ 1,1.\n0,2 mol CO₂ → m = 0,2 × 44 = 8,8 g.\nn = m/M: 11 g CO₂ ⇒ n ≈ 11/44 = 0,25 mol ⇒ V = 5,6 L.',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Mini quiz đọc nhanh',
            content: 'Tính n từ m = 8,8 g CO₂.\nTính V của 0,3 mol N₂ ở đktc.\nd(O₂/H₂) bằng bao nhiêu?\nTự giải trước khi làm 10 câu test.',
            color: 'blue',
            listType: 'number'
        }
    }
  ],
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
