module.exports = {
  classId: 12,
  curriculumType: 'ketnoi',
  chapterId: 6,
  chapterName: 'Chương 6: Đại cương về kim loại',
  lessonId: 21,
  title: 'Bài 21: Hợp kim',
  description: 'Khái niệm hợp kim, tác dụng của nguyên tố pha tạp, ví dụ quan trọng.',
  level: 'Intermediate',
  order: 21,
  theory: `
    <h2>Hợp kim</h2>
    <p style="margin:8px 0; color:#334155;">Pha tạp kim loại/phi kim tạo vật liệu có tính chất vượt trội so với kim loại nguyên chất.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 6px; color:#0f172a;">Khái niệm & loại hợp kim</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Hợp kim: vật liệu chứa ≥2 nguyên tố, thành phần kim loại chiếm phần chính.</li>
          <li>Dung dịch rắn thay thế (Cu-Ni, đồng thau) vs dung dịch rắn xen kẽ (Fe-C).</li>
          <li>Hợp chất liên kim (Fe3C), hợp kim vô định hình (thủy tinh kim loại).</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #fde68a; border-radius:10px; background:#fffbeb; color:#92400e;">
        <h4 style="margin:0 0 6px;">Ví dụ tiêu biểu</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Gang (Fe-C 2–4%): giòn, đúc tốt; thép (Fe-C <2%): bền, dẻo.</li>
          <li>Đồng thau (Cu-Zn): dẻo, chống ăn mòn; đồng thanh (Cu-Sn): bền, đúc tượng.</li>
          <li>Thép hợp kim: Cr, Ni (thép không gỉ); V, Mo (tăng cứng). Al-Mg (nhẹ, bền). </li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Xử lí & tính chất</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Tôi (làm nguội nhanh) tăng cứng; ram giảm giòn, tăng dẻo.</li>
          <li>Biến cứng nguội, kết tủa cứng (Al-Cu) điều chỉnh độ bền.</li>
          <li>Ứng dụng: xây dựng, hàng không, điện, trang sức (vàng 18K Au-Ag-Cu).</li>
        </ul>
      </div>
    </div>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); margin:12px 0;">
      <div style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#f0f9ff,#f8fafc); color:#0f172a;">
        <h4 style="margin:0 0 6px;">So sánh nhanh</h4>
        <ul style="margin:0; padding-left:18px; color:#334155;">
          <li>Thép vs gang: thép <2% C, dẻo; gang 2–4% C, giòn nhưng đúc tốt.</li>
          <li>Thép cacbon vs thép hợp kim: thêm Cr/Ni tăng chống gỉ và dẻo; V/Mo tăng bền nóng.</li>
          <li>Hợp kim vô định hình: không mạng tinh thể, độ bền cao, chống ăn mòn tốt.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#fef2f2; color:#b91c1c;">
        <h4 style="margin:0 0 6px;">Case & ứng dụng</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Thép không gỉ: cần ≥10,5% Cr để tạo lớp Cr2O3 bền; thêm Ni tăng dẻo.</li>
          <li>Duralumin (Al-Cu-Mg): hoá già tăng bền; dùng vỏ máy bay.</li>
          <li>Kim loại nhớ hình (Ni-Ti): biến dạng rồi trở lại hình cũ khi nung.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc; color:#475569;">
        <h4 style="margin:0 0 6px;">Ôn bài tập</h4>
        <ul style="margin:0; padding-left:18px;">
          <li>Nhận diện hợp kim qua tính chất: không gỉ (Cr), nhẹ (Al-Mg), dẫn điện tốt (Cu).</li>
          <li>Lập sơ đồ nhiệt luyện: tôi → ram; hoặc ủ để làm mềm trước khi cán.</li>
          <li>Giải thích vì sao tăng C làm thép cứng hơn nhưng giòn hơn (mactenxit, chuyển vị khó). </li>
        </ul>
      </div>
    </div>
  `,
  game: [
    {
      type: 'multiple-choice',
      question: 'Thành phần chính của đồng thau:',
      options: ['Cu và Sn', 'Cu và Zn', 'Cu và Ni', 'Cu và Al'],
      correctAnswer: 1,
      explanation: 'Đồng thau = Cu-Zn.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Gang có hàm lượng C khoảng:',
      options: ['<0.2%', '0.2–2%', '2–4%', '>5%'],
      correctAnswer: 2,
      explanation: 'Gang 2–4% C; thép <2%.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Thép không gỉ chứa Cr và Ni.',
      correctAnswer: true,
      explanation: 'Cr tạo lớp oxit bảo vệ, Ni tăng dẻo.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Vàng 18K có hàm lượng Au khoảng:',
      options: ['75%', '60%', '90%', '50%'],
      correctAnswer: 0,
      explanation: '18/24 = 75% Au.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Phương pháp nhiệt luyện làm tăng độ cứng nhưng giảm dẻo:',
      options: ['Ủ', 'Ram', 'Tôi', 'Thường hoá'],
      correctAnswer: 2,
      explanation: 'Tôi làm nguội nhanh tạo mactenxit cứng.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Dung dịch rắn xen kẽ hình thành khi nguyên tử hoà tan nhỏ hơn nhiều so với mạng chủ.',
      correctAnswer: true,
      explanation: 'Nguyên tử nhỏ chen vào khe (C trong Fe).',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Đồng thanh (bronze) là hợp kim của:',
      options: ['Cu-Sn', 'Cu-Zn', 'Cu-Ni', 'Cu-Al'],
      correctAnswer: 0,
      explanation: 'Bronze cổ điển là Cu-Sn.',
      points: 10
    },
    {
      type: 'fill-in-blank',
      question: 'Thao tác ủ thép nhằm tăng ______ và giảm ứng suất.',
      correctAnswer: 'dẻo',
      explanation: 'Ủ tạo hạt mới, giảm khuyết tật → mềm dẻo hơn.',
      points: 10
    },
    {
      type: 'multiple-choice',
      question: 'Hợp kim nhẹ dùng trong hàng không:',
      options: ['Thép Cr-V', 'Al-Mg (duralumin)', 'Cu-Zn', 'Fe-C'],
      correctAnswer: 1,
      explanation: 'Duralumin nhẹ, bền cho kết cấu bay.',
      points: 10
    },
    {
      type: 'true-false',
      question: 'Biến cứng nguội làm tăng mật độ khuyết tật, tăng cứng.',
      correctAnswer: true,
      explanation: 'Chuyển vị bị kẹt → cứng hơn nhưng giòn hơn.',
      points: 10
    }
  ]
};
