module.exports = {
  classId: 9,
  curriculumType: 'ketnoi',
  chapterId: 8,
  chapterName: 'Chương 8: Ethylic alcohol và Acetic acid',
  lessonId: 27,
  title: 'Bài 27: Axit axetic (axit etanoic)',
  description: 'Tính chất, điều chế và ứng dụng của CH3COOH.',
  level: 'Intermediate',
  order: 10,
  theory: `
    <h2>🥤 Acetic acid (CH3COOH)</h2>
    <ul>
      <li><strong>Tính vật lí:</strong> lỏng không màu, mùi giấm, tan tốt trong nước; Tnc 16,6°C.</li>
      <li><strong>Tính hoá học:</strong> tính axit yếu → làm đổi màu quỳ tím → đỏ; phản ứng với kim loại (Zn), bazơ, oxit bazơ, muối carbonat; tạo este: CH3COOH + C2H5OH ⇌ CH3COOC2H5 + H2O (xúc tác H2SO4 đặc).</li>
      <li><strong>Điều chế:</strong> Lên men ethanol thành giấm (vi khuẩn axetic); công nghiệp: oxi hoá butan/etanol.</li>
      <li><strong>Ứng dụng:</strong> gia vị (giấm ăn), chất chống cặn canxi, nguyên liệu sản xuất polymer (acetat).</li>
    </ul>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'CTPT của axit etanoic:',
      options: ['C2H4O2', 'C2H6O', 'CH2O', 'C3H6O2'],
      correctAnswer: 0,
      explanation: 'Axit etanoic có CTPT C2H4O2, viết gọn CH3COOH.'
    },
    {
      type: 'true-false',
      question: 'Axit etanoic là axit mạnh.',
      correctAnswer: false,
      explanation: 'Đây là axit yếu (pKa ~4,76).' 
    },
    {
      type: 'multiple-choice',
      question: 'Sản phẩm chính khi CH3COOH tác dụng Na2CO3 là:',
      options: ['NaOAc + CO2 + H2O', 'NaCl', 'NaOH', 'CH4'],
      correctAnswer: 0,
      explanation: '2CH3COOH + Na2CO3 → 2CH3COONa + CO2 + H2O.'
    },
    {
      type: 'fill-in-blank',
      question: 'Phản ứng este hoá: CH3COOH + C2H5OH ⇌ ___ + H2O',
      correctAnswer: 'CH3COOC2H5',
      explanation: 'Tạo etyl axetat.'
    },
    {
      type: 'multiple-choice',
      question: 'Vi khuẩn nào tham gia tạo giấm từ ethanol?',
      options: ['Lactic', 'Acetic', 'Butyric', 'Methanogenic'],
      correctAnswer: 1,
      explanation: 'Vi khuẩn Acetobacter oxi hoá ethanol thành CH3COOH.'
    },
    {
      type: 'multiple-choice',
      question: 'Axit axetic làm đổi màu quỳ tím sang:',
      options: ['Xanh', 'Đỏ', 'Vàng', 'Tím đậm'],
      correctAnswer: 1,
      explanation: 'Dung dịch axit axetic có tính axit, làm quỳ tím → đỏ.'
    },
    {
      type: 'true-false',
      question: 'CH3COOH pha loãng vẫn có mùi giấm đặc trưng.',
      correctAnswer: true,
      explanation: 'Mùi đặc trưng vẫn còn dù ở dung dịch loãng.'
    },
    {
      type: 'fill-in-blank',
      question: '2CH3COOH + Zn → (CH3COO)2Zn + ___',
      correctAnswer: 'H2',
      explanation: 'Axit tác dụng kim loại giải phóng H2.'
    },
    {
      type: 'multiple-choice',
      question: 'Sản phẩm khi axit axetic tác dụng với NaOH:',
      options: ['Na2CO3', 'CH3COONa + H2O', 'NaCl', 'CH4'],
      correctAnswer: 1,
      explanation: 'Axit + bazơ → muối và nước.'
    },
    {
      type: 'multiple-choice',
      question: 'Ứng dụng nào thường gặp của axit axetic?',
      options: ['Chất nổ', 'Gia vị (giấm)', 'Kim loại bảo vệ', 'Làm ngọt đường mía'],
      correctAnswer: 1,
      explanation: 'Axit axetic dùng làm gia vị và nguyên liệu hoá chất.'
    }
  ]
};
