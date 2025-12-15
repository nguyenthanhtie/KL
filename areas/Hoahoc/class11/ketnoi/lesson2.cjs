module.exports = {
  classId: 11,
  curriculumType: 'ketnoi',
  chapterId: 1,
  chapterName: 'Chương 1: Cân bằng hoá học',
  lessonId: 2,
  title: 'Bài 2: Cân bằng trong dung dịch nước',
  description: 'Cân bằng axit-bazơ, tích số tan Ksp, cân bằng trong dung dịch.',
  level: 'Intermediate',
  order: 2,
  theory: `
    <h2>Cân bằng trong dung dịch nước</h2>
    <p style="margin:8px 0; color:#334155;">Các cân bằng chính: tự ion hoá nước (Kw), axit-bazơ (Ka, Kb, pH), kết tủa (Ksp), cùng các yếu tố ion chung và pha loãng theo Le Chatelier.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">Cân bằng nước & pH</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>$Kw = [H^+][OH^-] = 1,0\times10^{-14}$ (25°C); $pH + pOH = 14$.</li>
          <li>pH = -log[H<sup>+</sup>]; dung dịch axit: pH &lt; 7; bazơ: pH &gt; 7.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
        <h4 style="margin:0 0 6px; color:#9a3412;">Axit - bazơ yếu</h4>
        <ul style="margin:0; padding-left:18px; color:#7c2d12;">
          <li>$K_a = \dfrac{[H^+][A^-]}{[HA]}$, $K_b = \dfrac{[OH^-][BH^+]}{[B]}$.</li>
          <li>Quan hệ: $K_a K_b = K_w$ cho cặp liên hợp.</li>
          <li>Đệm: hỗn hợp axit yếu - bazơ liên hợp (hoặc bazơ yếu - axit liên hợp) giữ pH ổn định.</li>
        </ul>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc);">
        <h4 style="margin:0 0 6px; color:#312e81;">Cân bằng kết tủa (Ksp)</h4>
        <ul style="margin:0; padding-left:18px; color:#334155;">
          <li>Muối ít tan: $K_{sp} = [M^{m+}]^m[A^{n-}]^n$ tại trạng thái bão hoà.</li>
          <li>Tính chất: Ksp nhỏ → tan rất ít; so Qsp với Ksp để dự đoán kết tủa.</li>
          <li>Ion chung làm giảm độ tan (dịch cân bằng về chất rắn).</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Le Chatelier trong dung dịch</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Thêm ion chung → cân bằng dịch chuyển để giảm nồng độ ion đó.</li>
          <li>Pha loãng: ưu tiên tạo thêm ion (tăng điện li, giảm kết tủa nhẹ nếu tan ít).</li>
          <li>Nhiệt độ: tuỳ phản ứng thu/toả nhiệt mà cân bằng dịch chuyển khác nhau.</li>
        </ul>
      </div>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Ở 25°C, pH + pOH bằng:',
      options: ['7', '10', '12', '14'],
      correctAnswer: 3,
      explanation: 'Từ Kw = 1,0×10^{-14} → pH + pOH = 14.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Dung dịch có [H+] = 1,0×10^{-5} M có pH xấp xỉ:',
      options: ['3', '4', '5', '6'],
      correctAnswer: 2,
      explanation: 'pH = -log(10^{-5}) = 5.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Quan hệ đúng cho cặp axit-bazơ liên hợp là:',
      options: ['Ka = Kb', 'Ka·Kb = Kw', 'Ka + Kb = Kw', 'Ka/Kb = Kw'],
      correctAnswer: 1,
      explanation: 'Ka·Kb = Kw với cặp liên hợp ở cùng nhiệt độ.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Thêm NaCl vào dung dịch AgCl bão hoà làm giảm độ tan AgCl.',
      correctAnswer: true,
      explanation: 'Ion chung Cl- dịch cân bằng về chất rắn, giảm tan.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Biểu thức Ksp của CaF2 là:',
      options: ['[Ca^{2+}][F^-]', '[Ca^{2+}]^2[F^-]', '[Ca^{2+}][F^-]^2', '[Ca^{2+}]^2[F^-]^2'],
      correctAnswer: 2,
      explanation: 'CaF2 ⇌ Ca^{2+} + 2F^- → Ksp = [Ca^{2+}][F^-]^2.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Nếu Qsp > Ksp, hiện tượng xảy ra là:',
      options: ['Thêm muối tan ra', 'Chưa bão hoà', 'Sẽ kết tủa thêm', 'Không đổi'],
      correctAnswer: 2,
      explanation: 'Qsp lớn hơn Ksp → dung dịch quá bão hoà, kết tủa xuất hiện.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Dung dịch đệm hoạt động tốt nhất khi:',
      options: ['pH cách xa pKa > 3', 'pH xấp xỉ pKa của axit yếu', 'Nồng độ rất loãng', 'Chỉ có axit mạnh và bazơ mạnh'],
      correctAnswer: 1,
      explanation: 'Đệm hiệu quả khi tỉ lệ axit/bazơ liên hợp gần 1 → pH ≈ pKa.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Khi pha loãng dung dịch axit yếu, độ điện li tăng.',
      correctAnswer: true,
      explanation: 'Pha loãng làm cân bằng điện li dịch theo chiều tạo ion.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Với HA yếu, nếu Ka = 1,0×10^{-5}, pKa xấp xỉ:',
      options: ['3', '4', '5', '6'],
      correctAnswer: 2,
      explanation: 'pKa = -log(Ka) ≈ 5.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Hằng số nào không phụ thuộc vào nồng độ ban đầu?',
      options: ['Ka', 'Kb', 'Ksp', 'Cả 3 phương án trên'],
      correctAnswer: 3,
      explanation: 'Ka, Kb, Ksp là hằng số cân bằng, chỉ đổi theo nhiệt độ.',
      points: 10
    }
  ]
};
