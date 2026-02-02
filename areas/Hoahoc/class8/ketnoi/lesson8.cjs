module.exports = {
  classId: 8,
  curriculumType: 'ketnoi',
  chapterId: 3,
  chapterName: "Chương 3: Một số hợp chất thông dụng",
  lessonId: 8,
  order: 8,
  title: 'Bài 8: Acid',
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: '🌋 Bài 8: Acid',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Mục tiêu: hiểu acid, tính chất, phản ứng đặc trưng và an toàn pha loãng.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Khái niệm',
            content: 'Acid phân li ra H⁺ trong nước.\nCông thức thường bắt đầu bằng H (HCl, H₂SO₄...).',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'warningBox',
        content: {
            title: 'Tính chất chính',
            content: 'Vị chua (không nếm!), quỳ tím → đỏ.\nVới kim loại trước H: tạo muối + H₂.\nVới bazơ/oxide bazơ: muối + nước (trung hòa).',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Phương trình tiêu biểu',
            content: 'Zn + 2HCl → ZnCl₂ + H₂↑ (kim loại + acid loãng).\n2HCl + CuO → CuCl₂ + H₂O (acid + oxide bazơ).\nH₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O (trung hòa).',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'An toàn & pha loãng',
            content: 'Luôn rót **axit vào nước**, khuấy nhẹ.\nĐeo kính, găng; tránh hít hơi.\nTrung hòa tràn đổ nhẹ bằng NaHCO₃.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Ứng dụng nhanh',
            content: 'HCl: sản xuất muối, tẩy gỉ.\nH₂SO₄: ắc quy, phân bón.\nHNO₃: phân bón, thuốc nổ.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-8',
        type: 'infoBox',
        content: {
            title: 'Mini quiz đọc nhanh',
            content: 'Ion đặc trưng của acid là gì?\nKhi pha loãng H₂SO₄ đặc, rót theo chiều nào?\nHiện tượng khi CaCO₃ gặp HCl loãng?\nTự trả lời trước khi làm test 10 câu.',
            color: 'blue',
            listType: 'number'
        }
    }
  ],
  game: [
    {
      question: 'Acid làm quỳ tím:',
      options: ['Xanh', 'Đỏ', 'Vàng', 'Không đổi'],
      correctAnswer: 1
    },
    {
      question: 'Phản ứng nào tạo H₂?',
      options: ['NaOH + HCl', 'Zn + HCl', 'CuO + H₂SO₄', 'Na₂O + H₂O'],
      correctAnswer: 1
    },
    {
      question: 'Acid phản ứng với bazơ tạo:',
      options: ['Kim loại', 'Oxide', 'Muối và nước', 'Khí trơ'],
      correctAnswer: 2
    },
    {
      question: 'Công thức đúng của acid sulfuric:',
      options: ['H₂SO₄', 'H₂SO₃', 'H₂S', 'HSO₄'],
      correctAnswer: 0
    },
    {
      question: 'Ion đặc trưng của dung dịch acid là:',
      options: ['OH⁻', 'H⁺', 'Na⁺', 'Cl⁻'],
      correctAnswer: 1
    },
    {
      question: 'Hiện tượng khi cho CaCO₃ vào HCl loãng là:',
      options: ['Không đổi', 'Sủi bọt khí CO₂', 'Tạo kết tủa trắng', 'Đổi màu tím'],
      correctAnswer: 1
    },
    {
      question: 'Sản phẩm trung hòa giữa H₂SO₄ và 2NaOH là:',
      options: ['NaHSO₄', 'Na₂SO₄ + 2H₂O', 'Na₂S + H₂O', 'NaOHSO₄'],
      correctAnswer: 1
    },
    {
      question: 'Axit tác dụng với oxide bazơ tạo:',
      options: ['Kim loại', 'Muối + nước', 'Khí CO₂', 'Chỉ nước'],
      correctAnswer: 1
    },
    {
      question: 'Khi pha loãng H₂SO₄ đặc cần:',
      options: ['Đổ nước vào axit', 'Đổ axit vào nước từ từ, khuấy đều', 'Đun nóng trước', 'Không cần lưu ý'],
      correctAnswer: 1
    },
    {
      question: 'Ứng dụng đúng của H₂SO₄ là:',
      options: ['Nước giải khát', 'Ắc quy chì và phân bón', 'Gia vị', 'Thuốc tím'],
      correctAnswer: 1
    }
  ]
};
