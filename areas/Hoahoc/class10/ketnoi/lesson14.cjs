module.exports = {
  classId: 10,
  curriculumType: 'ketnoi',
  chapterId: 3,
  chapterName: 'Chương 3: Liên kết hóa học',
  lessonId: 14,
  title: 'Bài 14: Ôn tập chương 3',
  description: 'Ôn nhanh chương 3: octet, ion, cộng hoá trị, H-bond và van der Waals kèm lỗi thường gặp.',
  level: 'Intermediate',
  order: 5,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Ôn tập chương 3',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Checklist: nhận diện loại liên kết, ngoại lệ octet, xu hướng cực/không cực, và vai trò liên kết yếu.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Octet & phân loại liên kết',
            content: 'Octet: đạt 8e (H/He: 2e); ngoại lệ thiếu (B, Be, NO) và giãn (PCl5, SF6, SO3).\nΔEN lớn → ion; ΔEN vừa → cộng hoá trị có cực; rất nhỏ → không cực.\nKhung Lewis: đếm e hoá trị, vẽ liên kết đơn, phân bổ e, tăng bậc nếu thiếu octet.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'warningBox',
        content: {
            title: 'Ion vs cộng hoá trị',
            content: 'Ion: mạng tinh thể, T nóng chảy cao, dẫn điện khi nóng chảy/hoà tan, giòn.\nCộng hoá trị: dùng chung e; liên kết đôi/ba bền và ngắn hơn đơn.\nHình học VSEPR ảnh hưởng mômen tổng (CO2 thẳng → μ=0; H2O gấp khúc → μ≠0).',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Liên kết H & van der Waals',
            content: 'H-bond: H gắn F/O/N + cặp e tự do → tăng T sôi, độ tan (H2O, HF, ROH).\nvan der Waals: luôn có; London mạnh hơn khi phân tử lớn/chuỗi thẳng.\nThứ tự bền: ion≈cộng hoá trị > H-bond > lưỡng cực > London.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Lỗi hay gặp',
            content: 'CO2 có liên kết cực nhưng phân tử không cực do hình học thẳng.\nÉp chu kỳ 2 giãn octet (không hợp lệ).\nGọi H-bond chỉ vì có O/N nhưng H không gắn trực tiếp (CH3-O-CH3 không có H-bond liên phân tử mạnh).',
            color: 'gray',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Chất nào sôi cao do liên kết hydrogen mạnh?',
      options: ['CH4', 'H2S', 'H2O', 'CO2'],
      correctAnswer: 2,
      explanation: 'H2O có mạng H-bond rộng → nhiệt độ sôi cao bất thường.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Liên kết nào chủ yếu trong Na2O?',
      options: ['Ion', 'Cộng hóa trị không cực', 'Cộng hóa trị có cực', 'Kim loại'],
      correctAnswer: 0,
      explanation: 'Na+ và O2- tạo tinh thể ion.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Phân tử CO2 có liên kết cộng hóa trị và mômen lưỡng cực khác 0.',
      correctAnswer: false,
      explanation: 'Liên kết C=O có cực nhưng dạng thẳng → tổng mômen = 0.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Ngoại lệ octet “thiếu” điển hình là:',
      options: ['BF3', 'SF6', 'PCl5', 'CO2'],
      correctAnswer: 0,
      explanation: 'BF3: B chỉ có 6e lớp ngoài.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phân tử thỏa mãn octet nhưng vẫn phân cực là:',
      options: ['Cl2', 'CH4', 'HCl', 'CO2'],
      correctAnswer: 2,
      explanation: 'HCl đủ e nhưng ΔEN lớn → phân cực.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Chất nào có mômen lưỡng cực bằng 0?',
      options: ['H2O', 'NH3', 'CO2', 'HCl'],
      correctAnswer: 2,
      explanation: 'CO2 thẳng; hai mômen đối xứng triệt tiêu.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'H-bond chỉ xuất hiện khi H gắn trực tiếp với F/O/N.',
      correctAnswer: true,
      explanation: 'Điều kiện: H phải liên kết cộng hoá trị với F/O/N.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Lực nào yếu nhất trong các loại liên kết/ tương tác sau?',
      options: ['Cộng hoá trị', 'Liên kết ion', 'Van der Waals (London)', 'Liên kết kim loại'],
      correctAnswer: 2,
      explanation: 'Lực London yếu hơn H-bond, ion, kim loại, cộng hoá trị.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Dự đoán tính dẫn điện: chất ion rắn ở 25°C sẽ:',
      options: ['Dẫn tốt', 'Không dẫn, chỉ dẫn khi nóng chảy/hoà tan', 'Không bao giờ dẫn', 'Chỉ dẫn khi ép mạnh'],
      correctAnswer: 1,
      explanation: 'Ion bị cố định ở trạng thái rắn; dẫn khi ion tự do.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Khi chênh lệch độ âm điện rất nhỏ, liên kết thường là cộng hoá trị không cực.',
      correctAnswer: true,
      explanation: 'Độ âm điện gần nhau → mật độ e phân bố đối xứng.',
      points: 10
    }
  ]
};
