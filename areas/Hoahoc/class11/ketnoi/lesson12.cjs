module.exports = {
  classId: 11,
  curriculumType: 'ketnoi',
  chapterId: 3,
  chapterName: 'Chương 3: Đại cương về hoá học hữu cơ',
  lessonId: 12,
  title: 'Bài 12: Công thức phân tử hợp chất hữu cơ',
  description: 'Xác định CTPT từ CT đơn giản, % khối lượng, khối lượng mol và dữ kiện đốt cháy.',
  level: 'Intermediate',
  order: 12,
  theory: `
    <h2>Công thức phân tử</h2>
    <p style="margin:8px 0; color:#334155;">Quy trình chung: CTĐG → CTPT, dùng dữ kiện đốt cháy, khối lượng mol và chỉ số bất bão hoà (IHD).</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">Bước 1: Công thức đơn giản</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Từ % khối lượng → số mol tương đối → tỉ lệ tối giản → CTĐG.</li>
          <li>Nếu có halogen: trừ khối lượng C,H,O rồi suy halogen; N từ chênh lệch.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
        <h4 style="margin:0 0 6px; color:#9a3412;">Bước 2: Khối lượng mol (M)</h4>
        <ul style="margin:0; padding-left:18px; color:#7c2d12;">
          <li>M (thực nghiệm) / M (CTĐG) = n (số lần lặp).</li>
          <li>Nhân chỉ số trong CTĐG với n → CTPT.</li>
        </ul>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Đốt cháy</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>nC = nCO2, nH = 2·nH2O; tính nO từ khối lượng mẫu: mO = mMẫu - mC - mH - mX - mN...</li>
          <li>Áp dụng bảo toàn khối lượng, bảo toàn nguyên tố.</li>
        </ul>
      </div>
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc); color:#334155;">
        <h4 style="margin:0 0 6px; color:#312e81;">Độ bất bão hoà (IHD)</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>IHD = (2C + 2 + N - H - X)/2 (bỏ O, S). Mỗi vòng hoặc liên kết π tăng 1 đơn vị.</li>
          <li>Gợi ý có vòng hoặc nối đôi/ba; thơm nếu IHD cao phù hợp (ví dụ benzen IHD = 4).</li>
        </ul>
      </div>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'IHD (độ bất bão hoà) của C4H8 là:',
      options: ['0', '1', '2', '3'],
      correctAnswer: 1,
      explanation: 'IHD = (2*4 +2 -8)/2 = 1 (1 vòng hoặc 1 nối đôi).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Từ % khối lượng tính được CTĐG CH2O và M thực nghiệm 180 → CTPT là:',
      options: ['CH2O', 'C2H4O2', 'C3H6O3', 'C6H12O6'],
      correctAnswer: 3,
      explanation: 'M(CTĐG)=30; 180/30=6 → nhân 6: C6H12O6.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Oxy được tính vào công thức IHD.',
      correctAnswer: false,
      explanation: 'O và S không ảnh hưởng đến IHD công thức ngắn gọn.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Đốt cháy hoàn toàn mẫu chứa C, H, O thu 0.2 mol CO2 và 0.3 mol H2O. Số mol C và H trong mẫu lần lượt là:',
      options: ['0.2 C; 0.3 H', '0.2 C; 0.6 H', '0.4 C; 0.3 H', '0.3 C; 0.6 H'],
      correctAnswer: 1,
      explanation: 'nC = nCO2 = 0.2; nH = 2·nH2O = 0.6.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Nếu M thực nghiệm bằng đúng M của CTĐG thì CTPT:',
      options: ['Gấp đôi CTĐG', 'Giữ nguyên CTĐG', 'Nhân ba CTĐG', 'Không xác định'],
      correctAnswer: 1,
      explanation: 'Hệ số n = 1 → CTPT = CTĐG.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'IHD = 4 có thể gợi ý một vòng thơm benzen.',
      correctAnswer: true,
      explanation: 'Benzen có 3 nối đôi + 1 vòng → IHD = 4.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Hợp chất chứa halogen X cần đưa X vào công thức IHD bằng:',
      options: ['Cộng H', 'Trừ H', 'Cộng O', 'Trừ C'],
      correctAnswer: 0,
      explanation: 'IHD: X được tính như H, nên thay mỗi X bằng 1 H trong công thức.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'CTĐG thu được là CH, M thực nghiệm 78. CTPT là:',
      options: ['CH', 'C2H2', 'C3H3', 'C6H6'],
      correctAnswer: 3,
      explanation: 'M(CH)=13; 78/13≈6 → C6H6 (benzen).',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Khi tính nO trong mẫu đốt cháy, có thể lấy mMẫu trừ mC và mH.',
      correctAnswer: true,
      explanation: 'Đúng nếu mẫu chỉ chứa C, H, O; nếu có nguyên tố khác phải trừ thêm.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Công thức IHD: I = (2C + 2 + N - H - X)/__',
      correctAnswer: '2',
      explanation: 'Chia 2 để quy đổi số đơn vị bất bão hoà.',
      points: 10
    }
  ]
};
