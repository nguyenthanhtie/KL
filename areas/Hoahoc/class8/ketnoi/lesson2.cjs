module.exports = {
  classId: 8,
  curriculumType: 'ketnoi',
  chapterId: 2,
  chapterName: "Chương 2: Phản ứng hóa học",
  lessonId: 2,
  title: 'Bài 2: Phản ứng hóa học',
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: '⚡ Bài 2: Phản ứng hóa học',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Mục tiêu: nhận diện phản ứng qua dấu hiệu, phân loại 4 nhóm chính, và ghi nhớ ví dụ tiêu biểu.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Dấu hiệu nhận biết',
            content: 'Xuất hiện chất mới: khí, kết tủa, dung dịch đổi màu.\nThay đổi nhiệt: tỏa/thu nhiệt; có thể phát sáng.\nThay đổi mùi, âm thanh (xì khí).',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'infoBox',
        content: {
            title: 'Điều kiện xảy ra',
            content: 'Tiếp xúc giữa các chất.\nNhiệt độ/áp suất phù hợp.\nXúc tác (nếu cần) để hạ năng lượng hoạt hóa.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: '4 kiểu phản ứng - nhớ nhanh',
            content: '**Hóa hợp:** A + B → AB (ghép lại). Ví dụ: 2H₂ + O₂ → 2H₂O.\n**Phân hủy:** AB → A + B (tách ra). Ví dụ: CaCO₃ → CaO + CO₂.\n**Thế:** AB + C → AC + B (C thế B). Ví dụ: Zn + 2HCl → ZnCl₂ + H₂.\n**Trao đổi:** AB + CD → AD + CB (hoán vị). Ví dụ: AgNO₃ + NaCl → AgCl↓ + NaNO₃.',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'warningBox',
        content: {
            title: 'Ghi nhớ nhanh',
            content: 'Nhìn - Nghe - Sờ nhiệt: đổi màu, có khí, ấm/nóng.\nTrao đổi chỉ xảy ra khi tạo kết tủa/khí/điện li yếu.\nPhân hủy thường cần nhiệt/xúc tác.',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Mini quiz đọc nhanh',
            content: 'Vì sao phản ứng trao đổi cần kết tủa/khí?\nPhản ứng Zn + 2HCl thuộc loại gì?\nDấu hiệu nhanh nhận ra phản ứng phân hủy CaCO₃?\nTự trả lời trước khi làm bài test 10 câu.',
            color: 'blue',
            listType: 'number'
        }
    }
  ],
  game: [
    {
      question: 'Phản ứng hóa học là gì?',
      options: [
        'Quá trình biến đổi vật lý',
        'Quá trình biến đổi từ chất này thành chất khác',
        'Sự hòa tan',
        'Sự bay hơi'
      ],
      correctAnswer: 1
    },
    {
      question: 'Dấu hiệu nào không phải phản ứng hóa học?',
      options: ['Có khí thoát', 'Có kết tủa', 'Nước đá tan', 'Thay đổi màu'],
      correctAnswer: 2
    },
    {
      question: 'Phản ứng CaCO₃ → CaO + CO₂ thuộc loại?',
      options: ['Hóa hợp', 'Phân hủy', 'Thế', 'Trao đổi'],
      correctAnswer: 1
    },
    {
      question: 'Dấu hiệu nào sau đây chứng tỏ có phản ứng xảy ra?',
      options: ['Dung dịch đổi màu, có khí/ kết tủa', 'Chỉ khuấy mạnh hơn', 'Để yên không có gì', 'Nhiệt độ phòng ổn định'],
      correctAnswer: 0
    },
    {
      question: 'Phản ứng A + B → AB là kiểu:',
      options: ['Hóa hợp', 'Phân hủy', 'Thế', 'Trao đổi'],
      correctAnswer: 0
    },
    {
      question: 'Phản ứng trao đổi xảy ra khi nào?',
      options: ['Không điều kiện', 'Có kết tủa/khí/điện li yếu tạo thành', 'Chỉ khi có xúc tác', 'Chỉ ở 100°C'],
      correctAnswer: 1
    },
    {
      question: 'Ví dụ phản ứng thế:',
      options: ['2H₂ + O₂ → 2H₂O', 'CaCO₃ → CaO + CO₂', 'Zn + 2HCl → ZnCl₂ + H₂', 'AgNO₃ + NaCl → AgCl↓ + NaNO₃'],
      correctAnswer: 2
    },
    {
      question: 'Trong phản ứng hóa học, liên kết giữa các nguyên tử:',
      options: ['Giữ nguyên', 'Bị bẻ gãy và hình thành liên kết mới', 'Chỉ thay đổi màu sắc', 'Chỉ thay đổi trạng thái'],
      correctAnswer: 1
    },
    {
      question: 'Đốt Mg cháy sáng tạo MgO là phản ứng:',
      options: ['Hóa hợp', 'Phân hủy', 'Thế', 'Trao đổi'],
      correctAnswer: 0
    },
    {
      question: 'Phản ứng phân hủy thường cần:',
      options: ['Nhiệt hoặc xúc tác để tách chất', 'Hòa tan trong nước', 'Chỉ cần khuấy', 'Giảm áp suất'],
      correctAnswer: 0
    }
  ]
};
