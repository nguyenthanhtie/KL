module.exports = {
  classId: 12,
  curriculumType: 'ketnoi',
  chapterId: 7,
  chapterName: 'Chương 7: Kim loại nhóm IA và IIA',
  lessonId: 26,
  title: 'Bài 26: Ôn tập chương 7',
  description: 'So sánh kim loại kiềm và kiềm thổ, nhận biết và bài tập áp dụng.',
  level: 'Intermediate',
  order: 26,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Ôn tập kim loại nhóm IA, IIA',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'So sánh tính chất, nhận biết ion và luyện tập phản ứng đặc trưng của kim loại kiềm và kiềm thổ.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'So sánh tính chất',
            content: 'IA có 1e (ns1) khử mạnh hơn IIA (ns2).\nHiđroxit: IA kiềm mạnh, tan; IIA bazơ mạnh nhưng Mg(OH)2 ít tan.\nPhản ứng với nước: IA (mạnh) > Ca,Sr,Ba > Mg (nóng).',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'warningBox',
        content: {
            title: 'Nhận biết ion',
            content: 'Màu ngọn lửa: Li đỏ, Na vàng, K tím; Ca đỏ gạch, Sr đỏ, Ba xanh lục.\nKết tủa: BaSO4 trắng không tan; CaCO3 trắng ít tan; Mg(OH)2 trắng keo.\nĐộ tan cacbonat: IA bền nhiệt; IIA dễ nhiệt phân.',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Ứng dụng & bài tập',
            content: 'Chu trình vôi-soda: CaCO3 → CaO → Ca(OH)2; Na2CO3 từ Solvay.\nĐịnh tính nước cứng, làm mềm bằng Na2CO3, trao đổi ion.\nViết phương trình với nước, axit, nhiệt phân muối, nhận biết mẫu.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Bảng nhớ',
            content: 'Màu ngọn lửa: Li đỏ, Na vàng, K tím; Ca đỏ gạch, Sr đỏ, Ba xanh lục.\nĐộ tan hiđroxit: IA đều tan; IIA tăng Mg → Ba.\nCacbonat: IA bền nhiệt; IIA phân huỷ tạo oxit + CO2.',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Case & bẫy',
            content: 'Mg không phản ứng nước lạnh; đừng quên lớp oxit bảo vệ.\nBaSO4 không tan cả trong axit loãng, khác với CaCO3 tan trong HCl.\nChọn chất làm mềm: tạm thời (đun sôi), vĩnh cửu (Na2CO3/trao đổi ion).',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-8',
        type: 'infoBox',
        content: {
            title: 'Ôn bài tập',
            content: 'Viết chuỗi phản ứng nhận biết mẫu hỗn hợp muối IA/IIA bằng ngọn lửa + kết tủa.\nTính khối lượng kết tủa khi thêm Na2CO3/NaOH vào dung dịch Ca2+, Ba2+.\nSo sánh tốc độ phản ứng với nước của K, Na, Ca; giải thích bằng thế điện cực và năng lượng hoá hơi.',
            color: 'gray',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Nhóm nào có tính khử mạnh hơn?',
      options: ['IA', 'IIA', 'Như nhau', 'Phụ thuộc pH'],
      correctAnswer: 0,
      explanation: 'IA có 1e, ion hoá thấp hơn → khử mạnh hơn.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'BaSO4 kết tủa trắng không tan trong axit loãng.',
      correctAnswer: true,
      explanation: 'BaSO4 rất ít tan, hầu như không tan trong axit loãng.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Cacbonat nhóm IIA khi nung sẽ:',
      options: ['Không đổi', 'Chuyển thành oxit và CO2', 'Tạo peoxit', 'Tạo muối hidro'],
      correctAnswer: 1,
      explanation: 'MCO3 → MO + CO2 (nhiệt).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Màu ngọn lửa tím đặc trưng cho:',
      options: ['Na+', 'K+', 'Ca2+', 'Ba2+'],
      correctAnswer: 1,
      explanation: 'K+ cho màu tím.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Ca(OH)2 tan nhiều hơn Mg(OH)2.',
      correctAnswer: true,
      explanation: 'Độ tan tăng từ Mg(OH)2 → Ba(OH)2.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng nào dùng phát hiện Ca2+?',
      options: ['Na2CO3 tạo kết tủa', 'Thêm HCl khan', 'Thêm NaCl', 'Thêm KI'],
      correctAnswer: 0,
      explanation: 'CaCO3 trắng xuất hiện với CO3^2-.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Phản ứng Solvay chính: NH4HCO3 + NaCl → NaHCO3 + ______.',
      correctAnswer: 'NH4Cl',
      explanation: 'Sản phẩm còn lại là NH4Cl.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Kim loại nào phản ứng mạnh nhất với nước?',
      options: ['K', 'Ba', 'Na', 'Li'],
      correctAnswer: 0,
      explanation: 'K thuộc IA, hoạt động rất mạnh, mãnh liệt với nước.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Tại sao Mg không phản ứng với nước lạnh?',
      options: ['Không tan', 'Do lớp oxit mỏng bền và năng lượng hoạt hoá cao', 'Không có O2', 'Mg là kim loại quý'],
      correctAnswer: 1,
      explanation: 'Lớp oxit bảo vệ và phản ứng cần năng lượng cao.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Na2CO3 bền nhiệt hơn CaCO3.',
      correctAnswer: true,
      explanation: 'Cacbonat IA bền nhiệt, không phân huỷ ở nhiệt độ lò thường.',
      points: 10
    }
  ]
};
