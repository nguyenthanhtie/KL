module.exports = {
  classId: 9,
  curriculumType: 'ketnoi',
  chapterId: 6,
  chapterName: 'Chương 6: Kim loại. Sự khác nhau cơ bản giữa phi kim và kim loại',
  lessonId: 19,
  title: 'Bài 19: Dãy hoạt động hóa học',
  description: 'Ôn thứ tự hoạt động kim loại và vận dụng dự đoán phản ứng.',
  level: 'Intermediate',
  order: 2,
  theory: `
    <h2>📈 Dãy hoạt động hoá học</h2>
    <p>Thứ tự giảm dần: K - Na - Ca - Mg - Al - Zn - Fe - Ni - Sn - Pb - (H) - Cu - Ag - Au.</p>
    <ul>
      <li>Kim loại đứng trước đẩy được kim loại đứng sau khỏi dung dịch muối của nó.</li>
      <li>Kim loại đứng trước H đẩy được H2 khỏi axit loãng.</li>
      <li>Kim loại hoạt động mạnh phản ứng với nước lạnh (K, Na, Ca); yếu hơn cần đun nóng (Zn, Fe).</li>
    </ul>
    <div style="background:#eef2ff;padding:12px;border-radius:8px;border:1px solid #e2e8f0;">
      <p><strong>Ví dụ:</strong> Fe + CuSO4 → FeSO4 + Cu; Zn + 2HCl → ZnCl2 + H2; Cu không tác dụng với HCl loãng.</p>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Kim loại nào đứng ngay sau Al trong dãy hoạt động?',
      options: ['Mg', 'Zn', 'Fe', 'Ca'],
      correctAnswer: 1,
      explanation: 'Thứ tự ... Al - Zn - Fe ...'
    },
    {
      type: 'true-false',
      question: 'Cu có thể đẩy Fe khỏi dung dịch FeSO4.',
      correctAnswer: false,
      explanation: 'Cu hoạt động yếu hơn Fe, không thể đẩy Fe khỏi muối.'
    },
    {
      type: 'multiple-choice',
      question: 'Kim loại nào phản ứng mạnh nhất với nước lạnh?',
      options: ['Fe', 'Na', 'Zn', 'Cu'],
      correctAnswer: 1,
      explanation: 'K, Na, Ca phản ứng mạnh với nước lạnh.'
    },
    {
      type: 'fill-in-blank',
      question: 'Phương trình: Zn + 2HCl → ZnCl2 + ___',
      correctAnswer: 'H2',
      explanation: 'Sinh ra H2.'
    },
    {
      type: 'multiple-choice',
      question: 'Để thu Cu từ dung dịch CuSO4, nên dùng kim loại nào?',
      options: ['Ag', 'Au', 'Fe', 'Hg'],
      correctAnswer: 2,
      explanation: 'Fe đứng trước Cu nên đẩy được Cu ra khỏi muối.'
    },
    {
      type: 'true-false',
      question: 'Ag không đẩy được H2 khỏi axit HCl loãng.',
      correctAnswer: true,
      explanation: 'Ag đứng sau H trong dãy nên không phản ứng với HCl loãng.'
    },
    {
      type: 'multiple-choice',
      question: 'Cặp kim loại nào có thể phản ứng với H2SO4 loãng giải phóng H2?',
      options: ['Cu, Ag', 'Au, Pt', 'Mg, Zn', 'Hg, Cu'],
      correctAnswer: 2,
      explanation: 'Mg, Zn đứng trước H nên đẩy được H2 khỏi axit loãng.'
    },
    {
      type: 'fill-in-blank',
      question: 'Fe + CuSO4 → FeSO4 + ___',
      correctAnswer: 'Cu',
      explanation: 'Fe thay Cu trong muối CuSO4.'
    },
    {
      type: 'multiple-choice',
      question: 'Kim loại nào không bị H2O ở nhiệt độ thường tác động?',
      options: ['Na', 'K', 'Ca', 'Al'],
      correctAnswer: 3,
      explanation: 'Al không phản ứng với nước lạnh do có màng oxit bảo vệ.'
    },
    {
      type: 'multiple-choice',
      question: 'Mục đích của dãy hoạt động kim loại là gì?',
      options: ['Xếp kim loại theo độ bền', 'Xếp theo độ hôi độc', 'Dự đoán phản ứng thay thế và với axit', 'Xác định màu sắc kim loại'],
      correctAnswer: 2,
      explanation: 'Dãy hoạt động giúp dự đoán phản ứng thay thế và tác dụng với axit/nước.'
    }
  ]
};
