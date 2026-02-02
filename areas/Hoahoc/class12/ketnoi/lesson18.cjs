module.exports = {
  classId: 12,
  curriculumType: 'ketnoi',
  chapterId: 6,
  chapterName: 'Chương 6: Đại cương về kim loại',
  lessonId: 18,
  title: 'Bài 18: Cấu tạo kim loại',
  description: 'Mạng tinh thể kim loại, liên kết kim loại, tính chất tập thể.',
  level: 'Intermediate',
  order: 18,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Cấu tạo kim loại',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Khám phá "biển electron" trong mạng tinh thể kim loại và cách cấu trúc ảnh hưởng đến tính chất.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Mạng tinh thể',
            content: 'Dạng phổ biến: lập phương tâm khối (Fe α), lập phương tâm diện (Cu, Al), lục phương (Mg, Ti).\nIon kim loại dương nằm ở nút, electron tự do chuyển động khắp mạng.\nMật độ xếp chặt (FCC, HCP) → dẻo tốt; BCC ít xếp chặt → cứng hơn ở T thấp.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'infoBox',
        content: {
            title: 'Liên kết kim loại',
            content: 'Không định hướng; electron tự do gắn kết cation kim loại.\nGiải thích tính dẫn điện, dẫn nhiệt, ánh kim, dẻo.\nTạp chất, sai hỏng mạng (khuyết tật, biên hạt) làm biến đổi độ cứng/dẻo.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Ảnh hưởng cấu trúc',
            content: 'Kích thước hạt nhỏ → tăng độ bền (cản trở chuyển vị) nhưng giảm độ dẻo.\nLàm nguội nhanh tạo dung dịch rắn quá bão hoà, biến cứng nguội.\nTrượt mạng (slip) giải thích tính dẻo; kim loại FCC dễ trượt hơn BCC.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'So sánh mạng & tính chất',
            content: 'FCC/HCP: xếp chặt, dẻo, nhiều mặt trượt (Cu, Al, Au, Mg); BCC: ít mặt trượt, cứng hơn ở T thấp (Feα, Cr).\nÁnh kim/dẫn điện: do biển electron; tăng tạp chất → tăng điện trở.\nĐộ cứng tăng khi giảm kích thước hạt (Hall-Petch) đến giới hạn nano.',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Case & ứng dụng',
            content: 'Thép cán nguội cứng hơn cán nóng do biến cứng nguội; cần ủ để phục hồi dẻo.\nVật liệu nano: hạt Cu nano tăng bền nhưng dễ oxy hoá, cần phủ bảo vệ.\nDây dẫn điện: cần độ dẫn cao nên dùng Cu tinh khiết, giảm tạp chất và khuyết tật.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-8',
        type: 'infoBox',
        content: {
            title: 'Ôn bài tập',
            content: 'Xác định kiểu mạng từ tính chất dẻo/cứng, nhiệt độ chuyển pha (Fe: BCC↔FCC).\nGiải thích hiện tượng: vì sao Al nhẹ nhưng bền (FCC + màng oxit bảo vệ).\nLiên hệ sai hỏng mạng (biên hạt, khuyết tật điểm) với khuếch tán và ăn mòn.',
            color: 'gray',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Kiểu mạng của Cu và Al thường là:',
      options: ['Lập phương tâm khối', 'Lập phương tâm diện', 'Lục phương', 'Tetragonal'],
      correctAnswer: 1,
      explanation: 'Cu, Al có mạng FCC → dẻo tốt.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Tính dẻo cao của kim loại do:',
      options: ['Liên kết cộng hoá trị', 'Liên kết kim loại không định hướng', 'Liên kết ion', 'Liên kết hiđro'],
      correctAnswer: 1,
      explanation: 'Liên kết kim loại cho phép các lớp trượt mà không phá vỡ cấu trúc.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Mạng HCP có độ xếp chặt cao.',
      correctAnswer: true,
      explanation: 'HCP và FCC có hệ số xếp chặt ~0.74.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Yếu tố làm tăng độ cứng kim loại:',
      options: ['Tinh thể lớn', 'Tăng khuyết tật, hạt nhỏ', 'Giảm biên hạt', 'Giảm sai hỏng mạng'],
      correctAnswer: 1,
      explanation: 'Khuyết tật, hạt nhỏ cản trở chuyển vị → cứng hơn.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Tính chất nào không phải do "biển electron"?',
      options: ['Dẫn điện', 'Ánh kim', 'Dẻo', 'Tính bay hơi cao'],
      correctAnswer: 3,
      explanation: 'Kim loại không bay hơi cao ở thường; ba tính còn lại do electron tự do.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'BCC ít mặt trượt hơn FCC nên thường cứng hơn ở nhiệt độ thấp.',
      correctAnswer: true,
      explanation: 'Ít mặt trượt → khó biến dạng dẻo.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Biện pháp tăng độ dẻo kim loại:',
      options: ['Biến cứng nguội', 'Ủ tái kết tinh', 'Tăng tạp chất', 'Làm nguội đột ngột'],
      correctAnswer: 1,
      explanation: 'Ủ tái kết tinh khôi phục hạt mới, giảm khuyết tật.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Electron tự do trong kim loại tạo nên tính ______ điện.',
      correctAnswer: 'dẫn',
      explanation: 'Electron chuyển động tự do mang dòng.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Kim loại có ánh kim vì:',
      options: ['Hấp thụ hết ánh sáng', 'Phản xạ mạnh do electron tự do', 'Có màu cố định', 'Có khối lượng riêng lớn'],
      correctAnswer: 1,
      explanation: 'Electron tự do phản xạ bức xạ điện từ.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Khuyết tật mạng làm thay đổi tính chất cơ học kim loại.',
      correctAnswer: true,
      explanation: 'Khuyết tật ảnh hưởng độ cứng, dẻo, khuếch tán.',
      points: 10
    }
  ]
};
