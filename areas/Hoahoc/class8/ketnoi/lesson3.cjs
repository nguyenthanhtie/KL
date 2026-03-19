module.exports = {
  classId: 8,
  curriculumType: 'ketnoi',
  chapterId: 2,
  chapterName: "Chương 2: Phản ứng hóa học",
  lessonId: 3,
  title: 'Bài 3: Mol và tỉ khối chất khí',
  description: 'Tìm hiểu khái niệm mol, số Avogadro, khối lượng mol, thể tích mol khí và tỉ khối chất khí',
  level: 'Beginner',
  order: 2,

  // Cấu trúc module mới
  modules: [
    // ============ MODULE 1: Khái niệm Mol ============
    {
      id: 'module-1',
      title: 'Khái niệm Mol và số Avogadro',
      description: 'Tìm hiểu mol là gì và số Avogadro',
      order: 1,
      items: [
        {
          id: 'item-1-1',
          type: 'theory',
          title: 'Mol là gì?',
          duration: '4 min',
          section: 'Khái niệm cơ bản',
          theoryModules: [
            {
              id: 'tm-1-1',
              type: 'heading',
              content: {
                text: '🧩 Mol - Đơn vị đếm hạt vi mô',
                level: 'h2'
              }
            },
            {
              id: 'tm-1-2',
              type: 'paragraph',
              content: {
                text: 'Mol là đơn vị đo lượng chất, tương tự như "chục" (10 cái) hay "tá" (12 cái). Tuy nhiên, mol dùng cho các hạt vi mô như nguyên tử, phân tử, ion.'
              }
            },
            {
              id: 'tm-1-3',
              type: 'infoBox',
              content: {
                title: 'Số Avogadro (N_A)',
                content: '**1 mol = 6,02 × 10²³ hạt**\n\nĐây là số Avogadro, là số nguyên tử C trong đúng 12 gam C-12.\n\n📌 Số này cực kỳ lớn vì nguyên tử, phân tử rất nhỏ!',
                color: 'blue',
                listType: 'bullet'
              }
            },
            {
              id: 'tm-1-4',
              type: 'tipBox',
              content: {
                title: 'Ví dụ minh họa',
                content: '1 mol nước (H₂O) = 6,02 × 10²³ phân tử nước\n1 mol sắt (Fe) = 6,02 × 10²³ nguyên tử sắt\n0,5 mol CO₂ = 0,5 × 6,02 × 10²³ = 3,01 × 10²³ phân tử CO₂',
                color: 'green'
              }
            }
          ]
        },
        {
          id: 'item-1-2',
          type: 'theory',
          title: 'Khối lượng mol (M)',
          duration: '4 min',
          section: 'Công thức quan trọng',
          theoryModules: [
            {
              id: 'tm-1-5',
              type: 'infoBox',
              content: {
                title: 'Khối lượng mol (M)',
                content: '**Định nghĩa:** Khối lượng của 1 mol chất, đơn vị: g/mol\n\n**M có giá trị bằng số khối:** \n• M(H) = 1 g/mol\n• M(O) = 16 g/mol\n• M(H₂O) = 2×1 + 16 = 18 g/mol\n• M(CO₂) = 12 + 2×16 = 44 g/mol',
                color: 'purple',
                listType: 'bullet'
              }
            },
            {
              id: 'tm-1-6',
              type: 'warningBox',
              content: {
                title: 'Công thức vàng: n = m/M',
                content: '**n** = số mol (mol)\n**m** = khối lượng (g)\n**M** = khối lượng mol (g/mol)\n\n⚡ Đây là công thức quan trọng nhất để tính toán hóa học!',
                color: 'orange'
              }
            }
          ]
        }
      ],
      // Quiz cho Module 1: 4 câu
      quizzes: [
        {
          type: 'multiple-choice',
          question: 'Số Avogadro xấp xỉ là:',
          options: [
            '6,02 × 10²³ hạt/mol',
            '6,02 × 10²⁰ hạt/mol',
            '6,02 × 10²⁶ hạt/mol',
            '6,02 × 10³ hạt/mol'
          ],
          correctAnswer: 0,
          explanation: 'Số Avogadro N_A = 6,02 × 10²³ hạt/mol, là số hạt trong 1 mol chất.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Khối lượng mol (M) có đơn vị:',
          options: ['mol', 'g/mol', 'g', 'L'],
          correctAnswer: 1,
          explanation: 'Khối lượng mol có đơn vị là g/mol (gam trên mol).',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Công thức tính số mol từ khối lượng?',
          options: [
            'n = m × M',
            'n = m / M',
            'n = V × 22,4',
            'n = M / m'
          ],
          correctAnswer: 1,
          explanation: 'n = m/M, trong đó m là khối lượng (g), M là khối lượng mol (g/mol).',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Khối lượng mol của CO₂ (C=12, O=16) là:',
          options: ['28 g/mol', '32 g/mol', '44 g/mol', '18 g/mol'],
          correctAnswer: 2,
          explanation: 'M(CO₂) = 12 + 2×16 = 12 + 32 = 44 g/mol',
          points: 10
        }
      ]
    },

    // ============ MODULE 2: Thể tích mol khí ============
    {
      id: 'module-2',
      title: 'Thể tích mol khí (đktc)',
      description: 'Tính thể tích khí ở điều kiện tiêu chuẩn',
      order: 2,
      items: [
        {
          id: 'item-2-1',
          type: 'theory',
          title: 'Thể tích mol khí ở đktc',
          duration: '4 min',
          section: 'Thể tích khí',
          theoryModules: [
            {
              id: 'tm-2-1',
              type: 'heading',
              content: {
                text: '💨 Thể tích mol khí',
                level: 'h2'
              }
            },
            {
              id: 'tm-2-2',
              type: 'infoBox',
              content: {
                title: 'Điều kiện tiêu chuẩn (đktc)',
                content: '**Nhiệt độ:** 0°C (273 K)\n**Áp suất:** 1 atm (760 mmHg)\n\n🎯 **Quy tắc vàng:** Ở đktc, 1 mol khí BẤT KỲ chiếm 22,4 lít',
                color: 'blue',
                listType: 'bullet'
              }
            },
            {
              id: 'tm-2-3',
              type: 'warningBox',
              content: {
                title: 'Công thức tính thể tích khí',
                content: '**V = n × 22,4 (lít)**\n\nhoặc **n = V / 22,4 (mol)**\n\n⚠️ Chỉ áp dụng ở đktc!',
                color: 'orange'
              }
            }
          ]
        },
        {
          id: 'item-2-2',
          type: 'theory',
          title: 'Ví dụ tính toán',
          duration: '4 min',
          section: 'Bài tập mẫu',
          theoryModules: [
            {
              id: 'tm-2-4',
              type: 'tipBox',
              content: {
                title: 'Ví dụ 1: Tính thể tích',
                content: '**Bài:** Tính thể tích của 0,5 mol CO₂ ở đktc.\n\n**Giải:** V = n × 22,4 = 0,5 × 22,4 = **11,2 lít**',
                color: 'green'
              }
            },
            {
              id: 'tm-2-5',
              type: 'tipBox',
              content: {
                title: 'Ví dụ 2: Tính số mol từ thể tích',
                content: '**Bài:** Có 5,6 lít khí O₂ ở đktc. Tính số mol O₂.\n\n**Giải:** n = V / 22,4 = 5,6 / 22,4 = **0,25 mol**',
                color: 'green'
              }
            },
            {
              id: 'tm-2-6',
              type: 'tipBox',
              content: {
                title: 'Ví dụ 3: Bài toán tổng hợp',
                content: '**Bài:** Tính khối lượng của 11,2 lít CO₂ ở đktc.\n\n**Giải:**\n• n = V/22,4 = 11,2/22,4 = 0,5 mol\n• m = n × M = 0,5 × 44 = **22 g**',
                color: 'purple'
              }
            }
          ]
        }
      ],
      // Quiz cho Module 2: 4 câu
      quizzes: [
        {
          type: 'multiple-choice',
          question: 'Thể tích của 1 mol khí ở đktc là:',
          options: ['1 L', '11,2 L', '22,4 L', '44,8 L'],
          correctAnswer: 2,
          explanation: 'Ở đktc, 1 mol khí bất kỳ đều chiếm thể tích 22,4 lít.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Công thức liên hệ thể tích khí và số mol ở đktc:',
          options: [
            'V = n × 22,4 (L)',
            'V = n / 22,4',
            'V = M / n',
            'V = 22,4 / M'
          ],
          correctAnswer: 0,
          explanation: 'V = n × 22,4 là công thức tính thể tích khí ở đktc.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: '0,25 mol N₂ có thể tích ở đktc là:',
          options: ['5,6 L', '11,2 L', '22,4 L', '44,8 L'],
          correctAnswer: 0,
          explanation: 'V = n × 22,4 = 0,25 × 22,4 = 5,6 lít',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Thể tích 2 mol khí ở đktc là:',
          options: ['11,2 L', '22,4 L', '33,6 L', '44,8 L'],
          correctAnswer: 3,
          explanation: 'V = n × 22,4 = 2 × 22,4 = 44,8 lít',
          points: 10
        }
      ]
    },

    // ============ MODULE 3: Tỉ khối chất khí ============
    {
      id: 'module-3',
      title: 'Tỉ khối chất khí',
      description: 'So sánh độ nặng nhẹ giữa các khí',
      order: 3,
      items: [
        {
          id: 'item-3-1',
          type: 'theory',
          title: 'Khái niệm tỉ khối',
          duration: '4 min',
          section: 'Tỉ khối',
          theoryModules: [
            {
              id: 'tm-3-1',
              type: 'heading',
              content: {
                text: '⚖️ Tỉ khối chất khí',
                level: 'h2'
              }
            },
            {
              id: 'tm-3-2',
              type: 'paragraph',
              content: {
                text: 'Tỉ khối cho biết khí A nặng hay nhẹ hơn khí B bao nhiêu lần. Đây là đại lượng so sánh không có đơn vị.'
              }
            },
            {
              id: 'tm-3-3',
              type: 'infoBox',
              content: {
                title: 'Công thức tỉ khối',
                content: '**Tỉ khối A so với B:**\nd(A/B) = M(A) / M(B)\n\n**So với H₂ (M=2):**\nd(A/H₂) = M(A) / 2\n\n**So với không khí (M≈29):**\nd(A/kk) = M(A) / 29',
                color: 'blue',
                listType: 'bullet'
              }
            }
          ]
        },
        {
          id: 'item-3-2',
          type: 'theory',
          title: 'Ví dụ tính tỉ khối',
          duration: '4 min',
          section: 'Ví dụ',
          theoryModules: [
            {
              id: 'tm-3-4',
              type: 'tipBox',
              content: {
                title: 'Ví dụ tính tỉ khối',
                content: '**Tỉ khối O₂ so với H₂:**\nd = M(O₂)/M(H₂) = 32/2 = **16**\n→ O₂ nặng gấp 16 lần H₂\n\n**Tỉ khối CO₂ so với không khí:**\nd = M(CO₂)/29 = 44/29 ≈ **1,52**\n→ CO₂ nặng hơn không khí → chìm xuống',
                color: 'green'
              }
            },
            {
              id: 'tm-3-5',
              type: 'warningBox',
              content: {
                title: 'Ý nghĩa thực tế',
                content: '• d > 1: Khí nặng hơn → chìm xuống\n• d < 1: Khí nhẹ hơn → bay lên\n• d = 1: Khí cùng nặng\n\n🎈 H₂ nhẹ hơn không khí → dùng bơm bóng bay\n🌫️ CO₂ nặng hơn không khí → tích ở đáy hầm',
                color: 'orange'
              }
            }
          ]
        }
      ],
      // Quiz cho Module 3: 4 câu
      quizzes: [
        {
          type: 'multiple-choice',
          question: 'Tỉ khối của khí A so với không khí được tính xấp xỉ:',
          options: [
            'd = M/2',
            'd = 29/M',
            'd = M/29',
            'd = 2/M'
          ],
          correctAnswer: 2,
          explanation: 'Tỉ khối so với không khí: d = M(A)/29, vì M(không khí) ≈ 29 g/mol.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Tỉ khối của CO₂ (M=44) so với H₂ (M=2) là:',
          options: ['44', '22', '11', '2'],
          correctAnswer: 1,
          explanation: 'd = M(CO₂)/M(H₂) = 44/2 = 22. CO₂ nặng gấp 22 lần H₂.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Khí nào nhẹ hơn không khí (M≈29)?',
          options: [
            'CO₂ (M=44)',
            'O₂ (M=32)',
            'H₂ (M=2)',
            'Cl₂ (M=71)'
          ],
          correctAnswer: 2,
          explanation: 'H₂ có M=2 < 29 nên nhẹ hơn không khí, d < 1.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Khối lượng 0,2 mol CO₂ là bao nhiêu?',
          options: ['8,8 g', '4,4 g', '2,2 g', '44 g'],
          correctAnswer: 0,
          explanation: 'm = n × M = 0,2 × 44 = 8,8 g',
          points: 10
        }
      ]
    }
  ],

  // Legacy theoryModules - giữ để tương thích ngược
  theoryModules: [
    {
      id: 'mod-1',
      type: 'heading',
      content: { text: '🧩 Bài 3: Mol và tỉ khối chất khí', level: 'h2' }
    }
  ],

  // Legacy game array - giữ để tương thích ngược
  game: [
    {
      type: 'multiple-choice',
      question: 'Thể tích 1 mol khí ở đktc là:',
      options: ['1 L', '11,2 L', '22,4 L', '44,8 L'],
      correctAnswer: 2,
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Số Avogadro xấp xỉ là:',
      options: ['6,02 × 10²³', '6,02 × 10²⁰', '6,02 × 10²⁶', '6,02 × 10³'],
      correctAnswer: 0,
      points: 10
    }
  ]
};
