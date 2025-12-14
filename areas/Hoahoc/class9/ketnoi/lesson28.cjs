module.exports = {
  classId: 9,
  curriculumType: 'ketnoi',
  chapterId: 9,
  chapterName: 'Chương 9: Lipid. Carbohydrate. Protein. Polymer',
  lessonId: 28,
  title: 'Bài 28: Lipid',
  description: 'Thành phần, tính chất và vai trò của lipid (chất béo).',
  level: 'Beginner',
  order: 11,
  theory: `
    <h2>🥑 Lipid</h2>
    <ul>
      <li><strong>Định nghĩa:</strong> Hợp chất hữu cơ không đồng nhất, chính là trieste của glycerol và axit béo (C15-C17).</li>
      <li><strong>Vật lí:</strong> không tan trong nước, tan trong dung môi hữu cơ (ete, xăng); nhẹ hơn nước.</li>
      <li><strong>Hoá học:</strong> thuỷ phân (xà phòng hoá) với kiềm → glycerol + muối natri/kali của axit béo (xà phòng); bị oxi hoá gây ôi khét.</li>
      <li><strong>Vai trò:</strong> dự trữ năng lượng, cấu tạo màng tế bào (phospholipid), hoà tan vitamin tan trong béo (A, D, E, K).</li>
      <li><strong>Ứng dụng:</strong> thực phẩm, xà phòng, mỹ phẩm, sinh học.</li>
    </ul>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Thành phần chính của lipid ăn được là:',
      options: ['Protein', 'Trieste của glycerol và axit béo', 'Tinh bột', 'Cellulose'],
      correctAnswer: 1,
      explanation: 'Chất béo là trieste của glycerol và axit béo mạch C15-C17.'
    },
    {
      type: 'true-false',
      question: 'Lipid tan tốt trong nước.',
      correctAnswer: false,
      explanation: 'Lipid không tan trong nước, tan trong dung môi hữu cơ.'
    },
    {
      type: 'multiple-choice',
      question: 'Sản phẩm thuỷ phân lipid với NaOH là:',
      options: ['Glycerol và xà phòng', 'CO2', 'Ethanol', 'Polyetylen'],
      correctAnswer: 0,
      explanation: 'Thuỷ phân trieste → glycerol + muối natri/kali axit béo.'
    },
    {
      type: 'fill-in-blank',
      question: 'Lipid giúp hoà tan các vitamin ___, D, E, K.',
      correctAnswer: 'A',
      explanation: 'Vitamin tan trong béo gồm A, D, E, K.'
    },
    {
      type: 'multiple-choice',
      question: 'Tính chất nào gây hư hỏng lipid khi để lâu ngoài không khí?',
      options: ['Đông đặc', 'Oxi hoá', 'Phản ứng cộng H2', 'Phản ứng trùng hợp'],
      correctAnswer: 1,
      explanation: 'Oxi hoá gây hôi, thối (rancid).' 
    },
    {
      type: 'multiple-choice',
      question: 'Lipid dự trữ năng lượng ở dạng nào?',
      options: ['Tinh bột', 'Mỡ dưới da', 'Glycogen cơ', 'Nucleic acid'],
      correctAnswer: 1,
      explanation: 'Mỡ dưới da tích trữ lipid làm năng lượng dự phòng.'
    },
    {
      type: 'true-false',
      question: 'Phospholipid là thành phần chính của màng tế bào.',
      correctAnswer: true,
      explanation: 'Màng tế bào có lớp phospholipid kép.'
    },
    {
      type: 'fill-in-blank',
      question: 'Thuỷ phân chất béo cần kiềm mạnh như NaOH, quá trình này còn gọi là ___ phòng.',
      correctAnswer: 'xà',
      explanation: 'Thuỷ phân tạo xà phòng và glycerol.'
    },
    {
      type: 'multiple-choice',
      question: 'Axit béo thường có số cacbon:',
      options: ['C2-C4', 'C6-C8', 'C15-C17', 'C30 trở lên'],
      correctAnswer: 2,
      explanation: 'Axit béo trong lipid ăn được thường có mạch C15-C17.'
    },
    {
      type: 'multiple-choice',
      question: 'Tính chất vật lí nào đúng với lipid?',
      options: ['Không tan nước, nhẹ hơn nước', 'Dễ bay hơi', 'Dẫn điện', 'Tan trong nước'],
      correctAnswer: 0,
      explanation: 'Lipid không tan nước, tỉ trọng nhỏ hơn nước nên nổi.'
    }
  ]
};
