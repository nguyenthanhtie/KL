module.exports = {
  classId: 9,
  curriculumType: 'ketnoi',
  chapterId: 7,
  chapterName: 'Chương 7: Giới thiệu về chất hữu cơ. Hydrocarbon và nguồn nhiên liệu',
  lessonId: 25,
  title: 'Bài 25: Nguồn nhiên liệu',
  description: 'Tổng quan nhiên liệu hoá thạch và tái tạo, ưu nhược điểm và bảo vệ môi trường.',
  level: 'Beginner',
  order: 8,
  theory: `
    <h2>🔥 Nguon nhien lieu</h2>
    <ul>
      <li><strong>Hoá thạch:</strong> than đá, dầu mỏ, khí tự nhiên. Năng lượng cao nhưng gây phát thải CO2, SO2, NOx.</li>
      <li><strong>Sinh học:</strong> khí sinh học (CH4 từ hầm biogas), etanol nhiên liệu, biodiesel.</li>
      <li><strong>Tái tạo khác:</strong> điện mặt trời, gió, thuỷ điện, địa nhiệt (không phát CO2 trong quá trình phát điện).</li>
      <li><strong>Dự phòng, sử dụng tiết kiệm:</strong> tăng hiệu suất thiết bị, lọc khí thải, chuyển đổi năng lượng sạch.</li>
    </ul>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Nhiên liệu hoá thạch chủ yếu chứa:',
      options: ['CO2 sẵn', 'H2O', 'Hydrocarbon', 'Kim loại'],
      correctAnswer: 2,
      explanation: 'Than, dầu, khí chứa chủ yếu hydrocarbon.'
    },
    {
      type: 'true-false',
      question: 'Khí sinh học (biogas) chủ yếu là CH4.',
      correctAnswer: true,
      explanation: 'Biogas chứa ~50-70% CH4.'
    },
    {
      type: 'multiple-choice',
      question: 'Phát thải nào gây mưa axit từ nhiên liệu hoá thạch?',
      options: ['CO2 và N2', 'SO2 và NOx', 'O2', 'He'],
      correctAnswer: 1,
      explanation: 'SO2, NOx tạo H2SO4, HNO3 trong mưa axit.'
    },
    {
      type: 'fill-in-blank',
      question: 'Năng lượng tái tạo không phát ___ trong quá trình phát điện.',
      correctAnswer: 'CO2',
      explanation: 'Điện gió, mặt trời không phát CO2 khi vận hành.'
    },
    {
      type: 'multiple-choice',
      question: 'Biodiesel thường được điều chế từ:',
      options: ['Dầu thực vật/mỡ động vật', 'Đá vôi', 'Thuỷ ngân', 'Pha lê'],
      correctAnswer: 0,
      explanation: 'Biodiesel xuất phát từ lipid (dầu thực vật/mỡ động vật) qua transester hoá.'
    },
    {
      type: 'multiple-choice',
      question: 'Than đá, dầu mỏ, khí tự nhiên đều hình thành từ:',
      options: ['Quá trình phong hoá đá', 'Sự phân huỷ sinh vật hàng triệu năm', 'Đóng hoá kim loại', 'Sự đóng băng nước biển'],
      correctAnswer: 1,
      explanation: 'Nhiên liệu hoá thạch hình thành từ tàn tích sinh vật bị chôn vùi lâu dài.'
    },
    {
      type: 'true-false',
      question: 'Ethanol có thể pha vào xăng để giảm phát thải.',
      correctAnswer: true,
      explanation: 'Xăng E5/E10 dùng etanol từ sinh khối giúp giảm CO và bụi.'
    },
    {
      type: 'fill-in-blank',
      question: 'Khi đốt nhiên liệu hoá thạch cần hạn chế ___ để giảm khí nhà kính.',
      correctAnswer: 'CO2',
      explanation: 'CO2 là khí nhà kính chính sinh ra khi đốt hydrocarbon.'
    },
    {
      type: 'multiple-choice',
      question: 'Biện pháp nào không phải năng lượng tái tạo?',
      options: ['Điện gió', 'Điện mặt trời', 'Đốt than đá', 'Thuỷ điện'],
      correctAnswer: 2,
      explanation: 'Đốt than đá là năng lượng hoá thạch, không phải tái tạo.'
    },
    {
      type: 'multiple-choice',
      question: 'Khí tự nhiên sau xử lí làm bớt mùi chủ yếu là:',
      options: ['N2', 'O2', 'CH4', 'CO2'],
      correctAnswer: 2,
      explanation: 'Thành phần chính của khí tự nhiên là metan (CH4).' 
    }
  ]
};
