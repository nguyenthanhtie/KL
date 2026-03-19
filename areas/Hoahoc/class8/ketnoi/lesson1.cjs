// Bài mở đầu - Kết nối tri thức
module.exports = {
  classId: 8,
  curriculumType: 'ketnoi',
  chapterId: 1,
  chapterName: "Chương mở đầu",
  lessonId: 1,
  title: "Bài 1: Sử dụng một số hóa chất, thiết bị cơ bản trong phòng thí nghiệm",
  description: "Giới thiệu hóa chất, dụng cụ, an toàn phòng thí nghiệm cho chương Phản ứng hóa học",
  level: "Beginner",
  order: 1,

  // Cấu trúc module mới - Coursera style
  modules: [
    // ============ MODULE 1: Hóa chất trong phòng thí nghiệm ============
    {
      id: 'module-1',
      title: 'Hóa chất trong phòng thí nghiệm',
      description: 'Tìm hiểu các hóa chất cơ bản thường dùng trong phòng thí nghiệm hóa học',
      order: 1,
      items: [
        {
          id: 'item-1-1',
          type: 'theory',
          title: 'Giới thiệu về hóa chất phòng thí nghiệm',
          duration: '5 min',
          section: 'Kiến thức cơ bản',
          theoryModules: [
            {
              id: 'tm-1-1',
              type: 'heading',
              content: {
                text: '🧪 Hóa chất trong phòng thí nghiệm',
                level: 'h2'
              }
            },
            {
              id: 'tm-1-2',
              type: 'paragraph',
              content: {
                text: 'Phòng thí nghiệm hóa học sử dụng nhiều loại hóa chất khác nhau. Việc nhận biết và phân loại đúng hóa chất giúp bạn thao tác an toàn và hiệu quả.'
              }
            },
            {
              id: 'tm-1-3',
              type: 'infoBox',
              content: {
                title: 'Các loại axit thường gặp',
                content: '**HCl (Axit clohidric):** Dạng lỏng, mùi hắc, ăn mòn mạnh.\n**H₂SO₄ (Axit sunfuric):** Dạng lỏng sánh, khi pha loãng LUÔN thêm axit vào nước.\n**HNO₃ (Axit nitric):** Dạng lỏng, có thể gây bỏng da và làm vàng da.',
                color: 'blue',
                listType: 'bullet'
              }
            }
          ]
        },
        {
          id: 'item-1-2',
          type: 'theory',
          title: 'Bazơ và muối phổ biến',
          duration: '4 min',
          section: 'Kiến thức cơ bản',
          theoryModules: [
            {
              id: 'tm-1-4',
              type: 'infoBox',
              content: {
                title: 'Bazơ thường gặp',
                content: '**NaOH (Natri hidroxit):** Dạng rắn trắng, tan trong nước tỏa nhiệt, ăn da mạnh.\n**Ca(OH)₂ (Canxi hidroxit):** Dạng bột trắng, ít tan trong nước, dùng làm vôi tôi.\n**KOH (Kali hidroxit):** Tính chất tương tự NaOH.',
                color: 'purple',
                listType: 'bullet'
              }
            },
            {
              id: 'tm-1-5',
              type: 'tipBox',
              content: {
                title: 'Lưu ý bảo quản',
                content: 'Bazơ cần được bảo quản kín, tránh ẩm vì dễ hút nước và CO₂ từ không khí.',
                color: 'green'
              }
            }
          ]
        }
      ],
      // Quiz cho Module 1: 4 câu
      quizzes: [
        {
          type: "multiple-choice",
          question: "Công thức hóa học của natri hidroxit là gì?",
          options: ["NaCl", "NaOH", "Na₂CO₃", "NaHCO₃"],
          correctAnswer: 1,
          explanation: "Natri hidroxit có công thức hóa học là NaOH, là một bazơ mạnh.",
          points: 10
        },
        {
          type: "multiple-choice",
          question: "Khi pha loãng H₂SO₄ đặc, cách làm đúng là:",
          options: [
            "Rót nước vào axit",
            "Rót axit vào nước từ từ",
            "Trộn đều cùng lúc",
            "Đun nóng trước khi pha"
          ],
          correctAnswer: 1,
          explanation: "LUÔN rót axit vào nước (A vào N), vì nếu làm ngược sẽ gây sôi bắn nguy hiểm.",
          points: 10
        },
        {
          type: "true-false",
          question: "NaOH khi tan trong nước sẽ tỏa nhiệt.",
          correctAnswer: true,
          explanation: "Đúng! NaOH tan trong nước là phản ứng tỏa nhiệt mạnh.",
          points: 10
        },
        {
          type: "multiple-choice",
          question: "Axit nào có thể làm vàng da khi tiếp xúc?",
          options: ["HCl", "H₂SO₄", "HNO₃", "H₃PO₄"],
          correctAnswer: 2,
          explanation: "HNO₃ (axit nitric) có phản ứng xanthoproteic làm vàng protein trên da.",
          points: 10
        }
      ]
    },

    // ============ MODULE 2: Dụng cụ thí nghiệm ============
    {
      id: 'module-2',
      title: 'Dụng cụ thí nghiệm cơ bản',
      description: 'Nhận biết và sử dụng đúng các dụng cụ trong phòng thí nghiệm',
      order: 2,
      items: [
        {
          id: 'item-2-1',
          type: 'theory',
          title: 'Dụng cụ chứa và đo thể tích',
          duration: '5 min',
          section: 'Dụng cụ đo lường',
          theoryModules: [
            {
              id: 'tm-2-1',
              type: 'heading',
              content: {
                text: '🔬 Dụng cụ thí nghiệm cơ bản',
                level: 'h2'
              }
            },
            {
              id: 'tm-2-2',
              type: 'tipBox',
              content: {
                title: 'Dụng cụ chứa & đo thể tích',
                content: '**Ống nghiệm:** Dùng cho phản ứng quy mô nhỏ.\n**Cốc thủy tinh:** Chứa và trộn dung dịch.\n**Ống đong:** Đo thể tích gần đúng (đọc ở mặt cong dung dịch, tầm mắt ngang).\n**Pipet/Buret:** Lấy và đo thể tích chính xác.',
                color: 'green',
                listType: 'bullet'
              }
            }
          ]
        },
        {
          id: 'item-2-2',
          type: 'theory',
          title: 'Dụng cụ cân và đun',
          duration: '4 min',
          section: 'Dụng cụ đo lường',
          theoryModules: [
            {
              id: 'tm-2-3',
              type: 'infoBox',
              content: {
                title: 'Dụng cụ cân khối lượng',
                content: '**Cân phân tích:** Đo khối lượng chính xác (độ chính xác cao).\n**Cân kỹ thuật:** Đo khối lượng thông thường.\n**Lưu ý:** Hiệu chỉnh cân về 0, dùng giấy/boat cân để không làm bẩn đĩa.',
                color: 'blue',
                listType: 'bullet'
              }
            },
            {
              id: 'tm-2-4',
              type: 'infoBox',
              content: {
                title: 'Dụng cụ đun nóng',
                content: '**Đèn cồn:** Nguồn nhiệt phổ biến, dễ điều khiển.\n**Kẹp gỗ:** Giữ ống nghiệm khi đun.\n**Giá sắt + lưới:** Đun bình, cốc lớn.',
                color: 'orange',
                listType: 'bullet'
              }
            }
          ]
        }
      ],
      // Quiz cho Module 2: 4 câu
      quizzes: [
        {
          type: "multiple-choice",
          question: "Thiết bị nào dùng để đo chính xác khối lượng chất?",
          options: ["Ống nghiệm", "Cân phân tích", "Nhiệt kế", "Đèn cồn"],
          correctAnswer: 1,
          explanation: "Cân phân tích được dùng để cân chính xác khối lượng chất.",
          points: 10
        },
        {
          type: "multiple-choice",
          question: "Dụng cụ đo thể tích gần đúng (ml) thường dùng là:",
          options: ["Ống đong", "Chén sứ", "Phiễu giấy", "Đũa thủy tinh"],
          correctAnswer: 0,
          explanation: "Ống đong có vạch chia để đo thể tích dung dịch gần đúng.",
          points: 10
        },
        {
          type: "multiple-choice",
          question: "Dụng cụ lấy lượng nhỏ dung dịch chính xác là:",
          options: ["Pipet/ống nhỏ giọt", "Chai rửa", "Chày cối", "Kẹp gỗ"],
          correctAnswer: 0,
          explanation: "Pipet cho phép lấy và đo thể tích nhỏ một cách chính xác.",
          points: 10
        },
        {
          type: "multiple-choice",
          question: "Thiết bị nào dùng để đun nóng an toàn trong phòng thí nghiệm?",
          options: ["Ống đong", "Đèn cồn", "Pipet", "Cân phân tích"],
          correctAnswer: 1,
          explanation: "Đèn cồn cung cấp nhiệt để đun nóng mẫu thử ở quy mô nhỏ.",
          points: 10
        }
      ]
    },

    // ============ MODULE 3: An toàn phòng thí nghiệm ============
    {
      id: 'module-3',
      title: 'An toàn phòng thí nghiệm',
      description: 'Quy tắc an toàn và xử lý sự cố trong phòng thí nghiệm',
      order: 3,
      items: [
        {
          id: 'item-3-1',
          type: 'theory',
          title: 'Quy tắc an toàn cơ bản',
          duration: '4 min',
          section: 'An toàn',
          theoryModules: [
            {
              id: 'tm-3-1',
              type: 'heading',
              content: {
                text: '⚠️ An toàn trong phòng thí nghiệm',
                level: 'h2'
              }
            },
            {
              id: 'tm-3-2',
              type: 'warningBox',
              content: {
                title: 'Quy tắc tuyệt đối',
                content: '❌ Không nếm, không ngửi trực tiếp hóa chất.\n❌ Không đổ hóa chất thừa về chai gốc.\n❌ Không để dung môi dễ cháy gần nguồn lửa.\n✅ Luôn mang kính, găng tay, áo blouse.',
                color: 'red',
                listType: 'bullet'
              }
            }
          ]
        },
        {
          id: 'item-3-2',
          type: 'theory',
          title: 'Thao tác an toàn và xử lý sự cố',
          duration: '5 min',
          section: 'An toàn',
          theoryModules: [
            {
              id: 'tm-3-3',
              type: 'tipBox',
              content: {
                title: 'Thao tác an toàn',
                content: '• Đun ống nghiệm: hướng miệng ra xa người, kẹp chắc, lắc nhẹ.\n• Ngửi hóa chất: dùng tay quạt nhẹ hơi về phía mũi.\n• Cân hóa chất rắn: hiệu chỉnh cân về 0, dùng giấy/boat cân.',
                color: 'green',
                listType: 'bullet'
              }
            },
            {
              id: 'tm-3-4',
              type: 'warningBox',
              content: {
                title: 'Xử lý sự cố',
                content: '🆘 Dính da/mắt: Rửa ngay bằng nhiều nước trong nhiều phút.\n🆘 Cháy nhỏ: Dùng khăn ướt hoặc cát để dập.\n🆘 Tràn hóa chất: Báo giáo viên, không dùng tay thu dọn.\n📞 Luôn báo giáo viên khi có sự cố!',
                color: 'orange',
                listType: 'bullet'
              }
            },
            {
              id: 'tm-3-5',
              type: 'infoBox',
              content: {
                title: 'Mẹo ghi nhớ: 3A - 3T',
                content: '**3A:** Axit vào nước, Áo blouse luôn mặc, An toàn là trên hết.\n**3T:** Tránh hít mạnh, Tránh quay miệng ống vào người, Tránh để tràn hóa chất.',
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
          type: "true-false",
          question: "Có thể nếm hóa chất để kiểm tra tính chất của chúng.",
          correctAnswer: false,
          explanation: "Sai! Tuyệt đối không được nếm hóa chất vì có thể gây nguy hiểm.",
          points: 10
        },
        {
          type: "multiple-choice",
          question: "Khi dung dịch bắn vào mắt, thao tác đúng là:",
          options: [
            "Dùng giấy lau",
            "Rửa ngay bằng nhiều nước và báo giáo viên",
            "Nhắm mắt đợi",
            "Tiếp tục thí nghiệm"
          ],
          correctAnswer: 1,
          explanation: "Rửa ngay dưới vòi nước trong nhiều phút và báo giáo viên để xử lý kịp thời.",
          points: 10
        },
        {
          type: "multiple-choice",
          question: "Khi ngửi hóa chất dễ bay hơi, nên:",
          options: [
            "Hít mạnh vào",
            "Dùng tay quạt nhẹ hơi về phía mũi",
            "Đưa mũi sát miệng chai",
            "Nếm thử"
          ],
          correctAnswer: 1,
          explanation: "Quạt nhẹ hơi để ngửi, tránh hít trực tiếp khí đậm đặc có thể gây hại.",
          points: 10
        },
        {
          type: "multiple-choice",
          question: "Làm việc với axit/bazơ mạnh cần:",
          options: [
            "Mang kính, găng tay, áo blouse",
            "Không cần bảo hộ",
            "Thử bằng tay xem nóng",
            "Ngửi trực tiếp"
          ],
          correctAnswer: 0,
          explanation: "Trang bị bảo hộ cá nhân đầy đủ để tránh bỏng hóa chất.",
          points: 10
        }
      ]
    }
  ],

  // Legacy game array - giữ để tương thích ngược
  game: [
    {
      type: "multiple-choice",
      question: "Thiết bị nào dùng để đo chính xác khối lượng chất?",
      options: ["Ống nghiệm", "Cân phân tích", "Nhiệt kế", "Đèn cồn"],
      correctAnswer: 1,
      explanation: "Cân phân tích được dùng để cân chính xác khối lượng chất.",
      points: 10
    },
    {
      type: "true-false",
      question: "Có thể nếm hóa chất để kiểm tra tính chất của chúng.",
      correctAnswer: false,
      explanation: "Sai! Tuyệt đối không được nếm hóa chất vì có thể gây nguy hiểm.",
      points: 10
    },
    {
      type: "multiple-choice",
      question: "Công thức hóa học của natri hidroxit là gì?",
      options: ["NaCl", "NaOH", "Na₂CO₃", "NaHCO₃"],
      correctAnswer: 1,
      explanation: "Natri hidroxit có công thức hóa học là NaOH.",
      points: 10
    }
  ]
};
