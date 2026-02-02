module.exports = {
  classId: 9,
  curriculumType: 'ketnoi',
  chapterId: 8,
  chapterName: 'Chương 8: Ethylic alcohol và Acetic acid',
  lessonId: 26,
  title: 'Bài 26: Ancol etylic (etanol)',
  description: 'Tính chất, điều chế và ứng dụng của etanol.',
  level: 'Intermediate',
  order: 9,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: '🍶 Ethanol (C₂H₅OH)',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Mục tiêu: nhận dạng cấu tạo, tính chất vật lí/hoá học, các phương pháp điều chế và ứng dụng của etanol.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Cấu tạo & vật lí',
            content: 'CTPT C₂H₆O; nhóm -OH gắn trên khung C₂H₅ (alcol no, đơn chức).\nChất lỏng không màu, mùi đặc trưng, sôi 78,3°C; tan vô hạn trong nước (liên kết H).\nNhiệt độ chớp cháy thấp → cần an toàn cháy nổ.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'infoBox',
        content: {
            title: 'Tính chất hoá học',
            content: '**Cháy:** C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O (ngọn lửa xanh).\n**Tác dụng kim loại kiềm:** 2C₂H₅OH + 2Na → 2C₂H₅ONa + H₂↑.\n**Este hoá:** với CH₃COOH (H₂SO₄ đặc) → CH₃COOC₂H₅ + H₂O.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'warningBox',
        content: {
            title: 'Điều chế',
            content: '**Lên men:** C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂ (men, 30-35°C).\n**Hiđrat hoá etilen:** CH₂=CH₂ + H₂O (H₂SO₄ loãng, t°) → C₂H₅OH.\nTinh chế bằng chưng cất, loại tạp chất để đạt độ cồn mong muốn.',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Ứng dụng & lưu ý',
            content: 'Đồ uống có cồn (cần quản lí nồng độ), sát trùng, dung môi.\nNhiên liệu pha xăng (E5/E10) giúp giảm CO, bụi.\nAn toàn: tránh hít hơi lâu, tránh lửa nguồn nhiệt; bảo quản kín.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Bảng tóm tắt nhanh',
            content: 'Nhóm chức: -OH; tính chất đặc trưng: hoà tan, phản ứng với Na, este hoá.\nNguồn: sinh học (lên men) và công nghiệp (hiđrat hoá anken).\nAn toàn: cháy xanh, dễ bắt lửa; không dùng cồn công nghiệp làm đồ uống.',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-8',
        type: 'infoBox',
        content: {
            title: '',
            content: '**Gợi ý hình**:\nDây chuyền lên men - chưng cất cồn: */images/hoahoc9/lesson26-fermentation.png*\nCơ chế este hoá ethanol - axit axetic: */images/hoahoc9/lesson26-ester.png*',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-9',
        type: 'warningBox',
        content: {
            title: 'Mini quiz đọc nhanh',
            content: 'Vì sao ethanol tan vô hạn trong nước?\nViết phương trình lên men glucose thành etanol.\nNhận biết nhanh etanol bằng phản ứng nào trong phòng thí nghiệm?\nTự trả lời trước khi làm bộ 10 câu trắc nghiệm.',
            color: 'orange',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Công thức phân tử của etanol:',
      options: ['C2H4O2', 'C2H6O', 'C3H8O', 'C2H6'],
      correctAnswer: 1,
      explanation: 'Ethanol có CTPT C2H6O.'
    },
    {
      type: 'true-false',
      question: 'Ethanol hoà tan vô hạn trong nước.',
      correctAnswer: true,
      explanation: 'Đúng, nhóm -OH tạo liên kết hiđro với nước.'
    },
    {
      type: 'multiple-choice',
      question: 'Sản phẩm khi ethanol tác dụng Na là:',
      options: ['Na2O', 'CH3CH2ONa và H2', 'NaOH', 'CH3COONa'],
      correctAnswer: 1,
      explanation: 'Ethanol + Na → C2H5ONa + 1/2 H2.'
    },
    {
      type: 'fill-in-blank',
      question: 'Lên men đường: C6H12O6 → 2C2H5OH + ___ CO2',
      correctAnswer: '2',
      explanation: 'Sinh 2 mol CO2.'
    },
    {
      type: 'multiple-choice',
      question: 'Ứng dụng nào sau không dùng cho ethanol?',
      options: ['Dung môi', 'Sát trùng', 'Chất oxi hoá mạnh', 'Phụ gia nhiên liệu'],
      correctAnswer: 2,
      explanation: 'Ethanol là chất khử yếu, không phải oxi hoá mạnh.'
    },
    {
      type: 'multiple-choice',
      question: 'Ethanol sôi ở khoảng nhiệt độ nào?',
      options: ['56°C', '78°C', '100°C', '118°C'],
      correctAnswer: 1,
      explanation: 'Ethanol sôi 78,3°C.'
    },
    {
      type: 'true-false',
      question: 'Hiđrat hoá etilen trong môi trường H2SO4 loãng có thể tạo ethanol.',
      correctAnswer: true,
      explanation: 'CH2=CH2 + H2O (H2SO4, t°) → C2H5OH.'
    },
    {
      type: 'fill-in-blank',
      question: 'Đốt ethanol đầy đủ: C2H5OH + 3O2 → 2CO2 + ___ H2O',
      correctAnswer: '3',
      explanation: 'Hệ số nước là 3.'
    },
    {
      type: 'multiple-choice',
      question: 'Sản phẩm este hoá giữa ethanol và CH3COOH là:',
      options: ['Etyl axetat', 'Metyl axetat', 'Etylen', 'Axit axetic'],
      correctAnswer: 0,
      explanation: 'Ethanol + CH3COOH → CH3COOC2H5 + H2O.'
    },
    {
      type: 'multiple-choice',
      question: 'Dạng đóng gói nào sau đây không dùng với ethanol công nghiệp?',
      options: ['Pha đến 90-96%', 'Pha màu, hương liệu làm đồ uống', 'Dùng làm nhiên liệu E5/E10', 'Dung môi sơn'],
      correctAnswer: 1,
      explanation: 'Ethanol công nghiệp không dùng làm đồ uống do có tạp chất.'
    }
  ]
};
