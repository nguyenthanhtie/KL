module.exports = {
  classId: 9,
  curriculumType: 'ketnoi',
  chapterId: 9,
  chapterName: 'Chương 9: Lipid. Carbohydrate. Protein. Polymer',
  lessonId: 32,
  title: 'Bài 32: Polime',
  description: 'Khái niệm polime, ví dụ và ứng dụng thông dụng.',
  level: 'Beginner',
  order: 15,
  theory: `
    <h2>🧵 Polime</h2>
    <ul>
      <li><strong>Polime:</strong> hợp chất có phân tử lớn từ nhiều đơn vị nhỏ (monome) lặp lại.</li>
      <li><strong>Phân loại:</strong> polime tự nhiên (xenlulozơ, protein), nhân tạo (PE, PVC, nylon), bán tổng hợp (cao su buna-N).</li>
      <li><strong>Phương pháp tạo:</strong> trùng hợp (monome không no → polime), trùng ngưng (có nhóm chức -COOH/-NH2...).</li>
      <li><strong>Thuộc tính:</strong> bền, dễ gia công, không dẫn điện; nhiều polime khó phân huỷ sinh học → cần tái chế.</li>
      <li><strong>Ứng dụng:</strong> nhựa, sợi, cao su, keo dán, vật liệu y sinh.</li>
    </ul>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Polietilen (PE) được tạo từ monome nào?',
      options: ['Etilen', 'Propylen', 'Vinyl clorua', 'Styren'],
      correctAnswer: 0,
      explanation: 'PE trùng hợp từ etilen (CH2=CH2).' 
    },
    {
      type: 'true-false',
      question: 'Xenlulozơ là polime tự nhiên.',
      correctAnswer: true,
      explanation: 'Xenlulozơ là polisaccarit tự nhiên.'
    },
    {
      type: 'multiple-choice',
      question: 'Nylon-6,6 là ví dụ polime được tạo bởi phản ứng:',
      options: ['Trùng hợp', 'Trùng ngưng', 'Điện phân', 'Ngưng tụ với kim loại'],
      correctAnswer: 1,
      explanation: 'Nylon-6,6 hình thành qua trùng ngưng giữa điamin và điacid.'
    },
    {
      type: 'fill-in-blank',
      question: 'PVC có monome là vinyl ___',
      correctAnswer: 'clorua',
      explanation: 'Monome: CH2=CHCl.'
    },
    {
      type: 'multiple-choice',
      question: 'Vấn đề môi trường của polime nhân tạo là:',
      options: ['Phát tia UV', 'Khó phân huỷ, rác thải nhựa', 'Phát mùi thơm', 'Không tồn tại'],
      correctAnswer: 1,
      explanation: 'Nhiều polime khó phân huỷ, gây ô nhiễm nhựa.'
    },
    {
      type: 'multiple-choice',
      question: 'Loại polime nào phân huỷ sinh học tốt hơn?',
      options: ['PE thông thường', 'PVC', 'PLA từ tinh bột', 'PS (xốp)'],
      correctAnswer: 2,
      explanation: 'PLA (polylactic acid) từ nguồn tái tạo có khả năng phân huỷ sinh học.'
    },
    {
      type: 'true-false',
      question: 'Trùng hợp là phản ứng ghép các monome không no thành chuỗi dài.',
      correctAnswer: true,
      explanation: 'Monome có liên kết đôi/ba được mở ra tạo polime (VD etilen → PE).' 
    },
    {
      type: 'fill-in-blank',
      question: 'Polystyren được tạo từ monome styren (C6H5-CH=CH2) qua phản ứng ___ hợp.',
      correctAnswer: 'trùng',
      explanation: 'Trùng hợp mở liên kết đôi tạo chuỗi polystyren.'
    },
    {
      type: 'multiple-choice',
      question: 'Cao su buna-N được tạo từ butadien và:',
      options: ['Etylen', 'Vinyl clorua', 'Acrylonitrin', 'Cloroform'],
      correctAnswer: 2,
      explanation: 'Buna-N là đồng trùng hợp butadien và acrylonitrin.'
    },
    {
      type: 'multiple-choice',
      question: 'Tính chất chung của đa số polime:',
      options: ['Dẫn điện tốt', 'Bền, nhẹ, dễ gia công', 'Dễ bay hơi', 'Tan tốt trong nước'],
      correctAnswer: 1,
      explanation: 'Polime thường bền, nhẹ, dễ gia công nhưng không dẫn điện và khó tan nước.'
    }
  ]
};
