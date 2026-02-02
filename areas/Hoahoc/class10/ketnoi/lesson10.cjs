module.exports = {
  classId: 10,
  curriculumType: 'ketnoi',
  chapterId: 3,
  chapterName: 'Chương 3: Liên kết hóa học',
  lessonId: 10,
  title: 'Bài 10: Quy tắc octet',
  description: 'Quy tắc octet, ngoại lệ và ứng dụng dự đoán liên kết/hoá trị.',
  level: 'Beginner',
  order: 1,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Quy tắc octet',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Mục tiêu: hiểu bản chất quy tắc octet, nhận diện ngoại lệ (thiếu/giãn), vận dụng viết Lewis và dự đoán loại liên kết.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Nội dung quy tắc',
            content: 'Nguyên tử có xu hướng đạt 8e lớp ngoài (He ổn định với 2e).\nThực hiện bằng nhường/nhận e (tạo ion) hoặc dùng chung e (cộng hoá trị).\nỨng dụng: dự đoán công thức Lewis, hoá trị, kiểu liên kết.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'warningBox',
        content: {
            title: 'Ngoại lệ thường gặp',
            content: 'Thiếu octet: H (2e), Be (4e), B (6e), phân tử e lẻ (NO).\nGiãn octet (chu kỳ ≥ 3, có obitan trống d): PCl5 (10e), SF6 (12e), SO3 (12e).\nHạn chế: nguyên tố chu kỳ 2 không giãn octet (C, N, O, F).',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Cách viết nhanh công thức Lewis',
            content: 'Tính tổng e hoá trị (điều chỉnh theo điện tích).\nChọn nguyên tử trung tâm (thường kém âm điện, không phải H, F).\nVẽ liên kết đơn trước, phân bổ e còn lại cho nguyên tử ngoài, sau đó trung tâm.\nThiếu octet → tăng bậc liên kết (đôi/ba) nếu cần; kiểm tra điện tích hình thức hợp lí.',
            color: 'purple',
            listType: 'number'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Tránh nhầm lẫn',
            content: 'Không cố ép B, Be lên 8e trong BF3, BeCl2; chúng chấp nhận thiếu.\nChu kỳ 2 không mở rộng lên 10e/12e.\nGốc tự do (NO, NO2) không thể đủ 8e cho mọi nguyên tử.',
            color: 'gray',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Quy tắc octet nói về?',
      options: ['8 proton trong hạt nhân', '8 electron lớp ngoài cùng', '8 nơtron', '8 liên kết cộng hóa trị'],
      correctAnswer: 1,
      explanation: 'Octet: đạt 8 e lớp ngoài như khí hiếm.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Nguyên tử Na tuân theo octet bằng cách?',
      options: ['Nhận 1e', 'Nhường 1e', 'Dùng chung 1e', 'Không thay đổi'],
      correctAnswer: 1,
      explanation: 'Na (1s2 2s2 2p6 3s1) nhường 1e → Na+ đạt cấu hình Ne.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Tất cả nguyên tố đều tuân thủ tuyệt đối quy tắc octet.',
      correctAnswer: false,
      explanation: 'Có ngoại lệ: B, Be thiếu octet; P, S có thể mở rộng lên 10,12e.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Nguyên tử Be (Z=4) thường tạo liên kết nào để ổn định?',
      options: ['Nhường 4e', 'Nhận 4e', 'Dùng chung 2e tạo 4e lớp ngoài (thiếu octet)', 'Luôn đạt 8e'],
      correctAnswer: 2,
      explanation: 'Be thường tạo liên kết cộng hoá trị, đạt 4e lớp ngoài (ngoại lệ thiếu octet).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'SO2 hay SO3 thỏa mãn octet cho S?',
      options: ['Cả hai đều 8e', 'SO2 mở rộng lên 10e', 'SO3 mở rộng lên 12e', 'SO2 10e, SO3 12e (giãn octet)'],
      correctAnswer: 3,
      explanation: 'S chu kỳ 3 có thể dùng obitan trống mở rộng octet: SO2 ~10e, SO3 ~12e.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phân tử nào vi phạm octet do thiếu e?',
      options: ['CO2', 'BF3', 'CH4', 'H2O'],
      correctAnswer: 1,
      explanation: 'BF3: B chỉ có 6e lớp ngoài.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Khí hiếm He ổn định với:',
      options: ['2e lớp ngoài', '4e lớp ngoài', '6e lớp ngoài', '8e lớp ngoài'],
      correctAnswer: 0,
      explanation: 'He là ngoại lệ, bền với 2e lớp K.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Khi nguyên tử nhường/nhận e để đạt octet, liên kết ion có thể hình thành.',
      correctAnswer: true,
      explanation: 'Trao đổi e → cation/anion → liên kết ion.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Liên kết cộng hoá trị giúp thỏa mãn octet bằng cách:',
      options: ['Chia sẻ cặp e chung', 'Nhường e', 'Nhận e', 'Không liên quan tới e'],
      correctAnswer: 0,
      explanation: 'Các nguyên tử dùng chung cặp e để đạt 8e lớp ngoài.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phân tử có số electron lẻ (NO) xử lý octet thế nào?',
      options: ['Luôn phá vỡ hình học', 'Một nguyên tử không đủ 8e (radical)', 'Bổ sung e từ môi trường', 'Không tồn tại bền'],
      correctAnswer: 1,
      explanation: 'NO có 11e → một nguyên tử (N) không đủ 8e, dạng tự do gốc tự do.',
      points: 10
    }
  ]
};
