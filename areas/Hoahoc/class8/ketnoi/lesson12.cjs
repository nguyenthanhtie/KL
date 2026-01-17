module.exports = {
  classId: 8,
  curriculumType: 'ketnoi',
  chapterId: 3,
  chapterName: "Chương 3: Một số hợp chất thông dụng",
  lessonId: 12,
  order: 12,
  title: 'Bài 12: Phân bón hóa học',
  theory: `
    <h2>🌾 Bài 12: Phân bón hóa học</h2>
    <p style="margin:10px 0; color:#334155;">Mục tiêu: nhận biết nhóm phân đạm, lân, kali, NPK; hiểu vai trò và lưu ý an toàn/môi trường.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); margin:14px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#ecfeff;">
        <h4 style="margin:0 0 8px; color:#0e7490;">Phân đơn</h4>
        <ul style="margin:0; padding-left:18px; color:#0f172a;">
          <li>Phân đạm (N): Ure (NH₂)₂CO, NH₄NO₃, (NH₄)₂SO₄ → thúc lá, xanh cây.</li>
          <li>Phân lân (P): Supe lân Ca(H₂PO₄)₂, lân nung chảy → phát triển rễ, ra hoa.</li>
          <li>Phân kali (K): KCl, K₂SO₄ → chắc hạt, tăng chống chịu.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 8px; color:#0f172a;">Phân đa nguyên tố</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>NPK: phối trộn N, P, K với tỉ lệ khác nhau.</li>
          <li>Trung vi lượng: bổ sung Ca, Mg, S, Fe, Zn,... theo nhu cầu.</li>
          <li>Dạng bón: rải gốc, hòa nước tưới, viên nén chậm tan.</li>
        </ul>
      </div>
    </div>

    <div style="margin:14px 0; padding:14px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#fef9c3,#f8fafc);">
      <h3 style="margin:0 0 8px; color:#854d0e;">Lưu ý sử dụng & an toàn</h3>
      <ul style="margin:0; padding-left:18px; color:#334155;">
        <li>Bón đúng loại/đúng giai đoạn; tránh bón đạm sát ngày thu hoạch.</li>
        <li>Không lạm dụng → chua đất, ô nhiễm nước (phú dưỡng hóa).</li>
        <li>Bảo hộ khi tiếp xúc phân đạm, kali; tránh hít bụi, tránh dính mắt.</li>
        <li>Bảo quản khô ráo; NPK/urea hút ẩm dễ vón.</li>
      </ul>
    </div>

    <div style="margin:16px 0; display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr));">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#fef2f2;">
        <h4 style="margin:0 0 8px; color:#b91c1c;">Hiệu quả & nhận biết</h4>
        <ul style="margin:0; padding-left:18px; color:#991b1b;">
          <li>Thiếu N: lá vàng nhạt; thừa N: lá rậm, dễ đổ.</li>
          <li>Thiếu P: lá tím, rễ kém; thừa P: cản hấp thu vi lượng.</li>
          <li>Thiếu K: mép lá cháy; đủ K: quả chắc, ngọt.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f0f9ff;">
        <h4 style="margin:0 0 8px; color:#0f172a;">Mini quiz đọc nhanh</h4>
        <ol style="margin:0; padding-left:18px; color:#334155;">
          <li>Vai trò chính của đạm? của kali?</li>
          <li>Vì sao không bón nhiều phân đạm sát thu hoạch?</li>
          <li>Hiện tượng phú dưỡng hóa đến từ đâu?</li>
        </ol>
        <p style="margin:8px 0 0; font-size:13px; color:#475569;">Trả lời nhanh trước khi làm bài.</p>
      </div>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Phân đạm cung cấp nguyên tố:',
      options: ['P', 'K', 'N', 'Ca'],
      correctAnswer: 2
    },
    {
      type: 'multiple-choice',
      question: 'Hàm lượng N trong ure khoảng:',
      options: ['16%', '30%', '46%', '60%'],
      correctAnswer: 2
    },
    {
      type: 'multiple-choice',
      question: 'Phân kali điển hình là:',
      options: ['KCl, K₂SO₄', 'NH₄NO₃', 'Ca(H₂PO₄)₂', 'NaCl'],
      correctAnswer: 0
    },
    {
      type: 'multiple-choice',
      question: 'Supe lân thuộc nhóm:',
      options: ['Phân đạm', 'Phân lân', 'Phân kali', 'Vi lượng'],
      correctAnswer: 1
    },
    {
      type: 'multiple-choice',
      question: 'Nguyên tắc “4 đúng” khi bón phân gồm:',
      options: ['Đúng loại, liều, lúc, cách', 'Đúng giá, chỗ, người, mùa', 'Đúng màu, mùi, vị, pH', 'Đúng đất, nước, khí, nhiệt'],
      correctAnswer: 0
    },
    {
      type: 'multiple-choice',
      question: 'Công thức NPK 16-16-8 có ý nghĩa:',
      options: ['16% N, 16% P₂O₅, 8% K₂O', '16% N, 8% P₂O₅, 16% K₂O', '8% N, 16% P₂O₅, 16% K₂O', 'Tổng 40% chất trơ'],
      correctAnswer: 0
    },
    {
      type: 'multiple-choice',
      question: 'Phân lân nung chảy tan tốt trong:',
      options: ['Nước lạnh', 'Dung dịch kiềm', 'Axit yếu trong đất chua', 'Rượu etylic'],
      correctAnswer: 2
    },
    {
      type: 'multiple-choice',
      question: 'Lạm dụng phân đạm dễ gây hậu quả:',
      options: ['Đất kiềm hóa mạnh', 'Tích lũy nitrat, ô nhiễm nước', 'Thiếu vi lượng Fe', 'Giảm năng suất lá'],
      correctAnswer: 1
    },
    {
      type: 'multiple-choice',
      question: 'Khi bón phân kali cho cây củ (khoai, sắn) thường giúp:',
      options: ['Tăng protein hạt', 'Cứng cây, tăng chất lượng củ', 'Tăng màu xanh lá', 'Giảm đường trong củ'],
      correctAnswer: 1
    },
    {
      type: 'multiple-choice',
      question: 'Bón lót thường áp dụng cho:',
      options: ['Phân lân và một phần đạm', 'Chỉ phân đạm', 'Chỉ phân kali', 'Tất cả đều bón thúc'],
      correctAnswer: 0
    }
  ]
};
