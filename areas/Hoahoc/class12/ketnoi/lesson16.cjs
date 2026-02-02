module.exports = {
  classId: 12,
  curriculumType: 'ketnoi',
  chapterId: 5,
  chapterName: 'Chương 5: Pin điện và điện phân',
  lessonId: 16,
  title: 'Bài 16: Điện phân',
  description: 'Nguyên tắc điện phân, định luật Faraday, tính toán khối lượng chất thoát ra.',
  level: 'Intermediate',
  order: 16,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Điện phân',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Quá trình phi tự phát dùng dòng điện một chiều để gây oxi hoá/khử tại điện cực, tính toán bằng định luật Faraday.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Nguyên tắc & ưu tiên phóng điện',
            content: 'Anot: oxi hoá; catot: khử. Dòng electron đi từ nguồn về catot.\nƯu tiên phóng điện (dung dịch nước): catot ưu tiên ion kim loại có E° cao hơn H+/H2; anot ưu tiên ion dễ oxi hoá (halogen, H2O → O2).\nĐiện cực trơ (graphit, Pt) vs điện cực tan (Cu trong tinh luyện Cu).',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'infoBox',
        content: {
            title: 'Định luật Faraday',
            content: 'm = (AIt)/(nF); V khí = (It)/(nF) · 22.4 ở đktc.\n1 Faraday (F) = 96500 C ứng với 1 mol e.\nẢnh hưởng: cường độ dòng, thời gian, số electron trao đổi n.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Ứng dụng',
            content: 'Mạ điện (Cu, Ni, Cr) cải thiện chống ăn mòn, thẩm mỹ.\nTinh luyện Cu: anot Cu thô → catot Cu tinh khiết, bùn anot chứa Ag, Au.\nĐiện phân NaCl: dung dịch (màng trao đổi ion) → Cl2, H2, NaOH; nóng chảy → Na, Cl2.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Checklist ưu tiên phóng điện',
            content: 'Catot dung dịch: cation quý/ít hoạt động (Cu2+, Ag+) > H2O/H+ > kim loại rất âm (Na+, K+ không khử).\nAnot dung dịch: anion oxi hoá dễ (Cl-, Br-) > H2O/OH- (tạo O2); anion bền (SO4 2-, NO3-) không phóng.\nĐiện cực tan: anot cung cấp kim loại → nồng độ ion giữ ổn định (tinh luyện, mạ điện đồng đều).',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Case & mẹo',
            content: 'Tính khí thoát: xác định n e/ mol khí (H2: 2e, O2: 4e, Cl2: 2e) rồi áp dụng Faraday.\nMạ đều: giữ I ổn định, khuấy dung dịch, chọn anot cùng kim loại để bù ion.\nĐiện phân nhiều ngăn (màng trao đổi ion) để tách sản phẩm, tránh tái hợp Cl2 với NaOH.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-8',
        type: 'infoBox',
        content: {
            title: 'Ôn bài tập',
            content: 'Q = I·t (C); n e = Q/F; mol chất = n e / số e trao đổi; m = n·M.\nĐiện phân nối tiếp nhiều ion: ưu tiên phóng → xác định thứ tự sản phẩm theo E°, nồng độ.\nKiểm tra bảo toàn điện tích: lượng ion rời/đến điện cực phải phù hợp với số e đã trao đổi.',
            color: 'gray',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Trong điện phân dung dịch CuSO4 với điện cực trơ, catot xảy ra:',
      options: ['Cu2+ + 2e → Cu', '2H2O + 2e → H2 + 2OH-', 'SO4 2- bị khử', 'Cu bị oxi hoá'],
      correctAnswer: 0,
      explanation: 'Cu2+ ưu tiên khử hơn nước.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Định luật Faraday: m =',
      options: ['MIt/F', 'AIt/(nF)', 'nF/It', 'It/A'],
      correctAnswer: 1,
      explanation: 'A là khối lượng mol nguyên tử/tác nhân, n số e trao đổi.',
      points: 10
    },
    {
      type: 'true-false',
      question: '1 mol e tương ứng 96500 coulomb.',
      correctAnswer: true,
      explanation: 'Hằng số Faraday F ≈ 96500 C/mol e.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Trong điện phân NaCl dung dịch có màng trao đổi ion, sản phẩm tại catot là:',
      options: ['Na', 'H2', 'Cl2', 'O2'],
      correctAnswer: 1,
      explanation: 'Nước bị khử ưu tiên, tạo H2 và OH-.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Điện lượng 193000 C tương ứng số mol electron:',
      options: ['1 mol', '2 mol', '0.5 mol', '3 mol'],
      correctAnswer: 1,
      explanation: '193000/96500 ≈ 2 mol e.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Điện cực tan có thể cung cấp ion kim loại cho dung dịch trong quá trình điện phân.',
      correctAnswer: true,
      explanation: 'Anot tan (Cu) oxi hoá cung cấp Cu2+ bổ sung.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Tại anot điện phân dung dịch NaCl (điện cực trơ) ưu tiên xảy ra:',
      options: ['2Cl- → Cl2 + 2e', '2H2O → O2 + 4H+ + 4e', 'Na+ + e → Na', '2OH- → H2O + 2e'],
      correctAnswer: 0,
      explanation: 'Cl- bị oxi hoá dễ hơn H2O trong dung dịch đậm.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Điện lượng Q = I × ____ (đơn vị giây).',
      correctAnswer: 't',
      explanation: 'Q=It với t tính bằng giây.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Điện phân nóng chảy NaCl thu được kim loại Na vì:',
      options: ['Na+ dễ khử hơn H2O', 'Không có nước, Na+ nhận e trực tiếp', 'Cl- không bị oxi hoá', 'E°Na+/Na lớn hơn H2O'],
      correctAnswer: 1,
      explanation: 'Không có H2O nên Na+ bị khử.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Khối lượng chất thoát ra tỉ lệ thuận với điện lượng Q.',
      correctAnswer: true,
      explanation: 'Định luật Faraday 1: m ∝ Q.',
      points: 10
    }
  ]
};
