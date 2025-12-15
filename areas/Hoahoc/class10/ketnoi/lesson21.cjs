module.exports = {
  classId: 10,
  curriculumType: 'ketnoi',
  chapterId: 7,
  chapterName: 'Chương 7: Nguyên tố nhóm halogen',
  lessonId: 21,
  title: 'Bài 21: Nhóm halogen',
  description: 'Nhóm halogen: cấu hình ns2np5, xu hướng nhận e, biến đổi tính chất và ứng dụng/chú ý an toàn.',
  level: 'Intermediate',
  order: 1,
  theory: `
    <h2>Nhóm halogen (VIIA)</h2>
    <h3>Cấu hình & độ âm điện</h3>
    <ul>
      <li>Cấu hình lớp ngoài ns2 np5 → cần 1e để đạt bão hòa, tính oxi hoá rất mạnh (đặc biệt F).</li>
      <li>Độ âm điện giảm từ F → I; bán kính tăng; năng lượng ion hóa giảm.</li>
    </ul>
    <h3>Tính chất vật lí</h3>
    <ul>
      <li>Trạng thái/màu: F2 khí vàng lục, Cl2 khí vàng lục nhạt, Br2 lỏng nâu đỏ, I2 rắn tím.</li>
      <li>Nhiệt độ sôi tăng dần xuống nhóm (phân tử lớn, lực London tăng).</li>
    </ul>
    <h3>Tính chất hoá học</h3>
    <ul>
      <li>Phi kim mạnh, oxi hoá được nhiều kim loại (tạo muối halogenua) và phi kim (S, P).</li>
      <li>Phản ứng thế trong dung dịch muối: halogen mạnh đẩy halogen yếu hơn ra khỏi muối.</li>
      <li>Phản ứng tự oxi hoá - khử: Cl2 + NaOH (lạnh) → NaCl + NaClO (nước Javen).</li>
    </ul>
    <h3>Ứng dụng & an toàn</h3>
    <ul>
      <li>Cl2 khử trùng nước; Br2/I2 trong y học; F- trong kem đánh răng (nồng độ kiểm soát).</li>
      <li>Độc tính: Cl2, F2 ăn mòn mạnh; cần thông gió và bảo hộ khi thí nghiệm.</li>
    </ul>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Đặc điểm chung của cấu hình e halogen?',
      options: ['ns2 np6', 'ns2 np5', 'ns2 np4', 'ns2 np3'],
      correctAnswer: 1,
      explanation: 'Halogen có 7 e lớp ngoài: ns2 np5.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Halogen nào có tính oxi hoá mạnh nhất?',
      options: ['Cl2', 'Br2', 'I2', 'F2'],
      correctAnswer: 3,
      explanation: 'Độ âm điện lớn nhất, bán kính nhỏ → F2 oxi hoá mạnh nhất.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Trong dãy F2 → I2, tính oxi hoá giảm dần.',
      correctAnswer: true,
      explanation: 'Đúng, khả năng nhận e giảm khi xuống nhóm.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Trạng thái vật lí của Br2 ở điều kiện thường là:',
      options: ['Khí', 'Lỏng', 'Rắn', 'Plasma'],
      correctAnswer: 1,
      explanation: 'Br2 là chất lỏng nâu đỏ.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng thế điển hình của halogen trong dung dịch muối:',
      options: ['Cl2 + 2NaBr → 2NaCl + Br2', '2Na + Cl2 → 2NaCl', 'H2 + Cl2 → 2HCl', 'Br2 + H2O → HBr + HBrO'],
      correctAnswer: 0,
      explanation: 'Halogen mạnh (Cl2) đẩy halogen yếu hơn (Br2) khỏi muối.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Ứng dụng nào gắn với Cl2?',
      options: ['Khử trùng nước', 'Nhồi bóng bay', 'Sản xuất thép', 'Nhiên liệu tên lửa'],
      correctAnswer: 0,
      explanation: 'Cl2 dùng khử trùng, sản xuất Javen, PVC.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Halogen càng nặng thì tính khử (của ion X-) càng mạnh.',
      correctAnswer: true,
      explanation: 'I- là chất khử mạnh hơn Cl-, F-.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Khí F2 có thể oxi hoá H2O tạo:',
      options: ['H2 và O2', 'HF và O2', 'HF và O3', 'HF và H2'],
      correctAnswer: 2,
      explanation: 'F2 + H2O → HF + O2/O3 (F2 rất mạnh).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Nước Javen thu được từ phản ứng:',
      options: ['Cl2 + NaOH (lạnh loãng)', 'Cl2 + NaOH (nóng đậm đặc)', 'Br2 + KOH nóng', 'I2 + KI'],
      correctAnswer: 0,
      explanation: 'Cl2 + 2NaOH (lạnh) → NaCl + NaClO + H2O.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Cần thông gió và bảo hộ khi làm việc với Cl2, F2 vì tính độc và ăn mòn.',
      correctAnswer: true,
      explanation: 'Halogen mạnh gây bỏng, kích ứng hô hấp.',
      points: 10
    }
  ]
};
