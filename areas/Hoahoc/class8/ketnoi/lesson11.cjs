module.exports = {
  classId: 8,
  curriculumType: 'ketnoi',
  chapterId: 3,
  chapterName: "Chương 3: Một số hợp chất thông dụng",
  lessonId: 11,
  order: 11,
  title: 'Bài 11: Muối',
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: '🧂 Bài 11: Muối',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Mục tiêu: phân biệt muối trung hòa/acid, tính tan, phản ứng trao đổi và ứng dụng.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Khái niệm & phân loại',
            content: 'Muối: hợp chất ion giữa cation kim loại/NH₄⁺ và anion gốc acid.\nMuối trung hòa: NaCl, K₂SO₄.\nMuối acid: NaHCO₃, KH₂PO₄ (còn H chưa thay thế hết).',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'warningBox',
        content: {
            title: 'Tính chất chính',
            content: 'Nhiều muối tan; một số không tan (AgCl, BaSO₄).\nVới acid/bazơ: tạo muối mới + acid/bazơ mới nếu có kết tủa/khí/điện li yếu.\nPhản ứng trao đổi ion cần điều kiện: kết tủa/khí/điện li yếu sinh ra.',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Ví dụ phương trình',
            content: 'NaCl + AgNO₃ → AgCl↓ + NaNO₃ (kết tủa trắng).\nCaCO₃ + 2HCl → CaCl₂ + CO₂↑ + H₂O (sủi bọt CO₂).\nNaHCO₃ + HCl → NaCl + CO₂↑ + H₂O.\nNaOH + CuSO₄ → Cu(OH)₂↓ + Na₂SO₄ (kết tủa lam).',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Ứng dụng nhanh',
            content: 'NaCl: gia vị, điện phân nước muối.\nCaCO₃: vật liệu xây dựng.\nKNO₃, NH₄NO₃: phân bón.\nCuSO₄: nông nghiệp (boóc-đô).',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Mini quiz đọc nhanh',
            content: 'Điều kiện nào làm phản ứng trao đổi xảy ra?\nHiện tượng khi Na₂CO₃ gặp HCl?\nMuối acid khác gì muối trung hòa?\nTự trả lời trước khi làm test.',
            color: 'blue',
            listType: 'number'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Muối là hợp chất giữa:',
      options: ['Kim loại và oxygen', 'Cation kim loại/NH₄⁺ và anion gốc acid', 'Phi kim và hydrogen', 'Chỉ có oxygen'],
      correctAnswer: 1
    },
    {
      type: 'multiple-choice',
      question: 'Khi cho NaCl vào dung dịch AgNO₃, hiện tượng:',
      options: ['Không đổi', 'Xuất hiện kết tủa trắng AgCl', 'Tỏa khí H₂', 'Tỏa mùi khai'],
      correctAnswer: 1
    },
    {
      type: 'multiple-choice',
      question: 'Muối nào sau đây không tan trong nước?',
      options: ['NaCl', 'KNO₃', 'AgCl', 'CuSO₄'],
      correctAnswer: 2
    },
    {
      type: 'multiple-choice',
      question: 'Muối acid đặc trưng bởi:',
      options: ['Chỉ có kim loại', 'Chứa gốc acid còn H chưa thay thế hết', 'Chứa gốc bazơ', 'Không chứa ion'],
      correctAnswer: 1
    },
    {
      type: 'multiple-choice',
      question: 'Điều kiện xảy ra phản ứng trao đổi giữa hai dung dịch muối/acid/bazơ là:',
      options: ['Luôn xảy ra', 'Có tạo kết tủa/khí/điện li yếu', 'Chỉ cần khuấy', 'Chỉ khi đun nóng'],
      correctAnswer: 1
    },
    {
      type: 'multiple-choice',
      question: 'Muối acid khác muối trung hòa ở chỗ:',
      options: ['Chứa gốc acid còn H chưa thay thế hết', 'Không chứa ion', 'Không có kim loại', 'Luôn không tan'],
      correctAnswer: 0
    },
    {
      type: 'multiple-choice',
      question: 'Hiện tượng khi cho Na₂CO₃ vào HCl loãng:',
      options: ['Không đổi', 'Sủi bọt CO₂', 'Kết tủa đỏ', 'Tỏa mùi khai'],
      correctAnswer: 1
    },
    {
      type: 'multiple-choice',
      question: 'Muối nào sau đây tan tốt trong nước?',
      options: ['BaSO₄', 'AgCl', 'KNO₃', 'PbSO₄'],
      correctAnswer: 2
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng tạo kết tủa xanh lam khi:',
      options: ['NaCl + AgNO₃', 'NaOH + CuSO₄', 'HCl + NaOH', 'KNO₃ + NaCl'],
      correctAnswer: 1
    },
    {
      type: 'multiple-choice',
      question: 'Khi viết tên muối, thứ tự là:',
      options: ['Gốc acid trước, kim loại sau', 'Kim loại (hoặc NH₄⁺) trước, gốc acid sau', 'Tên bất kỳ', 'Ion âm trước'],
      correctAnswer: 1
    }
  ]
};
