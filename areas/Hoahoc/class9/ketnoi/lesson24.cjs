module.exports = {
  classId: 9,
  curriculumType: 'ketnoi',
  chapterId: 7,
  chapterName: 'Chương 7: Giới thiệu về chất hữu cơ. Hydrocarbon và nguồn nhiên liệu',
  lessonId: 24,
  title: 'Bài 24: Anken',
  description: 'Hydrocarbon không no có một liên kết đôi C=C, tính chất đặc trưng.',
  level: 'Intermediate',
  order: 7,
  theory: `
    <h2>🧪 Anken (alkene)</h2>
    <ul>
      <li><strong>Công thức chung:</strong> CnH2n (n ≥ 2).</li>
      <li><strong>Có liên kết đôi C=C</strong> → dễ tham gia phản ứng cộng, oxi hoá, trùng hợp.</li>
      <li><strong>Hoá học chính:</strong> cộng H2 (Ni, t°) → ankan; cộng Br2 (mất màu nâu đỏ) → dibrom; cộng HCl → halogenankan; trùng hợp etilen → polietilen (PE).</li>
      <li><strong>Vật lí:</strong> C2-C4 khí, C5 trở lên lỏng/rắn, không tan nước, nhẹ hơn nước.</li>
      <li><strong>Ứng dụng:</strong> sản xuất nhựa PE, PVC, dung môi, nguyên liệu hoá dầu.</li>
    </ul>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Công thức phân tử của etilen:',
      options: ['C2H6', 'C2H4', 'C3H6', 'C4H8'],
      correctAnswer: 1,
      explanation: 'Etilen là anken đơn giản nhất: C2H4.'
    },
    {
      type: 'true-false',
      question: 'Anken dễ tham gia phản ứng cộng Br2 làm mất màu dung dịch brom.',
      correctAnswer: true,
      explanation: 'Liên kết đôi bị cộng Br2, dung dịch brom mất màu.'
    },
    {
      type: 'multiple-choice',
      question: 'Sản phẩm khi cộng HCl vào etilen:',
      options: ['CH3CH2Cl', 'CH3CH3', 'CH2Cl-CH2Cl', 'C2H5OH'],
      correctAnswer: 0,
      explanation: 'Cộng HCl theo quy tắc Markovnikov tạo etyl clorua.'
    },
    {
      type: 'fill-in-blank',
      question: 'Phản ứng trùng hợp: nCH2=CH2 → ___ (PE)',
      correctAnswer: '(-CH2-CH2-)n',
      explanation: 'Sinh polietilen với mắt xích (-CH2-CH2-).' 
    },
    {
      type: 'multiple-choice',
      question: 'Nhận dạng nhanh: Anken có công thức chung nào?',
      options: ['CnH2n+2', 'CnH2n', 'CnH2n-2', 'CnH2n+1'],
      correctAnswer: 1,
      explanation: 'Anken: CnH2n.'
    },
    {
      type: 'multiple-choice',
      question: 'Liên kết đôi trong anken thường tham gia phản ứng:',
      options: ['Thế Cl2', 'Cộng H2, Br2, HX', 'Hoà tan trong nước', 'Tạo muối'],
      correctAnswer: 1,
      explanation: 'Liên kết đôi dễ cộng các tác nhân như H2, Br2, HX.'
    },
    {
      type: 'true-false',
      question: 'Anken kém bền hơn ankan.',
      correctAnswer: true,
      explanation: 'Liên kết đôi kém bền hơn liên kết đơn nên hoạt động hơn.'
    },
    {
      type: 'fill-in-blank',
      question: 'Iso-buten có công thức là C4H__',
      correctAnswer: '8',
      explanation: 'Anken n = 4 → C4H8.'
    },
    {
      type: 'multiple-choice',
      question: 'Hiện tượng gì xảy ra khi dẫn dung dịch brom vào anken?',
      options: ['Xuất hiện kết tủa trắng', 'Dung dịch mất màu nâu đỏ', 'Tạo bọt khí', 'Tạo mùi khai'],
      correctAnswer: 1,
      explanation: 'Br2 cộng vào liên kết đôi làm dung dịch brom mất màu.'
    },
    {
      type: 'multiple-choice',
      question: 'Sản phẩm cộng H2 vào propene (Ni, t°) là:',
      options: ['Propan', 'Propadien', 'Propanol', 'Propenyl clorua'],
      correctAnswer: 0,
      explanation: 'Cộng H2 bão hoà liên kết đôi tạo propan.'
    }
  ]
};
