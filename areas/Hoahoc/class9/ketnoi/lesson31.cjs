module.exports = {
  classId: 9,
  curriculumType: 'ketnoi',
  chapterId: 9,
  chapterName: 'Chương 9: Lipid. Carbohydrate. Protein. Polymer',
  lessonId: 31,
  title: 'Bài 31: Prôtêin',
  description: 'Cấu trúc amino acid, liên kết peptit và vai trò protein.',
  level: 'Intermediate',
  order: 14,
  theoryModules: [
    {
        id: 'mod-1',
        type: 'heading',
        content: {
            text: '🍗 Protein',
            level: 'h2'
        }
    },
    {
        id: 'mod-2',
        type: 'paragraph',
        content: {
            text: 'Mục tiêu: hiểu cấu trúc amino acid, các bậc cấu trúc protein, tính chất hoá học và vai trò sinh học.'
        }
    },
    {
        id: 'mod-3',
        type: 'infoBox',
        content: {
            title: 'Thành phần & liên kết',
            content: 'Đơn vị cấu tạo: amino acid (có -NH₂ và -COOH) nối bằng liên kết peptit -CO-NH-.\nChuỗi polypeptit có chiều dài từ vài chục đến hàng nghìn gốc amino acid.\nLiên kết hydro, ion, kỵ nước giữ ổn định cấu trúc bậc cao.',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-4',
        type: 'warningBox',
        content: {
            title: 'Bậc cấu trúc',
            content: 'Sơ cấp: trình tự amino acid.\nThứ cấp: xoắn α, tấm β nhờ liên kết H.\nTam cấp: gấp cuộn 3D của một chuỗi.\nTứ cấp: nhiều tiểu đơn vị (ví dụ hemoglobin 4 chuỗi).',
            color: 'orange',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-5',
        type: 'infoBox',
        content: {
            title: 'Tính chất & nhận biết',
            content: 'Thuỷ phân → amino acid (axit/bazơ/enzym).\nBiến tính bởi nhiệt, pH mạnh, muối kim loại nặng.\nPhản ứng Biuret: Cu(OH)₂ kiềm → màu tím (nhận biết liên kết peptit).',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-6',
        type: 'infoBox',
        content: {
            title: 'Vai trò & dinh dưỡng',
            content: 'Cấu trúc (cơ, da), enzyme, hormone, vận chuyển (hemoglobin), miễn dịch (kháng thể).\nProtein hoàn chỉnh chứa đủ acid amin thiết yếu.\nCần cân bằng hấp thu; thiếu → suy dinh dưỡng, thừa → gánh nặng chuyển hoá.',
            color: 'blue',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-7',
        type: 'infoBox',
        content: {
            title: 'Bảng tóm tắt nhanh',
            content: 'Đơn vị: amino acid; liên kết peptit -CO-NH- tạo polypeptit.\n4 bậc cấu trúc quyết định hình dạng và chức năng.\nNhận biết: phản ứng Biuret; tính chất: thuỷ phân, biến tính.',
            color: 'purple',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-8',
        type: 'infoBox',
        content: {
            title: '',
            content: '**Gợi ý hình**:\nMô hình xoắn α và tấm β: */images/hoahoc9/lesson31-secondary.png*\nPhản ứng Biuret đổi màu tím: */images/hoahoc9/lesson31-biuret.png*',
            color: 'gray',
            listType: 'bullet'
        }
    },
    {
        id: 'mod-9',
        type: 'warningBox',
        content: {
            title: 'Mini quiz đọc nhanh',
            content: 'Liên kết nào tạo khung polypeptit?\nVì sao đun sôi làm trứng chín (liên quan biến tính)?\nThử Biuret cho hiện tượng gì với dung dịch protein?\nTự trả lời trước khi làm bộ câu hỏi.',
            color: 'orange',
            listType: 'bullet'
        }
    }
  ],
  game: [
    {
      type: 'multiple-choice',
      question: 'Liên kết peptit có dạng:',
      options: ['C-O-C', 'C-N', 'CO-NH', 'C=C'],
      correctAnswer: 2,
      explanation: 'Liên kết peptit là -CO-NH-.'
    },
    {
      type: 'true-false',
      question: 'Thử Biuret tạo màu tím khi có protein.',
      correctAnswer: true,
      explanation: 'Cu(OH)2 trong môi kiềm tác dụng với liên kết peptit tạo màu tím.'
    },
    {
      type: 'multiple-choice',
      question: 'Protein bị thuỷ phân cuối cùng thành:',
      options: ['Đường', 'Amino acid', 'Axit béo', 'Tinh bột'],
      correctAnswer: 1,
      explanation: 'Thuỷ phân hoàn toàn protein → amino acid.'
    },
    {
      type: 'fill-in-blank',
      question: 'Vai trò protein: enzyme, vận chuyển, cơ bắp, ___',
      correctAnswer: 'miễn dịch',
      explanation: 'Protein làm kháng thể trong hệ miễn dịch.'
    },
    {
      type: 'multiple-choice',
      question: 'Yếu tố nào không gây biến tính (denaturation) protein?',
      options: ['Nhiệt cao', 'pH quá thấp/cao', 'Muối kim loại nặng', 'Nước ngâm'],
      correctAnswer: 3,
      explanation: 'Nước ngâm không gây biến tính; nhiệt/pH/muối có thể gây biến tính.'
    },
    {
      type: 'multiple-choice',
      question: 'Bậc cấu trúc nào mô tả sự sắp xếp 3D của một chuỗi polypeptit?',
      options: ['Sơ cấp', 'Thứ cấp', 'Tam cấp', 'Tứ cấp'],
      correctAnswer: 2,
      explanation: 'Tam cấp là sự gấp cuộn 3D của một chuỗi polypeptit.'
    },
    {
      type: 'true-false',
      question: 'Amino acid liên kết với nhau thông qua nhóm -COOH và -NH2 tạo liên kết peptit.',
      correctAnswer: true,
      explanation: 'Phản ứng tạo -CO-NH- giải phóng H2O.'
    },
    {
      type: 'fill-in-blank',
      question: 'Protein có thể bị thuỷ phân khi gặp ___ (nhiệt, axit, bazơ mạnh).',
      correctAnswer: 'nhiệt cao',
      explanation: 'Nhiệt cao/axit/bazơ làm mất cấu trúc bậc cao của protein.'
    },
    {
      type: 'multiple-choice',
      question: 'Xét nghiệm nào nhận biết liên kết peptit?',
      options: ['Thử iod', 'Thử Benedict', 'Thử Biuret', 'Thử AgNO3'],
      correctAnswer: 2,
      explanation: 'Thử Biuret tạo màu tím với liên kết peptit trong môi kiềm.'
    },
    {
      type: 'multiple-choice',
      question: 'Vai trò nào không thuộc protein?',
      options: ['Enzyme', 'Hormone/vận chuyển', 'Cấu trúc tế bào', 'Nguồn cung cấp DNA'],
      correctAnswer: 3,
      explanation: 'DNA là axit nucleic, không phải protein.'
    }
  ]
};
