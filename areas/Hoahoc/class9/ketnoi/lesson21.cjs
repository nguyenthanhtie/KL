module.exports = {
  classId: 9,
  curriculumType: 'ketnoi',
  chapterId: 6,
  chapterName: 'Chương 6: Kim loại. Sự khác nhau cơ bản giữa phi kim và kim loại',
  lessonId: 21,
  title: 'Bài 21: Sự khác nhau cơ bản giữa phi kim và kim loại',
  description: 'So sánh tính chất vật lí, hoá học và vai trò của hai nhóm.',
  level: 'Beginner',
  order: 4,
  theory: `
    <h2>🔍 So sánh kim loại và phi kim</h2>
    <ul>
      <li><strong>Vật lí:</strong> Kim loại có ánh kim, dẫn điện/nhiệt, dẻo; phi kim thường cách điện, giòn, không ánh kim (trừ than chì kim, iot bóng).</li>
      <li><strong>Hoá học:</strong> Kim loại có tính khử, dễ bị oxi hoá; phi kim thường oxi hoá kim loại (O2, Cl2, S...).</li>
      <li><strong>Oxit:</strong> Kim loại → oxit bazơ; phi kim → oxit axit/lưỡng tính (Al2O3, ZnO lưỡng tính).</li>
      <li><strong>Vị trí bảng tuần hoàn:</strong> Kim loại bên trái/giữa; phi kim bên phải/phần góc trên.</li>
      <li><strong>Ứng dụng:</strong> Kim loại làm vật liệu, dẫn điện; phi kim làm chất oxi hoá, vật liệu phi kim (nhựa, sứ, cát).</li>
    </ul>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Đặc điểm nào phù hợp với phi kim?',
      options: ['Dẫn nhiệt tốt', 'Giòn, không ánh kim', 'Dễ dát mỏng', 'Dẫn điện tốt'],
      correctAnswer: 1,
      explanation: 'Đa số phi kim giòn, dễ vỡ, không ánh kim.'
    },
    {
      type: 'true-false',
      question: 'O2 là phi kim và có tính oxi hoá mạnh.',
      correctAnswer: true,
      explanation: 'O2 oxi hoá nhiều kim loại và chất hữu cơ.'
    },
    {
      type: 'multiple-choice',
      question: 'Oxit nào thường là oxit axit?',
      options: ['CO2', 'Na2O', 'CaO', 'MgO'],
      correctAnswer: 0,
      explanation: 'CO2 là oxit axit của phi kim C.'
    },
    {
      type: 'fill-in-blank',
      question: 'Kim loại tác dụng với O2 thường tạo oxit ___',
      correctAnswer: 'bazơ',
      explanation: 'Đa số tạo oxit bazơ (trừ Cr2O3, Al2O3 lưỡng tính).' 
    },
    {
      type: 'multiple-choice',
      question: 'Chất nào sau đây là kim loại?',
      options: ['S', 'P', 'Cl2', 'Fe'],
      correctAnswer: 3,
      explanation: 'Fe là kim loại.'
    },
    {
      type: 'multiple-choice',
      question: 'Phi kim nào ở trạng thái lỏng ở điều kiện thường?',
      options: ['Br2', 'Cl2', 'F2', 'O2'],
      correctAnswer: 0,
      explanation: 'Brom là phi kim ở dạng lỏng màu đỏ nâu.'
    },
    {
      type: 'true-false',
      question: 'Phi kim thường nhận electron trong phản ứng với kim loại.',
      correctAnswer: true,
      explanation: 'Phi kim có tính oxi hoá, nhận electron từ kim loại.'
    },
    {
      type: 'multiple-choice',
      question: 'Vị trí phi kim thường tập trung ở khu vực nào của bảng tuần hoàn?',
      options: ['Nhóm IA', 'Chính giữa', 'Góc trên bên phải', 'Dưới cùng'],
      correctAnswer: 2,
      explanation: 'Phi kim nằm ở góc trên bên phải (trừ H nằm trên cùng bên trái).' 
    },
    {
      type: 'fill-in-blank',
      question: 'Oxit lưỡng tính có thể tác dụng với cả axit và ___',
      correctAnswer: 'bazơ',
      explanation: 'Oxit lưỡng tính (Al2O3, ZnO) phản ứng với axit và bazơ.'
    },
    {
      type: 'multiple-choice',
      question: 'Tính chất nào không đúng với kim loại?',
      options: ['Dẫn điện', 'Dễ vỡ, cách điện', 'Ánh kim', 'Có thể uốn kéo sợi'],
      correctAnswer: 1,
      explanation: 'Kim loại không cách điện; đa số dẻo, dẫn điện/nhiệt.'
    }
  ]
};
