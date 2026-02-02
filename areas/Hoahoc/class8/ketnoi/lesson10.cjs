module.exports = {
  classId: 8,
  curriculumType: 'ketnoi',
  chapterId: 3,
  chapterName: "Chương 3: Một số hợp chất thông dụng",
  lessonId: 10,
  order: 10,
  title: 'Bài 10: Oxide',
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: '🪨 Bài 10: Oxide',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Mục tiêu: nhận diện oxide, phân loại, gọi tên, điều chế và ứng dụng.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Định nghĩa & phân loại',
            content: 'Oxide: hợp chất gồm O và 1 nguyên tố khác.\nOxide bazơ (kim loại): Na₂O, CaO, CuO... phản ứng với acid.\nOxide acid (phi kim): CO₂, SO₂, P₂O₅... phản ứng với bazơ.\nOxide lưỡng tính: Al₂O₃, ZnO (phản ứng được với cả acid và bazơ).',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'infoBox',
        content: {
            title: 'Gọi tên & phản ứng tiêu biểu',
            content: 'Gọi: [Tên nguyên tố] + oxide; nhiều hóa trị ghi số La Mã (FeO sắt(II), Fe₂O₃ sắt(III)).\nCaO + H₂O → Ca(OH)₂ (oxide bazơ + nước tạo bazơ).\nSO₂ + 2NaOH → Na₂SO₃ + H₂O (oxide acid + bazơ).',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Điều chế',
            content: 'Đốt cháy đơn chất: 2Mg + O₂ → 2MgO; C + O₂ → CO₂.\nNhiệt phân: CaCO₃ → CaO + CO₂; Cu(OH)₂ → CuO + H₂O.',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'warningBox',
        content: {
            title: 'Ứng dụng nhanh',
            content: 'CaO: sản xuất vôi.\nCO₂: chữa cháy, nước giải khát.\nAl₂O₃: luyện nhôm; Fe₂O₃/Fe₃O₄: quặng sắt.',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Mini quiz đọc nhanh',
            content: 'Oxide lưỡng tính là gì? Ví dụ?\nPhản ứng CaO + H₂O cho sản phẩm nào?\nGọi tên Fe₂O₃?\nTự trả lời trước khi làm test.',
            color: 'blue',
            listType: 'number'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Oxide là hợp chất của:',
      options: ['Hai kim loại', 'Một phi kim và hydro', 'Hai nguyên tố, có oxygen', 'Chỉ oxygen'],
      correctAnswer: 2
    },
    {
      type: 'multiple-choice',
      question: 'Oxide acid thường phản ứng với:',
      options: ['Kim loại', 'Oxide bazơ hoặc bazơ', 'Khí trơ', 'Muối trung tính'],
      correctAnswer: 1
    },
    {
      type: 'multiple-choice',
      question: 'Oxide bazơ tan (kiềm) gồm:',
      options: ['Na₂O, K₂O', 'CO₂, SO₂', 'P₂O₅', 'SiO₂'],
      correctAnswer: 0
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng CaO + H₂O → Ca(OH)₂ minh họa tính chất:',
      options: ['Oxide acid + nước', 'Oxide bazơ + nước tạo bazơ', 'Oxide lưỡng tính + nước', 'Không phản ứng'],
      correctAnswer: 1
    },
    {
      type: 'multiple-choice',
      question: 'SO₂ + 2NaOH → Na₂SO₃ + H₂O thuộc loại:',
      options: ['Oxide bazơ + bazơ', 'Oxide acid + bazơ', 'Oxide bazơ + acid', 'Oxide acid + muối'],
      correctAnswer: 1
    },
    {
      type: 'multiple-choice',
      question: 'Điều chế CaO trong công nghiệp thường bằng:',
      options: ['Đốt Mg trong O₂', 'Nhiệt phân đá vôi CaCO₃', 'Điện phân nước', 'Đốt H₂ trong O₂'],
      correctAnswer: 1
    },
    {
      type: 'multiple-choice',
      question: 'Oxide lưỡng tính có thể phản ứng với cả acid và bazơ. Ví dụ:',
      options: ['Al₂O₃', 'Na₂O', 'SO₂', 'CO₂'],
      correctAnswer: 0
    },
    {
      type: 'multiple-choice',
      question: 'Chất nào là oxide bazơ?',
      options: ['CO₂', 'SO₂', 'CuO', 'P₂O₅'],
      correctAnswer: 2
    },
    {
      type: 'multiple-choice',
      question: 'CO₂ + Ca(OH)₂ → CaCO₃ + H₂O là phản ứng giữa:',
      options: ['Oxide bazơ và nước', 'Oxide acid và bazơ', 'Oxide acid và acid', 'Oxide bazơ và bazơ'],
      correctAnswer: 1
    },
    {
      type: 'multiple-choice',
      question: 'Tên gọi Fe₂O₃ là:',
      options: ['Sắt oxide', 'Sắt(II) oxide', 'Sắt(III) oxide', 'Sắt(I) oxide'],
      correctAnswer: 2
    }
  ]
};
