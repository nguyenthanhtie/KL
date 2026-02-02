module.exports = {
  classId: 10,
  curriculumType: 'ketnoi',
  chapterId: 3,
  chapterName: 'Chương 3: Liên kết hóa học',
  lessonId: 12,
  title: 'Bài 12: Liên kết cộng hóa trị',
  description: 'Liên kết cộng hoá trị: dùng chung e, phân cực/không cực, bội liên kết.',
  level: 'Intermediate',
  order: 3,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Liên kết cộng hóa trị',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Mục tiêu: phân biệt liên kết đơn/đôi/ba, cực/không cực, hiểu hình học phân tử cơ bản (VSEPR) và ứng dụng Lewis.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Bản chất & phân loại',
            content: 'Dùng chung cặp e giữa các nguyên tử (thường phi kim hoặc H).\nLiên kết đơn/đôi/ba: 1/2/3 cặp e chung → bền và ngắn dần.\nLiên kết phối trí: một nguyên tử cho cả cặp e chung (vd: CO, NH4+).',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'warningBox',
        content: {
            title: 'Cực hay không cực',
            content: 'Không cực khi ΔEN rất nhỏ (H2, Cl2, CH4 gần đối xứng).\nCó cực khi ΔEN vừa phải (HCl, H2O); mômen lưỡng cực phụ thuộc hình học.\nPhân tử có thể không cực dù liên kết có cực nếu hình học đối xứng (CO2, CCl4).',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Hình học (VSEPR cơ bản)',
            content: '2 miền e (AX2) → thẳng (CO2).\n3 miền e (AX3/AX2E) → tam giác phẳng / gấp khúc (SO2).\n4 miền e (AX4/AX3E/AX2E2) → tứ diện / tháp tam giác / gấp khúc (CH4, NH3, H2O).',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Công thức Lewis & lưu ý',
            content: 'Đếm e hoá trị, vẽ khung, phân bổ e ngoài → trung tâm, tăng bậc nếu thiếu octet.\nKiểm tra mômen tổng: liên kết có cực nhưng hình học đối xứng → phân tử không cực.\nNguyên tử chu kỳ 2 không giãn octet; phân tử e lẻ (NO) không đủ 8e cho mọi nguyên tử.',
            color: 'gray',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Phân tử nào có liên kết cộng hóa trị không cực?',
      options: ['HCl', 'NaCl', 'Cl2', 'H2O'],
      correctAnswer: 2,
      explanation: 'Cl2 gồm 2 nguyên tử có độ âm điện bằng nhau → không cực.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Số cặp e dùng chung trong liên kết ba là?',
      options: ['1', '2', '3', '4'],
      correctAnswer: 2,
      explanation: 'Liên kết ba gồm 3 cặp electron chung (ví dụ N≡N).',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Liên kết cộng hóa trị chỉ xuất hiện giữa phi kim.',
      correctAnswer: false,
      explanation: 'Chủ yếu giữa phi kim, nhưng cũng có trong hợp chất kim loại thấp hóa trị (CO).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Liên kết cộng hóa trị hình thành khi:',
      options: ['Nguyên tử trao đổi e', 'Nguyên tử dùng chung e', 'Nguyên tử tách e tự do', 'Nguyên tử chuyển động hỗn loạn'],
      correctAnswer: 1,
      explanation: 'Bản chất là dùng chung cặp e giữa các nguyên tử.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Hình dạng phân tử H2O bị bẻ góc do:',
      options: ['Không có cặp e tự do', '2 cặp e tự do trên O đẩy liên kết', '3 liên kết đôi', 'Không phân cực'],
      correctAnswer: 1,
      explanation: '2 cặp e tự do tạo lực đẩy lớn, góc H-O-H ~104,5°.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phân tử nào có liên kết cộng hoá trị phân cực?',
      options: ['Cl2', 'H2', 'O2', 'HCl'],
      correctAnswer: 3,
      explanation: 'Độ âm điện H ≠ Cl → liên kết có cực.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Liên kết đôi ngắn hơn và mạnh hơn liên kết đơn.',
      correctAnswer: true,
      explanation: 'Nhiều cặp e chung hơn → lực hút lớn hơn → liên kết ngắn, bền.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Công thức Lewis giúp:',
      options: ['Tính khối lượng mol', 'Biểu diễn cặp e liên kết và không liên kết', 'Tính độ âm điện', 'Tính năng lượng ion hoá'],
      correctAnswer: 1,
      explanation: 'Lewis hiển thị cặp e chung và cặp e tự do.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Liên kết trong phân tử CO có đặc điểm:',
      options: ['Ion hoàn toàn', 'Cộng hoá trị phối trí và liên kết ba', 'Kim loại', 'Vander Waals'],
      correctAnswer: 1,
      explanation: 'CO có liên kết ba với một liên kết phối trí từ O → C.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Khi ΔEN giữa hai nguyên tử khoảng 0,5-1,7, thường tạo:',
      options: ['Liên kết ion', 'Liên kết cộng hoá trị phân cực', 'Liên kết kim loại', 'Không hình thành liên kết'],
      correctAnswer: 1,
      explanation: 'Chênh lệch vừa phải → cộng hoá trị có cực.',
      points: 10
    }
  ]
};
