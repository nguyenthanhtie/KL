module.exports = {
  classId: 10,
  curriculumType: 'ketnoi',
  chapterId: 2,
  chapterName: 'Chương 2: Bảng tuần hoàn các nguyên tố hóa học và định luật tuần hoàn',
  lessonId: 6,
  title: 'Bài 6: Xu hướng biến đổi một số tính chất của nguyên tố trong nhóm',
  description: 'Diễn biến bán kính, độ âm điện, tính kim loại/phi kim theo chiều nhóm.',
  level: 'Beginner',
  order: 2,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Xu hướng tính chất trong một nhóm',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'infoBox',
        content: {
            title: 'Kích thước & năng lượng',
            content: 'Bán kính tăng xuống nhóm do thêm lớp e (lực hút hạt nhân hiệu dụng giảm).\nNăng lượng ion hoá giảm → càng xuống dưới càng dễ mất e.\nÁi lực electron thường giảm (trừ một vài ngoại lệ halogen nặng).',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-3',
        type: 'warningBox',
        content: {
            title: 'Độ âm điện & tính chất',
            content: 'Độ âm điện giảm dần → tính phi kim giảm, tính kim loại tăng.\nSOX cao nhất của phi kim nhóm (VIIA, VIA) không đổi nhưng tính oxi hóa giảm.',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'infoBox',
        content: {
            title: 'Cấu hình lớp ngoài',
            content: 'Giữ nguyên dạng ns^a np^b → tính chất hóa học trong nhóm tương tự; thay đổi chủ yếu do bán kính và Z hiệu dụng.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Oxit/hiđroxit trong nhóm',
            content: 'Kim loại: oxit/hiđroxit bazơ mạnh dần xuống dưới (Li2O < Cs2O).\nPhi kim: oxit axit giảm dần, tính khử tăng (Cl2O7 > Br2O5 > I2O5).',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Ví dụ nhanh',
            content: 'Nhóm IA: Li < Na < K < Rb < Cs (kim loại mạnh dần, phản ứng với H2O dữ dội hơn).\nNhóm VIIA: F2 oxi hóa mạnh nhất; I2 yếu hơn, dễ bị khử.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'warningBox',
        content: {
            title: 'Lỗi thường gặp',
            content: 'Nhầm “kim loại tăng xuống nhóm” với “phi kim tăng”.\nBỏ qua ngoại lệ nhẹ của ái lực e/IE1 (O, F có giá trị lệch nhỏ).',
            color: 'orange',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Trong một nhóm A, tính kim loại biến đổi thế nào khi đi từ trên xuống?',
      options: ['Giảm', 'Tăng', 'Không đổi', 'Biến thiên không quy luật'],
      correctAnswer: 1,
      explanation: 'Thêm lớp e làm electron dễ tách → tính kim loại tăng.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Bán kính nguyên tử thay đổi ra sao trong nhóm?',
      options: ['Giảm dần', 'Tăng dần', 'Không đổi', 'Tăng rồi giảm'],
      correctAnswer: 1,
      explanation: 'Mỗi chu kỳ thêm một lớp e → bán kính tăng.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Độ âm điện tăng dần từ trên xuống trong cùng nhóm.',
      correctAnswer: false,
      explanation: 'Độ âm điện giảm dần theo chiều từ trên xuống.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Năng lượng ion hoá thứ nhất trong nhóm thường:',
      options: ['Tăng dần', 'Giảm dần', 'Không đổi', 'Lúc tăng lúc giảm'],
      correctAnswer: 1,
      explanation: 'Lớp e xa hạt nhân hơn, lực hút giảm → IE1 giảm.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Nguyên tố nào trong nhóm IA có tính kim loại mạnh nhất?',
      options: ['Li', 'Na', 'K', 'Cs'],
      correctAnswer: 3,
      explanation: 'Xuống nhóm kim loại mạnh dần; Cs mạnh nhất.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Trong nhóm VIIA, độ âm điện giảm nhanh nhất ở bước chuyển nào?',
      options: ['F → Cl', 'Cl → Br', 'Br → I', 'I → At'],
      correctAnswer: 0,
      explanation: 'F rất âm điện; xuống Cl giảm rõ rệt nhất.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Cùng nhóm, oxit kim loại xuống dưới thường bazơ mạnh hơn.',
      correctAnswer: true,
      explanation: 'Tính kim loại tăng → oxit bazơ mạnh hơn.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Nguyên tử nhóm IIA nào dễ bị oxi hóa nhất?',
      options: ['Mg', 'Ca', 'Ba', 'Be'],
      correctAnswer: 2,
      explanation: 'Ba ở cuối nhóm, mất e dễ nhất → bị oxi hóa mạnh nhất.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Trong nhóm, tính phi kim thay đổi thế nào?',
      options: ['Tăng dần', 'Giảm dần', 'Không đổi', 'Tăng rồi giảm'],
      correctAnswer: 1,
      explanation: 'Tính phi kim giảm dần khi xuống nhóm.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Cùng nhóm, bán kính ion dương M+ nhỏ hơn bán kính nguyên tử M.',
      correctAnswer: true,
      explanation: 'Mất e làm giảm đẩy tĩnh điện, bán kính ion nhỏ hơn nguyên tử.',
      points: 10
    }
  ]
};
