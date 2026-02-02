module.exports = {
  classId: 11,
  curriculumType: 'ketnoi',
  chapterId: 4,
  chapterName: 'Chương 4: Hydrocarbon',
  lessonId: 16,
  title: 'Bài 16: Hydrocarbon không no',
  description: 'Anken, ankin: cấu tạo, phản ứng cộng, trùng hợp, ứng dụng.',
  level: 'Intermediate',
  order: 16,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Hiđrocacbon không no',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Tập trung vào liên kết π hoạt động, quy tắc cộng Markovnikov và các phản ứng đặc trưng.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Anken (CnH2n)',
            content: 'C lai hoá sp2, phẳng; có đồng phân hình học (cis/trans hoặc E/Z) nếu mỗi C nối đôi gắn 2 nhóm khác nhau.\nPhản ứng cộng: H2 (Ni), halogen (Br2 mất màu), HX theo Markovnikov (trừ khi có peroxit với HBr → phản Markovnikov).\nTrùng hợp: nCH2=CH2 → (-CH2-CH2-)n (PE); CH2=CHCl → PVC.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'warningBox',
        content: {
            title: 'Ankin (CnH2n-2)',
            content: 'C lai hoá sp, tuyến tính; nối ba gồm 1 liên kết σ và 2 π.\nPhản ứng cộng từng bước (2 mol Br2 tạo tetrabrom); cộng H2 (Pd/PbCO3) cho anken cis (Lindlar) hoặc alkane (Ni).\nAnkin đầu mạch (-C≡CH) có H linh động → phản ứng tráng bạc/Fehling tạo muối bạc đồng.',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Điều chế',
            content: 'Anken: cracking ankan; tách nước ancol (H2SO4, 170-180°C); tách HX từ halogenoalkan (KOH/etanol).\nAnkin: tách 2HX từ dihalogen ankan; cacbua kim loại + nước (CaC2 + 2H2O → C2H2 + Ca(OH)2).',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Ứng dụng',
            content: 'Eten, propen: nguyên liệu polyme (PE, PP), ancol (etanol từ ete hoá, oxy hoá).\nAxetilen: hàn cắt O2-C2H2; tổng hợp vinyl clorua, axit acrylic.',
            color: 'purple',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Đặc điểm nhận biết anken với dung dịch Br2/CCl4 là:',
      options: ['Xuất hiện kết tủa', 'Dung dịch mất màu nâu đỏ', 'Toả khí', 'Đổi màu xanh'],
      correctAnswer: 1,
      explanation: 'Anken cộng Br2 làm dung dịch brom mất màu.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng cộng HBr theo phản Markovnikov xảy ra khi có:',
      options: ['Nhiệt độ cao', 'Xúc tác Ni', 'Peroxit (ROOR)', 'Áp suất cao'],
      correctAnswer: 2,
      explanation: 'Hiệu ứng peroxit dẫn tới cơ chế gốc tự do, cho sản phẩm phản Markovnikov.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Ankin đầu mạch có phản ứng tráng bạc.',
      correctAnswer: true,
      explanation: '-C≡CH tạo muối bạc acetylua với [Ag(NH3)2]+.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Tách nước etanol (H2SO4, 180°C) cho sản phẩm chính:',
      options: ['Etan', 'Eten', 'Etyl sunfat', 'Đimetyl ete'],
      correctAnswer: 1,
      explanation: '180°C ưu tiên tách nội phân tử tạo anken.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Hydro hoá axetilen với xúc tác Lindlar cho:',
      options: ['Etan', 'Eten (cis)', 'Vinyl clorua', 'Benzen'],
      correctAnswer: 1,
      explanation: 'Lindlar (Pd/PbCO3) dừng ở anken cis (eten).',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Trùng hợp etilen tạo polietilen theo cơ chế mở vòng.',
      correctAnswer: false,
      explanation: 'Trùng hợp gốc tự do/cation/anione mở liên kết π, không phải mở vòng.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng tạo axetilen trong phòng thí nghiệm dùng:',
      options: ['Cracking butan', 'CaC2 + H2O', 'H2 + C', 'Đốt CH4 thiếu O2'],
      correctAnswer: 1,
      explanation: 'CaC2 + 2H2O → C2H2 + Ca(OH)2.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Đồng phân hình học cần điều kiện:',
      options: ['Nối đơn', 'Nối đôi và mỗi C nối đôi gắn hai nhóm khác nhau', 'Mạch thẳng', 'Có nhóm -OH'],
      correctAnswer: 1,
      explanation: 'Nối đôi cố định, hai nhóm trên mỗi C phải khác nhau.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Anken có thể bị oxi hoá mềm thành điol vicinal bằng KMnO4 loãng, lạnh.',
      correctAnswer: true,
      explanation: 'Phản ứng hydroxyl hoá tạo cis-diols.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Phản ứng tách 2HX từ 1,2-dibrometan (alc KOH) tạo ______',
      correctAnswer: 'C2H2',
      explanation: 'Dihalogen ankan tách hai HX tạo ankin (axetilen).',
      points: 10
    }
  ]
};
