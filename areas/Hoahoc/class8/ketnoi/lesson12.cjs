module.exports = {
  classId: 8,
  curriculumType: 'ketnoi',
  chapterId: 3,
  chapterName: "Chương 3: Một số hợp chất thông dụng",
  lessonId: 12,
  title: 'Bài 12: Phân bón hóa học',
  description: 'Tìm hiểu về phân bón hóa học, phân loại, vai trò của các nguyên tố dinh dưỡng và cách sử dụng an toàn',
  level: 'Beginner',
  order: 11,

  // Cấu trúc module mới
  modules: [
    // ============ MODULE 1: Phân đơn - Đạm, Lân, Kali ============
    {
      id: 'module-1',
      title: 'Phân đơn: Đạm, Lân, Kali',
      description: 'Tìm hiểu 3 loại phân đơn quan trọng nhất',
      order: 1,
      items: [
        {
          id: 'item-1-1',
          type: 'theory',
          title: 'Phân đạm (N)',
          duration: '4 min',
          section: 'Phân đơn',
          theoryModules: [
            {
              id: 'tm-1-1',
              type: 'heading',
              content: {
                text: '🌾 Phân bón hóa học',
                level: 'h2'
              }
            },
            {
              id: 'tm-1-2',
              type: 'infoBox',
              content: {
                title: 'Phân đạm (N - Nitrogen)',
                content: '🌿 **Vai trò:** Thúc đẩy sinh trưởng, phát triển lá, thân\n\n**Các loại phân đạm:**\n• **Urê (NH₂)₂CO:** 46% N, phổ biến nhất\n• **Amoni nitrat NH₄NO₃:** 35% N\n• **Amoni sunfat (NH₄)₂SO₄:** 21% N\n\n📌 Thiếu N: lá vàng nhạt, cây còi cọc\n📌 Thừa N: lá rậm, dễ đổ, sâu bệnh',
                color: 'green',
                listType: 'bullet'
              }
            }
          ]
        },
        {
          id: 'item-1-2',
          type: 'theory',
          title: 'Phân lân (P) và Kali (K)',
          duration: '5 min',
          section: 'Phân đơn',
          theoryModules: [
            {
              id: 'tm-1-3',
              type: 'infoBox',
              content: {
                title: 'Phân lân (P - Phosphorus)',
                content: '🌸 **Vai trò:** Phát triển rễ, ra hoa, đậu quả\n\n**Các loại:**\n• **Supe lân Ca(H₂PO₄)₂:** Tan trong nước\n• **Lân nung chảy:** Tan trong đất chua\n\n📌 Thiếu P: lá tím, rễ kém phát triển',
                color: 'purple',
                listType: 'bullet'
              }
            },
            {
              id: 'tm-1-4',
              type: 'infoBox',
              content: {
                title: 'Phân kali (K - Potassium)',
                content: '🍎 **Vai trò:** Tăng chất lượng quả, chống chịu sâu bệnh\n\n**Các loại:**\n• **KCl (kali clorua):** Phổ biến, rẻ\n• **K₂SO₄ (kali sunfat):** Cho cây không chịu Cl\n\n📌 Thiếu K: mép lá cháy, quả nhỏ\n📌 Đủ K: quả chắc, ngọt, bảo quản tốt',
                color: 'orange',
                listType: 'bullet'
              }
            }
          ]
        }
      ],
      // Quiz cho Module 1: 5 câu
      quizzes: [
        {
          type: 'multiple-choice',
          question: 'Phân đạm cung cấp nguyên tố:',
          options: ['P', 'K', 'N', 'Ca'],
          correctAnswer: 2,
          explanation: 'Phân đạm cung cấp N (nitrogen) cho cây trồng.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Hàm lượng N trong urê khoảng:',
          options: ['16%', '30%', '46%', '60%'],
          correctAnswer: 2,
          explanation: 'Urê (NH₂)₂CO có hàm lượng N cao nhất, khoảng 46%.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Phân kali điển hình là:',
          options: ['KCl, K₂SO₄', 'NH₄NO₃', 'Ca(H₂PO₄)₂', 'NaCl'],
          correctAnswer: 0,
          explanation: 'KCl và K₂SO₄ là hai loại phân kali phổ biến.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Supe lân thuộc nhóm:',
          options: ['Phân đạm', 'Phân lân', 'Phân kali', 'Vi lượng'],
          correctAnswer: 1,
          explanation: 'Supe lân Ca(H₂PO₄)₂ là phân lân, cung cấp P.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Vai trò chính của phân lân là:',
          options: ['Thúc lá xanh', 'Phát triển rễ, ra hoa', 'Tăng chất lượng quả', 'Chống rét'],
          correctAnswer: 1,
          explanation: 'Phân lân (P) giúp phát triển rễ và ra hoa, đậu quả.',
          points: 10
        }
      ]
    },

    // ============ MODULE 2: Phân hỗn hợp NPK ============
    {
      id: 'module-2',
      title: 'Phân hỗn hợp NPK',
      description: 'Tìm hiểu về phân NPK và cách đọc công thức',
      order: 2,
      items: [
        {
          id: 'item-2-1',
          type: 'theory',
          title: 'Phân NPK là gì?',
          duration: '4 min',
          section: 'Phân hỗn hợp',
          theoryModules: [
            {
              id: 'tm-2-1',
              type: 'heading',
              content: {
                text: '🎯 Phân NPK và phân vi lượng',
                level: 'h2'
              }
            },
            {
              id: 'tm-2-2',
              type: 'infoBox',
              content: {
                title: 'Phân NPK (phân hỗn hợp)',
                content: '**NPK** là phân chứa cả 3 nguyên tố: N, P, K\n\n📝 **Cách đọc công thức:**\nNPK 16-16-8 nghĩa là:\n• 16% N (đạm)\n• 16% P₂O₅ (lân)\n• 8% K₂O (kali)\n\n📌 Còn lại là chất độn, vi lượng',
                color: 'blue',
                listType: 'bullet'
              }
            },
            {
              id: 'tm-2-3',
              type: 'tipBox',
              content: {
                title: 'Ưu điểm NPK',
                content: '✅ Cân bằng dinh dưỡng\n✅ Tiện lợi, bón 1 lần\n✅ Có nhiều công thức cho từng loại cây\n• Cây lá: NPK cao N (20-10-10)\n• Cây quả: NPK cao K (15-15-20)',
                color: 'green'
              }
            }
          ]
        },
        {
          id: 'item-2-2',
          type: 'theory',
          title: 'Phân vi lượng',
          duration: '3 min',
          section: 'Vi lượng',
          theoryModules: [
            {
              id: 'tm-2-4',
              type: 'infoBox',
              content: {
                title: 'Phân vi lượng',
                content: '🔬 **Nguyên tố vi lượng:** Fe, Zn, Cu, Mn, B, Mo...\n\n• Cây cần lượng rất nhỏ nhưng thiết yếu\n• Thiếu gây bệnh vàng lá, còi cọc, rụng trái\n• Thường bổ sung qua phun lá hoặc bón gốc\n\n📌 Phân trung lượng: Ca, Mg, S',
                color: 'purple',
                listType: 'bullet'
              }
            }
          ]
        }
      ],
      // Quiz cho Module 2: 4 câu
      quizzes: [
        {
          type: 'multiple-choice',
          question: 'Công thức NPK 16-16-8 có ý nghĩa:',
          options: ['16% N, 16% P₂O₅, 8% K₂O', '16% N, 8% P₂O₅, 16% K₂O', '8% N, 16% P₂O₅, 16% K₂O', 'Tổng 40% chất trơ'],
          correctAnswer: 0,
          explanation: 'NPK 16-16-8: 16% N, 16% P₂O₅, 8% K₂O theo thứ tự.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Cây ăn quả nên dùng NPK có:',
          options: ['N cao nhất', 'P cao nhất', 'K cao nhất', 'Ba nguyên tố bằng nhau'],
          correctAnswer: 2,
          explanation: 'Cây ăn quả cần K cao để tăng chất lượng quả.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Nguyên tố vi lượng là:',
          options: ['N, P, K', 'Fe, Zn, Cu, Mn', 'Ca, Mg, S', 'C, H, O'],
          correctAnswer: 1,
          explanation: 'Vi lượng gồm Fe, Zn, Cu, Mn, B... cây cần lượng rất nhỏ.',
          points: 10
        },
        {
          type: 'true-false',
          question: 'NPK 20-10-10 phù hợp cho cây lấy lá.',
          correctAnswer: true,
          explanation: 'Đúng! N cao (20%) giúp phát triển lá, thân, phù hợp rau lá.',
          points: 10
        }
      ]
    },

    // ============ MODULE 3: Sử dụng phân bón đúng cách ============
    {
      id: 'module-3',
      title: 'Sử dụng phân bón đúng cách',
      description: 'Nguyên tắc bón phân và bảo vệ môi trường',
      order: 3,
      items: [
        {
          id: 'item-3-1',
          type: 'theory',
          title: 'Nguyên tắc 4 đúng',
          duration: '4 min',
          section: 'Sử dụng',
          theoryModules: [
            {
              id: 'tm-3-1',
              type: 'heading',
              content: {
                text: '✅ Sử dụng phân bón đúng cách',
                level: 'h2'
              }
            },
            {
              id: 'tm-3-2',
              type: 'warningBox',
              content: {
                title: 'Nguyên tắc 4 ĐÚNG',
                content: '1️⃣ **Đúng loại:** Chọn phân phù hợp với cây, đất\n2️⃣ **Đúng liều:** Không bón quá nhiều hoặc quá ít\n3️⃣ **Đúng lúc:** Bón theo giai đoạn sinh trưởng\n4️⃣ **Đúng cách:** Bón gốc, phun lá, tưới gốc...',
                color: 'orange'
              }
            },
            {
              id: 'tm-3-3',
              type: 'tipBox',
              content: {
                title: 'Cách bón phân',
                content: '🌱 **Bón lót:** Trước khi trồng (phân lân, một phần đạm)\n🌿 **Bón thúc:** Khi cây đang phát triển (đạm, kali)\n💧 **Phun lá:** Bổ sung vi lượng, nhanh hấp thu',
                color: 'green'
              }
            }
          ]
        },
        {
          id: 'item-3-2',
          type: 'theory',
          title: 'An toàn và môi trường',
          duration: '4 min',
          section: 'An toàn',
          theoryModules: [
            {
              id: 'tm-3-4',
              type: 'warningBox',
              content: {
                title: 'Tác hại lạm dụng phân bón',
                content: '⚠️ **Với đất:** Chua hóa, mất vi sinh vật, thoái hóa\n⚠️ **Với nước:** Phú dưỡng hóa (tảo phát triển, cá chết)\n⚠️ **Với sản phẩm:** Tích lũy nitrat, gây hại sức khỏe\n⚠️ **Với môi trường:** Phát thải N₂O (khí nhà kính)',
                color: 'red'
              }
            },
            {
              id: 'tm-3-5',
              type: 'infoBox',
              content: {
                title: 'Biện pháp bảo vệ',
                content: '✅ Không lạm dụng phân hóa học\n✅ Kết hợp phân hữu cơ\n✅ Không bón đạm sát ngày thu hoạch\n✅ Bảo quản phân khô ráo, tránh ẩm\n✅ Đeo khẩu trang, găng tay khi bón phân',
                color: 'blue',
                listType: 'bullet'
              }
            }
          ]
        }
      ],
      // Quiz cho Module 3: 4 câu
      quizzes: [
        {
          type: 'multiple-choice',
          question: 'Nguyên tắc "4 đúng" khi bón phân gồm:',
          options: ['Đúng loại, liều, lúc, cách', 'Đúng giá, chỗ, người, mùa', 'Đúng màu, mùi, vị, pH', 'Đúng đất, nước, khí, nhiệt'],
          correctAnswer: 0,
          explanation: '4 đúng: Đúng loại, đúng liều, đúng lúc, đúng cách.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Lạm dụng phân đạm dễ gây hậu quả:',
          options: ['Đất kiềm hóa mạnh', 'Tích lũy nitrat, ô nhiễm nước', 'Thiếu vi lượng Fe', 'Giảm năng suất lá'],
          correctAnswer: 1,
          explanation: 'Lạm dụng đạm gây tích lũy nitrat, phú dưỡng hóa nước.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Bón lót thường áp dụng cho:',
          options: ['Phân lân và một phần đạm', 'Chỉ phân đạm', 'Chỉ phân kali', 'Tất cả đều bón thúc'],
          correctAnswer: 0,
          explanation: 'Bón lót: phân lân (khó tan) + một phần đạm trước khi trồng.',
          points: 10
        },
        {
          type: 'true-false',
          question: 'Nên bón nhiều phân đạm ngay trước khi thu hoạch rau.',
          correctAnswer: false,
          explanation: 'Sai! Không bón đạm sát thu hoạch vì tích lũy nitrat gây hại.',
          points: 10
        }
      ]
    }
  ],

  // Legacy game array - giữ để tương thích ngược
  game: [
    {
      type: 'multiple-choice',
      question: 'Phân đạm cung cấp nguyên tố:',
      options: ['P', 'K', 'N', 'Ca'],
      correctAnswer: 2,
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Hàm lượng N trong urê khoảng:',
      options: ['16%', '30%', '46%', '60%'],
      correctAnswer: 2,
      points: 10
    }
  ]
};
