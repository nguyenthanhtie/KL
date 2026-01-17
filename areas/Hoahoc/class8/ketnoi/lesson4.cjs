module.exports = {
  classId: 8,
  curriculumType: 'ketnoi',
  chapterId: 2,
  chapterName: "Chương 2: Phản ứng hóa học",
  lessonId: 4,
  title: 'Bài 4: Dung dịch và nồng độ',
  theory: `
    <h2>💧 Bài 4: Dung dịch và nồng độ</h2>
    <p style="margin:10px 0; color:#334155;">Mục tiêu: hiểu dung dịch, độ tan, tính C% và thao tác pha loãng/cô đặc an toàn.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); margin:14px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 8px; color:#0f172a;">Khái niệm & độ tan</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>Dung dịch: hỗn hợp đồng nhất (dung môi + chất tan).</li>
          <li>Độ tan S: g chất tan tối đa trong 100 g nước ở nhiệt độ xác định.</li>
          <li>Bão hòa: không tan thêm ở nhiệt độ đó.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#ecfeff;">
        <h4 style="margin:0 0 8px; color:#0e7490;">Nồng độ khối lượng (C%)</h4>
        <ul style="margin:0; padding-left:18px; color:#0f172a;">
          <li><strong>C% = m(ct)/m(dd) × 100%</strong>.</li>
          <li>m(dd) = m(ct) + m(dm).</li>
          <li>Tra cứu nhanh: 200 g dd 10% ⇒ 20 g chất tan.</li>
        </ul>
      </div>
    </div>

    <div style="margin:16px 0; padding:14px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc);">
      <h3 style="margin:0 0 8px; color:#312e81;">Pha loãng – Cô đặc</h3>
      <ul style="margin:0; padding-left:18px; color:#334155;">
        <li><strong>Pha loãng:</strong> thêm dung môi, m(ct) giữ nguyên ⇒ C% giảm.</li>
        <li><strong>Cô đặc:</strong> bay hơi bớt dung môi ⇒ C% tăng.</li>
        <li>Ví dụ: 100 g dd 20% xuống 10% ⇒ m(ct)=20 g ⇒ m(dd mới)=200 g ⇒ thêm 100 g nước.</li>
      </ul>
    </div>

    <div style="margin:14px 0; display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr));">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
        <h4 style="margin:0 0 8px; color:#9a3412;">Ghi nhớ nhanh</h4>
        <ul style="margin:0; padding-left:18px; color:#7c2d12;">
          <li>Đọc kỹ đơn vị: g, g/100g, %. </li>
          <li>Mọi phép tính C% phải cộng khối lượng dung môi.</li>
          <li>Không trộn lung tung dung dịch khác loại nếu không biết phản ứng.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f0f9ff;">
        <h4 style="margin:0 0 8px; color:#0f172a;">Mini quiz đọc nhanh</h4>
        <ol style="margin:0; padding-left:18px; color:#334155;">
          <li>200 g dd KCl 8% có bao nhiêu g KCl?</li>
          <li>Muốn giảm 15% xuống 10%, thêm hay bớt gì?</li>
          <li>Bão hòa nghĩa là gì?</li>
        </ol>
        <p style="margin:8px 0 0; font-size:13px; color:#475569;">Tự trả lời trước khi vào 10 câu test.</p>
      </div>
    </div>
  `,
  game: [
    {
      question: 'C% cho biết gì?',
      options: ['g chất tan/100 g dung dịch', 'mol chất tan/1 L dung dịch', 'g dung môi/100 g dung dịch', 'mL chất tan/1 L dung dịch'],
      correctAnswer: 0
    },
    {
      question: 'Dung dịch bão hòa là:',
      options: ['Tan vô hạn', 'Không tan thêm ở nhiệt độ đó', 'Luôn loãng', 'Chỉ có chất rắn'],
      correctAnswer: 1
    },
    {
      question: 'Công thức tính C% là:',
      options: ['C% = m(dd)/m(ct)', 'C% = m(ct)/m(dd) × 100%', 'C% = m(dd)/100', 'C% = m(ct) × m(dd)'],
      correctAnswer: 1
    },
    {
      question: 'Độ tan S là:',
      options: ['g chất tan/100 g dung dịch', 'g chất tan/100 g nước ở nhiệt độ xác định', 'mol/L dung dịch', 'g chất tan/1 L dung môi'],
      correctAnswer: 1
    },
    {
      question: 'Để pha 200 g dung dịch NaCl 5%, khối lượng NaCl cần là:',
      options: ['5 g', '10 g', '20 g', '50 g'],
      correctAnswer: 2
    },
    {
      question: 'Pha loãng dung dịch nghĩa là:',
      options: ['Tăng m chất tan', 'Giảm m chất tan', 'Tăng dung môi, m(ct) giữ nguyên', 'Giảm dung môi, m(ct) giữ nguyên'],
      correctAnswer: 2
    },
    {
      question: 'Dung dịch bão hòa đặc trưng bởi:',
      options: ['Tan vô hạn', 'Không tan thêm ở nhiệt độ đó', 'Chỉ có khí', 'Luôn đặc'],
      correctAnswer: 1
    },
    {
      question: 'm(dung dịch) được tính bằng:',
      options: ['m(ct) + m(dm)', 'm(ct) − m(dm)', 'm(ct) × m(dm)', 'm(ct)/m(dm)'],
      correctAnswer: 0
    },
    {
      question: 'C% cho biết:',
      options: ['Khối lượng dung môi', 'Tỉ lệ % khối lượng chất tan trong toàn dung dịch', 'Thể tích dung dịch', 'Nồng độ mol'],
      correctAnswer: 1
    },
    {
      question: 'Nếu C% tăng khi cô đặc dung dịch, điều này do:',
      options: ['Thêm nước', 'Bay hơi bớt dung môi', 'Thêm chất tan', 'Giảm nhiệt độ'],
      correctAnswer: 1
    }
  ]
};
