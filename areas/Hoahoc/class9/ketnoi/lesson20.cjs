module.exports = {
  classId: 9,
  curriculumType: 'ketnoi',
  chapterId: 6,
  chapterName: 'Chương 6: Kim loại. Sự khác nhau cơ bản giữa phi kim và kim loại',
  lessonId: 20,
  title: 'Bài 20: Tách kim loại và sử dụng hợp kim',
  description: 'Các phương pháp khai thác, chế biến kim loại và vai trò hợp kim.',
  level: 'Intermediate',
  order: 3,
  theory: `
    <h2>⛏️ Tách kim loại và hợp kim</h2>
    <ul>
      <li><strong>Không tồn tại đơn chất rộng rãi:</strong> kim loại thường ở dạng quặng (oxit, sunfua, cacbonat).</li>
      <li><strong>Khai thác - tuyển - khử:</strong> tuyển quặng, nung, khử oxi hoá bằng C/CO/H2 (ví dụ: Fe2O3 + 3CO → 2Fe + 3CO2).</li>
      <li><strong>Điện phân:</strong> áp dụng với kim loại hoạt động mạnh (Al, Na, Mg) từ muối/oxit nóng chảy.</li>
      <li><strong>Hợp kim:</strong> pha trộn kim loại (và phi kim) để tăng độ bền, chống ăn mòn, giảm khối lượng. Ví dụ: Thép (Fe+C), Đồng thau (Cu+Zn), Nhôm hợp kim (Al + Mg/Si).</li>
      <li><strong>Ứng dụng hợp kim:</strong> xây dựng, giao thông, điện, hàng không.</li>
    </ul>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Kim loại nào thuộc nhóm phải điện phân oxit/nóng chảy để điều chế?',
      options: ['Fe', 'Al', 'Cu', 'Ag'],
      correctAnswer: 1,
      explanation: 'Al hoạt động mạnh, phải điện phân Al2O3 trong criolit.'
    },
    {
      type: 'true-false',
      question: 'Thép là hợp kim của Fe và C.',
      correctAnswer: true,
      explanation: 'Đúng, thép chứa ~0,02-2% C và có thể thêm phụ gia.'
    },
    {
      type: 'multiple-choice',
      question: 'Phương pháp nào phù hợp để thu Fe từ quặng hematit?',
      options: ['Dien phan', 'Dong nhat', 'Khu bang CO trong lo cao', 'Thu hoi tu dung dich'],
      correctAnswer: 2,
      explanation: 'Fe2O3 được khử bằng CO/H2 trong lò cao.'
    },
    {
      type: 'fill-in-blank',
      question: 'PT: Fe2O3 + 3CO → 2Fe + ___CO2',
      correctAnswer: '3',
      explanation: 'Hệ số CO2 là 3.'
    },
    {
      type: 'multiple-choice',
      question: 'Đồng thau (brass) gồm thành phần chính:',
      options: ['Cu + Zn', 'Cu + Sn', 'Fe + C', 'Al + Mg'],
      correctAnswer: 0,
      explanation: 'Brass là hợp kim Cu và Zn.'
    },
    {
      type: 'multiple-choice',
      question: 'Hợp kim nào được dùng làm vỏ máy bay vì nhẹ và bền?',
      options: ['Thép không gỉ', 'Nhôm + Mg/Si', 'Đồng thau', 'Gang xám'],
      correctAnswer: 1,
      explanation: 'Hợp kim nhôm với Mg/Si có tỉ trọng nhỏ, độ bền tốt.'
    },
    {
      type: 'true-false',
      question: 'Gang có hàm lượng C cao hơn thép.',
      correctAnswer: true,
      explanation: 'Gang ~2-4%C, thép <2% C.'
    },
    {
      type: 'fill-in-blank',
      question: 'Điện phân nóng chảy NaCl tạo ra Na + ___',
      correctAnswer: 'Cl2',
      explanation: 'Catot thu Na, anot giải phóng Cl2.'
    },
    {
      type: 'multiple-choice',
      question: 'Bước nào thường dùng trước khi khử quặng kim loại?',
      options: ['Nghiền mịn quặng', 'Tuyển chọn lọc quặng', 'Tuyển quặng/tăng hàm lượng', 'Đóng gói bán'],
      correctAnswer: 2,
      explanation: 'Tuyển quặng để tăng hàm lượng kim loại trước khi khử.'
    },
    {
      type: 'multiple-choice',
      question: 'Hợp kim nào chịu ăn mòn tốt nhất trong các lựa chọn sau?',
      options: ['Thép cacbon', 'Thép không gỉ (Fe-Cr-Ni)', 'Gang trắng', 'Đồng thau'],
      correctAnswer: 1,
      explanation: 'Thép không gỉ (Fe-Cr-Ni) chống rỉ sét rất tốt.'
    }
  ]
};
