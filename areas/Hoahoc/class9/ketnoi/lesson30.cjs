module.exports = {
  classId: 9,
  curriculumType: 'ketnoi',
  chapterId: 9,
  chapterName: 'Chương 9: Lipid. Carbohydrate. Protein. Polymer',
  lessonId: 30,
  title: 'Bài 30: Tinh bột và xenlulozơ',
  description: 'Cấu trúc, tính chất và vai trò của tinh bột và xenlulozơ.',
  level: 'Beginner',
  order: 13,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: '🌾 Tinh bột & Xenlulozơ',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Mục tiêu: so sánh cấu trúc, tính chất và ứng dụng của hai polisaccarit phổ biến nhất trong tự nhiên.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Tinh bột',
            content: 'Polyme của α-glucose; gồm amiloza (mạch thẳng) + amilopectin (phân nhánh).\nKhông tan nước lạnh; nước nóng → hồ tinh bột nhớt.\nThử iod (I₂/KI) → xanh tím đặc trưng (do phức với amiloza).\nThuỷ phân (enzym/axit loãng) → maltose → glucose.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'warningBox',
        content: {
            title: 'Xenlulozơ',
            content: 'Polyme β-1,4-glucose, mạch thẳng, sắp xếp song song tạo sợi bền.\nKhông tan trong nước và dung môi thường; không cho màu với iod.\nThuỷ phân (axit mạnh, enzym chuyên biệt) → cellobiose → glucose.\nThành phần chính thành tế bào thực vật, bông, gỗ.',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Nhận biết & phản ứng',
            content: 'Iod nhuộm xanh tím tinh bột; không đổi màu với xenlulozơ.\nThuỷ phân: cả hai đều cho glucose cuối cùng.\nXenlulozơ có thể tạo dẫn xuất: xenlulozơ trinitrat (thuốc súng không khói), axetat (tơ nhân tạo).',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Ứng dụng & vai trò',
            content: 'Tinh bột: nguồn năng lượng chính trong khẩu phần; nguyên liệu sản xuất glucose, maltose.\nXenlulozơ: giấy, vải sợi (bông), vật liệu sinh học, màng cellulose.\nBảo quản: tinh bột hút ẩm → vón; xenlulozơ khó tiêu hoá, hỗ trợ chất xơ.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Bảng tóm tắt nhanh',
            content: 'Tinh bột: α-glucose, hồ với nước nóng, màu xanh iod.\nXenlulozơ: β-glucose, sợi bền, không màu với iod.\nCả hai thuỷ phân cuối cùng cho glucose.',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-8',
        type: 'infoBox',
        content: {
            title: '',
            content: '**Gợi ý hình**:\nCấu trúc amiloza vs amilopectin: */images/hoahoc9/lesson30-starch.png*\nLiên kết β-1,4 trong xenlulozơ và bó sợi: */images/hoahoc9/lesson30-cellulose.png*',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-9',
        type: 'warningBox',
        content: {
            title: 'Mini quiz đọc nhanh',
            content: 'Vì sao iod chỉ nhuộm màu tinh bột mà không nhuộm xenlulozơ?\nThuỷ phân hoàn toàn tinh bột và xenlulozơ đều cho gì?\nỨng dụng nào cần tính chất sợi bền của xenlulozơ?\nTự kiểm tra trước khi luyện bài trắc nghiệm.',
            color: 'orange',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Tinh bột tan tốt trong điều kiện nào?',
      options: ['Nước lạnh', 'Nước nóng tạo hồ tinh bột', 'Dung môi hữu cơ', 'Không tan'],
      correctAnswer: 1,
      explanation: 'Nước nóng làm hồ tinh bột.'
    },
    {
      type: 'true-false',
      question: 'Xenlulozơ có cấu trúc mạch thẳng và không tan nước.',
      correctAnswer: true,
      explanation: 'Đúng, tạo độ bền cho thành tế bào.'
    },
    {
      type: 'multiple-choice',
      question: 'Thử iod (I2/KI) nhuộm màu xanh dương với:',
      options: ['Xenlulozơ', 'Tinh bột', 'Saccharose', 'Glycerol'],
      correctAnswer: 1,
      explanation: 'Tinh bột cho màu xanh dương đặc trưng.'
    },
    {
      type: 'fill-in-blank',
      question: 'Thuỷ phân tinh bột với enzyme → ___ (đường đơn)',
      correctAnswer: 'glucose',
      explanation: 'Thuỷ phân hoàn toàn cho glucose.'
    },
    {
      type: 'multiple-choice',
      question: 'Ứng dụng chính của xenlulozơ:',
      options: ['Nhiên liệu', 'Trang sức', 'Sản xuất giấy, sợi', 'Thuốc sát trùng'],
      correctAnswer: 2,
      explanation: 'Xenlulozơ là nguyên liệu giấy, sợi, vật liệu sinh học.'
    },
    {
      type: 'multiple-choice',
      question: 'Tinh bột gồm hai thành phần chính:',
      options: ['Amilozo và amilopectin', 'Glucozo và fructozo', 'Xenlulozơ và amilozo', 'Saccarozơ và xenlulozơ'],
      correctAnswer: 0,
      explanation: 'Tinh bột gồm amilozo (mạch thẳng) và amilopectin (phân nhánh).' 
    },
    {
      type: 'true-false',
      question: 'Xenlulozơ có cấu trúc beta-glucose liên kết 1,4-glycosid.',
      correctAnswer: true,
      explanation: 'Đúng, liên kết beta-1,4 tạo sợi bền.'
    },
    {
      type: 'fill-in-blank',
      question: 'Thử iod cho màu ___ với tinh bột.',
      correctAnswer: 'xanh dương',
      explanation: 'Dung dịch iod nhuộm tinh bột màu xanh dương đặc trưng.'
    },
    {
      type: 'multiple-choice',
      question: 'Sản phẩm thuỷ phân hoàn toàn xenlulozơ là:',
      options: ['Saccarozơ', 'Tinh bột', 'Glucozo', 'Fructozo'],
      correctAnswer: 2,
      explanation: 'Xenlulozơ thuỷ phân → glucose.'
    },
    {
      type: 'multiple-choice',
      question: 'Công dụng nào sau không phải của tinh bột?',
      options: ['Nguồn năng lượng trong thực phẩm', 'Sản xuất giấy cao cấp', 'Sản xuất đường glucose', 'Tạo hồ bao quát'],
      correctAnswer: 1,
      explanation: 'Giấy từ xenlulozơ; tinh bột dùng trong thực phẩm và chuyển đổi đường.'
    }
  ]
};
