module.exports = {
  classId: 12,
  curriculumType: 'ketnoi',
  chapterId: 6,
  chapterName: 'Chương 6: Đại cương về kim loại',
  lessonId: 21,
  title: 'Bài 21: Hợp kim',
  description: 'Khái niệm hợp kim, tác dụng của nguyên tố pha tạp, ví dụ quan trọng.',
  level: 'Intermediate',
  order: 21,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Hợp kim',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Pha tạp kim loại/phi kim tạo vật liệu có tính chất vượt trội so với kim loại nguyên chất.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Khái niệm & loại hợp kim',
            content: 'Hợp kim: vật liệu chứa ≥2 nguyên tố, thành phần kim loại chiếm phần chính.\nDung dịch rắn thay thế (Cu-Ni, đồng thau) vs dung dịch rắn xen kẽ (Fe-C).\nHợp chất liên kim (Fe3C), hợp kim vô định hình (thủy tinh kim loại).',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'infoBox',
        content: {
            title: 'Ví dụ tiêu biểu',
            content: 'Gang (Fe-C 2-4%): giòn, đúc tốt; thép (Fe-C <2%): bền, dẻo.\nĐồng thau (Cu-Zn): dẻo, chống ăn mòn; đồng thanh (Cu-Sn): bền, đúc tượng.\nThép hợp kim: Cr, Ni (thép không gỉ); V, Mo (tăng cứng). Al-Mg (nhẹ, bền).',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Xử lí & tính chất',
            content: 'Tôi (làm nguội nhanh) tăng cứng; ram giảm giòn, tăng dẻo.\nBiến cứng nguội, kết tủa cứng (Al-Cu) điều chỉnh độ bền.\nỨng dụng: xây dựng, hàng không, điện, trang sức (vàng 18K Au-Ag-Cu).',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'So sánh nhanh',
            content: 'Thép vs gang: thép <2% C, dẻo; gang 2-4% C, giòn nhưng đúc tốt.\nThép cacbon vs thép hợp kim: thêm Cr/Ni tăng chống gỉ và dẻo; V/Mo tăng bền nóng.\nHợp kim vô định hình: không mạng tinh thể, độ bền cao, chống ăn mòn tốt.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'warningBox',
        content: {
            title: 'Case & ứng dụng',
            content: 'Thép không gỉ: cần ≥10,5% Cr để tạo lớp Cr2O3 bền; thêm Ni tăng dẻo.\nDuralumin (Al-Cu-Mg): hoá già tăng bền; dùng vỏ máy bay.\nKim loại nhớ hình (Ni-Ti): biến dạng rồi trở lại hình cũ khi nung.',
            color: 'red',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-8',
        type: 'infoBox',
        content: {
            title: 'Ôn bài tập',
            content: 'Nhận diện hợp kim qua tính chất: không gỉ (Cr), nhẹ (Al-Mg), dẫn điện tốt (Cu).\nLập sơ đồ nhiệt luyện: tôi → ram; hoặc ủ để làm mềm trước khi cán.\nGiải thích vì sao tăng C làm thép cứng hơn nhưng giòn hơn (mactenxit, chuyển vị khó).',
            color: 'gray',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Thành phần chính của đồng thau:',
      options: ['Cu và Sn', 'Cu và Zn', 'Cu và Ni', 'Cu và Al'],
      correctAnswer: 1,
      explanation: 'Đồng thau = Cu-Zn.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Gang có hàm lượng C khoảng:',
      options: ['<0.2%', '0.2-2%', '2-4%', '>5%'],
      correctAnswer: 2,
      explanation: 'Gang 2-4% C; thép <2%.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Thép không gỉ chứa Cr và Ni.',
      correctAnswer: true,
      explanation: 'Cr tạo lớp oxit bảo vệ, Ni tăng dẻo.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Vàng 18K có hàm lượng Au khoảng:',
      options: ['75%', '60%', '90%', '50%'],
      correctAnswer: 0,
      explanation: '18/24 = 75% Au.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phương pháp nhiệt luyện làm tăng độ cứng nhưng giảm dẻo:',
      options: ['Ủ', 'Ram', 'Tôi', 'Thường hoá'],
      correctAnswer: 2,
      explanation: 'Tôi làm nguội nhanh tạo mactenxit cứng.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Dung dịch rắn xen kẽ hình thành khi nguyên tử hoà tan nhỏ hơn nhiều so với mạng chủ.',
      correctAnswer: true,
      explanation: 'Nguyên tử nhỏ chen vào khe (C trong Fe).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Đồng thanh (bronze) là hợp kim của:',
      options: ['Cu-Sn', 'Cu-Zn', 'Cu-Ni', 'Cu-Al'],
      correctAnswer: 0,
      explanation: 'Bronze cổ điển là Cu-Sn.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Thao tác ủ thép nhằm tăng ______ và giảm ứng suất.',
      correctAnswer: 'dẻo',
      explanation: 'Ủ tạo hạt mới, giảm khuyết tật → mềm dẻo hơn.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Hợp kim nhẹ dùng trong hàng không:',
      options: ['Thép Cr-V', 'Al-Mg (duralumin)', 'Cu-Zn', 'Fe-C'],
      correctAnswer: 1,
      explanation: 'Duralumin nhẹ, bền cho kết cấu bay.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Biến cứng nguội làm tăng mật độ khuyết tật, tăng cứng.',
      correctAnswer: true,
      explanation: 'Chuyển vị bị kẹt → cứng hơn nhưng giòn hơn.',
      points: 10
    }
  ]
};
