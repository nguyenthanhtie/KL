module.exports = {
  classId: 8,
  curriculumType: 'ketnoi',
  chapterId: 2,
  chapterName: "Chương 2: Phản ứng hóa học",
  lessonId: 4,
  title: 'Bài 4: Dung dịch và nồng độ',
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: '💧 Bài 4: Dung dịch và nồng độ',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Mục tiêu: hiểu dung dịch, độ tan, tính C% và thao tác pha loãng/cô đặc an toàn.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Khái niệm & độ tan',
            content: 'Dung dịch: hỗn hợp đồng nhất (dung môi + chất tan).\nĐộ tan S: g chất tan tối đa trong 100 g nước ở nhiệt độ xác định.\nBão hòa: không tan thêm ở nhiệt độ đó.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'infoBox',
        content: {
            title: 'Nồng độ khối lượng (C%)',
            content: '**C% = m(ct)/m(dd) × 100%**.\nm(dd) = m(ct) + m(dm).\nTra cứu nhanh: 200 g dd 10% ⇒ 20 g chất tan.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Pha loãng - Cô đặc',
            content: '**Pha loãng:** thêm dung môi, m(ct) giữ nguyên ⇒ C% giảm.\n**Cô đặc:** bay hơi bớt dung môi ⇒ C% tăng.\nVí dụ: 100 g dd 20% xuống 10% ⇒ m(ct)=20 g ⇒ m(dd mới)=200 g ⇒ thêm 100 g nước.',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'warningBox',
        content: {
            title: 'Ghi nhớ nhanh',
            content: 'Đọc kỹ đơn vị: g, g/100g, %.\nMọi phép tính C% phải cộng khối lượng dung môi.\nKhông trộn lung tung dung dịch khác loại nếu không biết phản ứng.',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Mini quiz đọc nhanh',
            content: '200 g dd KCl 8% có bao nhiêu g KCl?\nMuốn giảm 15% xuống 10%, thêm hay bớt gì?\nBão hòa nghĩa là gì?\nTự trả lời trước khi vào 10 câu test.',
            color: 'blue',
            listType: 'number'
        }
    }
  ],
  game: [
    {
      question: 'C% cho biết gì?',
      options: ['g chất tan/100 g dung dịch', 'mol chất tan/1 L dung dịch', 'g dung môi/100 g dung dịch', 'mL chất tan/1 L dung dịch'],
      correctAnswer: 0
    },
    {
      question: 'Dung dịch bão hòa là:',
      options: ['Tan vô hạn', 'Không tan thêm ở nhiệt độ đó', 'Luôn loãng', 'Chỉ có chất rắn'],
      correctAnswer: 1
    },
    {
      question: 'Công thức tính C% là:',
      options: ['C% = m(dd)/m(ct)', 'C% = m(ct)/m(dd) × 100%', 'C% = m(dd)/100', 'C% = m(ct) × m(dd)'],
      correctAnswer: 1
    },
    {
      question: 'Độ tan S là:',
      options: ['g chất tan/100 g dung dịch', 'g chất tan/100 g nước ở nhiệt độ xác định', 'mol/L dung dịch', 'g chất tan/1 L dung môi'],
      correctAnswer: 1
    },
    {
      question: 'Để pha 200 g dung dịch NaCl 5%, khối lượng NaCl cần là:',
      options: ['5 g', '10 g', '20 g', '50 g'],
      correctAnswer: 2
    },
    {
      question: 'Pha loãng dung dịch nghĩa là:',
      options: ['Tăng m chất tan', 'Giảm m chất tan', 'Tăng dung môi, m(ct) giữ nguyên', 'Giảm dung môi, m(ct) giữ nguyên'],
      correctAnswer: 2
    },
    {
      question: 'Dung dịch bão hòa đặc trưng bởi:',
      options: ['Tan vô hạn', 'Không tan thêm ở nhiệt độ đó', 'Chỉ có khí', 'Luôn đặc'],
      correctAnswer: 1
    },
    {
      question: 'm(dung dịch) được tính bằng:',
      options: ['m(ct) + m(dm)', 'm(ct) − m(dm)', 'm(ct) × m(dm)', 'm(ct)/m(dm)'],
      correctAnswer: 0
    },
    {
      question: 'C% cho biết:',
      options: ['Khối lượng dung môi', 'Tỉ lệ % khối lượng chất tan trong toàn dung dịch', 'Thể tích dung dịch', 'Nồng độ mol'],
      correctAnswer: 1
    },
    {
      question: 'Nếu C% tăng khi cô đặc dung dịch, điều này do:',
      options: ['Thêm nước', 'Bay hơi bớt dung môi', 'Thêm chất tan', 'Giảm nhiệt độ'],
      correctAnswer: 1
    }
  ]
};
