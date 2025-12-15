module.exports = {
  classId: 12,
  curriculumType: 'ketnoi',
  chapterId: 6,
  chapterName: 'Chương 6: Đại cương về kim loại',
  lessonId: 18,
  title: 'Bài 18: Cấu tạo kim loại',
  description: 'Mạng tinh thể kim loại, liên kết kim loại, tính chất tập thể.',
  level: 'Intermediate',
  order: 18,
  theory: `
    <h2>Cấu tạo kim loại</h2>
    <p style="margin:8px 0; color:#334155;">Khám phá "biển electron" trong mạng tinh thể kim loại và cách cấu trúc ảnh hưởng đến tính chất.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">Mạng tinh thể</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Dạng phổ biến: lập phương tâm khối (Fe α), lập phương tâm diện (Cu, Al), lục phương (Mg, Ti).</li>
          <li>Ion kim loại dương nằm ở nút, electron tự do chuyển động khắp mạng.</li>
          <li>Mật độ xếp chặt (FCC, HCP) → dẻo tốt; BCC ít xếp chặt → cứng hơn ở T thấp.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #fde68a; border-radius:10px; background:#fffbeb; color:#92400e;">
        <h4 style="margin:0 0 6px;">Liên kết kim loại</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Không định hướng; electron tự do gắn kết cation kim loại.</li>
          <li>Giải thích tính dẫn điện, dẫn nhiệt, ánh kim, dẻo.</li>
          <li>Tạp chất, sai hỏng mạng (khuyết tật, biên hạt) làm biến đổi độ cứng/dẻo.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Ảnh hưởng cấu trúc</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Kích thước hạt nhỏ → tăng độ bền (cản trở chuyển vị) nhưng giảm độ dẻo.</li>
          <li>Làm nguội nhanh tạo dung dịch rắn quá bão hoà, biến cứng nguội.</li>
          <li>Trượt mạng (slip) giải thích tính dẻo; kim loại FCC dễ trượt hơn BCC.</li>
        </ul>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc); color:#0f172a;">
        <h4 style="margin:0 0 6px;">So sánh mạng & tính chất</h4>
        <ul style="margin:0; padding-left:18px; color:#334155;">
          <li>FCC/HCP: xếp chặt, dẻo, nhiều mặt trượt (Cu, Al, Au, Mg); BCC: ít mặt trượt, cứng hơn ở T thấp (Feα, Cr).</li>
          <li>Ánh kim/dẫn điện: do biển electron; tăng tạp chất → tăng điện trở.</li>
          <li>Độ cứng tăng khi giảm kích thước hạt (Hall–Petch) đến giới hạn nano.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#fffaf0; color:#92400e;">
        <h4 style="margin:0 0 6px;">Case & ứng dụng</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Thép cán nguội cứng hơn cán nóng do biến cứng nguội; cần ủ để phục hồi dẻo.</li>
          <li>Vật liệu nano: hạt Cu nano tăng bền nhưng dễ oxy hoá, cần phủ bảo vệ.</li>
          <li>Dây dẫn điện: cần độ dẫn cao nên dùng Cu tinh khiết, giảm tạp chất và khuyết tật.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Ôn bài tập</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Xác định kiểu mạng từ tính chất dẻo/cứng, nhiệt độ chuyển pha (Fe: BCC↔FCC).</li>
          <li>Giải thích hiện tượng: vì sao Al nhẹ nhưng bền (FCC + màng oxit bảo vệ).</li>
          <li>Liên hệ sai hỏng mạng (biên hạt, khuyết tật điểm) với khuếch tán và ăn mòn.</li>
        </ul>
      </div>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Kiểu mạng của Cu và Al thường là:',
      options: ['Lập phương tâm khối', 'Lập phương tâm diện', 'Lục phương', 'Tetragonal'],
      correctAnswer: 1,
      explanation: 'Cu, Al có mạng FCC → dẻo tốt.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Tính dẻo cao của kim loại do:',
      options: ['Liên kết cộng hoá trị', 'Liên kết kim loại không định hướng', 'Liên kết ion', 'Liên kết hiđro'],
      correctAnswer: 1,
      explanation: 'Liên kết kim loại cho phép các lớp trượt mà không phá vỡ cấu trúc.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Mạng HCP có độ xếp chặt cao.',
      correctAnswer: true,
      explanation: 'HCP và FCC có hệ số xếp chặt ~0.74.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Yếu tố làm tăng độ cứng kim loại:',
      options: ['Tinh thể lớn', 'Tăng khuyết tật, hạt nhỏ', 'Giảm biên hạt', 'Giảm sai hỏng mạng'],
      correctAnswer: 1,
      explanation: 'Khuyết tật, hạt nhỏ cản trở chuyển vị → cứng hơn.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Tính chất nào không phải do "biển electron"?',
      options: ['Dẫn điện', 'Ánh kim', 'Dẻo', 'Tính bay hơi cao'],
      correctAnswer: 3,
      explanation: 'Kim loại không bay hơi cao ở thường; ba tính còn lại do electron tự do.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'BCC ít mặt trượt hơn FCC nên thường cứng hơn ở nhiệt độ thấp.',
      correctAnswer: true,
      explanation: 'Ít mặt trượt → khó biến dạng dẻo.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Biện pháp tăng độ dẻo kim loại:',
      options: ['Biến cứng nguội', 'Ủ tái kết tinh', 'Tăng tạp chất', 'Làm nguội đột ngột'],
      correctAnswer: 1,
      explanation: 'Ủ tái kết tinh khôi phục hạt mới, giảm khuyết tật.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Electron tự do trong kim loại tạo nên tính ______ điện.',
      correctAnswer: 'dẫn',
      explanation: 'Electron chuyển động tự do mang dòng.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Kim loại có ánh kim vì:',
      options: ['Hấp thụ hết ánh sáng', 'Phản xạ mạnh do electron tự do', 'Có màu cố định', 'Có khối lượng riêng lớn'],
      correctAnswer: 1,
      explanation: 'Electron tự do phản xạ bức xạ điện từ.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Khuyết tật mạng làm thay đổi tính chất cơ học kim loại.',
      correctAnswer: true,
      explanation: 'Khuyết tật ảnh hưởng độ cứng, dẻo, khuếch tán.',
      points: 10
    }
  ]
};
