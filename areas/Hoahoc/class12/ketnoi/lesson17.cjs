module.exports = {
  classId: 12,
  curriculumType: 'ketnoi',
  chapterId: 5,
  chapterName: 'Chương 5: Pin điện và điện phân',
  lessonId: 17,
  title: 'Bài 17: Ôn tập chương 5',
  description: 'Tổng hợp pin Galvani, tính E, điện phân và định luật Faraday.',
  level: 'Intermediate',
  order: 17,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Ôn tập chương 5: Pin điện và điện phân',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Phân biệt nguồn điện hoá học và quá trình điện phân; luyện tập tính E, ΔG, khối lượng thoát ra theo Faraday.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Pin Galvani',
            content: 'Anot oxi hoá, catot khử; electron đi qua mạch ngoài.\nE = E°catot - E°anot; ΔG° = -nFE°; K liên hệ với E°.\nỨng dụng: cảm biến, pin khô, pin nhiên liệu.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'infoBox',
        content: {
            title: 'Điện phân',
            content: 'Phi tự phát, cần nguồn điện; ưu tiên phóng điện phụ thuộc E°, nồng độ, màng.\nĐịnh luật Faraday: m ∝ It; tính khối lượng/ thể tích khí thoát ra.\nĐiện cực trơ vs tan; ứng dụng mạ điện, tinh luyện, sản xuất hoá chất.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Kỹ năng tính toán',
            content: 'Dùng phương trình Nernst cho [ion] ≠ 1 M.\nTính số mol e = It/F = Q/F; liên hệ với hệ số n ở điện cực.\nNhận diện sản phẩm ưu tiên phóng điện trong dung dịch nước.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Sơ đồ phân biệt',
            content: 'Pin (tự phát): anot (-) oxi hoá, catot (+) khử, E = E°catot - E°anot.\nĐiện phân (phi tự phát): anot (+) oxi hoá, catot (-) khử, cần nguồn ngoài.\nNernst áp dụng cả hai khi nồng độ khác 1 M.',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Case & mẹo',
            content: 'Trắc nghiệm ưu tiên phóng điện: nhớ catot ưu tiên ion có E° cao hơn H2O; anot ưu tiên anion halogen nếu đậm đặc.\nTính m khí: xác định số e/mol khí; ví dụ O2: 4e, H2: 2e, Cl2: 2e.\nPin nồng độ: E phụ thuộc log([ion loãng]/[ion đậm]); khi cân bằng E=0.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-8',
        type: 'infoBox',
        content: {
            title: 'Ôn bài tập',
            content: 'Đặt sơ đồ pin: anot | ion anot || ion catot | catot; ghi đúng trạng thái (rắn/aq/khí, Pt trơ nếu cần).\nNhiều bước: tính Q = It, suy mol e, chia cho n để ra mol chất; kiểm tra sản phẩm ở cả hai điện cực.\nLiên hệ ΔG° = -nFE°, K = 10^{nE°/0.059}; dùng để suy chiều phản ứng và mức độ tự phát.',
            color: 'gray',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Điều nào đúng về pin Galvani?',
      options: ['Cần nguồn ngoài', 'Phản ứng tự phát tạo dòng', 'Anot là cực dương', 'Electron đi từ catot → anot'],
      correctAnswer: 1,
      explanation: 'Pin tự phát, electron từ anot → catot.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: '1 Faraday tương đương:',
      options: ['96500 J', '96500 C', '96500 mol e', '96500 V'],
      correctAnswer: 1,
      explanation: 'F = 96500 C/mol e.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Trong điện phân, catot là cực âm của nguồn điện.',
      correctAnswer: true,
      explanation: 'Nguồn cung e vào catot (âm).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'E°Ag+/Ag = 0.80 V; E°Cu2+/Cu = 0.34 V. Suất điện động chuẩn của pin Ag|Ag+||Cu2+|Cu là:',
      options: ['0.46 V', '1.14 V', '0.80 V', '0.34 V'],
      correctAnswer: 0,
      explanation: 'E = 0.80 - 0.34 = 0.46 V (Ag catot).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Điện phân dung dịch CuSO4 với điện cực Cu: hiện tượng ở anot là:',
      options: ['Cu bám dày', 'Cu hoà tan thành Cu2+', 'Sinh O2', 'Không đổi'],
      correctAnswer: 1,
      explanation: 'Anot tan → Cu2+ bổ sung.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Bắc cầu muối duy trì trung hoà điện tích trong pin.',
      correctAnswer: true,
      explanation: 'Ion trong cầu muối cân bằng điện tích hai nửa pin.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Tính khối lượng Cu bám (g) khi điện phân CuSO4 với I=2 A trong 965 s (điện cực trơ).',
      options: ['0.32 g', '0.64 g', '1.27 g', '2.54 g'],
      correctAnswer: 1,
      explanation: 'Q=1930 C → mol e=0.02; Cu2+ +2e → Cu ⇒ nCu=0.01 → 0.64 g.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Electron đi từ ______ đến catot trong pin Galvani.',
      correctAnswer: 'anot',
      explanation: 'Anot oxi hoá cung cấp electron.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Ứng dụng của điện phân không phải:',
      options: ['Mạ điện', 'Tinh luyện kim loại', 'Sản xuất NaOH', 'Đo pH bằng điện cực thuỷ tinh'],
      correctAnswer: 3,
      explanation: 'Điện cực thủy tinh thuộc pin/điện hoá cảm biến, không phải điện phân.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'E° càng âm, chất càng dễ bị oxi hoá.',
      correctAnswer: true,
      explanation: 'E° thấp → khả năng nhường e cao.',
      points: 10
    }
  ]
};
