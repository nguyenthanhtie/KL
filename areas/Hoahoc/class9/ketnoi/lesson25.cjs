module.exports = {
  classId: 9,
  curriculumType: 'ketnoi',
  chapterId: 7,
  chapterName: 'Chương 7: Giới thiệu về chất hữu cơ. Hydrocarbon và nguồn nhiên liệu',
  lessonId: 25,
  title: 'Bài 25: Nguồn nhiên liệu',
  description: 'Tổng quan nhiên liệu hoá thạch và tái tạo, ưu nhược điểm và bảo vệ môi trường.',
  level: 'Beginner',
  order: 8,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: '🔥 Nguồn nhiên liệu & môi trường',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Mục tiêu: phân biệt hoá thạch - sinh học - tái tạo, hiểu ưu/nhược điểm và biện pháp giảm phát thải.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Nhiên liệu hoá thạch',
            content: 'Than đá, dầu mỏ, khí tự nhiên (giàu hydrocarbon).\nƯu: mật độ năng lượng cao, hạ tầng sẵn.\nNhược: phát thải CO₂, SO₂, NOx → mưa axit, khí nhà kính.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'infoBox',
        content: {
            title: 'Nhiên liệu sinh học',
            content: 'Khí sinh học (CH₄ biogas), etanol E5/E10, biodiesel.\nƯu: tái tạo, giảm CO/PM khi pha xăng.\nLưu ý: cần quản lí đất nông nghiệp, xử lí tạp chất.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'warningBox',
        content: {
            title: 'Năng lượng tái tạo',
            content: 'Điện mặt trời, gió, thuỷ điện, địa nhiệt.\nKhông phát CO₂ trong vận hành, nhưng cần vật liệu/đất đai.\nPhù hợp kết hợp lưu trữ (pin, thuỷ điện tích năng).',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Biện pháp giảm phát thải',
            content: 'Tăng hiệu suất thiết bị, thu hồi nhiệt.\nLọc khí thải (SO₂, NOx, bụi), dùng CCS cho nguồn lớn.\nChuyển dịch sang tái tạo, tiết kiệm năng lượng, giao thông sạch.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Bảng tóm tắt nhanh',
            content: '**Hoá thạch**: năng lượng cao, phát thải lớn.\n**Sinh học**: giảm CO/PM, cần xử lí tạp chất.\n**Tái tạo**: sạch khi vận hành, phụ thuộc thời tiết/lưu trữ.',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-8',
        type: 'infoBox',
        content: {
            title: '',
            content: '**Gợi ý hình**:\nBiểu đồ phát thải CO₂ theo loại nhiên liệu: */images/hoahoc9/lesson25-co2.png*\nChu trình biogas: */images/hoahoc9/lesson25-biogas.png*',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-9',
        type: 'warningBox',
        content: {
            title: 'Mini quiz đọc nhanh',
            content: 'So sánh phát thải CO₂ của khí tự nhiên vs than đá.\nVì sao xăng E5 giúp giảm CO và bụi?\nNêu 2 biện pháp lọc khí thải nhà máy nhiệt điện than.\nTự trả lời trước khi vào bộ 10 câu trắc nghiệm.',
            color: 'orange',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Nhiên liệu hoá thạch chủ yếu chứa:',
      options: ['CO2 sẵn', 'H2O', 'Hydrocarbon', 'Kim loại'],
      correctAnswer: 2,
      explanation: 'Than, dầu, khí chứa chủ yếu hydrocarbon.'
    },
    {
      type: 'true-false',
      question: 'Khí sinh học (biogas) chủ yếu là CH4.',
      correctAnswer: true,
      explanation: 'Biogas chứa ~50-70% CH4.'
    },
    {
      type: 'multiple-choice',
      question: 'Phát thải nào gây mưa axit từ nhiên liệu hoá thạch?',
      options: ['CO2 và N2', 'SO2 và NOx', 'O2', 'He'],
      correctAnswer: 1,
      explanation: 'SO2, NOx tạo H2SO4, HNO3 trong mưa axit.'
    },
    {
      type: 'fill-in-blank',
      question: 'Năng lượng tái tạo không phát ___ trong quá trình phát điện.',
      correctAnswer: 'CO2',
      explanation: 'Điện gió, mặt trời không phát CO2 khi vận hành.'
    },
    {
      type: 'multiple-choice',
      question: 'Biodiesel thường được điều chế từ:',
      options: ['Dầu thực vật/mỡ động vật', 'Đá vôi', 'Thuỷ ngân', 'Pha lê'],
      correctAnswer: 0,
      explanation: 'Biodiesel xuất phát từ lipid (dầu thực vật/mỡ động vật) qua transester hoá.'
    },
    {
      type: 'multiple-choice',
      question: 'Than đá, dầu mỏ, khí tự nhiên đều hình thành từ:',
      options: ['Quá trình phong hoá đá', 'Sự phân huỷ sinh vật hàng triệu năm', 'Đóng hoá kim loại', 'Sự đóng băng nước biển'],
      correctAnswer: 1,
      explanation: 'Nhiên liệu hoá thạch hình thành từ tàn tích sinh vật bị chôn vùi lâu dài.'
    },
    {
      type: 'true-false',
      question: 'Ethanol có thể pha vào xăng để giảm phát thải.',
      correctAnswer: true,
      explanation: 'Xăng E5/E10 dùng etanol từ sinh khối giúp giảm CO và bụi.'
    },
    {
      type: 'fill-in-blank',
      question: 'Khi đốt nhiên liệu hoá thạch cần hạn chế ___ để giảm khí nhà kính.',
      correctAnswer: 'CO2',
      explanation: 'CO2 là khí nhà kính chính sinh ra khi đốt hydrocarbon.'
    },
    {
      type: 'multiple-choice',
      question: 'Biện pháp nào không phải năng lượng tái tạo?',
      options: ['Điện gió', 'Điện mặt trời', 'Đốt than đá', 'Thuỷ điện'],
      correctAnswer: 2,
      explanation: 'Đốt than đá là năng lượng hoá thạch, không phải tái tạo.'
    },
    {
      type: 'multiple-choice',
      question: 'Khí tự nhiên sau xử lí làm bớt mùi chủ yếu là:',
      options: ['N2', 'O2', 'CH4', 'CO2'],
      correctAnswer: 2,
      explanation: 'Thành phần chính của khí tự nhiên là metan (CH4).' 
    }
  ]
};
