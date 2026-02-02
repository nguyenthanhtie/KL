module.exports = {
  classId: 12,
  curriculumType: 'ketnoi',
  chapterId: 6,
  chapterName: 'Chương 6: Đại cương về kim loại',
  lessonId: 22,
  title: 'Bài 22: Ăn mòn và bảo vệ kim loại',
  description: 'Cơ chế ăn mòn hoá học/điện hoá, yếu tố ảnh hưởng, phương pháp bảo vệ.',
  level: 'Intermediate',
  order: 22,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Ăn mòn và bảo vệ kim loại',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Phân biệt ăn mòn hoá học và điện hoá, nhận yếu tố ảnh hưởng và áp dụng biện pháp chống ăn mòn.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Cơ chế',
            content: 'Ăn mòn hoá học: kim loại phản ứng trực tiếp với môi trường khô/khí (O2, S).\nĂn mòn điện hoá: vi pin tạo trên bề mặt ẩm; anot bị oxi hoá (mất e), catot khử O2/H+.\nYếu tố: ẩm, chất điện li, chênh lệch điện thế kim loại/ion, oxy, pH.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'infoBox',
        content: {
            title: 'Biện pháp bảo vệ',
            content: 'Sơn phủ, phủ dầu, mạ kim loại bền (Cr, Ni) ngăn tiếp xúc môi trường.\nBảo vệ catot: nối kim loại cần bảo vệ với kim loại hi sinh hoạt động hơn (Zn bảo vệ thép tàu).\nChất ức chế ăn mòn, kiểm soát pH, khử oxy trong hệ kín.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Ví dụ & thực tế',
            content: 'Gỉ sắt: Fe → Fe2+ (anot), O2 + H2O + e → OH- (catot) → Fe(OH)3 → Fe2O3·nH2O.\nĂn mòn pin hai kim loại: Fe-Cu trong ẩm, Fe bị ăn mòn nhanh hơn.\nThụ động hoá: Al, Cr tạo màng oxit bền tự bảo vệ.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'So sánh nhanh',
            content: 'Ăn mòn hoá học: không cần dung dịch, khí khô (Cl2, O3) tấn công trực tiếp.\nĂn mòn điện hoá: cần chất điện li + vi pin; tốc độ thường nhanh hơn.\nThụ động hoá: màng oxit bền (Al, Cr, Ti) chặn O2/H2O.',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Case & ứng dụng',
            content: 'Ống dẫn ngầm: lắp anode hi sinh Zn/Mg + sơn epoxy + kiểm soát pH đất.\nThân tàu thép: mạ kẽm + sơn biển; thay anode định kỳ để duy trì bảo vệ.\nNhà máy: khử oxy bằng N2/hoá chất, thêm ức chế (chromat, phosphat) cho hệ kín.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-8',
        type: 'infoBox',
        content: {
            title: 'Ôn bài tập',
            content: 'Vẽ sơ đồ pin ăn mòn Fe-Cu: anot/catot, dòng e, dòng ion, PTHH.\nChọn biện pháp bảo vệ cho cầu thép vs thùng chứa axit; giải thích lí do.\nTính khối lượng Zn hi sinh cần thiết trong 1 năm cho diện tích đã cho (dùng định luật Faraday).',
            color: 'gray',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Ăn mòn điện hoá xảy ra khi:',
      options: ['Kim loại khô trong không khí khô', 'Có hai điện cực và chất điện li tạo vi pin', 'Không có nước', 'Chỉ có khí CO2'],
      correctAnswer: 1,
      explanation: 'Cần dung dịch dẫn điện để hoàn mạch ion.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Trong cặp Fe-Cu tiếp xúc ẩm, kim loại bị ăn mòn mạnh là:',
      options: ['Fe', 'Cu', 'Cả hai như nhau', 'Không kim loại nào'],
      correctAnswer: 0,
      explanation: 'Fe có E° thấp hơn, làm anot, bị oxi hoá.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Mạ kẽm bảo vệ thép nhờ cơ chế kim loại hi sinh.',
      correctAnswer: true,
      explanation: 'Zn bị oxi hoá trước, bảo vệ thép.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phương trình catot trong gỉ sắt thường là:',
      options: ['O2 + 2H2O + 4e → 4OH-', 'Fe2+ + 2e → Fe', '2H+ + 2e → H2', 'Cl2 + 2e → 2Cl-'],
      correctAnswer: 0,
      explanation: 'Oxi hoá khử xảy ra trên bề mặt ẩm chứa oxy.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Bảo vệ catot áp dụng cho:',
      options: ['Ống dẫn ngầm', 'Kim loại quý', 'Vàng trang sức', 'Vật nhỏ gia dụng'],
      correctAnswer: 0,
      explanation: 'Ống thép ngầm nối với anode hi sinh Zn/Mg.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Al thụ động do lớp oxit bền.',
      correctAnswer: true,
      explanation: 'Al2O3 mỏng bảo vệ Al khỏi ăn mòn tiếp.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Chất ức chế ăn mòn hoạt động bằng cách:',
      options: ['Tăng tốc ăn mòn', 'Hình thành màng bảo vệ hoặc giảm tốc phản ứng điện cực', 'Làm kim loại hoạt động hơn', 'Tăng pH luôn'],
      correctAnswer: 1,
      explanation: 'Ức chế hấp phụ, tạo che chắn, giảm dòng ăn mòn.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Gỉ sắt có thành phần chính là Fe2O3·n______. ',
      correctAnswer: 'H2O',
      explanation: 'Gỉ là oxit ngậm nước.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Vì sao Fe trong HNO3 đặc nguội bị thụ động?',
      options: ['Không có O2', 'Lớp oxit bền được tạo ra', 'Do Fe tan nhanh', 'Do HNO3 yếu'],
      correctAnswer: 1,
      explanation: 'HNO3 đặc oxi hoá bề mặt tạo màng bảo vệ.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Ăn mòn hoá học không cần chất điện li.',
      correctAnswer: true,
      explanation: 'Xảy ra trực tiếp trong khí khô/khí ăn mòn.',
      points: 10
    }
  ]
};
