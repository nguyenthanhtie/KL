module.exports = {
  classId: 12,
  curriculumType: 'ketnoi',
  chapterId: 7,
  chapterName: 'Chương 7: Kim loại nhóm IA và IIA',
  lessonId: 25,
  title: 'Bài 25: Kim loại nhóm IIA',
  description: 'Tính chất, phản ứng đặc trưng, hợp chất của kim loại kiềm thổ.',
  level: 'Intermediate',
  order: 25,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Kim loại nhóm IIA',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Phân tích tính khử, phản ứng với nước/axit, hợp chất và ứng dụng thực tế của kim loại kiềm thổ.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Tính chất & phản ứng',
            content: '2e hoá trị (ns2) → tính khử mạnh, nhưng kém IA.\nPhản ứng với nước tăng Mg (nóng) < Ca < Sr < Ba.\nDễ bị oxi hoá tạo oxit/hidroxit; Ca, Ba cần bảo quản dầu.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'warningBox',
        content: {
            title: 'Hợp chất quan trọng',
            content: 'Oxit, hiđroxit bazơ mạnh: Ca(OH)2, Ba(OH)2 tan; Mg(OH)2 ít tan.\nMuối cacbonat/nhiệt phân: MCO3 → MO + CO2 (nhiệt).\nMuối sunfat: CaSO4 ít tan, BaSO4 hầu như không tan (cản quang).',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Ứng dụng & nhận biết',
            content: 'CaCO3 (đá vôi, xi măng), CaSO4·2H2O (thạch cao), CaO (vôi sống).\nMg hợp kim nhẹ, pháo sáng (ánh sáng trắng), thuốc kháng axit Mg(OH)2.\nBaSO4 cản quang; màu ngọn lửa: Ca đỏ gạch, Sr đỏ, Ba xanh lục.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'So sánh nhanh',
            content: 'Hoạt động: Mg < Ca < Sr < Ba (tăng dần); màu ngọn lửa đỏ gạch → xanh lục.\nĐộ tan: MOH tăng dần; MCO3 kém bền nhiệt từ MgCO3 → BaCO3.\nPhản ứng với nước: Mg (nóng, chậm), Ca/Sr/Ba mạnh hơn.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Case & ứng dụng',
            content: 'Nước cứng tạm thời (HCO3-): đun sôi kết tủa CaCO3; lâu bền (SO4/Cl) cần Na2CO3 hay trao đổi ion.\nXi măng: Ca3SiO5, Ca2SiO4 thuỷ hoá tạo gel C-S-H bền.\nBaSO4 chụp X-quang: không tan nên an toàn; Ba2+ tự do lại độc → bẫy đề.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-8',
        type: 'infoBox',
        content: {
            title: 'Ôn bài tập',
            content: 'Viết PTHH: nhiệt phân MCO3, phản ứng với nước/axit, nhận biết Ca2+, Ba2+ bằng SO4 2-.\nTính khối lượng vôi sống/vôi tôi cần cho xử lí nước; cân bằng CaO + CO2 + H2O → CaCO3.\nBài nhận biết: màu ngọn lửa, kết tủa trắng (BaSO4 bền, CaCO3 tan trong axit loãng).',
            color: 'gray',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Tính khử tăng theo dãy:',
      options: ['Mg < Ca < Sr < Ba', 'Ba < Sr < Ca < Mg', 'Ca < Ba < Sr < Mg', 'Mg < Sr < Ba < Ca'],
      correctAnswer: 0,
      explanation: 'Bán kính tăng từ Mg → Ba, e nhường dễ hơn.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Mg phản ứng với nước lạnh nhanh như Ca.',
      correctAnswer: false,
      explanation: 'Mg gần như không phản ứng với nước lạnh, phản ứng chậm khi đun nóng.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Muối nào ít tan và dùng làm thạch cao Paris?',
      options: ['CaSO4·2H2O', 'BaSO4', 'MgSO4', 'CaCO3'],
      correctAnswer: 0,
      explanation: 'Thạch cao nung nhẹ CaSO4·2H2O → CaSO4·0.5H2O dùng đúc khuôn.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Nhiệt phân CaCO3 cho sản phẩm:',
      options: ['Ca + CO2', 'CaO + CO2', 'Ca(OH)2 + CO2', 'CaO + CO'],
      correctAnswer: 1,
      explanation: 'CaCO3 → CaO + CO2 ở nhiệt độ cao.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'BaSO4 gần như không tan và an toàn cho chụp X-quang tiêu hoá.',
      correctAnswer: true,
      explanation: 'BaSO4 không tan nên không hấp thu vào máu.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Dung dịch nào làm mềm nước cứng tạm thời?',
      options: ['Sôi nước', 'Thêm Ca(OH)2 dư', 'Thêm Na2CO3', 'Cả 3 cách'],
      correctAnswer: 3,
      explanation: 'Đun sôi kết tủa CaCO3; kiềm hoá hoặc trao đổi ion cũng loại Ca2+.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Phản ứng tạo sữa vôi: CaO + H2O → ______.',
      correctAnswer: 'Ca(OH)2',
      explanation: 'Ca(OH)2 tạo dung dịch sữa vôi.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Màu ngọn lửa của Ba2+ là:',
      options: ['Đỏ', 'Tím', 'Vàng', 'Xanh lục'],
      correctAnswer: 3,
      explanation: 'Ba2+ cho màu xanh lục nhạt.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Kim loại kiềm thổ được điều chế bằng:',
      options: ['Điện phân dung dịch clorua', 'Điện phân nóng chảy muối halogenua', 'Nhiệt luyện với CO', 'Thuỷ luyện'],
      correctAnswer: 1,
      explanation: 'Tính khử mạnh, cần điện phân nóng chảy MgCl2, CaCl2.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Mg(OH)2 ít tan nên có thể làm thuốc kháng axit.',
      correctAnswer: true,
      explanation: 'Ít tan, trung hoà axit dạ dày nhẹ.',
      points: 10
    }
  ]
};
