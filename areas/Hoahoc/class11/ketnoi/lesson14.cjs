module.exports = {
  classId: 11,
  curriculumType: 'ketnoi',
  chapterId: 3,
  chapterName: 'Chương 3: Đại cương về hoá học hữu cơ',
  lessonId: 14,
  title: 'Bài 14: Ôn tập chương 3',
  description: 'Tổng hợp khái niệm hữu cơ, phân loại, công thức, đồng phân và tách tinh chế.',
  level: 'Intermediate',
  order: 14,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Ôn tập đại cương hữu cơ',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Tóm lược phân loại, xác định CTPT, đồng phân và chọn phương pháp tinh chế thích hợp.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Phân loại & nhóm chức',
            content: 'Hiđrocacbon: ankan, anken, ankin, thơm; dẫn xuất: halogen, ancol, anđehit, axit, este...\nMạch thẳng/nhánh/vòng; dị vòng có dị tố.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'warningBox',
        content: {
            title: 'CTPT & IHD',
            content: 'Từ % khối lượng → CTĐG → dùng M xác định CTPT.\nIHD = (2C + 2 + N - H - X)/2 để suy vòng/nối π.',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Đồng phân',
            content: 'Cấu tạo: mạch, vị trí, nhóm chức.\nLập công thức và đếm nhanh: ankan từ C4 xuất hiện nhánh; nối đôi có đồng phân vị trí/hình học.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Tách & tinh chế',
            content: 'Chưng cất (đơn/phân đoạn/chân không), chiết, kết tinh lại, sắc kí mỏng theo dõi.\nChọn phương pháp dựa trên điểm sôi, độ tan, bền nhiệt, hệ số phân bố.',
            color: 'purple',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'IHD của C5H10 là:',
      options: ['0', '1', '2', '3'],
      correctAnswer: 1,
      explanation: 'IHD=(2*5+2-10)/2=1 (1 vòng hoặc 1 nối đôi).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Dẫn xuất nào thuộc nhóm chức halogen?',
      options: ['CH3CH2OH', 'CH3CH2Cl', 'CH3COOH', 'CH3CHO'],
      correctAnswer: 1,
      explanation: 'Halogenoalkan có halogen gắn với C.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Ankan từ C4 trở lên có thể có đồng phân mạch.',
      correctAnswer: true,
      explanation: 'C4H10 là ankan đầu tiên có nhánh.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phương pháp phù hợp tách hỗn hợp benzen-toluen:',
      options: ['Chiết nước', 'Chưng cất phân đoạn', 'Kết tinh', 'Sắc kí giấy'],
      correctAnswer: 1,
      explanation: 'Điểm sôi gần nhưng vẫn tách bằng cột chưng phân đoạn.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Nhận định đúng về IHD:',
      options: ['Tính luôn cần O', 'Mỗi liên kết đôi tăng 1 IHD', 'Halogen làm giảm IHD 2 đơn vị', 'Mỗi vòng tăng 2 IHD'],
      correctAnswer: 1,
      explanation: 'Mỗi nối π hoặc mỗi vòng tăng 1 đơn vị IHD.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Kết tinh lại cần dung môi tan tốt lạnh, tan kém nóng.',
      correctAnswer: false,
      explanation: 'Ngược lại: tan tốt nóng, tan kém lạnh để kết tinh khi nguội.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Hỗn hợp etanol - nước tách bằng:',
      options: ['Chiết với hexan', 'Chưng cất thường', 'Chưng cất azeotrop hoặc thêm chất tách nước', 'Kết tinh'],
      correctAnswer: 2,
      explanation: 'Ethanol-nước tạo azeotrop 95%, cần phương pháp đặc biệt để vượt.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Cặp đồng phân chức là:',
      options: ['CH3OCH3 và C2H5OH', 'But-1-ene và cis-but-2-ene', 'Cyclopentan và pent-1-ene', 'n-hexan và 2-metylpentan'],
      correctAnswer: 0,
      explanation: 'C2H6O có ancol và ete là đồng phân nhóm chức.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Silica gel là pha tĩnh phổ biến trong TLC.',
      correctAnswer: true,
      explanation: 'Silica gel hấp phụ phân cực, dùng rộng rãi.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'CTPT xác định từ CTĐG bằng hệ số n = M thực nghiệm / M ______',
      correctAnswer: 'công thức đơn giản',
      explanation: 'Nhân chỉ số CTĐG với n để ra CTPT.',
      points: 10
    }
  ]
};
