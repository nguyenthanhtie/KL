module.exports = {
  classId: 9,
  curriculumType: 'ketnoi',
  chapterId: 8,
  chapterName: 'Chương 8: Ethylic alcohol và Acetic acid',
  lessonId: 26,
  title: 'Bài 26: Ancol etylic (etanol)',
  description: 'Tính chất, điều chế và ứng dụng của etanol.',
  level: 'Intermediate',
  order: 9,
  theory: `
    <h2>🍶 Ethanol (C2H5OH)</h2>
    <ul>
      <li><strong>Cấu tạo:</strong> nhóm -OH gắn trên khung C2H5; công thức CTPT C2H6O.</li>
      <li><strong>Tính vật lí:</strong> lỏng không màu, mùi đặc trưng, tan vô hạn trong nước, sôi 78,3°C.</li>
      <li><strong>Tính hoá học:</strong> tác dụng Na → giải phóng H2; cháy cho ngọn lửa xanh: C2H5OH + 3O2 → 2CO2 + 3H2O; tham gia este hoá với CH3COOH tạo etyl axetat.</li>
      <li><strong>Điều chế:</strong> Lên men tinh bột, đường (men): C6H12O6 → 2C2H5OH + 2CO2; công nghiệp: hiđrat hoá etilen.</li>
      <li><strong>Ứng dụng:</strong> đồ uống có cồn, nhiên liệu (E5/E10), dung môi, sát trùng.</li>
    </ul>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Công thức phân tử của etanol:',
      options: ['C2H4O2', 'C2H6O', 'C3H8O', 'C2H6'],
      correctAnswer: 1,
      explanation: 'Ethanol có CTPT C2H6O.'
    },
    {
      type: 'true-false',
      question: 'Ethanol hoà tan vô hạn trong nước.',
      correctAnswer: true,
      explanation: 'Đúng, nhóm -OH tạo liên kết hiđro với nước.'
    },
    {
      type: 'multiple-choice',
      question: 'Sản phẩm khi ethanol tác dụng Na là:',
      options: ['Na2O', 'CH3CH2ONa và H2', 'NaOH', 'CH3COONa'],
      correctAnswer: 1,
      explanation: 'Ethanol + Na → C2H5ONa + 1/2 H2.'
    },
    {
      type: 'fill-in-blank',
      question: 'Lên men đường: C6H12O6 → 2C2H5OH + ___ CO2',
      correctAnswer: '2',
      explanation: 'Sinh 2 mol CO2.'
    },
    {
      type: 'multiple-choice',
      question: 'Ứng dụng nào sau không dùng cho ethanol?',
      options: ['Dung môi', 'Sát trùng', 'Chất oxi hoá mạnh', 'Phụ gia nhiên liệu'],
      correctAnswer: 2,
      explanation: 'Ethanol là chất khử yếu, không phải oxi hoá mạnh.'
    },
    {
      type: 'multiple-choice',
      question: 'Ethanol sôi ở khoảng nhiệt độ nào?',
      options: ['56°C', '78°C', '100°C', '118°C'],
      correctAnswer: 1,
      explanation: 'Ethanol sôi 78,3°C.'
    },
    {
      type: 'true-false',
      question: 'Hiđrat hoá etilen trong môi trường H2SO4 loãng có thể tạo ethanol.',
      correctAnswer: true,
      explanation: 'CH2=CH2 + H2O (H2SO4, t°) → C2H5OH.'
    },
    {
      type: 'fill-in-blank',
      question: 'Đốt ethanol đầy đủ: C2H5OH + 3O2 → 2CO2 + ___ H2O',
      correctAnswer: '3',
      explanation: 'Hệ số nước là 3.'
    },
    {
      type: 'multiple-choice',
      question: 'Sản phẩm este hoá giữa ethanol và CH3COOH là:',
      options: ['Etyl axetat', 'Metyl axetat', 'Etylen', 'Axit axetic'],
      correctAnswer: 0,
      explanation: 'Ethanol + CH3COOH → CH3COOC2H5 + H2O.'
    },
    {
      type: 'multiple-choice',
      question: 'Dạng đóng gói nào sau đây không dùng với ethanol công nghiệp?',
      options: ['Pha đến 90-96%', 'Pha màu, hương liệu làm đồ uống', 'Dùng làm nhiên liệu E5/E10', 'Dung môi sơn'],
      correctAnswer: 1,
      explanation: 'Ethanol công nghiệp không dùng làm đồ uống do có tạp chất.'
    }
  ]
};
