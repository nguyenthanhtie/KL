module.exports = {
  classId: 11,
  curriculumType: 'ketnoi',
  chapterId: 1,
  chapterName: 'Chương 1: Cân bằng hoá học',
  lessonId: 3,
  title: 'Bài 3: Ôn tập chương 1',
  description: 'Tóm tắt cân bằng động, hằng số K, Q và ứng dụng Le Chatelier.',
  level: 'Intermediate',
  order: 3,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Ôn tập cân bằng hoá học',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'infoBox',
        content: {
            title: 'Nhận diện & biểu thức K',
            content: 'Phản ứng thuận nghịch trong hệ kín mới đạt cân bằng động.\nViết $K_c, K_p$: đưa hệ số phản ứng thành số mũ, bỏ chất rắn/lỏng tinh khiết.\nSo sánh Q và K để dự đoán chiều dịch chuyển.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-3',
        type: 'warningBox',
        content: {
            title: 'Le Chatelier nhanh',
            content: 'Tăng nồng độ chất phản ứng → dịch phải; tăng sản phẩm → dịch trái.\nGiảm thể tích (tăng áp) → ưu tiên phía có ít mol khí hơn.\nNhiệt độ: phản ứng thu nhiệt dịch phải khi tăng T; toả nhiệt dịch trái khi tăng T.\nXúc tác: không làm đổi K, chỉ đạt cân bằng nhanh hơn.',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'infoBox',
        content: {
            title: 'Dung dịch & kết tủa',
            content: 'pH: pH + pOH = 14 (25°C); Ka·Kb = Kw.\nKsp: so Qsp với Ksp để xét kết tủa; ion chung làm giảm độ tan.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Lỗi thường gặp',
            content: 'Đưa chất rắn/tinh khiết vào K.\nNhầm hướng dịch chuyển áp suất: phải so tổng mol khí hai vế.\nHiểu sai vai trò xúc tác: không thay đổi K.',
            color: 'gray',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Phản ứng nào dưới đây không thể thiết lập cân bằng trong điều kiện thường?',
      options: ['N2 + 3H2 ⇌ 2NH3', 'CaCO3(r) ⇌ CaO(r) + CO2(k)', 'HCl + NaOH → NaCl + H2O', '2SO2 + O2 ⇌ 2SO3'],
      correctAnswer: 2,
      explanation: 'HCl + NaOH gần như một chiều, không quay lại đáng kể.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Với phản ứng A ⇌ 2B, khi giảm thể tích (tăng áp) hệ sẽ:',
      options: ['Dịch phải', 'Dịch trái', 'Không đổi', 'Tuỳ nhiệt độ'],
      correctAnswer: 1,
      explanation: 'Phía trái 1 mol khí, phải 2 mol; tăng áp ưu tiên phía ít mol → dịch trái.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Thêm xúc tác làm giảm thời gian đạt cân bằng nhưng không đổi K.',
      correctAnswer: true,
      explanation: 'Xúc tác hạ Ea cho cả hai chiều, giá trị K giữ nguyên.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Ở 25°C, dung dịch có pH = 3 thì [H+] xấp xỉ:',
      options: ['1,0×10^{-3} M', '1,0×10^{-11} M', '1,0×10^{-7} M', '1,0×10^{3} M'],
      correctAnswer: 0,
      explanation: 'pH = 3 → [H+] ≈ 10^{-3} M.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Với phản ứng thu nhiệt, tăng nhiệt độ sẽ làm:',
      options: ['Dịch chuyển thuận và K tăng', 'Dịch chuyển nghịch và K tăng', 'Dịch chuyển thuận và K giảm', 'Không đổi'],
      correctAnswer: 0,
      explanation: 'Thu nhiệt coi như “nhận nhiệt” phía sản phẩm → T tăng làm K tăng, dịch thuận.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng 2NO2 ⇌ N2O4 có K = 7,0 ở 25°C. Nếu Q = 10, chiều chuyển dịch là:',
      options: ['Thuận', 'Nghịch', 'Đã cân bằng', 'Không xác định'],
      correctAnswer: 1,
      explanation: 'Q > K → dịch trái (tạo NO2).',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Trong Ksp của BaSO4 không xuất hiện chất rắn BaSO4.',
      correctAnswer: true,
      explanation: 'BaSO4 rắn có hoạt độ 1, không đưa vào biểu thức Ksp.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Khi tăng nồng độ sản phẩm, hệ sẽ:',
      options: ['Dịch chuyển tạo thêm sản phẩm', 'Dịch chuyển về phía chất phản ứng', 'Không đổi', 'K giảm'],
      correctAnswer: 1,
      explanation: 'Le Chatelier: tăng sản phẩm → dịch trái để giảm nồng độ sản phẩm.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Quan hệ đúng giữa Kp và Kc với Δn = (mol khí sp) - (mol khí chất tham gia):',
      options: ['Kp = Kc', 'Kp = Kc (RT)^{-Δn}', 'Kp = Kc (RT)^{Δn}', 'Kp = 1/Kc'],
      correctAnswer: 2,
      explanation: 'Kp = Kc (RT)^{Δn} (với R theo mol·K, T tuyệt đối).',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Ion chung làm ______ độ tan của muối ít tan.',
      correctAnswer: 'giảm',
      explanation: 'Thêm ion chung dịch cân bằng về chất rắn → giảm tan.',
      points: 10
    }
  ]
};
