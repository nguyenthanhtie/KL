module.exports = {
  classId: 10,
  curriculumType: 'ketnoi',
  chapterId: 3,
  chapterName: 'Chương 3: Liên kết hóa học',
  lessonId: 13,
  title: 'Bài 13: Liên kết hydrogen và tương tác van der Waals',
  description: 'Liên kết H và van der Waals: lực liên phân tử quyết định sôi, tan, cấu trúc sinh học.',
  level: 'Intermediate',
  order: 4,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Liên kết hydro & van der Waals',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Mục tiêu: phân biệt H-bond và các tương tác van der Waals (London, lưỡng cực), hiểu điều kiện hình thành và hệ quả lên T sôi/tan.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Liên kết hydrogen',
            content: 'Điều kiện: H phải gắn cộng hoá trị trực tiếp với F/O/N; cần cặp e tự do của phân tử/nhóm khác (hoặc nội phân tử gần kề).\nSức mạnh: yếu hơn liên kết hoá trị nhưng mạnh hơn van der Waals; tạo mạng trong H2O, HF → T sôi cao bất thường.\nỨng dụng/sinh học: ổn định xoắn ADN, cấu trúc protein, độ nhớt/nhiệt dung của nước.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'warningBox',
        content: {
            title: 'Tương tác van der Waals',
            content: 'London (tức thời), lưỡng cực-lưỡng cực, lưỡng cực cảm ứng.\nPhụ thuộc khối lượng/polarizability và diện tích tiếp xúc: chuỗi thẳng sôi cao hơn mạch nhánh.\nLuôn tồn tại ở mọi phân tử, kể cả không cực (CH4, Cl2, I2).',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'So sánh sức mạnh (giảm dần)',
            content: 'Cộng hoá trị ≈ ion > H-bond > lưỡng cực-lưỡng cực > London.\nHệ quả: quyết định trạng thái vật lí, T nóng chảy/sôi, độ tan, điểm bất thường (nước sôi cao, HF ăn mòn kính).',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Tránh nhầm lẫn',
            content: 'H-bond cần H gắn trực tiếp F/O/N, không chỉ “có O” (CH3OH có, CH3-O-CH3 yếu hơn nhiều).\nKhông nhầm màu/oxi hóa (Cl2 màu vàng lục không do H-bond).\nI2 rắn do London mạnh (khối lượng lớn), không phải liên kết H.',
            color: 'gray',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Liên kết hydrogen hình thành giữa?',
      options: [
        'H với kim loại kiềm',
        'H liên kết với F/O/N và cặp e tự do của phân tử khác',
        'Hai phân tử không cực bất kì',
        'Ion trái dấu'
      ],
      correctAnswer: 1,
      explanation: 'Cần H liên kết cộng hoá trị với F,O,N và cặp e tự do đối tác.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Yếu tố làm tăng lực van der Waals?',
      options: ['Khối lượng phân tử lớn', 'Phân tử rất nhỏ', 'Điện tích ion cao', 'Liên kết ion'],
      correctAnswer: 0,
      explanation: 'Phân tử lớn, diện tích tiếp xúc lớn → lực cảm ứng mạnh hơn.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Liên kết hydrogen yếu hơn liên kết cộng hóa trị nhưng mạnh hơn van der Waals.',
      correctAnswer: true,
      explanation: 'Đúng, thứ tự bền: cộng hoá trị > H-bond > van der Waals.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Ví dụ nào thể hiện mạng liên kết H rộng?',
      options: ['CH4 lỏng', 'H2O lỏng', 'CO2 rắn', 'NaCl rắn'],
      correctAnswer: 1,
      explanation: 'Nước tạo mạng H-bond dày → T sôi cao bất thường.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Tại sao I2 (rắn) có T nóng chảy cao hơn F2 (khí)?',
      options: ['Liên kết ion', 'Liên kết H mạnh hơn', 'Lực London mạnh hơn do phân tử lớn', 'Tính phân cực kém hơn'],
      correctAnswer: 2,
      explanation: 'I2 khối lượng lớn → lực London mạnh → rắn ở điều kiện thường.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Tính chất nào không do liên kết H gây ra?',
      options: ['T sôi H2O cao', 'DNA xoắn kép ổn định', 'HF ăn mòn kính', 'Cl2 màu vàng lục'],
      correctAnswer: 3,
      explanation: 'Màu Cl2 không liên quan liên kết H.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Lực London xuất hiện ở mọi phân tử kể cả không cực.',
      correctAnswer: true,
      explanation: 'Dao động điện tích tạo lưỡng cực tức thời → lực hút cảm ứng.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phân tử nào có H-bond nội phân tử nổi bật?',
      options: ['o-HOC6H4CHO (axit salicylic)', 'NaCl', 'CH4', 'CCl4'],
      correctAnswer: 0,
      explanation: 'Nhóm -OH và =O gần nhau tạo H-bond nội phân tử.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Thứ tự mạnh giảm dần đúng:',
      options: ['H-bond > cộng hoá trị > London', 'Cộng hoá trị > H-bond > lưỡng cực-lưỡng cực > London', 'London > H-bond > cộng hoá trị', 'Lưỡng cực-lưỡng cực > cộng hoá trị > London'],
      correctAnswer: 1,
      explanation: 'Liên kết hoá trị mạnh nhất; H-bond > lưỡng cực > London.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Chuỗi thẳng cùng công thức phân tử thường có T sôi cao hơn mạch nhánh do lực London lớn hơn.',
      correctAnswer: true,
      explanation: 'Chuỗi thẳng diện tích tiếp xúc lớn → lực cảm ứng mạnh hơn.',
      points: 10
    }
  ]
};
