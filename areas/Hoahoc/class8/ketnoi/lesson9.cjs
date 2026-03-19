module.exports = {
  classId: 8,
  curriculumType: 'ketnoi',
  chapterId: 3,
  chapterName: "Chương 3: Một số hợp chất thông dụng",
  lessonId: 9,
  title: 'Bài 9: Base. Thang pH',
  description: 'Tìm hiểu về bazơ, tính chất hóa học, thang pH và cách đo độ acid-base',
  level: 'Beginner',
  order: 8,

  // Cấu trúc module mới
  modules: [
    // ============ MODULE 1: Khái niệm về Base ============
    {
      id: 'module-1',
      title: 'Khái niệm về Base (Bazơ)',
      description: 'Tìm hiểu bazơ là gì, cách nhận biết và phân loại',
      order: 1,
      items: [
        {
          id: 'item-1-1',
          type: 'theory',
          title: 'Bazơ là gì?',
          duration: '4 min',
          section: 'Khái niệm',
          theoryModules: [
            {
              id: 'tm-1-1',
              type: 'heading',
              content: {
                text: '🧪 Base (Bazơ)',
                level: 'h2'
              }
            },
            {
              id: 'tm-1-2',
              type: 'infoBox',
              content: {
                title: 'Định nghĩa Bazơ',
                content: '**Bazơ** là hợp chất khi tan trong nước phân li ra ion **OH⁻** (hidroxit)\n\n📌 Công thức: Kim loại + OH\n• NaOH (natri hidroxit)\n• KOH (kali hidroxit)\n• Ca(OH)₂ (canxi hidroxit)\n• Ba(OH)₂ (bari hidroxit)',
                color: 'blue',
                listType: 'bullet'
              }
            },
            {
              id: 'tm-1-3',
              type: 'warningBox',
              content: {
                title: 'Nhận biết bazơ',
                content: '🔵 **Quỳ tím → Xanh** (dấu hiệu đặc trưng)\n🧴 Cảm giác nhờn tay (do phản ứng với da)\n👅 Vị đắng (KHÔNG được nếm!)\n⚡ Ion đặc trưng: OH⁻',
                color: 'orange'
              }
            }
          ]
        },
        {
          id: 'item-1-2',
          type: 'theory',
          title: 'Phân loại bazơ',
          duration: '3 min',
          section: 'Phân loại',
          theoryModules: [
            {
              id: 'tm-1-4',
              type: 'infoBox',
              content: {
                title: 'Phân loại theo độ tan',
                content: '**Bazơ tan (Kiềm):** NaOH, KOH, Ba(OH)₂, Ca(OH)₂\n→ Tan trong nước, dung dịch gọi là **kiềm**\n\n**Bazơ không tan:** Cu(OH)₂, Fe(OH)₂, Fe(OH)₃, Mg(OH)₂\n→ Không tan trong nước, là kết tủa',
                color: 'purple',
                listType: 'bullet'
              }
            }
          ]
        }
      ],
      // Quiz cho Module 1: 4 câu
      quizzes: [
        {
          type: 'multiple-choice',
          question: 'Ion đặc trưng của bazơ là:',
          options: ['H⁺', 'OH⁻', 'Na⁺', 'Cl⁻'],
          correctAnswer: 1,
          explanation: 'Bazơ phân li ra ion OH⁻ (hidroxit) trong nước.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Bazơ làm quỳ tím đổi thành màu:',
          options: ['Đỏ', 'Xanh', 'Vàng', 'Không đổi'],
          correctAnswer: 1,
          explanation: 'Bazơ làm quỳ tím chuyển sang màu xanh.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Dung dịch nào có thể làm quỳ tím hóa xanh?',
          options: ['NaOH', 'HCl', 'NaCl', 'CO₂ hòa tan'],
          correctAnswer: 0,
          explanation: 'NaOH là bazơ, làm quỳ tím chuyển xanh.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Bazơ nào KHÔNG tan trong nước?',
          options: ['NaOH', 'KOH', 'Cu(OH)₂', 'Ba(OH)₂'],
          correctAnswer: 2,
          explanation: 'Cu(OH)₂ là bazơ không tan, tạo kết tủa màu xanh lam.',
          points: 10
        }
      ]
    },

    // ============ MODULE 2: Tính chất hóa học của Base ============
    {
      id: 'module-2',
      title: 'Tính chất hóa học của Base',
      description: 'Các phản ứng đặc trưng của bazơ',
      order: 2,
      items: [
        {
          id: 'item-2-1',
          type: 'theory',
          title: 'Bazơ tác dụng với acid',
          duration: '4 min',
          section: 'Tính chất',
          theoryModules: [
            {
              id: 'tm-2-1',
              type: 'heading',
              content: {
                text: '⚗️ Tính chất hóa học của Bazơ',
                level: 'h2'
              }
            },
            {
              id: 'tm-2-2',
              type: 'infoBox',
              content: {
                title: '1. Với acid (phản ứng trung hòa)',
                content: '**Bazơ + Acid → Muối + Nước**\n\n• NaOH + HCl → NaCl + H₂O\n• Ca(OH)₂ + 2HCl → CaCl₂ + 2H₂O\n• KOH + HNO₃ → KNO₃ + H₂O\n\n📌 Cả bazơ tan và không tan đều phản ứng với acid!',
                color: 'green',
                listType: 'bullet'
              }
            }
          ]
        },
        {
          id: 'item-2-2',
          type: 'theory',
          title: 'Bazơ tác dụng với oxide acid',
          duration: '4 min',
          section: 'Tính chất',
          theoryModules: [
            {
              id: 'tm-2-3',
              type: 'infoBox',
              content: {
                title: '2. Với oxide acid',
                content: '**Bazơ + Oxide acid → Muối + Nước**\n\n• Ca(OH)₂ + CO₂ → CaCO₃↓ + H₂O\n  (Nước vôi trong + CO₂ → đục)\n• 2NaOH + CO₂ → Na₂CO₃ + H₂O\n• 2NaOH + SO₂ → Na₂SO₃ + H₂O',
                color: 'purple',
                listType: 'bullet'
              }
            },
            {
              id: 'tm-2-4',
              type: 'tipBox',
              content: {
                title: 'Ứng dụng thực tế',
                content: '🏭 Nước vôi trong Ca(OH)₂ dùng để:\n• Nhận biết CO₂ (làm đục nước vôi)\n• Xử lý khí thải công nghiệp chứa SO₂\n• Quét vôi tường (CO₂ + Ca(OH)₂ → CaCO₃ làm tường cứng)',
                color: 'green'
              }
            }
          ]
        }
      ],
      // Quiz cho Module 2: 4 câu
      quizzes: [
        {
          type: 'multiple-choice',
          question: 'Phản ứng trung hòa là phản ứng giữa:',
          options: ['Acid và kim loại', 'Bazơ và muối', 'Acid và bazơ', 'Hai bazơ'],
          correctAnswer: 2,
          explanation: 'Trung hòa là phản ứng giữa acid và bazơ tạo muối và nước.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Phản ứng Ca(OH)₂ + CO₂ → CaCO₃ + H₂O minh họa tính chất nào?',
          options: ['Bazơ + oxide bazơ', 'Bazơ + oxide acid', 'Bazơ + muối', 'Bazơ + kim loại'],
          correctAnswer: 1,
          explanation: 'CO₂ là oxide acid, phản ứng với bazơ tạo muối và nước.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Sản phẩm của NaOH + HCl là:',
          options: ['NaCl + H₂', 'NaCl + H₂O', 'Na₂O + HCl', 'NaOH + Cl₂'],
          correctAnswer: 1,
          explanation: 'NaOH + HCl → NaCl + H₂O (phản ứng trung hòa).',
          points: 10
        },
        {
          type: 'true-false',
          question: 'Nước vôi trong bị đục khi sục khí CO₂ vì tạo ra CaCO₃ kết tủa.',
          correctAnswer: true,
          explanation: 'Đúng! Ca(OH)₂ + CO₂ → CaCO₃↓ (kết tủa trắng làm đục nước).',
          points: 10
        }
      ]
    },

    // ============ MODULE 3: Thang pH ============
    {
      id: 'module-3',
      title: 'Thang pH',
      description: 'Tìm hiểu thang đo độ acid-base',
      order: 3,
      items: [
        {
          id: 'item-3-1',
          type: 'theory',
          title: 'Khái niệm pH',
          duration: '4 min',
          section: 'Thang pH',
          theoryModules: [
            {
              id: 'tm-3-1',
              type: 'heading',
              content: {
                text: '📊 Thang pH',
                level: 'h2'
              }
            },
            {
              id: 'tm-3-2',
              type: 'infoBox',
              content: {
                title: 'Ý nghĩa pH',
                content: '**pH** là đại lượng đo độ acid-base của dung dịch\n\n📏 **Thang pH:** 0 → 14\n• pH < 7: Môi trường **acid**\n• pH = 7: Môi trường **trung tính**\n• pH > 7: Môi trường **bazơ (kiềm)**\n\n📌 pH càng nhỏ → acid càng mạnh\n📌 pH càng lớn → bazơ càng mạnh',
                color: 'blue',
                listType: 'bullet'
              }
            }
          ]
        },
        {
          id: 'item-3-2',
          type: 'theory',
          title: 'Cách đo pH',
          duration: '4 min',
          section: 'Đo pH',
          theoryModules: [
            {
              id: 'tm-3-3',
              type: 'infoBox',
              content: {
                title: 'Phương pháp đo pH',
                content: '🧪 **Giấy quỳ:** \n• Đỏ → acid, Xanh → bazơ\n\n📜 **Giấy pH universal:**\n• Đổi màu theo pH, so với bảng màu\n\n🔬 **Máy đo pH (pH-mét):**\n• Chính xác nhất, hiển thị số',
                color: 'purple',
                listType: 'bullet'
              }
            },
            {
              id: 'tm-3-4',
              type: 'tipBox',
              content: {
                title: 'pH trong đời sống',
                content: '🍋 Nước chanh: pH ≈ 2-3 (acid)\n💧 Nước tinh khiết: pH = 7 (trung tính)\n🧼 Xà phòng: pH ≈ 9-10 (bazơ)\n🥛 Máu người: pH ≈ 7,4 (hơi kiềm)',
                color: 'green'
              }
            }
          ]
        }
      ],
      // Quiz cho Module 3: 4 câu
      quizzes: [
        {
          type: 'multiple-choice',
          question: 'Dung dịch có pH > 7 là:',
          options: ['Acid', 'Trung tính', 'Bazơ', 'Không xác định'],
          correctAnswer: 2,
          explanation: 'pH > 7 biểu thị môi trường bazơ (kiềm).',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'pH = 7 biểu thị:',
          options: ['Acid mạnh', 'Trung tính', 'Bazơ mạnh', 'Rất bazơ'],
          correctAnswer: 1,
          explanation: 'pH = 7 là môi trường trung tính (như nước tinh khiết).',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Giấy pH đo được giá trị 9. Điều đó nghĩa là:',
          options: ['Môi trường acid', 'Trung tính', 'Môi trường bazơ', 'Không xác định'],
          correctAnswer: 2,
          explanation: 'pH = 9 > 7, đây là môi trường bazơ.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Dung dịch nào có pH thấp nhất (acid mạnh nhất)?',
          options: ['Nước chanh (pH 2)', 'Nước tinh khiết (pH 7)', 'Xà phòng (pH 10)', 'Máu (pH 7,4)'],
          correctAnswer: 0,
          explanation: 'Nước chanh có pH ≈ 2, thấp nhất nên acid nhất.',
          points: 10
        }
      ]
    }
  ],

  // Legacy game array - giữ để tương thích ngược
  game: [
    {
      type: 'multiple-choice',
      question: 'Bazơ làm quỳ tím đổi thành màu:',
      options: ['Đỏ', 'Xanh', 'Vàng', 'Không đổi'],
      correctAnswer: 1,
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Dung dịch có pH > 7 là:',
      options: ['Acid', 'Trung tính', 'Bazơ', 'Không xác định'],
      correctAnswer: 2,
      points: 10
    }
  ]
};
