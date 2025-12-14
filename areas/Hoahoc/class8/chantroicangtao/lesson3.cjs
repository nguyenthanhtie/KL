module.exports = {
  classId: 8,
  curriculumType: 'chantroicangtao',
  chapterId: 1,
  chapterName: "Chủ đề 1: Phản ứng hóa học",
  lessonId: 3,
  title: 'Bài 3: Phản ứng hóa học và năng lượng',
  order: 3,
  theory: `
    <h2>⚡ Bài 3: Phản ứng hóa học và năng lượng</h2>
    <p style="margin:10px 0; color:#334155;">Mục tiêu: nhận diện phản ứng qua dấu hiệu, 4 kiểu chính, đồng thời ghi nhớ phản ứng tỏa/thu nhiệt.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); margin:14px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 8px; color:#0f172a;">Dấu hiệu nhận biết</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Xuất hiện chất mới: khí, kết tủa, dung dịch đổi màu.</li>
          <li>Tỏa/thu nhiệt, có thể phát sáng.</li>
          <li>Thay đổi mùi, âm thanh (xì khí).</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#ecfeff;">
        <h4 style="margin:0 0 8px; color:#0e7490;">Điều kiện xảy ra</h4>
        <ul style="margin:0; padding-left:18px; color:#0f172a;">
          <li>Tiếp xúc giữa các chất.</li>
          <li>Nhiệt độ/áp suất phù hợp.</li>
          <li>Xúc tác (nếu cần) để hạ năng lượng hoạt hóa.</li>
        </ul>
      </div>
    </div>

    <div style="margin:16px 0; padding:14px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc);">
      <h3 style="margin:0 0 10px; color:#312e81;">4 kiểu phản ứng – nhớ nhanh</h3>
      <ul style="margin:0; padding-left:18px; color:#334155;">
        <li><strong>Hóa hợp:</strong> A + B → AB (ghép lại). Ví dụ: 2H₂ + O₂ → 2H₂O (tỏa nhiệt).</li>
        <li><strong>Phân hủy:</strong> AB → A + B (tách ra). Ví dụ: CaCO₃ → CaO + CO₂ (thu nhiệt khi nung).</li>
        <li><strong>Thế:</strong> AB + C → AC + B (C thế B). Ví dụ: Zn + 2HCl → ZnCl₂ + H₂ (tỏa nhiệt nhẹ).</li>
        <li><strong>Trao đổi:</strong> AB + CD → AD + CB (hoán vị). Ví dụ: AgNO₃ + NaCl → AgCl↓ + NaNO₃.</li>
      </ul>
    </div>

    <div style="margin:14px 0; display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr));">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
        <h4 style="margin:0 0 8px; color:#9a3412;">Ghi nhớ nhanh</h4>
        <ul style="margin:0; padding-left:18px; color:#7c2d12;">
          <li>Nhìn – Nghe – Sờ nhiệt: đổi màu, có khí, ấm/nóng.</li>
          <li>Trao đổi chỉ xảy ra khi tạo kết tủa/khí/điện li yếu.</li>
          <li>Phân hủy thường cần nhiệt/xúc tác.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f0f9ff;">
        <h4 style="margin:0 0 8px; color:#0f172a;">Mini quiz đọc nhanh</h4>
        <ol style="margin:0; padding-left:18px; color:#334155;">
          <li>Vì sao phản ứng trao đổi cần kết tủa/khí?</li>
          <li>Phản ứng Zn + 2HCl thuộc loại gì?</li>
          <li>Dấu hiệu nhanh nhận ra phản ứng phân hủy CaCO₃?</li>
        </ol>
        <p style="margin:8px 0 0; font-size:13px; color:#475569;">Tự trả lời trước khi làm bài test 10 câu.</p>
      </div>
    </div>

    <div style="margin:16px 0; padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; text-align:center; color:#475569;">
      <p style="margin:0 0 6px;"><strong>Placeholder hình/sơ đồ</strong> (thay bằng ảnh thật khi có):</p>
      <p style="margin:0 0 4px;">Sơ đồ phân loại phản ứng: <em>/images/hoahoc/lesson3-types.png</em></p>
      <p style="margin:0;">Đồ thị tỏa/thu nhiệt minh họa: <em>/images/hoahoc/lesson3-energy.png</em></p>
    </div>
  `,
  game: [
    {
      question: 'Phản ứng hóa học là gì?',
      options: [
        'Quá trình biến đổi vật lý',
        'Quá trình biến đổi từ chất này thành chất khác',
        'Sự hòa tan',
        'Sự bay hơi'
      ],
      correctAnswer: 1
    },
    {
      question: 'Dấu hiệu nào không phải phản ứng hóa học?',
      options: ['Có khí thoát', 'Có kết tủa', 'Nước đá tan', 'Thay đổi màu'],
      correctAnswer: 2
    },
    {
      question: 'Phản ứng CaCO₃ → CaO + CO₂ thuộc loại?',
      options: ['Hóa hợp', 'Phân hủy', 'Thế', 'Trao đổi'],
      correctAnswer: 1
    },
    {
      question: 'Dấu hiệu nào sau đây chứng tỏ có phản ứng xảy ra?',
      options: ['Dung dịch đổi màu, có khí/ kết tủa', 'Chỉ khuấy mạnh hơn', 'Để yên không có gì', 'Nhiệt độ phòng ổn định'],
      correctAnswer: 0
    },
    {
      question: 'Phản ứng A + B → AB là kiểu:',
      options: ['Hóa hợp', 'Phân hủy', 'Thế', 'Trao đổi'],
      correctAnswer: 0
    },
    {
      question: 'Phản ứng trao đổi xảy ra khi nào?',
      options: ['Không điều kiện', 'Có kết tủa/khí/điện li yếu tạo thành', 'Chỉ khi có xúc tác', 'Chỉ ở 100°C'],
      correctAnswer: 1
    },
    {
      question: 'Ví dụ phản ứng thế:',
      options: ['2H₂ + O₂ → 2H₂O', 'CaCO₃ → CaO + CO₂', 'Zn + 2HCl → ZnCl₂ + H₂', 'AgNO₃ + NaCl → AgCl↓ + NaNO₃'],
      correctAnswer: 2
    },
    {
      question: 'Trong phản ứng hóa học, liên kết giữa các nguyên tử:',
      options: ['Giữ nguyên', 'Bị bẻ gãy và hình thành liên kết mới', 'Chỉ thay đổi màu sắc', 'Chỉ thay đổi trạng thái'],
      correctAnswer: 1
    },
    {
      question: 'Đốt Mg cháy sáng tạo MgO là phản ứng:',
      options: ['Hóa hợp', 'Phân hủy', 'Thế', 'Trao đổi'],
      correctAnswer: 0
    },
    {
      question: 'Phản ứng phân hủy thường cần:',
      options: ['Nhiệt hoặc xúc tác để tách chất', 'Hòa tan trong nước', 'Chỉ cần khuấy', 'Giảm áp suất'],
      correctAnswer: 0
    }
  ]
};
