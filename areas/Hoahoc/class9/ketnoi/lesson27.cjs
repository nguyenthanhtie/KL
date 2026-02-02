module.exports = {
  classId: 9,
  curriculumType: 'ketnoi',
  chapterId: 8,
  chapterName: 'Chương 8: Ethylic alcohol và Acetic acid',
  lessonId: 27,
  title: 'Bài 27: Axit axetic (axit etanoic)',
  description: 'Tính chất, điều chế và ứng dụng của CH3COOH.',
  level: 'Intermediate',
  order: 10,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: '🥤 Axit axetic (CH₃COOH)',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Mục tiêu: nhận biết tính chất vật lí/hoá học, cách điều chế và ứng dụng an toàn của axit axetic.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Vật lí & nhận dạng',
            content: 'Lỏng không màu, mùi giấm; Tnc 16,6°C → đông đặc nhẹ trong tủ lạnh.\nTan vô hạn trong nước; có tính hút ẩm nhẹ.\nGiấm ăn ~2-6% CH₃COOH; băng giấm ≥ 98%.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'warningBox',
        content: {
            title: 'Tính axit yếu',
            content: 'Làm quỳ tím → đỏ, pKa ≈ 4,76.\nPhản ứng kim loại hoạt động: 2CH₃COOH + Zn → (CH₃COO)₂Zn + H₂↑.\nPhản ứng bazơ/oxit bazơ/muối carbonat: tạo muối acetat + nước (+ CO₂ nếu có CO₃²⁻).',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Phản ứng đặc trưng',
            content: '**Este hoá:** CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O (H₂SO₄ đặc, t°).\n**Trùng ngưng tạo anhydride:** 2CH₃COOH ⇌ (CH₃CO)₂O + H₂O (công nghiệp).\n**Oxi hoá khử:** bị oxi hoá sâu → CO₂ + H₂O.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Điều chế',
            content: '**Lên men giấm:** C₂H₅OH + O₂ (vi khuẩn Acetobacter) → CH₃COOH + H₂O.\n**Công nghiệp:** oxi hoá butan/etanol; hoặc carbonyl hoá metanol (Monsanto/Cativa).\nTinh chế bằng chưng cất phân đoạn.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Bảng tóm tắt nhanh',
            content: 'Axit yếu, tạo muối acetat, este hoá dễ.\nNguồn chủ yếu: lên men giấm; sản xuất lớn: carbonyl hoá metanol.\nỨng dụng: giấm ăn, chất tẩy cặn CaCO₃, nguyên liệu vinyl acetat polymer.',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-8',
        type: 'infoBox',
        content: {
            title: '',
            content: '**Gợi ý hình**:\nSơ đồ lên men giấm từ ethanol: */images/hoahoc9/lesson27-vinegar.png*\nPhản ứng este hoá etyl acetat: */images/hoahoc9/lesson27-ester.png*',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-9',
        type: 'warningBox',
        content: {
            title: 'Mini quiz đọc nhanh',
            content: 'Vì sao axit axetic là axit yếu nhưng vẫn ăn mòn kim loại kẽm?\nViết PTHH làm sạch cặn CaCO₃ bằng giấm.\nGiải thích vì sao giấm ăn cần đóng kín và bảo quản mát.\nTự trả lời trước khi vào bộ câu hỏi trắc nghiệm.',
            color: 'orange',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'CTPT của axit etanoic:',
      options: ['C2H4O2', 'C2H6O', 'CH2O', 'C3H6O2'],
      correctAnswer: 0,
      explanation: 'Axit etanoic có CTPT C2H4O2, viết gọn CH3COOH.'
    },
    {
      type: 'true-false',
      question: 'Axit etanoic là axit mạnh.',
      correctAnswer: false,
      explanation: 'Đây là axit yếu (pKa ~4,76).' 
    },
    {
      type: 'multiple-choice',
      question: 'Sản phẩm chính khi CH3COOH tác dụng Na2CO3 là:',
      options: ['NaOAc + CO2 + H2O', 'NaCl', 'NaOH', 'CH4'],
      correctAnswer: 0,
      explanation: '2CH3COOH + Na2CO3 → 2CH3COONa + CO2 + H2O.'
    },
    {
      type: 'fill-in-blank',
      question: 'Phản ứng este hoá: CH3COOH + C2H5OH ⇌ ___ + H2O',
      correctAnswer: 'CH3COOC2H5',
      explanation: 'Tạo etyl axetat.'
    },
    {
      type: 'multiple-choice',
      question: 'Vi khuẩn nào tham gia tạo giấm từ ethanol?',
      options: ['Lactic', 'Acetic', 'Butyric', 'Methanogenic'],
      correctAnswer: 1,
      explanation: 'Vi khuẩn Acetobacter oxi hoá ethanol thành CH3COOH.'
    },
    {
      type: 'multiple-choice',
      question: 'Axit axetic làm đổi màu quỳ tím sang:',
      options: ['Xanh', 'Đỏ', 'Vàng', 'Tím đậm'],
      correctAnswer: 1,
      explanation: 'Dung dịch axit axetic có tính axit, làm quỳ tím → đỏ.'
    },
    {
      type: 'true-false',
      question: 'CH3COOH pha loãng vẫn có mùi giấm đặc trưng.',
      correctAnswer: true,
      explanation: 'Mùi đặc trưng vẫn còn dù ở dung dịch loãng.'
    },
    {
      type: 'fill-in-blank',
      question: '2CH3COOH + Zn → (CH3COO)2Zn + ___',
      correctAnswer: 'H2',
      explanation: 'Axit tác dụng kim loại giải phóng H2.'
    },
    {
      type: 'multiple-choice',
      question: 'Sản phẩm khi axit axetic tác dụng với NaOH:',
      options: ['Na2CO3', 'CH3COONa + H2O', 'NaCl', 'CH4'],
      correctAnswer: 1,
      explanation: 'Axit + bazơ → muối và nước.'
    },
    {
      type: 'multiple-choice',
      question: 'Ứng dụng nào thường gặp của axit axetic?',
      options: ['Chất nổ', 'Gia vị (giấm)', 'Kim loại bảo vệ', 'Làm ngọt đường mía'],
      correctAnswer: 1,
      explanation: 'Axit axetic dùng làm gia vị và nguyên liệu hoá chất.'
    }
  ]
};
