module.exports = {
  classId: 9,
  curriculumType: 'ketnoi',
  chapterId: 10,
  chapterName: 'Chương 10: Khai thác tài nguyên từ vỏ trái đất',
  lessonId: 35,
  title: 'Bài 35: Khai thác nhiên liệu hóa thạch - Chu trình cacbon - Sự ấm lên toàn cầu',
  description: 'Liên hệ khai thác nhiên liệu, khí nhà kính và biến đổi khí hậu.',
  level: 'Intermediate',
  order: 18,
  theory: `
    <h2>🌡️ Nhiên liệu hoá thạch và chu trình carbon</h2>
    <ul>
      <li><strong>Khai thác và sử dụng:</strong> đốt than, dầu, khí → phát thải CO2, NOx, SO2.</li>
      <li><strong>Chu trình carbon:</strong> CO2 ↔ sinh vật (quang hợp, hô hấp), biển, đất (tàn trữ, giải phóng). Cân bằng bị phá vỡ khi phát thải tăng.</li>
      <li><strong>Hiệu ứng nhà kính:</strong> CO2, CH4, N2O giữ nhiệt → ấm lên toàn cầu, băng tan, nước biển dâng.</li>
      <li><strong>Giải pháp:</strong> tiết giảm nhiên liệu hoá thạch, tăng năng lượng tái tạo, trồng rừng, công nghệ thu giữ CO2 (CCS), tiêu dùng bền vững.</li>
    </ul>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Khí nhà kính chính gây ấm lên toàn cầu là:',
      options: ['O2', 'CO2 và CH4', 'N2', 'He'],
      correctAnswer: 1,
      explanation: 'CO2, CH4, N2O là khí nhà kính quan trọng.'
    },
    {
      type: 'true-false',
      question: 'Chu trình carbon bị ảnh hưởng khi phát thải CO2 tăng.',
      correctAnswer: true,
      explanation: 'Phát thải tăng phá vỡ cân bằng hấp thu - phát thải carbon.'
    },
    {
      type: 'multiple-choice',
      question: 'Biện pháp nào giảm phát thải CO2 từ điện than?',
      options: ['Tăng đốt than', 'CCS (thu giữ CO2)', 'Đốt mỏ dầu', 'Không lọc bụi'],
      correctAnswer: 1,
      explanation: 'CCS thu giữ CO2 và lưu trữ/xử lí lại.'
    },
    {
      type: 'fill-in-blank',
      question: 'Cây xanh hấp thụ CO2 thông qua quá trình ___',
      correctAnswer: 'quang hop',
      explanation: 'Quang hợp dùng CO2 để tạo chất hữu cơ.'
    },
    {
      type: 'multiple-choice',
      question: 'Hậu quả của ấm lên toàn cầu không phải là:',
      options: ['Nước biển dâng', 'Băng tan', 'Tăng tần suất thiên tai cực đoan', 'Làm tăng pH đá vôi'],
      correctAnswer: 3,
      explanation: 'Ấm lên không làm tăng pH đá vôi; có thể làm axit hoá đại dương (giảm pH).' 
    },
    {
      type: 'multiple-choice',
      question: 'Nguồn phát thải CH4 lớn tự nhiên nhất trong lựa chọn sau:',
      options: ['Lúa nước', 'Trồng rừng', 'Gió', 'Năng lượng mặt trời'],
      correctAnswer: 0,
      explanation: 'Lúa nước, bãi rác, chăn nuôi phát thải methane đáng kể.'
    },
    {
      type: 'true-false',
      question: 'Đốt nhiên liệu hoá thạch là nguồn chính tăng CO2 khí hậu.',
      correctAnswer: true,
      explanation: 'Phát điện, giao thông, công nghiệp đốt than/dầu/khí tạo CO2 lớn.'
    },
    {
      type: 'fill-in-blank',
      question: 'Công nghệ ___ giúp bắt, nén và lưu trữ CO2 từ nguồn phát thải lớn.',
      correctAnswer: 'CCS',
      explanation: 'CCS (Carbon Capture and Storage) giảm phát thải CO2.'
    },
    {
      type: 'multiple-choice',
      question: 'Biện pháp nào góp phần giảm khí nhà kính từ giao thông?',
      options: ['Tăng sử dụng xe điện', 'Tăng tốc độ xe', 'Sử dụng xe máy cũ', 'Bớt sử dụng giao thông công cộng'],
      correctAnswer: 0,
      explanation: 'Xe điện và giao thông công cộng giảm đốt xăng dầu.'
    },
    {
      type: 'multiple-choice',
      question: 'Chu trình carbon bao gồm các kho dự trữ chính:',
      options: ['Khí quyển, sinh khối, đại dương, đất', 'Chỉ khí quyển', 'Chỉ dung nham', 'Chỉ ranh giới mảng trượt'],
      correctAnswer: 0,
      explanation: 'Carbon phân bố giữa khí quyển, sinh khối, đại dương, đất, đá.'
    }
  ]
};
