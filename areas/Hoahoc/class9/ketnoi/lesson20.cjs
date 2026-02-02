module.exports = {
  classId: 9,
  curriculumType: 'ketnoi',
  chapterId: 6,
  chapterName: 'Chương 6: Kim loại. Sự khác nhau cơ bản giữa phi kim và kim loại',
  lessonId: 20,
  title: 'Bài 20: Tách kim loại và sử dụng hợp kim',
  description: 'Các phương pháp khai thác, chế biến kim loại và vai trò hợp kim.',
  level: 'Intermediate',
  order: 3,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: '⛏️ Tách kim loại & hợp kim',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Mục tiêu: nắm các bước thu kim loại từ quặng, phương pháp khử/điện phân và lợi ích của hợp kim.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Quặng & chuẩn bị',
            content: 'Kim loại hiếm khi tồn tại tự do, chủ yếu ở dạng oxit, sunfua, cacbonat.\nTuyển quặng: đập, tuyển nổi/từ/đãi trọng lực để tăng hàm lượng kim loại.\nNung quặng sunfua → oxit, giải phóng SO₂ (cần xử lí khí).',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'warningBox',
        content: {
            title: 'Khử hoá học',
            content: 'Khử bằng C/CO/H₂: Fe₂O₃ + 3CO → 2Fe + 3CO₂ (lò cao).\nNhiệt luyện cho kim loại trung bình (Fe, Cu, Pb...).\nThu hồi kim loại yếu (Cu) bằng xi măng hoá: Fe + CuSO₄ → FeSO₄ + Cu.',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Điện phân',
            content: 'Áp dụng cho kim loại hoạt động mạnh: Na, K, Mg, Al.\nĐiện phân nóng chảy: Al₂O₃/cryolit → Al (catot) + O₂ (anot C).\nMuối nóng chảy NaCl → Na + Cl₂ (điện phân Downs).',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Hợp kim & ứng dụng',
            content: 'Trộn kim loại/phi kim để tăng bền, chống ăn mòn, giảm khối lượng.\nVí dụ: Thép (Fe+C), Đồng thau (Cu+Zn), Nhôm hợp kim (Al+Mg/Si), Thép không gỉ (Fe-Cr-Ni).\nTái chế kim loại/hợp kim giúp giảm năng lượng và ô nhiễm.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Bảng tóm tắt nhanh',
            content: 'Tuyển quặng → nung/khử → tinh luyện (hoá học hoặc điện phân).\nKim loại mạnh phải điện phân nóng chảy; kim loại trung bình dùng chất khử.\nHợp kim cải thiện cơ tính, chống gỉ; tái chế giảm phát thải.',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-8',
        type: 'infoBox',
        content: {
            title: '',
            content: '**Gợi ý hình**:\nSơ đồ lò cao luyện gang/thu Fe: */images/hoahoc9/lesson20-blastfurnace.png*\nĐiện phân Al₂O₃ trong cryolit: */images/hoahoc9/lesson20-hallheroult.png*\nCấu trúc hợp kim đồng thau: */images/hoahoc9/lesson20-brass.png*',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-9',
        type: 'warningBox',
        content: {
            title: 'Mini quiz đọc nhanh',
            content: 'Vì sao Al không khử được bằng CO mà phải điện phân?\nViết PTHH khử Fe₂O₃ bằng CO.\nLợi ích chính khi dùng thép không gỉ thay thép cacbon?\nSuy nghĩ trước khi làm bài trắc nghiệm.',
            color: 'orange',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Kim loại nào thuộc nhóm phải điện phân oxit/nóng chảy để điều chế?',
      options: ['Fe', 'Al', 'Cu', 'Ag'],
      correctAnswer: 1,
      explanation: 'Al hoạt động mạnh, phải điện phân Al2O3 trong criolit.'
    },
    {
      type: 'true-false',
      question: 'Thép là hợp kim của Fe và C.',
      correctAnswer: true,
      explanation: 'Đúng, thép chứa ~0,02-2% C và có thể thêm phụ gia.'
    },
    {
      type: 'multiple-choice',
      question: 'Phương pháp nào phù hợp để thu Fe từ quặng hematit?',
      options: ['Dien phan', 'Dong nhat', 'Khu bang CO trong lo cao', 'Thu hoi tu dung dich'],
      correctAnswer: 2,
      explanation: 'Fe2O3 được khử bằng CO/H2 trong lò cao.'
    },
    {
      type: 'fill-in-blank',
      question: 'PT: Fe2O3 + 3CO → 2Fe + ___CO2',
      correctAnswer: '3',
      explanation: 'Hệ số CO2 là 3.'
    },
    {
      type: 'multiple-choice',
      question: 'Đồng thau (brass) gồm thành phần chính:',
      options: ['Cu + Zn', 'Cu + Sn', 'Fe + C', 'Al + Mg'],
      correctAnswer: 0,
      explanation: 'Brass là hợp kim Cu và Zn.'
    },
    {
      type: 'multiple-choice',
      question: 'Hợp kim nào được dùng làm vỏ máy bay vì nhẹ và bền?',
      options: ['Thép không gỉ', 'Nhôm + Mg/Si', 'Đồng thau', 'Gang xám'],
      correctAnswer: 1,
      explanation: 'Hợp kim nhôm với Mg/Si có tỉ trọng nhỏ, độ bền tốt.'
    },
    {
      type: 'true-false',
      question: 'Gang có hàm lượng C cao hơn thép.',
      correctAnswer: true,
      explanation: 'Gang ~2-4%C, thép <2% C.'
    },
    {
      type: 'fill-in-blank',
      question: 'Điện phân nóng chảy NaCl tạo ra Na + ___',
      correctAnswer: 'Cl2',
      explanation: 'Catot thu Na, anot giải phóng Cl2.'
    },
    {
      type: 'multiple-choice',
      question: 'Bước nào thường dùng trước khi khử quặng kim loại?',
      options: ['Nghiền mịn quặng', 'Tuyển chọn lọc quặng', 'Tuyển quặng/tăng hàm lượng', 'Đóng gói bán'],
      correctAnswer: 2,
      explanation: 'Tuyển quặng để tăng hàm lượng kim loại trước khi khử.'
    },
    {
      type: 'multiple-choice',
      question: 'Hợp kim nào chịu ăn mòn tốt nhất trong các lựa chọn sau?',
      options: ['Thép cacbon', 'Thép không gỉ (Fe-Cr-Ni)', 'Gang trắng', 'Đồng thau'],
      correctAnswer: 1,
      explanation: 'Thép không gỉ (Fe-Cr-Ni) chống rỉ sét rất tốt.'
    }
  ]
};
