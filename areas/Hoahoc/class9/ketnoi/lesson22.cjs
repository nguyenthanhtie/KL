module.exports = {
  classId: 9,
  curriculumType: 'ketnoi',
  chapterId: 7,
  chapterName: 'Chương 7: Giới thiệu về chất hữu cơ. Hydrocarbon và nguồn nhiên liệu',
  lessonId: 22,
  title: 'Bài 22: Giới thiệu về hợp chất hữu cơ',
  description: 'Đặc điểm chung của hợp chất hữu cơ và các nhóm phân loại cơ bản.',
  level: 'Beginner',
  order: 5,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: '🧬 Tổng quan hợp chất hữu cơ',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Mục tiêu: nắm thành phần, liên kết chủ đạo, các nhóm phân loại lớn và cách biểu diễn công thức.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Thành phần & liên kết',
            content: 'Chủ yếu chứa C, H; kèm O, N, S, halogen.\nLiên kết cộng hoá trị C-C, C-H bền; dễ bị nhiệt phân so với vô cơ.\nCó mạch thẳng, nhánh, vòng (no/không no/aromatic).',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'infoBox',
        content: {
            title: 'Phân loại nhanh',
            content: 'Hydrocarbon: chỉ C, H (ankan, anken, ankin).\nDẫn xuất: chứa nhóm chức (-OH, -COOH, -O-, -CHO...).\nTự nhiên vs nhân tạo: lipid, đường, protein; polymer tổng hợp.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'warningBox',
        content: {
            title: 'Biểu diễn công thức',
            content: 'Công thức phân tử: số nguyên tử từng nguyên tố.\nCông thức cấu tạo: cách liên kết, thứ tự nguyên tử.\nCông thức thu gọn/vẽ khung xương giúp nhìn mạch C nhanh.',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Ứng dụng & ví dụ',
            content: 'Nhiên liệu (xăng, LPG), dung môi (etanol, axeton).\nThực phẩm (đường, lipid), dược phẩm (aspirin), vật liệu (PVC, PE).\nSinh học: glucose - năng lượng tế bào; protein - cấu trúc/enzym.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Bảng tóm tắt nhanh',
            content: '**Hydrocarbon**: ankan (CnH2n+2), anken (CnH2n), ankin (CnH2n-2).\n**Dẫn xuất**: ancol (-OH), axit cacboxylic (-COOH), este (-COO-).\n**Tính chất chung**: cộng hoá trị, dễ cháy; nhiều chất ít tan nước, tan dung môi hữu cơ.',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-8',
        type: 'infoBox',
        content: {
            title: '',
            content: '**Gợi ý hình**:\nSơ đồ cây phân loại hữu cơ: */images/hoahoc9/lesson22-classification.png*\nMô hình mạch thẳng/nhánh/vòng: */images/hoahoc9/lesson22-structures.png*',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-9',
        type: 'warningBox',
        content: {
            title: 'Mini quiz đọc nhanh',
            content: 'Vì sao công thức cấu tạo quan trọng hơn công thức phân tử?\nPhân biệt nhanh ankan và anken bằng tính chất hoá học nào?\nKể 2 ví dụ dẫn xuất hữu cơ thông dụng trong đời sống.\nTự trả lời trước khi làm bộ 10 câu bên dưới.',
            color: 'orange',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Thành phần chính của hợp chất hữu cơ là:',
      options: ['C và H', 'Fe và O', 'Na và Cl', 'Mg và O'],
      correctAnswer: 0,
      explanation: 'Hữu cơ thường chứa C, H và có thể có thêm O, N...' 
    },
    {
      type: 'true-false',
      question: 'Hydrocarbon chỉ chứa C và H.',
      correctAnswer: true,
      explanation: 'Đúng, các nguyên tố khác không có trong hydrocarbon.'
    },
    {
      type: 'multiple-choice',
      question: 'Dạng công thức nào cho biết cách sắp xếp nguyên tử?',
      options: ['Công thức phân tử', 'Công thức cấu tạo', 'Khối lượng mol', 'Tỉ trọng'],
      correctAnswer: 1,
      explanation: 'Công thức cấu tạo thể hiện liên kết giữa các nguyên tử.'
    },
    {
      type: 'fill-in-blank',
      question: 'Hợp chất chỉ có C, H, O thường gặp là đường, lipid và ___',
      correctAnswer: 'protein',
      explanation: 'Protein có thêm N nhưng khung vẫn là C, H, O.'
    },
    {
      type: 'multiple-choice',
      question: 'Ứng dụng nào không thuộc nhóm hợp chất hữu cơ?',
      options: ['Nhiên liệu xăng', 'Nhựa PE', 'Thép', 'Đường sucrose'],
      correctAnswer: 2,
      explanation: 'Thép là hợp kim kim loại, không phải hợp chất hữu cơ.'
    },
    {
      type: 'true-false',
      question: 'Chất hữu cơ thường dễ bị phân huỷ ở nhiệt độ cao hơn vô cơ.',
      correctAnswer: true,
      explanation: 'Liên kết C-C, C-H làm chất hữu cơ dễ bị nhiệt phân.'
    },
    {
      type: 'multiple-choice',
      question: 'Nhóm nào chỉ gồm hydrocarbon?',
      options: ['Ankan, anken, ankin', 'Ancol, ete, este', 'Axit, muối', 'Axit nucleic, protein'],
      correctAnswer: 0,
      explanation: 'Ankan, anken, ankin chỉ có C và H.'
    },
    {
      type: 'fill-in-blank',
      question: 'Hợp chất hữu cơ gắn với lĩnh vực ___ học nghiên cứu cấu trúc và phản ứng. (điền "hoa")',
      correctAnswer: 'hoá hữu cơ',
      explanation: 'Hoá học hữu cơ nghiên cứu hợp chất của carbon.'
    },
    {
      type: 'multiple-choice',
      question: 'Chất nào có khả năng hoà tan nhiều hợp chất hữu cơ?',
      options: ['Nước', 'Etanol', 'NaCl rắn', 'H2'],
      correctAnswer: 1,
      explanation: 'Etanol là dung môi hữu cơ, hoà tan nhiều chất hữu cơ.'
    },
    {
      type: 'multiple-choice',
      question: 'Vai trò của công thức cấu tạo là gì?',
      options: ['Tính khối lượng mol', 'Xác định dạng tinh thể', 'Biểu diễn liên kết và thứ tự nguyên tử', 'Tính áp suất hơi'],
      correctAnswer: 2,
      explanation: 'Công thức cấu tạo cho thấy cách nguyên tử nối với nhau.'
    }
  ]
};
