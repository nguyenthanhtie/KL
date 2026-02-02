module.exports = {
  classId: 11,
  curriculumType: 'ketnoi',
  chapterId: 2,
  chapterName: 'Chương 2: Nitrogen - sulfur',
  lessonId: 5,
  title: 'Bài 5: Ammonia. Muối ammonium',
  description: 'Cấu tạo, tính chất của NH3 và muối amoni; dung dịch, phân huỷ.',
  level: 'Intermediate',
  order: 5,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Ammonia và muối amoni',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Nắm cấu trúc, tính bazơ yếu của NH3, các phản ứng quan trọng và tính chất muối amoni.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Cấu tạo & tính chất NH3',
            content: 'Lai hoá sp3, hình chóp tam giác, có 1 cặp e tự do → tạo liên kết hidro yếu.\nTính bazơ yếu: NH3 + H2O ⇌ NH4+ + OH- (Kb nhỏ); tan tốt trong nước (dung dịch amoniac).\nTác dụng axit mạnh → muối amoni; tác dụng với muối của kim loại yếu hơn → giải phóng NH3 (nhận biết).',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'warningBox',
        content: {
            title: 'Muối amoni',
            content: 'Thường tan, dễ phân huỷ nhiệt: NH4HCO3 → NH3 + CO2 + H2O.\nHầu hết muối amoni bị kiềm mạnh đẩy NH3: NH4Cl + NaOH → NH3↑ + NaCl + H2O.\nIon NH4+ bị oxi hoá bởi thuốc tím/Clor nước (trong phân huỷ sinh học thành NO3-).',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Ứng dụng & sản xuất',
            content: 'Sản xuất phân đạm (NH4NO3, (NH4)2SO4, urê từ NH3 + CO2).\nKhí amoniac dùng làm môi chất lạnh, chất tẩy rửa, xử lí khí thải NOx (SCR).\nĐiều chế công nghiệp: tổng hợp Haber-Bosch (N2 + 3H2 ⇌ 2NH3, Fe xúc tác, 450-500°C, 200 atm).',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Nhận biết & an toàn',
            content: 'Thuốc thử: NaOH đun nóng → NH3 mùi khai, quỳ tím hoá xanh; khói trắng với HCl đặc.\nNH3 gây kích ứng; thao tác nơi thoáng, tránh hít.',
            color: 'gray',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Hình học phân tử NH3 là:',
      options: ['Tetrahedron đều', 'Chóp tam giác', 'Phẳng tam giác', 'Thẳng'],
      correctAnswer: 1,
      explanation: 'NH3 lai hoá sp3 với 1 cặp e tự do → chóp tam giác.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng nhận biết ion NH4+ dùng:',
      options: ['AgNO3', 'NaOH đun nóng, quỳ tím', 'BaCl2', 'H2SO4 đặc'],
      correctAnswer: 1,
      explanation: 'NaOH đẩy NH3 mùi khai làm quỳ tím hoá xanh.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'NH3 là bazơ mạnh hơn NaOH.',
      correctAnswer: false,
      explanation: 'NH3 là bazơ yếu; NaOH là bazơ mạnh điện li hoàn toàn.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Muối nào dễ phân huỷ sinh khí khi đun nhẹ?',
      options: ['NH4NO3', 'NH4HCO3', 'NH4Cl', 'NaNO3'],
      correctAnswer: 1,
      explanation: 'NH4HCO3 phân huỷ ở nhiệt độ thấp giải phóng NH3 và CO2.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Trong quá trình Haber, điều kiện áp suất thường khoảng:',
      options: ['1 atm', '10 atm', '200 atm', '1000 atm'],
      correctAnswer: 2,
      explanation: 'Haber thường ~200 atm, 450-500°C, xúc tác Fe.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'NH3 tan mạnh trong nước do hình thành liên kết hidro.',
      correctAnswer: true,
      explanation: 'NH3 có cặp e tự do và liên kết H với nước.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Muối amoni bị kiềm mạnh đẩy NH3 vì:',
      options: ['NH3 là axit', 'Ion NH4+ không bền trong kiềm', 'NaOH bị khử', 'Tạo kết tủa'],
      correctAnswer: 1,
      explanation: 'OH- lấy H+ từ NH4+ → NH3 giải phóng.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Ứng dụng môi chất lạnh của NH3 dựa trên:',
      options: ['Nhiệt độ sôi thấp, entanpi bay hơi lớn', 'Khối lượng riêng cao', 'Tính axit mạnh', 'Mùi dễ chịu'],
      correctAnswer: 0,
      explanation: 'NH3 sôi thấp, hấp thu nhiệt lớn khi bay hơi.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Khói trắng xuất hiện khi cho NH3 tiếp xúc HCl đặc là do tạo:',
      options: ['NH4Cl rắn', 'Cl2', 'H2', 'NH4OH'],
      correctAnswer: 0,
      explanation: 'Hơi NH3 + HCl → tinh thể mịn NH4Cl.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Phản ứng trung hoà: NH3 + HCl → ______',
      correctAnswer: 'NH4Cl',
      explanation: 'Bazơ yếu + axit mạnh → muối amoni.',
      points: 10
    }
  ]
};
