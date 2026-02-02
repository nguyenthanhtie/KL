module.exports = {
  classId: 9,
  curriculumType: 'ketnoi',
  chapterId: 6,
  chapterName: 'Chương 6: Kim loại. Sự khác nhau cơ bản giữa phi kim và kim loại',
  lessonId: 18,
  title: 'Bài 18: Tính chất chung của kim loại',
  description: 'Ôn tính chất vật lí, hoá học cơ bản và ứng dụng của kim loại.',
  level: 'Intermediate',
  order: 1,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: '⚙️ Tính chất chung của kim loại',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Mục tiêu: ôn cấu trúc, tính chất vật lí/hoá học đặc trưng của kim loại và liên hệ ứng dụng.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Cấu trúc & vật lí',
            content: 'Mạng tinh thể kim loại, electron tự do → dẫn điện, dẫn nhiệt tốt.\nÁnh kim, dẻo (kéo sợi, dát mỏng); đa số có tnc cao trừ Hg lỏng.\nKhối lượng riêng thay đổi: Al nhẹ, Fe trung bình, Pb nặng.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'warningBox',
        content: {
            title: 'Hoá học chung',
            content: 'Phản ứng với phi kim: 2Mg + O₂ → 2MgO; 2Al + 3Cl₂ → 2AlCl₃.\nPhản ứng với axit loãng (trước H): Zn + 2HCl → ZnCl₂ + H₂.\nThay thế kim loại yếu hơn trong muối: Fe + CuSO₄ → FeSO₄ + Cu.',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Hoạt động hoá học',
            content: 'Dựa vào dãy hoạt động: K, Na, Ca rất mạnh; Cu, Ag yếu.\nDạng bột phản ứng nhanh hơn dạng khối do tăng diện tích tiếp xúc.\nAl, Fe tạo màng oxit mỏng bảo vệ, giảm phản ứng bề mặt.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Ứng dụng & an toàn',
            content: 'Fe/thép: xây dựng, máy móc; Cu/Al: dây dẫn; Ti: y sinh.\nBảo quản: tránh ẩm để hạn chế ăn mòn; phủ sơn/mạ kẽm.\nAn toàn: kim loại kiềm phản ứng mạnh với nước → bảo quản trong dầu.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Bảng tóm tắt nhanh',
            content: 'Vật lí: ánh kim, dẫn điện/nhiệt, dẻo; Hg lỏng là ngoại lệ.\nHoá học: phản ứng với phi kim, axit, và thay thế kim loại yếu hơn.\nHoạt động phụ thuộc vị trí trong dãy; màng oxit có thể bảo vệ.',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-8',
        type: 'infoBox',
        content: {
            title: '',
            content: '**Gợi ý hình**:\nThí nghiệm Mg cháy và Fe đẩy Cu: */images/hoahoc9/lesson18-reactions.png*\nSo sánh dây Cu vs Al dẫn điện: */images/hoahoc9/lesson18-conductivity.png*',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-9',
        type: 'warningBox',
        content: {
            title: 'Mini quiz đọc nhanh',
            content: 'Vì sao Al ít bị gỉ trong không khí ẩm?\nViết PTHH Fe phản ứng với HCl loãng.\nKim loại nào cần bảo quản trong dầu hỏa? Giải thích.\nÔn nhanh trước khi làm bộ trắc nghiệm.',
            color: 'orange',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Tính chất vật lí nào đặc trưng của kim loại?',
      options: ['Ánh kim, dẫn điện', 'Dễ bay hơi', 'Mùi khai', 'Tính axit mạnh'],
      correctAnswer: 0,
      explanation: 'Kim loại có ánh kim và dẫn điện, dẫn nhiệt tốt.'
    },
    {
      type: 'multiple-choice',
      question: 'Kim loại nào là lỏng ở điều kiện thường?',
      options: ['Fe', 'Cu', 'Hg', 'Al'],
      correctAnswer: 2,
      explanation: 'Thuỷ ngân (Hg) lỏng ở 25°C.'
    },
    {
      type: 'true-false',
      question: 'Kim loại đứng trước H trong dãy hoạt động có thể đẩy H2 khỏi axit loãng.',
      correctAnswer: true,
      explanation: 'Đúng, ví dụ Zn + 2HCl → ZnCl2 + H2.'
    },
    {
      type: 'fill-in-blank',
      question: 'Phản ứng 2Al + 3Cl2 → ___AlCl3',
      correctAnswer: '2',
      explanation: 'Hệ số là 2AlCl3.'
    },
    {
      type: 'multiple-choice',
      question: 'Ứng dụng kim loại dẫn điện phổ biến nhất:',
      options: ['Fe', 'Cu', 'Au', 'Ti'],
      correctAnswer: 1,
      explanation: 'Đồng (Cu) được dùng làm dây điện phổ biến nhất.'
    },
    {
      type: 'multiple-choice',
      question: 'Kim loại nào thường được đặt làm catot hi sinh chống han?',
      options: ['Zn', 'Na', 'Hg', 'Mg'],
      correctAnswer: 0,
      explanation: 'Kẽm phủ thép (mạ kẽm) để chống gỉ, đóng vai trò catot hi sinh.'
    },
    {
      type: 'true-false',
      question: 'Kim loại dạng bột phản ứng với oxi nhanh hơn dạng thỏi.',
      correctAnswer: true,
      explanation: 'Dạng bột có diện tích tiếp xúc lớn nên dễ bị oxi hoá hơn.'
    },
    {
      type: 'multiple-choice',
      question: 'Dãy hoạt động hoá học sắp xếp kim loại theo:',
      options: ['Độ nặng', 'Bán kính nguyên tử', 'Độ dễ bị oxi hoá', 'Khối lượng riêng'],
      correctAnswer: 2,
      explanation: 'Kim loại đứng đầu dãy dễ bị oxi hoá (nhường electron) nhất.'
    },
    {
      type: 'fill-in-blank',
      question: 'Phản ứng Fe + CuSO4 → FeSO4 + ___',
      correctAnswer: 'Cu',
      explanation: 'Fe đẩy Cu khỏi muối, tạo Cu kim loại tự do.'
    },
    {
      type: 'multiple-choice',
      question: 'Tính chất nào không phải của đa số kim loại?',
      options: ['Ánh kim', 'Dẫn nhiệt', 'Dễ bay hơi', 'Dễ uốn kéo sợi'],
      correctAnswer: 2,
      explanation: 'Kim loại hầu hết không bay hơi (trừ Hg lỏng nhưng cũng không bay hơi mạnh).'
    }
  ]
};
