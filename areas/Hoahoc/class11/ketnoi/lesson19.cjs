module.exports = {
  classId: 11,
  curriculumType: 'ketnoi',
  chapterId: 5,
  chapterName: 'Chương 5: Dẫn xuất halogen - alcohol - phenol',
  lessonId: 19,
  title: 'Bài 19: Dẫn xuất halogen',
  description: 'Halogenoankan: danh pháp, phản ứng thế, loại H-X, ứng dụng.',
  level: 'Intermediate',
  order: 19,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: 'Dẫn xuất halogen',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Xác định bậc halogenoankan, phân biệt SN1/SN2, E1/E2 và ứng dụng phản ứng Grignard.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Cấu tạo & phân loại',
            content: 'Công thức R-X (X = F, Cl, Br, I); bậc 1/2/3 tùy carbon gắn X.\nLiên kết C-X phân cực (Cδ+, Xδ−); độ bền: C-F > C-Cl > C-Br > C-I.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'warningBox',
        content: {
            title: 'Phản ứng thay thế nucleophin',
            content: 'SN2: 1 bước, nghịch hướng (inversion), ưu tiên bậc 1, tác nhân mạnh, dung môi phân cực kém.\nSN1: 2 bước qua carbocation, ưu tiên bậc 3, dung môi phân cực, có thể tạo hỗn hợp lập thể.\nVí dụ: R-X + OH− → R-OH + X−.',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Phản ứng loại (E1/E2)',
            content: 'E2: 1 bước, base mạnh, nhiệt → tạo anken theo quy tắc Zaitsev (tạo anken thế hơn).\nE1: qua carbocation (giống SN1), có thể kèm tái sắp xếp.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Thuốc thử Grignard',
            content: 'RMgX tạo từ R-X + Mg khan trong ete khan; là bazơ và nucleophin mạnh.\nỨng dụng: cộng vào C=O tạo ancol (R-MgX + HCHO → ancol bậc 1; + aldehyde → ancol bậc 2; + xeton → ancol bậc 3).',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Ứng dụng & an toàn',
            content: 'Dung môi (CH2Cl2), chất làm lạnh (CCl2F2 - hạn chế do phá ozone), thuốc trừ sâu (DDT - bị cấm).\nLưu ý độc tính và tác động môi trường; ưu tiên hóa chất thân thiện hơn.',
            color: 'gray',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Liên kết C-X yếu nhất là với:',
      options: ['F', 'Cl', 'Br', 'I'],
      correctAnswer: 3,
      explanation: 'C-I dài và yếu nhất nên phản ứng dễ hơn.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'SN2 ưu tiên xảy ra với:',
      options: ['Halogenoankan bậc 3', 'Halogenoankan bậc 1', 'Công thức vòng thơm', 'Vinyl halide'],
      correctAnswer: 1,
      explanation: 'Bậc 1 ít cản trở không gian, thuận lợi cho tấn công ngược hướng.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'SN1 tạo carbocation trung gian.',
      correctAnswer: true,
      explanation: 'SN1 tách X trước, tạo cation rồi nucleophin tấn công.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng loại E2 cần:',
      options: ['Base mạnh, một bước', 'Acid mạnh, hai bước', 'Nucleophin yếu', 'Không cần nhiệt'],
      correctAnswer: 0,
      explanation: 'E2 xảy ra đồng thời, base mạnh lấy H β.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Quy tắc Zaitsev áp dụng cho:',
      options: ['Thế gốc tự do', 'Cộng electrophin', 'Phản ứng loại tạo anken ưu tiên thế hơn', 'Trùng hợp'],
      correctAnswer: 2,
      explanation: 'Zaitsev: anken bền hơn (thế hơn) ưu tiên.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Thuốc thử Grignard phải làm trong ete khan.',
      correctAnswer: true,
      explanation: 'RMgX rất nhạy nước; ete tạo phức bền và khan.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'RMgX cộng HCHO rồi thủy phân cho:',
      options: ['Ancol bậc 1', 'Ancol bậc 2', 'Ancol bậc 3', 'Axit'],
      correctAnswer: 0,
      explanation: 'Aldehyde formic cho ancol bậc 1 sau proton hoá.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Halogenoankan bậc 3 thuận lợi cho:',
      options: ['SN2', 'SN1/E1', 'Phản ứng bạc', 'Trùng hợp'],
      correctAnswer: 1,
      explanation: 'Carbocation bậc 3 bền → SN1/E1 dễ.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'CCl2F2 thân thiện môi trường nên dùng rộng rãi.',
      correctAnswer: false,
      explanation: 'CFC phá hủy tầng ozone, bị hạn chế theo Nghị định thư Montreal.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Phản ứng: CH3CH2Br + KOH (etanol) → ______ + KBr + H2O',
      correctAnswer: 'CH2=CH2',
      explanation: 'Môi trường base mạnh/etanol ưu tiên tách HX (E2) tạo etylen.',
      points: 10
    }
  ]
};
