module.exports = {
  classId: 11,
  curriculumType: 'ketnoi',
  chapterId: 3,
  chapterName: 'Chương 3: Đại cương về hoá học hữu cơ',
  lessonId: 10,
  title: 'Bài 10: Hợp chất hữu cơ và hoá học hữu cơ',
  description: 'Khái niệm hợp chất hữu cơ, phân loại, đặc điểm liên kết C, công thức cấu tạo.',
  level: 'Intermediate',
  order: 10,
  theory: `
    <h2>Hợp chất hữu cơ</h2>
    <p style="margin:8px 0; color:#334155;">Nắm khái niệm, đặc điểm liên kết C và các dạng công thức biểu diễn trong hoá hữu cơ.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">Đặc điểm chung</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Chủ yếu liên kết cộng hoá trị; phân tử khối không quá lớn, dễ bay hơi hơn muối vô cơ.</li>
          <li>C nguyên tố hoá trị 4, lai hoá sp3 (đơn), sp2 (đôi), sp (ba) → đa dạng cấu trúc.</li>
          <li>Có thể chứa O, N, halogen, S → tạo nhóm chức quyết định tính chất.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
        <h4 style="margin:0 0 6px; color:#9a3412;">Phân loại</h4>
        <ul style="margin:0; padding-left:18px; color:#7c2d12;">
          <li>Hiđrocacbon (chỉ C, H): ankan, anken, ankin, thơm.</li>
          <li>Dẫn xuất: thay H bằng nhóm chức (–OH, –X, –CHO, –COOH...).</li>
          <li>Mạch: thẳng, nhánh, vòng no; vòng thơm; dị vòng (có dị tố trong vòng).</li>
        </ul>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Các loại công thức</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Công thức phân tử (CTPT): nC, nH,...; công thức đơn giản nhất.</li>
          <li>Công thức cấu tạo (CTCT): thể hiện liên kết và sắp xếp nguyên tử.</li>
          <li>Công thức thu gọn/vạch: CH3–CH2–CH3, dùng trong mạch carbon.</li>
          <li>Công thức không gian (Newman, Sawhorse) dùng phân tích lập thể.</li>
        </ul>
      </div>
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc); color:#334155;">
        <h4 style="margin:0 0 6px; color:#312e81;">Đồng đẳng và đồng phân</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Dãy đồng đẳng: sai khác CH2, tính chất hoá học tương tự, vật lí biến đổi dần.</li>
          <li>Đồng phân: cùng CTPT, khác sắp xếp; xuất hiện từ C4 với ankan (đồng phân mạch) và từ C2 với nối đôi (vị trí nối đôi).</li>
        </ul>
      </div>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Đặc điểm liên kết chính trong hợp chất hữu cơ là:',
      options: ['Ion', 'Kim loại', 'Cộng hoá trị', 'Hydro nội phân tử'],
      correctAnswer: 2,
      explanation: 'Hợp chất hữu cơ chủ yếu liên kết cộng hoá trị.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Dãy đồng đẳng ankan kế tiếp nhau hơn kém nhau:',
      options: ['Một nguyên tử H', 'Một nhóm CH2', 'Một nguyên tử C', 'Hai nguyên tử H'],
      correctAnswer: 1,
      explanation: 'Các chất cùng dãy đồng đẳng sai khác nhau một nhóm CH2.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'C lai hoá sp có góc liên kết xấp xỉ 120°.',
      correctAnswer: false,
      explanation: 'sp cho cấu trúc thẳng, góc 180°; sp2 mới ~120°.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Công thức thu gọn của butan mạch thẳng là:',
      options: ['CH3–CH2–CH3', 'CH3–CH2–CH2–CH3', '(CH3)3CH', 'CH2=CH2'],
      correctAnswer: 1,
      explanation: 'Butan có 4C, mạch thẳng: CH3–CH2–CH2–CH3.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Nhóm chức nào thuộc dẫn xuất halogen?',
      options: ['–OH', '–NH2', '–Cl', '–COOH'],
      correctAnswer: 2,
      explanation: 'Halogenoalkan có halogen gắn với C.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Đồng phân mạch xuất hiện từ ankan C4 trở lên.',
      correctAnswer: true,
      explanation: 'C4H10 có 2 đồng phân mạch; C1–C3 không.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Hiđrocacbon thơm đặc trưng bởi:',
      options: ['Có liên kết đơn', 'Có hệ π liên hợp vòng thỏa điều kiện thơm', 'Chỉ có liên kết ba', 'Tan mạnh trong nước'],
      correctAnswer: 1,
      explanation: 'Tính thơm do hệ π liên hợp đóng vòng ổn định (Hückel 4n+2).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Công thức phân tử cho biết:',
      options: ['Cách sắp xếp nguyên tử', 'Số nguyên tử từng nguyên tố', 'Góc liên kết', 'Đồng phân quang học'],
      correctAnswer: 1,
      explanation: 'CTPT chỉ cho biết thành phần nguyên tố và số nguyên tử.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Công thức cấu tạo vạch giúp biểu diễn nhanh mạch carbon.',
      correctAnswer: true,
      explanation: 'Vạch gấp khúc đại diện khung C–C, đầu/mút/đỉnh là C.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Dãy đồng đẳng khác nhau một nhóm ______',
      correctAnswer: 'CH2',
      explanation: 'Mỗi chất trong dãy hơn kém nhau 14 u theo nhóm CH2.',
      points: 10
    }
  ]
};
