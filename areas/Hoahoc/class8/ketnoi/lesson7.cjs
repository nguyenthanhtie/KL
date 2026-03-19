module.exports = {
  classId: 8,
  curriculumType: 'ketnoi',
  chapterId: 2,
  chapterName: "Chương 2: Phản ứng hóa học",
  lessonId: 7,
  title: 'Bài 7: Tốc độ phản ứng và chất xúc tác',
  description: 'Tìm hiểu tốc độ phản ứng, các yếu tố ảnh hưởng và vai trò của chất xúc tác',
  level: 'Beginner',
  order: 6,

  // Cấu trúc module mới
  modules: [
    // ============ MODULE 1: Tốc độ phản ứng ============
    {
      id: 'module-1',
      title: 'Tốc độ phản ứng hóa học',
      description: 'Hiểu khái niệm tốc độ phản ứng và cách đo lường',
      order: 1,
      items: [
        {
          id: 'item-1-1',
          type: 'theory',
          title: 'Khái niệm tốc độ phản ứng',
          duration: '4 min',
          section: 'Khái niệm',
          theoryModules: [
            {
              id: 'tm-1-1',
              type: 'heading',
              content: {
                text: '🚀 Tốc độ phản ứng hóa học',
                level: 'h2'
              }
            },
            {
              id: 'tm-1-2',
              type: 'paragraph',
              content: {
                text: 'Tốc độ phản ứng là mức độ biến đổi nồng độ của chất phản ứng hoặc sản phẩm theo thời gian. Phản ứng nhanh hay chậm phụ thuộc vào nhiều yếu tố.'
              }
            },
            {
              id: 'tm-1-3',
              type: 'infoBox',
              content: {
                title: 'Ví dụ so sánh',
                content: '⚡ **Phản ứng nhanh:**\n• Đốt cháy xăng, nổ pháo hoa\n• Trung hòa acid-base\n\n🐢 **Phản ứng chậm:**\n• Sắt bị gỉ (có thể mất nhiều năm)\n• Thực phẩm bị phân hủy',
                color: 'blue',
                listType: 'bullet'
              }
            }
          ]
        }
      ],
      // Quiz cho Module 1: 3 câu
      quizzes: [
        {
          type: 'multiple-choice',
          question: 'Tốc độ phản ứng là:',
          options: [
            'Khối lượng chất tham gia',
            'Mức độ biến đổi nồng độ chất theo thời gian',
            'Thể tích khí sinh ra',
            'Nhiệt độ phản ứng'
          ],
          correctAnswer: 1,
          explanation: 'Tốc độ phản ứng đo mức độ nhanh/chậm của sự biến đổi nồng độ chất theo thời gian.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Phản ứng nào xảy ra nhanh?',
          options: ['Sắt bị gỉ', 'Đốt cháy xăng', 'Thức ăn bị thiu', 'Cao su lão hóa'],
          correctAnswer: 1,
          explanation: 'Đốt cháy xăng là phản ứng cháy xảy ra rất nhanh.',
          points: 10
        },
        {
          type: 'true-false',
          question: 'Phản ứng gỉ sắt là phản ứng xảy ra nhanh.',
          correctAnswer: false,
          explanation: 'Sai! Gỉ sắt là phản ứng chậm, có thể diễn ra trong nhiều năm.',
          points: 10
        }
      ]
    },

    // ============ MODULE 2: Các yếu tố ảnh hưởng ============
    {
      id: 'module-2',
      title: 'Các yếu tố ảnh hưởng tốc độ phản ứng',
      description: 'Tìm hiểu 4 yếu tố ảnh hưởng đến tốc độ phản ứng',
      order: 2,
      items: [
        {
          id: 'item-2-1',
          type: 'theory',
          title: 'Nhiệt độ và nồng độ',
          duration: '4 min',
          section: 'Yếu tố ảnh hưởng',
          theoryModules: [
            {
              id: 'tm-2-1',
              type: 'heading',
              content: {
                text: '🔧 4 yếu tố ảnh hưởng tốc độ phản ứng',
                level: 'h2'
              }
            },
            {
              id: 'tm-2-2',
              type: 'infoBox',
              content: {
                title: '1. Nhiệt độ',
                content: '🔥 **Nhiệt độ tăng → Tốc độ tăng**\n\n• Các phân tử chuyển động nhanh hơn\n• Va chạm nhiều hơn, mạnh hơn\n• Ví dụ: Thức ăn hỏng nhanh hơn khi để ngoài trời nóng',
                color: 'orange',
                listType: 'bullet'
              }
            },
            {
              id: 'tm-2-3',
              type: 'infoBox',
              content: {
                title: '2. Nồng độ',
                content: '📊 **Nồng độ tăng → Tốc độ tăng**\n\n• Nhiều phân tử hơn → va chạm nhiều hơn\n• Ví dụ: Đốt gỗ trong khí O₂ nguyên chất nhanh hơn trong không khí',
                color: 'blue',
                listType: 'bullet'
              }
            }
          ]
        },
        {
          id: 'item-2-2',
          type: 'theory',
          title: 'Diện tích tiếp xúc và áp suất',
          duration: '4 min',
          section: 'Yếu tố ảnh hưởng',
          theoryModules: [
            {
              id: 'tm-2-4',
              type: 'infoBox',
              content: {
                title: '3. Diện tích tiếp xúc',
                content: '📐 **Diện tích tăng → Tốc độ tăng**\n\n• Nghiền nhỏ chất rắn → tăng bề mặt tiếp xúc\n• Ví dụ: Bột than cháy nhanh hơn cục than',
                color: 'green',
                listType: 'bullet'
              }
            },
            {
              id: 'tm-2-5',
              type: 'infoBox',
              content: {
                title: '4. Áp suất (với chất khí)',
                content: '💨 **Áp suất tăng → Tốc độ tăng**\n\n• Nén khí làm tăng nồng độ\n• Các phân tử khí gần nhau hơn, va chạm nhiều hơn',
                color: 'purple',
                listType: 'bullet'
              }
            },
            {
              id: 'tm-2-6',
              type: 'tipBox',
              content: {
                title: 'Mẹo nhớ: 4 đòn bẩy tốc độ',
                content: '📌 **NĐDT:** Nhiệt độ - Đậm đặc (nồng độ) - Diện tích - (áp suất) Tăng\n→ Tất cả tăng thì tốc độ tăng!',
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
          question: 'Yếu tố nào KHÔNG làm tăng tốc độ phản ứng?',
          options: ['Tăng nhiệt độ', 'Tăng nồng độ', 'Giảm diện tích tiếp xúc', 'Dùng xúc tác'],
          correctAnswer: 2,
          explanation: 'Giảm diện tích tiếp xúc sẽ làm GIẢM tốc độ phản ứng.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Tăng diện tích tiếp xúc nghĩa là:',
          options: ['Dùng khối rắn lớn', 'Nghiền nhỏ chất rắn', 'Giảm nồng độ', 'Hạ nhiệt độ'],
          correctAnswer: 1,
          explanation: 'Nghiền nhỏ chất rắn làm tăng bề mặt tiếp xúc.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Tăng nhiệt độ thường làm phản ứng:',
          options: ['Chậm hơn', 'Nhanh hơn', 'Không đổi', 'Dừng lại'],
          correctAnswer: 1,
          explanation: 'Nhiệt độ cao làm phân tử chuyển động nhanh, va chạm nhiều hơn → phản ứng nhanh hơn.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Để giảm tốc độ hư hỏng thực phẩm, biện pháp hiệu quả là:',
          options: ['Tăng nhiệt', 'Giảm nhiệt (bảo quản lạnh)', 'Tăng pH', 'Thêm kim loại'],
          correctAnswer: 1,
          explanation: 'Giảm nhiệt độ làm chậm phản ứng phân hủy thực phẩm.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Đốt gỗ trong khí O₂ nguyên chất nhanh hơn trong không khí vì:',
          options: ['Nhiệt độ cao hơn', 'Nồng độ O₂ cao hơn', 'Diện tích lớn hơn', 'Áp suất thấp hơn'],
          correctAnswer: 1,
          explanation: 'O₂ nguyên chất có nồng độ cao hơn trong không khí (21% O₂).',
          points: 10
        }
      ]
    },

    // ============ MODULE 3: Chất xúc tác ============
    {
      id: 'module-3',
      title: 'Chất xúc tác',
      description: 'Tìm hiểu vai trò và đặc điểm của chất xúc tác',
      order: 3,
      items: [
        {
          id: 'item-3-1',
          type: 'theory',
          title: 'Khái niệm chất xúc tác',
          duration: '4 min',
          section: 'Chất xúc tác',
          theoryModules: [
            {
              id: 'tm-3-1',
              type: 'heading',
              content: {
                text: '⚗️ Chất xúc tác',
                level: 'h2'
              }
            },
            {
              id: 'tm-3-2',
              type: 'infoBox',
              content: {
                title: 'Định nghĩa',
                content: '**Chất xúc tác** là chất làm thay đổi tốc độ phản ứng (thường là tăng) nhưng **không bị tiêu hao** sau phản ứng.\n\n📌 Xúc tác vẫn còn nguyên sau phản ứng, có thể dùng lại!',
                color: 'blue',
                listType: 'bullet'
              }
            },
            {
              id: 'tm-3-3',
              type: 'warningBox',
              content: {
                title: 'Cơ chế hoạt động',
                content: '• Giảm năng lượng hoạt hóa của phản ứng\n• Thay đổi đường đi (cơ chế) của phản ứng\n• Không làm thay đổi cân bằng hay lượng sản phẩm cuối cùng',
                color: 'orange'
              }
            }
          ]
        },
        {
          id: 'item-3-2',
          type: 'theory',
          title: 'Ví dụ và ứng dụng',
          duration: '4 min',
          section: 'Ứng dụng',
          theoryModules: [
            {
              id: 'tm-3-4',
              type: 'infoBox',
              content: {
                title: 'Xúc tác vô cơ',
                content: '🔬 **Trong công nghiệp:**\n• MnO₂: phân hủy KClO₃, H₂O₂\n• V₂O₅: sản xuất H₂SO₄ (phương pháp tiếp xúc)\n• Ni: hidro hóa dầu thực vật\n• Fe: tổng hợp NH₃ (Haber)',
                color: 'purple',
                listType: 'bullet'
              }
            },
            {
              id: 'tm-3-5',
              type: 'infoBox',
              content: {
                title: 'Xúc tác sinh học (Enzym)',
                content: '🧬 **Trong cơ thể sống:**\n• Amylase: phân hủy tinh bột → đường\n• Pepsin: tiêu hóa protein\n• Lipase: tiêu hóa chất béo\n\n📌 Enzym là xúc tác sinh học, hiệu quả cao ở điều kiện nhẹ nhàng!',
                color: 'green',
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
          question: 'Chất xúc tác là:',
          options: [
            'Chất bị tiêu hao trong phản ứng',
            'Chất làm tăng tốc độ và không bị tiêu hao sau phản ứng',
            'Chất làm giảm khối lượng sản phẩm',
            'Sản phẩm của phản ứng'
          ],
          correctAnswer: 1,
          explanation: 'Xúc tác làm tăng tốc độ nhưng không bị tiêu hao, còn nguyên sau phản ứng.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Ví dụ về xúc tác sinh học là:',
          options: ['MnO₂', 'Enzym/men tiêu hóa', 'V₂O₅', 'Fe₂O₃'],
          correctAnswer: 1,
          explanation: 'Enzym (men) là xúc tác sinh học có trong cơ thể sống.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Phát biểu đúng về chất xúc tác:',
          options: [
            'Luôn là kim loại',
            'Thay đổi cơ chế, giảm năng lượng hoạt hóa',
            'Tạo ra sản phẩm khác',
            'Chỉ dùng cho phản ứng phân hủy'
          ],
          correctAnswer: 1,
          explanation: 'Xúc tác hoạt động bằng cách giảm năng lượng hoạt hóa, thay đổi cơ chế phản ứng.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Trong công nghiệp H₂SO₄ (phương pháp tiếp xúc), xúc tác dùng là:',
          options: ['V₂O₅', 'MnO₂', 'Ni', 'Ag'],
          correctAnswer: 0,
          explanation: 'V₂O₅ là xúc tác trong quá trình oxi hóa SO₂ thành SO₃.',
          points: 10
        }
      ]
    }
  ],

  // Legacy game array - giữ để tương thích ngược
  game: [
    {
      type: 'multiple-choice',
      question: 'Yếu tố nào không làm tăng tốc độ phản ứng?',
      options: ['Tăng nhiệt độ', 'Tăng nồng độ', 'Giảm diện tích tiếp xúc', 'Dùng xúc tác'],
      correctAnswer: 2,
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Chất xúc tác là:',
      options: ['Chất bị tiêu hao', 'Chất làm tăng tốc độ và không bị tiêu hao sau phản ứng', 'Chất làm giảm khối lượng', 'Chất sản phẩm'],
      correctAnswer: 1,
      points: 10
    }
  ]
};
