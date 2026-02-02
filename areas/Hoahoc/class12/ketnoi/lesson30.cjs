module.exports = {
  classId: 12,
  curriculumType: 'ketnoi',
  chapterId: 8,
  chapterName: 'Chương 8: Kim loại chuyển tiếp và phức chất',
  lessonId: 30,
  title: 'Bài 30: Ôn tập chương 8',
  description: 'Hệ thống hoá kim loại chuyển tiếp và phức chất; bài tập danh pháp, tính chất.',
  level: 'Intermediate',
  order: 30,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Ôn tập kim loại chuyển tiếp và phức chất',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Tổng hợp đặc điểm kim loại chuyển tiếp, danh pháp phức chất và dạng bài tập thường gặp.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Điểm nhớ kim loại chuyển tiếp',
            content: 'Nhiều mức oxi hoá, ion màu, từ tính (thuận/nghịch), xúc tác mạnh.\nDễ tạo hợp kim (thép, đồng thau), vật liệu bền, chịu nhiệt.\nPhản ứng oxi hoá khử đa dạng (Fe2+ ⇌ Fe3+, Cu+ ⇌ Cu2+).',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'warningBox',
        content: {
            title: 'Ôn danh pháp phức chất',
            content: 'Phối tử đọc trước (alphabet), chỉ số bằng tiền tố (di-, tri-, tetra-).\nKim loại trong phức anion thêm hậu tố -at; ghi số oxi hoá bằng số La Mã.\nNhận dạng số phối trí (4, 6) và hình học cơ bản.',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Dạng bài tập',
            content: 'Viết tên/công thức phức, tính số oxi hoá kim loại.\nNhận biết màu/từ tính dựa trên cấu hình e và phối tử.\nCân bằng phản ứng có ion phức, tách/hoà tan kết tủa qua phức.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Checklist ôn tập',
            content: 'Thuộc dãy hoạt động, mức oxi hoá phổ biến Fe/Cu/Cr/Mn.\nPhối tử thường gặp: H2O, NH3, Cl-, CN-, en; quy tắc đọc tên (-at cho phức anion).\nHình học điển hình: tứ diện/vuông phẳng (số phối trí 4), bát diện (6).',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Case nhớ lâu',
            content: 'AgCl tan trong NH3 (phức diamminbạc), Fe3+ + SCN- đỏ máu, CuSO4 + NH3 tạo phức xanh đậm.\nPermanganat tím do chuyển điện tích O→Mn; Cr2O7 2- da cam; Fe2+/Fe3+ khác màu xanh nhạt/vàng nâu.\nCis/trans bát diện MA4B2; quang học khi bidentate tạo vòng kẹp không đối xứng.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-8',
        type: 'infoBox',
        content: {
            title: 'Ôn bài tập',
            content: 'Đặt tên/phản tên phức: luyện nhanh 5-10 ví dụ có phối tử anion/trung hoà, phức anion/cation.\nTính số oxi hoá từ điện tích toàn phức; phân biệt cao/ thấp spin dựa phối tử mạnh/yếu (mức cơ bản).\nBài tổng hợp: chọn thuốc thử để tách/hòa tan kết tủa (AgCl, Cu(OH)2) bằng phức phù hợp.',
            color: 'gray',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Đặc điểm chung của kim loại chuyển tiếp là:',
      options: ['Chỉ có một hoá trị', 'Dãy ion màu do chuyển d-d', 'Không tạo hợp kim', 'Không làm xúc tác'],
      correctAnswer: 1,
      explanation: 'Ion màu và nhiều hoá trị là điểm nổi bật.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Phức anion cần thêm hậu tố -at cho tên kim loại.',
      correctAnswer: true,
      explanation: 'Ví dụ ferrate, cuprate.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Tên đúng của [Fe(CN)6]4- là:',
      options: ['Hexacyanoferrate(III)', 'Hexacyanoferrate(II)', 'Iron(II) hexacyano complex', 'Iron cyanide'],
      correctAnswer: 1,
      explanation: 'Fe ở +2, phức anion → ferrate, số oxi hoá (II).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Số phối trí của phức [Ni(CN)4]2- là:',
      options: ['2', '3', '4', '6'],
      correctAnswer: 2,
      explanation: 'Có 4 phối tử CN- → số phối trí 4 (vuông phẳng).',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Ion [Cu(H2O)6]2+ cho màu xanh lam.',
      correctAnswer: true,
      explanation: 'Hidrat Cu2+ hấp thụ đỏ, cho màu xanh.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng nào dùng phức để hoà tan AgCl?',
      options: ['Thêm NaCl', 'Thêm NH3 tạo [Ag(NH3)2]+', 'Thêm H2SO4', 'Đun nóng nước'],
      correctAnswer: 1,
      explanation: 'NH3 tạo phức tan giúp AgCl hoà tan.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Kim loại chuyển tiếp bền ăn mòn nhờ thụ động hoá: inox có Cr tạo màng ____.',
      correctAnswer: 'Cr2O3',
      explanation: 'Cr2O3 mỏng bảo vệ thép không gỉ.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Dạng đồng phân xuất hiện với phức bát diện MA4B2 là:',
      options: ['Cis-trans', 'Quang học luôn', 'Chỉ một dạng', 'Liên kết ion'],
      correctAnswer: 0,
      explanation: 'MA4B2 bát diện có cis/trans.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Màu tím của permanganat xuất phát từ:',
      options: ['Chuyển d-d', 'Chuyển điện tích O → Mn (charge transfer)', 'Sắc tố hữu cơ', 'Do lẫn tạp chất'],
      correctAnswer: 1,
      explanation: 'Mn(VII) không có e d, màu do chuyển điện tích O→Mn.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Ni(PPh3)4 có số phối trí 4.',
      correctAnswer: true,
      explanation: '4 phối tử phosphin bao quanh Ni.',
      points: 10
    }
  ]
};