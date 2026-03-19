module.exports = {
  classId: 8,
  curriculumType: 'ketnoi',
  chapterId: 2,
  chapterName: "Chương 2: Phản ứng hóa học",
  lessonId: 4,
  title: 'Bài 4: Dung dịch và nồng độ',
  description: 'Tìm hiểu về dung dịch, độ tan, nồng độ phần trăm và cách pha chế dung dịch',
  level: 'Beginner',
  order: 3,

  // Cấu trúc module mới
  modules: [
    // ============ MODULE 1: Khái niệm dung dịch ============
    {
      id: 'module-1',
      title: 'Dung dịch và độ tan',
      description: 'Tìm hiểu khái niệm dung dịch, chất tan, dung môi và độ tan',
      order: 1,
      items: [
        {
          id: 'item-1-1',
          type: 'theory',
          title: 'Dung dịch là gì?',
          duration: '4 min',
          section: 'Khái niệm cơ bản',
          theoryModules: [
            {
              id: 'tm-1-1',
              type: 'heading',
              content: {
                text: '💧 Dung dịch và các thành phần',
                level: 'h2'
              }
            },
            {
              id: 'tm-1-2',
              type: 'paragraph',
              content: {
                text: 'Dung dịch là hỗn hợp đồng nhất của chất tan và dung môi. Ví dụ: nước muối (NaCl tan trong nước), nước đường.'
              }
            },
            {
              id: 'tm-1-3',
              type: 'infoBox',
              content: {
                title: 'Các thành phần dung dịch',
                content: '**Chất tan:** Chất bị hòa tan (muối, đường...)\n**Dung môi:** Chất hòa tan (thường là nước)\n**Dung dịch:** Hỗn hợp đồng nhất của chất tan + dung môi\n\n📌 m(dung dịch) = m(chất tan) + m(dung môi)',
                color: 'blue',
                listType: 'bullet'
              }
            }
          ]
        },
        {
          id: 'item-1-2',
          type: 'theory',
          title: 'Độ tan và dung dịch bão hòa',
          duration: '4 min',
          section: 'Độ tan',
          theoryModules: [
            {
              id: 'tm-1-4',
              type: 'infoBox',
              content: {
                title: 'Độ tan (S)',
                content: '**Định nghĩa:** Số gam chất tan tối đa hòa tan trong 100g nước ở nhiệt độ xác định.\n\n**Đơn vị:** g/100g nước\n\n**Ví dụ:** Độ tan của NaCl ở 20°C là 36g/100g nước → có thể tan tối đa 36g NaCl trong 100g nước.',
                color: 'green',
                listType: 'bullet'
              }
            },
            {
              id: 'tm-1-5',
              type: 'warningBox',
              content: {
                title: 'Dung dịch bão hòa',
                content: '**Bão hòa:** Dung dịch không thể hòa tan thêm chất tan ở nhiệt độ đó.\n**Chưa bão hòa:** Còn có thể hòa tan thêm.\n**Quá bão hòa:** Tan nhiều hơn mức bình thường (không ổn định).',
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
          question: 'Dung dịch bão hòa là:',
          options: [
            'Tan vô hạn',
            'Không tan thêm ở nhiệt độ đó',
            'Luôn loãng',
            'Chỉ có chất rắn'
          ],
          correctAnswer: 1,
          explanation: 'Dung dịch bão hòa là dung dịch không thể hòa tan thêm chất tan ở nhiệt độ đó.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Độ tan S là:',
          options: [
            'g chất tan/100 g dung dịch',
            'g chất tan/100 g nước ở nhiệt độ xác định',
            'mol/L dung dịch',
            'g chất tan/1 L dung môi'
          ],
          correctAnswer: 1,
          explanation: 'Độ tan là số gam chất tan tối đa hòa tan trong 100g nước ở nhiệt độ xác định.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'm(dung dịch) được tính bằng:',
          options: [
            'm(ct) + m(dm)',
            'm(ct) − m(dm)',
            'm(ct) × m(dm)',
            'm(ct)/m(dm)'
          ],
          correctAnswer: 0,
          explanation: 'Khối lượng dung dịch = khối lượng chất tan + khối lượng dung môi.',
          points: 10
        },
        {
          type: 'true-false',
          question: 'Độ tan của chất rắn trong nước thường tăng khi nhiệt độ tăng.',
          correctAnswer: true,
          explanation: 'Đúng! Hầu hết chất rắn tan tốt hơn trong nước nóng.',
          points: 10
        }
      ]
    },

    // ============ MODULE 2: Nồng độ phần trăm ============
    {
      id: 'module-2',
      title: 'Nồng độ phần trăm (C%)',
      description: 'Cách tính nồng độ phần trăm khối lượng',
      order: 2,
      items: [
        {
          id: 'item-2-1',
          type: 'theory',
          title: 'Công thức nồng độ phần trăm',
          duration: '5 min',
          section: 'Nồng độ C%',
          theoryModules: [
            {
              id: 'tm-2-1',
              type: 'heading',
              content: {
                text: '📊 Nồng độ phần trăm khối lượng',
                level: 'h2'
              }
            },
            {
              id: 'tm-2-2',
              type: 'infoBox',
              content: {
                title: 'Công thức C%',
                content: '**C% = (m chất tan / m dung dịch) × 100%**\n\nTrong đó:\n• m(ct): khối lượng chất tan (g)\n• m(dd): khối lượng dung dịch (g)\n• m(dd) = m(ct) + m(dm)',
                color: 'blue',
                listType: 'bullet'
              }
            },
            {
              id: 'tm-2-3',
              type: 'tipBox',
              content: {
                title: 'Ví dụ tính C%',
                content: '**Bài:** Hòa tan 20g NaCl vào 180g nước. Tính C%.\n\n**Giải:**\n• m(dd) = 20 + 180 = 200g\n• C% = (20/200) × 100% = **10%**',
                color: 'green'
              }
            }
          ]
        },
        {
          id: 'item-2-2',
          type: 'theory',
          title: 'Tính khối lượng chất tan từ C%',
          duration: '4 min',
          section: 'Bài tập',
          theoryModules: [
            {
              id: 'tm-2-4',
              type: 'infoBox',
              content: {
                title: 'Công thức ngược',
                content: '**m(ct) = C% × m(dd) / 100**\n\n**Ví dụ:** Tính khối lượng NaCl trong 200g dung dịch NaCl 5%\nm(ct) = 5 × 200 / 100 = **10g NaCl**',
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
          question: 'C% cho biết gì?',
          options: [
            'g chất tan/100 g dung dịch',
            'mol chất tan/1 L dung dịch',
            'g dung môi/100 g dung dịch',
            'mL chất tan/1 L dung dịch'
          ],
          correctAnswer: 0,
          explanation: 'C% cho biết số gam chất tan trong 100g dung dịch.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Công thức tính C% là:',
          options: [
            'C% = m(dd)/m(ct)',
            'C% = m(ct)/m(dd) × 100%',
            'C% = m(dd)/100',
            'C% = m(ct) × m(dd)'
          ],
          correctAnswer: 1,
          explanation: 'C% = (khối lượng chất tan / khối lượng dung dịch) × 100%',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Để pha 200g dung dịch NaCl 5%, khối lượng NaCl cần là:',
          options: ['5 g', '10 g', '20 g', '50 g'],
          correctAnswer: 1,
          explanation: 'm(NaCl) = 5% × 200g / 100 = 10g',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: '200g dung dịch KCl 8% có bao nhiêu gam KCl?',
          options: ['8 g', '16 g', '20 g', '24 g'],
          correctAnswer: 1,
          explanation: 'm(KCl) = 8% × 200g / 100 = 16g',
          points: 10
        }
      ]
    },

    // ============ MODULE 3: Pha loãng và cô đặc ============
    {
      id: 'module-3',
      title: 'Pha loãng và cô đặc dung dịch',
      description: 'Cách thay đổi nồng độ dung dịch',
      order: 3,
      items: [
        {
          id: 'item-3-1',
          type: 'theory',
          title: 'Pha loãng dung dịch',
          duration: '4 min',
          section: 'Pha chế',
          theoryModules: [
            {
              id: 'tm-3-1',
              type: 'heading',
              content: {
                text: '🔬 Pha loãng và cô đặc dung dịch',
                level: 'h2'
              }
            },
            {
              id: 'tm-3-2',
              type: 'infoBox',
              content: {
                title: 'Pha loãng dung dịch',
                content: '**Cách làm:** Thêm dung môi (nước) vào dung dịch\n**Kết quả:** m(ct) giữ nguyên, m(dd) tăng → C% giảm\n\n**Ví dụ:** 100g dd 20% → pha loãng thành 10%\n• m(ct) = 20g (không đổi)\n• m(dd mới) = 20g / 10% × 100 = 200g\n• Cần thêm: 200 - 100 = 100g nước',
                color: 'blue',
                listType: 'bullet'
              }
            }
          ]
        },
        {
          id: 'item-3-2',
          type: 'theory',
          title: 'Cô đặc dung dịch',
          duration: '3 min',
          section: 'Pha chế',
          theoryModules: [
            {
              id: 'tm-3-3',
              type: 'infoBox',
              content: {
                title: 'Cô đặc dung dịch',
                content: '**Cách làm:** Đun bay hơi bớt dung môi\n**Kết quả:** m(ct) giữ nguyên, m(dd) giảm → C% tăng\n\n**Hoặc:** Thêm chất tan → m(ct) tăng → C% tăng',
                color: 'orange',
                listType: 'bullet'
              }
            },
            {
              id: 'tm-3-4',
              type: 'warningBox',
              content: {
                title: 'Nguyên tắc quan trọng',
                content: 'Khi pha loãng hoặc cô đặc:\n• m(ct) × C% cũ = m(ct) × C% mới\n• Khối lượng chất tan được bảo toàn!',
                color: 'red'
              }
            }
          ]
        }
      ],
      // Quiz cho Module 3: 4 câu
      quizzes: [
        {
          type: 'multiple-choice',
          question: 'Pha loãng dung dịch nghĩa là:',
          options: [
            'Tăng m chất tan',
            'Giảm m chất tan',
            'Tăng dung môi, m(ct) giữ nguyên',
            'Giảm dung môi, m(ct) giữ nguyên'
          ],
          correctAnswer: 2,
          explanation: 'Pha loãng = thêm dung môi, khối lượng chất tan không đổi.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Nếu C% tăng khi cô đặc dung dịch, điều này do:',
          options: [
            'Thêm nước',
            'Bay hơi bớt dung môi',
            'Hạ nhiệt độ',
            'Khuấy mạnh hơn'
          ],
          correctAnswer: 1,
          explanation: 'Cô đặc = bay hơi bớt dung môi → m(dd) giảm → C% tăng.',
          points: 10
        },
        {
          type: 'true-false',
          question: 'Khi pha loãng dung dịch, khối lượng chất tan giảm đi.',
          correctAnswer: false,
          explanation: 'Sai! Khi pha loãng, khối lượng chất tan KHÔNG ĐỔI, chỉ có m(dd) tăng.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Muốn pha loãng dung dịch từ 20% xuống 10%, ta phải:',
          options: [
            'Thêm chất tan',
            'Thêm dung môi (nước)',
            'Đun nóng bay hơi',
            'Làm lạnh dung dịch'
          ],
          correctAnswer: 1,
          explanation: 'Thêm nước để tăng m(dd), giữ nguyên m(ct) → C% giảm.',
          points: 10
        }
      ]
    }
  ],

  // Legacy game array - giữ để tương thích ngược
  game: [
    {
      type: 'multiple-choice',
      question: 'C% cho biết gì?',
      options: ['g chất tan/100 g dung dịch', 'mol chất tan/1 L dung dịch', 'g dung môi/100 g dung dịch', 'mL chất tan/1 L dung dịch'],
      correctAnswer: 0,
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Công thức tính C% là:',
      options: ['C% = m(dd)/m(ct)', 'C% = m(ct)/m(dd) × 100%', 'C% = m(dd)/100', 'C% = m(ct) × m(dd)'],
      correctAnswer: 1,
      points: 10
    }
  ]
};
