module.exports = {
  classId: 12,
  curriculumType: 'ketnoi',
  chapterId: 2,
  chapterName: 'Chương 2: Carbohydrate',
  lessonId: 6,
  title: 'Bài 6: Tinh bột và cellulose',
  description: 'Cấu trúc polyme thiên nhiên, tính chất và ứng dụng của tinh bột, xenlulozơ.',
  level: 'Intermediate',
  order: 6,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Tinh bột và xenlulozơ',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Hai polysaccharide phổ biến: nguồn năng lượng (tinh bột) và vật liệu cấu trúc (xenlulozơ); khác biệt ở kiểu liên kết glycosid.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Tinh bột',
            content: 'Gồm amylose (mạch xoắn α-1,4) và amylopectin (nhánh α-1,6).\nPhản ứng iot → màu xanh tím; hồ hoá khi đun nước.\nThuỷ phân: maltose → glucose; enzyme amylase trong nước bọt, dịch tụy.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'infoBox',
        content: {
            title: 'Xenlulozơ',
            content: 'Polymer β-1,4-glucose; mạch thẳng, tạo bó sợi bền, không tan nước.\nKhông màu với iot; bị thủy phân bởi H2SO4 đặc nóng; enzyme xenlulase hiếm.\nChuyển hoá: nitro hóa → xenlulozơ trinitrat (thuốc nổ khói); xút + CS2 → tơ visco.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Ứng dụng & công nghệ',
            content: 'Tinh bột: thực phẩm, lên men công nghiệp (bia, ethanol), sản xuất glucose, dextrin.\nXenlulozơ: giấy, sợi bông, tơ nhân tạo (axetat, visco), vật liệu phân huỷ sinh học.\nXu hướng: bột biến tính tăng độ bền gel; màng sinh học từ xenlulozơ vi khuẩn.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'So sánh nhanh',
            content: 'Tinh bột: α-1,4/α-1,6 → iot xanh tím, hồ hoá; tiêu hoá được.\nXenlulozơ: β-1,4 → không màu với iot, không tiêu hoá, tạo sợi bền.\nEnzyme: amylase cắt tinh bột; xenlulase hiếm (một số vi sinh vật/termite có).',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Case & mẹo',
            content: 'Nhận biết bột giấy lẫn tinh bột: thử iot → chỗ có tinh bột xanh, giấy thật không đổi màu.\nBột biến tính làm đặc súp: hồ hoá nhiệt thấp, tạo gel bền hơn tinh bột thường.\nMẹo nhớ liên kết: “α ăn được, β bền sợi” để phân biệt tinh bột (ăn) và xenlulozơ (sợi).',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-8',
        type: 'infoBox',
        content: {
            title: 'Ôn bài tập',
            content: 'Tính khối lượng glucose từ tinh bột: dùng tỉ lệ mol (C6H10O5)n + nH2O → nC6H12O6.\nHiệu suất hồ hoá/thuỷ phân: khối lượng thực tế ÷ lý thuyết; chú ý nước hấp thụ vào gel.\nNhận biết: iot (tinh bột), không phản ứng với iot (xenlulozơ), khả năng hoà tan/hoá visco.',
            color: 'gray',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Liên kết glycosid trong amylose là:',
      options: ['β-1,4', 'α-1,4', 'α-1,6', 'β-1,6'],
      correctAnswer: 1,
      explanation: 'Amylose mạch thẳng nối α-1,4 tạo xoắn.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Xenlulozơ cho màu gì với iot?',
      options: ['Xanh tím', 'Đỏ nâu', 'Không màu', 'Vàng chanh'],
      correctAnswer: 2,
      explanation: 'Xenlulozơ không tạo màu với iot.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Amylopectin có nhánh α-1,6.',
      correctAnswer: true,
      explanation: 'Nhánh xuất hiện khoảng mỗi 24-30 đơn vị glucose.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Sản phẩm thuỷ phân hoàn toàn tinh bột là:',
      options: ['Maltose', 'Glucose', 'Fructose', 'Saccharose'],
      correctAnswer: 1,
      explanation: 'Thuỷ phân đến cùng cho glucose.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Vật liệu tơ visco được sản xuất từ:',
      options: ['Tinh bột', 'Xenlulozơ', 'Protein', 'Polystyren'],
      correctAnswer: 1,
      explanation: 'Xenlulozơ hòa tan dạng viscose rồi kéo sợi.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Tinh bột tan tốt trong nước lạnh.',
      correctAnswer: false,
      explanation: 'Tinh bột không tan lạnh, hồ hoá khi đun nóng nước.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Thuốc thử nhận biết tinh bột trong thức ăn:',
      options: ['Br2', 'Iot/KI', 'Tollens', 'Fehling'],
      correctAnswer: 1,
      explanation: 'Dung dịch iot cho màu xanh tím đặc trưng.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Xenlulozơ trinitrat dùng làm:',
      options: ['Tơ sợi', 'Thuốc nổ không khói', 'Dung môi hữu cơ', 'Phân bón'],
      correctAnswer: 1,
      explanation: 'Nitro hóa xenlulozơ tạo bông súng (nitrocellulose).',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Enzym phân giải tinh bột trong nước bọt là ______.',
      correctAnswer: 'amylase',
      explanation: 'Amylase cắt liên kết α-1,4 tạo maltose, dextrin.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Xenlulozơ tự nhiên khó bị enzym tiêu hoá của người phân giải.',
      correctAnswer: true,
      explanation: 'Người không có xenlulase, nên xenlulozơ là chất xơ.',
      points: 10
    }
  ]
};
