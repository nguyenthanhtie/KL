module.exports = {
  classId: 9,
  curriculumType: 'ketnoi',
  chapterId: 10,
  chapterName: 'Chương 10: Khai thác tài nguyên từ vỏ trái đất',
  lessonId: 34,
  title: 'Bài 34: Khai thác đá vôi và công nghiệp silicat',
  description: 'Chu trình khai thác đá vôi, sản xuất vôi sống, xi măng, thuỷ tinh.',
  level: 'Intermediate',
  order: 17,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: '🏗️ Đá vôi & công nghiệp silicat',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Mục tiêu: nắm quy trình nung vôi, sản xuất xi măng, thuỷ tinh và lưu ý môi trường.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Nung vôi & vôi tôi',
            content: 'CaCO₃ (đá vôi) nung 900-1000°C → CaO + CO₂.\nCaO + H₂O → Ca(OH)₂ (vôi tôi), tỏa nhiệt mạnh.\nỨng dụng: xây dựng, xử lí nước, điều chỉnh pH đất.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'warningBox',
        content: {
            title: 'Xi măng',
            content: 'Nghiền đá vôi + đất sét, nung lò quay → clinker (C₃S, C₂S...).\nNghiền clinker + chút thạch cao → xi măng Portland.\nThạch cao điều chỉnh thời gian đông kết; cần bảo quản khô.',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Thuỷ tinh',
            content: 'Phối liệu: SiO₂ (cát) + Na₂CO₃ (soda) + CaCO₃ (đá vôi) + phụ gia.\nNung chảy → khối thuỷ tinh, tạo hình rồi làm nguội.\nĐiều chỉnh phụ gia để có thuỷ tinh màu, chịu nhiệt, an toàn.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Môi trường & an toàn',
            content: 'Phát thải CO₂, bụi; cần lọc bụi tay áo/cyclon, thu hồi nhiệt.\nTái dùng phế liệu xây dựng, mảnh thuỷ tinh để giảm nguyên liệu.\nAn toàn: tránh hít bụi vôi/xi măng, cẩn thận khi tôi vôi vì toả nhiệt.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Bảng tóm tắt nhanh',
            content: 'Nung vôi: CaCO₃ → CaO + CO₂; tôi vôi: CaO + H₂O → Ca(OH)₂.\nXi măng: clinker + thạch cao nghiền mịn.\nThuỷ tinh soda-lime: SiO₂ + Na₂CO₃ + CaCO₃ + phụ gia.',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-8',
        type: 'infoBox',
        content: {
            title: '',
            content: '**Gợi ý hình**:\nSơ đồ lò quay xi măng và dòng nguyên liệu: */images/hoahoc9/lesson34-cement.png*\nQuy trình nấu thuỷ tinh soda-lime: */images/hoahoc9/lesson34-glass.png*\nChu trình vôi sống → vôi tôi → vôi chết: */images/hoahoc9/lesson34-limecycle.png*',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-9',
        type: 'warningBox',
        content: {
            title: 'Mini quiz đọc nhanh',
            content: 'Viết PTHH nung vôi và tôi vôi.\nThạch cao có vai trò gì trong xi măng?\nBiện pháp giảm bụi trong nhà máy xi măng?\nTrả lời nhanh trước khi làm trắc nghiệm.',
            color: 'orange',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Phản ứng nung vôi tạo ra khí nào?',
      options: ['SO2', 'CO2', 'N2', 'O2'],
      correctAnswer: 1,
      explanation: 'CaCO3 → CaO + CO2.'
    },
    {
      type: 'true-false',
      question: 'Clinker là sản phẩm trung gian trong sản xuất xi măng.',
      correctAnswer: true,
      explanation: 'Clinker nghiền với thạch cao tạo xi măng.'
    },
    {
      type: 'multiple-choice',
      question: 'Thành phần chính của thuỷ tinh soda-lime là:',
      options: ['SiO2, Na2CO3, CaCO3', 'SiO2, NaCl', 'Al2O3, Fe2O3', 'C và H'],
      correctAnswer: 0,
      explanation: 'Thuỷ tinh thường dùng SiO2 + soda + đá vôi.'
    },
    {
      type: 'fill-in-blank',
      question: 'Sản xuất xi măng: nghiền clinker + ___ thạch cao',
      correctAnswer: 'một chút',
      explanation: 'Thêm lượng nhỏ thạch cao điều chỉnh đông kết.'
    },
    {
      type: 'multiple-choice',
      question: 'Biện pháp giảm bụi nhà máy xi măng:',
      options: ['Lọc bụi tay áo', 'Không cần', 'Chỉ phun nước', 'Tăng nhiệt'],
      correctAnswer: 0,
      explanation: 'Sử dụng hệ thống lọc bụi, lọc tay áo, cyclone.'
    },
    {
      type: 'multiple-choice',
      question: 'Sản phẩm nào thu được khi vôi sống tác dụng với nước?',
      options: ['Ca(OH)2', 'CaCO3', 'CaSO4', 'NaOH'],
      correctAnswer: 0,
      explanation: 'CaO + H2O → Ca(OH)2 (vôi tôi).' 
    },
    {
      type: 'true-false',
      question: 'Thuỷ tinh có thể tái chế nhiều lần.',
      correctAnswer: true,
      explanation: 'Thuỷ tinh tái chế giảm năng lượng và chất thải.'
    },
    {
      type: 'fill-in-blank',
      question: 'Trong lò cao xi măng, CaCO3 bị ___ sinh CaO.',
      correctAnswer: 'phân huỷ',
      explanation: 'CaCO3 bị nhiệt phân sinh CaO và CO2.'
    },
    {
      type: 'multiple-choice',
      question: 'Thành phần nào điều chỉnh thời gian đông kết của xi măng?',
      options: ['Thạch cao', 'NaCl', 'Cát', 'Than đá'],
      correctAnswer: 0,
      explanation: 'Thêm lượng nhỏ thạch cao để điều chỉnh đông kết.'
    },
    {
      type: 'multiple-choice',
      question: 'Tác động môi trường chính khi nung vôi là:',
      options: ['CO2 và bụi', 'SO3', 'O3', 'N2'],
      correctAnswer: 0,
      explanation: 'Phát thải CO2 và bụi cần được xử lí.'
    }
  ]
};
