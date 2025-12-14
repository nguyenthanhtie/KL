module.exports = {
  classId: 9,
  curriculumType: 'ketnoi',
  chapterId: 10,
  chapterName: 'Chương 10: Khai thác tài nguyên từ vỏ trái đất',
  lessonId: 33,
  title: 'Bài 33: Sơ lược hóa học vỏ Trái Đất và khai thác tài nguyên',
  description: 'Thành phần vỏ Trái Đất, quặng và khai thác tài nguyên hợp lí.',
  level: 'Beginner',
  order: 16,
  theory: `
    <h2>🌍 Vỏ Trái Đất và tài nguyên</h2>
    <ul>
      <li><strong>Thành phần chính:</strong> SiO2, Al2O3, Fe2O3, CaCO3, MgCO3, các silicat.</li>
      <li><strong>Quặng và khoáng sản:</strong> quặng là khoáng sản có ích; ví dụ: bôxit (Al2O3·nH2O), hematit (Fe2O3), đá vôi (CaCO3).</li>
      <li><strong>Khai thác hợp lí:</strong> các giai đoạn khai thác, tuyển, chế biến; cần hạn chế ô nhiễm, tận thu tài nguyên.</li>
      <li><strong>Bảo vệ môi trường:</strong> phục hồi mỏ, cây xanh; xử lí khí thải, bụi; sử dụng tiết kiệm tài nguyên.</li>
    </ul>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Thành phần cơ bản của đá vôi là:',
      options: ['CaSO4', 'CaCO3', 'SiO2', 'NaCl'],
      correctAnswer: 1,
      explanation: 'Đá vôi chứa chủ yếu CaCO3.'
    },
    {
      type: 'true-false',
      question: 'Bôxit là quặng nhôm (Al).',
      correctAnswer: true,
      explanation: 'Bôxit chứa nhiều Al2O3·nH2O.'
    },
    {
      type: 'multiple-choice',
      question: 'Khoáng sản nào là nguồn sắt chính?',
      options: ['Hematit', 'Thạch anh', 'Halit', 'Vôi sống'],
      correctAnswer: 0,
      explanation: 'Hematit (Fe2O3) là quặng sắt quan trọng.'
    },
    {
      type: 'fill-in-blank',
      question: 'Thành phần chính của cát là SiO2, còn gọi là ___',
      correctAnswer: 'thạch anh',
      explanation: 'Cát chủ yếu là thạch anh (SiO2).' 
    },
    {
      type: 'multiple-choice',
      question: 'Biện pháp nào không giúp giảm tác động khai thác?',
      options: ['Phục hồi môi trường', 'Xử lí bụi/khí thải', 'Tận thu tài nguyên không kiểm soát', 'Khai thác trái phép'],
      correctAnswer: 2,
      explanation: 'Tận thu không kiểm soát làm cạn kiệt và tăng ô nhiễm.'
    },
    {
      type: 'multiple-choice',
      question: 'SiO2 được tìm thấy nhiều nhất ở dạng khoáng sản nào?',
      options: ['Hematit', 'Thạch anh', 'Bôxit', 'Manhêxit'],
      correctAnswer: 1,
      explanation: 'Thạch anh là dạng SiO2 phổ biến trong vỏ Trái Đất.'
    },
    {
      type: 'true-false',
      question: 'Khai thác mỏ lộ thiên thường gây bụi và tổn thương cảnh quan.',
      correctAnswer: true,
      explanation: 'Mỏ lộ thiên gây tác động môi trường nếu không xử lí tốt.'
    },
    {
      type: 'fill-in-blank',
      question: 'Quặng là khoáng sản có ___ về kinh tế.',
      correctAnswer: 'giá trị',
      explanation: 'Quặng được khai thác vì có giá trị sử dụng/kinh tế.'
    },
    {
      type: 'multiple-choice',
      question: 'Khoáng sản nào là nguồn nhôm quan trọng?',
      options: ['Bôxit', 'Hematit', 'Pirit', 'Thạch cao'],
      correctAnswer: 0,
      explanation: 'Bôxit cung cấp Al2O3 để điện phân sản xuất nhôm.'
    },
    {
      type: 'multiple-choice',
      question: 'Biện pháp nào nên làm sau khai thác để phục hồi sinh thái?',
      options: ['Bỏ mỏ trong tình trạng cũ', 'Phủ đất, trồng cây phủ xanh', 'Xả nước thải trực tiếp', 'Đốt chất thải'],
      correctAnswer: 1,
      explanation: 'Phủ đất, trồng cây giúp phục hồi hệ sinh thái và chống xói mòn.'
    }
  ]
};
