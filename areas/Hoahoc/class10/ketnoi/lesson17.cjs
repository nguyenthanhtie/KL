module.exports = {
  classId: 10,
  curriculumType: 'ketnoi',
  chapterId: 5,
  chapterName: 'Chương 5: Năng lượng hóa học',
  lessonId: 17,
  title: 'Bài 17: Biến thiên enthalpy trong các phản ứng hóa học',
  description: 'Hiểu ΔH, phản ứng thu/tỏa nhiệt, phương trình nhiệt hóa học, Hess và enthalpy chuẩn.',
  level: 'Intermediate',
  order: 1,
  theory: `
    <h2>Enthalpy (H) và ΔH</h2>
    <h3>Khái niệm & dấu</h3>
    <ul>
      <li>ΔH = H_sản phẩm - H_phản ứng; ΔH &lt; 0 tỏa nhiệt, ΔH &gt; 0 thu nhiệt.</li>
      <li>Phương trình nhiệt hóa học: ghi ΔH (kJ/mol) kèm phương trình, chú ý trạng thái (r, l, g, dd).</li>
    </ul>
    <h3>Enthalpy chuẩn</h3>
    <ul>
      <li>ΔH_f°: enthalpy tạo thành 1 mol chất từ đơn chất ở trạng thái chuẩn.</li>
      <li>ΔH_c°: enthalpy cháy hoàn toàn 1 mol chất.</li>
      <li>Điều kiện chuẩn: 25°C, 1 atm, nồng độ 1 M (dung dịch).</li>
    </ul>
    <h3>Định luật Hess & biểu đồ năng lượng</h3>
    <ul>
      <li>ΔH chỉ phụ thuộc trạng thái đầu-cuối → có thể cộng/ trừ các phương trình để tìm ΔH mong muốn.</li>
      <li>Biểu đồ năng lượng: mức năng lượng của hệ giảm (tỏa nhiệt) hay tăng (thu nhiệt); độ chênh chính là ΔH.</li>
    </ul>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'ΔH &lt; 0 cho biết phản ứng?',
      options: ['Thu nhiệt', 'Tỏa nhiệt', 'Không đổi nhiệt', 'Tự phát'],
      correctAnswer: 1,
      explanation: 'ΔH âm → tỏa nhiệt ra môi trường.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Định luật Hess phát biểu rằng?',
      options: [
        'ΔH phụ thuộc lộ trình phản ứng',
        'ΔH chỉ phụ thuộc trạng thái đầu và cuối',
        'ΔH luôn âm',
        'ΔH chỉ tính cho khí'
      ],
      correctAnswer: 1,
      explanation: 'Hess: hiệu ứng nhiệt phụ thuộc trạng thái, không phụ thuộc đường đi.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Phản ứng thu nhiệt có ΔH dương.',
      correctAnswer: true,
      explanation: 'Thu nhiệt → hệ nhận năng lượng → ΔH > 0.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'ΔH_f° là:',
      options: ['Enthalpy phản ứng cháy', 'Enthalpy tạo thành 1 mol chất từ đơn chất ở trạng thái chuẩn', 'Enthalpy hòa tan', 'Enthalpy trung hòa'],
      correctAnswer: 1,
      explanation: 'ΔH_f° định nghĩa cho phản ứng tạo thành 1 mol chất từ đơn chất chuẩn.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng cháy hoàn toàn 1 mol C (rắn) thành CO2 có ΔH gần bằng -394 kJ/mol. Đây là:',
      options: ['ΔH_f° của CO2', 'ΔH_c° của C', 'ΔH_hòa tan', 'ΔH bay hơi'],
      correctAnswer: 1,
      explanation: 'Đó là enthalpy cháy chuẩn của C.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Khi nhân đôi phương trình phản ứng, ΔH cũng nhân đôi.',
      correctAnswer: true,
      explanation: 'ΔH tỉ lệ với lượng chất phản ứng như đã viết.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Trong biểu đồ năng lượng, phản ứng thu nhiệt được biểu diễn:',
      options: ['Mức năng lượng sản phẩm thấp hơn chất phản ứng', 'Mức năng lượng sản phẩm cao hơn chất phản ứng', 'Đường phẳng', 'Không thay đổi nhiệt'],
      correctAnswer: 1,
      explanation: 'Thu nhiệt: sản phẩm năng lượng cao hơn → ΔH dương.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Cách tính ΔH phản ứng từ ΔH_f°:',
      options: ['ΣΔH_f°(pư) - ΣΔH_f°(sp)', 'ΣΔH_f°(sp) - ΣΔH_f°(pư)', 'Lấy trung bình cộng', 'Không dùng được ΔH_f°'],
      correctAnswer: 1,
      explanation: 'ΔH = ΣΔH_f°(sản phẩm) - ΣΔH_f°(phản ứng).',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Định luật Hess cho phép ghép các phản ứng trung gian để tính ΔH phản ứng đích.',
      correctAnswer: true,
      explanation: 'Vì ΔH là hàm trạng thái.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng nào sau đây chắc chắn tỏa nhiệt?',
      options: ['Đóng băng nước', 'Bay hơi nước', 'Cháy CH4', 'Quang hợp'],
      correctAnswer: 2,
      explanation: 'Phản ứng cháy giải phóng nhiều nhiệt → ΔH âm.',
      points: 10
    }
  ]
};
