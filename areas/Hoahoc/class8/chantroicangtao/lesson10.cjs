module.exports = {
  classId: 8,
  curriculumType: 'chantroicangtao',
  chapterId: 2,
  chapterName: "Chủ đề 2: Một số hợp chất vô cơ. Thang pH",
  lessonId: 10,
  title: 'Bài 10: Base',
  order: 10,
  theory: `
    <h2>🧪 Bài 10: Base</h2>
    <p style="margin:10px 0; color:#334155;">Mục tiêu: hiểu bazơ, phản ứng đặc trưng và ứng dụng.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); margin:14px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 8px; color:#0f172a;">Khái niệm</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Bazơ phân li ra OH⁻ trong nước (NaOH, KOH, Ca(OH)₂).</li>
          <li>Thường nhờn tay, vị đắng (không thử!).</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
        <h4 style="margin:0 0 8px; color:#9a3412;">Tính chất</h4>
        <ul style="margin:0; padding-left:18px; color:#7c2d12;">
          <li>Quỳ tím → xanh.</li>
          <li>Phản ứng với acid → muối + nước (trung hòa).</li>
          <li>Phản ứng với oxide acid → muối + nước (vd: Ca(OH)₂ + CO₂).</li>
        </ul>
      </div>
    </div>

    <div style="margin:14px 0; display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr));">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#ecfeff;">
        <h4 style="margin:0 0 8px; color:#0e7490;">Phản ứng tiêu biểu</h4>
        <ul style="margin:0; padding-left:18px; color:#0f172a;">
          <li>NaOH + HCl → NaCl + H₂O.</li>
          <li>Ca(OH)₂ + CO₂ → CaCO₃↓ + H₂O (nước vôi trong hấp thụ CO₂).</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f0f9ff;">
        <h4 style="margin:0 0 8px; color:#0f172a;">Ứng dụng nhanh</h4>
        <ul style="margin:0; padding-left:18px; color:#334155;">
          <li>NaOH: xà phòng, giấy.</li>
          <li>Ca(OH)₂: xử lý nước, vữa xây.</li>
          <li>Điều chỉnh pH trong nuôi trồng, nông nghiệp.</li>
        </ul>
      </div>
    </div>

    <div style="margin:14px 0; padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f0f9ff;">
      <h4 style="margin:0 0 8px; color:#0f172a;">Mini quiz đọc nhanh</h4>
      <ol style="margin:0; padding-left:18px; color:#334155;">
        <li>Ion đặc trưng của bazơ?</li>
        <li>Hiện tượng Ca(OH)₂ gặp CO₂?</li>
        <li>Bazơ làm quỳ tím đổi màu gì?</li>
      </ol>
      <p style="margin:8px 0 0; font-size:13px; color:#475569;">Tự trả lời trước khi làm test 10 câu.</p>
    </div>

    <div style="margin:16px 0; padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; text-align:center; color:#475569;">
      <p style="margin:0 0 6px;"><strong>Placeholder hình/sơ đồ</strong>:</p>
      <p style="margin:0 0 4px;">Thang màu chỉ thị bazơ: <em>/images/hoahoc/lesson10-base.png</em></p>
      <p style="margin:0;">Phản ứng trung hòa minh họa: <em>/images/hoahoc/lesson10-neutralization.png</em></p>
    </div>
  `,
  game: [
    {
      question: 'Bazơ làm quỳ tím đổi thành màu:',
      options: ['Đỏ', 'Xanh', 'Vàng', 'Không đổi'],
      correctAnswer: 1
    },
    {
      question: 'Dung dịch có pH > 7 thường là:',
      options: ['Acid', 'Trung tính', 'Bazơ', 'Không xác định'],
      correctAnswer: 2
    },
    {
      question: 'Ion đặc trưng của bazơ là:',
      options: ['H⁺', 'OH⁻', 'Na⁺', 'Cl⁻'],
      correctAnswer: 1
    },
    {
      question: 'Phản ứng trung hòa là phản ứng giữa:',
      options: ['Acid và kim loại', 'Bazơ và muối', 'Acid và bazơ', 'Hai bazơ'],
      correctAnswer: 2
    },
    {
      question: 'Dung dịch nào có thể làm quỳ tím hóa xanh?',
      options: ['NaOH', 'HCl', 'NaCl', 'CO₂ hòa tan'],
      correctAnswer: 0
    },
    {
      question: 'Phản ứng Ca(OH)₂ + CO₂ → CaCO₃ + H₂O minh họa tính chất:',
      options: ['Bazơ + oxide bazơ', 'Bazơ + oxide acid', 'Bazơ + muối', 'Bazơ + kim loại'],
      correctAnswer: 1
    },
    {
      question: 'Khi pha loãng dung dịch NaOH, cần lưu ý:',
      options: ['Đổ nước vào NaOH rắn từ từ, khuấy nhẹ', 'Đổ nước vào axit', 'Không cần khuấy', 'Đun sôi nước trước'],
      correctAnswer: 0
    },
    {
      question: 'Ứng dụng đúng của Ca(OH)₂ là:',
      options: ['Ắc quy', 'Xử lý nước, vữa xây', 'Làm lạnh', 'Thêm vào xăng'],
      correctAnswer: 1
    },
    {
      question: 'Bazơ phản ứng với acid tạo:',
      options: ['Muối + nước', 'Kim loại', 'Khí O₂', 'Chỉ nhiệt'],
      correctAnswer: 0
    },
    {
      question: 'NaOH thuộc loại:',
      options: ['Acid mạnh', 'Bazơ mạnh (kiềm)', 'Muối', 'Oxide acid'],
      correctAnswer: 1
    }
  ]
};
