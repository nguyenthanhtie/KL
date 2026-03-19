module.exports = {
  classId: 8,
  curriculumType: 'ketnoi',
  chapterId: 3,
  chapterName: "Chương 3: Một số hợp chất thông dụng",
  lessonId: 11,
  title: 'Bài 11: Muối',
  description: 'Tìm hiểu về muối, phân loại, tính tan, phản ứng trao đổi và ứng dụng của muối',
  level: 'Beginner',
  order: 10,

  // Cấu trúc module mới
  modules: [
    // ============ MODULE 1: Khái niệm và phân loại Muối ============
    {
      id: 'module-1',
      title: 'Khái niệm và phân loại Muối',
      description: 'Tìm hiểu muối là gì, cách phân loại và tính tan',
      order: 1,
      items: [
        {
          id: 'item-1-1',
          type: 'theory',
          title: 'Muối là gì?',
          duration: '4 min',
          section: 'Khái niệm',
          theoryModules: [
            {
              id: 'tm-1-1',
              type: 'heading',
              content: {
                text: '🧂 Muối',
                level: 'h2'
              }
            },
            {
              id: 'tm-1-2',
              type: 'infoBox',
              content: {
                title: 'Định nghĩa Muối',
                content: '**Muối** là hợp chất ion gồm:\n• **Cation:** Kim loại hoặc NH₄⁺\n• **Anion:** Gốc acid\n\n📌 Ví dụ:\n• NaCl (natri clorua) = Na⁺ + Cl⁻\n• CaCO₃ (canxi cacbonat) = Ca²⁺ + CO₃²⁻\n• (NH₄)₂SO₄ = 2NH₄⁺ + SO₄²⁻',
                color: 'blue',
                listType: 'bullet'
              }
            }
          ]
        },
        {
          id: 'item-1-2',
          type: 'theory',
          title: 'Phân loại muối',
          duration: '4 min',
          section: 'Phân loại',
          theoryModules: [
            {
              id: 'tm-1-3',
              type: 'infoBox',
              content: {
                title: 'Muối trung hòa vs Muối acid',
                content: '**Muối trung hòa:** Gốc acid không còn H có thể thay thế\n• NaCl, K₂SO₄, CaCO₃, Na₂CO₃\n\n**Muối acid:** Gốc acid còn H chưa bị thay thế hết\n• NaHCO₃ (natri hidrocacbonat)\n• KH₂PO₄, NaHSO₄, Ca(HCO₃)₂',
                color: 'purple',
                listType: 'bullet'
              }
            },
            {
              id: 'tm-1-4',
              type: 'warningBox',
              content: {
                title: 'Tính tan của muối',
                content: '✅ **Muối tan:** Hầu hết muối Na⁺, K⁺, NH₄⁺; muối NO₃⁻\n❌ **Muối không tan:**\n• AgCl (trắng), AgBr, AgI\n• BaSO₄ (trắng), CaSO₄ (ít tan)\n• CaCO₃, BaCO₃ (trắng)',
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
          question: 'Muối là hợp chất giữa:',
          options: ['Kim loại và oxygen', 'Cation kim loại/NH₄⁺ và anion gốc acid', 'Phi kim và hydrogen', 'Chỉ có oxygen'],
          correctAnswer: 1,
          explanation: 'Muối gồm cation (kim loại/NH₄⁺) và anion (gốc acid).',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Muối acid đặc trưng bởi:',
          options: ['Chỉ có kim loại', 'Chứa gốc acid còn H chưa thay thế hết', 'Chứa gốc bazơ', 'Không chứa ion'],
          correctAnswer: 1,
          explanation: 'Muối acid có gốc acid còn chứa H có thể thay thế (như NaHCO₃).',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Muối nào sau đây không tan trong nước?',
          options: ['NaCl', 'KNO₃', 'AgCl', 'CuSO₄'],
          correctAnswer: 2,
          explanation: 'AgCl là kết tủa trắng, không tan trong nước.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Muối nào sau đây tan tốt trong nước?',
          options: ['BaSO₄', 'AgCl', 'KNO₃', 'CaCO₃'],
          correctAnswer: 2,
          explanation: 'Hầu hết muối nitrat (NO₃⁻) đều tan, KNO₃ tan tốt.',
          points: 10
        }
      ]
    },

    // ============ MODULE 2: Tính chất hóa học của Muối ============
    {
      id: 'module-2',
      title: 'Tính chất hóa học của Muối',
      description: 'Phản ứng trao đổi và các phản ứng khác của muối',
      order: 2,
      items: [
        {
          id: 'item-2-1',
          type: 'theory',
          title: 'Phản ứng trao đổi',
          duration: '5 min',
          section: 'Tính chất',
          theoryModules: [
            {
              id: 'tm-2-1',
              type: 'heading',
              content: {
                text: '⚗️ Phản ứng trao đổi ion',
                level: 'h2'
              }
            },
            {
              id: 'tm-2-2',
              type: 'infoBox',
              content: {
                title: 'Điều kiện phản ứng trao đổi',
                content: '**Phản ứng trao đổi xảy ra khi** sản phẩm có:\n• ⬇️ **Kết tủa** (chất không tan)\n• ⬆️ **Khí** (thoát ra)\n• 💧 **Chất điện li yếu** (H₂O)\n\n📌 Nếu không có điều kiện trên → KHÔNG phản ứng!',
                color: 'blue',
                listType: 'bullet'
              }
            },
            {
              id: 'tm-2-3',
              type: 'infoBox',
              content: {
                title: 'Ví dụ phản ứng trao đổi',
                content: '**1. Tạo kết tủa:**\nNaCl + AgNO₃ → AgCl↓ + NaNO₃ (kết tủa trắng)\nNa₂SO₄ + BaCl₂ → BaSO₄↓ + 2NaCl\n\n**2. Tạo khí:**\nCaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂↑\nNa₂CO₃ + 2HCl → 2NaCl + H₂O + CO₂↑\n\n**3. Tạo nước:**\nNaOH + HCl → NaCl + H₂O',
                color: 'purple',
                listType: 'bullet'
              }
            }
          ]
        },
        {
          id: 'item-2-2',
          type: 'theory',
          title: 'Muối tác dụng với kim loại',
          duration: '3 min',
          section: 'Tính chất',
          theoryModules: [
            {
              id: 'tm-2-4',
              type: 'tipBox',
              content: {
                title: 'Muối + Kim loại',
                content: '**Kim loại mạnh hơn đẩy kim loại yếu hơn ra khỏi muối**\n\n• Fe + CuSO₄ → FeSO₄ + Cu↓\n  (Fe mạnh hơn Cu, đẩy Cu ra)\n• Zn + CuCl₂ → ZnCl₂ + Cu↓\n\n📌 Xem dãy hoạt động hóa học kim loại!',
                color: 'green'
              }
            }
          ]
        }
      ],
      // Quiz cho Module 2: 5 câu
      quizzes: [
        {
          type: 'multiple-choice',
          question: 'Điều kiện xảy ra phản ứng trao đổi là:',
          options: ['Luôn xảy ra', 'Có tạo kết tủa/khí/chất điện li yếu', 'Chỉ cần khuấy', 'Chỉ khi đun nóng'],
          correctAnswer: 1,
          explanation: 'Phản ứng trao đổi cần tạo kết tủa, khí hoặc chất điện li yếu.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Khi cho NaCl vào dung dịch AgNO₃, hiện tượng:',
          options: ['Không đổi', 'Xuất hiện kết tủa trắng AgCl', 'Tỏa khí H₂', 'Tỏa mùi khai'],
          correctAnswer: 1,
          explanation: 'NaCl + AgNO₃ → AgCl↓ (kết tủa trắng) + NaNO₃.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Hiện tượng khi cho Na₂CO₃ vào HCl loãng:',
          options: ['Không đổi', 'Sủi bọt CO₂', 'Kết tủa đỏ', 'Tỏa mùi khai'],
          correctAnswer: 1,
          explanation: 'Na₂CO₃ + 2HCl → 2NaCl + H₂O + CO₂↑ (sủi bọt).',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Phản ứng tạo kết tủa xanh lam khi:',
          options: ['NaCl + AgNO₃', 'NaOH + CuSO₄', 'HCl + NaOH', 'KNO₃ + NaCl'],
          correctAnswer: 1,
          explanation: '2NaOH + CuSO₄ → Cu(OH)₂↓ (kết tủa xanh lam) + Na₂SO₄.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Fe + CuSO₄ → FeSO₄ + Cu xảy ra vì:',
          options: ['Cu mạnh hơn Fe', 'Fe mạnh hơn Cu, đẩy Cu ra', 'Cả hai đều không phản ứng', 'Cần xúc tác'],
          correctAnswer: 1,
          explanation: 'Fe hoạt động mạnh hơn Cu trong dãy hoạt động hóa học.',
          points: 10
        }
      ]
    },

    // ============ MODULE 3: Ứng dụng của Muối ============
    {
      id: 'module-3',
      title: 'Ứng dụng của Muối',
      description: 'Các ứng dụng quan trọng của muối trong đời sống',
      order: 3,
      items: [
        {
          id: 'item-3-1',
          type: 'theory',
          title: 'Ứng dụng các loại muối',
          duration: '5 min',
          section: 'Ứng dụng',
          theoryModules: [
            {
              id: 'tm-3-1',
              type: 'heading',
              content: {
                text: '🌍 Ứng dụng của Muối',
                level: 'h2'
              }
            },
            {
              id: 'tm-3-2',
              type: 'tipBox',
              content: {
                title: 'Muối trong đời sống',
                content: '🧂 **NaCl (muối ăn):** Gia vị, bảo quản thực phẩm, điện phân → NaOH, Cl₂\n\n🏗️ **CaCO₃ (đá vôi):** Vật liệu xây dựng, sản xuất xi măng, vôi\n\n🌾 **KNO₃, NH₄NO₃:** Phân bón (cung cấp N, K)\n\n💚 **CuSO₄:** Nông nghiệp (thuốc Bordeaux), mạ điện',
                color: 'green'
              }
            },
            {
              id: 'tm-3-3',
              type: 'infoBox',
              content: {
                title: 'Cách gọi tên muối',
                content: '**Quy tắc:** Tên kim loại (hoặc NH₄) + tên gốc acid\n\n• NaCl: Natri clorua\n• CaCO₃: Canxi cacbonat\n• FeSO₄: Sắt(II) sunfat\n• Fe₂(SO₄)₃: Sắt(III) sunfat\n• NH₄Cl: Amoni clorua',
                color: 'blue',
                listType: 'bullet'
              }
            }
          ]
        }
      ],
      // Quiz cho Module 3: 3 câu
      quizzes: [
        {
          type: 'multiple-choice',
          question: 'NaCl được dùng để:',
          options: ['Làm phân bón', 'Gia vị, bảo quản thực phẩm, điện phân', 'Chữa cháy', 'Luyện kim'],
          correctAnswer: 1,
          explanation: 'NaCl (muối ăn) dùng làm gia vị, bảo quản và điện phân.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Khi viết tên muối, thứ tự là:',
          options: ['Gốc acid trước, kim loại sau', 'Kim loại (hoặc NH₄) trước, gốc acid sau', 'Tên bất kỳ', 'Ion âm trước'],
          correctAnswer: 1,
          explanation: 'Quy tắc: Tên kim loại (NH₄) + tên gốc acid (VD: Natri clorua).',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Muối nào dùng làm phân bón?',
          options: ['NaCl', 'AgCl', 'KNO₃', 'BaSO₄'],
          correctAnswer: 2,
          explanation: 'KNO₃ (kali nitrat) là phân bón cung cấp K và N cho cây.',
          points: 10
        }
      ]
    }
  ],

  // Legacy game array - giữ để tương thích ngược
  game: [
    {
      type: 'multiple-choice',
      question: 'Muối là hợp chất giữa:',
      options: ['Kim loại và oxygen', 'Cation kim loại/NH₄⁺ và anion gốc acid', 'Phi kim và hydrogen', 'Chỉ có oxygen'],
      correctAnswer: 1,
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Khi cho NaCl vào dung dịch AgNO₃, hiện tượng:',
      options: ['Không đổi', 'Xuất hiện kết tủa trắng AgCl', 'Tỏa khí H₂', 'Tỏa mùi khai'],
      correctAnswer: 1,
      points: 10
    }
  ]
};
