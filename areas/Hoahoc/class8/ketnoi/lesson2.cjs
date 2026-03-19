module.exports = {
  classId: 8,
  curriculumType: 'ketnoi',
  chapterId: 2,
  chapterName: "Chương 2: Phản ứng hóa học",
  lessonId: 2,
  title: 'Bài 2: Phản ứng hóa học',
  description: 'Tìm hiểu khái niệm phản ứng hóa học, dấu hiệu nhận biết và 4 loại phản ứng cơ bản',
  level: 'Beginner',
  order: 1,

  // Cấu trúc module mới
  modules: [
    // ============ MODULE 1: Khái niệm và dấu hiệu phản ứng hóa học ============
    {
      id: 'module-1',
      title: 'Khái niệm phản ứng hóa học',
      description: 'Tìm hiểu phản ứng hóa học là gì và cách nhận biết',
      order: 1,
      items: [
        {
          id: 'item-1-1',
          type: 'theory',
          title: 'Phản ứng hóa học là gì?',
          duration: '4 min',
          section: 'Khái niệm cơ bản',
          theoryModules: [
            {
              id: 'tm-1-1',
              type: 'heading',
              content: {
                text: '⚡ Phản ứng hóa học',
                level: 'h2'
              }
            },
            {
              id: 'tm-1-2',
              type: 'paragraph',
              content: {
                text: 'Phản ứng hóa học là quá trình biến đổi từ chất này thành chất khác. Trong quá trình này, liên kết giữa các nguyên tử bị bẻ gãy và hình thành liên kết mới.'
              }
            },
            {
              id: 'tm-1-3',
              type: 'infoBox',
              content: {
                title: 'So sánh với biến đổi vật lý',
                content: '**Biến đổi vật lý:** Chỉ thay đổi trạng thái/hình dạng, không tạo chất mới (nước đá tan, đường hòa tan).\n**Biến đổi hóa học:** Tạo ra chất mới với tính chất khác hẳn (đốt than, sắt bị gỉ).',
                color: 'blue',
                listType: 'bullet'
              }
            }
          ]
        },
        {
          id: 'item-1-2',
          type: 'theory',
          title: 'Dấu hiệu nhận biết phản ứng hóa học',
          duration: '5 min',
          section: 'Nhận biết',
          theoryModules: [
            {
              id: 'tm-1-4',
              type: 'infoBox',
              content: {
                title: 'Dấu hiệu nhận biết',
                content: '👁️ **Thay đổi màu sắc:** Dung dịch đổi màu.\n💨 **Xuất hiện khí:** Có bọt khí sủi lên.\n⬇️ **Xuất hiện kết tủa:** Chất rắn lắng xuống.\n🔥 **Thay đổi nhiệt:** Tỏa nhiệt (nóng) hoặc thu nhiệt (lạnh).\n💡 **Phát sáng:** Như đốt Mg cháy sáng chói.',
                color: 'green',
                listType: 'bullet'
              }
            },
            {
              id: 'tm-1-5',
              type: 'tipBox',
              content: {
                title: 'Mẹo nhớ: Nhìn - Nghe - Sờ',
                content: '**Nhìn:** Đổi màu, có kết tủa, có khí.\n**Nghe:** Tiếng xì khí, tiếng nổ.\n**Sờ:** Nóng lên hoặc lạnh đi.',
                color: 'purple'
              }
            }
          ]
        },
        {
          id: 'item-1-3',
          type: 'theory',
          title: 'Điều kiện phản ứng',
          duration: '3 min',
          section: 'Điều kiện',
          theoryModules: [
            {
              id: 'tm-1-6',
              type: 'infoBox',
              content: {
                title: 'Điều kiện để phản ứng xảy ra',
                content: '1️⃣ **Tiếp xúc:** Các chất phản ứng phải tiếp xúc nhau.\n2️⃣ **Nhiệt độ:** Một số phản ứng cần đun nóng.\n3️⃣ **Xúc tác:** Chất giúp phản ứng nhanh hơn mà không bị tiêu hao.',
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
          question: 'Phản ứng hóa học là gì?',
          options: [
            'Quá trình biến đổi vật lý',
            'Quá trình biến đổi từ chất này thành chất khác',
            'Sự hòa tan',
            'Sự bay hơi'
          ],
          correctAnswer: 1,
          explanation: 'Phản ứng hóa học là quá trình biến đổi từ chất này thành chất khác, tạo ra chất mới.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Dấu hiệu nào KHÔNG phải là dấu hiệu phản ứng hóa học?',
          options: ['Có khí thoát ra', 'Có kết tủa', 'Nước đá tan', 'Dung dịch đổi màu'],
          correctAnswer: 2,
          explanation: 'Nước đá tan là biến đổi vật lý (thay đổi trạng thái), không phải phản ứng hóa học.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Dấu hiệu nào chứng tỏ có phản ứng xảy ra?',
          options: [
            'Dung dịch đổi màu, có khí hoặc kết tủa',
            'Chỉ khuấy mạnh hơn',
            'Để yên không có gì',
            'Nhiệt độ phòng ổn định'
          ],
          correctAnswer: 0,
          explanation: 'Đổi màu, có khí hoặc kết tủa là dấu hiệu cho thấy đã có chất mới được tạo thành.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Trong phản ứng hóa học, liên kết giữa các nguyên tử:',
          options: [
            'Giữ nguyên',
            'Bị bẻ gãy và hình thành liên kết mới',
            'Chỉ thay đổi màu sắc',
            'Chỉ thay đổi trạng thái'
          ],
          correctAnswer: 1,
          explanation: 'Bản chất của phản ứng hóa học là sự phá vỡ liên kết cũ và tạo liên kết mới giữa các nguyên tử.',
          points: 10
        },
        {
          type: 'true-false',
          question: 'Đường hòa tan trong nước là một phản ứng hóa học.',
          correctAnswer: false,
          explanation: 'Sai! Đường hòa tan trong nước là biến đổi vật lý vì không tạo ra chất mới.',
          points: 10
        }
      ]
    },

    // ============ MODULE 2: 4 loại phản ứng hóa học ============
    {
      id: 'module-2',
      title: '4 loại phản ứng hóa học',
      description: 'Phân loại và nhận biết 4 kiểu phản ứng: hóa hợp, phân hủy, thế, trao đổi',
      order: 2,
      items: [
        {
          id: 'item-2-1',
          type: 'theory',
          title: 'Phản ứng hóa hợp và phân hủy',
          duration: '5 min',
          section: 'Phân loại phản ứng',
          theoryModules: [
            {
              id: 'tm-2-1',
              type: 'heading',
              content: {
                text: '🔬 4 kiểu phản ứng hóa học',
                level: 'h2'
              }
            },
            {
              id: 'tm-2-2',
              type: 'infoBox',
              content: {
                title: '1. Phản ứng HÓA HỢP',
                content: '**Định nghĩa:** Hai hay nhiều chất kết hợp tạo một chất mới.\n**Công thức:** A + B → AB\n**Ví dụ:** 2H₂ + O₂ → 2H₂O (hidro + oxi → nước)\n**Nhớ:** GHÉP LẠI',
                color: 'green',
                listType: 'bullet'
              }
            },
            {
              id: 'tm-2-3',
              type: 'infoBox',
              content: {
                title: '2. Phản ứng PHÂN HỦY',
                content: '**Định nghĩa:** Một chất phân tách thành hai hay nhiều chất mới.\n**Công thức:** AB → A + B\n**Ví dụ:** CaCO₃ → CaO + CO₂ (đá vôi → vôi sống + khí CO₂)\n**Nhớ:** TÁCH RA',
                color: 'orange',
                listType: 'bullet'
              }
            },
            {
              id: 'tm-2-4',
              type: 'warningBox',
              content: {
                title: 'Lưu ý',
                content: 'Phản ứng phân hủy thường cần nhiệt độ cao hoặc xúc tác để xảy ra.',
                color: 'red'
              }
            }
          ]
        },
        {
          id: 'item-2-2',
          type: 'theory',
          title: 'Phản ứng thế và trao đổi',
          duration: '5 min',
          section: 'Phân loại phản ứng',
          theoryModules: [
            {
              id: 'tm-2-5',
              type: 'infoBox',
              content: {
                title: '3. Phản ứng THẾ',
                content: '**Định nghĩa:** Đơn chất thế chỗ một nguyên tố trong hợp chất.\n**Công thức:** AB + C → AC + B\n**Ví dụ:** Zn + 2HCl → ZnCl₂ + H₂ (kẽm đẩy hidro ra)\n**Nhớ:** ĐẨY VÀ THAY THẾ',
                color: 'blue',
                listType: 'bullet'
              }
            },
            {
              id: 'tm-2-6',
              type: 'infoBox',
              content: {
                title: '4. Phản ứng TRAO ĐỔI',
                content: '**Định nghĩa:** Hai hợp chất trao đổi thành phần cho nhau.\n**Công thức:** AB + CD → AD + CB\n**Ví dụ:** AgNO₃ + NaCl → AgCl↓ + NaNO₃\n**Nhớ:** HOÁN ĐỔI',
                color: 'purple',
                listType: 'bullet'
              }
            },
            {
              id: 'tm-2-7',
              type: 'tipBox',
              content: {
                title: 'Điều kiện phản ứng trao đổi',
                content: 'Phản ứng trao đổi chỉ xảy ra khi sản phẩm có:\n• Kết tủa (↓)\n• Khí (↑)\n• Chất điện li yếu (H₂O)',
                color: 'green'
              }
            }
          ]
        },
        {
          id: 'item-2-3',
          type: 'theory',
          title: 'Tổng kết 4 loại phản ứng',
          duration: '3 min',
          section: 'Tổng kết',
          theoryModules: [
            {
              id: 'tm-2-8',
              type: 'table',
              content: {
                headers: ['Loại', 'Công thức', 'Từ khóa', 'Ví dụ'],
                rows: [
                  ['Hóa hợp', 'A + B → AB', 'Ghép lại', '2H₂ + O₂ → 2H₂O'],
                  ['Phân hủy', 'AB → A + B', 'Tách ra', 'CaCO₃ → CaO + CO₂'],
                  ['Thế', 'AB + C → AC + B', 'Đẩy thay thế', 'Zn + 2HCl → ZnCl₂ + H₂'],
                  ['Trao đổi', 'AB + CD → AD + CB', 'Hoán đổi', 'AgNO₃ + NaCl → AgCl + NaNO₃']
                ]
              }
            }
          ]
        }
      ],
      // Quiz cho Module 2: 5 câu
      quizzes: [
        {
          type: 'multiple-choice',
          question: 'Phản ứng CaCO₃ → CaO + CO₂ thuộc loại nào?',
          options: ['Hóa hợp', 'Phân hủy', 'Thế', 'Trao đổi'],
          correctAnswer: 1,
          explanation: 'Đây là phản ứng phân hủy vì một chất (CaCO₃) tách thành nhiều chất (CaO và CO₂).',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Phản ứng A + B → AB thuộc kiểu nào?',
          options: ['Hóa hợp', 'Phân hủy', 'Thế', 'Trao đổi'],
          correctAnswer: 0,
          explanation: 'Hai chất kết hợp thành một chất mới là phản ứng hóa hợp.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Phản ứng trao đổi xảy ra khi nào?',
          options: [
            'Không cần điều kiện',
            'Có kết tủa, khí hoặc chất điện li yếu tạo thành',
            'Chỉ khi có xúc tác',
            'Chỉ ở 100°C'
          ],
          correctAnswer: 1,
          explanation: 'Phản ứng trao đổi cần tạo ra kết tủa, khí hoặc chất điện li yếu để xảy ra.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Ví dụ nào là phản ứng thế?',
          options: [
            '2H₂ + O₂ → 2H₂O',
            'CaCO₃ → CaO + CO₂',
            'Zn + 2HCl → ZnCl₂ + H₂',
            'AgNO₃ + NaCl → AgCl↓ + NaNO₃'
          ],
          correctAnswer: 2,
          explanation: 'Zn (đơn chất) thế chỗ H trong HCl, đẩy H₂ ra ngoài.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Đốt Mg cháy sáng tạo MgO (2Mg + O₂ → 2MgO) là phản ứng:',
          options: ['Hóa hợp', 'Phân hủy', 'Thế', 'Trao đổi'],
          correctAnswer: 0,
          explanation: 'Mg và O₂ kết hợp tạo MgO, đây là phản ứng hóa hợp.',
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
      content: { text: '⚡ Bài 2: Phản ứng hóa học', level: 'h2' }
    },
    {
      id: 'mod-2',
      type: 'paragraph',
      content: { text: 'Mục tiêu: nhận diện phản ứng qua dấu hiệu, phân loại 4 nhóm chính.' }
    }
  ],

  // Legacy game array - giữ để tương thích ngược
  game: [
    {
      type: 'multiple-choice',
      question: 'Phản ứng hóa học là gì?',
      options: ['Quá trình biến đổi vật lý', 'Quá trình biến đổi từ chất này thành chất khác', 'Sự hòa tan', 'Sự bay hơi'],
      correctAnswer: 1,
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng CaCO₃ → CaO + CO₂ thuộc loại?',
      options: ['Hóa hợp', 'Phân hủy', 'Thế', 'Trao đổi'],
      correctAnswer: 1,
      points: 10
    }
  ]
};
