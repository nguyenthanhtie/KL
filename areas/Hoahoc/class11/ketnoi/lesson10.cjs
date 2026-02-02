module.exports = {
  classId: 11,
  curriculumType: 'ketnoi',
  chapterId: 3,
  chapterName: 'Chương 3: Đại cương về hoá học hữu cơ',
  lessonId: 10,
  title: 'Bài 10: Hợp chất hữu cơ và hoá học hữu cơ',
  description: 'Khái niệm hợp chất hữu cơ, phân loại, đặc điểm liên kết C, công thức cấu tạo.',
  level: 'Intermediate',
  order: 10,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Hợp chất hữu cơ',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Nắm khái niệm, đặc điểm liên kết C và các dạng công thức biểu diễn trong hoá hữu cơ.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Đặc điểm chung',
            content: 'Chủ yếu liên kết cộng hoá trị; phân tử khối không quá lớn, dễ bay hơi hơn muối vô cơ.\nC nguyên tố hoá trị 4, lai hoá sp3 (đơn), sp2 (đôi), sp (ba) → đa dạng cấu trúc.\nCó thể chứa O, N, halogen, S → tạo nhóm chức quyết định tính chất.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'warningBox',
        content: {
            title: 'Phân loại',
            content: 'Hiđrocacbon (chỉ C, H): ankan, anken, ankin, thơm.\nDẫn xuất: thay H bằng nhóm chức (-OH, -X, -CHO, -COOH...).\nMạch: thẳng, nhánh, vòng no; vòng thơm; dị vòng (có dị tố trong vòng).',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Các loại công thức',
            content: 'Công thức phân tử (CTPT): nC, nH,...; công thức đơn giản nhất.\nCông thức cấu tạo (CTCT): thể hiện liên kết và sắp xếp nguyên tử.\nCông thức thu gọn/vạch: CH3-CH2-CH3, dùng trong mạch carbon.\nCông thức không gian (Newman, Sawhorse) dùng phân tích lập thể.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Đồng đẳng và đồng phân',
            content: 'Dãy đồng đẳng: sai khác CH2, tính chất hoá học tương tự, vật lí biến đổi dần.\nĐồng phân: cùng CTPT, khác sắp xếp; xuất hiện từ C4 với ankan (đồng phân mạch) và từ C2 với nối đôi (vị trí nối đôi).',
            color: 'purple',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Đặc điểm liên kết chính trong hợp chất hữu cơ là:',
      options: ['Ion', 'Kim loại', 'Cộng hoá trị', 'Hydro nội phân tử'],
      correctAnswer: 2,
      explanation: 'Hợp chất hữu cơ chủ yếu liên kết cộng hoá trị.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Dãy đồng đẳng ankan kế tiếp nhau hơn kém nhau:',
      options: ['Một nguyên tử H', 'Một nhóm CH2', 'Một nguyên tử C', 'Hai nguyên tử H'],
      correctAnswer: 1,
      explanation: 'Các chất cùng dãy đồng đẳng sai khác nhau một nhóm CH2.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'C lai hoá sp có góc liên kết xấp xỉ 120°.',
      correctAnswer: false,
      explanation: 'sp cho cấu trúc thẳng, góc 180°; sp2 mới ~120°.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Công thức thu gọn của butan mạch thẳng là:',
      options: ['CH3-CH2-CH3', 'CH3-CH2-CH2-CH3', '(CH3)3CH', 'CH2=CH2'],
      correctAnswer: 1,
      explanation: 'Butan có 4C, mạch thẳng: CH3-CH2-CH2-CH3.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Nhóm chức nào thuộc dẫn xuất halogen?',
      options: ['-OH', '-NH2', '-Cl', '-COOH'],
      correctAnswer: 2,
      explanation: 'Halogenoalkan có halogen gắn với C.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Đồng phân mạch xuất hiện từ ankan C4 trở lên.',
      correctAnswer: true,
      explanation: 'C4H10 có 2 đồng phân mạch; C1-C3 không.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Hiđrocacbon thơm đặc trưng bởi:',
      options: ['Có liên kết đơn', 'Có hệ π liên hợp vòng thỏa điều kiện thơm', 'Chỉ có liên kết ba', 'Tan mạnh trong nước'],
      correctAnswer: 1,
      explanation: 'Tính thơm do hệ π liên hợp đóng vòng ổn định (Hückel 4n+2).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Công thức phân tử cho biết:',
      options: ['Cách sắp xếp nguyên tử', 'Số nguyên tử từng nguyên tố', 'Góc liên kết', 'Đồng phân quang học'],
      correctAnswer: 1,
      explanation: 'CTPT chỉ cho biết thành phần nguyên tố và số nguyên tử.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Công thức cấu tạo vạch giúp biểu diễn nhanh mạch carbon.',
      correctAnswer: true,
      explanation: 'Vạch gấp khúc đại diện khung C-C, đầu/mút/đỉnh là C.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Dãy đồng đẳng khác nhau một nhóm ______',
      correctAnswer: 'CH2',
      explanation: 'Mỗi chất trong dãy hơn kém nhau 14 u theo nhóm CH2.',
      points: 10
    }
  ]
};
