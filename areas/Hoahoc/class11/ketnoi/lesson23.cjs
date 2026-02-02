module.exports = {
  classId: 11,
  curriculumType: 'ketnoi',
  chapterId: 6,
  chapterName: 'Chương 6: Hợp chất carbonyl - carboxylic acid',
  lessonId: 23,
  title: 'Bài 23: Hợp chất carbonyl',
  description: 'Anđehit và xeton: nhóm C=O, tính oxi hoá/khử, phản ứng đặc trưng.',
  level: 'Intermediate',
  order: 23,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Hợp chất carbonyl',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'So sánh anđehit và xeton về tính oxi hoá/khử, phản ứng cộng nucleophin và phép nhận biết.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Nhóm C=O',
            content: 'Phân cực: Cδ+ dễ bị tấn công bởi nucleophin; Oδ− có thể bị proton hoá.\nPhản ứng cộng nucleophin kèm proton hoá: tạo ancol, xianohydrin (HCN), hemiacetal/acetal (ROH, axit).',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'warningBox',
        content: {
            title: 'Anđehit vs Xeton',
            content: 'Anđehit (R-CHO): dễ bị oxi hoá nhẹ → axit; tham gia tráng bạc/Fehling (trừ HCHO mạnh hơn).\nXeton (R2C=O): khó oxi hoá (không tráng bạc), cần chất oxi hoá mạnh mới cắt mạch.\nKhử bằng H2/Ni → ancol bậc 1 (từ anđehit) hoặc bậc 2 (từ xeton).',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Nhận biết',
            content: 'Thuốc thử Tollens: anđehit → Ag gương bạc.\nFehling: anđehit mạch hở (trừ thơm) → kết tủa đỏ gạch Cu2O.\nXeton không phản ứng Tollens/Fehling (trừ α-hydroxy xeton đặc biệt).',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Ứng dụng',
            content: 'Formaldehyde: nhựa, chất sát khuẩn; Acetaldehyde: trung gian tổng hợp.\nAcetone: dung môi công nghiệp, tẩy rửa; methyl ethyl ketone dùng sơn.',
            color: 'purple',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Thuốc thử Tollens cho phản ứng với:',
      options: ['Acetone', 'Benzophenone', 'Etanal', 'Propanone'],
      correctAnswer: 2,
      explanation: 'Anđehit (như etanal, formaldehyde) khử Tollens tạo gương bạc; xeton không phản ứng.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Sản phẩm khử butan-2-one bằng H2/Ni là:',
      options: ['Butan-2-ol', 'Butan-1-ol', 'Butanal', 'But-2-ene'],
      correctAnswer: 0,
      explanation: 'Xeton khử → ancol bậc 2 tương ứng.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Anđehit bị oxi hoá bởi KMnO4 loãng thành axit cacboxylic.',
      correctAnswer: true,
      explanation: 'Anđehit dễ bị oxi hoá mạnh thành axit tương ứng.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng tạo xianohydrin từ anđehit cần:',
      options: ['HCN có xúc tác bazơ', 'Br2', 'H2SO4 đặc', 'Na'],
      correctAnswer: 0,
      explanation: 'HCN/NaCN tấn công C=O tạo RCH(OH)CN.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Hợp chất không cho phản ứng Fehling:',
      options: ['Glucozơ', 'Formaldehyde', 'Acetone', 'Axit fomic'],
      correctAnswer: 2,
      explanation: 'Xeton (acetone) không bị oxi hoá bởi Fehling.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Acetal được tạo khi anđehit tác dụng hai phân tử ancol trong axit.',
      correctAnswer: true,
      explanation: 'Anđehit + 2ROH (H+) → acetal (bảo vệ nhóm C=O).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Xeton thường kém hoạt động hơn anđehit vì:',
      options: ['Có ít nhóm ankyl', 'Không phân cực', 'Cản trở không gian và hiệu ứng đẩy e của 2 nhóm ankyl', 'Do bền thơm'],
      correctAnswer: 2,
      explanation: 'Hai nhóm ankyl đẩy e và cản trở không gian làm giảm hoạt tính.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng gương bạc của axit fomic (HCOOH):',
      options: ['Không xảy ra', 'Xảy ra vì HCOOH có tính khử như anđehit', 'Cần xúc tác kiềm mạnh', 'Cho kết tủa Cu2O'],
      correctAnswer: 1,
      explanation: 'HCOOH có nhóm -CHO ẩn nên khử Tollens tạo Ag.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Acetone là dung môi phân cực dễ bay hơi.',
      correctAnswer: true,
      explanation: 'Acetone (propanone) phân cực vừa, bay hơi nhanh, hoà tan tốt.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'C2H5CHO + [O] → ______',
      correctAnswer: 'CH3COOH',
      explanation: 'Etanal oxi hoá thành axit axetic.',
      points: 10
    }
  ]
};
