module.exports = {
  classId: 8,
  curriculumType: 'ketnoi',
  chapterId: 2,
  chapterName: "Chương 2: Phản ứng hóa học",
  lessonId: 6,
  title: 'Bài 6: Tính theo phương trình hóa học',
  description: 'Học cách dùng PTHH đã cân bằng để tính số mol, khối lượng, thể tích khí và nhận diện chất dư - chất hết',
  level: 'Beginner',
  order: 5,

  // Cấu trúc module mới
  modules: [
    // ============ MODULE 1: Cơ sở tính toán theo PTHH ============
    {
      id: 'module-1',
      title: 'Cơ sở tính toán theo PTHH',
      description: 'Hiểu nguyên tắc tính toán dựa trên tỉ lệ mol trong PTHH',
      order: 1,
      items: [
        {
          id: 'item-1-1',
          type: 'theory',
          title: 'Nguyên tắc cơ bản',
          duration: '4 min',
          section: 'Cơ sở lý thuyết',
          theoryModules: [
            {
              id: 'tm-1-1',
              type: 'heading',
              content: {
                text: '📐 Tính theo phương trình hóa học',
                level: 'h2'
              }
            },
            {
              id: 'tm-1-2',
              type: 'paragraph',
              content: {
                text: 'Phương trình hóa học đã cân bằng cho biết tỉ lệ số mol giữa các chất. Đây là cơ sở để tính khối lượng, thể tích khí của các chất trong phản ứng.'
              }
            },
            {
              id: 'tm-1-3',
              type: 'infoBox',
              content: {
                title: 'Tỉ lệ mol trong PTHH',
                content: '**Ví dụ:** 2H₂ + O₂ → 2H₂O\n\n• Hệ số cho biết tỉ lệ mol: 2 : 1 : 2\n• 2 mol H₂ phản ứng với 1 mol O₂ tạo 2 mol H₂O\n• 0,4 mol H₂ cần 0,2 mol O₂ tạo 0,4 mol H₂O',
                color: 'blue',
                listType: 'bullet'
              }
            }
          ]
        },
        {
          id: 'item-1-2',
          type: 'theory',
          title: 'Các công thức quan trọng',
          duration: '5 min',
          section: 'Công thức',
          theoryModules: [
            {
              id: 'tm-1-4',
              type: 'warningBox',
              content: {
                title: '3 công thức vàng',
                content: '**1. Số mol:** n = m/M (mol)\n**2. Khối lượng:** m = n × M (g)\n**3. Thể tích khí đktc:** V = n × 22,4 (L)\n\nTrong đó: n - số mol, m - khối lượng (g), M - khối lượng mol (g/mol)',
                color: 'orange'
              }
            },
            {
              id: 'tm-1-5',
              type: 'tipBox',
              content: {
                title: 'Mẹo nhớ nhanh',
                content: '📌 **n = m/M** → Muốn tìm mol, lấy khối lượng chia M\n📌 **m = n × M** → Muốn tìm khối lượng, nhân mol với M\n📌 **V = n × 22,4** → Chỉ dùng cho khí ở đktc (0°C, 1atm)',
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
          question: 'Tính theo PTHH cần căn cứ vào:',
          options: [
            'Tên gọi chất',
            'Hệ số tỉ lệ mol trong PTHH đã cân bằng',
            'Màu sắc dung dịch',
            'Trạng thái vật lý'
          ],
          correctAnswer: 1,
          explanation: 'Hệ số trong PTHH đã cân bằng cho biết tỉ lệ số mol giữa các chất.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Công thức tính số mol từ khối lượng là:',
          options: ['n = m × M', 'n = m/M', 'n = V/22,4', 'n = M/m'],
          correctAnswer: 1,
          explanation: 'n = m/M trong đó m là khối lượng (g), M là khối lượng mol (g/mol).',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Theo PTHH: 2H₂ + O₂ → 2H₂O, nếu 2 mol H₂ phản ứng hết, số mol H₂O thu được là:',
          options: ['1 mol', '2 mol', '3 mol', '4 mol'],
          correctAnswer: 1,
          explanation: 'Theo tỉ lệ 2:2, 2 mol H₂ tạo 2 mol H₂O.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Công thức V = n × 22,4 dùng để tính thể tích khí ở điều kiện:',
          options: ['Nhiệt độ phòng', 'Điều kiện tiêu chuẩn (đktc)', 'Mọi điều kiện', 'Chỉ áp suất cao'],
          correctAnswer: 1,
          explanation: 'Công thức V = n × 22,4 (L) chỉ áp dụng ở đktc (0°C, 1 atm).',
          points: 10
        }
      ]
    },

    // ============ MODULE 2: Quy trình 4 bước giải bài toán ============
    {
      id: 'module-2',
      title: 'Quy trình giải bài toán',
      description: 'Học cách giải bài toán tính theo PTHH theo 4 bước chuẩn',
      order: 2,
      items: [
        {
          id: 'item-2-1',
          type: 'theory',
          title: 'Quy trình 4 bước',
          duration: '5 min',
          section: 'Phương pháp',
          theoryModules: [
            {
              id: 'tm-2-1',
              type: 'heading',
              content: {
                text: '🎯 Quy trình 4 bước giải bài toán',
                level: 'h2'
              }
            },
            {
              id: 'tm-2-2',
              type: 'infoBox',
              content: {
                title: '4 bước chuẩn',
                content: '**Bước 1:** Viết và cân bằng PTHH\n**Bước 2:** Đổi dữ liệu về mol (n = m/M hoặc n = V/22,4)\n**Bước 3:** Lập tỉ lệ mol theo hệ số PTHH\n**Bước 4:** Quy đổi về khối lượng/thể tích cần tìm',
                color: 'blue',
                listType: 'number'
              }
            }
          ]
        },
        {
          id: 'item-2-2',
          type: 'theory',
          title: 'Ví dụ minh họa',
          duration: '6 min',
          section: 'Bài tập mẫu',
          theoryModules: [
            {
              id: 'tm-2-3',
              type: 'tipBox',
              content: {
                title: 'Ví dụ 1: Tính khối lượng sản phẩm',
                content: '**Bài:** Đốt cháy 4,8g Mg trong O₂. Tính khối lượng MgO tạo thành.\n\n**Giải:**\n• Bước 1: 2Mg + O₂ → 2MgO\n• Bước 2: n(Mg) = 4,8/24 = 0,2 mol\n• Bước 3: Tỉ lệ Mg : MgO = 2 : 2 = 1 : 1\n   → n(MgO) = n(Mg) = 0,2 mol\n• Bước 4: m(MgO) = 0,2 × 40 = **8g**',
                color: 'green'
              }
            },
            {
              id: 'tm-2-4',
              type: 'tipBox',
              content: {
                title: 'Ví dụ 2: Tính thể tích khí',
                content: '**Bài:** Nhiệt phân 20g CaCO₃. Tính thể tích CO₂ ở đktc. (M: Ca=40, C=12, O=16)\n\n**Giải:**\n• Bước 1: CaCO₃ → CaO + CO₂\n• Bước 2: n(CaCO₃) = 20/100 = 0,2 mol\n• Bước 3: Tỉ lệ CaCO₃ : CO₂ = 1 : 1\n   → n(CO₂) = 0,2 mol\n• Bước 4: V(CO₂) = 0,2 × 22,4 = **4,48 L**',
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
          question: 'Bước đầu tiên khi giải bài tính theo PTHH là:',
          options: [
            'Tính khối lượng sản phẩm ngay',
            'Viết và cân bằng phương trình phản ứng',
            'Quy đổi về thể tích',
            'Bỏ qua đơn vị'
          ],
          correctAnswer: 1,
          explanation: 'Bước 1 là viết và cân bằng PTHH để có tỉ lệ mol chính xác.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Khối lượng CaCO₃ (M=100) cần để tạo 0,2 mol CO₂ theo PTHH CaCO₃ → CaO + CO₂ là:',
          options: ['10 g', '20 g', '40 g', '5 g'],
          correctAnswer: 1,
          explanation: 'Tỉ lệ 1:1 → n(CaCO₃) = 0,2 mol → m = 0,2 × 100 = 20g',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Đốt 12g C thu được CO₂. Thể tích CO₂ (đktc) là: (M: C=12)',
          options: ['11,2 L', '22,4 L', '33,6 L', '44,8 L'],
          correctAnswer: 1,
          explanation: 'n(C) = 12/12 = 1 mol. C + O₂ → CO₂ (tỉ lệ 1:1). V(CO₂) = 1 × 22,4 = 22,4 L',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Sau khi lập tỉ lệ mol, bước cuối cùng là:',
          options: [
            'Viết lại PTHH',
            'Quy đổi về khối lượng hoặc thể tích cần tìm',
            'Cân bằng lại phương trình',
            'Kiểm tra màu sắc'
          ],
          correctAnswer: 1,
          explanation: 'Bước cuối là quy đổi từ mol sang khối lượng (m = n×M) hoặc thể tích (V = n×22,4).',
          points: 10
        }
      ]
    },

    // ============ MODULE 3: Chất dư và chất hết ============
    {
      id: 'module-3',
      title: 'Nhận diện chất dư - chất hết',
      description: 'Cách xác định chất nào phản ứng hết, chất nào còn dư',
      order: 3,
      items: [
        {
          id: 'item-3-1',
          type: 'theory',
          title: 'Khái niệm chất dư - chất hết',
          duration: '4 min',
          section: 'Chất dư',
          theoryModules: [
            {
              id: 'tm-3-1',
              type: 'heading',
              content: {
                text: '⚖️ Chất dư và chất hết',
                level: 'h2'
              }
            },
            {
              id: 'tm-3-2',
              type: 'infoBox',
              content: {
                title: 'Khái niệm',
                content: '**Chất hết:** Chất phản ứng hết (hết trước), dùng để tính sản phẩm.\n**Chất dư:** Chất còn lại sau phản ứng (dư thừa).\n\n📌 Sản phẩm được tính theo chất hết!',
                color: 'blue',
                listType: 'bullet'
              }
            }
          ]
        },
        {
          id: 'item-3-2',
          type: 'theory',
          title: 'Cách xác định chất dư',
          duration: '5 min',
          section: 'Phương pháp',
          theoryModules: [
            {
              id: 'tm-3-3',
              type: 'warningBox',
              content: {
                title: 'Phương pháp so sánh tỉ lệ',
                content: '**Cách làm:**\n1. Tính số mol thực tế của từng chất\n2. So sánh tỉ lệ mol thực tế với tỉ lệ theo PTHH\n3. Chất có tỉ lệ nhỏ hơn → hết trước\n\n**Ví dụ:** 2H₂ + O₂ → 2H₂O\nCó 3 mol H₂ và 2 mol O₂\n• Tỉ lệ theo PTHH: H₂/O₂ = 2/1 = 2\n• Tỉ lệ thực tế: 3/2 = 1,5 < 2 → H₂ hết trước',
                color: 'orange'
              }
            },
            {
              id: 'tm-3-4',
              type: 'tipBox',
              content: {
                title: 'Mẹo nhanh',
                content: '📌 Chia số mol thực tế cho hệ số tương ứng\n📌 Chất nào có kết quả nhỏ hơn → hết trước\n📌 Dùng chất hết để tính sản phẩm',
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
          question: 'Để biết chất nào dư/hết, cần:',
          options: [
            'Chỉ nhìn khối lượng',
            'So sánh tỉ lệ mol thực tế với tỉ lệ mol theo PTHH',
            'Chọn ngẫu nhiên',
            'Bỏ qua vì không ảnh hưởng'
          ],
          correctAnswer: 1,
          explanation: 'So sánh tỉ lệ mol giúp xác định chất nào hết trước, chất nào còn dư.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Sản phẩm của phản ứng được tính theo:',
          options: ['Chất dư', 'Chất hết', 'Chất bất kỳ', 'Tổng hai chất'],
          correctAnswer: 1,
          explanation: 'Sản phẩm được tính theo chất hết vì chất này quyết định lượng sản phẩm tối đa.',
          points: 10
        },
        {
          type: 'true-false',
          question: 'Chất có tỉ lệ (mol thực tế / hệ số) nhỏ hơn sẽ hết trước.',
          correctAnswer: true,
          explanation: 'Đúng! Chất có tỉ lệ nhỏ hơn sẽ phản ứng hết trước.',
          points: 10
        },
        {
          type: 'multiple-choice',
          question: 'Phản ứng: 2H₂ + O₂ → 2H₂O. Có 2 mol H₂ và 2 mol O₂. Chất nào dư?',
          options: ['H₂ dư', 'O₂ dư', 'Cả hai vừa hết', 'Không xác định'],
          correctAnswer: 1,
          explanation: 'Cần 1 mol O₂ cho 2 mol H₂. Có 2 mol O₂ nên O₂ dư 1 mol.',
          points: 10
        }
      ]
    }
  ],

  // Legacy game array - giữ để tương thích ngược
  game: [
    {
      type: 'multiple-choice',
      question: 'Tính theo phương trình hóa học cần căn cứ vào:',
      options: ['Tên chất', 'Hệ số tỉ lệ mol trong PTHH đã cân bằng', 'Màu sắc dung dịch', 'Trạng thái vật lý'],
      correctAnswer: 1,
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Nếu 2 mol H₂ phản ứng hết với O₂ (PTHH: 2H₂ + O₂ → 2H₂O), số mol H₂O thu được là:',
      options: ['1 mol', '2 mol', '3 mol', '4 mol'],
      correctAnswer: 1,
      points: 10
    }
  ]
};
