module.exports = {
  classId: 12,
  curriculumType: 'ketnoi',
  chapterId: 2,
  chapterName: 'Chương 2: Carbohydrate',
  lessonId: 7,
  title: 'Bài 7: Ôn tập chương 2',
  description: 'Tóm tắt cấu trúc, tính chất, phản ứng đặc trưng của monosaccharide và polysaccharide.',
  level: 'Intermediate',
  order: 7,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Ôn tập chương 2: Carbohydrate',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Tổng hợp mạch kiến thức từ monosaccharide đến polysaccharide, phân biệt đường khử/không khử, bài tập thuỷ phân và ứng dụng.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Nhận biết & tính khử',
            content: 'Đường khử: glucose, fructose (sau chuyển hoá), maltose; cho Tollens/Fehling dương tính.\nĐường không khử: saccharose; cần thuỷ phân mới khử.\nThử Molisch (tổng quát), Barfoed (mono vs di khử), Iot (tinh bột), không màu với xenlulozơ.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'infoBox',
        content: {
            title: 'Phản ứng & chuyển hoá',
            content: 'Thuỷ phân: saccharose → glucose + fructose; tinh bột/xenlulozơ → glucose.\nLên men: glucose → etanol/CO2; vi khuẩn lactic → axit lactic.\nEster hoá nhiều -OH; oxi hoá nhẹ bằng Br2 (aldose) vs mạnh bằng HNO3 (tạo dicarboxylic).',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Kỹ năng bài tập',
            content: 'Cân bằng khối lượng, bảo toàn e trong phản ứng tráng bạc/Fehling để tính mol đường khử.\nPhân biệt tinh bột vs xenlulozơ bằng thử iot, độ tan, thuỷ phân.\nTính hiệu suất chuyển hoá: khối lượng tinh bột → glucose → etanol/CO2.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Bảng phân biệt nhanh',
            content: 'Đường khử: glucose, fructose, maltose → Tollens/Fehling (+); không khử: saccharose (trừ khi thuỷ phân).\nPoly: tinh bột (+ I2 xanh tím), xenlulozơ (không màu, sợi bền), glycogen (đỏ nâu).\nThử Barfoed: mono khử nhanh, di khử chậm; Biuret (peptide), Molisch (mọi carbo).',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Case & mẹo thi',
            content: 'Câu hiệu suất etanol: 1 mol glucose → 2 mol etanol; trừ hao CO2 thoát, nhân % hiệu suất.\nĐề phân biệt: luôn nghĩ “thuỷ phân saccharose rồi thử Tollens/Fehling” để chắc chắn.\nMẹo nhớ màu: tinh bột xanh tím, glycogen đỏ nâu, dextrin tím nhạt → cho thấy mức thuỷ phân.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-8',
        type: 'infoBox',
        content: {
            title: 'Ôn bài tập',
            content: 'Phản ứng tráng bạc: n mol Ag sinh ra → n/2 mol đường aldose; fructose tính như aldose khi trong kiềm.\nThuỷ phân tinh bột: (C6H10O5)n + nH2O → nC6H12O6; áp dụng bảo toàn khối lượng.\nLên men hỗn hợp: nếu đề cho sản phẩm khí và rượu, tính theo mol, chú ý hiệu suất từng giai đoạn.',
            color: 'gray',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Đường nào sau đây không khử?',
      options: ['Glucose', 'Fructose', 'Maltose', 'Saccharose'],
      correctAnswer: 3,
      explanation: 'Saccharose không có nhóm hemiacetal tự do.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Thuốc thử Iot dùng để nhận biết:',
      options: ['Đường khử', 'Tinh bột', 'Xenlulozơ', 'Maltose'],
      correctAnswer: 1,
      explanation: 'Tinh bột cho màu xanh tím với I2/KI.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Barfoed giúp phân biệt monosaccharide khử với disaccharide khử.',
      correctAnswer: true,
      explanation: 'Monosaccharide khử Cu2+ nhanh hơn ở môi trường axit yếu.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Sản phẩm thuỷ phân tinh bột hoàn toàn:',
      options: ['Maltose', 'Glucose', 'Fructose', 'Saccharose'],
      correctAnswer: 1,
      explanation: 'Tinh bột → glucose.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Glucose lên men etylic tạo 90% hiệu suất. Từ 180 g glucose thu tối đa etanol (khối lượng gần đúng):',
      options: ['46 g', '82,8 g', '92 g', '184 g'],
      correctAnswer: 2,
      explanation: 'Lý thuyết: 180 → 92 g etanol; 90% → 82,8 g.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Fructose phải thuỷ phân mới cho phản ứng tráng bạc.',
      correctAnswer: false,
      explanation: 'Trong môi trường kiềm fructose tự đồng phân hoá thành aldose, nên vẫn cho Tollens/Fehling.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Tinh bột bị thuỷ phân nhanh nhất bởi:',
      options: ['Nước lạnh', 'Enzym amylase', 'Dung dịch NaOH', 'Dung dịch NaCl'],
      correctAnswer: 1,
      explanation: 'Amylase xúc tác cắt liên kết α-1,4.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Saccharose thuỷ phân tạo glucose và ______.',
      correctAnswer: 'fructose',
      explanation: 'Đường mía → đường nghịch đảo chứa hai monosaccharide.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Xenlulozơ không tan trong nước do:',
      options: ['Phân tử lượng thấp', 'Chuỗi thẳng nhiều liên kết H nội/ngoại chuỗi', 'Tính ion cao', 'Có nhiều nhánh'],
      correctAnswer: 1,
      explanation: 'Liên kết H bền tạo vi sợi chặt chẽ.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Maltose là disaccharide khử.',
      correctAnswer: true,
      explanation: 'Còn một đầu hemiacetal tự do.',
      points: 10
    }
  ]
};
