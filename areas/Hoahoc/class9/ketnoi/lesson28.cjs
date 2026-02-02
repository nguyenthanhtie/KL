module.exports = {
  classId: 9,
  curriculumType: 'ketnoi',
  chapterId: 9,
  chapterName: 'Chương 9: Lipid. Carbohydrate. Protein. Polymer',
  lessonId: 28,
  title: 'Bài 28: Lipid',
  description: 'Thành phần, tính chất và vai trò của lipid (chất béo).',
  level: 'Beginner',
  order: 11,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: '🥑 Lipid (chất béo)',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Mục tiêu: hiểu thành phần, tính chất vật lí/hoá học, vai trò sinh học và ứng dụng của lipid.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Thành phần & phân loại',
            content: 'Chủ yếu là trieste của glycerol với axit béo (C₁₅-C₁₇).\nPhân loại: chất béo (triglycerid), phospholipid, sterol.\nBão hòa (mỡ động vật, rắn hơn) vs. không bão hòa (dầu thực vật, lỏng hơn).',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'warningBox',
        content: {
            title: 'Tính vật lí',
            content: 'Không tan trong nước, tan trong ete, cloroform; nhẹ hơn nước nên nổi.\nNhiệt độ nóng chảy phụ thuộc độ bão hòa: bão hòa → nóng chảy cao hơn.\nDạng lỏng (dầu) hay rắn/mềm (mỡ, bơ) ở nhiệt độ phòng.',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Tính chất hoá học',
            content: '**Thuỷ phân/xà phòng hoá:** triglycerid + 3NaOH → glycerol + 3RCOONa (xà phòng).\n**Hiđro hoá (no hoá):** chất béo không no + H₂ (Ni, t°) → chất béo no (làm bơ thực vật).\n**Oxi hoá:** gây ôi khét, mùi hôi; cần chống oxi hoá (bảo quản kín, mát).',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Vai trò & ứng dụng',
            content: 'Dự trữ năng lượng (mỡ dưới da); cách nhiệt, bảo vệ cơ quan.\nPhospholipid tạo màng tế bào; sterol là tiền chất hormone.\nHỗ trợ hấp thu vitamin tan trong béo (A, D, E, K).\nỨng dụng: thực phẩm, xà phòng, mỹ phẩm, nhiên liệu sinh học.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Bảng tóm tắt nhanh',
            content: 'Lipid = trieste glycerol + axit béo; không tan nước, nhẹ hơn nước.\nHoá học: thuỷ phân/xà phòng hoá, hiđro hoá, bị oxi hoá → ôi.\nGiá trị sinh học: năng lượng cao, cấu trúc màng, hòa tan vitamin.',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-8',
        type: 'infoBox',
        content: {
            title: '',
            content: '**Gợi ý hình**:\nSơ đồ xà phòng hoá triglycerid: */images/hoahoc9/lesson28-saponification.png*\nSo sánh mạch axit béo bão hoà vs không bão hoà: */images/hoahoc9/lesson28-fattyacids.png*',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-9',
        type: 'warningBox',
        content: {
            title: 'Mini quiz đọc nhanh',
            content: 'Điểm khác nhau giữa chất béo bão hoà và không bão hoà về trạng thái?\nViết PTHH xà phòng hoá một triglycerid tổng quát.\nVì sao dầu ăn để lâu bị ôi? Cách hạn chế?\nKiểm tra nhanh trước khi làm bộ câu trắc nghiệm.',
            color: 'orange',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Thành phần chính của lipid ăn được là:',
      options: ['Protein', 'Trieste của glycerol và axit béo', 'Tinh bột', 'Cellulose'],
      correctAnswer: 1,
      explanation: 'Chất béo là trieste của glycerol và axit béo mạch C15-C17.'
    },
    {
      type: 'true-false',
      question: 'Lipid tan tốt trong nước.',
      correctAnswer: false,
      explanation: 'Lipid không tan trong nước, tan trong dung môi hữu cơ.'
    },
    {
      type: 'multiple-choice',
      question: 'Sản phẩm thuỷ phân lipid với NaOH là:',
      options: ['Glycerol và xà phòng', 'CO2', 'Ethanol', 'Polyetylen'],
      correctAnswer: 0,
      explanation: 'Thuỷ phân trieste → glycerol + muối natri/kali axit béo.'
    },
    {
      type: 'fill-in-blank',
      question: 'Lipid giúp hoà tan các vitamin ___, D, E, K.',
      correctAnswer: 'A',
      explanation: 'Vitamin tan trong béo gồm A, D, E, K.'
    },
    {
      type: 'multiple-choice',
      question: 'Tính chất nào gây hư hỏng lipid khi để lâu ngoài không khí?',
      options: ['Đông đặc', 'Oxi hoá', 'Phản ứng cộng H2', 'Phản ứng trùng hợp'],
      correctAnswer: 1,
      explanation: 'Oxi hoá gây hôi, thối (rancid).' 
    },
    {
      type: 'multiple-choice',
      question: 'Lipid dự trữ năng lượng ở dạng nào?',
      options: ['Tinh bột', 'Mỡ dưới da', 'Glycogen cơ', 'Nucleic acid'],
      correctAnswer: 1,
      explanation: 'Mỡ dưới da tích trữ lipid làm năng lượng dự phòng.'
    },
    {
      type: 'true-false',
      question: 'Phospholipid là thành phần chính của màng tế bào.',
      correctAnswer: true,
      explanation: 'Màng tế bào có lớp phospholipid kép.'
    },
    {
      type: 'fill-in-blank',
      question: 'Thuỷ phân chất béo cần kiềm mạnh như NaOH, quá trình này còn gọi là ___ phòng.',
      correctAnswer: 'xà',
      explanation: 'Thuỷ phân tạo xà phòng và glycerol.'
    },
    {
      type: 'multiple-choice',
      question: 'Axit béo thường có số cacbon:',
      options: ['C2-C4', 'C6-C8', 'C15-C17', 'C30 trở lên'],
      correctAnswer: 2,
      explanation: 'Axit béo trong lipid ăn được thường có mạch C15-C17.'
    },
    {
      type: 'multiple-choice',
      question: 'Tính chất vật lí nào đúng với lipid?',
      options: ['Không tan nước, nhẹ hơn nước', 'Dễ bay hơi', 'Dẫn điện', 'Tan trong nước'],
      correctAnswer: 0,
      explanation: 'Lipid không tan nước, tỉ trọng nhỏ hơn nước nên nổi.'
    }
  ]
};
