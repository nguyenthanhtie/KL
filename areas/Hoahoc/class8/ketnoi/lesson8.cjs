module.exports = {
  classId: 8,
  curriculumType: 'ketnoi',
  chapterId: 3,
  chapterName: "Chương 3: Một số hợp chất thông dụng",
  lessonId: 8,
  title: 'Bài 8: Acid',
  description: 'Tìm hiểu khái niệm acid, tính chất hóa học, phản ứng đặc trưng và an toàn khi sử dụng',
  level: 'Beginner',
  order: 7,

  // Cấu trúc module mới
  modules: [
    // ============ MODULE 1: Khái niệm và phân loại Acid ============
    {
      id: 'module-1',
      title: 'Khái niệm về Acid',
      description: 'Tìm hiểu acid là gì, cách nhận biết và phân loại',
      order: 1,
      items: [
        {
          id: 'item-1-1',
          type: 'theory',
          title: 'Acid là gì?',
          duration: '4 min',
          section: 'Khái niệm',
          theoryModules: [
            {
              id: 'tm-1-1',
              type: 'heading',
              content: {
                text: '🌋 Acid (Axit)',
                level: 'h2'
              }
            },
            {
              id: 'tm-1-2',
              type: 'infoBox',
              content: {
                title: 'Định nghĩa Acid',
                content: '**Acid** là hợp chất khi tan trong nước phân li ra ion **H⁺**\n\n📌 Công thức thường bắt đầu bằng H:\n• HCl (axit clohidric)\n• H₂SO₄ (axit sunfuric)\n• HNO₃ (axit nitric)\n• H₃PO₄ (axit photphoric)',
                color: 'blue',
                listType: 'bullet'
              }
            },
            {
              id: 'tm-1-3',
              type: 'warningBox',
              content: {
                title: 'Nhận biết acid',
                content: '🔴 **Quỳ tím → Đỏ** (dấu hiệu đặc trưng)\n👅 Vị chua (KHÔNG được nếm!)\n⚡ Ion đặc trưng: H⁺',
                color: 'red'
              }
            }
          ]
        },
        {
          id: 'item-1-2',
          type: 'theory',
          title: 'Phân loại acid',
          duration: '3 min',
          section: 'Phân loại',
          theoryModules: [
            {
              id: 'tm-1-4',
              type: 'infoBox',
              content: {
                title: 'Phân loại acid',
                content: '**Acid mạnh:** HCl, HNO₃, H₂SO₄ (loãng)\n→ Phân li hoàn toàn trong nước\n\n**Acid yếu:** H₂CO₃, H₂S, H₃PO₄\n→ Phân li một phần trong nước',
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
          question: 'Ion đặc trưng của dung dịch acid là:',
          options: ['OH⁻', 'H⁺', 'Na⁺', 'Cl⁻'],
          correctAnswer: 1,
          explanation: 'Acid phân li ra ion H⁺ trong nước, đây là ion đặc trưng.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Acid làm quỳ tím:',
          options: ['Xanh', 'Đỏ', 'Vàng', 'Không đổi'],
          correctAnswer: 1,
          explanation: 'Acid làm quỳ tím chuyển sang màu đỏ.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Công thức đúng của axit sunfuric:',
          options: ['H₂SO₄', 'H₂SO₃', 'H₂S', 'HSO₄'],
          correctAnswer: 0,
          explanation: 'Axit sunfuric có công thức H₂SO₄.',
          points: 10
        },
        {
          type: 'true-false',
          question: 'HCl là acid yếu.',
          correctAnswer: false,
          explanation: 'Sai! HCl là acid mạnh, phân li hoàn toàn trong nước.',
          points: 10
        }
      ]
    },

    // ============ MODULE 2: Tính chất hóa học của Acid ============
    {
      id: 'module-2',
      title: 'Tính chất hóa học của Acid',
      description: 'Các phản ứng đặc trưng của acid',
      order: 2,
      items: [
        {
          id: 'item-2-1',
          type: 'theory',
          title: 'Acid tác dụng với kim loại',
          duration: '4 min',
          section: 'Tính chất',
          theoryModules: [
            {
              id: 'tm-2-1',
              type: 'heading',
              content: {
                text: '⚗️ Tính chất hóa học của Acid',
                level: 'h2'
              }
            },
            {
              id: 'tm-2-2',
              type: 'infoBox',
              content: {
                title: '1. Với kim loại (đứng trước H)',
                content: '**Acid + Kim loại → Muối + H₂↑**\n\n• Zn + 2HCl → ZnCl₂ + H₂↑\n• Fe + H₂SO₄ (loãng) → FeSO₄ + H₂↑\n• Mg + 2HCl → MgCl₂ + H₂↑\n\n📌 Chỉ kim loại đứng trước H trong dãy hoạt động hóa học mới phản ứng!',
                color: 'blue',
                listType: 'bullet'
              }
            }
          ]
        },
        {
          id: 'item-2-2',
          type: 'theory',
          title: 'Acid tác dụng với bazơ và oxide',
          duration: '5 min',
          section: 'Tính chất',
          theoryModules: [
            {
              id: 'tm-2-3',
              type: 'infoBox',
              content: {
                title: '2. Với bazơ (phản ứng trung hòa)',
                content: '**Acid + Bazơ → Muối + Nước**\n\n• HCl + NaOH → NaCl + H₂O\n• H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O\n• H₂SO₄ + Ca(OH)₂ → CaSO₄ + 2H₂O\n\n📌 Đây là phản ứng **trung hòa** - tạo muối và nước!',
                color: 'green',
                listType: 'bullet'
              }
            },
            {
              id: 'tm-2-4',
              type: 'infoBox',
              content: {
                title: '3. Với oxide bazơ',
                content: '**Acid + Oxide bazơ → Muối + Nước**\n\n• 2HCl + CuO → CuCl₂ + H₂O\n• H₂SO₄ + MgO → MgSO₄ + H₂O\n• 6HCl + Fe₂O₃ → 2FeCl₃ + 3H₂O',
                color: 'purple',
                listType: 'bullet'
              }
            }
          ]
        }
      ],
      // Quiz cho Module 2: 5 câu
      quizzes: [
        {
          type: 'multiple-choice',
          question: 'Phản ứng nào tạo ra khí H₂?',
          options: ['NaOH + HCl', 'Zn + HCl', 'CuO + H₂SO₄', 'Na₂O + H₂O'],
          correctAnswer: 1,
          explanation: 'Zn + 2HCl → ZnCl₂ + H₂↑. Kim loại + acid → muối + H₂.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Acid phản ứng với bazơ tạo:',
          options: ['Kim loại', 'Oxide', 'Muối và nước', 'Khí trơ'],
          correctAnswer: 2,
          explanation: 'Phản ứng trung hòa: Acid + Bazơ → Muối + Nước.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Sản phẩm của H₂SO₄ + 2NaOH là:',
          options: ['NaHSO₄ + H₂O', 'Na₂SO₄ + 2H₂O', 'Na₂S + H₂O', 'NaOH + H₂SO₄'],
          correctAnswer: 1,
          explanation: 'H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O (phản ứng trung hòa).',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Acid tác dụng với oxide bazơ tạo:',
          options: ['Kim loại + nước', 'Muối + nước', 'Khí CO₂', 'Chỉ nước'],
          correctAnswer: 1,
          explanation: 'Acid + Oxide bazơ → Muối + Nước.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Hiện tượng khi cho CaCO₃ vào HCl loãng là:',
          options: ['Không đổi', 'Sủi bọt khí CO₂', 'Tạo kết tủa trắng', 'Đổi màu tím'],
          correctAnswer: 1,
          explanation: 'CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂↑ (sủi bọt khí).',
          points: 10
        }
      ]
    },

    // ============ MODULE 3: An toàn và ứng dụng ============
    {
      id: 'module-3',
      title: 'An toàn và ứng dụng của Acid',
      description: 'Cách pha loãng acid an toàn và các ứng dụng thực tế',
      order: 3,
      items: [
        {
          id: 'item-3-1',
          type: 'theory',
          title: 'An toàn khi sử dụng acid',
          duration: '4 min',
          section: 'An toàn',
          theoryModules: [
            {
              id: 'tm-3-1',
              type: 'heading',
              content: {
                text: '⚠️ An toàn khi sử dụng Acid',
                level: 'h2'
              }
            },
            {
              id: 'tm-3-2',
              type: 'warningBox',
              content: {
                title: 'Quy tắc pha loãng H₂SO₄ đặc',
                content: '⚠️ **LUÔN rót ACID vào NƯỚC, từ từ, khuấy nhẹ!**\n\n❌ KHÔNG rót nước vào acid đặc → Sôi bắn, gây bỏng!\n\n📌 Nhớ: **A vào N** (Acid vào Nước)',
                color: 'red'
              }
            },
            {
              id: 'tm-3-3',
              type: 'infoBox',
              content: {
                title: 'Biện pháp an toàn',
                content: '👓 Đeo kính bảo hộ, găng tay\n🧤 Mặc áo blouse\n👃 Tránh hít hơi acid\n🧹 Nếu tràn đổ: trung hòa bằng NaHCO₃',
                color: 'blue',
                listType: 'bullet'
              }
            }
          ]
        },
        {
          id: 'item-3-2',
          type: 'theory',
          title: 'Ứng dụng của acid',
          duration: '3 min',
          section: 'Ứng dụng',
          theoryModules: [
            {
              id: 'tm-3-4',
              type: 'tipBox',
              content: {
                title: 'Ứng dụng của các loại acid',
                content: '🔹 **HCl:** Sản xuất muối, tẩy gỉ kim loại, chế biến thực phẩm\n🔹 **H₂SO₄:** Ắc quy, phân bón, thuốc nhuộm\n🔹 **HNO₃:** Phân bón, thuốc nổ, phẩm nhuộm\n🔹 **H₃PO₄:** Phân bón, nước giải khát',
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
          question: 'Khi pha loãng H₂SO₄ đặc cần:',
          options: [
            'Đổ nước vào axit',
            'Đổ axit vào nước từ từ, khuấy đều',
            'Đun nóng trước',
            'Không cần lưu ý'
          ],
          correctAnswer: 1,
          explanation: 'Luôn rót ACID vào NƯỚC từ từ để tránh sôi bắn nguy hiểm.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Ứng dụng đúng của H₂SO₄ là:',
          options: ['Nước giải khát', 'Ắc quy chì và phân bón', 'Gia vị', 'Thuốc tím'],
          correctAnswer: 1,
          explanation: 'H₂SO₄ dùng trong ắc quy, sản xuất phân bón, thuốc nhuộm.',
          points: 10
        },
        {
          type: 'true-false',
          question: 'Khi bị acid đổ vào tay, nên rửa ngay bằng nhiều nước.',
          correctAnswer: true,
          explanation: 'Đúng! Rửa ngay bằng nhiều nước để loãng acid và giảm tác hại.',
          points: 10
        }
      ]
    }
  ],

  // Legacy game array - giữ để tương thích ngược
  game: [
    {
      type: 'multiple-choice',
      question: 'Acid làm quỳ tím:',
      options: ['Xanh', 'Đỏ', 'Vàng', 'Không đổi'],
      correctAnswer: 1,
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng nào tạo H₂?',
      options: ['NaOH + HCl', 'Zn + HCl', 'CuO + H₂SO₄', 'Na₂O + H₂O'],
      correctAnswer: 1,
      points: 10
    }
  ]
};
