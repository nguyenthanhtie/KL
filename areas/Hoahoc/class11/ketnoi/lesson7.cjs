module.exports = {
  classId: 11,
  curriculumType: 'ketnoi',
  chapterId: 2,
  chapterName: 'Chương 2: Nitrogen – sulfur',
  lessonId: 7,
  title: 'Bài 7: Sulfur và sulfur dioxide',
  description: 'Tính chất của S, SO2; vai trò oxi hoá/khử, ứng dụng và tác hại môi trường.',
  level: 'Intermediate',
  order: 7,
  theory: `
    <h2>Sulfur và SO2</h2>
    <p style="margin:8px 0; color:#334155;">Phân tích dạng thù hình của S, tính oxi hoá/khử của SO2, chuỗi chuyển hoá S → SO2 và các tác động môi trường.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">Sulfur (S)</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Thù hình: tà phương (rhombic) ổn định ở thường; đơn tà (monoclinic) ổn định >96°C; S vô định hình (dẻo) khi làm lạnh nhanh.</li>
          <li>Tính chất: rắn vàng, không tan nước, tan trong dung môi không phân cực (CS2); cháy xanh nhạt tạo SO2.</li>
          <li>Tính oxi hoá/khử: S0 vừa bị khử (H2, kim loại) vừa bị oxi hoá (O2, halogen) → vai trò trung gian.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
        <h4 style="margin:0 0 6px; color:#9a3412;">Sulfur dioxide (SO2)</h4>
        <ul style="margin:0; padding-left:18px; color:#7c2d12;">
          <li>Khí không màu, mùi hắc, tan tốt tạo H2SO3 (axit yếu, không bền).</li>
          <li>Tính khử: bị oxi hoá thành SO3/H2SO4 (2SO2 + O2 ⇌ 2SO3); tính oxi hoá: oxi hoá H2S, FeO → S, Fe2O3.</li>
          <li>Tẩy màu trong môi trường ẩm do khử chất màu; khử thuốc nhuộm.</li>
        </ul>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc); color:#334155;">
        <h4 style="margin:0 0 6px; color:#312e81;">Điều chế & ứng dụng</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Điều chế SO2: đốt S, nung quặng pirit FeS2; phụ phẩm luyện kim.</li>
          <li>Ứng dụng SO2: sản xuất H2SO4 (quy trình tiếp xúc), chất tẩy trắng, bảo quản thực phẩm (giới hạn ppm).</li>
          <li>Ứng dụng S: lưu hoá cao su, sản xuất H2SO4, diệt nấm lưu huỳnh vôi.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Môi trường & an toàn</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>SO2 gây kích ứng hô hấp, tiền chất mưa axit; kiểm soát bằng hấp thụ đá vôi/đá vôi ướt (desulfurization).</li>
          <li>Hạn chế rò rỉ, thông gió; lưu trữ S khô, tránh bụi dễ cháy.</li>
        </ul>
      </div>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Thù hình ổn định của lưu huỳnh ở điều kiện thường là:',
      options: ['S đơn tà', 'S tà phương', 'S vô định hình', 'S hơi'],
      correctAnswer: 1,
      explanation: 'S tà phương (rhombic) bền ở nhiệt độ phòng.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Tính chất nổi bật của SO2 trong dung dịch nước là:',
      options: ['Tính bazơ', 'Tính oxi hoá mạnh', 'Tính khử và axit yếu', 'Không tan, trơ'],
      correctAnswer: 2,
      explanation: 'SO2 tan tạo H2SO3 (axit yếu) và có tính khử rõ rệt.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'SO2 có thể vừa oxi hoá H2S vừa bị oxi hoá bởi Cl2.',
      correctAnswer: true,
      explanation: 'SO2 là chất khử với chất oxi hoá mạnh (Cl2) và là chất oxi hoá với H2S.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phản ứng tạo SO2 từ quặng pirit là:',
      options: ['2FeS + 3O2 → 2FeO + 2SO2', '4FeS2 + 11O2 → 2Fe2O3 + 8SO2', 'FeS2 + HCl → FeCl2 + H2S', 'FeS + H2SO4 → FeSO4 + H2S'],
      correctAnswer: 1,
      explanation: 'Nung pirit giàu tạo SO2 và oxit sắt(III).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Thuốc thử nhận biết SO2 trong không khí thường dùng:',
      options: ['Giấy quỳ đỏ', 'Dung dịch KMnO4 tím', 'BaCl2', 'Dung dịch AgNO3'],
      correctAnswer: 1,
      explanation: 'SO2 khử KMnO4 mất màu trong môi trường axit.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'SO2 tẩy màu khô tốt hơn tẩy màu ẩm.',
      correctAnswer: false,
      explanation: 'SO2 tẩy màu cần môi trường ẩm để tạo H2SO3 khử chất màu.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Biện pháp giảm SO2 khí thải nhà máy nhiệt điện than:',
      options: ['Lọc bụi tĩnh điện', 'Hấp thụ đá vôi ướt tạo CaSO3/CaSO4', 'Làm nguội khói', 'Bổ sung NH3'],
      correctAnswer: 1,
      explanation: 'Desulfurization ướt với CaCO3/Ca(OH)2 chuyển SO2 thành thạch cao.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Tác hại môi trường chính của SO2 là:',
      options: ['Tăng hiệu ứng nhà kính mạnh', 'Gây mưa axit và kích ứng hô hấp', 'Phá huỷ ozon', 'Làm cứng nước'],
      correctAnswer: 1,
      explanation: 'SO2/ SO3 tạo H2SO4 trong khí quyển → mưa axit; gây kích ứng đường thở.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Hiện tượng tẩy màu của SO2 là do:',
      options: ['Tính bazơ', 'Khử chất màu trong môi trường ẩm', 'Oxi hoá chất màu', 'Tạo kết tủa màu'],
      correctAnswer: 1,
      explanation: 'H2SO3 (từ SO2 + H2O) là chất khử làm mất màu thuốc nhuộm.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Phản ứng oxi hoá SO2: 2SO2 + O2 ⇌ ______',
      correctAnswer: '2SO3',
      explanation: 'Bước quan trọng trong quy trình tiếp xúc sản xuất H2SO4.',
      points: 10
    }
  ]
};
