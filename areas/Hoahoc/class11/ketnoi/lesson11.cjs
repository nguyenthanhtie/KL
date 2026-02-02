module.exports = {
  classId: 11,
  curriculumType: 'ketnoi',
  chapterId: 3,
  chapterName: 'Chương 3: Đại cương về hoá học hữu cơ',
  lessonId: 11,
  title: 'Bài 11: Phương pháp tách biệt và tinh chế hợp chất hữu cơ',
  description: 'Chưng cất, chiết, kết tinh, sắc kí cơ bản cho hợp chất hữu cơ.',
  level: 'Intermediate',
  order: 11,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Tách biệt và tinh chế',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Chọn phương pháp tinh chế dựa trên độ bay hơi, độ tan, độ bền nhiệt và tính hấp phụ.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Chưng cất',
            content: 'Chưng cất đơn: tách chất có chênh lệch điểm sôi lớn (>25-30°C), không tạo azeotrop.\nChưng cất phân đoạn: dùng cột chưng, tách hỗn hợp nhiều cấu tử gần điểm sôi.\nChưng cất chân không: cho chất dễ phân huỷ nhiệt, hạ áp để giảm điểm sôi.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'warningBox',
        content: {
            title: 'Chiết',
            content: 'Dựa trên độ tan khác nhau giữa hai pha lỏng không trộn (nước/hữu cơ).\nPhễu chiết: lắc nhẹ, xả lớp nặng trước; chọn dung môi hữu cơ nhẹ hơn (ete, dichloromethan nặng hơn nước).\nCó thể chiết axit-bazơ: chuyển dạng ion để thay đổi độ tan.',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Kết tinh',
            content: 'Chọn dung môi: tan tốt nóng, tan ít lạnh; không phản ứng với chất.\nHoà tan nóng, lọc nóng loại tạp không tan, làm lạnh kết tinh; rửa và sấy tinh thể.\nDùng than hoạt để khử màu (hấp phụ), lọc bỏ trước khi kết tinh.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Sắc kí mỏng (TLC)',
            content: 'Pha tĩnh: lớp mỏng silica gel/Al2O3 trên bản kính/nhôm.\nPha động: dung môi hoặc hỗn hợp dung môi; chất di chuyển với tốc độ khác nhau.\nRf = (khoảng cách chất chạy)/(khoảng cách dung môi); dùng theo dõi phản ứng, độ tinh khiết.',
            color: 'purple',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Chưng cất phân đoạn dùng khi:',
      options: ['Điểm sôi chênh lệch rất lớn', 'Tách rắn khỏi lỏng', 'Điểm sôi các cấu tử gần nhau', 'Chất dễ cháy nổ'],
      correctAnswer: 2,
      explanation: 'Cột chưng giúp tăng bậc tách khi điểm sôi gần nhau.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Dung môi nặng hơn nước trong chiết là:',
      options: ['Ete etylic', 'Hexan', 'Dichloromethan (CH2Cl2)', 'Toluene'],
      correctAnswer: 2,
      explanation: 'CH2Cl2 tỷ trọng ~1.33 > nước, nên nằm lớp dưới.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Chưng cất chân không giúp giảm nhiệt độ sôi, tránh phân huỷ.',
      correctAnswer: true,
      explanation: 'Hạ áp suất làm giảm nhiệt độ sôi, phù hợp chất kém bền nhiệt.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Tiêu chí chọn dung môi kết tinh:',
      options: ['Tan mạnh ở lạnh', 'Phản ứng với chất cần tinh chế', 'Tan tốt nóng, tan kém lạnh', 'Có màu đậm'],
      correctAnswer: 2,
      explanation: 'Cần tan tốt khi nóng để hoà tan, kém tan khi lạnh để kết tinh.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Rf trong TLC được tính bằng:',
      options: ['Thời gian lưu', 'Khoảng cách dung môi/ khoảng cách chất', 'Khoảng cách chất/ khoảng cách dung môi', 'Độ nhớt'],
      correctAnswer: 2,
      explanation: 'Rf = (khoảng cách chất chạy)/(khoảng cách mặt dung môi).',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Chiết axit-bazơ có thể chuyển axit hữu cơ thành dạng muối tan trong nước.',
      correctAnswer: true,
      explanation: 'Tạo muối carboxylat tan trong pha nước để tách khỏi tạp hữu cơ.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Tách nước khỏi dung môi hữu cơ thường dùng:',
      options: ['MgSO4 khan', 'NaCl rắn', 'KMnO4', 'HCl'],
      correctAnswer: 0,
      explanation: 'Muối khan hút ẩm (MgSO4, Na2SO4 khan) rồi lọc bỏ.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Azeotrop là:',
      options: ['Dung dịch không sôi', 'Hỗn hợp sôi ở nhiệt độ cố định và thành phần hơi = lỏng', 'Dung dịch rắn-lỏng', 'Dung dịch điện li'],
      correctAnswer: 1,
      explanation: 'Azeotrop làm hạn chế tách hoàn toàn bằng chưng cất thường.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Trong phễu chiết, luôn xả lớp nhẹ trước.',
      correctAnswer: false,
      explanation: 'Xả lớp nặng (tỷ trọng lớn) trước, thường là nước hoặc dung môi nặng.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Trong TLC, pha tĩnh thường là ______',
      correctAnswer: 'silica gel',
      explanation: 'Silica gel hoặc Al2O3 được tráng mỏng trên bản TLC.',
      points: 10
    }
  ]
};
