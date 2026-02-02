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
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: '🧪 Bài mở đầu: Sử dụng hóa chất và thiết bị trong phòng thí nghiệm',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Mục tiêu: nhận diện nhanh hóa chất cơ bản, nắm dụng cụ cốt lõi, và thực hành an toàn tức thì.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Hóa chất thường gặp',
            content: '**HCl:** lỏng, mùi hắc; ăn mòn mạnh.\n**H₂SO₄:** lỏng sánh; thêm axit vào nước khi pha loãng.\n**NaOH, Ca(OH)₂:** bazơ ăn da; bảo quản kín, tránh ẩm.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'tipBox',
        content: {
            title: 'Dụng cụ cốt lõi',
            content: 'Ống nghiệm, giá ống nghiệm: phản ứng nhỏ.\nCốc thủy tinh, ống đong: chứa, đo thể tích gần đúng.\nPipet/ống nhỏ giọt: lấy thể tích nhỏ chính xác.\nCân phân tích: đo khối lượng chuẩn.\nĐèn cồn, kẹp gỗ: đun nóng an toàn.',
            color: 'green',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Sơ đồ thao tác an toàn nhanh',
            content: 'Chuẩn bị: áo blouse, kính, găng; kiểm tra dụng cụ sạch, khô.\nCân/đong: hiệu chỉnh cân về 0; lót giấy/boat; đo thể tích bằng ống đong ở tầm mắt.\nPha chế: luôn rót **axit vào nước** từ từ, khuấy nhẹ.\nĐun nóng: hướng miệng ống nghiệm ra xa, kẹp và lắc nhẹ.\nXử lý sự cố: rửa ngay bằng nước nhiều phút nếu dính da/mắt; báo giáo viên.',
            color: 'purple',
            listType: 'number'
        }
    },
    {
        id: 'mod-6',
        type: 'warningBox',
        content: {
            title: 'An toàn tức thì',
            content: 'Không nếm, không ngửi trực tiếp; dùng tay quạt nhẹ hơi.\nKhông đổ hóa chất thừa về chai gốc.\nKhông để gần nguồn lửa khi dùng dung môi dễ bay hơi.\nRửa tay sau khi thao tác; thu gom rác hóa chất đúng nơi.',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Mẹo ghi nhớ nhanh',
            content: '**A vào N**: Axit vào Nước.\n**3 kiểm tra**: cân về 0, ống đong ngang mắt, kẹp chắc trước khi đun.\n**3 tránh**: tránh hít mạnh, tránh quay miệng ống vào người, tránh để tràn hóa chất.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-8',
        type: 'infoBox',
        content: {
            title: 'Mini quiz đọc nhanh',
            content: 'Khi pha loãng H₂SO₄ đặc, rót theo chiều nào?\nThiết bị đo khối lượng chính xác? Vì sao cần lót giấy?\nKhi đun ống nghiệm, miệng ống nên hướng về đâu?\nTrả lời nhanh để tự check trước khi làm bài test 10 câu.',
            color: 'blue',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: "multiple-choice",
      question: "Thiết bị nào dùng để đo chính xác khối lượng chất?",
      options: [
        "Ống nghiệm",
        "Cân phân tích",
        "Nhiệt kế",
        "Đèn cồn"
      ],
      correctAnswer: 1,
      explanation: "✅ Cân phân tích được dùng để cân chính xác khối lượng chất.",
      points: 10
    },
    {
      type: "true-false",
      question: "Có thể nếm hóa chất để kiểm tra tính chất của chúng.",
      correctAnswer: false,
      explanation: "✅ Sai! Tuyệt đối không được nếm hóa chất vì có thể gây nguy hiểm.",
      points: 10
    },
    {
      type: "multiple-choice",
      question: "Công thức hóa học của natri hidroxit là gì?",
      options: [
        "NaCl",
        "NaOH",
        "Na₂CO₃",
        "NaHCO₃"
      ],
      correctAnswer: 1,
      explanation: "✅ Natri hidroxit có công thức hóa học là NaOH.",
      points: 10
    },
    {
      type: "multiple-choice",
      question: "Thiết bị nào dùng để đun nóng an toàn trong phòng thí nghiệm?",
      options: [
        "Ống đong",
        "Đèn cồn",
        "Pipet",
        "Cân phân tích"
      ],
      correctAnswer: 1,
      explanation: "Đèn cồn cung cấp nhiệt để đun nóng mẫu thử ở quy mô nhỏ.",
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
      explanation: "Rửa ngay dưới vòi nước và báo giáo viên để xử lý kịp thời.",
      points: 10
    },
    {
      type: "multiple-choice",
      question: "Dụng cụ đo thể tích gần đúng (ml) thường dùng là:",
      options: [
        "Ống đong",
        "Chén sứ",
        "Phiễu giấy",
        "Đũa thủy tinh"
      ],
      correctAnswer: 0,
      explanation: "Ống đong chia vạch để đo thể tích dung dịch gần đúng.",
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
      explanation: "Trang bị bảo hộ cá nhân để tránh bỏng hóa chất.",
      points: 10
    },
    {
      type: "multiple-choice",
      question: "Dụng cụ lấy lượng nhỏ dung dịch chính xác là:",
      options: [
        "Ống hút nhỏ giọt/Pipet",
        "Chai rửa",
        "Chày cối",
        "Kẹp gỗ"
      ],
      correctAnswer: 0,
      explanation: "Pipet/ống nhỏ giọt cho phép lấy thể tích nhỏ chính xác.",
      points: 10
    },
    {
      type: "multiple-choice",
      question: "Bước đầu tiên trước khi cân hóa chất rắn là:",
      options: [
        "Bật đèn cồn",
        "Hiệu chỉnh cân về 0 và lót giấy/boat cân",
        "Thổi bụi vào cân",
        "Đặt trực tiếp hóa chất lên đĩa cân"
      ],
      correctAnswer: 1,
      explanation: "Hiệu chỉnh cân và dùng giấy/boat cân để bảo vệ đĩa cân.",
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
      explanation: "Quạt nhẹ hơi để ngửi, tránh hít trực tiếp khí đậm đặc.",
      points: 10
    }
  ]
};
