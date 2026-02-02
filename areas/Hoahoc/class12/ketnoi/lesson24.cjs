module.exports = {
  classId: 12,
  curriculumType: 'ketnoi',
  chapterId: 7,
  chapterName: 'Chương 7: Kim loại nhóm IA và IIA',
  lessonId: 24,
  title: 'Bài 24: Kim loại nhóm IA',
  description: 'Tính chất, dãy hoạt động, hợp chất đặc trưng của kim loại kiềm.',
  level: 'Intermediate',
  order: 24,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Kim loại nhóm IA',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Nhận diện tính khử cực mạnh, phản ứng với nước/phi kim và hợp chất quan trọng của kim loại kiềm.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Tính chất & phản ứng',
            content: '1e hoá trị (ns1) → tính khử mạnh; hoạt động tăng Li → Cs.\nPhản ứng mãnh liệt với nước: 2M + 2H2O → 2MOH + H2↑.\nDễ bị oxi hoá trong không khí → bảo quản trong dầu hoả.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'warningBox',
        content: {
            title: 'Hợp chất đặc trưng',
            content: 'Oxit, peoxit (Na2O2), superoxit (KO2) có tính oxi hoá/khử mạnh.\nHiđroxit (kiềm mạnh), muối halogenua tan, muối cacbonat bền nhiệt.\nNaHCO3 (thuốc muối), Na2CO3 (soda), NaCl (muối ăn), KNO3 (phân bón).',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Ứng dụng & nhận biết',
            content: 'Pin kiềm, trao đổi ion làm mềm nước, tổng hợp hữu cơ.\nMàu ngọn lửa: Li đỏ, Na vàng, K tím, Rb đỏ tím, Cs xanh lam.\nBảo quản và vận chuyển cần tránh ẩm, tránh tiếp xúc trực tiếp.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'So sánh nhanh',
            content: 'Hoạt động: Li < Na < K < Rb < Cs (mạnh dần, nóng chảy giảm dần).\nSản phẩm với O2: Li2O, Na2O2, KO2 (bẫy đề phổ biến).\nKiềm: LiOH yếu nhất, CsOH mạnh nhất; đều tan và ăn mòn.',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Case & ứng dụng',
            content: 'KO2 trong mặt nạ cứu hoả: hấp thụ CO2, nhả O2 (2KO2 + CO2 → K2CO3 + O2).\nNaHCO3 chữa đau dạ dày, Na2CO3 công nghiệp thủy tinh, xà phòng.\nPin Na/K lỏng dùng trong trao đổi nhiệt; Li dùng trong pin Li-ion.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-8',
        type: 'infoBox',
        content: {
            title: 'Ôn bài tập',
            content: 'Viết PTHH với nước/halogen/oxy; xác định sản phẩm chính theo kim loại.\nBài nhận biết: dùng màu ngọn lửa, kết tủa carbonat/hidroxit.\nTính khối lượng NaOH/KO2 sinh ra khi điện phân hoặc đốt; chú ý cân bằng điện tích và e.',
            color: 'gray',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Phản ứng của Na với nước tạo:',
      options: ['Na2O + H2', 'NaOH + H2', 'Na2O2 + H2', 'NaCl + H2'],
      correctAnswer: 1,
      explanation: '2Na + 2H2O → 2NaOH + H2.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Khi đốt K trong không khí tạo chủ yếu KO2.',
      correctAnswer: true,
      explanation: 'K tạo superoxit KO2 với O2 dư.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Tính khử tăng dần theo dãy:',
      options: ['Cs < K < Na < Li', 'Li < Na < K < Cs', 'Na < Li < K < Cs', 'Li < K < Na < Cs'],
      correctAnswer: 1,
      explanation: 'Bán kính tăng, e tách dễ hơn → Li < Na < K < Rb < Cs.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Muối nào bị nhiệt phân tạo Na2CO3, H2O, CO2?',
      options: ['Na2CO3', 'NaHCO3', 'NaCl', 'NaNO3'],
      correctAnswer: 1,
      explanation: '2NaHCO3 → Na2CO3 + CO2 + H2O (nhiệt).',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Na2O2 có thể dùng để tạo O2 khi cho tác dụng với nước.',
      correctAnswer: true,
      explanation: '2Na2O2 + 2H2O → 4NaOH + O2.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Ngọn lửa vàng đặc trưng dùng nhận biết ion:',
      options: ['Li+', 'Na+', 'K+', 'Cs+'],
      correctAnswer: 1,
      explanation: 'Na+ cho màu vàng cam đặc trưng.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Ứng dụng của NaHCO3 là:',
      options: ['Thuốc muối dạ dày', 'Pin nhiệt', 'Sơn chống gỉ', 'Thủy tinh quang học'],
      correctAnswer: 0,
      explanation: 'NaHCO3 trung hoà axit nhẹ, dùng làm thuốc muối.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Công thức superoxit của kali: ____.',
      correctAnswer: 'KO2',
      explanation: 'Superoxit chứa ion O2-.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Kim loại kiềm được điều chế công nghiệp bằng:',
      options: ['Điện phân nóng chảy muối halogenua', 'Điện phân dung dịch muối', 'Thuỷ luyện từ quặng', 'Nhiệt luyện với CO'],
      correctAnswer: 0,
      explanation: 'Điện phân nóng chảy NaCl/KCl/LiCl vì tính khử quá mạnh.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'KOH là bazơ mạnh, tan nhiều trong nước.',
      correctAnswer: true,
      explanation: 'Tất cả hiđroxit kim loại kiềm đều là kiềm mạnh, tan.',
      points: 10
    }
  ]
};
