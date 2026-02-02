module.exports = {
  classId: 11,
  curriculumType: 'ketnoi',
  chapterId: 4,
  chapterName: 'Chương 4: Hydrocarbon',
  lessonId: 15,
  title: 'Bài 15: Alkane',
  description: 'Cấu tạo, tính chất, phản ứng thế, cracking và ứng dụng của ankan.',
  level: 'Intermediate',
  order: 15,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Ankan',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Ôn cấu trúc sp3, phản ứng thế gốc tự do, oxi hoá và ứng dụng trong công nghiệp dầu khí.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Cấu tạo & đồng đẳng',
            content: 'Công thức chung CnH2n+2; C lai hoá sp3, góc ~109,5°.\nMạch thẳng/nhánh/cyclo (cycloalkan: CnH2n).\nTừ C4 bắt đầu có đồng phân mạch; tính chất vật lí: tăng C → tăng T sôi, mạch nhánh làm giảm T sôi.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'warningBox',
        content: {
            title: 'Tính chất hoá học',
            content: 'Thế halogen (gốc tự do, ánh sáng/ nhiệt): CH4 + Cl2 → CH3Cl + HCl.\nOxi hoá hoàn toàn: cháy toả nhiệt; oxi hoá không hoàn toàn → CO, C.\nCracking/pyrolysis: phân cắt C-C tạo anken/ankan nhẹ hơn.',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Nguồn & ứng dụng',
            content: 'Khí thiên nhiên (CH4, C2H6) và dầu mỏ (hỗn hợp ankan).\nNhiên liệu (gas, LPG, xăng, dầu hoả), dung môi, nguyên liệu cracking sản xuất anken.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Cơ chế thế gốc tự do',
            content: 'Khơi mào: Cl2 → 2Cl· (ánh sáng).\nPhát triển: Cl· + RH → R· + HCl; R· + Cl2 → RCl + Cl·.\nNgắt mạch: Cl· + Cl· → Cl2; R· + R· → R-R.',
            color: 'purple',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Công thức chung ankan mạch hở là:',
      options: ['CnH2n', 'CnH2n+2', 'CnH2n-2', 'CnHn'],
      correctAnswer: 1,
      explanation: 'Ankan no mạch hở: CnH2n+2.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng thế halogen của ankan cần điều kiện:',
      options: ['Xúc tác axit', 'Ánh sáng hoặc nhiệt', 'Nhiệt độ rất thấp', 'Áp suất cao'],
      correctAnswer: 1,
      explanation: 'Phản ứng gốc tự do khơi mào bởi ánh sáng/ nhiệt.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Ankan kém tan trong nước do không phân cực.',
      correctAnswer: true,
      explanation: 'Ankan không phân cực → không tạo H-bond với nước.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Sản phẩm chính khi cracking C10H22 ở 500°C (xúc tác) có thể là:',
      options: ['Chỉ CO2', 'Anken và ankan nhẹ', 'Chỉ benzen', 'Chỉ metan'],
      correctAnswer: 1,
      explanation: 'Cracking tạo hỗn hợp anken/ankan nhẹ hơn (xăng, khí).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Đồng phân mạch của C5H12 gồm:',
      options: ['1', '2', '3', '4'],
      correctAnswer: 2,
      explanation: 'Pentane có 3 đồng phân mạch (n-pentane, isopentane, neopentane).',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Cyclohexan có công thức C6H12, cùng CT chung với anken mạch hở.',
      correctAnswer: true,
      explanation: 'Cycloalkan CnH2n giống anken về CTPT nhưng khác cấu trúc.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Giai đoạn khơi mào trong thế Cl của CH4 là:',
      options: ['Cl· + CH4 → CH3· + HCl', 'CH3· + Cl2 → CH3Cl + Cl·', 'Cl2 → 2Cl·', 'Cl· + Cl· → Cl2'],
      correctAnswer: 2,
      explanation: 'Ánh sáng tách Cl2 thành 2 gốc Cl·.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Khi đốt thiếu oxi, ankan tạo sản phẩm khí độc:',
      options: ['CO2', 'SO2', 'CO', 'NO'],
      correctAnswer: 2,
      explanation: 'Thiếu oxi → CO gây ngộ độc.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Metan là thành phần chính của khí thiên nhiên.',
      correctAnswer: true,
      explanation: 'Khí thiên nhiên chứa chủ yếu CH4.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Phản ứng: CH4 + Cl2 (as) → ______ + HCl',
      correctAnswer: 'CH3Cl',
      explanation: 'Thế gốc tự do tạo clorometan.',
      points: 10
    }
  ]
};
