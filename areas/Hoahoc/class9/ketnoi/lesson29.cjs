module.exports = {
  classId: 9,
  curriculumType: 'ketnoi',
  chapterId: 9,
  chapterName: 'Chương 9: Lipid. Carbohydrate. Protein. Polymer',
  lessonId: 29,
  title: 'Bài 29: Carbohydrate - Glucose và saccharose',
  description: 'Đặc điểm, tính chất của đường đơn và đường đôi.',
  level: 'Beginner',
  order: 12,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: '🍯 Glucose & Saccharose',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Mục tiêu: phân biệt đường đơn (glucose) và đường đôi (saccharose), tính chất nhận biết và ứng dụng.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Glucose (C₆H₁₂O₆)',
            content: 'Đường đơn, tan tốt, vị ngọt dịu; nguồn: quả chín, máu.\nCó nhóm -CHO dạng mạch hở → tính khử (Fehling/Benedict → đỏ gạch).\nLên men rượu: C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂.\nVai trò: nhiên liệu trực tiếp của tế bào (hô hấp).',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'warningBox',
        content: {
            title: 'Saccharose (C₁₂H₂₂O₁₁)',
            content: 'Đường đôi = glucose + fructose; tinh thể trắng, tan tốt.\nKhông có nhóm -CHO tự do → không khử Fehling khi chưa thuỷ phân.\nThuỷ phân (H⁺/enzym) → glucose + fructose (đường nghịch chuyển).\nNguồn chính: mía, củ cải đường.',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Nhận biết & phản ứng',
            content: 'Glucose + Cu(OH)₂/kiềm + đun → Cu₂O đỏ gạch.\nSaccharose không phản ứng trên; nhưng sau thuỷ phân sẽ cho kết quả như glucose.\nCả hai đều lên men → etanol + CO₂ (men rượu).',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Ứng dụng & sức khoẻ',
            content: 'Thực phẩm, tạo ngọt, lên men rượu/bánh mì.\nGlucose truyền tĩnh mạch cung cấp năng lượng nhanh.\nKiểm soát hấp thu đường để tránh tăng đường huyết.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Bảng tóm tắt nhanh',
            content: 'Glucose: đường đơn, có tính khử, lên men rượu.\nSaccharose: đường đôi, không khử Fehling trừ khi thuỷ phân.\nNhận biết: thuốc thử Benedict/Fehling cho glucose; saccharose cần thuỷ phân trước.',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-8',
        type: 'infoBox',
        content: {
            title: '',
            content: '**Gợi ý hình**:\nChuỗi phản ứng Fehling với glucose: */images/hoahoc9/lesson29-fehling.png*\nSơ đồ thuỷ phân saccharose: */images/hoahoc9/lesson29-hydrolysis.png*',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-9',
        type: 'warningBox',
        content: {
            title: 'Mini quiz đọc nhanh',
            content: 'Vì sao saccharose không tráng gương nhưng lại tráng gương sau thuỷ phân?\nViết PTHH lên men glucose thành etanol.\nNguồn thực phẩm giàu saccharose nào phổ biến nhất ở Việt Nam?\nSuy nghĩ nhanh rồi luyện tập bộ câu hỏi.',
            color: 'orange',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'CTPT glucose là:',
      options: ['C6H12O6', 'C12H22O11', 'C6H10O5', 'CH2O'],
      correctAnswer: 0,
      explanation: 'Glucose có CTPT C6H12O6.'
    },
    {
      type: 'true-false',
      question: 'Saccharose là đường đôi của glucose và fructose.',
      correctAnswer: true,
      explanation: 'Đúng, saccharose gồm 1 gốc glucose + 1 gốc fructose.'
    },
    {
      type: 'multiple-choice',
      question: 'Thử thử Benedict/Fehling nhận biết được:',
      options: ['Saccharose', 'Glucose', 'Saccharose và NaCl', 'Tinh bột'],
      correctAnswer: 1,
      explanation: 'Glucose khử được Cu(OH)2 tạo kết tủa đỏ gạch.'
    },
    {
      type: 'fill-in-blank',
      question: 'Lên men glucose: C6H12O6 → 2C2H5OH + ___ CO2',
      correctAnswer: '2',
      explanation: 'Sinh 2 mol CO2.'
    },
    {
      type: 'multiple-choice',
      question: 'Nguồn thu saccharose chủ yếu:',
      options: ['Khoai tây', 'Mía/đường riềng', 'Ngô', 'Khoai lang'],
      correctAnswer: 1,
      explanation: 'Mía đường và đường riềng là nguồn saccharose chính.'
    },
    {
      type: 'multiple-choice',
      question: 'Saccharose có khả năng khử dung dịch Cu(OH)2 trong môi trường kiềm?',
      options: ['Có', 'Không'],
      correctAnswer: 1,
      explanation: 'Saccharose không có nhóm -CHO tự do nên không khử Fehling.'
    },
    {
      type: 'true-false',
      question: 'Glucose thuộc nhóm monosaccharide.',
      correctAnswer: true,
      explanation: 'Glucose là đường đơn (mono).' 
    },
    {
      type: 'fill-in-blank',
      question: 'Thuỷ phân saccharose thu được glucose và ___',
      correctAnswer: 'fructose',
      explanation: 'Saccharose + H2O (xt) → glucose + fructose.'
    },
    {
      type: 'multiple-choice',
      question: 'Tính chất vật lí nào đúng với saccharose?',
      options: ['Ít tan nước', 'Tan tốt trong nước, tinh thể trắng', 'Bay hơi dễ', 'Có mùi khai'],
      correctAnswer: 1,
      explanation: 'Saccharose tinh thể trắng, tan tốt trong nước, vị ngọt.'
    },
    {
      type: 'multiple-choice',
      question: 'Vai trò sinh học chính của glucose:',
      options: ['Dự trữ trong da', 'Năng lượng nhanh cho tế bào', 'Cấu trúc DNA', 'Thành phần lipid'],
      correctAnswer: 1,
      explanation: 'Glucose là nguồn năng lượng trực tiếp trong tế bào.'
    }
  ]
};
