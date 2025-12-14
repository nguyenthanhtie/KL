module.exports = {
  classId: 9,
  curriculumType: 'ketnoi',
  chapterId: 10,
  chapterName: 'Chương 10: Khai thác tài nguyên từ vỏ trái đất',
  lessonId: 34,
  title: 'Bài 34: Khai thác đá vôi và công nghiệp silicat',
  description: 'Chu trình khai thác đá vôi, sản xuất vôi sống, xi măng, thuỷ tinh.',
  level: 'Intermediate',
  order: 17,
  theory: `
    <h2>🏗️ Đá vôi và silicat</h2>
    <ul>
      <li><strong>Nung vôi:</strong> CaCO3 → CaO + CO2 (khoảng 900-1000°C).</li>
      <li><strong>Sản xuất xi măng:</strong> nghiền hỗn hợp đá vôi + đất sét, nung tạo clinker (chứa C3S, C2S), nghiền với thạch cao → xi măng.</li>
      <li><strong>Thuỷ tinh:</strong> nấu soda-lime: SiO2 + Na2CO3 + CaCO3 nung chảy → thuỷ tinh; điều chỉnh phụ gia để thay đổi tính chất.</li>
      <li><strong>Vấn đề môi trường:</strong> khí CO2, bụi, chất thải rắn; cần lọc bụi, xử lí khí thải, tái sử dụng chất thải xây dựng.</li>
    </ul>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Phản ứng nung vôi tạo ra khí nào?',
      options: ['SO2', 'CO2', 'N2', 'O2'],
      correctAnswer: 1,
      explanation: 'CaCO3 → CaO + CO2.'
    },
    {
      type: 'true-false',
      question: 'Clinker là sản phẩm trung gian trong sản xuất xi măng.',
      correctAnswer: true,
      explanation: 'Clinker nghiền với thạch cao tạo xi măng.'
    },
    {
      type: 'multiple-choice',
      question: 'Thành phần chính của thuỷ tinh soda-lime là:',
      options: ['SiO2, Na2CO3, CaCO3', 'SiO2, NaCl', 'Al2O3, Fe2O3', 'C và H'],
      correctAnswer: 0,
      explanation: 'Thuỷ tinh thường dùng SiO2 + soda + đá vôi.'
    },
    {
      type: 'fill-in-blank',
      question: 'Sản xuất xi măng: nghiền clinker + ___ thạch cao',
      correctAnswer: 'một chút',
      explanation: 'Thêm lượng nhỏ thạch cao điều chỉnh đông kết.'
    },
    {
      type: 'multiple-choice',
      question: 'Biện pháp giảm bụi nhà máy xi măng:',
      options: ['Lọc bụi tay áo', 'Không cần', 'Chỉ phun nước', 'Tăng nhiệt'],
      correctAnswer: 0,
      explanation: 'Sử dụng hệ thống lọc bụi, lọc tay áo, cyclone.'
    },
    {
      type: 'multiple-choice',
      question: 'Sản phẩm nào thu được khi vôi sống tác dụng với nước?',
      options: ['Ca(OH)2', 'CaCO3', 'CaSO4', 'NaOH'],
      correctAnswer: 0,
      explanation: 'CaO + H2O → Ca(OH)2 (vôi tôi).' 
    },
    {
      type: 'true-false',
      question: 'Thuỷ tinh có thể tái chế nhiều lần.',
      correctAnswer: true,
      explanation: 'Thuỷ tinh tái chế giảm năng lượng và chất thải.'
    },
    {
      type: 'fill-in-blank',
      question: 'Trong lò cao xi măng, CaCO3 bị ___ sinh CaO.',
      correctAnswer: 'phân huỷ',
      explanation: 'CaCO3 bị nhiệt phân sinh CaO và CO2.'
    },
    {
      type: 'multiple-choice',
      question: 'Thành phần nào điều chỉnh thời gian đông kết của xi măng?',
      options: ['Thạch cao', 'NaCl', 'Cát', 'Than đá'],
      correctAnswer: 0,
      explanation: 'Thêm lượng nhỏ thạch cao để điều chỉnh đông kết.'
    },
    {
      type: 'multiple-choice',
      question: 'Tác động môi trường chính khi nung vôi là:',
      options: ['CO2 và bụi', 'SO3', 'O3', 'N2'],
      correctAnswer: 0,
      explanation: 'Phát thải CO2 và bụi cần được xử lí.'
    }
  ]
};
