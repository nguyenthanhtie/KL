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
  theory: `
    <h2>🍗 Protein</h2>
    <ul>
      <li><strong>Cấu tạo:</strong> polime amino acid nối với nhau bằng liên kết peptit (-CO-NH-).</li>
      <li><strong>Bậc cấu trúc:</strong> sơ cấp (dãy amino acid), thứ cấp (xoắn alpha/tấm beta), tam cấp (gấp cuộn 3D), tứ cấp (nhiều tiểu đơn vị).</li>
      <li><strong>Hoá học:</strong> bị biến tính bởi nhiệt/axit/bazơ; bị thuỷ phân → amino acid; phản ứng màu Biuret (Cu(OH)2, môi kiềm) tạo màu tím.</li>
      <li><strong>Vai trò:</strong> xây dựng cơ thể, enzyme, vận chuyển (hemoglobin), miễn dịch (kháng thể).</li>
    </ul>
  `,
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
