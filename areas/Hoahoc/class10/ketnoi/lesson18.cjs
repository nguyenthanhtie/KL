module.exports = {
  classId: 10,
  curriculumType: 'ketnoi',
  chapterId: 5,
  chapterName: 'Chương 5: Năng lượng hóa học',
  lessonId: 18,
  title: 'Bài 18: Ôn tập chương 5',
  description: 'Ôn chương 5: phân biệt thu/tỏa nhiệt, viết PTHH kèm ΔH, áp dụng Hess nhanh.',
  level: 'Intermediate',
  order: 2,
  theory: `
    <h2>Ôn tập chương 5</h2>
    <h3>Nhận dạng nhanh</h3>
    <ul>
      <li>Thu nhiệt: hấp thụ nhiệt, ΔH &gt; 0 (hòa tan NH4NO3); T môi trường giảm.</li>
      <li>Tỏa nhiệt: giải phóng nhiệt, ΔH &lt; 0 (cháy, trung hòa axit-bazơ mạnh); T môi trường tăng.</li>
    </ul>
    <h3>Viết phương trình nhiệt hóa học</h3>
    <ul>
      <li>Luôn ghi trạng thái, hệ số chuẩn; ΔH theo chiều đã viết.</li>
      <li>Đảo chiều phương trình → đổi dấu ΔH; nhân hệ số → nhân ΔH tương ứng.</li>
    </ul>
    <h3>Áp dụng định luật Hess</h3>
    <ul>
      <li>Chọn các phản ứng đã biết ΔH, sắp xếp/đảo chiều/nhân hệ số để tổng hợp phản ứng đích.</li>
      <li>Cộng ΔH các bước → ΔH phản ứng cần tính.</li>
      <li>Mẹo: dùng ΔH_f° (tạo thành) để tính ΔH phản ứng = ΣΔH_f°(sp) - ΣΔH_f°(pư).</li>
    </ul>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Phản ứng N2 + 3H2 → 2NH3, ΔH = -92 kJ. Đây là phản ứng?',
      options: ['Thu nhiệt', 'Tỏa nhiệt', 'Không trao đổi nhiệt', 'Tự phát do ΔH âm'],
      correctAnswer: 1,
      explanation: 'ΔH âm → tỏa nhiệt.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Theo Hess, ΔH tổng của chuỗi phản ứng bằng?',
      options: ['Tổng ΔH các bước', 'Hiệu ΔH hai bước', 'Không xác định', 'Lấy trung bình ΔH'],
      correctAnswer: 0,
      explanation: 'ΔH là hàm trạng thái → cộng được qua các bước trung gian.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'ΔH thay đổi khi đảo chiều phản ứng.',
      correctAnswer: true,
      explanation: 'Đảo chiều → ΔH đổi dấu.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Hòa tan NH4NO3 vào nước làm cốc lạnh đi. Đây là ví dụ của:',
      options: ['Phản ứng tỏa nhiệt', 'Phản ứng thu nhiệt', 'Không trao đổi nhiệt', 'Phản ứng trung hòa'],
      correctAnswer: 1,
      explanation: 'Hòa tan thu nhiệt từ môi trường → lạnh.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Khi nhân hệ số phương trình lên 3, ΔH sẽ:',
      options: ['Không đổi', 'Nhân 3', 'Chia 3', 'Đảo dấu'],
      correctAnswer: 1,
      explanation: 'ΔH tỉ lệ với lượng chất theo PTHH.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Cộng các phương trình trung gian thì ΔH tổng bằng tổng ΔH trung gian.',
      correctAnswer: true,
      explanation: 'Định luật Hess cho phép cộng đại số ΔH.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Để tính ΔH phản ứng từ ΔH_f°, dùng công thức:',
      options: ['ΣΔH_f°(pư) - ΣΔH_f°(sp)', 'ΣΔH_f°(sp) - ΣΔH_f°(pư)', 'ΔH_f°(sp) + ΔH_f°(pư)', 'Không dùng được'],
      correctAnswer: 1,
      explanation: 'ΔH = ΣΔH_f° sản phẩm - ΣΔH_f° phản ứng.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Đặc điểm của phản ứng tỏa nhiệt:',
      options: ['ΔH > 0', 'Hệ hấp thụ nhiệt', 'Môi trường nóng lên', 'Entropi luôn giảm'],
      correctAnswer: 2,
      explanation: 'Tỏa nhiệt làm môi trường ấm hơn (ΔH âm).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Biểu thức nào sai khi làm việc với ΔH?',
      options: ['Đảo chiều phản ứng → đổi dấu ΔH', 'Cộng hai phản ứng → cộng ΔH', 'Chia hệ số → chia ΔH tương ứng', 'Nhân hệ số → ΔH giữ nguyên'],
      correctAnswer: 3,
      explanation: 'Nhân hệ số phải nhân ΔH tương ứng.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'ΔH không phụ thuộc lộ trình phản ứng.',
      correctAnswer: true,
      explanation: 'Thuộc tính hàm trạng thái.',
      points: 10
    }
  ]
};
