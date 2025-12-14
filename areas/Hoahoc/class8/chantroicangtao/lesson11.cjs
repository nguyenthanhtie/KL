module.exports = {
  classId: 8,
  curriculumType: 'chantroicangtao',
  chapterId: 2,
  chapterName: "Chủ đề 2: Một số hợp chất vô cơ. Thang pH",
  lessonId: 11,
  title: 'Bài 11: Thang pH',
  order: 11,
  theory: `
    <h2>📏 Bài 11: Thang pH</h2>
    <p style="margin:10px 0; color:#334155;">Mục tiêu: đọc thang pH, phân loại môi trường acid/bazơ/trung tính và ứng dụng kiểm soát pH.</p>

    <div style="display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); margin:14px 0;">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f8fafc;">
        <h4 style="margin:0 0 8px; color:#0f172a;">Khái niệm & ý nghĩa</h4>
        <ul style="margin:0; padding-left:18px; color:#475569;">
          <li>pH đo độ acid/bazơ của dung dịch.</li>
          <li>pH < 7: acid; pH = 7: trung tính; pH > 7: bazơ.</li>
          <li>Acid mạnh: pH 0–3; bazơ mạnh: pH 11–14.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#ecfeff;">
        <h4 style="margin:0 0 8px; color:#0e7490;">Cách đo pH</h4>
        <ul style="margin:0; padding-left:18px; color:#0f172a;">
          <li>Giấy quỳ tím/universal: đổi màu theo pH.</li>
          <li>Chỉ thị tự nhiên: nước ép bắp cải tím, trà hoa đậu biếc.</li>
          <li>pH-mét điện tử: đọc giá trị số.</li>
        </ul>
      </div>
    </div>

    <div style="margin:16px 0; padding:14px; border-radius:12px; border:1px solid #cbd5e1; background:linear-gradient(135deg,#eef2ff,#f8fafc);">
      <h3 style="margin:0 0 8px; color:#312e81;">Ứng dụng kiểm soát pH</h3>
      <ul style="margin:0; padding-left:18px; color:#334155;">
        <li>Nông nghiệp: điều chỉnh pH đất (vôi nâng pH, lưu huỳnh hạ pH).</li>
        <li>Xử lý nước: duy trì pH ~7.</li>
        <li>Sinh học: cơ thể người duy trì pH máu ~7,4.</li>
      </ul>
    </div>

    <div style="margin:14px 0; display:grid; gap:12px; grid-template-columns:repeat(auto-fit,minmax(240px,1fr));">
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#fff7ed;">
        <h4 style="margin:0 0 8px; color:#9a3412;">Nhận biết nhanh</h4>
        <ul style="margin:0; padding-left:18px; color:#7c2d12;">
          <li>pH thấp → chua, ăn mòn; pH cao → nhờn, ăn da.</li>
          <li>Quỳ tím: đỏ (acid), xanh (bazơ), tím (trung tính).</li>
          <li>Bazơ mạnh thường pH 12–14; nước tinh khiết pH ≈ 7.</li>
        </ul>
      </div>
      <div style="padding:12px; border:1px solid #e2e8f0; border-radius:10px; background:#f0f9ff;">
        <h4 style="margin:0 0 8px; color:#0f172a;">Mini quiz đọc nhanh</h4>
        <ol style="margin:0; padding-left:18px; color:#334155;">
          <li>pH = 9 biểu thị môi trường gì?</li>
          <li>Dụng cụ nào cho kết quả pH chính xác nhất?</li>
          <li>Vì sao phải điều chỉnh pH đất?</li>
        </ol>
        <p style="margin:8px 0 0; font-size:13px; color:#475569;">Tự trả lời trước khi làm test 10 câu.</p>
      </div>
    </div>

    <div style="margin:16px 0; padding:12px; border:1px dashed #cbd5e1; border-radius:10px; background:#f8fafc; text-align:center; color:#475569;">
      <p style="margin:0 0 6px;"><strong>Placeholder hình/sơ đồ</strong>:</p>
      <p style="margin:0 0 4px;">Dải màu thang pH: <em>/images/hoahoc/lesson11-phscale.png</em></p>
      <p style="margin:0;">Ứng dụng pH đất: <em>/images/hoahoc/lesson11-soilph.png</em></p>
    </div>
  `,
  game: [
    {
      question: 'Giá trị pH = 7 biểu thị:',
      options: ['Môi trường acid', 'Trung tính', 'Bazơ', 'Rất bazơ'],
      correctAnswer: 1
    },
    {
      question: 'Dung dịch có pH = 2 là:',
      options: ['Acid mạnh', 'Acid yếu', 'Bazơ yếu', 'Trung tính'],
      correctAnswer: 0
    },
    {
      question: 'Dung dịch có pH = 9 là:',
      options: ['Acid', 'Trung tính', 'Bazơ', 'Không xác định'],
      correctAnswer: 2
    },
    {
      question: 'Dụng cụ cho kết quả pH chính xác nhất:',
      options: ['Giấy quỳ tím', 'Chỉ thị tự nhiên', 'pH-mét điện tử', 'Mắt thường'],
      correctAnswer: 2
    },
    {
      question: 'Quỳ tím đổi xanh khi nhúng vào dung dịch:',
      options: ['pH < 7', 'pH = 7', 'pH > 7', 'Không đổi màu'],
      correctAnswer: 2
    },
    {
      question: 'pH đất quá thấp (chua) cần:',
      options: ['Bón vôi để nâng pH', 'Thêm axit', 'Không làm gì', 'Bón thêm muối ăn'],
      correctAnswer: 0
    },
    {
      question: 'pH của nước tinh khiết ở 25°C xấp xỉ:',
      options: ['5', '7', '9', '11'],
      correctAnswer: 1
    },
    {
      question: 'Bắp cải tím đổi màu hồng trong dung dịch:',
      options: ['Bazơ', 'Acid', 'Trung tính', 'Khí trơ'],
      correctAnswer: 1
    },
    {
      question: 'Bazơ mạnh thường có khoảng pH:',
      options: ['0–3', '4–6', '7', '12–14'],
      correctAnswer: 3
    },
    {
      question: 'Kiểm soát pH nước hồ cá nhằm:',
      options: ['Tăng độ mặn', 'Đảm bảo môi trường sống ổn định cho sinh vật', 'Giảm oxy hòa tan', 'Tăng màu xanh'],
      correctAnswer: 1
    }
  ]
};
