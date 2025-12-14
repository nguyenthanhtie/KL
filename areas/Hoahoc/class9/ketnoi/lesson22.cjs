module.exports = {
  classId: 9,
  curriculumType: 'ketnoi',
  chapterId: 7,
  chapterName: 'Chương 7: Giới thiệu về chất hữu cơ. Hydrocarbon và nguồn nhiên liệu',
  lessonId: 22,
  title: 'Bài 22: Giới thiệu về hợp chất hữu cơ',
  description: 'Đặc điểm chung của hợp chất hữu cơ và các nhóm phân loại cơ bản.',
  level: 'Beginner',
  order: 5,
  theory: `
    <h2>🧬 Tổng quan hợp chất hữu cơ</h2>
    <ul>
      <li>Hầu hết chứa <strong>C</strong>, thường kèm H, O, N, halogen, S.</li>
      <li>Có liên kết cộng hoá trị (C-C, C-H) là chủ yếu; dễ bị phân huỷ nhiệt.</li>
      <li>Phân loại: Hydrocarbon (chỉ chứa C, H); dẫn xuất (ancol, axit, ete...); hợp chất tự nhiên (lipid, đường, protein) và nhân tạo (polymer).</li>
      <li><strong>Công thức phân tử</strong>, <strong>công thức cấu tạo</strong> quan trọng để biểu diễn cách sắp xếp nguyên tử.</li>
      <li>Ứng dụng: Nhiên liệu, vật liệu, thực phẩm, y dược, mỹ phẩm.</li>
    </ul>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Thành phần chính của hợp chất hữu cơ là:',
      options: ['C và H', 'Fe và O', 'Na và Cl', 'Mg và O'],
      correctAnswer: 0,
      explanation: 'Hữu cơ thường chứa C, H và có thể có thêm O, N...' 
    },
    {
      type: 'true-false',
      question: 'Hydrocarbon chỉ chứa C và H.',
      correctAnswer: true,
      explanation: 'Đúng, các nguyên tố khác không có trong hydrocarbon.'
    },
    {
      type: 'multiple-choice',
      question: 'Dạng công thức nào cho biết cách sắp xếp nguyên tử?',
      options: ['Công thức phân tử', 'Công thức cấu tạo', 'Khối lượng mol', 'Tỉ trọng'],
      correctAnswer: 1,
      explanation: 'Công thức cấu tạo thể hiện liên kết giữa các nguyên tử.'
    },
    {
      type: 'fill-in-blank',
      question: 'Hợp chất chỉ có C, H, O thường gặp là đường, lipid và ___',
      correctAnswer: 'protein',
      explanation: 'Protein có thêm N nhưng khung vẫn là C, H, O.'
    },
    {
      type: 'multiple-choice',
      question: 'Ứng dụng nào không thuộc nhóm hợp chất hữu cơ?',
      options: ['Nhiên liệu xăng', 'Nhựa PE', 'Thép', 'Đường sucrose'],
      correctAnswer: 2,
      explanation: 'Thép là hợp kim kim loại, không phải hợp chất hữu cơ.'
    },
    {
      type: 'true-false',
      question: 'Chất hữu cơ thường dễ bị phân huỷ ở nhiệt độ cao hơn vô cơ.',
      correctAnswer: true,
      explanation: 'Liên kết C-C, C-H làm chất hữu cơ dễ bị nhiệt phân.'
    },
    {
      type: 'multiple-choice',
      question: 'Nhóm nào chỉ gồm hydrocarbon?',
      options: ['Ankan, anken, ankin', 'Ancol, ete, este', 'Axit, muối', 'Axit nucleic, protein'],
      correctAnswer: 0,
      explanation: 'Ankan, anken, ankin chỉ có C và H.'
    },
    {
      type: 'fill-in-blank',
      question: 'Hợp chất hữu cơ gắn với lĩnh vực ___ học nghiên cứu cấu trúc và phản ứng. (điền "hoa")',
      correctAnswer: 'hoá hữu cơ',
      explanation: 'Hoá học hữu cơ nghiên cứu hợp chất của carbon.'
    },
    {
      type: 'multiple-choice',
      question: 'Chất nào có khả năng hoà tan nhiều hợp chất hữu cơ?',
      options: ['Nước', 'Etanol', 'NaCl rắn', 'H2'],
      correctAnswer: 1,
      explanation: 'Etanol là dung môi hữu cơ, hoà tan nhiều chất hữu cơ.'
    },
    {
      type: 'multiple-choice',
      question: 'Vai trò của công thức cấu tạo là gì?',
      options: ['Tính khối lượng mol', 'Xác định dạng tinh thể', 'Biểu diễn liên kết và thứ tự nguyên tử', 'Tính áp suất hơi'],
      correctAnswer: 2,
      explanation: 'Công thức cấu tạo cho thấy cách nguyên tử nối với nhau.'
    }
  ]
};
