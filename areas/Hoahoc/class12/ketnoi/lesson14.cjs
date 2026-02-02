module.exports = {
  classId: 12,
  curriculumType: 'ketnoi',
  chapterId: 4,
  chapterName: 'Chương 4: Polymer',
  lessonId: 14,
  title: 'Bài 14: Ôn tập chương 4',
  description: 'Tổng hợp kiến thức polymer: cơ chế tạo chuỗi, tính chất, ứng dụng và môi trường.',
  level: 'Intermediate',
  order: 14,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Ôn tập chương 4: Polymer',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Tổng hợp loại phản ứng, nhận diện monomer, phân tích tính chất vật liệu và bài tập tính toán.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Nhận diện & phản ứng',
            content: 'Trùng hợp cộng: anken, vinylic (PE, PP, PVC, PS).\nTrùng ngưng: monomer đa chức (-COOH, -OH, -NH2) tách phân tử nhỏ (PA, PET, PF).\nĐơn vị lặp xác định từ monomer; DP ước tính khối lượng polymer.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'infoBox',
        content: {
            title: 'So sánh vật liệu',
            content: 'Nhựa: nhiệt dẻo/tái chế vs nhiệt rắn bền nhiệt.\nCao su: đàn hồi; cần lưu hoá; chịu dầu/ozon tùy loại.\nTơ: độ bền kéo, hút ẩm; tơ tổng hợp ít hút ẩm hơn tơ tự nhiên.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Bền vững & tính toán',
            content: 'Tái chế cơ học/hoá học, phân huỷ sinh học, giảm vi nhựa.\nBài tập: tính DP, khối lượng polymer từ monomer; dự đoán tính chất từ cấu trúc.\nPhân tích Tg/Tm liên quan tới mạch thẳng/nhánh, lực tương tác.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Mindmap ôn tập',
            content: 'Cộng (PE, PP, PS, PVC) vs ngưng (PA, PET, PF); dấu hiệu: có/không tách H2O/HCl.\nTính chất quyết định bởi: mạch (thẳng/nhánh/mạng), nhóm chức (este, amide), độ kết tinh.\nTái chế: mã 1-7; nhiệt dẻo ưu tiên tái chế, nhiệt rắn khó.',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Case & mẹo',
            content: 'Đề bài “tính DP”: nhớ DP = Mpolymer / M mắt xích; nếu có phân tử nhỏ tách ra, tính khối lượng mắt xích sau khi tách.\nPhân biệt PE nhánh vs thẳng: dựa mật độ, Tm, độ bền kéo; nhánh mềm, Tm thấp.\nNhận monomer từ polymer: cắt đôi liên kết lặp (vinyl), hoặc phá nhóm -CO-NH- (PA), -COO- (PET) để suy ra monomer.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-8',
        type: 'infoBox',
        content: {
            title: 'Ôn bài tập',
            content: 'Viết phương trình trùng ngưng: đặt n monomer, trừ (n-1) phân tử nhỏ; cân bằng nguyên tử.\nTính E, Tg, Tm không yêu cầu nhưng liên hệ cấu trúc để chọn vật liệu phù hợp tình huống.\nSo sánh nhựa/ cao su/ tơ trong đề nhận biết: xét tính đàn hồi, nóng chảy, tan chảy khi đun.',
            color: 'gray',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Monomer của PVC là:',
      options: ['CH2=CH2', 'CH2=CHCl', 'CH2=CHCN', 'CH2=C(CH3)2'],
      correctAnswer: 1,
      explanation: 'PVC từ vinyl chloride.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Trùng ngưng cần điều kiện:',
      options: ['Monomer một chức', 'Tách phân tử nhỏ', 'Nhiệt độ thấp bắt buộc', 'Xúc tác kim loại'],
      correctAnswer: 1,
      explanation: 'Phải có nhóm chức đa chức để tách H2O/HCl...',
      points: 10
    },
    {
      type: 'true-false',
      question: 'PE là polymer mạch no thu từ anken.',
      correctAnswer: true,
      explanation: 'Etilen cộng mở vòng tạo chuỗi no.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Nylon-6,6 thuộc loại:',
      options: ['Polyamit trùng hợp', 'Polyamit trùng ngưng', 'Polyete', 'Polyeste'],
      correctAnswer: 1,
      explanation: 'Từ diamine + diacid → trùng ngưng, nhóm -CO-NH-.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Khi DP tăng, tính chất nào thường tăng:',
      options: ['Độ bền kéo', 'Độ bay hơi', 'Độ tan', 'Tốc độ kết tinh'],
      correctAnswer: 0,
      explanation: 'Chuỗi dài tăng bền cơ nhưng giảm tan.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Nhựa nhiệt rắn có thể tái nóng chảy nhiều lần.',
      correctAnswer: false,
      explanation: 'Mạng không gian không chảy lại.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Đơn vị lặp của PET chứa nhóm:',
      options: ['-CO-NH-', '-O-CH2-CH2-O-CO-Ph-CO-', '-CH2-CHCl-', '-CH2-CH2-'],
      correctAnswer: 1,
      explanation: 'PET có nhóm este với nhân thơm terephtalat.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'DP ≈ Mpolymer / M ______ lặp.',
      correctAnswer: 'đơn vị',
      explanation: 'Chia khối lượng cho khối lượng mắt xích.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'PE nhánh (LDPE) so với PE thẳng (HDPE):',
      options: ['Kết tinh cao hơn', 'Mềm hơn, Tg thấp hơn', 'Cứng hơn', 'Nhiệt độ nóng chảy cao hơn'],
      correctAnswer: 1,
      explanation: 'Nhánh làm giảm kết tinh, tăng mềm dẻo.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Cao su thiên nhiên là polyisopren cis.',
      correctAnswer: true,
      explanation: 'Đơn vị lặp isopren nối 1,4-cis.',
      points: 10
    }
  ]
};
