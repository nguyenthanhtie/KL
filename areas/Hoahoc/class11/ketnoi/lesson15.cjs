module.exports = {
  classId: 11,
  curriculumType: 'ketnoi',
  chapterId: 4,
  chapterName: 'Chương 4: Hydrocarbon',
  lessonId: 15,
  title: 'Bài 15: Alkane',
  description: 'Cấu tạo, tính chất, phản ứng thế, cracking và ứng dụng của ankan.',
  level: 'Intermediate',
  order: 15,
  theory: `
    <h2>Ankan</h2>
    <p style="margin:8px 0; color:#334155;">Ôn cấu trúc sp3, phản ứng thế gốc tự do, oxi hoá và ứng dụng trong công nghiệp dầu khí.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">Cấu tạo & đồng đẳng</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Công thức chung CnH2n+2; C lai hoá sp3, góc ~109,5°.</li>
          <li>Mạch thẳng/nhánh/cyclo (cycloalkan: CnH2n).</li>
          <li>Từ C4 bắt đầu có đồng phân mạch; tính chất vật lí: tăng C → tăng T sôi, mạch nhánh làm giảm T sôi.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
        <h4 style="margin:0 0 6px; color:#9a3412;">Tính chất hoá học</h4>
        <ul style="margin:0; padding-left:18px; color:#7c2d12;">
          <li>Thế halogen (gốc tự do, ánh sáng/ nhiệt): CH4 + Cl2 → CH3Cl + HCl.</li>
          <li>Oxi hoá hoàn toàn: cháy toả nhiệt; oxi hoá không hoàn toàn → CO, C.</li>
          <li>Cracking/pyrolysis: phân cắt C–C tạo anken/ankan nhẹ hơn.</li>
        </ul>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Nguồn & ứng dụng</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Khí thiên nhiên (CH4, C2H6) và dầu mỏ (hỗn hợp ankan).</li>
          <li>Nhiên liệu (gas, LPG, xăng, dầu hoả), dung môi, nguyên liệu cracking sản xuất anken.</li>
        </ul>
      </div>
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc); color:#334155;">
        <h4 style="margin:0 0 6px; color:#312e81;">Cơ chế thế gốc tự do</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Khơi mào: Cl2 → 2Cl· (ánh sáng).</li>
          <li>Phát triển: Cl· + RH → R· + HCl; R· + Cl2 → RCl + Cl·.</li>
          <li>Ngắt mạch: Cl· + Cl· → Cl2; R· + R· → R–R.</li>
        </ul>
      </div>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Công thức chung ankan mạch hở là:',
      options: ['CnH2n', 'CnH2n+2', 'CnH2n-2', 'CnHn'],
      correctAnswer: 1,
      explanation: 'Ankan no mạch hở: CnH2n+2.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng thế halogen của ankan cần điều kiện:',
      options: ['Xúc tác axit', 'Ánh sáng hoặc nhiệt', 'Nhiệt độ rất thấp', 'Áp suất cao'],
      correctAnswer: 1,
      explanation: 'Phản ứng gốc tự do khơi mào bởi ánh sáng/ nhiệt.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Ankan kém tan trong nước do không phân cực.',
      correctAnswer: true,
      explanation: 'Ankan không phân cực → không tạo H-bond với nước.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Sản phẩm chính khi cracking C10H22 ở 500°C (xúc tác) có thể là:',
      options: ['Chỉ CO2', 'Anken và ankan nhẹ', 'Chỉ benzen', 'Chỉ metan'],
      correctAnswer: 1,
      explanation: 'Cracking tạo hỗn hợp anken/ankan nhẹ hơn (xăng, khí).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Đồng phân mạch của C5H12 gồm:',
      options: ['1', '2', '3', '4'],
      correctAnswer: 2,
      explanation: 'Pentane có 3 đồng phân mạch (n-pentane, isopentane, neopentane).',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Cyclohexan có công thức C6H12, cùng CT chung với anken mạch hở.',
      correctAnswer: true,
      explanation: 'Cycloalkan CnH2n giống anken về CTPT nhưng khác cấu trúc.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Giai đoạn khơi mào trong thế Cl của CH4 là:',
      options: ['Cl· + CH4 → CH3· + HCl', 'CH3· + Cl2 → CH3Cl + Cl·', 'Cl2 → 2Cl·', 'Cl· + Cl· → Cl2'],
      correctAnswer: 2,
      explanation: 'Ánh sáng tách Cl2 thành 2 gốc Cl·.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Khi đốt thiếu oxi, ankan tạo sản phẩm khí độc:',
      options: ['CO2', 'SO2', 'CO', 'NO'],
      correctAnswer: 2,
      explanation: 'Thiếu oxi → CO gây ngộ độc.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Metan là thành phần chính của khí thiên nhiên.',
      correctAnswer: true,
      explanation: 'Khí thiên nhiên chứa chủ yếu CH4.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Phản ứng: CH4 + Cl2 (as) → ______ + HCl',
      correctAnswer: 'CH3Cl',
      explanation: 'Thế gốc tự do tạo clorometan.',
      points: 10
    }
  ]
};
