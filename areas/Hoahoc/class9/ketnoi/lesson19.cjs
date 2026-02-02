module.exports = {
  classId: 9,
  curriculumType: 'ketnoi',
  chapterId: 6,
  chapterName: 'Chương 6: Kim loại. Sự khác nhau cơ bản giữa phi kim và kim loại',
  lessonId: 19,
  title: 'Bài 19: Dãy hoạt động hóa học',
  description: 'Ôn thứ tự hoạt động kim loại và vận dụng dự đoán phản ứng.',
  level: 'Intermediate',
  order: 2,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: '📈 Dãy hoạt động hoá học của kim loại',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Mục tiêu: nhớ thứ tự hoạt động, quy tắc dự đoán phản ứng với nước, axit, muối và vận dụng thay thế.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Thứ tự dãy giảm dần',
            content: 'K - Na - Ca - Mg - Al - Zn - Fe - Ni - Sn - Pb - (H) - Cu - Ag - Au.\nKim loại càng đứng trái càng dễ nhường electron → hoạt động mạnh.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'warningBox',
        content: {
            title: 'Quy tắc phản ứng',
            content: 'Đẩy kim loại yếu hơn khỏi muối: Fe + CuSO₄ → FeSO₄ + Cu.\nĐứng trước H → đẩy H₂ khỏi axit loãng: Zn + 2HCl → ZnCl₂ + H₂.\nPhản ứng với nước lạnh: K, Na, Ca; với hơi nước nóng: Mg, Zn, Fe.',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Ứng dụng dự đoán',
            content: 'Chọn kim loại thu từ dung dịch muối: dùng kim loại đứng trước.\nChọn axit để giải phóng H₂: dùng axit loãng với kim loại đứng trước H.\nNhận biết kim loại yếu (Cu, Ag, Au) không phản ứng HCl loãng.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Bảng tóm tắt nhanh',
            content: 'Dãy hoạt động xếp theo độ dễ oxi hoá (nhường e).\nĐứng trước H: phản ứng axit loãng giải phóng H₂; sau H thì không.\nĐứng trước kim loại khác → có thể đẩy khỏi dung dịch muối của nó.',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: '',
            content: '**Gợi ý hình**:\nBiểu đồ dãy hoạt động và vùng phản ứng với nước/axit: */images/hoahoc9/lesson19-series.png*\nThí nghiệm Fe + CuSO₄ (đổi màu, xuất hiện Cu): */images/hoahoc9/lesson19-displacement.png*',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-8',
        type: 'warningBox',
        content: {
            title: 'Mini quiz đọc nhanh',
            content: 'Kim loại nào đầu tiên không đẩy được H₂ khỏi axit loãng?\nViết PTHH Mg tác dụng với hơi nước.\nChọn kim loại phù hợp để thu Cu từ CuSO₄, vì sao?\nTự thử sức rồi làm bộ trắc nghiệm.',
            color: 'orange',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Kim loại nào đứng ngay sau Al trong dãy hoạt động?',
      options: ['Mg', 'Zn', 'Fe', 'Ca'],
      correctAnswer: 1,
      explanation: 'Thứ tự ... Al - Zn - Fe ...'
    },
    {
      type: 'true-false',
      question: 'Cu có thể đẩy Fe khỏi dung dịch FeSO4.',
      correctAnswer: false,
      explanation: 'Cu hoạt động yếu hơn Fe, không thể đẩy Fe khỏi muối.'
    },
    {
      type: 'multiple-choice',
      question: 'Kim loại nào phản ứng mạnh nhất với nước lạnh?',
      options: ['Fe', 'Na', 'Zn', 'Cu'],
      correctAnswer: 1,
      explanation: 'K, Na, Ca phản ứng mạnh với nước lạnh.'
    },
    {
      type: 'fill-in-blank',
      question: 'Phương trình: Zn + 2HCl → ZnCl2 + ___',
      correctAnswer: 'H2',
      explanation: 'Sinh ra H2.'
    },
    {
      type: 'multiple-choice',
      question: 'Để thu Cu từ dung dịch CuSO4, nên dùng kim loại nào?',
      options: ['Ag', 'Au', 'Fe', 'Hg'],
      correctAnswer: 2,
      explanation: 'Fe đứng trước Cu nên đẩy được Cu ra khỏi muối.'
    },
    {
      type: 'true-false',
      question: 'Ag không đẩy được H2 khỏi axit HCl loãng.',
      correctAnswer: true,
      explanation: 'Ag đứng sau H trong dãy nên không phản ứng với HCl loãng.'
    },
    {
      type: 'multiple-choice',
      question: 'Cặp kim loại nào có thể phản ứng với H2SO4 loãng giải phóng H2?',
      options: ['Cu, Ag', 'Au, Pt', 'Mg, Zn', 'Hg, Cu'],
      correctAnswer: 2,
      explanation: 'Mg, Zn đứng trước H nên đẩy được H2 khỏi axit loãng.'
    },
    {
      type: 'fill-in-blank',
      question: 'Fe + CuSO4 → FeSO4 + ___',
      correctAnswer: 'Cu',
      explanation: 'Fe thay Cu trong muối CuSO4.'
    },
    {
      type: 'multiple-choice',
      question: 'Kim loại nào không bị H2O ở nhiệt độ thường tác động?',
      options: ['Na', 'K', 'Ca', 'Al'],
      correctAnswer: 3,
      explanation: 'Al không phản ứng với nước lạnh do có màng oxit bảo vệ.'
    },
    {
      type: 'multiple-choice',
      question: 'Mục đích của dãy hoạt động kim loại là gì?',
      options: ['Xếp kim loại theo độ bền', 'Xếp theo độ hôi độc', 'Dự đoán phản ứng thay thế và với axit', 'Xác định màu sắc kim loại'],
      correctAnswer: 2,
      explanation: 'Dãy hoạt động giúp dự đoán phản ứng thay thế và tác dụng với axit/nước.'
    }
  ]
};
