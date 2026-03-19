module.exports = {
  classId: 8,
  curriculumType: 'ketnoi',
  chapterId: 3,
  chapterName: "Chương 3: Một số hợp chất thông dụng",
  lessonId: 10,
  title: 'Bài 10: Oxide',
  description: 'Tìm hiểu về oxide, phân loại, tính chất hóa học và ứng dụng của các loại oxide',
  level: 'Beginner',
  order: 9,

  // Cấu trúc module mới
  modules: [
    // ============ MODULE 1: Khái niệm và phân loại Oxide ============
    {
      id: 'module-1',
      title: 'Khái niệm và phân loại Oxide',
      description: 'Tìm hiểu oxide là gì và cách phân loại',
      order: 1,
      items: [
        {
          id: 'item-1-1',
          type: 'theory',
          title: 'Oxide là gì?',
          duration: '4 min',
          section: 'Khái niệm',
          theoryModules: [
            {
              id: 'tm-1-1',
              type: 'heading',
              content: {
                text: '🪨 Oxide (Oxit)',
                level: 'h2'
              }
            },
            {
              id: 'tm-1-2',
              type: 'infoBox',
              content: {
                title: 'Định nghĩa Oxide',
                content: '**Oxide** là hợp chất gồm **oxygen (O)** và **một nguyên tố khác**\n\n📌 Công thức: M₍ₓ₎O₍ᵧ₎\n• CaO (canxi oxide)\n• CO₂ (cacbon đioxit)\n• Fe₂O₃ (sắt(III) oxide)\n• SO₂ (lưu huỳnh đioxit)',
                color: 'blue',
                listType: 'bullet'
              }
            }
          ]
        },
        {
          id: 'item-1-2',
          type: 'theory',
          title: 'Phân loại oxide',
          duration: '5 min',
          section: 'Phân loại',
          theoryModules: [
            {
              id: 'tm-1-3',
              type: 'infoBox',
              content: {
                title: 'Oxide bazơ',
                content: '🔵 **Oxide bazơ:** Oxide của kim loại\n• Na₂O, CaO, CuO, Fe₂O₃, MgO\n• Phản ứng với acid tạo muối + nước\n• Một số tan trong nước tạo bazơ (Na₂O, CaO)',
                color: 'purple',
                listType: 'bullet'
              }
            },
            {
              id: 'tm-1-4',
              type: 'infoBox',
              content: {
                title: 'Oxide acid',
                content: '🔴 **Oxide acid:** Oxide của phi kim\n• CO₂, SO₂, SO₃, P₂O₅, N₂O₅\n• Phản ứng với bazơ tạo muối + nước\n• Tan trong nước tạo acid (trừ SiO₂)',
                color: 'orange',
                listType: 'bullet'
              }
            },
            {
              id: 'tm-1-5',
              type: 'tipBox',
              content: {
                title: 'Oxide lưỡng tính',
                content: '⚖️ **Oxide lưỡng tính:** Phản ứng được với cả acid và bazơ\n• Al₂O₃, ZnO, PbO, SnO\n• Ví dụ: Al₂O₃ + 6HCl → 2AlCl₃ + 3H₂O\n         Al₂O₃ + 2NaOH → 2NaAlO₂ + H₂O',
                color: 'green'
              }
            }
          ]
        }
      ],
      // Quiz cho Module 1: 4 câu
      quizzes: [
        {
          type: 'multiple-choice',
          question: 'Oxide là hợp chất của:',
          options: ['Hai kim loại', 'Một phi kim và hydro', 'Oxygen và một nguyên tố khác', 'Chỉ oxygen'],
          correctAnswer: 2,
          explanation: 'Oxide là hợp chất gồm oxygen và một nguyên tố khác.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Chất nào là oxide bazơ?',
          options: ['CO₂', 'SO₂', 'CuO', 'P₂O₅'],
          correctAnswer: 2,
          explanation: 'CuO là oxide của kim loại Cu, là oxide bazơ.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Oxide acid thường phản ứng với:',
          options: ['Kim loại', 'Oxide bazơ hoặc bazơ', 'Khí trơ', 'Muối trung tính'],
          correctAnswer: 1,
          explanation: 'Oxide acid phản ứng với bazơ hoặc oxide bazơ tạo muối.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Oxide lưỡng tính có thể phản ứng với cả acid và bazơ. Ví dụ:',
          options: ['Al₂O₃', 'Na₂O', 'SO₂', 'CO₂'],
          correctAnswer: 0,
          explanation: 'Al₂O₃ là oxide lưỡng tính, phản ứng được với cả acid và bazơ.',
          points: 10
        }
      ]
    },

    // ============ MODULE 2: Tính chất hóa học của Oxide ============
    {
      id: 'module-2',
      title: 'Tính chất hóa học của Oxide',
      description: 'Các phản ứng đặc trưng của oxide bazơ và oxide acid',
      order: 2,
      items: [
        {
          id: 'item-2-1',
          type: 'theory',
          title: 'Tính chất của oxide bazơ',
          duration: '4 min',
          section: 'Tính chất',
          theoryModules: [
            {
              id: 'tm-2-1',
              type: 'heading',
              content: {
                text: '⚗️ Tính chất hóa học của Oxide',
                level: 'h2'
              }
            },
            {
              id: 'tm-2-2',
              type: 'infoBox',
              content: {
                title: 'Oxide bazơ',
                content: '**1. Với nước:** (chỉ oxide kim loại kiềm, kiềm thổ)\nCaO + H₂O → Ca(OH)₂\nNa₂O + H₂O → 2NaOH\n\n**2. Với acid:**\nCuO + 2HCl → CuCl₂ + H₂O\nFe₂O₃ + 6HCl → 2FeCl₃ + 3H₂O',
                color: 'blue',
                listType: 'bullet'
              }
            }
          ]
        },
        {
          id: 'item-2-2',
          type: 'theory',
          title: 'Tính chất của oxide acid',
          duration: '4 min',
          section: 'Tính chất',
          theoryModules: [
            {
              id: 'tm-2-3',
              type: 'infoBox',
              content: {
                title: 'Oxide acid',
                content: '**1. Với nước:** (tạo acid tương ứng)\nCO₂ + H₂O → H₂CO₃\nSO₂ + H₂O → H₂SO₃\nSO₃ + H₂O → H₂SO₄\n\n**2. Với bazơ:**\nCO₂ + 2NaOH → Na₂CO₃ + H₂O\nCO₂ + Ca(OH)₂ → CaCO₃↓ + H₂O',
                color: 'orange',
                listType: 'bullet'
              }
            },
            {
              id: 'tm-2-4',
              type: 'warningBox',
              content: {
                title: 'Ghi nhớ',
                content: '📌 Oxide bazơ + Acid → Muối + Nước\n📌 Oxide acid + Bazơ → Muối + Nước\n📌 Một số oxide tan trong nước tạo acid hoặc bazơ',
                color: 'red'
              }
            }
          ]
        }
      ],
      // Quiz cho Module 2: 5 câu
      quizzes: [
        {
          type: 'multiple-choice',
          question: 'Phản ứng CaO + H₂O → Ca(OH)₂ minh họa tính chất:',
          options: ['Oxide acid + nước', 'Oxide bazơ + nước tạo bazơ', 'Oxide lưỡng tính + nước', 'Không phản ứng'],
          correctAnswer: 1,
          explanation: 'CaO (oxide bazơ) + nước → Ca(OH)₂ (bazơ).',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'SO₂ + 2NaOH → Na₂SO₃ + H₂O thuộc loại:',
          options: ['Oxide bazơ + bazơ', 'Oxide acid + bazơ', 'Oxide bazơ + acid', 'Oxide acid + muối'],
          correctAnswer: 1,
          explanation: 'SO₂ là oxide acid, phản ứng với bazơ NaOH.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'CO₂ + Ca(OH)₂ → CaCO₃ + H₂O là phản ứng giữa:',
          options: ['Oxide bazơ và nước', 'Oxide acid và bazơ', 'Oxide acid và acid', 'Oxide bazơ và bazơ'],
          correctAnswer: 1,
          explanation: 'CO₂ (oxide acid) + Ca(OH)₂ (bazơ) → muối + nước.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Oxide bazơ tan được trong nước tạo bazơ là:',
          options: ['Na₂O, K₂O, CaO', 'CuO, Fe₂O₃', 'CO₂, SO₂', 'SiO₂, Al₂O₃'],
          correctAnswer: 0,
          explanation: 'Na₂O, K₂O, CaO (oxide kim loại kiềm, kiềm thổ) tan trong nước tạo bazơ.',
          points: 10
        },
        {
          type: 'true-false',
          question: 'Tất cả các oxide đều tan trong nước.',
          correctAnswer: false,
          explanation: 'Sai! Nhiều oxide không tan trong nước như CuO, Fe₂O₃, SiO₂, Al₂O₃.',
          points: 10
        }
      ]
    },

    // ============ MODULE 3: Điều chế và ứng dụng ============
    {
      id: 'module-3',
      title: 'Điều chế và ứng dụng Oxide',
      description: 'Cách điều chế và ứng dụng của các loại oxide trong đời sống',
      order: 3,
      items: [
        {
          id: 'item-3-1',
          type: 'theory',
          title: 'Điều chế oxide',
          duration: '4 min',
          section: 'Điều chế',
          theoryModules: [
            {
              id: 'tm-3-1',
              type: 'heading',
              content: {
                text: '🏭 Điều chế Oxide',
                level: 'h2'
              }
            },
            {
              id: 'tm-3-2',
              type: 'infoBox',
              content: {
                title: 'Phương pháp điều chế',
                content: '**1. Đốt cháy đơn chất:**\n• 2Mg + O₂ → 2MgO\n• C + O₂ → CO₂\n• S + O₂ → SO₂\n\n**2. Nhiệt phân:**\n• CaCO₃ → CaO + CO₂\n• Cu(OH)₂ → CuO + H₂O\n• 2Fe(OH)₃ → Fe₂O₃ + 3H₂O',
                color: 'purple',
                listType: 'bullet'
              }
            }
          ]
        },
        {
          id: 'item-3-2',
          type: 'theory',
          title: 'Ứng dụng của oxide',
          duration: '4 min',
          section: 'Ứng dụng',
          theoryModules: [
            {
              id: 'tm-3-3',
              type: 'tipBox',
              content: {
                title: 'Ứng dụng thực tế',
                content: '🏗️ **CaO (vôi sống):** Sản xuất vôi, xi măng, xử lý nước\n💨 **CO₂:** Chữa cháy, nước giải khát, bảo quản thực phẩm\n🔩 **Fe₂O₃/Fe₃O₄:** Quặng sắt để luyện gang\n💎 **Al₂O₃:** Luyện nhôm, đá mài, đá quý (ruby, sapphire)\n🔲 **SiO₂:** Sản xuất thủy tinh, gốm sứ',
                color: 'green'
              }
            }
          ]
        }
      ],
      // Quiz cho Module 3: 3 câu
      quizzes: [
        {
          type: 'multiple-choice',
          question: 'Điều chế CaO trong công nghiệp thường bằng:',
          options: ['Đốt Mg trong O₂', 'Nhiệt phân đá vôi CaCO₃', 'Điện phân nước', 'Đốt H₂ trong O₂'],
          correctAnswer: 1,
          explanation: 'CaCO₃ → CaO + CO₂ (nung vôi công nghiệp).',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Tên gọi Fe₂O₃ là:',
          options: ['Sắt oxide', 'Sắt(II) oxide', 'Sắt(III) oxide', 'Sắt(I) oxide'],
          correctAnswer: 2,
          explanation: 'Fe₂O₃ là sắt(III) oxide (Fe có hóa trị III).',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'CO₂ được dùng để:',
          options: ['Luyện kim', 'Chữa cháy, nước giải khát', 'Sản xuất xi măng', 'Luyện nhôm'],
          correctAnswer: 1,
          explanation: 'CO₂ dùng trong bình chữa cháy và sản xuất nước ngọt có gas.',
          points: 10
        }
      ]
    }
  ],

  // Legacy game array - giữ để tương thích ngược
  game: [
    {
      type: 'multiple-choice',
      question: 'Oxide là hợp chất của:',
      options: ['Hai kim loại', 'Một phi kim và hydro', 'Hai nguyên tố, có oxygen', 'Chỉ oxygen'],
      correctAnswer: 2,
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Oxide acid thường phản ứng với:',
      options: ['Kim loại', 'Oxide bazơ hoặc bazơ', 'Khí trơ', 'Muối trung tính'],
      correctAnswer: 1,
      points: 10
    }
  ]
};
