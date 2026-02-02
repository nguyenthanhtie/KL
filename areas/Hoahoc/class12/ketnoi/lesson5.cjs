module.exports = {
  classId: 12,
  curriculumType: 'ketnoi',
  chapterId: 2,
  chapterName: 'Chương 2: Carbohydrate',
  lessonId: 5,
  title: 'Bài 5: Saccharose và maltose',
  description: 'Liên kết glycosid, tính khử/không khử, phản ứng thuỷ phân saccharose và maltose.',
  level: 'Intermediate',
  order: 5,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Saccharose và maltose',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Hai disaccharide quen thuộc: một không khử (saccharose), một khử (maltose); hiểu cấu trúc glycosid và phản ứng thuỷ phân.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Cấu trúc & tính khử',
            content: 'Saccharose: α-Glucose (C1) liên kết β-Fructose (C2) → không còn nhóm hemiacetal → không khử.\nMaltose: α-1,4-glucose dimer; đầu khử còn hemiacetal → tráng bạc/Fehling dương tính.\nTính tan cao, vị ngọt; saccharose ngọt hơn maltose.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'infoBox',
        content: {
            title: 'Phản ứng & thuỷ phân',
            content: 'Thuỷ phân saccharose (axit/enzym invertase) → glucose + fructose (đường nghịch đảo).\nThuỷ phân maltose (men maltase) → 2 glucose.\nKhông tham gia phản ứng tráng bạc: saccharose; tham gia: maltose.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Ứng dụng & công nghệ',
            content: 'Sản xuất đường trắng từ mía/ củ cải: làm sạch, kết tinh saccharose.\nĐường nghịch đảo dùng trong bánh kẹo vì giữ ẩm, hạn chế kết tinh.\nMaltose hình thành trong ươm mạch nha, cung cấp đường lên men bia.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Phân biệt nhanh',
            content: 'Saccharose: không khử, không tráng bạc; maltose: khử → tráng bạc/Fehling dương.\nThuỷ phân saccharose → góc quay quang học đổi từ dương sang âm (đường nghịch đảo).\nMaltose phản ứng Cu(OH)2 ở nhiệt độ thường cho dung dịch xanh lam như glucose (đa -OH liền kề).',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Ứng dụng thực tế',
            content: 'Đường nghịch đảo hạn chế kết tinh → kẹo mềm, siro; tăng độ ngọt nhờ fructose.\nMaltose từ mạch nha cung cấp đường dễ lên men cho bia, bánh mì (men nở nhanh).\nKiểm soát độ ngọt: saccharose ~1, maltose ~0.5, glucose ~0.74, fructose ~1.7.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-8',
        type: 'infoBox',
        content: {
            title: 'Ôn tập bài tập',
            content: 'Bảo toàn khối lượng khi thuỷ phân saccharose: m(H2O) thêm vào = m(glucose+fructose) - m(saccharose).\nTính góc quay hỗn hợp sau thuỷ phân dựa trên tỉ lệ glucose/fructose và [α] riêng.\nTrắc nghiệm nhận biết: thuỷ phân + Tollens/Fehling; hoặc đo góc quay quang học.',
            color: 'gray',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Saccharose không tham gia phản ứng tráng bạc vì:',
      options: ['Không tan trong nước', 'Không có nhóm hemiacetal tự do', 'Quá bền với kiềm', 'Không có nhóm -OH'],
      correctAnswer: 1,
      explanation: 'Liên kết glycosid khoá cả C1 glucose và C2 fructose.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Sản phẩm thuỷ phân hoàn toàn maltose là:',
      options: ['Glucose + fructose', '2 phân tử glucose', 'Glucose + galactose', '2 fructose'],
      correctAnswer: 1,
      explanation: 'Maltose gồm hai đơn vị glucose liên kết α-1,4.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Saccharose là disaccharide khử.',
      correctAnswer: false,
      explanation: 'Saccharose không khử do không còn nhóm hemiacetal tự do.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Enzym chuyển saccharose thành đường nghịch đảo là:',
      options: ['Amylase', 'Invertase (sucrase)', 'Maltase', 'Lactase'],
      correctAnswer: 1,
      explanation: 'Invertase cắt liên kết glycosid saccharose.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Lý do đường nghịch đảo dùng nhiều trong kẹo mềm:',
      options: ['Vì rẻ hơn', 'Vì giữ ẩm, ít kết tinh', 'Vì không ngọt', 'Vì màu đẹp'],
      correctAnswer: 1,
      explanation: 'Glucose + fructose hút ẩm, hạn chế kết tinh lại của saccharose.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Maltose cho kết tủa Cu2O đỏ gạch với dung dịch Fehling.',
      correctAnswer: true,
      explanation: 'Maltose là đường khử.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Saccharose khi thuỷ phân trong môi trường axit tạo hỗn hợp có góc quay quang học:',
      options: ['Vẫn dương', 'Chuyển từ dương sang âm (inversion)', 'Vẫn âm', 'Bằng 0'],
      correctAnswer: 1,
      explanation: 'Fructose quay trái mạnh hơn glucose quay phải → tổng âm.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Liên kết glycosid trong maltose nối C1 của glucose thứ nhất với C__ của glucose thứ hai.',
      correctAnswer: '4',
      explanation: 'Maltose có liên kết α-1,4-glucosid.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Thử nghiệm nhận biết saccharose nhanh nhất trong phòng học:',
      options: ['Tráng bạc', 'Thuỷ phân rồi tráng bạc', 'Thử iot', 'Tạo phức với Cu(OH)2 ở nhiệt độ thường'],
      correctAnswer: 1,
      explanation: 'Saccharose không khử, cần thuỷ phân thành glucose + fructose rồi thử Tollens/Fehling.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Maltose có vị ngọt kém saccharose.',
      correctAnswer: true,
      explanation: 'Độ ngọt: fructose > saccharose > glucose > maltose.',
      points: 10
    }
  ]
};
