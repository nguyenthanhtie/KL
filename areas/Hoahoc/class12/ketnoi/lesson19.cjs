module.exports = {
  classId: 12,
  curriculumType: 'ketnoi',
  chapterId: 6,
  chapterName: 'Chương 6: Đại cương về kim loại',
  lessonId: 19,
  title: 'Bài 19: Tính chất vật lí và hoá học của kim loại',
  description: 'Dãy điện hoá, phản ứng thế, khử, điều chế; xu hướng oxi hoá.',
  level: 'Intermediate',
  order: 19,
  theory: `
    <h2>Tính chất vật lí và hoá học của kim loại</h2>
    <p style="margin:8px 0; color:#334155;">Liên hệ vị trí trong dãy điện hoá với tính khử, phản ứng thế và phương pháp điều chế.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">Tính chất vật lí</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Dẫn điện, dẫn nhiệt, ánh kim, dẻo; khối lượng riêng đa dạng (Li nhẹ, Os nặng).</li>
          <li>Nhiệt độ nóng chảy cao (trừ Hg); độ cứng phụ thuộc cấu trúc mạng.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #fde68a; border-radius:10px; background:#fffbeb; color:#92400e;">
        <h4 style="margin:0 0 6px;">Tính khử & phản ứng</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Dãy điện hoá: kim loại càng âm càng khử mạnh (K, Na, Ca) phản ứng mãnh liệt với nước.</li>
          <li>Phản ứng với phi kim: 2Al + 3Cl2 → 2AlCl3; với axit: Fe + 2HCl → FeCl2 + H2.</li>
          <li>Phản ứng thế: kim loại mạnh đẩy kim loại yếu khỏi dung dịch muối (Fe + CuSO4 → FeSO4 + Cu).</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Ứng dụng dãy điện hoá</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Dự đoán chiều phản ứng oxi hoá/khử; chọn chất khử phù hợp.</li>
          <li>Bảo vệ kim loại: mạ, bảo vệ catot bằng kim loại hi sinh (Zn cho tàu thép).</li>
          <li>Chọn điều chế: điện phân nóng chảy (Na, Al), khử oxit (Fe, Cu), thuỷ luyện.</li>
        </ul>
      </div>
    </div>

        <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
          <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#f0f9ff,#f8fafc); color:#0f172a;">
            <h4 style="margin:0 0 6px;">So sánh từ tính</h4>
            <ul style="margin:0; padding-left:18px; color:#334155;">
              <li>Thuận từ: χ nhỏ dương, chỉ mạnh khi có từ trường (Al, O2 lỏng).</li>
              <li>Đối từ: χ nhỏ âm, đẩy nhẹ khỏi vùng từ trường (Cu, Zn, H2O).</li>
              <li>Ferromag: χ lớn, có trễ từ, đômen song song (Fe, Co, Ni) → dễ bị khử từ nếu nung trên Curie.</li>
            </ul>
          </div>
          <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#fffaf0; color:#92400e;">
            <h4 style="margin:0 0 6px;">Case & lưu ý</h4>
            <ul style="margin:0; padding-left:18px;">
              <li>Thép mềm (nhiều Feα BCC) dễ nhiễm từ, dùng làm lõi biến áp; thép cứng (thêm C, Cr) giữ từ lâu → nam châm vĩnh cửu.</li>
              <li>Siêu dẫn loại I mất từ tính hoàn toàn (hiệu ứng Meissner); loại II cho từ thông đi qua dạng sợi (vortex).</li>
              <li>Giảm nhiễu từ bằng che chắn mu-metal (hợp kim Ni-Fe có độ từ thẩm cao).</li>
            </ul>
          </div>
          <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc; color:#475569;">
            <h4 style="margin:0 0 6px;">Ôn bài tập</h4>
            <ul style="margin:0; padding-left:18px;">
              <li>Nhận biết mẫu từ tính qua thí nghiệm đơn giản: hút nam châm, cân từ (Gouy), hoặc quan sát đường sức.</li>
              <li>Giải thích sự khử từ khi nung qua nhiệt độ Curie, liên hệ sắp xếp spin.</li>
              <li>Bài toán ứng dụng: chọn vật liệu lõi cuộn cảm để giảm tổn hao (tổn hao trễ + dòng Fu-cô).</li>
            </ul>
          </div>
        </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Kim loại nào khử mạnh nhất trong dãy: Fe, Cu, Mg, Ag?',
      options: ['Fe', 'Cu', 'Mg', 'Ag'],
      correctAnswer: 2,
      explanation: 'Mg có E° âm hơn, khử mạnh nhất.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng thế đúng:',
      options: ['Cu + 2AgNO3 → Cu(NO3)2 + 2Ag', 'Ag + CuSO4 → Cu + Ag2SO4', 'Zn + MgSO4 → Mg + ZnSO4', 'Fe + ZnSO4 → FeSO4 + Zn'],
      correctAnswer: 0,
      explanation: 'Cu khử Ag+; các phản ứng khác kim loại yếu không đẩy được mạnh.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Al bị thụ động hoá trong HNO3 đặc nguội.',
      correctAnswer: true,
      explanation: 'Lớp oxit bảo vệ ngăn phản ứng tiếp.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Kim loại nào tác dụng với nước ở nhiệt độ thường mạnh nhất:',
      options: ['Mg', 'Ca', 'Fe', 'Al'],
      correctAnswer: 1,
      explanation: 'Ca thuộc kiềm thổ, phản ứng với nước nguội tạo Ca(OH)2 + H2.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Ý nghĩa thực tiễn của dãy điện hoá không bao gồm:',
      options: ['Dự đoán phản ứng thế', 'Tính suất điện động pin', 'Chọn phương pháp điều chế', 'Tính pH dung dịch'],
      correctAnswer: 3,
      explanation: 'pH không trực tiếp từ dãy điện hoá kim loại.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Ag không phản ứng với HCl loãng do E° cao.',
      correctAnswer: true,
      explanation: 'Ag khử yếu, không đẩy H+ trong HCl loãng.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng nào tạo H2:',
      options: ['Cu + H2SO4 loãng', 'Fe + 2HCl → FeCl2 + H2', 'Ag + HNO3 đặc', 'Ag + H2O'],
      correctAnswer: 1,
      explanation: 'Fe đẩy H+ tạo H2; Cu không phản ứng với axit không oxi hoá.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Trong dãy điện hoá, kim loại đứng trước H có thể đẩy ______ khỏi axit loãng.',
      correctAnswer: 'H2',
      explanation: 'Kim loại hoạt động hơn H tạo H2.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Kim loại cần điện phân nóng chảy để điều chế là:',
      options: ['Fe', 'Cu', 'Na', 'Ag'],
      correctAnswer: 2,
      explanation: 'Kim loại rất hoạt động (Na, Al) phải điện phân muối nóng chảy.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Tính khử của kim loại tăng từ Li đến Cs trong nhóm IA.',
      correctAnswer: true,
      explanation: 'Bán kính tăng, năng lượng ion hoá giảm.',
      points: 10
    }
  ]
};
