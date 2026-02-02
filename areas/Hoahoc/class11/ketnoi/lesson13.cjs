module.exports = {
  classId: 11,
  curriculumType: 'ketnoi',
  chapterId: 3,
  chapterName: 'Chương 3: Đại cương về hoá học hữu cơ',
  lessonId: 13,
  title: 'Bài 13: Cấu tạo hoá học hợp chất hữu cơ',
  description: 'Khái niệm cấu tạo, đồng phân, ảnh hưởng cấu trúc đến tính chất.',
  level: 'Intermediate',
  order: 13,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Cấu tạo hoá học',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Xem xét cấu trúc (trật tự liên kết) và cấu hình (không gian) để giải thích tính chất hoá học hữu cơ.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Khái niệm cấu tạo',
            content: 'Thứ tự liên kết giữa các nguyên tử (liên kết đơn/đôi/ba, nhóm chức).\nHướng liên kết trong không gian (góc, hình học cis/trans, E/Z).\nCấu tạo quyết định tính chất và phản ứng đặc trưng.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'warningBox',
        content: {
            title: 'Các loại đồng phân',
            content: 'Đồng phân cấu tạo: mạch carbon, vị trí nhóm chức/nối đôi, nhóm chức khác nhau.\nĐồng phân hình học (cis/trans hoặc E/Z) ở nối đôi, vòng nhỏ.\nĐồng phân quang học: có nguyên tử bất đối (C*), quay mặt phẳng ánh sáng phân cực.',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Hiệu ứng điện tử',
            content: 'Cảm ứng (-I/+I): nhóm rút đẩy e theo sigma (-Cl, -NO2 rút; -alkyl đẩy).\nLiên hợp (+M/-M): nhóm cho nhận e theo hệ π (-OH, -NH2 đẩy; -CHO, -NO2 rút).\nỔn định carbocation/anion phụ thuộc hiệu ứng này.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Ảnh hưởng tới tính chất',
            content: 'Mạch nhánh: giảm nhiệt độ sôi (giảm diện tích tiếp xúc), thường giảm hoạt tính.\nNhóm chức quyết định phản ứng đặc trưng (-OH: thế/oxi hoá; -COOH: axit, este hoá).\nĐồng phân hình học khác tính chất (cis-2-butene sôi cao hơn trans do moment lưỡng cực).',
            color: 'purple',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Đồng phân xuất hiện do khác:',
      options: ['Khối lượng mol', 'Thành phần nguyên tố', 'Cách sắp xếp nguyên tử hoặc không gian', 'Trạng thái tập hợp'],
      correctAnswer: 2,
      explanation: 'Cùng CTPT nhưng sắp xếp khác → đồng phân.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Cis/trans tồn tại khi:',
      options: ['Có nối đơn', 'Có nối đôi bị cố định và mỗi C nối đôi gắn 2 nhóm khác nhau', 'Mạch thẳng', 'Có nhóm chức -OH'],
      correctAnswer: 1,
      explanation: 'Nối đôi không quay tự do; cần hai nhóm khác nhau trên mỗi C.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Nhóm -NO2 thể hiện hiệu ứng -M và -I.',
      correctAnswer: true,
      explanation: '-NO2 rút e mạnh qua sigma (-I) và rút qua liên hợp (-M).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Carbocation bậc 3 bền hơn bậc 1 vì:',
      options: ['Hiệu ứng +I của nhóm alkyl ổn định điện tích dương', 'Khối lượng lớn', 'Có liên kết hiđro', 'Do cộng hưởng'],
      correctAnswer: 0,
      explanation: 'Nhóm ankyl đẩy e (cảm ứng) và hiệu ứng siêu liên hợp ổn định carbocation.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Đồng phân quang học cần có:',
      options: ['Liên kết ba', 'Vòng thơm', 'Nguyên tử bất đối (C*) và không có mặt phẳng đối xứng', 'Nhiều halogen'],
      correctAnswer: 2,
      explanation: 'Trung tâm bất đối tạo hai ảnh gương không chồng khít (enantiomer).',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Mạch nhánh thường làm giảm nhiệt độ sôi so với mạch thẳng đồng phân.',
      correctAnswer: true,
      explanation: 'Mạch nhánh giảm diện tích tiếp xúc → lực London yếu hơn.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Hiệu ứng liên hợp (+M) thường gặp ở nhóm:',
      options: ['-NO2', '-CHO', '-NH2', '-CF3'],
      correctAnswer: 2,
      explanation: '-NH2 có cặp e tự do đẩy vào hệ π (hiệu ứng +M).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Với but-2-ene, đồng phân nào có moment lưỡng cực lớn hơn?',
      options: ['Cis', 'Trans', 'Như nhau', 'Không có moment'],
      correctAnswer: 0,
      explanation: 'Cis tạo moment cộng hưởng, trans triệt tiêu phần lớn.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Đồng phân cấu tạo có thể khác nhóm chức.',
      correctAnswer: true,
      explanation: 'Ví dụ: C2H6O có ancol (etanol) và ete (đimetyl ete).',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Chỉ số bất đối thường ký hiệu là ______',
      correctAnswer: 'C*',
      explanation: 'Nguyên tử carbon gắn 4 nhóm khác nhau được ký hiệu C*.',
      points: 10
    }
  ]
};
