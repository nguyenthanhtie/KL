module.exports = {
  classId: 12,
  curriculumType: 'ketnoi',
  chapterId: 8,
  chapterName: 'Chương 8: Kim loại chuyển tiếp và phức chất',
  lessonId: 28,
  title: 'Bài 28: Phức chất (giới thiệu)',
  description: 'Khái niệm, thành phần, số phối trí, danh pháp cơ bản của phức chất.',
  level: 'Intermediate',
  order: 28,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Phức chất',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Hiểu cấu trúc, phối tử, số phối trí và danh pháp cơ bản của phức chất đơn giản.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Thành phần & số phối trí',
            content: 'Kim loại trung tâm (thường chuyển tiếp) + phối tử (H2O, NH3, Cl-, CN-, en...).\nSố phối trí phổ biến: 4 (vuông phẳng/tứ diện), 6 (bát diện).\nLiên kết cho-nhận: phối tử cho cặp e, KL nhận tạo liên kết phối trí.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'warningBox',
        content: {
            title: 'Danh pháp cơ bản',
            content: 'Đọc phối tử (alphabet) + tên kim loại (anion thêm -at) + số oxi hoá bằng số La Mã.\nPhối tử trung hoà: aquo (H2O), ammin (NH3), CO: carbonyl, en: ethylenediamin.\nPhối tử anion: Cl- chloro, CN- cyano, OH- hydroxo.',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Ví dụ & ứng dụng',
            content: '[Cu(NH3)4]2+ xanh đậm; [Fe(CN)6]4-/3- vàng/xanh thẫm.\n[CoCl2(en)2]+ bát diện méo; [Ag(NH3)2]+ hòa tan AgCl.\nỨng dụng: mạ điện, phân tích trắc quang, vận chuyển O2 (hemoglobin là phức porphyrin-Fe).',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'So sánh nhanh',
            content: 'Số phối trí 4: tứ diện (Ni(CO)4) vs vuông phẳng (Pt/Pd, [Ni(CN)4]2-).\nSố phối trí 6: bát diện phổ biến ([Fe(CN)6]3-, [Co(NH3)6]3+).\nDanh pháp: phức anion thêm -at (ferrate, cuprate); trung hoà/cation giữ tên thường.',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Case & ứng dụng',
            content: 'Hòa tan kết tủa: AgCl tan trong NH3 (tạo [Ag(NH3)2]+); Cu(OH)2 tan trong NH3 đậm đặc.\nPhát hiện ion: [Fe(SCN)]2+ đỏ máu để nhận Fe3+; [Cu(NH3)4]2+ xanh đậm.\nPhối tử cứng/mềm: CN- mềm, tạo phức bền với Ag+, Au+; F- cứng, ưu tiên Al3+, Fe3+.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-8',
        type: 'infoBox',
        content: {
            title: 'Ôn bài tập',
            content: 'Viết tên/công thức phức cho trước số oxi hoá và phối tử; chú ý thứ tự alphabet.\nTính số oxi hoá KL trung tâm từ điện tích phức và phối tử.\nNhận dạng hình học từ số phối trí và phối tử (vd: d8 kim loại nặng thường vuông phẳng).',
            color: 'gray',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Số phối trí phổ biến nhất của phức chất đơn giản là:',
      options: ['2 và 3', '4 và 6', '5 và 7', '6 và 8'],
      correctAnswer: 1,
      explanation: 'Phổ biến là 4 (vuông phẳng/tứ diện) và 6 (bát diện).',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Liên kết trong phức chất là liên kết cho-nhận.',
      correctAnswer: true,
      explanation: 'Phối tử cho cặp e vào obitan trống của kim loại trung tâm.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Tên phối tử NH3 trong danh pháp phức là:',
      options: ['Ammonia', 'Ammin', 'Aquo', 'Amid'],
      correctAnswer: 1,
      explanation: 'NH3 được gọi là ammin khi làm phối tử.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Tên phức [Cu(NH3)4]SO4 là:',
      options: ['Tetraammoniacopper(II) sulfate', 'Copper tetraammine sulfate', 'Tetraamminecopper(II) sulfate', 'Copper(II) sulfate ammonia'],
      correctAnswer: 2,
      explanation: 'Đọc phối tử trước: tetraammine + copper(II) + sulfate.',
      points: 10
    },
    {
      type: 'true-false',
      question: '[Fe(CN)6]4- và [Fe(CN)6]3- có số oxi hoá Fe khác nhau.',
      correctAnswer: true,
      explanation: 'Fe(II) cho anion 4-, Fe(III) cho anion 3-.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phối tử en có tính chất:',
      options: ['Đơn càng', 'Lưỡng càng (bidentate)', 'Ba càng', 'Không phải phối tử'],
      correctAnswer: 1,
      explanation: 'Ethylenediamin có hai nguyên tử N cho e → bidentate.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Công thức ion hòa tan AgCl trong NH3: [Ag(NH3)2]____.',
      correctAnswer: '+',
      explanation: 'Ag+ phối trí 2 NH3 tạo phức cation.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Trong tên phức anion, tên kim loại thêm hậu tố:',
      options: ['-ite', '-ate', '-ide', '-ine'],
      correctAnswer: 1,
      explanation: 'Ví dụ: ferrate, cuprate.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Số oxi hoá của Co trong [CoCl2(en)2]+ là:',
      options: ['+1', '+2', '+3', '+4'],
      correctAnswer: 2,
      explanation: 'en trung hoà, 2Cl- tổng -2, tổng điện tích +1 → Co + (-2) = +1 ⇒ Co = +3.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Hemoglobin là một phức chất của Fe.',
      correctAnswer: true,
      explanation: 'Fe phối trí với porphyrin và O2 tạm thời.',
      points: 10
    }
  ]
};
