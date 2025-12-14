module.exports = {
  classId: 9,
  curriculumType: 'ketnoi',
  chapterId: 9,
  chapterName: 'Chương 9: Lipid. Carbohydrate. Protein. Polymer',
  lessonId: 29,
  title: 'Bài 29: Carbohydrate - Glucose và saccharose',
  description: 'Đặc điểm, tính chất của đường đơn và đường đôi.',
  level: 'Beginner',
  order: 12,
  theory: `
    <h2>🍯 Glucose và Saccharose</h2>
    <ul>
      <li><strong>Glucose (C6H12O6):</strong> đường nho, tan tốt trong nước, vị ngọt; có tính khử trung gian; tham gia hô hấp tế bào.</li>
      <li><strong>Saccharose (C12H22O11):</strong> đường mía/đường trắng; phân tử gồm glucozơ + fructozơ; tan tốt trong nước.</li>
      <li><strong>Tính chất chung:</strong> tạo phản ứng tráng gương/to (thử Benedict/Fehling với glucose); bị lên men tạo etanol/CO2; tham gia phản ứng thuỷ phân.</li>
      <li><strong>Ứng dụng:</strong> thực phẩm, lên men, nguyên liệu công nghiệp sinh học.</li>
    </ul>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'CTPT glucose là:',
      options: ['C6H12O6', 'C12H22O11', 'C6H10O5', 'CH2O'],
      correctAnswer: 0,
      explanation: 'Glucose có CTPT C6H12O6.'
    },
    {
      type: 'true-false',
      question: 'Saccharose là đường đôi của glucose và fructose.',
      correctAnswer: true,
      explanation: 'Đúng, saccharose gồm 1 gốc glucose + 1 gốc fructose.'
    },
    {
      type: 'multiple-choice',
      question: 'Thử thử Benedict/Fehling nhận biết được:',
      options: ['Saccharose', 'Glucose', 'Saccharose và NaCl', 'Tinh bột'],
      correctAnswer: 1,
      explanation: 'Glucose khử được Cu(OH)2 tạo kết tủa đỏ gạch.'
    },
    {
      type: 'fill-in-blank',
      question: 'Lên men glucose: C6H12O6 → 2C2H5OH + ___ CO2',
      correctAnswer: '2',
      explanation: 'Sinh 2 mol CO2.'
    },
    {
      type: 'multiple-choice',
      question: 'Nguồn thu saccharose chủ yếu:',
      options: ['Khoai tây', 'Mía/đường riềng', 'Ngô', 'Khoai lang'],
      correctAnswer: 1,
      explanation: 'Mía đường và đường riềng là nguồn saccharose chính.'
    },
    {
      type: 'multiple-choice',
      question: 'Saccharose có khả năng khử dung dịch Cu(OH)2 trong môi trường kiềm?',
      options: ['Có', 'Không'],
      correctAnswer: 1,
      explanation: 'Saccharose không có nhóm -CHO tự do nên không khử Fehling.'
    },
    {
      type: 'true-false',
      question: 'Glucose thuộc nhóm monosaccharide.',
      correctAnswer: true,
      explanation: 'Glucose là đường đơn (mono).' 
    },
    {
      type: 'fill-in-blank',
      question: 'Thuỷ phân saccharose thu được glucose và ___',
      correctAnswer: 'fructose',
      explanation: 'Saccharose + H2O (xt) → glucose + fructose.'
    },
    {
      type: 'multiple-choice',
      question: 'Tính chất vật lí nào đúng với saccharose?',
      options: ['Ít tan nước', 'Tan tốt trong nước, tinh thể trắng', 'Bay hơi dễ', 'Có mùi khai'],
      correctAnswer: 1,
      explanation: 'Saccharose tinh thể trắng, tan tốt trong nước, vị ngọt.'
    },
    {
      type: 'multiple-choice',
      question: 'Vai trò sinh học chính của glucose:',
      options: ['Dự trữ trong da', 'Năng lượng nhanh cho tế bào', 'Cấu trúc DNA', 'Thành phần lipid'],
      correctAnswer: 1,
      explanation: 'Glucose là nguồn năng lượng trực tiếp trong tế bào.'
    }
  ]
};
