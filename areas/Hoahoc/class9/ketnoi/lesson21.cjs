module.exports = {
  classId: 9,
  curriculumType: 'ketnoi',
  chapterId: 6,
  chapterName: 'Chương 6: Kim loại. Sự khác nhau cơ bản giữa phi kim và kim loại',
  lessonId: 21,
  title: 'Bài 21: Sự khác nhau cơ bản giữa phi kim và kim loại',
  description: 'So sánh tính chất vật lí, hoá học và vai trò của hai nhóm.',
  level: 'Beginner',
  order: 4,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: '🔍 So sánh kim loại và phi kim',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Mục tiêu: nhận diện nhanh sự khác biệt vật lí/hoá học, oxit đặc trưng và ứng dụng thực tế của hai nhóm nguyên tố.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Vật lí',
            content: 'Kim loại: ánh kim, dẫn điện/nhiệt tốt, dẻo (Cu, Al, Au).\nPhi kim: giòn, cách điện, không ánh kim (trừ than chì dẫn điện, I₂ bóng).\nTỉ trọng: kim loại thường nặng hơn nước; một số kim loại kiềm nhẹ hơn nước.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'infoBox',
        content: {
            title: 'Hoá học',
            content: 'Kim loại: tính khử → dễ bị oxi hoá (mất e).\nPhi kim: tính oxi hoá → nhận e từ kim loại (O₂, Cl₂, S).\nHợp chất: muối, oxit bazơ (kim loại) vs oxit axit/lưỡng tính (phi kim).',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'warningBox',
        content: {
            title: 'Oxit & sản phẩm',
            content: 'Kim loại → oxit bazơ (Na₂O, CaO, Fe₂O₃); một số oxit lưỡng tính: Al₂O₃, ZnO.\nPhi kim → oxit axit (CO₂, SO₂, P₂O₅); tác dụng kiềm → muối.\nLiên hệ pH dung dịch: oxit bazơ → bazơ; oxit axit → axit.',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Vị trí & ứng dụng',
            content: 'Kim loại: trái/giữa bảng tuần hoàn; dùng làm vật liệu, dây dẫn, hợp kim.\nPhi kim: góc trên phải (trừ H); dùng làm chất oxi hoá, vật liệu phi kim (nhựa, sứ, thuỷ tinh).\nVí dụ phân biệt: Fe (kim loại cấu trúc), Cl₂ (khử trùng), S (lưu huỳnh hoá).',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Bảng tóm tắt nhanh',
            content: '**Tính khử/oxi hoá:** kim loại (khử) vs phi kim (oxi hoá).\n**Sản phẩm với O₂:** kim loại → oxit bazơ/lưỡng tính; phi kim → oxit axit.\n**Ứng dụng:** kim loại (kết cấu, điện); phi kim (chất oxi hoá, vật liệu vô cơ/hữu cơ phi kim).',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-8',
        type: 'infoBox',
        content: {
            title: '',
            content: '**Gợi ý hình/infographic** (có thể thay bằng ảnh thực):\nPhân bố kim loại/phi kim trên bảng tuần hoàn: */images/hoahoc9/lesson21-periodic.png*\nChuỗi so sánh tính chất: */images/hoahoc9/lesson21-compare.png*',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-9',
        type: 'warningBox',
        content: {
            title: 'Mini quiz đọc nhanh',
            content: 'Vì sao Al₂O₃, ZnO được xếp oxit lưỡng tính?\nKim loại nào nhẹ hơn nước và vì sao nổi?\nLiên hệ tính dẫn điện với cấu trúc mạng tinh thể kim loại.\nTự trả lời trước khi làm bộ 10 câu trắc nghiệm bên dưới.',
            color: 'orange',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Đặc điểm nào phù hợp với phi kim?',
      options: ['Dẫn nhiệt tốt', 'Giòn, không ánh kim', 'Dễ dát mỏng', 'Dẫn điện tốt'],
      correctAnswer: 1,
      explanation: 'Đa số phi kim giòn, dễ vỡ, không ánh kim.'
    },
    {
      type: 'true-false',
      question: 'O2 là phi kim và có tính oxi hoá mạnh.',
      correctAnswer: true,
      explanation: 'O2 oxi hoá nhiều kim loại và chất hữu cơ.'
    },
    {
      type: 'multiple-choice',
      question: 'Oxit nào thường là oxit axit?',
      options: ['CO2', 'Na2O', 'CaO', 'MgO'],
      correctAnswer: 0,
      explanation: 'CO2 là oxit axit của phi kim C.'
    },
    {
      type: 'fill-in-blank',
      question: 'Kim loại tác dụng với O2 thường tạo oxit ___',
      correctAnswer: 'bazơ',
      explanation: 'Đa số tạo oxit bazơ (trừ Cr2O3, Al2O3 lưỡng tính).' 
    },
    {
      type: 'multiple-choice',
      question: 'Chất nào sau đây là kim loại?',
      options: ['S', 'P', 'Cl2', 'Fe'],
      correctAnswer: 3,
      explanation: 'Fe là kim loại.'
    },
    {
      type: 'multiple-choice',
      question: 'Phi kim nào ở trạng thái lỏng ở điều kiện thường?',
      options: ['Br2', 'Cl2', 'F2', 'O2'],
      correctAnswer: 0,
      explanation: 'Brom là phi kim ở dạng lỏng màu đỏ nâu.'
    },
    {
      type: 'true-false',
      question: 'Phi kim thường nhận electron trong phản ứng với kim loại.',
      correctAnswer: true,
      explanation: 'Phi kim có tính oxi hoá, nhận electron từ kim loại.'
    },
    {
      type: 'multiple-choice',
      question: 'Vị trí phi kim thường tập trung ở khu vực nào của bảng tuần hoàn?',
      options: ['Nhóm IA', 'Chính giữa', 'Góc trên bên phải', 'Dưới cùng'],
      correctAnswer: 2,
      explanation: 'Phi kim nằm ở góc trên bên phải (trừ H nằm trên cùng bên trái).' 
    },
    {
      type: 'fill-in-blank',
      question: 'Oxit lưỡng tính có thể tác dụng với cả axit và ___',
      correctAnswer: 'bazơ',
      explanation: 'Oxit lưỡng tính (Al2O3, ZnO) phản ứng với axit và bazơ.'
    },
    {
      type: 'multiple-choice',
      question: 'Tính chất nào không đúng với kim loại?',
      options: ['Dẫn điện', 'Dễ vỡ, cách điện', 'Ánh kim', 'Có thể uốn kéo sợi'],
      correctAnswer: 1,
      explanation: 'Kim loại không cách điện; đa số dẻo, dẫn điện/nhiệt.'
    }
  ]
};
