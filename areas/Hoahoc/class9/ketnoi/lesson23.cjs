module.exports = {
  classId: 9,
  curriculumType: 'ketnoi',
  chapterId: 7,
  chapterName: 'Chương 7: Giới thiệu về chất hữu cơ. Hydrocarbon và nguồn nhiên liệu',
  lessonId: 23,
  title: 'Bài 23: Ankan',
  description: 'Cấu tạo, tính chất và ứng dụng của dãy đồng đẳng ankan.',
  level: 'Intermediate',
  order: 6,
  theory: `
    <h2>🛢️ Ankan (paraffin)</h2>
    <ul>
      <li><strong>Công thức chung:</strong> CnH2n+2 (n ≥ 1).</li>
      <li><strong>Chuỗi thẳng/nhánh:</strong> chỉ liên kết đơn C-C, C-H → no, bền.</li>
      <li><strong>Vật lí:</strong> C1-C4 khí; C5-C17 lỏng; >C18 rắn, không tan nước, nhẹ hơn nước.</li>
      <li><strong>Hoá học:</strong> cháy sinh CO2, H2O; tham gia thế Cl2/Br2 (ánh sáng): CH4 + Cl2 → CH3Cl + HCl.</li>
      <li><strong>Nguồn:</strong> khí tự nhiên, dầu mỏ; <strong>ứng dụng:</strong> nhiên liệu, nguyên liệu hoá dầu.</li>
    </ul>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Công thức phân tử của propan là:',
      options: ['C2H6', 'C3H8', 'C4H10', 'C5H12'],
      correctAnswer: 1,
      explanation: 'Propan n = 3 → C3H8.'
    },
    {
      type: 'true-false',
      question: 'Ankan chỉ có liên kết đơn nên gọi là hydrocarbon no.',
      correctAnswer: true,
      explanation: 'Đúng, không có liên kết đôi/ba.'
    },
    {
      type: 'multiple-choice',
      question: 'Phạm vi trạng thái lỏng của ankan là:',
      options: ['C1-C4', 'C5-C17', 'C18 trở lên', 'Tất cả khí'],
      correctAnswer: 1,
      explanation: 'C5-C17 thường ở trạng thái lỏng.'
    },
    {
      type: 'fill-in-blank',
      question: 'Phản ứng thế: CH4 + Cl2 (ánh sáng) → ___ + HCl',
      correctAnswer: 'CH3Cl',
      explanation: 'Metyl clorua được tạo thành.'
    },
    {
      type: 'multiple-choice',
      question: 'Nguồn chính cung cấp ankan:',
      options: ['Đường mía', 'Khí tự nhiên, dầu mỏ', 'Than gỗ', 'Đá vôi'],
      correctAnswer: 1,
      explanation: 'Ankan có nhiều trong khí tự nhiên và dầu mỏ thô.'
    },
    {
      type: 'multiple-choice',
      question: 'Công thức chung của ankan là ___',
      options: ['CnH2n', 'CnH2n+2', 'CnH2n-2', 'CnH2n+1'],
      correctAnswer: 1,
      explanation: 'Ankan có công thức CnH2n+2.'
    },
    {
      type: 'true-false',
      question: 'Ankan không phản ứng cộng do chỉ có liên kết đơn.',
      correctAnswer: true,
      explanation: 'Liên kết sigma C-C, C-H ổn định, chủ yếu tham gia thế và oxi hoá mạnh.'
    },
    {
      type: 'fill-in-blank',
      question: 'Butan có công thức là C4H__',
      correctAnswer: '10',
      explanation: 'n = 4 → C4H10.'
    },
    {
      type: 'multiple-choice',
      question: 'Sản phẩm cháy đầy đủ của ankan trong oxi là:',
      options: ['CO + H2', 'CO2 + H2O', 'CO2 + CO', 'C + H2O'],
      correctAnswer: 1,
      explanation: 'Cháy đầy đủ tạo CO2 và H2O giải phóng nhiều nhiệt.'
    },
    {
      type: 'multiple-choice',
      question: 'Ankan nào ở trạng thái khí ở điều kiện thường?',
      options: ['Hexan', 'Propan', 'Dodecan', 'Octan'],
      correctAnswer: 1,
      explanation: 'C1-C4 là khí: metan, etan, propan, butan.'
    }
  ]
};
