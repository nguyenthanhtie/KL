module.exports = {
  classId: 9,
  curriculumType: 'ketnoi',
  chapterId: 6,
  chapterName: 'Chương 6: Kim loại. Sự khác nhau cơ bản giữa phi kim và kim loại',
  lessonId: 18,
  title: 'Bài 18: Tính chất chung của kim loại',
  description: 'Ôn tính chất vật lí, hoá học cơ bản và ứng dụng của kim loại.',
  level: 'Intermediate',
  order: 1,
  theory: `
    <h2>⚙️ Tính chất chung của kim loại</h2>
    <p>Kim loại có mạng tinh thể đối xứng, liên kết kim loại giúp dẫn điện, dẫn nhiệt tốt và dễ dát mỏng.</p>
    <ul>
      <li><strong>Tính chất vật lí:</strong> ánh kim, dẫn điện/nhệt tốt, dẻo, nhiều kim loại có nhiệt độ nóng chảy cao (trừ Hg).</li>
      <li><strong>Tính chất hoá học:</strong> tác dụng với phi kim (O2, S, Cl2), với dung dịch axit, với muối của kim loại yếu hơn.</li>
      <li><strong>Ứng dụng:</strong> thép trong xây dựng, Cu/Al làm dây dẫn, Au/Ag làm trang sức, Ti dùng trong y học.</li>
    </ul>
    <div style="background:#f8fafc;padding:12px;border:1px solid #e2e8f0;border-radius:8px;">
      <p><strong>Ví dụ nhanh:</strong> 2Mg + O2 → 2MgO; Fe + CuSO4 → FeSO4 + Cu; 2Al + 6HCl → 2AlCl3 + 3H2↑</p>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Tính chất vật lí nào đặc trưng của kim loại?',
      options: ['Ánh kim, dẫn điện', 'Dễ bay hơi', 'Mùi khai', 'Tính axit mạnh'],
      correctAnswer: 0,
      explanation: 'Kim loại có ánh kim và dẫn điện, dẫn nhiệt tốt.'
    },
    {
      type: 'multiple-choice',
      question: 'Kim loại nào là lỏng ở điều kiện thường?',
      options: ['Fe', 'Cu', 'Hg', 'Al'],
      correctAnswer: 2,
      explanation: 'Thuỷ ngân (Hg) lỏng ở 25°C.'
    },
    {
      type: 'true-false',
      question: 'Kim loại đứng trước H trong dãy hoạt động có thể đẩy H2 khỏi axit loãng.',
      correctAnswer: true,
      explanation: 'Đúng, ví dụ Zn + 2HCl → ZnCl2 + H2.'
    },
    {
      type: 'fill-in-blank',
      question: 'Phản ứng 2Al + 3Cl2 → ___AlCl3',
      correctAnswer: '2',
      explanation: 'Hệ số là 2AlCl3.'
    },
    {
      type: 'multiple-choice',
      question: 'Ứng dụng kim loại dẫn điện phổ biến nhất:',
      options: ['Fe', 'Cu', 'Au', 'Ti'],
      correctAnswer: 1,
      explanation: 'Đồng (Cu) được dùng làm dây điện phổ biến nhất.'
    },
    {
      type: 'multiple-choice',
      question: 'Kim loại nào thường được đặt làm catot hi sinh chống han?',
      options: ['Zn', 'Na', 'Hg', 'Mg'],
      correctAnswer: 0,
      explanation: 'Kẽm phủ thép (mạ kẽm) để chống gỉ, đóng vai trò catot hi sinh.'
    },
    {
      type: 'true-false',
      question: 'Kim loại dạng bột phản ứng với oxi nhanh hơn dạng thỏi.',
      correctAnswer: true,
      explanation: 'Dạng bột có diện tích tiếp xúc lớn nên dễ bị oxi hoá hơn.'
    },
    {
      type: 'multiple-choice',
      question: 'Dãy hoạt động hoá học sắp xếp kim loại theo:',
      options: ['Độ nặng', 'Bán kính nguyên tử', 'Độ dễ bị oxi hoá', 'Khối lượng riêng'],
      correctAnswer: 2,
      explanation: 'Kim loại đứng đầu dãy dễ bị oxi hoá (nhường electron) nhất.'
    },
    {
      type: 'fill-in-blank',
      question: 'Phản ứng Fe + CuSO4 → FeSO4 + ___',
      correctAnswer: 'Cu',
      explanation: 'Fe đẩy Cu khỏi muối, tạo Cu kim loại tự do.'
    },
    {
      type: 'multiple-choice',
      question: 'Tính chất nào không phải của đa số kim loại?',
      options: ['Ánh kim', 'Dẫn nhiệt', 'Dễ bay hơi', 'Dễ uốn kéo sợi'],
      correctAnswer: 2,
      explanation: 'Kim loại hầu hết không bay hơi (trừ Hg lỏng nhưng cũng không bay hơi mạnh).'
    }
  ]
};
