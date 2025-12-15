module.exports = {
  classId: 10,
  curriculumType: 'ketnoi',
  chapterId: 7,
  chapterName: 'Chương 7: Nguyên tố nhóm halogen',
  lessonId: 22,
  title: 'Bài 22: Hydrogen halide. Muối halide',
  description: 'Axit HX, độ mạnh tăng xuống nhóm; tính chất muối halide, phản ứng nhận biết AgNO3.',
  level: 'Intermediate',
  order: 2,
  theory: `
    <h2>Hydrogen halide & muối halide</h2>
    <h3>Axit HX (HF, HCl, HBr, HI)</h3>
    <ul>
      <li>Axit đơn nấc; độ mạnh tăng xuống nhóm do liên kết H–X yếu dần.</li>
      <li>Tính chất: tan mạnh trong nước; HF ăn mòn thuỷ tinh (tạo SiF4); HCl/HBr/HI là axit mạnh điển hình.</li>
      <li>Khả năng khử: X- tăng dần (I- khử mạnh, bị oxi hóa tạo I2).</li>
    </ul>
    <h3>Muối halide (MX)</h3>
    <ul>
      <li>Điều chế bằng trung hòa HX với bazơ hoặc phản ứng thế giữa muối.</li>
      <li>Độ tan: đa số tan; kết tủa ít tan AgX (AgCl trắng, AgBr vàng nhạt, AgI vàng), PbX2.</li>
      <li>Phản ứng nhận biết: dung dịch AgNO3 → kết tủa đặc trưng; thêm NH3: AgCl tan, AgBr ít tan, AgI không tan.</li>
    </ul>
    <h3>Ứng dụng</h3>
    <ul>
      <li>HCl công nghiệp (tẩy gỉ, PVC), NaCl thực phẩm/điện phân clor-kiềm, CaF2 sản xuất HF.</li>
      <li>Kiểm soát an toàn khi dùng HF và Cl2 (độc, ăn mòn mạnh).</li>
    </ul>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Axit nào mạnh hơn?',
      options: ['HF', 'HCl', 'HBr', 'HI'],
      correctAnswer: 3,
      explanation: 'Độ mạnh tăng xuống nhóm do liên kết H-X yếu dần; HI mạnh nhất.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Muối nào ít tan trong nước?',
      options: ['NaCl', 'KBr', 'AgCl', 'CaCl2'],
      correctAnswer: 2,
      explanation: 'AgCl kết tủa trắng, rất ít tan.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'HF có thể ăn mòn thủy tinh.',
      correctAnswer: true,
      explanation: 'HF tạo SiF4 với SiO2 → ăn mòn thủy tinh.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Độ mạnh axit HX tăng do:',
      options: ['Liên kết H-X ngắn hơn xuống nhóm', 'Liên kết H-X yếu dần xuống nhóm', 'Độ âm điện X tăng xuống nhóm', 'H+ nhiều hơn'],
      correctAnswer: 1,
      explanation: 'Liên kết H-X yếu dần (bán kính lớn) → dễ phân ly.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Ion halide nào là chất khử mạnh nhất?',
      options: ['F-', 'Cl-', 'Br-', 'I-'],
      correctAnswer: 3,
      explanation: 'I- dễ bị oxi hóa nhất → khử mạnh nhất.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Thử nhận biết Cl- bằng thuốc thử:',
      options: ['BaCl2', 'AgNO3', 'NaOH', 'H2SO4 loãng'],
      correctAnswer: 1,
      explanation: 'AgNO3 tạo kết tủa trắng AgCl; tan trong NH3.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'AgBr tan hoàn toàn trong NH3 dư.',
      correctAnswer: false,
      explanation: 'AgBr chỉ tan một phần; AgI hầu như không tan.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng tạo muối halide thường là:',
      options: ['Trung hòa HX với bazơ', 'Oxi hóa kim loại bằng O2', 'Phản ứng trùng hợp', 'Phản ứng cộng H2'],
      correctAnswer: 0,
      explanation: 'HX + bazơ → muối halide + nước.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Muối nào dễ bay hơi?',
      options: ['NaCl', 'KCl', 'NH4Cl', 'CaCl2'],
      correctAnswer: 2,
      explanation: 'NH4Cl thăng hoa ở nhiệt độ không quá cao.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Dung dịch HCl đặc có mùi xốc và ăn mòn kim loại.',
      correctAnswer: true,
      explanation: 'HCl đặc bốc khói, phản ứng với nhiều kim loại (trừ Au, Pt...).',
      points: 10
    }
  ]
};
