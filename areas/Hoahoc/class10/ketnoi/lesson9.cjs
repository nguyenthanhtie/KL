module.exports = {
  classId: 10,
  curriculumType: 'ketnoi',
  chapterId: 2,
  chapterName: 'Chương 2: Bảng tuần hoàn các nguyên tố hóa học và định luật tuần hoàn',
  lessonId: 9,
  title: 'Bài 9: Ôn tập chương 2',
  description: 'Củng cố cấu trúc BTH và xu hướng tính chất theo chu kỳ/nhóm để dự đoán hoá trị.',
  level: 'Intermediate',
  order: 5,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Ôn tập chương 2',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Tóm tắt: cấu tạo BTH (Z tăng, khối s/p/d/f), xu hướng theo chu kỳ/nhóm, suy luận cấu hình e và hoá trị.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Theo chu kỳ',
            content: 'Bán kính giảm; IE, độ âm điện tăng (ngoại lệ nhỏ nhóm III, VI).\nTính kim loại giảm, phi kim tăng; oxit: bazơ → lưỡng tính → axit.\nSố oxi hóa cao nhất tăng theo số e hoá trị (1 → 7).',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'warningBox',
        content: {
            title: 'Theo nhóm',
            content: 'Bán kính tăng; IE, độ âm điện giảm; tính kim loại tăng (phi kim giảm).\nOxit/hiđroxit kim loại bazơ mạnh dần; phi kim axit yếu dần, tính khử tăng.\nCấu hình ngoài giữ dạng ns^a np^b → hoá tính tương tự.',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Suy luận nhanh',
            content: 'Từ vị trí nhóm/chu kỳ → viết cấu hình e, xác định e hoá trị.\nNhóm càng phải → oxit càng axit; càng trái → oxit bazơ mạnh.\nKhối d bắt đầu chu kỳ 4; khối f nằm tách dưới (lanthan/actini).',
            color: 'blue',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Nguyên tố X có cấu hình lớp ngoài ns2 np5 thuộc nhóm?',
      options: ['IIA', 'VA', 'VIA', 'VIIA'],
      correctAnswer: 3,
      explanation: 'ns2 np5 → 7 e hoá trị → nhóm VIIA (17).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Trong chu kỳ 3, nguyên tố có bán kính nhỏ nhất là?',
      options: ['Na', 'Mg', 'Al', 'Cl'],
      correctAnswer: 3,
      explanation: 'Từ trái sang phải bán kính giảm; Cl nhỏ nhất (trừ khí hiếm Ar).',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Độ âm điện tăng dần theo chiều từ trên xuống trong nhóm VIIA.',
      correctAnswer: false,
      explanation: 'Trong nhóm, độ âm điện giảm dần từ trên xuống.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Nguyên tố thuộc chu kỳ 4, nhóm IIA là:',
      options: ['Na', 'Mg', 'Ca', 'K'],
      correctAnswer: 2,
      explanation: 'Ca ở chu kỳ 4 nhóm 2 (IIA).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Trong nhóm, tính kim loại biến đổi:',
      options: ['Giảm khi xuống', 'Tăng khi xuống', 'Không đổi', 'Biến thiên bất thường'],
      correctAnswer: 1,
      explanation: 'Thêm lớp e → dễ nhường e hơn → kim loại mạnh hơn.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Trong chu kỳ, oxit chuyển tính chất từ:',
      options: ['Axit → bazơ', 'Bazơ → lưỡng tính → axit', 'Lưỡng tính → bazơ', 'Không đổi'],
      correctAnswer: 1,
      explanation: 'Từ kim loại → phi kim; oxit bazơ → lưỡng tính → axit.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Khối d bắt đầu xuất hiện từ chu kỳ 3.',
      correctAnswer: false,
      explanation: 'Khối d bắt đầu ở chu kỳ 4 (Sc).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Số oxi hóa cao nhất của nguyên tố nhóm VIA thường là:',
      options: ['+2', '+4', '+6', '+1'],
      correctAnswer: 2,
      explanation: '6 e hoá trị → SOX cao nhất thường +6.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Độ âm điện thay đổi thế nào trong một chu kỳ?',
      options: ['Giảm dần', 'Tăng dần', 'Không đổi', 'Tăng rồi giảm'],
      correctAnswer: 1,
      explanation: 'Z hiệu dụng tăng → độ âm điện tăng.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Bán kính ion M+ luôn lớn hơn bán kính nguyên tử M.',
      correctAnswer: false,
      explanation: 'Mất e → lực hút tăng → bán kính ion nhỏ hơn nguyên tử.',
      points: 10
    }
  ]
};
